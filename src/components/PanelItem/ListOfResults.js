import React, { Component } from "react";

const ListOfResults = ({ results, autocomplete }) => {
  return results ? (
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
    ""
  );
};

export default ListOfResults;
