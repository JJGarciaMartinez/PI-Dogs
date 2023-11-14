import React from "react";
import { NavLink } from "react-router-dom";
import Dog from "../../assets/dog.svg";
import House from "../../assets/house.svg";
import Add from "../../assets/add.svg";
import SingOut from "../../assets/signOut.svg";

import "./navBarStyles.css";

export default function NavBar() {
  return (
    <>
      <div className="nav">
        <figure className="logo">
          <img src={Dog} alt="logo" /> DOGS
        </figure>

        <section className="links">
          <NavLink to="/home">
            <span>
              <img src={House} alt="home" />
              Home
            </span>
          </NavLink>

          <NavLink to="/newDog">
            <span>
              <img src={Add} alt="add" />
              Create
            </span>
          </NavLink>

          <NavLink to="/">
            <span>
              <img src={SingOut} alt="exit" />
              Exit
            </span>
          </NavLink>
        </section>
      </div>
    </>
  );
}
