import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Mousetrap from "mousetrap";
import { getPageAction, savePageAction } from "./actions";
import Agenda from "./plugins/Agenda/Agenda";
import Project from "./plugins/Project/Project";

import "./App.css";

const API_URL = "http://localhost:9000/api/v1/";

const mapStateToProps = state => {
  return {
    page: state.PagesReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPage: title => dispatch(getPageAction(title)),
    savePage: title => dispatch(savePageAction(title))
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    console.log("constructed! ", this.props.page);
  }

  myRefs = {};

  doSave(name) {
    return content => {
      console.log("doSave", name, content);
      this.saveEverything(this.props.page.title);
    };
  }

  loadEverything = title => {
    console.log("Loading Everything about", title);
    this.props.getPage(title);
  };

  saveEverything = () => {
    // Get all the state, everywhere
    let newState = { ...this.props.page };
    Object.keys(this.myRefs).forEach(panelName => {
      if (this.myRefs[panelName].current) {
        newState[panelName] = this.myRefs[panelName].current.state.content;
      }
    });
    console.log({ newState });
    this.props.savePage(newState);
    console.log("saving", newState);

    if (newState.description === undefined) return false; // Just a safeguard
    fetch(API_URL + "quieros/" + this.props.page.title, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newState)
    });
  };

  componentDidMount() {
    console.log("mounted! props is", this.props.page);

    Mousetrap.bind(["ctrl+s", "meta+s"], e => {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      this.saveEverything();
    });

    this.loadEverything(this.props.match.params.title);
  }

  render() {
    if (this.props.page) {
      Object.keys(this.props.page).forEach(
        key => (this.myRefs[key] = createRef())
      );
      console.log(this.props.page);
      if (this.props.page.viewHandler === "ag") {
        return (
          <Agenda
            myRefs={this.myRefs}
            doSave={this.saveEverything}
            loadEverything={this.loadEverything}
            onClickDay={this.onClickDay}
            {...this.props}
          />
        );
      }
      return (
        <Project
          myRefs={this.myRefs}
          doSave={this.saveEverything}
          loadEverything={this.loadEverything}
          onClickDay={this.onClickDay}
          {...this.props}
        />
      );
    } else {
      return "";
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
