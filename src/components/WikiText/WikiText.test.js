import { shallow } from "enzyme";
import React from "react";
import configureStore from "redux-mock-store";
import { wikiRules as rules, wikiParser } from "./WikiText";
import { findFirstStopWord, separateTag, splitInTwo } from "./utils";
import { findByDataTestAttr } from "../../testlib/testlib";
const mockStore = configureStore();
const initialState = {
  PagesReducer: {
    title: "dummy_for_test"
  }
};
const store = mockStore(initialState);

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
  it("expect to find internalLink at pos 8", () => {
    let matchingRule = findFirstStopWord(wikiText, rules);
    expect(matchingRule).toEqual("internalLink");
  });

  it("expect does not match any stopWord", () => {
    let justText = "no link lskdjfslka%%}} no link again";
    let matchingRule = findFirstStopWord(justText, rules);
    expect(matchingRule).toBe("text");
  });

  it("expect to match only one stopWord", () => {
    let manyWikiText = "no link '''[[aa]]''' no link again";
    let matchingRule = findFirstStopWord(manyWikiText, rules);
    expect(matchingRule).toEqual("bold");
  });

  it("expect to match in multiline (quoted)", () => {
    let manyWikiText = "mullink \n    this should be multi-quoted\n    again";
    let matchingRule = findFirstStopWord(manyWikiText, rules);
    expect(matchingRule).toEqual("quoted");
  });
});

describe("separate tags from wikiText", () => {
  let wikiTextSimple = "no link [[a link]] no link again";
  it("expect to separate simple wikiText", () => {
    let { beforeText, tagContent, matchingRule, rest } = separateTag(
      wikiTextSimple,
      rules
    );
    expect(matchingRule).toEqual("internalLink");
    expect(beforeText).toEqual("no link ");
    expect(tagContent).toEqual("a link");
    expect(rest).toEqual(" no link again");
  });

  it("should separate the alternate name of an internalLink", () => {
    const textLinkAltname =
      "See [[article name|this article]] for more information";
    let { beforeText, tagContent, matchingRule, rest } = separateTag(
      textLinkAltname,
      rules
    );
    expect(matchingRule).toEqual("internalLink");
    expect(beforeText).toEqual("See ");
    expect(tagContent).toEqual("article name|this article");
    expect(rest).toEqual(" for more information");
  });

  let wikiTextComplex = " lots of quotes '''[[a link]]''' no link again";
  it("expect to separate complex wikiText", () => {
    let { beforeText, tagContent, matchingRule, rest } = separateTag(
      wikiTextComplex,
      rules
    );
    expect(matchingRule).toEqual("bold");
    expect(beforeText).toEqual(" lots of quotes ");
    expect(tagContent).toEqual("[[a link]]");
    expect(rest).toEqual(" no link again");
  });

  let wikiTextOnly = "no link no no link again";
  it("expect to separate just text", () => {
    let { beforeText, tagContent, matchingRule, rest } = separateTag(
      wikiTextOnly,
      rules
    );
    expect(matchingRule).toEqual("text");
    expect(beforeText).toEqual("no link no no link again");
    expect(tagContent).toEqual(undefined);
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
    // TODO: Redux!
    // let wrapper = shallow(tree[1]);
    // expect(wrapper.html()).toEqual("function");

    expect(tree[2]).toEqual(" el artículo");
  });

  // Don't know how to do this. internalLinks needs redux, but it's not a component.
  // const textLinkAltname = "See [[article name|this article]] for more information";
  // it("parse a link with an alternate name correctly", () => {
  //   let reactComponentWithStore = <div store={store}>
  //                {wikiParser(textLinkAltname, rules)}
  //             </div>
  //   const wrapper = shallow(reactComponentWithStore )
  //   const componentFound = findByDataTestAttr(wrapper, 'internalLink')
  //   expect(componentFound.html().toEqual('a'))
  // });
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
    let tree = wikiParser(wikiTextSimple, rules);
    let expected = '<div class="quoted">this should be quoted\nthis too</div>';
    let wrapper = shallow(tree[1]);
    expect(wrapper.html()).toEqual(expected);
  });
});

describe("parse bullets", () => {
  let wikiTextSimple = `
Level0
* Level1
** Level2
*** Level3
Level0`;
  it("from simple wikiText", () => {
    let tree = wikiParser(wikiTextSimple, rules);
    expect(tree[0]).toEqual("\nLevel0\n");

    let wrapper = shallow(tree[1]);
    expect(findByDataTestAttr(wrapper, "bullet1").length).toBe(1);

    wrapper = shallow(tree[3]);
    expect(findByDataTestAttr(wrapper, "bullet2").length).toBe(1);

    wrapper = shallow(tree[5]);
    expect(findByDataTestAttr(wrapper, "bullet3").length).toBe(1);

    expect(tree[6]).toEqual("Level0");
  });
});

describe("parse P", () => {
  let wikiTextSimple = `A line

and another`;
  it("from simple wikiText", () => {
    let tree = wikiParser(wikiTextSimple, rules);
    let expected = ["A line", <p />, "and another"];
    expect(tree[0]).toEqual(expected[0]);

    // This is a React component
    let wrapper = shallow(tree[1]);
    expect(wrapper.html()).toEqual("<p></p>");

    expect(tree[2]).toEqual(expected[2]);
  });
});
