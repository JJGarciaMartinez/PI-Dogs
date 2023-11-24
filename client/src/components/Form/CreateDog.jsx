import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { postDog } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import caretLeft from "../../assets/caret-left.svg";
import broom from "../../assets/broom.svg";
import pawPrint from "../../assets/paw-print.svg";
import "./formStyles.css";
import Footer from "../Footer/Footer";

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
          window.scrollTo(0, 0);
        }, 1000);
      })
      .catch((error) => {
        setError("Something went wrong. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className="createDog-container">
      <span className="createDog-header">
        <NavLink to="/home" className="back-btn">
          <img src={caretLeft} alt="" /> <p>Back</p>
        </NavLink>
        <h1>Create a new dog</h1>
      </span>

      <span className="success-message">
        {success && <p className="success">{success}</p>}
      </span>

      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="labels-container">
          {/*  NAME  */}
          <label className="name">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <p>Name</p>
            <span>
              {error && form.name === "" && <p>{error}* </p>}
              {error && form.name.length > 20 && <p>{error}* </p>}
            </span>
          </label>
          {/*  IMAGE  */}
          <label className="image">
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleInputChange}
              placeholder="Image URL"
            />
            <p>
              Image <li>(URL)</li>
            </p>
            <span>{error && form.image === "" && <p>{error}* </p>}</span>
          </label>

          {/*  HEIGHT  */}
          <label className="minHeight">
            <input
              type="number"
              name="minHeight"
              value={form.minHeight}
              onChange={handleInputChange}
              min={1}
              placeholder="Min Height"
            />
            <p>Min Height</p>
            <span>{minHeightErr && <p>{minHeightErr}*</p>}</span>
          </label>
          <label className="maxHeight">
            <input
              type="number"
              name="maxHeight"
              value={form.maxHeight}
              onChange={handleInputChange}
              min={1}
              placeholder="Max Height"
            />
            <p>Max Height</p>
            <span>{maxHeightErr && <p>{maxHeightErr}*</p>}</span>
          </label>

          {/*  WEIGHT  */}
          <label className="minWeight">
            <input
              type="number"
              name="minWeight"
              value={form.minWeight}
              onChange={handleInputChange}
              min={1}
              placeholder="Min Weight"
            />
            <p>Min Weight</p>
            <span>{minWeightErr && <p>{minWeightErr}*</p>}</span>
          </label>
          <label className="maxWeight">
            <input
              type="number"
              name="maxWeight"
              value={form.maxWeight}
              onChange={handleInputChange}
              min={1}
              placeholder="Max Weight"
            />
            <p>Max Weight</p>
            <span>{maxWeightErr && <p>{maxWeightErr}*</p>}</span>
          </label>

          <section className="lifeSpan">
            {/*  LIFE SPAN  */}
            <label className="lifeSpan">
              <input
                type="number"
                name="lifeSpan"
                value={form.lifeSpan}
                onChange={handleInputChange}
                min={1}
                placeholder="Life Span"
              />
              <p>Life Span</p>
              <span>{error && isNaN(form.lifeSpan) && <p>{error}* </p>}</span>
            </label>
          </section>

          {/*  TEMPERAMENTS  */}
          <section className="temperaments">
            <label>
              Temperaments:
              <select
                multiple
                value={form.temperament}
                onChange={handleTempChange}
              >
                {temperaments.map((temperament) => (
                  <option key={temperament.UUID} value={temperament.name}>
                    {temperament.name}
                  </option>
                ))}
              </select>
            </label>
          </section>
        </div>

        <span className="temperament-show">
          <ul>
            {form.temperament.map((temperament, index) => (
              <li key={index}>{temperament},</li>
            ))}
          </ul>
        </span>
        <span className="temperaments-delete">
          {form.temperament.length > 0 && (
            <button onClick={() => setForm({ ...form, temperament: [] })}>
              <img src={broom} alt="" />
              <p>Remove Selection</p>
            </button>
          )}
        </span>
        <button type="submit" className="submit-btn">
          <img src={pawPrint} alt="" />
          <p>Create new Dog</p>
        </button>
        {error && (
          <p className="error-btn">There are one or more unfilled fields*</p>
        )}
      </form>
      <figure className="background"></figure>

      <Footer />
    </div>
  );
}
