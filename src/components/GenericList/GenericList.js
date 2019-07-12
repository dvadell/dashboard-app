// WIP! I don't like it. I'll think about it...
import React, { Component } from "react";
const API_URL = "http://localhost:9000/api/v1/";

class GenericList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      editing: false
    };
  }

  componentDidMount() {
    fetch(API_URL + "list/" + this.props.name)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.status + " " + res.statusText);
      })
      .then(json => {
        if (json.error) {
          console.log("GenericList: Error in the API:", json);
        } else {
          console.log("GenericList: Error in the API:", json);

          this.setState({ list: json });
        }
      })
      .catch(error => console.log("GenericList: Error in the API:", error));
  }

  toggleEdit = e => {
    console.log("toggled!");
    this.setState({ editing: !this.state.editing });
  };

  onChange = e => {
    this.setState({ list: this.state.list.concat(e.target.value) });
    console.log(this.state.list);
  };

  render() {
    return (
      <div>
        <span
          onClick={this.toggleEdit}
          className={
            "floatRight fa " + (this.state.editing ? "fa-upload" : "fa-edit")
          }
        ></span>
        {this.state.editing && (
          <input
            name="newItem"
            placeholder="20: Meeting"
            onChange={this.onChange}
          ></input>
        )}
        <ul>
          {/* {
                this.state.list.map(item => {
                    return (<li>...</li>)
                })
            } */}
        </ul>
      </div>
    );
  }
}

export default GenericList;
