import { shallow } from "enzyme";
import React from "react";
import wikiParse, {
  rules,
  splitInTwo,
  findFirstStopWordPos,
  separateTag,
  wikiParseToTree,
  wikiParser
} from "./WikiText";

// it('expect to render WikiText component', () => {
//     expect(shallow(<WikiText>dummy</WikiText>))
// })

// it('expect to translate [[]] to internal links', () => {
//     const wikiTextwithLink = 'no link [[a link]] no link again'
//     const wrapper = shallow(<WikiText>{wikiTextwithLink}</WikiText>)
//     const InternalLinkComponent = wrapper.find("[data-test='component-internal-link']")
//     expect(InternalLinkComponent.length).toBe(1)
// })

let wikiText = "no link [[a link]] no link again";
describe("split string tests", () => {
  it("expect to split a string with a separator", () => {
    expect(splitInTwo(wikiText, "[[").length).toBe(2);

    let wikiText2 = "[[a link]] no link again";
    let [first, second] = splitInTwo(wikiText2, "[[");
    expect(first.length).toBe(0);
    expect(second).toEqual("a link]] no link again");
  });

  it("expect to split an empty string with a separator", () => {
    let text = "";
    expect(splitInTwo(text, "[[").length).toBe(2);
  });

  it("expect to split a string with just text", () => {
    let text = "this is a test text";
    expect(splitInTwo(text, "[[").length).toBe(2);
    let [first, second] = splitInTwo(text, "[[");
    expect(first).toEqual("this is a test text");
    expect(second.length).toBe(0);
  });

  it("expect to split multistring (for quoted)", () => {
    let manyWikiText = "no link \n    this should be quoted\n    again";
    let [first, second] = splitInTwo(manyWikiText, "\n    ");
    expect(first).toEqual("no link ");
    expect(second).toEqual("this should be quoted\n    again");

    let restOfWikiText = "this should be quoted\n    again";
    [first, second] = splitInTwo(restOfWikiText, wikiText =>
      splitInTwo(wikiText, "\n", true)
    );
    expect(first).toEqual("this should be quoted");
    expect(second).toEqual("\n    again");
  });
});

describe("find next stop word", () => {
  let wikiText = "no link [[a link]] no link again";
  it("expect to find next stop word at", () => {
    expect(findFirstStopWordPos(wikiText, rules).length).toBe(2);
  });

  it("expect to find internalLink at pos 8", () => {
    let [matchingRule, nextStopWordAt] = findFirstStopWordPos(wikiText, rules);
    expect(nextStopWordAt).toBe(8);
    expect(matchingRule).toEqual("internalLink");
  });

  it("expect does not match any stopWord", () => {
    let justText = "no link lskdjfslka%%}} no link again";
    let [matchingRule, nextStopWordAt] = findFirstStopWordPos(justText, rules);
    expect(nextStopWordAt).toBe(-1);
  });

  it("expect to match only one stopWord", () => {
    let manyWikiText = "no link '''[[aa]]''' no link again";
    let [matchingRule, nextStopWordAt] = findFirstStopWordPos(
      manyWikiText,
      rules
    );
    expect(nextStopWordAt).toBe(8);
    expect(matchingRule).toEqual("bold");
  });

  it("expect to match in multiline (quoted)", () => {
    let manyWikiText = "mullink \n    this should be multi-quoted\n    again";
    let [matchingRule, nextStopWordAt] = findFirstStopWordPos(
      manyWikiText,
      rules
    );
    expect(nextStopWordAt).toBe(8);
    expect(matchingRule).toEqual("quoted");
  });
});

describe("separate tags from wikiText", () => {
  let wikiTextSimple = "no link [[a link]] no link again";
  it("expect to separate simple wikiText", () => {
    let { text, tag, matchingRule, rest } = separateTag(wikiTextSimple, rules);
    expect(matchingRule).toEqual("internalLink");
    expect(text).toEqual("no link ");
    expect(tag).toEqual("a link");
    expect(rest).toEqual(" no link again");
  });

  let wikiTextComplex = " lots of quotes '''[[a link]]''' no link again";
  console.log("wikiTextComplex:", wikiTextComplex);
  it("expect to separate complex wikiText", () => {
    let { text, tag, matchingRule, rest } = separateTag(wikiTextComplex, rules);
    expect(matchingRule).toEqual("bold");
    expect(text).toEqual(" lots of quotes ");
    expect(tag).toEqual("[[a link]]");
    expect(rest).toEqual(" no link again");
  });

  let wikiTextOnly = "no link no no link again";
  it("expect to separate just text", () => {
    let { text, tag, matchingRule, rest } = separateTag(wikiTextOnly, rules);
    expect(matchingRule).toEqual(undefined);
    expect(text).toEqual("no link no no link again");
    expect(tag).toEqual(undefined);
    expect(rest).toEqual(undefined);
  });
});

//
// Test wikiParser
//
describe("build the tree of tags", () => {
  let wikiTextSimple = "Ver [[en este link]] el artículo";
  it("from simple wikiText", () => {
    let tree = wikiParser(wikiTextSimple, rules);
    expect(tree[0]).toEqual("Ver ");
    expect(typeof tree[1].type).toEqual("function");
    expect(tree[2]).toEqual(" el artículo");
  });

  // let wikiTextComplex = " lots of quotes '''[[a link]]''' no link again"
  // it('from complex wikiText', () => {
  //     let tree = wikiParser(wikiTextComplex, rules)
  //     expect(tree[0]).toEqual({
  //         type: "text", done: true, content: ' lots of quotes '
  //     })
  //     expect(tree[1]).toEqual({
  //         type: 'bold', done: false, content: '[[a link]]'
  //     })
  //     expect(tree[2]).toEqual({
  //         type: "text", done: false, content: ' no link again'
  //     })
  // })

  // let wikiTextOnly = 'no link no no link again'
  // it('expect to separate just text', () => {
  //     let tree = wikiParser(wikiTextOnly, rules)
  //     expect(tree[0]).toEqual({
  //         type: "text", done: true, content: 'no link no no link again'
  //     })
  //     expect(tree.length).toBe(1)
  // })
});

//
// Test rules
//
describe("parse quoted", () => {
  let wikiTextSimple = `
    this should be quoted
    this too
and not this`;
  it("from simple wikiText", () => {
    let tree = wikiParse(wikiTextSimple, rules);
    let expected = <div className="quoted">this should be quoted this too</div>;
    expect(tree[1]).toEqual(expected);
  });
});

describe("Tasks", () => {
  let wikiTextWithTasks = `Tasks for today:
[ ] Do the laundry
[ ] Make some exercise
[x] Was the dishes
[w] Wait for the bus
Great!`;
  it("All kind of tasks - simple", () => {
    let tree = wikiParse(wikiTextWithTasks, rules);
    let expected = "";
    expect(tree[0]).toEqual("Tasks for today:\n");
    expect(tree[1]).toEqual(
      <div className="task-unchecked">Do the laundry</div>
    );
  });
});

// it('expect to render WikiText component', () => {
//     wikiParse(wikiText)
// })
