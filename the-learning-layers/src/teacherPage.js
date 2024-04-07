import React, { useState, useEffect } from 'react';
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
import AppFooter from './appFooter';

function TeacherPage() {
  const [courses, setCourses] = useState([]); // State to hold courses
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Function to fetch courses
    const fetchCourses = async () => {
      try {
        const authenticationId = sessionStorage.getItem("authenticationId").replace(/"/g, "");
        // Define the URL of the server
        const serverURL = 'http://localhost:4000';

        // Define the endpoint for the login API
        const endpoint = '/user/teacherPage';
        // Construct the full URL for the login API request
        const fetchURL = `${serverURL}${endpoint}`;
        const response = await fetch(fetchURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authenticationId,
          },
        });
        const data = await response.json();
        setCourses(data); // Update state with fetched courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); // Call the fetch function
  }, []);

  return (
    <>
      <TeacherMenu></TeacherMenu>
      <Container className="my-5">
        <h1 className="text-center mb-4">WELCOME TO LEARNING LAYERS</h1>
        <h2 className="text-center mb-3">A better way to teach, anywhere and anytime.</h2>
        <p className="text-center mb-4">
          Explore your courses, track your students' progress, and engage with your class.
        </p>
        <div className="cards" data-testid="view">
          <Row xs={1} md={2} lg={3} className="g-4">
            {courses.map((course, index) => (
              <Col key={index}>
                <div className="courseteach-card p-3 shadow-sm">
                  <h3 style={{ color: 'white' }} className="text-center my-3">{course.name} {course.courseId}</h3>
                  <div className="text-center" >
                    <Button variant="primary" className="button" onClick={() => routeChange(`/viewCourseTeacher?courseId=${encodeURIComponent(course.courseId)}&name=${encodeURIComponent(course.name)}`)} >View Course</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <AppFooter/>

    </>
  );
}

export default TeacherPage;