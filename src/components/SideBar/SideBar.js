import React, { Component } from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import Localizer from "../../components/Localizer/Localizer";
import translations from "./SideBar.translations";
import "./SideBar.css";
import { setViewAction } from "../../actions";
import LinkWithRedux from "../../components/LinkWithRedux";

const mapStateToProps = state => {
  return {
    viewHandler: state.ViewReducer.viewHandler
  };
};

const mapDispatchToProps = dispatchEvent => {
  return {
    setView: viewHandler => dispatchEvent(setViewAction(viewHandler))
  };
};

const today = new Date().toISOString().slice(0, 10);

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  createItem = (text, link, forcedViewHandler) => {
    forcedViewHandler && this.props.setView(forcedViewHandler);
    return (
      <LinkWithRedux
        onClick={() => this.closeMenu()}
        className="menu-item"
        to={link}
      >
        {text}
      </LinkWithRedux>
    );
  };

  render() {
    const Localize = Localizer(translations);

    return (
      <Menu
        {...this.props}
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <small>View as...</small>
        {this.props.viewHandler === "ag" ? (
          <button
            onClick={() => {
              this.props.setView("pr");
              this.closeMenu();
            }}
          >
            As Project
          </button>
        ) : (
          <button
            onClick={() => {
              this.props.setView("ag");
              this.closeMenu();
            }}
          >
            As Agenda
          </button>
        )}

        <hr></hr>
        {this.createItem(
          <Localize>Project List</Localize>,
          "Project List",
          "pr"
        )}
        {this.createItem(<Localize>Today</Localize>, today)}
        {this.createItem(<Localize>Settings</Localize>, "/settings")}
        {this.createItem(<Localize>Search</Localize>, "/search")}
        <hr />
      </Menu>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
