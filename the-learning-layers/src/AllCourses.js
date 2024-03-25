import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StudentMenu from './StudentMenu';
import AppFooter from './appFooter';
import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState({});
    const [courses, setCourses] = useState([]); // State to hold courses
    useEffect(() => {
      // Function to fetch courses
      const fetchCourses = async () => {
        try {
          const response = await fetch('http://localhost:4000/user/course'); // Adjust the endpoint as needed
          const data = await response.json();
          console.log(data);
          setCourses(data); // Update state with fetched courses
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
  
      fetchCourses(); // Call the fetch function
    }, []);

    const handleEnrollment = (courseId) => {
        setEnrollmentStatus((prevStatus) => ({
            ...prevStatus,
            [courseId]: 'Pending Request'
        }));
    };

    useEffect(() => {
        fetchCourses(); // Fetch courses when component mounts
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    const handleEnrollment = async (courseId) => {
      try {
          // Retrieve the student number from the session
          const studentNum = "";
          

  
          const response = await fetch('http://localhost:4000/api/enrollmentRoute', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  courseId: courseId,
                  studentNum: studentNum // Include the student number in the request body
              })
          });
  
          const data = await response.json();
          console.log(data); // Log the response from the backend
  
          setEnrollmentStatus((prevStatus) => ({
              ...prevStatus,
              [courseId]: data.success ? 'Pending Request' : 'Enrollment Failed'
          }));
      } catch (error) {
          console.error('Error enrolling in course:', error);
      }
  };
  

    return (
        <>
          <StudentMenu/>
          <Container className="my-5">
            <h1 className="text-center mb-4">WELCOME TO LEARNING LAYERS</h1>
            <h2 className="text-center mb-3">A better way to learn, anywhere and anytime.</h2>
            <p className="text-center mb-4">
              Explore your courses, track your progress, and engage with your classmates and instructors.
            </p>
            <Row xs={1} md={2} lg={3} className="g-4">
              {courses.map((course, index) => ( // Using index as the key
             <Col key={index}>
              <div className="course-card-student p-3 shadow-sm">
                <h3 style={{ color: 'white' }} className="text-center my-3">{course.name} {course.courseId}</h3>
                <div className="text-center">
                <Button variant="primary" onClick={() => handleEnrollment(course.id)}>
                        {enrollmentStatus[course.id] || 'Request to Enroll'}
                      </Button>
                </div>
              </div>
            </Col>
          ))}
            </Row>
          </Container>
          <AppFooter/>
        </>
    );
}

export default AllCourses;
