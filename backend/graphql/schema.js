const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
  type Project {
    title: String!
    description: String
    pros: String
    cons: String
    whatFor: String
    viewHandler: String
    whatDoINeed: String
    nextSteps: String
    notes: String
    leftCol: String
    rightCol: String
    version: Int
    _id: ID
  }

  type Query {
    getProject(title: String!): Project
    getRandomProject: Project
    searchProject(query: String!): [Project]
  }

  type Mutation {
    saveProject(title: String!, description: String, pros: String, cons: String, 
        whatFor: String, viewHandler: String, whatDoINeed: String,
        nextSteps: String, notes: String, leftCol: String, rightCol: String, version: Int): Project
  }
`;

