import React, { Component } from "react";
import ListItem from "../../components/ListItem/ListItem";

const ListOfResults = ({ results, autocomplete }) => {
  return results[0] ? (
    results.map(result => (
      <ListItem onClick={autocomplete} key={result.title}>
        {result.title}
        <br />
        <small>{result.description.slice(0, 70)}</small>
      </ListItem>
    ))
  ) : (
    <h2 style={{ color: "gray" }}>Keep typing and I'll show you options...</h2>
  );
};

export default ListOfResults;
