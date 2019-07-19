import gql from "graphql-tag";

export const SAVE_PAGE = gql`
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
`;
