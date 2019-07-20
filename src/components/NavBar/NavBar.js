import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import { getPageAction, getRandomPageAction } from "../../actions";
import { loadPage, savePage } from "../../fetchlib";
import "./NavBar.css";

const mapDispatchToProps = dispatch => {
  return {
    getPage: title => dispatch(getPageAction(title)),
    getRandomPage: title => dispatch(getRandomPageAction())
  };
};

const mapStateToProps = state => {
  return {
    title: state.PagesReducer.title
  };
};

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  goToRandom = () => {
    this.props.getRandomPage("random");
  };

  updateContent = e => {
    this.setState({ content: e.target.value });
  };

  appendLeadingZeroes = n => (n < 10 ? "0" + n : n);

  formatDate = date => {
    return (
      date.getFullYear() +
      "-" +
      this.appendLeadingZeroes(date.getMonth() + 1) +
      "-" +
      this.appendLeadingZeroes(date.getDate()) +
      " " +
      this.appendLeadingZeroes(date.getHours()) +
      ":" +
      this.appendLeadingZeroes(date.getMinutes()) +
      "hs"
    );
  };

  handleInput = e => {
    // We send the thought when pressing Enter, but not if pressing Shift+Enter
    console.log("key", e.key, "shift:", e.shiftKey);
    if (e.key === "Enter" && !e.shiftKey) {
      loadPage("list of thoughts").then(json => {
        json.description =
          json.description +
          "\n* " +
          this.state.content +
          "\n// Note: written while in [[" +
          this.props.title +
          "]] at " +
          this.formatDate(new Date());
        savePage("list of thoughts", json).then(() =>
          this.setState({ content: "" })
        );
      });
    }
  };

  render() {
    return (
      <div className="navbarwithburger non-bootstrap-navbar">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"app"} />
        <div id="page-wrap"></div>

        <div className="textarea-div">
          <textarea
            onChange={this.updateContent}
            onKeyUp={this.handleInput}
            value={this.state.content}
            placeholder="Tell me something..."
            aria-label="Tell me something..."
          ></textarea>
        </div>

        <div>
          <img
            src="/img/dado_rojo_chico.png"
            style={{ height: "3em" }}
            alt="Random!"
            onClick={this.goToRandom}
          ></img>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
