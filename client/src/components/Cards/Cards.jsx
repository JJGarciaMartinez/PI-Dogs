import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";
import NavBar from "../NavBar/NavBar";
import Origin from "../Filters/Origin";
import SortingOpts from "../Filters/SortingOpts";
import TempsFilter from "../Filters/TempsFilter";
import Footer from "../Footer/Footer";
import broom from "../../assets/broom.svg";
import caretUp from "../../assets/caret-up.svg";

import "./cardStyles.css";

export default function Cards() {
  const dogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 10;

  const [showButton, setShowButton] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectTemp, setSelectTemp] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [origin, setOrigin] = useState("");
  const [clearFilters, setClearFilters] = useState(false);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  // console.log(dogs);
  let filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Resetear la página al buscar
  };

  const handleByTemperament = (value) => {
    setSelectTemp(value);
    // console.log(value);
    setCurrentPage(1); // Resetear la página al filtrar por temperamento
  };

  const handleByOrigin = (value) => {
    setOrigin(value);
    setCurrentPage(1); // Resetear la página al filtrar por origen
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(1); // Resetear la página al ordenar
  };

  if (origin === "api") {
    filteredDogs = filteredDogs.filter((dog) => typeof dog.id === "number");
  } else if (origin === "db") {
    filteredDogs = filteredDogs.filter((dog) => typeof dog.id === "string");
  }

  if (selectTemp) {
    filteredDogs = filteredDogs.filter(
      (dog) =>
        (dog.temperament && dog.temperament.includes(selectTemp)) ||
        (dog.temperaments &&
          dog.temperaments.some((temp) => temp.name === selectTemp))
    );
  }

  const sortedDogs = filteredDogs.slice().sort((a, b) => {
    if (sortField === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === "weight") {
      const weightA = parseInt(a.peso?.metric) || 0;
      const weightB = parseInt(b.peso?.metric) || 0;
      return sortOrder === "asc" ? weightA - weightB : weightB - weightA;
    }
  });

  const dogsToRender = sortedDogs.slice(indexOfFirstDog, indexOfLastDog);

  const totalPages = Math.ceil(filteredDogs.length / dogsPerPage);

  const goToFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0); // Desplazar al inicio de la página
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Desplazar al inicio de la página
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Desplazar al inicio de la página
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    window.scrollTo(0, 0); // Desplazar al inicio de la página
  };

  const handleClearFilters = () => {
    setClearFilters(true);
    setSearchTerm("");
    setSelectTemp("");
    setSortField("name");
    setSortOrder("asc");
    setOrigin("");
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) setShowButton(true);
      else setShowButton(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <NavBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="container">
        <section className="subNav">
          <div className="filtersContainer">
            <section className="filters">
              <SortingOpts
                onSortChange={handleSortChange}
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <TempsFilter onChange={handleByTemperament} />
              <button onClick={handleClearFilters} className="clearBtn">
                <img src={broom} alt="" />
              </button>
            </section>
            <Origin onFilterChange={handleByOrigin} />
          </div>
          {/* <p className="total">Total: {filteredDogs.length}</p> */}
        </section>
        <div className="cardsContainer">
          {dogsToRender.map((dog) => (
            <Card
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              temperaments={
                dog.temperament
                  ? dog.temperament.map((temperament) => temperament).join(", ")
                  : dog.temperaments
                      .map((temperament) => temperament.name)
                      .join(", ")
              }
              weight={
                dog.peso.metric ? `${dog.peso.metric} kg` : `${dog.peso} kg`
              }
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToFirstPage={goToFirstPage}
          prevPage={prevPage}
          nextPage={nextPage}
          goToLastPage={goToLastPage}
        />
      </div>
      <button
        onClick={goToTop}
        className={`goToTopButton ${showButton ? "show" : ""}`}
      >
        <img src={caretUp} alt="" />
      </button>
      <Footer />
    </>
  );
}
