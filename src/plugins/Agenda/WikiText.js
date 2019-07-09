import React, { Component } from "react";
import LinkWithRedux from "../../components/LinkWithRedux";

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
      quoted = quoted + "\n" + line.slice(3); // exclude the 4 spaces
    } else {
      rest = line;
      break;
    }
  }
  rest = rest + lines.join("\n");
  return [quoted, rest];
};

export const rules = {
  internalLink: ["[[", () => console.log("matched!"), "]]"],
  bold: ["'''", () => console.log("matched bold"), "'''"],
  italics: ["''", () => console.log("matched italics"), "''"],
  quoted: ["\n    ", () => console.log("matched quoted"), splitQuoteTagEnding],
  taskUnchecked: ["[ ] ", undefined, "\n"],
  taskChecked: ["[x] ", undefined, "\n"],
  taskWaiting: ["[w] ", undefined, "\n"],
  header1: ["== ", undefined, " =="],
  header2: ["=== ", undefined, " ==="],
  header3: ["==== ", undefined, " ===="],
  header4: ["===== ", undefined, " ====="],
  bullet: ["* ", undefined, "\n"]
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
export const findFirstStopWordPos = (wikiText, rules) => {
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
    return ["text", -1];
  }
  return firstPosition;
};

export const separateTag = (wikiText, rule) => {
  // The next stopWord is at...
  let [matchingRule, nextStopWordAt] = findFirstStopWordPos(wikiText, rules);

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

export const treeToReact = tree => {
  const tagToReact = {
    internalLink: content => {
      let [linkName, linkText] = splitInTwo(treeToReact(content).join(), "|");
      return (
        <LinkWithRedux to={linkName}>{linkText || linkName}</LinkWithRedux>
      );
    },
    text: content => content,
    bold: content => <span className="bold">{treeToReact(content)}</span>,
    italics: content => <span className="italics">{treeToReact(content)}</span>,
    quoted: content => <div className="quoted">{treeToReact(content)}</div>,
    taskUnchecked: content => (
      <span>
        <br />
        <span className="fa fa-square"></span> {treeToReact(content)}
      </span>
    ),
    taskChecked: content => (
      <span>
        <br />
        <span className="fa fa-check-square"></span> {treeToReact(content)}
      </span>
    ),
    taskWaiting: content => (
      <span>
        <br />
        <span className="fa fa-spinner"></span> {treeToReact(content)}
      </span>
    ),
    header1: content => <h1>{treeToReact(content)}</h1>,
    header2: content => <h2>{treeToReact(content)}</h2>,
    header3: content => <h3>{treeToReact(content)}</h3>,
    header4: content => <h4>{treeToReact(content)}</h4>,
    bullet: content => (
      <ul>
        <li>{treeToReact(content)}</li>
      </ul>
    )
  };
  return tree.map(tag => {
    if (tag.type) {
      return tagToReact[tag.type](tag.content);
    } else {
      console.log("Hmmm... no handler for", tag.type);
    }
  });
};

export const wikiParser = (wikiText, rules) => {
  if (!wikiText) return "";
  const tree = wikiParseToTree(wikiText, rules);
  // console.log({tree})
  const reactFromTree = treeToReact(tree);
  // console.log({reactFromTree})
  return reactFromTree;
};

export default wikiParser;
