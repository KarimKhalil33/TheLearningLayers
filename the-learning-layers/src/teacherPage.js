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
import TeacherMenu from './TeacherMenu';
import { Route } from 'react-router-dom';

function TeacherPage() {
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
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <>
      <TeacherMenu></TeacherMenu>
      <Container className="my-5">
        <h1 className="text-center mb-4">WELCOME TO LEARNING LAYERS</h1>
        <h2 className="text-center mb-3">A better way to teach, anywhere and anytime.</h2>
        <p className="text-center mb-4">
          Explore your courses, track your students' progress, and engage with your class.
        </p>
        <div class="cards">
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course) => (
            <Col key={course.id}>
              <div className="courseteach-card p-3 shadow-sm">
                <h3 style={{ color: 'white' }} className="text-center my-3">{course.title}</h3>
                <div  className="text-center">
                  <Button variant="primary" className="button" onClick={() => routeChange('/viewCourseTeacher')}>View Course</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        </div>
      </Container>
      <footer className=" mt-auto py-3 bg-light text-center">
        <span className="text-muted">© 2023 E-Learning Platform, Inc. All rights reserved.</span>
      </footer>
      
    </>
  );
}

export default TeacherPage;