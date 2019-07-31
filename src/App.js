import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Mousetrap from "mousetrap";
import { getPageAction, savePageAction } from "./actions";
import Agenda from "./plugins/Agenda/Agenda";
import Project from "./plugins/Project/Project";
import { savePage } from "./fetchlib";
import "./App.css";

const mapStateToProps = state => {
  return {
    page: state.PagesReducer,
    viewHandler: state.ViewReducer.viewHandler
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
    this.props.savePage(newState);
    console.log("saving", newState);

    if (newState.description === undefined) return false; // Just a safeguard
    savePage(this.props.page.title, newState);
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
    const renderView = {
      ag: (
        <Agenda
          myRefs={this.myRefs}
          doSave={this.saveEverything}
          loadEverything={this.loadEverything}
          onClickDay={this.onClickDay}
          {...this.props}
        />
      ),
      pr: (
        <Project
          myRefs={this.myRefs}
          doSave={this.saveEverything}
          loadEverything={this.loadEverything}
          onClickDay={this.onClickDay}
          {...this.props}
        />
      ),
      meta: (
        <Project
          myRefs={this.myRefs}
          doSave={this.saveEverything}
          loadEverything={this.loadEverything}
          onClickDay={this.onClickDay}
          {...this.props}
        />
      )
    };
    if (this.props.page) {
      Object.keys(this.props.page).forEach(key => {
        console.log("Making ref for", key);
        this.myRefs[key] = createRef();
      });
      return renderView[this.props.viewHandler] || "ERROR :(";
    } else {
      return "";
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
