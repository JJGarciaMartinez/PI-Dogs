import React from "react";
import { NavLink } from "react-router-dom";
import "./cardStyles.css";

const defaultDogImages = {
  15: "https://upload.wikimedia.org/wikipedia/commons/a/a0/000_American_Pit_Bull_Terrier.jpg",
  125: "https://www.petfinder.com/sites/default/files/images/content/great-pyrenees-detail-scaled.jpg",
  212: "https://cdn.britannica.com/66/235666-050-751046D6/Saint-bernard-dog-st-bernard-standing-snow.jpg",
};

export default function Card({ id, name, image, temperaments, weight }) {
  const handleImgErr = (e) => {
    const defaultImage =
      defaultDogImages[id] ||
      "https://www.nicepng.com/png/detail/221-2215035_404doge-doge-404.png";
    e.target.src = defaultImage;
  };
  return (
    <div className="card">
      <figure>
        <img src={image} alt={name} onError={handleImgErr} />
      </figure>
      <section>
        <p className="name">{name}</p>
        <p className="temperaments">{temperaments}</p>
        <p className="weight">{weight}</p>
        <NavLink to={`/detail/${id}`} className={"btn"}>
          Detail
        </NavLink>
      </section>
    </div>
  );
}
