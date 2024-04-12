import React from 'react';
import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dark from './images/1.png';
import PropTypes from 'prop-types';

function Login({ setAuthenticationId, setCollectionName }) { //pass a new property called setAuthenticationId
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(credentials) {
    try {
      // Define the URL of the server
      const serverURL = 'http://localhost:4000';

      // Define the endpoint for the login API
      const endpoint = '/user/login';

      // Construct the full URL for the login API request
      const fetchURL = `${serverURL}${endpoint}`;

      // Send a POST request to the login API
      const response = await fetch(fetchURL, {
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(credentials), // Send the user credentials as JSON in the request body
      });

      // Log the status of the response to the console
      console.log('Response status:', response.status);

      // Check if the login request was successful (status code 200)
      if (response.status === 200) {
        // Parse the JSON response data
        const responseData = await response.json();

        // Log a success message to the console
        console.log('Login successful');

        // Depending on the user's role, navigate to the appropriate page
        if (responseData.collectionName === 'Teacher') {
          navigate('/teacherPage'); // Redirect to the teacher dashboard
        } else if (responseData.collectionName === 'User') {
          navigate('/studentPage'); // Redirect to the student page
        } else {
          navigate('/AdminPage'); // Redirect to the admin page
        }
        return [responseData.authenticationId,responseData.collectionName]; // Assuming authenticationId is returned
      } else {
        const responseData = await response.json();

        if (responseData.status === 'FAILED') {
          // Display an error message to the user
          alert(responseData.message);
        } else {
          console.error('Error creating user:', response.statusText);
        }
        return null; // Return null indicating failed login
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      return null; // Return null indicating error
    }
  }

  // Define the handleSubmit function, which is triggered when the form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.currentTarget; // Get the form element from the event
    if (form.checkValidity() === false) {
      // Check if the form data is valid
      event.preventDefault(); // Prevent the default form submission behavior
      event.stopPropagation(); // Stop the event from propagating further
    } else {
      try {
        // Attempt to log in the user using the provided username and password
        const authenticationId = await loginUser({
          username,
          password,
        });
        console.log("Authentication ID:", authenticationId[0]);
        console.log("Collection Name:", authenticationId[1]);
        if (authenticationId[0]) {
          // If authentication is successful, set the authentication ID in the state
          setAuthenticationId(authenticationId[0]);
          setCollectionName(authenticationId[1])
        }
      } catch (error) {
        // Handle any errors that occur during login
        console.error('Error handling login:', error.message);
      }
    }

    setValidated(true);
  };

  // let navigate = useNavigate();
  // const routeChange = (path) => {
  //   navigate(path);
  // }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#home"><div className="text-center">
              <img id="logo" src={dark}
                style={{ width: '100px' }} alt="logo" />
            </div></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Container>
        <div className="d-flex flex-column ms-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>Login</h3>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="Username">Username</Form.Label>
              <Form.Control id="Username" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="Password">Password</Form.Label>
              <Form.Control id="Password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter a password</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center pt-1 mb-5 pb-1">
              <Button className="mb-4 w-100 gradient-custom-2"
                type="submit"
                onClick={() => handleSubmit}>
                Sign in
              </Button>
              <a className="text-muted" onClick={() => navigate('/ForgotPassword')}>Forgot password?</a>
            </div>
          </Form>


          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <a className="login" onClick={() => navigate('/CreateAccount')}><p className="mb-0">Create an Account</p></a>
          </div>

        </div>

      </Container>
    </>
  );
}
// Define prop types for the Login component
// This ensures that setAuthenticationId is a required function prop
Login.propTypes = {
  setAuthenticationId: PropTypes.func.isRequired, // PropTypes for setAuthenticationId
  setCollectionName: PropTypes.func.isRequired //PropTypes for collectionName
};

export default Login;
