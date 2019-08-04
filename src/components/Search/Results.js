import React from "react";
import LinkWithRedux from "../../components/LinkWithRedux/LinkWithRedux";
import ListItem from "../../components/ListItem/ListItem";

const findSearchedWord = (text, word) => {
  const numCharsToReturn = 70;
  let startTrimmingAt = 0;

  // We have to check for case-insensitive versions
  const searchedWordAt = text.toLowerCase().indexOf(word.toLowerCase());
  if (searchedWordAt < 0) {
    // Not found
    console.log({ searchedWordAt, text, word });
    return text.slice(startTrimmingAt, numCharsToReturn);
  }
  if (searchedWordAt > numCharsToReturn / 2) {
    startTrimmingAt = searchedWordAt - numCharsToReturn / 2;
  }

  let result = (
    <div>
      {text.slice(startTrimmingAt, searchedWordAt)}
      <span style={{ fontWeight: "bold" }}>
        {text.slice(searchedWordAt, searchedWordAt + word.length)}
      </span>
      {text.slice(
        searchedWordAt + word.length,
        searchedWordAt - word.length + numCharsToReturn / 2
      )}
    </div>
  );
  return result;
};

const Results = props => {
  let lis = props.results.map(result => {
    return (
      <ListItem key={result.title}>
        <LinkWithRedux onClick={props.closeModal} to={result.title}>
          {result.title}
        </LinkWithRedux>
        <br />
        <small>{findSearchedWord(result.description, props.highlight)}</small>
      </ListItem>
    );
  });

  return lis;
};
export default Results;
