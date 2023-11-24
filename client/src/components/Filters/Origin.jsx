import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { originFilter } from "../../redux/actions";
import "./filterStyles.css";

export default function Origin({ onFilterChange }) {
  const [origin, setOrigin] = useState("");
  const dispatch = useDispatch();

  const handleOriginChange = (e) => {
    const selectedOrigin = e.target.value;
    setOrigin(selectedOrigin);
    dispatch(originFilter(selectedOrigin));
    onFilterChange(selectedOrigin);
  };

  return (
    <div className="origin-container">
      <p>By Origin:</p>
      <section className="origin-options">
        <input
          type="radio"
          name="origin"
          value="api"
          checked={origin === "api"}
          onChange={handleOriginChange}
        />
        <label>API</label>
        <input
          type="radio"
          name="origin"
          value="db"
          checked={origin === "db"}
          onChange={handleOriginChange}
        />
        <label>DB</label>
        <input
          type="radio"
          name="origin"
          value="all"
          checked={origin === "all"}
          onChange={handleOriginChange}
        />
        <label>All</label>
      </section>
    </div>
  );
}
