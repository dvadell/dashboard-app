import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  LOAD_PAGE,
  LOAD_RANDOM_PAGE,
  SEARCH_FOR_PAGES_CONTAINING
} from "./graphql/Queries";
import { SAVE_PAGE } from "./graphql/Mutations";

const httpLink = createHttpLink({
  uri: "http://localhost:7000/graphql"
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

/** fetches a page by title
 * @param {string} title - The title of the page.
 * @param {string} version - The version // TODO
 * @returns {Promise} - with json as first argument
 */
export const loadPage = title => {
  return client
    .query({
      query: LOAD_PAGE,
      variables: {
        title: title
      }
    })
    .then(
      response => new Promise(resolve => resolve(response.data.getProject))
    );
};

/** fetches a random page
 * @returns {Promise} - with json as first argument
 */
export const loadRandomPage = () => {
  return client
    .query({
      query: LOAD_RANDOM_PAGE,
      fetchPolicy: "no-cache"
    })
    .then(
      response =>
        new Promise(resolve => resolve(response.data.getRandomProject))
    );
};

/** searches for pages by title
 * @param {string} query - What to look for in the title
 * @returns {Promise} - with json as first argument
 */
export const searchForPagesContaining = query => {
  return client
    .query({
      query: SEARCH_FOR_PAGES_CONTAINING,
      variables: {
        query
      }
    })
    .then(
      response => new Promise(resolve => resolve(response.data.searchProject))
    );
};

/** saves/Posts a page by title
 * @param {string} title - The title of the page.
 * @param {Object} json - The content, in json format
 * @returns {Promise} - with a json object as first argument
 */
export const savePage = (title, json) => {
  return client
    .mutate({
      mutation: SAVE_PAGE,
      variables: json
    })
    .then(
      response => new Promise(resolve => resolve(response.data.saveProject))
    );
};
