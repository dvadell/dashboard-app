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
    // Again, if I fire both this.setState, the modal looses focus. I have to
    // run one as a callback of the other.
    this.setState({ menuOpen: false }, () =>
      this.setState({ modalIsOpen: true })
    );
  };

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  // createItem = (text, link, forcedViewHandler) => {
  //   return (
  //     <LinkWithRedux
  //       onClick={() => {
  //         this.closeMenu();
  //         forcedViewHandler && this.props.setView(forcedViewHandler);
  //       }}
  //       className="menu-item"
  //       to={link}
  //     >
  //       {text}
  //     </LinkWithRedux>
  //   );
  // };

  createItem = (text, onClick) => {
    return (
      <span
        className="sidebar-item"
        onClick={() => {
          onClick();
          this.closeMenu();
        }}
      >
        {text}
      </span>
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
          {this.createItem(<Localize>As Agenda</Localize>, () =>
            this.props.setView("ag")
          )}
          {this.createItem(<Localize>As Project</Localize>, () =>
            this.props.setView("pr")
          )}
          {this.createItem(<Localize>As Meta</Localize>, () =>
            this.props.setView("meta")
          )}

          <hr></hr>
          {this.createItem(<Localize>Settings</Localize>, () =>
            console.log("settings")
          )}
          <button onClick={this.openModal}>
            <Localize>Search</Localize>
          </button>
          <hr />
          {this.createItem(<Localize>Games!</Localize>, () =>
            console.log("games")
          )}
        </Menu>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
