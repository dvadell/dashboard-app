import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import { getPageAction } from "../../actions";
import "./NavBar.css";
const API_URL = "http://localhost:9000/api/v1/";

const mapDispatchToProps = dispatch => {
  return {
    getPage: title => dispatch(getPageAction(title))
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
    this.props.getPage("random");
    window.history.pushState({}, "random", "random");
  };

  updateContent = e => {
    this.setState({ content: e.target.value });
  };

  handleInput = e => {
    //         content:   { type: String, default: '' },
    // relatedTo: { type: String, default: '' },
    // timestamp: { type: Date,   default: Date.now },
    // title:     { type: String }
    console.log("key", e.key);
    if (e.key === "Enter") {
      fetch(API_URL + "list/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          relatedTo: this.props.title,
          content: this.state.content
        })
      });
      this.setState({ content: "" });
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
