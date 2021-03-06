import React from "react";
import { connect } from "react-redux";
import { getPageAction } from "../../actions";

const mapDispatchToProps = dispatch => {
  return {
    getPage: title => dispatch(getPageAction(title))
  };
};

const LinkWithRedux = props => {
  const onClickHandler = to => {
    props.onClick && props.onClick(); // <LinkWithRedux onClick=...
    props.getPage(to); // <LinkWithRedux to=...
  };
  return (
    <span
      style={{ color: "#A9A6FF", cursor: "pointer", boxShadow: "0 0" }}
      onClick={() => onClickHandler(props.to)}
    >
      {props.children}
    </span>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LinkWithRedux);
