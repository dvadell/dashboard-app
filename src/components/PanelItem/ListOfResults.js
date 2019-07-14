import React, { Component } from "react";
import ListItem from "../../components/ListItem/ListItem";

const ListOfResults = ({ results, autocomplete }) => {
  // Filter results by

  return results[0] ? (
    results.map(r => (
      <ListItem onClick={() => autocomplete(r.title)}>{r.title}</ListItem>
    ))
  ) : (
    <h2 style={{ color: "gray" }}>Keep typing and I'll show you options...</h2>
  );
};

export default ListOfResults;
