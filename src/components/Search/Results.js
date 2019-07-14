import React from "react";
import LinkWithRedux from "../../components/LinkWithRedux/LinkWithRedux";
import ListItem from "../../components/ListItem/ListItem";

const Results = props => {
  let lis = props.results.map(result => {
    return (
      <ListItem key={result.title}>
        <LinkWithRedux onClick={props.closeModal} to={result.title}>
          {result.title}
        </LinkWithRedux>
        <br />
        <small>{result.description.slice(0, 70)}</small>
      </ListItem>
    );
  });

  return lis;
};
export default Results;
