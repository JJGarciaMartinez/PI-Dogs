import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Dog from "../../assets/dog.svg";
import House from "../../assets/house.svg";
import Add from "../../assets/add.svg";
import SingOut from "../../assets/signOut.svg";
import SearchBar from "../SearchBar/SearchBar";

import "./navBarStyles.css";

export default function NavBar({ searchTerm, onSearch }) {
  const location = useLocation();

  return (
    <>
      <div className="nav">
        <figure className="logo-nav">
          <img src={Dog} alt="logo" /> DOGS
        </figure>

        {!location.pathname.includes("/detail") &&
          !location.pathname.includes("/newDog") && (
            <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
          )}

        <section className="links">
          <NavLink to="/home">
            <span>
              <p>Home</p>
              <img src={House} alt="home" />
            </span>
          </NavLink>

          <NavLink to="/newDog">
            <span>
              <p>Add</p>
              <img src={Add} alt="add" />
            </span>
          </NavLink>

          <NavLink to="/">
            <span>
              <p>Exit</p>
              <img src={SingOut} alt="exit" />
            </span>
          </NavLink>
        </section>
      </div>
    </>
  );
}
