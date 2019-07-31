import React from "react";
import LinkWithRedux from "../LinkWithRedux/LinkWithRedux";
import Diagram from "../Diagram/Diagram";
import { splitInTwo, wikiParseToTree } from "./utils";
import "./WikiText.css";

// This is to put into the key attribute, or else React complains
let randomKey = 0;

// Quoted lines are those that start with 4 spaces.
// We get a string of wikitext that starts quoted, and we have to divide it
// until quoting ends (ie until we see a line that does not start with 4 spaces)
const splitQuoteTagEnding = wikiText => {
  // We need to separate what is quoted from what's not
  let lines = wikiText.split("\n");
  let quoted = lines.shift(); // first line is quoted.
  let rest = "";
  let line;
  while ((line = lines.shift())) {
    if (/^ {4}/.test(line)) {
      quoted = quoted + "\n" + line.slice(4); // exclude the 4 spaces
    } else {
      rest = line;
      break;
    }
  }
  rest = rest + lines.join("\n");
  return [quoted, rest];
};

/**
    wikiRules - rules that turn wikiText to a tree
    each key of the object corresponds to an array.
    The first member is the start of the tag
    The second is for options (like done: true|false)
    The third is the end of the tag.
    For example, internal links look like [[something]]
*/
export const wikiRules = {
  internalLink: ["[[", undefined, "]]"],
  externalLink: ["[http", undefined, "]"],
  bold: ["'''", undefined, "'''"],
  italics: ["''", undefined, "''"],
  quoted: ["\n    ", undefined, splitQuoteTagEnding],
  taskUnchecked: ["[ ] ", undefined, "\n"],
  taskChecked: ["[x] ", undefined, "\n"],
  taskWaiting: ["[w] ", undefined, "\n"],
  header1: ["== ", undefined, " =="],
  header2: ["=== ", undefined, " ==="],
  header3: ["==== ", undefined, " ===="],
  header4: ["===== ", undefined, " ====="],
  bullet1: ["* ", undefined, "\n"],
  bullet2: ["** ", undefined, "\n"],
  bullet3: ["*** ", undefined, "\n"],
  p: ["\n\n", undefined, wikiText => ["dummy", wikiText]],
  hr: ["----", undefined, wikiText => ["dummy", wikiText]],
  comment: [
    "// Note: ",
    undefined,
    wikiText => splitInTwo(wikiText, "\n", true)
  ],
  arrow: ["-->", undefined, undefined],
  boxed: ["|", undefined, "|"],
  dia: [
    "__dia__",
    content => {
      console.log("d", content);
      return { done: true };
    },
    "__dia__"
  ]
};

// This will turn the tree to a number of react components
export const treeToReact = tree => {
  const tagToReact = {
    internalLink: content => {
      let [linkName, linkText] = splitInTwo(treeToReact(content).join(), "|");
      return (
        <LinkWithRedux key={linkName} to={linkName}>
          {linkText || linkName}
        </LinkWithRedux>
      );
    },
    externalLink: content => {
      let [linkName, linkText] = splitInTwo(treeToReact(content).join(), " ");
      const prettyLinkName = linkName.slice(linkName.indexOf("://") + 3);
      return (
        <a key={randomKey++} href={"http" + linkName} alt={prettyLinkName}>
          {linkText || prettyLinkName}
        </a>
      );
    },
    text: content => content,
    bold: content => (
      <span key={randomKey++} className="bold">
        {treeToReact(content)}
      </span>
    ),
    italics: content => <span className="italics">{treeToReact(content)}</span>,
    quoted: content => (
      <div key={randomKey++} className="quoted">
        {treeToReact(content)}
      </div>
    ),
    taskUnchecked: content => (
      <div key={randomKey++}>
        <span className="fa fa-square"></span> {treeToReact(content)}
      </div>
    ),
    taskChecked: content => (
      <div key={randomKey++}>
        <span className="fa fa-check-square"></span> {treeToReact(content)}
      </div>
    ),
    taskWaiting: content => (
      <div key={randomKey++}>
        <span className="fa fa-spinner"></span> {treeToReact(content)}
      </div>
    ),
    header1: content => (
      <h1 className="wiki" key={randomKey++}>
        {treeToReact(content)}
      </h1>
    ),
    header2: content => (
      <h2 className="wiki" key={randomKey++}>
        {treeToReact(content)}
      </h2>
    ),
    header3: content => (
      <h3 className="wiki" key={randomKey++}>
        {treeToReact(content)}
      </h3>
    ),
    header4: content => (
      <h4 className="wiki" key={randomKey++}>
        {treeToReact(content)}
      </h4>
    ),
    bullet1: content => (
      <div data-test="bullet1" key={randomKey++}>
        • {treeToReact(content)}
      </div>
    ),
    bullet2: content => (
      <div data-test="bullet2" className="bullet2-wiki" key={randomKey++}>
        • {treeToReact(content)}
      </div>
    ),
    bullet3: content => (
      <div data-test="bullet3" className="bullet3-wiki" key={randomKey++}>
        • {treeToReact(content)}
      </div>
    ),
    p: content => <p key={randomKey++}></p>,
    hr: content => <hr key={randomKey++} />,
    comment: content => (
      <span key={randomKey++} className="comment italics">
        {treeToReact(content)}
      </span>
    ),
    arrow: content => " ⟶ ",
    boxed: content => (
      <span key={randomKey++} className="boxed-wiki">
        {treeToReact(content)}
      </span>
    ),
    dia: content => {
      console.log("dia", content);
      return (
        <Diagram name={randomKey++} key={randomKey++}>
          {content}
        </Diagram>
      );
    }
  };

  return tree.map(tag => {
    if (tagToReact[tag.type]) {
      return tagToReact[tag.type](tag.content);
    } else {
      return "Hmmm... no handler for " + tag.type;
    }
  });
};

export const wikiParser = (wikiText, rules = wikiRules) => {
  if (!wikiText) return "";
  const tree = wikiParseToTree(wikiText, rules);
  // console.log({ tree });
  const reactFromTree = treeToReact(tree);
  // console.log({ reactFromTree });
  return reactFromTree;
};

export default wikiParser;
