import { useState, useEffect } from 'react'; 
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { REMOVE_BOOK } from '../utils/mutations'; 
import { GET_ME } from '../utils/quiers';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {  
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  console.log("savedbooks checking the token!",token);
  const [deleteIt] = useMutation(REMOVE_BOOK)
  const { loading, error, data } = useQuery(GET_ME, {
    variables: { token },
  });

console.log("savedbooks checking the error!", error);

if (error) return <p>Error: {error.message}</p>;

console.log("savedbooks checking the data!", data);
  const userData = data?.me || []; 

console.log(userData);

  
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => { 
    event.preventDefault
    // const token = Auth.loggedIn() ? Auth.getToken() : null; 
    console.log("savedbooks checking the bookId!", bookId);
 console.log()
    if (!token) {
      return false;
    }

    try {
    console.log("trying to delete", token);
      const data = await deleteIt({
        variables: { bookId, _id: token },
      });

     
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data.GetMe.bookCount
            ? `Viewing ${data.GetMe.bookCount} saved ${data.GetMe.bookCount === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data.GetMe.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
