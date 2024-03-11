import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dark from './images/1.png';


function CreateAccount() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      try {
        const response = await fetch('http://localhost:3000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: form.elements.username.value,
            email: form.elements.email.value,
            password: form.elements.password.value,
          }),
        });

        if (response.ok) {
          console.log('User successfully created');
          routeChange('/stores');
        } else {
          console.error('Error creating user:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating user:', error.message);
      }
      // routeChange('/stores');
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
              <img src={dark}
                style={{ width: '100px' }} alt="logo" />
            </div></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Container>

        <div className="d-flex flex-column ms-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>Create an account</h3>
            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" required />
              <Form.Control.Feedback type='invalid'>Please enter username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
              <Form.Control.Feedback type='invalid'>Please enter email</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
              <Form.Control.Feedback type='invalid'>Please enter a password</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" placeholder="Repeat password" required />
              <Form.Control.Feedback type='invalid'>Passwords don't match</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center pt-1 mb-5 pb-1">
              <Button type="submit" className="mb-4 w-100 gradient-custom-2">Create account</Button>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>
          </Form>

          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <a className="login" onClick={() => routeChange('/login')}><p className="mb-0">Login</p></a>
          </div>

        </div>

      </Container>
    </>
  );
}

export default CreateAccount;
