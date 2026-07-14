export const categoryTypeDefs = `#graphql
  type Category {
    id: ID!
    name: String!
    slug: String!
    image: String
    productCount: Int!
  }

  extend type Query {
    categories: [Category!]!
    category(slug: String!): Category
  }

  extend type Mutation {
    createCategory(name: String!, slug: String!, image: String): Category!
  }
`;