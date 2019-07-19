import { Component } from "react";
import ReactDOM from "react-dom";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false
    };
    this.popup = document.createElement("div");
  }

  componentDidMount() {
    this.popup.style.top = this.props.top + 70 + "px";
    this.popup.style.left = this.props.left + "px";
    this.popup.style.zIndex = 99;
    this.popup.style.position = "absolute";
    this.popup.style.backgroundColor = "white";
    this.popup.style.borderWidth = "1px";
    this.popup.style.borderColor = "gray";
    this.popup.style.borderStyle = "solid";
    this.popup.style.padding = "1rem";
    this.popup.style.minHeight = "190px";
    document.body.appendChild(this.popup);
  }

  componentWillUnmount() {
    document.body.removeChild(this.popup);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.popup);
  }
}

export default Popup;
