import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments } from "../../redux/actions";

export default function TempsFilter({ onChange }) {
  const [selectTemp, setSelectTemp] = useState("");
  const dispatch = useDispatch();

  const handleTempChange = (e) => {
    const selectedValue = e.target.value;
    setSelectTemp(selectedValue);
    onChange(selectedValue);
  };

  const temperamentos = useSelector((state) => state.temperament);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <p>Filter by temperaments:</p>
      <select name="temperament" onChange={handleTempChange} value={selectTemp}>
        <option value="">All</option>
        {temperamentos.map((temperament) => (
          <option key={temperament.UUID} value={temperament.name}>
            {temperament.name}
          </option>
        ))}
      </select>
    </div>
  );
}
