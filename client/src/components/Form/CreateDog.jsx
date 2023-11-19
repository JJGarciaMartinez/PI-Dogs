import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { postDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./formStyles.css";

export default function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperament);

  const [form, setForm] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    lifeSpan: "",
    temperament: [],
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [minHeightErr, setMinHeightErr] = useState(false);
  const [maxHeightErr, setMaxHeightErr] = useState(false);
  const [minWeightErr, setMinWeightErr] = useState(false);
  const [maxWeightErr, setMaxWeightErr] = useState(false);

  const validateName = (name) => {
    if (/\d/.test(name)) {
      return "Name cannot contain numbers";
    }
    return "";
  };

  const validateMinMax = (min, max) => {
    if (parseInt(min) > parseInt(max)) {
      return "Min value cannot be greater than max value";
    }
    return "";
  };

  const validateForm = (fromData) => {
    const { name, minHeight, maxHeight, minWeight, maxWeight } = fromData;
    const errors = {};

    const nameError = validateName(name);
    if (nameError) {
      errors.name = nameError;
    }

    const heightError = validateMinMax(minHeight, maxHeight);
    if (heightError) {
      errors.minHeight = heightError;
    }

    const weightError = validateMinMax(minWeight, maxWeight);
    if (weightError) {
      errors.minWeight = weightError;
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTempChange = (e) => {
    const selectedTemperament = e.target.value;

    setForm((prevForm) => ({
      ...prevForm,
      temperament: prevForm.temperament.includes(selectedTemperament)
        ? prevForm.temperament.filter((item) => item !== selectedTemperament)
        : [...prevForm.temperament, selectedTemperament],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = form.name.trim();

    if (nombre === "") {
      setError("Name cannot be empty");
      return;
    }

    if (nombre.length > 20) {
      setError("Name must be less than 20 characters");
      return;
    }

    if (
      form.minHeight === "" ||
      form.maxHeight === "" ||
      form.minWeight === "" ||
      form.maxWeight === "" ||
      isNaN(form.lifeSpan)
    ) {
      setError("All fields are required");
      return;
    }

    const hmin = parseInt(form.minHeight);
    const hmax = parseInt(form.maxHeight);
    const wmin = parseInt(form.minWeight);
    const wmax = parseInt(form.maxWeight);

    if (hmin >= hmax) {
      setMinHeightErr("Min height must be less than max height");
      return;
    } else setMinHeightErr("");

    if (wmin >= wmax) {
      setMinWeightErr("Min weight must be less than max weight");
      return;
    } else setMinWeightErr("");

    const newDog = {
      image: form.image,
      name: nombre,
      peso: `${wmin} - ${wmax}`,
      altura: `${hmin} - ${hmax}`,
      lifespan: parseInt(form.lifeSpan),
      temperaments: form.temperament,
    };

    dispatch(postDog(newDog))
      .then(() => {
        setSuccess("Dog has been successfully created.");
        setTimeout(() => {
          navigate("/home");
        }, 1600);
      })
      .catch((error) => {
        setError("Something went wrong. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className="createDog-container">
      <NavLink to="/home">Back</NavLink>

      <span>
        <h1 className="title">Create new Dog</h1>
        {success && <p className="success">{success}</p>}
      </span>

      <form action="" className="form" onSubmit={handleSubmit}>
        {/*  NAME  */}
        <label htmlFor="">Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <span>
          {error && form.name === "" && <p>{error} </p>}
          {error && form.name.length > 20 && <p>{error} </p>}
        </span>
        {/*  IMAGE  */}
        <label htmlFor="">Image:</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <span>{error && form.image === "" && <p>{error} </p>}</span>
        {/*  HEIGHT  */}
        <label htmlFor="">Min Height:</label>
        <input
          type="number"
          name="minHeight"
          value={form.minHeight}
          onChange={handleInputChange}
          min={1}
          placeholder="Min Height"
        />{" "}
        cm
        <span>{minHeightErr && <p>{minHeightErr}</p>}</span>
        <label htmlFor="">Max Height:</label>
        <input
          type="number"
          name="maxHeight"
          value={form.maxHeight}
          onChange={handleInputChange}
          min={1}
          placeholder="Max Height"
        />
        cm
        <span>{maxHeightErr && <p>{maxHeightErr}</p>}</span>
        {/*  WEIGHT  */}
        <label htmlFor="">Min Weight:</label>
        <input
          type="number"
          name="minWeight"
          value={form.minWeight}
          onChange={handleInputChange}
          min={1}
          placeholder="Min Weight"
        />
        <span>{minWeightErr && <p>{minWeightErr}</p>}</span>
        <label htmlFor="">Max Weight:</label>
        <input
          type="number"
          name="maxWeight"
          value={form.maxWeight}
          onChange={handleInputChange}
          min={1}
          placeholder="Max Weight"
        />
        <span>{maxWeightErr && <p>{maxWeightErr}</p>}</span>
        {/*  LIFE SPAN  */}
        <label htmlFor="">Life Span:</label>
        <input
          type="number"
          name="lifeSpan"
          value={form.lifeSpan}
          onChange={handleInputChange}
          min={1}
          placeholder="Life Span"
        />{" "}
        years
        <span>{error && isNaN(form.lifeSpan) && <p>{error} </p>}</span>
        {/*  TEMPERAMENTS  */}
        <label htmlFor="">Temperaments:</label>
        <select multiple value={form.temperament} onChange={handleTempChange}>
          {temperaments.map((temperament) => (
            <option key={temperament.UUID} value={temperament.name}>
              {temperament.name}
            </option>
          ))}
        </select>
        <button type="submit">Create new Dog</button>
      </form>
    </div>
  );
}
