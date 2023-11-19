import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDogs } from "../../redux/actions";
import "./detailStyles.css";

export default function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  const allDogs = useSelector((state) => state.allDogs);
  const detail = allDogs.find((dog) => dog.id == id);

  return (
    <div className="detail-container">
      <h1>Details</h1>
      <NavLink to="/home">Back</NavLink>
      {detail ? (
        <>
          <figure>
            <img src={detail.image} alt={detail.name} />
          </figure>
          <section>
            <p>{detail.name}</p>
            <p>
              {detail.altura.metric ? detail.altura.metric : detail.altura} cm
            </p>
            <p>{detail.peso.metric ? detail.peso.metric : detail.peso} kg</p>
            <p>{detail.lifespan}</p>

            <span>
              Temperaments:
              <p>
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
        </>
      ) : null}
    </div>
  );
}
