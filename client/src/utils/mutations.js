import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`; 

export const SAVE_BOOK = gql`
  mutation saveBook($_id: String!, $bookData: BookInput!) {
    saveBook(_id: $_id, bookData: $bookData) {
        _id
        username
        email
        savedBooks {
            authors
            bookId
            description
            title
            image
            link
        }
      }
    }
`;



export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!, $_id: String!) {
    removeBook(bookId: $bookId, _id: $_id) {
      _id
      username
      savedBooks {
        bookId
        description
        title
        image
        authors
        link
    }
    }
  }
`;