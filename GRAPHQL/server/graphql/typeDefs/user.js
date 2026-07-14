export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;