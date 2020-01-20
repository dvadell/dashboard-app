import { setViewAction, setLanguageAction } from "./actions";
import { SET_VIEW, SET_LANGUAGE } from "./constants";

describe("Simple actions", () => {
  it("returns an action with type SET_VIEW", () => {
    const action = setViewAction("ag");
    expect(action).toEqual({ type: SET_VIEW, payload: "ag" });
  });
  it("returns an action with type SET_LANGUAGE", () => {
    const action = setLanguageAction("es_ar");
    expect(action).toEqual({ type: SET_LANGUAGE, payload: "es_ar" });
  });
});
