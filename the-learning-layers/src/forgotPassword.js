import React from 'react';
import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dark from './images/1.png';
function ForgotPassword()
{
    const navigate = useNavigate();
    // function checkPassword(e)
    // {
    //     var password = document.getElementById('Password').value;

    //     if(e.value!=password)
    //         e.noValidate;
    //     else
    //         e.validated;
    // }
    return(
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
          {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
          <Form>
            <h3 style={{ textAlign: "center" }}>Forgot Password</h3>
            <Form.Group className="mb-4">
              <Form.Label htmlFor="Username">Username</Form.Label>
              <Form.Control id="Username" type="text" placeholder="Enter username"  required />
              <Form.Control.Feedback type='invalid'>Please enter username</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="Password">New Password</Form.Label>
              <Form.Control id="Password" type="password" placeholder="Password"   required />
              <Form.Control.Feedback type='invalid'>Please enter new password</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label htmlFor="Password">Retype Password</Form.Label>
              <Form.Control id="rePassword" type="password" placeholder="Retype Password"  required />
              <Form.Control.Feedback type='invalid'>Please retype password</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center pt-1 mb-5 pb-1">
              <Button className="mb-4 w-100 gradient-custom-2"
                type="submit">
                {/* // onClick={() => handleSubmit}> */}
                Sign in
              </Button>
            </div>
          </Form>


          <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
            <a className="login" onClick={() => navigate('/login')}><p className="mb-0">Login</p></a>
          </div>

        </div>

      </Container>
        </>
    )
}
export default ForgotPassword;