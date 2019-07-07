import React from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Localizer from "../../components/Localizer/Localizer";
import translations from "./NavBar.translations";
import "./NavBar.css";

const Localize = Localizer(translations);

const linkStyle = {
  color: "white",
  display: "block",
  textAlign: "center",
  padding: "14px 12px",
  textDecoration: "none"
};

const divStyle = {
  width: "100%",
  background: "#333"
};

const ulStyle = {
  listStyleType: "none",
  padding: 0,
  marginTop: "6px"
};

function NavBar() {
  return (
    <div style={{ display: "flex" }} id="gatosnavbar">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"app"} />

      <div style={divStyle} id="page-wrap">
        <ul style={ulStyle}>
          <li style={{ float: "left" }}>
            <Link style={linkStyle} to="/">
              <Localize>I Want</Localize>
            </Link>
          </li>
          <Link to="random">
            <img
              src="/img/dado_rojo_chico.png"
              style={{ float: "right", height: "3em" }}
              alt="Random!"
              id="logo"
            ></img>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
