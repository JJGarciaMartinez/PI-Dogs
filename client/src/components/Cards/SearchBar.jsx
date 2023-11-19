import React from "react";

export default function SearchBar({ searchTerm, onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search"
      />
    </>
  );
}
