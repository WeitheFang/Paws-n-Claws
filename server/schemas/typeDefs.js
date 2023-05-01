const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
    quantity: Int
    category: Category
  }

  type Category {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    addProduct(
      name: String!
      description: String!
      image: String!
      price: Float!
      quantity: Int!
      category: ID!
    ): Product
    updateUser(username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
