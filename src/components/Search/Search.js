import React, { Component } from "react";
import Results from "./Results";
import "./Search.css";

const API_URL = "http://localhost:9000/api/v1/";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      editing: false,
      results: []
    };
  }

  updateContent = event => {
    let content = event.target.value;
    console.log("content", content);
    this.setState({ content });

    if (content.length > 1) {
      fetch(API_URL + "quieros/search?q=" + content)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.status + " " + res.statusText);
        })
        .then(json => this.setState({ results: json }));
    }
  };

  render() {
    return (
      <div>
        <div className="search-navbar">
          <div className="input-div">
            <input
              className="input-search"
              onChange={this.updateContent}
              placeholder=""
              aria-label=""
            ></input>
          </div>

          <div>
            <span className="fa fa-search search-icon"></span>
          </div>
        </div>
        <Results
          results={this.state.results}
          closeModal={this.props.closeModal}
        />
      </div>
    );
  }
}
export default Search;
