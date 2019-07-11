import React from "react";
import LinkWithRedux from "../../components/LinkWithRedux/LinkWithRedux";

const Results = props => {
  let lis = props.results.map(result => {
    return (
      <li key={result.title} style={{ listStyleType: "none" }}>
        <LinkWithRedux onClick={props.closeModal} to={result.title}>
          {result.title}
        </LinkWithRedux>
        <small>{result.description.slice(0, 70)}</small>
      </li>
    );
  });

  return <ul>{lis}</ul>;
};
export default Results;
