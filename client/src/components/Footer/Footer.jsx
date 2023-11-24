import React from "react";
import gitHub from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import code from "../../assets/code-simple.svg";
import copyLeft from "../../assets/copy-left.svg";
import dog from "../../assets/dog.svg";
import soyHenry from "../../assets/soyHenry.svg";
import "./footerStyles.css";

export default function Footer() {
  return (
    <footer>
      <div className="info-container">
        <section className="social-container">
          <a href="https://github.com/JJGarciaMartinez/PI-Dogs">
            <img src={gitHub} alt="" />
          </a>
          <a href="www.linkedin.com/in/juanjgarcia23">
            <img src={linkedin} alt="" />
          </a>
          <a href="https://api.thedogapi.com/v1/">
            <img src={dog} alt="" />
          </a>
          <a href="https://www.soyhenry.com">
            <img src={soyHenry} alt="" className="logo-henry" />
          </a>
        </section>

        <span className="line"></span>

        <section className="info">
          <p>
            Template by
            <a href="https://www.soyhenry.com">Soy Henry</a>
          </p>
          <p>
            <img src={code} alt="" />{" "}
            <a href="https://github.com/JJGarciaMartinez">
              Juan J. Garc&iacute;a
            </a>
          </p>
        </section>

        <section className="copy">
          <p>
            <img src={copyLeft} alt="" />
            Juan J. Garc&iacute;a
          </p>
        </section>
      </div>
    </footer>
  );
}
