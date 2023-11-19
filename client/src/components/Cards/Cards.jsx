import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import Origin from "../Filters/Origin";
import SortingOpts from "../Filters/SortingOpts";
import TempsFilter from "../Filters/TempsFilter";

export default function Cards() {
  const dogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectTemp, setSelectTemp] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [origin, setOrigin] = useState("");

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
      const weightA = parseFloat(a.peso?.metric) || 0;
      const weightB = parseFloat(b.peso?.metric) || 0;
      return sortOrder === "asc" ? weightA - weightB : weightB - weightA;
    }
  });

  const dogsToRender = sortedDogs.slice(indexOfFirstDog, indexOfLastDog);

  const totalPages = Math.ceil(filteredDogs.length / dogsPerPage);

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="container">
      <section className="subNav">
        <span className="filters">
          <SortingOpts
            onSortChange={handleSortChange}
            sortField={sortField}
            sortOrder={sortOrder}
          />
          <Origin onFilterChange={handleByOrigin} />
          <TempsFilter onChange={handleByTemperament} />
        </span>
        {/* <p className="total">Total: {filteredDogs.length}</p> */}
        <span className="searchBar">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </span>
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
  );
}
