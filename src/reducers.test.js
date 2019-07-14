import { SettingsReducer } from "./reducers";
import { SET_VIEW, SET_LANGUAGE } from "./constants";

describe("SettingsReducer", () => {
  it("returns default initial state when no action is passed", () => {
    const expected = { lang: "en" };
    const newState = SettingsReducer();
    expect(newState).toEqual(expected);
  });

  it("returns a new lang when received an action of SET_LANGUAGE", () => {
    const currState = { lang: "es_ar" };
    const action = { lang: "es_es", action: SET_LANGUAGE };
    const expected = { lang: "es_ar" };
    const newState = SettingsReducer(currState, action);
    expect(newState).toEqual(expected);
  });
});
