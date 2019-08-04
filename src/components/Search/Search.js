import React, { Component } from "react";
import Results from "./Results";
import { searchForPagesContaining } from "../../fetchlib";
import "./Search.css";

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

    if (content.length > 2) {
      searchForPagesContaining(content).then(json =>
        this.setState({ results: json })
      );
    }
  };

  render() {
    return (
      <div>
        <div className="search-navbar">
          <div className="input-div">
            <input
              autoFocus={true}
              className="input-search"
              onChange={this.updateContent}
              placeholder="Search here..."
              aria-label="search"
            />
          </div>

          <div>
            <span className="fa fa-search search-icon"></span>
          </div>
        </div>
        <Results
          results={this.state.results}
          highlight={this.state.content}
          closeModal={this.props.closeModal}
        />
      </div>
    );
  }
}
export default Search;
