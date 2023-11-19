import React from "react";
import { NavLink } from "react-router-dom";
import dogSvg from "../../assets/dog.svg";
import silhouette from "../../assets/silueta.svg";
import pawPrint from "../../assets/paw-print.svg";
import "./landingStyles.css";

export default function landing() {
  return (
    <>
      <figure className="logo-landing">
        <img src={dogSvg} alt="" className="logo-img" />
        <p className="logo-text">DOGS</p>
      </figure>
      <div className="landing-container">
        <div className="welcome">
          <span>
            <p className="welcome-title">WELCOME!</p>
            <p className="welcome-text">Find your new best friend.</p>
          </span>
          <span>
            <img src={silhouette} alt="" className="logo-welcome" />
          </span>
        </div>
        <NavLink to="/home" className="btn-landing">
          <p>GO TO HOME</p>
          <img src={pawPrint} alt="" />
        </NavLink>
      </div>
    </>
  );
}
