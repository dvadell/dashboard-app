import React from "react";
import { shallow } from "enzyme";
import SmartTextarea from "./SmartTextarea";
import { findByDataTestAttr } from "../../testlib/testlib";

/**
 * @function setup
 * @param {object} props
 * @param {object} state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = {}) => {
  const wrapper = shallow(<SmartTextarea {...props} />).setState(state);
  return wrapper;
};

describe("SmartTextarea", () => {
  it("renders without error", () => {});

  it("renders a textarea", () => {
    let wrapper = setup();
    let textarea = findByDataTestAttr(wrapper, "smart-textarea");
    expect(textarea.length).toBe(1);
  });

  it("renders a Popup when [[ // TODO!", () => {
    let state = { popupOpen: true };
    let wrapper = setup({}, state);
    let Popup = findByDataTestAttr(wrapper, "popup");
    console.log(Popup.debug());
    expect(Popup.length).toBe(1);
  });
});
