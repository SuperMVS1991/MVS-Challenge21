import gql from 'graphql-tag';

export const GET_ME = gql`
  query GetMe($token: String!) {
    GetMe(token: $token) {
      _id
      username
      email 
      bookCount
      savedBooks {
        bookId 
        authors
        description
        title
        image
        link
      }
    }
  }
`;