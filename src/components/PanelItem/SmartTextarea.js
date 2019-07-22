import React, { Component, createRef } from "react";
import caretXY from "caret-xy";
import "./SmartTextarea.css";
import Popup from "./Popup";
import ListOfResults from "./ListOfResults";
import { searchForPagesContaining } from "../../fetchlib";
/**
 * @class SmartTextarea
 * @param {string} contents - the initial (saved) content
 * @param {function} updateContent - to update the content.
 * @param {string} name - textarea's name
 */
class SmartTextarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false,
      caretPos: 0,
      left: 0,
      top: 0,
      searchString: "",
      results: []
    };
  }

  updateContent = e => {
    let value = e.target.value;
    this.props.updateContent(value);
  };

  insertChoice = choice => {
    console.log("Chose", choice);
    let newContent = this.props.content.slice(
      0,
      this.state.caretPos - this.state.searchString.length
    );
    newContent =
      newContent +
      choice +
      "]] " +
      this.props.content.slice(this.state.caretPos);
    console.log("New content should be:", newContent);
    this.props.updateContent(newContent);
    this.killPopup();
  };

  killPopup = () => {
    this.setState({
      popupOpen: false,
      searchString: "",
      results: []
    });
  };

  updateCaretPos = e => {
    let key = e.key;
    console.log("pressed", key);
    let caretPos = e.target.selectionStart;
    this.setState({ caretPos });
    console.log("updateCaretPos", caretPos);

    if (caretPos > 1) {
      console.log("estoy cerca de", this.props.content[caretPos]);
      let last2 = this.props.content.slice(caretPos - 2, caretPos);
      console.log("los últimos2 son", last2);
      if (last2 === "[[") {
        if (
          !this.props.content[caretPos] ||
          this.props.content[caretPos] === " " ||
          this.props.content[caretPos] === "\n"
        ) {
          let XY = caretXY(e.target);
          console.log("Will open the popup at", XY);
          this.setState({
            popupOpen: true,
            left: XY.left,
            top: XY.top
          });
        }
      }
    }
    if (this.state.popupOpen) {
      let newSearchString = this.state.searchString;

      if (key === "Escape") {
        newSearchString = "";
        this.killPopup();
      }

      if (key.length === 1) {
        newSearchString = newSearchString + key;
      }
      if (key === "Backspace") {
        newSearchString = this.state.searchString.slice(0, -1);
        if (newSearchString < 2) {
          this.killPopup();
        }
      }
      console.log({ newSearchString });

      // IDK why, but setState was taking it's time to update. I had to move the
      // updatePopup() to a callback after setState does it's thing.
      this.setState(prevState => {
        return { searchString: newSearchString };
      }, this.updatePopup);
    }
  };

  updatePopup = () => {
    console.log("Updating popup with", this.state.searchString);
    if (this.state.searchString && this.state.searchString.length > 1) {
      searchForPagesContaining(this.state.searchString).then(json =>
        this.setState({ results: json })
      );
    }
  };

  ref = createRef();

  render() {
    return (
      // this paddingTop is the size of the edit/upload icon. If I don't set
      // it, when the textarea grows, the icon gets hidden; and as there's no
      // scrollbar (see overflow css property), it gets lost.
      <div style={{ paddingTop: "16px" }}>
        <textarea
          onKeyUp={this.updateCaretPos}
          name={this.props.name}
          placeholder="Write!"
          value={this.props.content}
          className="smart-textarea mousetrap markup"
          onChange={this.updateContent}
          data-test="smart-textarea"
        ></textarea>
        {this.state.results.length > 0 ? (
          <Popup left={this.state.left} top={this.state.top} data-test="popup">
            <ListOfResults
              results={this.state.results}
              autocomplete={this.insertChoice}
            ></ListOfResults>
          </Popup>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SmartTextarea;
