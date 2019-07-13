const API_URL = "http://localhost:9000/api/v1/";

/** fetches a page by title
 * @param {string} title - The title of the page.
 * @param {string} version - The version
 * @returns {Promise} - with json as first argument
 */
export const loadPage = (title, version = "current") => {
  return fetch(API_URL + "quieros/" + title + "?version=" + version).then(
    res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status + " " + res.statusText);
    }
  );
};

/** saves/Posts a page by title
 * @param {string} title - The title of the page.
 * @param {Object} json - The content, in json format
 * @returns {Promise} - with json as first argument
 */
export const savePage = (title, json) => {
  console.log(json);
  return fetch(API_URL + "quieros/" + title, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json)
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.status + " " + res.statusText);
  });
};
