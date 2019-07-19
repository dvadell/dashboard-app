import React from "react";
import LinkWithRedux from "../LinkWithRedux/LinkWithRedux";
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

// These are the rules that turn wikiText to a tree
export const rules = {
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
  ]
};

// string.split() with a limit is not good enough
export const splitInTwo = (string, sep, keepSep = false) => {
  // if the sep is a function, run it
  if (typeof sep === "function") {
    return sep(string);
  }

  let index = string.indexOf(sep);

  if (index === -1) {
    return [string, ""];
  }

  let one = string.slice(0, index);

  // The second part may not carry the separator
  let two;
  if (keepSep) {
    two = string.slice(index);
  } else {
    two = string.slice(index + sep.length);
  }

  return [one, two];
};

//  Given wikiText abc[[aab'''bcc
//  will return the rule that matched '[[' and the position (4)
export const findFirstStopWord = (wikiText, rules) => {
  let order = Object.keys(rules).map(rule => {
    return [rule, wikiText.indexOf(rules[rule][0])];
  });

  let firstPosition = order.reduce((min, item) => {
    if (min[1] === -1) {
      return item;
    }
    // More specific rules take prececence
    if (min[1] === item[1]) {
      if (rules[min[0]][0].length > rules[item[0]][0].length) {
        // The old one is still more specific
        return min;
      }
    }
    if (item[1] === -1) {
      return min;
    }
    return min[1] < item[1] ? min : item;
  });

  if (firstPosition[1] === -1) {
    // No matches
    return "text";
  }
  return firstPosition[0];
};

export const separateTag = (wikiText, rule) => {
  // The next stopWord is at...
  let matchingRule = findFirstStopWord(wikiText, rules);

  // We have just text
  if (matchingRule === "text") {
    return { text: wikiText };
  }

  // Let's cut the string up to the stopWord
  let [text, tagPlusRest] = splitInTwo(wikiText, rules[matchingRule][0]);

  // Cut the rest up to the closing stopWord
  let [tag, rest] = splitInTwo(tagPlusRest, rules[matchingRule][2]);

  return { text, tag, matchingRule, rest };
};

export const wikiParseToTree = (wikiText, rules) => {
  let tree = [];
  //
  let { text, tag, matchingRule, rest } = separateTag(wikiText, rules);

  // And put it in separate places
  tree[0] = { type: "text", done: true, content: text };

  if (tag) {
    tree[1] = {
      type: matchingRule,
      done: false,
      content: wikiParseToTree(tag)
    };
  }
  let moreTags = rest ? wikiParseToTree(rest) : [];

  return tree.concat(moreTags);
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
    )
  };
  return tree.map(tag => {
    if (tagToReact[tag.type]) {
      return tagToReact[tag.type](tag.content);
    } else {
      return "Hmmm... no handler for " + tag.type;
    }
  });
};

export const wikiParser = (wikiText, rules) => {
  if (!wikiText) return "";
  const tree = wikiParseToTree(wikiText, rules);
  // console.log({ tree });
  const reactFromTree = treeToReact(tree);
  // console.log({ reactFromTree });
  return reactFromTree;
};

export default wikiParser;
