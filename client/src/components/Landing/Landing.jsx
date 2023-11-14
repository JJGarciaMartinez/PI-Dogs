import React from "react";
import { NavLink } from "react-router-dom";

export default function landing() {
  return (
    <div className="landing">
      landing
      <br />
      <NavLink to="/home">Home</NavLink>
    </div>
  );
}
