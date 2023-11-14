import React from "react";

export default function SearchBar({ searchTerm, onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleInputChange}
      className="search"
    />
  );
}
