import gql from "graphql-tag";

export const LOAD_PAGE = gql`
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
      leftCol
      rightCol
      version
    }
  }
`;

export const LOAD_RANDOM_PAGE = gql`
  query {
    getRandomProject {
      title
      description
      cons
      pros
      viewHandler
      whatDoINeed
      whatFor
      nextSteps
      notes
      leftCol
      rightCol
      version
    }
  }
`;

export const SEARCH_FOR_PAGES_CONTAINING = gql`
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
      leftCol
      rightCol
      version
    }
  }
`;
