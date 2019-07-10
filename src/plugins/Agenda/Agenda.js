import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Mousetrap from "mousetrap";
import "./Agenda.css";

import { getPageAction, savePageAction } from "../../actions";
import AgendaView from "./AgendaView";

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

class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    console.log("constructed! ", this.props.page);
  }

  myRefs = {
    pros: createRef(),
    cons: createRef(),
    whatFor: createRef(),
    description: createRef()
  };

  doSave(name) {
    return content => {
      console.log("doSave", name, content);
      this.saveEverything(this.props.page.title);
    };
  }

  // onChangeCalendar = date => this.setState({ date });

  onClickDay = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    this.saveEverything(this.props.page.title);
    console.log(formattedDate);
    this.loadEverything(formattedDate);
    this.props.history.push("/ag/" + formattedDate);
  };

  loadEverything = title => {
    console.log("Loading Everything about", title);
    this.props.getPage(title);
  };

  saveEverything = () => {
    // Get all the state, everywhere
    let newState = { title: this.props.page.title };
    Object.keys(this.myRefs).map(panelName => {
      newState[panelName] = this.myRefs[panelName].current.state.content;
    });
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
    return this.props.page ? (
      <AgendaView
        myRefs={this.myRefs}
        doSave={this.saveEverything}
        onClickDay={this.onClickDay}
        {...this.props}
      />
    ) : (
      ""
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agenda);
