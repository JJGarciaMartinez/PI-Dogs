import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Cards() {
  const dogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const filteredDogs = dogs.filter((dog) =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dogsToRender = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);

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

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset page number when search term changes
  };

  return (
    <div className="container">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
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
                : dog.temperaments.map((temperament) => temperament).join(", ")
            }
            weight={
              dog.peso.metric ? `${dog.peso.metric} kg` : `${dog.peso} kg`
            }
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToFirstPage={goToFirstPage}
          prevPage={prevPage}
          nextPage={nextPage}
          goToLastPage={goToLastPage}
        />
      </div>
    </div>
  );
}
