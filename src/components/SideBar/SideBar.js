import React, { Component } from "react";
import { connect } from "react-redux";
import { slide as Menu } from "react-burger-menu";
import Modal from "react-modal";
import Localizer from "../../components/Localizer/Localizer";
import translations from "./SideBar.translations";
import "./SideBar.css";
import { setViewAction } from "../../actions";
import LinkWithRedux from "../../components/LinkWithRedux/LinkWithRedux";
import Search from "../Search/Search";

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
      menuOpen: false,
      modalIsOpen: false
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
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  openModal = () => {
    this.setState({ menuOpen: false });
    this.setState({ modalIsOpen: true });
  };
  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  createItem = (text, link, forcedViewHandler) => {
    return (
      <LinkWithRedux
        onClick={() => {
          this.closeMenu();
          forcedViewHandler && this.props.setView(forcedViewHandler);
        }}
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
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Search"
        >
          <Search closeModal={this.closeModal} />
        </Modal>
        <Menu
          {...this.props}
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
        >
          <small>
            <Localize>View as...</Localize>
          </small>
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
          {/* {this.createItem(<Localize>Search</Localize>, "/search")} */}
          <button onClick={this.openModal}>
            <Localize>Search</Localize>
          </button>
          <hr />
        </Menu>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
