import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDogs } from "../../redux/actions";
import caretLeft from "../../assets/caret-left.svg";

import "./detailStyles.css";
import Footer from "../Footer/Footer";

const defaultDogImages = {
  15: "https://upload.wikimedia.org/wikipedia/commons/a/a0/000_American_Pit_Bull_Terrier.jpg",
  125: "https://www.petfinder.com/sites/default/files/images/content/great-pyrenees-detail-scaled.jpg",
  212: "https://cdn.britannica.com/66/235666-050-751046D6/Saint-bernard-dog-st-bernard-standing-snow.jpg",
};

export default function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const allDogs = useSelector((state) => state.allDogs);
  const detail = allDogs.find((dog) => dog.id == id);

  const defaultImage = defaultDogImages[id] || "";

  return (
    <div className="detail-container">
      <span className="detail-header">
        <NavLink to="/home" className="back-btn">
          <img src={caretLeft} alt="" /> <p>Back</p>
        </NavLink>
        <h1>Details of {detail ? detail.name : ""}</h1>
      </span>
      {detail ? (
        <section className="detail-section">
          <figure>
            <img src={defaultImage || detail.image} alt={detail.name} />
          </figure>
          <div className="detail-info">
            <section>
              <p className="name">{detail.name}</p>

              <p className="height">
                Height:{" "}
                {detail.altura.metric ? detail.altura.metric : detail.altura} cm
              </p>

              <p className="weight">
                Weight: {detail.peso.metric ? detail.peso.metric : detail.peso}{" "}
                kg
              </p>

              <p className="lifespan">Life Span: {detail.lifespan}</p>

              <span className="temps-container">
                <p className="temps-title">Temperaments:</p>
                <p className="temps">
                  {detail.temperament
                    ? detail.temperament
                        .map((temperament) => temperament)
                        .join(", ")
                    : detail.temperaments
                        .map((temperament) => temperament.name)
                        .join(", ")}
                </p>
              </span>
            </section>
          </div>
        </section>
      ) : null}

      <figure className="background"></figure>
      <Footer />
    </div>
  );
}
