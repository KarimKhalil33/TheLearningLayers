import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
function TeacherMenu() {
  return (
    <Navbar sticky='top' bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Learning Layers</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="./teacherPage">Dashboard</Nav.Link>
              <Nav.Link href="#courses">Courses</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default TeacherMenu