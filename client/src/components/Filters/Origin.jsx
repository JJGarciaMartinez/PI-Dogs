import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { originFilter } from "../../redux/actions";

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
    <div>
      <p>Filter by Origin:</p>
      <label htmlFor="">
        <input
          type="radio"
          name="origin"
          value="api"
          checked={origin === "api"}
          onChange={handleOriginChange}
        />
        API
      </label>
      <label htmlFor="">
        <input
          type="radio"
          name="origin"
          value="db"
          checked={origin === "db"}
          onChange={handleOriginChange}
        />
        DB
      </label>
      <label htmlFor="">
        <input
          type="radio"
          name="origin"
          value="all"
          checked={origin === "all"}
          onChange={handleOriginChange}
        />
        All
      </label>
    </div>
  );
}
