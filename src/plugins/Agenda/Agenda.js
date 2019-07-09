import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import Mousetrap from "mousetrap";
import PanelItem from "../../components/PanelItem/PanelItem";
import "./Agenda.css";
import Accordeon from "../../components/Accordeon/Accordeon";
import AccordeonItem from "../../components/Accordeon/AccordeonItem";
import Calendar from "react-calendar";
import { getPageAction, savePageAction } from "../../actions";

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

  saveEverything = title => {
    // Get all the state, everywhere
    let newState = { title };
    Object.keys(this.myRefs).map(panelName => {
      newState[panelName] = this.myRefs[panelName].current.state.content;
    });
    this.props.savePage(newState);

    if (newState.description === undefined) return false; // Just a safeguard
    fetch(API_URL + "quieros/" + title, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newState)
    });
  };

  componentDidMount() {
    console.log("mounted! props is", this.props.page);

    Mousetrap.bind(["ctrl+s", "meta+s"], e => {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      this.saveEverything(this.props.page.title);
    });

    this.loadEverything(this.props.match.params.title);
  }

  render() {
    return this.props.page ? (
      <div id="content" className="container-fluid d-flex h-100 flex-column">
        <div className="row bg-light flex-fill d-flex justify-content-start">
          <div className="col-md-3 col-xs-12">
            <Calendar
              onChange={this.onChangeCalendar}
              value={this.state.date}
              onClickDay={this.onClickDay}
            />
          </div>

          <div className="col-md-6 col-xs-12">
            <h2 style={{ textAlign: "center" }}>{this.props.page.title}</h2>
            <PanelItem
              name="description"
              ref={this.myRefs.description}
              doSave={this.doSave("description")}
              content={this.props.page.description}
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <Accordeon>
              <AccordeonItem title="What for?">
                <PanelItem
                  name="whatFor"
                  ref={this.myRefs.whatFor}
                  content={this.props.page.whatFor}
                  doSave={this.doSave("whatFor")}
                />
              </AccordeonItem>
              <AccordeonItem title="Pros">
                <PanelItem
                  name="pros"
                  ref={this.myRefs.pros}
                  content={this.props.page.pros}
                  doSave={this.doSave("pros")}
                />
              </AccordeonItem>
              <AccordeonItem title="Cons">
                <PanelItem
                  name="cons"
                  ref={this.myRefs.cons}
                  content={this.props.page.cons}
                  doSave={this.doSave("cons")}
                />
              </AccordeonItem>
            </Accordeon>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agenda);
