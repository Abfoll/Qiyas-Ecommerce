export const productTypeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    oldPrice: Float
    rating: Float!
    reviewsCount: Int!
    badge: String
    stock: Int!
    images: [String!]!
    category: Category!
    createdAt: String!
  }

  input ProductFilterInput {
    categorySlug: String
    maxPrice: Float
    search: String
  }

  enum ProductSort {
    FEATURED
    PRICE_ASC
    PRICE_DESC
    RATING
    NEWEST
  }

  extend type Query {
    products(filter: ProductFilterInput, sort: ProductSort): [Product!]!
    product(id: ID!): Product
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    oldPrice: Float
    badge: String
    stock: Int!
    images: [String!]
    categoryId: ID!
  }

  extend type Mutation {
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;