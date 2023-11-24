import React, { useState } from "react";
import searchIcon from "../../assets/search.svg";
import closeIcon from "../../assets/close.svg";
import "./searchBar.css";

export default function SearchBar({ searchTerm, onSearch }) {
  const [showInput, setShowInput] = useState(false);
  const [icon, setIcon] = useState(searchIcon);

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleButtonClick = () => {
    setShowInput(!showInput);
    setIcon(showInput ? searchIcon : closeIcon);
  };

  return (
    <div className="search-bar">
      <button onClick={handleButtonClick}>
        <img
          src={icon}
          alt=""
          className={`search-icon ${showInput ? "active" : ""}`}
        />
      </button>
      {!showInput && (
        <p className={`search-label ${showInput ? "hidden" : ""}`}>Search</p>
      )}
      <div className={`search-container ${showInput ? "visible" : ""}`}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search"
        />
      </div>
    </div>
  );
}
