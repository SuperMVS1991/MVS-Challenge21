// see SignupForm.js for comments
import { useState } from 'react'; 
import { useQuery, useMutation } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { ApolloError } from '@apollo/client';



import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => { 
  const [loginUser] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try { 
      
      console.log("Request Payload:", userFormData);
 
      const { data } = await loginUser ({
        variables: { ...userFormData }
      });
         console.log("Response Data:", data);
     

      Auth.login(data.login.token);
      // const { token, user } = await data.json();
      // console.log(user);
      // Auth.login(token);
    } catch (error) {
      if (error instanceof ApolloError) {
        // ApolloError contains more information about the error
        console.error("GraphQL Error:", error.message);
        // You can access additional properties like error.graphQLErrors or error.networkError
      } else {
        // Handle other types of errors
        console.error("Unexpected Error:", error);
      }
      // Show an alert or error message to the user
      setShowAlert(true);
    }
    setUserFormData({
      // username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
