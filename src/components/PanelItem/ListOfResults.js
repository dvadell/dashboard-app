import React, { Component } from "react";

const ListOfResults = ({ results, autocomplete }) => {
  return results[0] ? (
    <ul>
      {results.map(r => {
        return (
          <li>
            <button onClick={() => autocomplete(r.title)}>{r.title}</button>
          </li>
        );
      })}
    </ul>
  ) : (
    <h2 style={{ color: "gray" }}>Keep typing and I'll show you options...</h2>
  );
};

export default ListOfResults;
