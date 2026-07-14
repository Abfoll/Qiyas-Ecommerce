import { userTypeDefs } from "./user.js";
import { categoryTypeDefs } from "./category.js";
import { productTypeDefs } from "./product.js";

const rootTypeDefs = `#graphql
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [rootTypeDefs, userTypeDefs, categoryTypeDefs, productTypeDefs];