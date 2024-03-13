import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dark from './images/1.png';

function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      try {
        const serverURL = 'http://localhost:4000';
        const endpoint = '/user/login';
        const fetchURL = `${serverURL}${endpoint}`;
        const response = await fetch(fetchURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        console.log('Response status:', response.status);

        if (response) {
          console.log("Response made");
        }

        if (response.status === 200) {
          console.log('Login successful');
        } else {
          const responseData = await response.json();

          if (responseData.status === 'FAILED') {
            // Display an error message to the user
            alert(responseData.message);
          } else {
            console.error('Error creating user:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error creating user:', error.message);
      }
    }

    setValidated(true);
  };
  
    let navigate = useNavigate();
    const routeChange = (path) => {
      navigate(path);
    }
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
            <h3 style={{textAlign:"center"}}>Login</h3>
            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter a password</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center pt-1 mb-5 pb-1">
              <Button className="mb-4 w-100 gradient-custom-2" type="submit">Sign in</Button>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>
            </Form>
            

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <a className="login" onClick={() => routeChange('/CreateAccount')}><p className="mb-0">Create an Account</p></a>
            </div>

          </div>

    </Container>
    </>
  );
}

export default Login;
