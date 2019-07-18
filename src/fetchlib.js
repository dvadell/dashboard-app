import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql"
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
export const loadPage = (title, version) => {
  let titleWithVersion = title;
  if (version) {
    titleWithVersion = title + "?version=" + version;
  }
  return client
    .query({
      query: gql`
        query($title: String!) {
          getProject(title: $title) {
            title
            description
            cons
            pros
            viewHandler
            whatDoINeed
            whatFor
            nextSteps
            notes
            version
          }
        }
      `,
      variables: {
        title: title
      }
    })
    .then(
      response => new Promise(resolve => resolve(response.data.getProject))
    );
};

/** searches for pages by title
 * @param {string} query - What to look for in the title
 * @returns {Promise} - with json as first argument
 */
export const searchForPagesContaining = query => {
  return client
    .query({
      query: gql`
        query($query: String!) {
          searchProject(query: $query) {
            title
            description
            cons
            pros
            viewHandler
            whatDoINeed
            whatFor
            nextSteps
            notes
            version
          }
        }
      `,
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
  console.log(json);
  return client
    .mutate({
      mutation: gql`
        mutation(
          $title: String!
          $description: String
          $cons: String
          $pros: String
          $viewHandler: String
          $whatDoINeed: String
          $whatFor: String
          $nextSteps: String
          $notes: String
        ) {
          saveProject(
            title: $title
            description: $description
            cons: $cons
            pros: $pros
            viewHandler: $viewHandler
            whatDoINeed: $whatDoINeed
            whatFor: $whatFor
            nextSteps: $nextSteps
            notes: $notes
          ) {
            title
          }
        }
      `,
      variables: json
    })
    .then(
      response => new Promise(resolve => resolve(response.data.saveProject))
    );
};
