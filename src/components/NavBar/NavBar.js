import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Localizer from "../../components/Localizer/Localizer";
import translations from "./NavBar.translations";
import "./NavBar.css";

const Localize = Localizer(translations);

// const linkStyle = {
//   color: "white",
//   display: "block",
//   textAlign: "center",
//   padding: "14px 12px",
//   textDecoration: "none"
// };

// const divStyle = {
//   width: "100%",
//   background: "#333"
// };

// const ulStyle = {
//   listStyleType: "none",
//   padding: 0,
//   marginTop: "6px"
// };

function NavBar() {
  return (
    <div class="navbarwithburger">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"app"} />
      <div className="non-bootstrap-navbar" id="page-wrap">
        {/* 
        <Link to="/">
          <Localize>I Want</Localize>
        </Link> */}

        <div className="textarea-div">
          <textarea
            placeholder="Tell me something..."
            aria-label="Tell me something..."
          ></textarea>
        </div>

        <div>
          <Link to="random">
            <img
              src="/img/dado_rojo_chico.png"
              style={{ height: "3em" }}
              alt="Random!"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
