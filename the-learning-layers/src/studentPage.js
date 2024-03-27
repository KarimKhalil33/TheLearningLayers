
import React, { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppFooter from './appFooter';
import StudentMenu from './StudentMenu';
import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
function StudentPage() {


  const [courses, setCourses] = useState([]); // State to hold courses
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };
  useEffect(() => {
    // Function to fetch courses
    const fetchCourses = async () => {
        try {
            const username = JSON.parse(sessionStorage.getItem('authenticationId'));
            const response = await fetch('http://localhost:4000/api/enrollmentRoute/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username
                }),
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
      <StudentMenu/>
      <Container className="my-5">
        <h1 className="text-center mb-4">WELCOME TO LEARNING LAYERS</h1>
        <h2 className="text-center mb-3">A better way to learn, anywhere and anytime.</h2>
        <p className="text-center mb-4">
          Explore your courses, track your progress, and engage with your classmates and instructors.
        </p>
        {/* <div class="cards"> */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {courses.map((course, index) => ( // Using index as the key
            <Col key={index}>
              <div className="course-card-student p-3 shadow-sm">
                <h3 style={{ color: 'white' }} className="text-center my-3">{course.name} {course.courseId}</h3>
                <div className="text-center">
                <Button variant="primary" className="button" onClick={() => routeChange('/viewCourseStudent')}>View Course</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        {/* </div> */}
      </Container>
      <AppFooter/>
      
    </>
  );
}

export default StudentPage;
