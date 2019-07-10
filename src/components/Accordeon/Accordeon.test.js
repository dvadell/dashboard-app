import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Accordeon from "./Accordeon";

const setup = (props = {}) => {
  return shallow(<Accordeon {...props} />);
};

describe("Accordeon", () => {
  it("renders without error", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Accordeon />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
