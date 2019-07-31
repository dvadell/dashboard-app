// string.split() with a limit is not good enough
export const splitInTwo = (string, sep, keepSep = false) => {
  // if the sep is a function, run it
  if (typeof sep === "function") {
    return sep(string);
  }

  // No separator means it separates at character 0
  if (!sep) return ["dummy", string];

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

export const separateTag = (wikiText, rules) => {
  // The next stopWord is at...
  let matchingRule = findFirstStopWord(wikiText, rules);

  // We have just text
  if (matchingRule === "text") {
    return { beforeText: wikiText, matchingRule: "text" };
  }

  // Let's cut the string up to the stopWord
  let [beforeText, tagPlusRest] = splitInTwo(wikiText, rules[matchingRule][0]);

  // Cut the rest up to the closing stopWord
  let [tagContent, rest] = splitInTwo(tagPlusRest, rules[matchingRule][2]);

  return { beforeText, tagContent, matchingRule, rest };
};

export const wikiParseToTree = (wikiText, rules) => {
  let tree = [];
  //
  let { beforeText, tagContent, matchingRule, rest } = separateTag(
    wikiText,
    rules
  );

  // And put it in separate places
  tree[0] = { type: "text", done: true, content: beforeText };

  console.log("wikiParseToTree", { matchingRule });

  // Rule 'text' is just a dummy rule.
  if (matchingRule !== "text") {
    // Get options for the rule
    let opts = {};
    if (rules[matchingRule][1]) {
      opts = rules[matchingRule][1](tagContent);
    }

    // Check if we should continue processing the tag
    // (opts.done)
    if (opts && tagContent) {
      if (opts.done) {
        tree[1] = {
          type: matchingRule,
          done: true,
          content: tagContent
        };
      } else {
        tree[1] = {
          type: matchingRule,
          done: false,
          content: wikiParseToTree(tagContent, rules)
        };
      }
    }
  }

  let moreTags = rest ? wikiParseToTree(rest, rules) : [];

  return tree.concat(moreTags);
};
