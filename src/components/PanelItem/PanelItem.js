import React, { Component } from "react";
import { wikiParser } from "../WikiText/WikiText";
import SmartTextarea from "./SmartTextarea";
import "./PanelItem.css";

class PanelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      editing: false
    };
  }

  toggleEdit = event => {
    if (this.state.editing) {
      // We were editing and now we pressed the upload icon -> save
      console.log(
        "Saving content of ",
        this.props.name,
        ":",
        this.state.content
      );
      this.props.doSave(this.state.content);
    }
    this.setState({ editing: !this.state.editing });
  };

  componentWillReceiveProps(newProps) {
    this.setState({ content: newProps.content, editing: false });
  }

  componentWillMount() {
    this.setState({ content: this.props.content });
  }

  updateContent = value => {
    this.setState({ content: value });
  };

  // toggleOpen = () =>
  //   this.state.editing
  //     ? this.setState({ open: true })
  //     : this.setState({ open: !this.state.open });

  render() {
    let name = this.props.name;
    return (
      <div id={name}>
        <span
          onClick={this.toggleEdit}
          className={
            "floatRight fa " + (this.state.editing ? "fa-upload" : "fa-edit")
          }
        ></span>
        {!this.state.editing ? (
          wikiParser(this.state.content)
        ) : (
          <SmartTextarea
            name={name}
            content={this.state.content}
            updateContent={this.updateContent}
          />
        )}
      </div>
    );
  }
}

export default PanelItem;
