import { loadPage, savePage, searchForPagesContaining } from "./fetchlib";

describe("fetchlib", () => {
  it("must return json when saving", () => {
    return savePage("dummy_for_testing", {
      title: "dummy_for_testing",
      description: "ignore"
    }).then(json => expect(json.title).toEqual("dummy_for_testing"));
  });

  it("must return json when getting", () => {
    return loadPage("dummy_for_testing").then(json =>
      expect(json.title).toEqual("dummy_for_testing")
    );
  });

  it("must return a list of json when searching", () => {
    return searchForPagesContaining("dummy_for_testing").then(json =>
      expect(json[0].title).toEqual("dummy_for_testing")
    );
  });
});
