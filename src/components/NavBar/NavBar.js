import React from "react";
import { Link } from "react-router-dom";
import SideBar from '../../components/SideBar/SideBar'
import Localizer from '../../components/Localizer/Localizer'
import translations from './NavBar.translations'
import './NavBar.css'

const Localize = Localizer(translations)

const linkStyle = {
    color: "white",
    display: "block",
    textAlign: "center",
    padding: "14px 12px",
    textDecoration: "none"
}

const divStyle = {
    width: "100%",
    background: "#333"
}

const ulStyle = {
    listStyleType: "none",
    padding: 0,
    marginTop: "6px"
}        

function NavBar() {
  return (
      <div style={{ display: "flex" }} id="gatosnavbar">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"app"} />

        <div style={divStyle} id="page-wrap">
          <ul style={ulStyle}>
            {/* <img src="/img/black_cat_line_navbar.png" style={{float: "left", height: "3em"}}
                 alt="Black Cat Line by George Bokhua" id="logo"></img> */}
            <li style={{float: "left"}}><Link style={linkStyle} to="/"><Localize>I Want</Localize></Link></li>
          </ul>
        </div>
      </div>
  );
}

export default NavBar;
