import React from "react";
import { connect } from "react-redux";
import { getPageAction } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    getPage: title => dispatch(getPageAction(title))
  };
};

const LinkWithRedux = props => {
  const onClickHandler = to => {
    props.getPage(to);
    window.history.pushState({}, to, to);
  };
  return (
    <a
      style={{ color: "#A9A6FF", cursor: "pointer" }}
      onClick={() => onClickHandler(props.to)}
    >
      {props.children}
    </a>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LinkWithRedux);
