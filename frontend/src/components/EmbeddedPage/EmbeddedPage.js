// Just a page with one of the members of a page (like description)
import React, { Component } from "react";
import { loadPage, savePage } from "../../fetchlib";
import PanelItem from "../PanelItem/PanelItem";

/**
 * @param {string} title - The title of the page.
 * @param {string} member - The part/member of the page we are going to use.
 *
 */
class EmbeddedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {}
    };
  }

  componentWillMount() {
    loadPage(this.props.title).then(json => {
      if (json.error) this.setState({ error: json.error });
      this.setState({ page: json });
    });
  }

  doSave = content => {
    console.log(
      "EmbeddedPage: saving",
      this.props.title + "." + this.props.member,
      "with",
      content
    );
    let page = this.state.page;
    page[this.props.member] = content;
    this.setState({ page });
    savePage(this.props.title, page).then(json =>
      console.log("EmbeddedPage: savePage:", json)
    );
  };

  render() {
    return (
      <PanelItem
        content={this.state.page[this.props.member]}
        doSave={this.doSave}
        name="upcomingEvents"
      />
    );
  }
}

export default EmbeddedPage;
