import React from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import { getPageAction } from "../../actions";
import Localizer from "../../components/Localizer/Localizer";
import translations from "./NavBar.translations";
import "./NavBar.css";

const Localize = Localizer(translations);

const mapDispatchToProps = dispatch => {
  return {
    getPage: title => dispatch(getPageAction(title))
  };
};

function NavBar({ getPage }) {
  const goToRandom = () => {
    getPage("random");
    window.history.pushState({}, "random", "random");
  };

  return (
    <div className="navbarwithburger non-bootstrap-navbar">
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"app"} />
      <div id="page-wrap"></div>

      <div className="textarea-div">
        <textarea
          placeholder="Tell me something..."
          aria-label="Tell me something..."
        ></textarea>
      </div>

      <div>
        <img
          src="/img/dado_rojo_chico.png"
          style={{ height: "3em" }}
          alt="Random!"
          onClick={goToRandom}
        ></img>
      </div>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
