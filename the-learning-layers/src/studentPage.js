
import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function StudentPage() {
  // Placeholder data for courses, this would likely be fetched from a database in a real application.
  const courses = [
    { title: 'Introduction to Programming', id: 1 },
    { title: 'Advanced Programming', id: 2 },
    { title: 'Data Structures', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    { title: 'Machine Architecture', id: 3 },
    
  ];

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Learning Layers</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <Nav.Link href="#courses">Courses</Nav.Link>
              <Nav.Link href="#Enroll">Enroll in a Course</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="my-5">
        <h1 className="text-center mb-4">WELCOME TO LEARNING LAYERS</h1>
        <h2 className="text-center mb-3">A better way to learn, anywhere and anytime.</h2>
        <p className="text-center mb-4">
          Explore your courses, track your progress, and engage with your classmates and instructors.
        </p>
        <div class="cards">
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course) => (
            <Col key={course.id}>
              <div className="course-card p-3 shadow-sm">
                <h3 style={{ color: 'white' }} className="text-center my-3">{course.title}</h3>
                <div  className="text-center">
                  <Button variant="primary" className="button">View Course</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        </div>
        <Container className=" mt-auto py-3 bg-light text-center">
          <span className="text-muted">© 2023 E-Learning Platform, Inc. All rights reserved.</span>
        </Container>
     
      </Container>
      
    </>
  );
}

export default StudentPage;
