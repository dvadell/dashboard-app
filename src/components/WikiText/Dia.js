import React from "react";
import { wikiParseToTree } from "./utils";
import "./Dia.css";

export const diaRules = {
  arrow: ["-", undefined, ">"],
  fatArrow: ["=", undefined, ">"]
};

// This will turn the tree to a number of react components
export const treeToReact = tree => {
  const tagToReact = {
    arrow: content => " ⟶ ",
    fatArrow: content => " ➡ ",
    text: content => {
      content = content.trim();
      if (content.length > 0) {
        return <span class="dia-node">{content}</span>;
      }
      return "";
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

export const diaParser = (wikiText, rules = diaRules) => {
  if (!wikiText) return "";
  const tree = wikiParseToTree(wikiText, rules);
  // console.log({ tree });
  const reactFromTree = treeToReact(tree);
  // console.log({ reactFromTree });
  return reactFromTree;
};

const Dia = content => {
  console.log("Dia: evaluating:", content);
  return content.map(element => {
    if (typeof element === "string") {
      let matchingRule = diaParser(element);
      console.log("Dia:", { matchingRule });
      return matchingRule;
    }
    return element;
  });
};

export default Dia;
