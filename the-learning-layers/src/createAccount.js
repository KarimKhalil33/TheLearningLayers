import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dark from './images/1.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateAccount() {
  const [validated, setValidated] = useState(false);

  // State variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentNum, setStudentNum] = useState("");
  const [position, setPosition] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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
        const endpoint = '/user/createAccount';
        const fetchURL = `${serverURL}${endpoint}`;
        console.log("I am here");
        const response = await fetch(fetchURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,//we get the username from the frontend and same for other fields
            lastName,
            studentNum,
            position,
            username,
            email,
            password,
          }),
        });
        if (response) {
          console.log("Response made");
        }

        if (response.status === 200) {
          console.log('User successfully created');
          // console.log(username);

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

    }; setValidated(true);
  }

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  const handleSelectChange = (e) => {
    setPosition(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Nav className="mx-auto">
            <Nav.Link href="#home">
              <div className="text-center">
                <img id="logo" src={dark} style={{ width: '100px' }} alt="logo" />
              </div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Container>
        <div className="d-flex flex-column ms-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h3 style={{ textAlign: "center" }}>Create an account</h3><br />
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label>ID Number</Form.Label>
              <Form.Control type="number" placeholder="Enter ID Number" value={studentNum} onChange={(e) => setStudentNum(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter ID Number</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Position Type</Form.Label>
              <Form.Select aria-label="Default select example" value={position} onChange={handleSelectChange} required>
                <option>Position Type </option>
                <option value="1">Student</option>
                <option value="2">Teacher</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter username</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter a password</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control type="password" placeholder="Repeat password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
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
