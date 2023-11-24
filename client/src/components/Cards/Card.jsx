import React from "react";
import { NavLink } from "react-router-dom";
import pawPrint from "../../assets/paw-print.svg";

const defaultDogImages = {
  15: "https://upload.wikimedia.org/wikipedia/commons/a/a0/000_American_Pit_Bull_Terrier.jpg",
  125: "https://www.petfinder.com/sites/default/files/images/content/great-pyrenees-detail-scaled.jpg",
  212: "https://cdn.britannica.com/66/235666-050-751046D6/Saint-bernard-dog-st-bernard-standing-snow.jpg",
};

export default function Card({ id, name, image, temperaments, weight }) {
  const handleImgErr = (e) => {
    const defaultImage =
      defaultDogImages[id] ||
      "https://t4.ftcdn.net/jpg/00/77/64/25/360_F_77642529_CewIDsb6vDhkXV0Fcq7Rf2BXeuTZdr4g.jpg";
    e.target.src = defaultImage;
  };
  return (
    <div className="card">
      <div className="overlay">
        <figure>
          <img src={image} alt={name} onError={handleImgErr} />
        </figure>

        <section className="name-overlay">
          <p>
            <img src={pawPrint} alt="" />
            {name}
          </p>
        </section>
      </div>

      <section className="details">
        <p className="name">{name}</p>
        <p className="temperaments">{temperaments}</p>
        <p className="weight">{weight}</p>
        <NavLink to={`/detail/${id}`} className={"btn"}>
          See more
        </NavLink>
      </section>
    </div>
  );
}
