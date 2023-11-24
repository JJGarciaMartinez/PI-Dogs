import React from "react";
import "./filterStyles.css";

export default function SortingOpts({ onSortChange, sortField, sortOrder }) {
  const handleSortChange = (event) => {
    const { value } = event.target;
    const [field, order] = value.split("-");
    onSortChange(field, order);
  };

  return (
    <div className="sorting-container">
      <p>Sort By: </p>

      <select
        id="sortField"
        value={`${sortField}-${sortOrder}`}
        onChange={handleSortChange}
        className="sorting-select"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="weight-asc">Weight (Low to High)</option>
        <option value="weight-desc">Weight (High to Low)</option>
      </select>
    </div>
  );
}
