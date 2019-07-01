import React, { Component }  from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'
import Localizer from '../../components/Localizer/Localizer'
import translations from './SideBar.translations'
import './SideBar.css'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) { this.setState({menuOpen: state.isOpen}) }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () { this.setState({menuOpen: false}) }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () { this.setState(state => ({menuOpen: !state.menuOpen})) }

  createItem = (text, link) => {
    return(
      <Link onClick={() => this.closeMenu()} className="menu-item" to={link}>
          {text}
      </Link>
    )
  }
  
  render() {

    const Localize = Localizer(translations)

    return (
      <Menu {...this.props} isOpen={this.state.menuOpen}
      onStateChange={(state) => this.handleStateChange(state)}>
        {this.createItem(<Localize>I Want</Localize>,       '/')}
        {this.createItem(<Localize>Settings</Localize>,      '/settings')}
      </Menu>
    );  
  }
};

export default SideBar;