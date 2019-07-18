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
 * @param {string} version - The version
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

/** saves/Posts a page by title
 * @param {string} title - The title of the page.
 * @param {Object} json - The content, in json format
 * @returns {Promise} - with a json object as first argument
 */
export const savePage = (title, json) => {
  console.log(json);
  return client.mutate({
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
        ) {
          title
        }
      }
    `,
    variables: json
  });
};
