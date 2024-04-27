// import the gql tagged template function


// create our typeDefs
const typeDefs = `
input BookInput {
  authors: [String]
  description: String
  title: String
  bookId: ID
  image: String
  link: String
} 
type Auth {
    token: ID!
    user: User
  }

type User {
  _id: ID
  username: String!
  email: String!
  bookCount: Int
  savedBooks: [Book]
}
type Book {
  bookId: ID
  authors: [String]
  description: String
  title: String!
  image: String
  link: String
}

type Query {
  GetMe(token: String!): User
  }
type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveBook(_id: String!, bookData: BookInput!): User
  removeBook(bookId: ID! _id: String!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;