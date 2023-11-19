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
        <figure className="logo-nav">
          <img src={Dog} alt="logo" /> DOGS
        </figure>

        <section className="links">
          <NavLink to="/home">
            <span>
              <p>Home</p>
              <img src={House} alt="home" />
            </span>
          </NavLink>

          <NavLink to="/newDog">
            <span>
              <p>Create Dog</p>
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
