import React, { Component, createRef } from "react";
import Mousetrap from "mousetrap";
import PanelItem from "../../components/PanelItem/PanelItem";
import "./Agenda.css";
import Accordeon from "../../components/Accordeon/Accordeon";
import AccordeonItem from "../../components/Accordeon/AccordeonItem";
import Calendar from "react-calendar";

const API_URL = "http://localhost:9000/api/v1/";

class IWant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.match.params.title || "Página Principal",
      pros: "",
      cons: "",
      whatFor: "",
      description: "",
      date: new Date()
    };
    console.log("constructed! title is", this.state.title);
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
      this.setState({ [name]: content });
    };
  }

  onChangeCalendar = date => this.setState({ date });

  onClickDay = date => {
    const formattedDate = date.toISOString().slice(0, 10);
    this.saveEverything(this.state.title);
    console.log(formattedDate);
    this.loadEverything(formattedDate);
    this.props.history.push("/ag/" + formattedDate);
  };

  loadEverything = title => {
    console.log("Loading Everything about", title);
    fetch(API_URL + "quieros/" + title)
      .then(res => res.json())
      .then(json => {
        console.log("new data:");
        this.setState({ ...json });
      })
      .catch(err => this.setState({ err }));
  };

  saveEverything = title => {
    // Get all the state, everywhere
    let newState = {};
    Object.keys(this.myRefs).map(panelName => {
      newState[panelName] = this.myRefs[panelName].current.state.content;
    });
    this.setState({ ...newState });

    if (this.state.description === undefined) return false; // Just a safeguard
    fetch(API_URL + "quieros/" + title, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cons: this.state.cons,
        pros: this.state.pros,
        description: this.state.description,
        title: this.state.title,
        whatFor: this.state.whatFor
      })
    });
  };

  componentWillReceiveProps(newProps, oldProps) {
    console.log("Will receive new props", { newProps, oldProps });
    if (this.state.title !== newProps.match.params.title) {
      this.loadEverything(newProps.match.params.title);
    }
  }

  componentDidMount() {
    console.log("mounted! title is", this.state.title);
    Mousetrap.bind(["ctrl+s", "meta+s"], e => {
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      this.saveEverything(this.state.title);
    });
    this.loadEverything(this.state.title);
  }

  render() {
    console.log("rendering! title is", this.state.title);
    return (
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
            <h2 style={{ textAlign: "center" }}>{this.state.title}</h2>
            <PanelItem
              name="description"
              ref={this.myRefs.description}
              doSave={this.doSave("description")}
              content={this.state.description}
            />
          </div>
          <div className="col-md-3 col-xs-12">
            <Accordeon>
              <AccordeonItem title="What for?">
                <PanelItem
                  name="whatFor"
                  ref={this.myRefs.whatFor}
                  content={this.state.whatFor}
                  doSave={this.doSave("whatFor")}
                />
              </AccordeonItem>
              <AccordeonItem title="Pros">
                <PanelItem
                  name="pros"
                  ref={this.myRefs.pros}
                  content={this.state.pros}
                  doSave={this.doSave("pros")}
                />
              </AccordeonItem>
              <AccordeonItem title="Cons">
                <PanelItem
                  name="cons"
                  ref={this.myRefs.cons}
                  content={this.state.cons}
                  doSave={this.doSave("cons")}
                />
              </AccordeonItem>
            </Accordeon>
          </div>
        </div>
      </div>
    );
  }
}

export default IWant;
