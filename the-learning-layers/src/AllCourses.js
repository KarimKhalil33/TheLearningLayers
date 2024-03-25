import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StudentMenu from './StudentMenu';

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState({});


    // Function to fetch courses from the backend
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://localhost:4000/user/createCourse');
            const data = await response.json();
            setCourses(data); // Update courses state with fetched data
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
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
                    {courses.map((course) => (
                        <Col key={course._id}>
                            <div className="course-card-student p-3 shadow-sm">
                                <h3 className="text-center my-3" style={{ color: 'white' }}>{course.title}</h3>
                                <div className="text-center">
                                    <Button variant="primary" onClick={() => handleEnrollment(course._id)}>
                                        {enrollmentStatus[course._id] || 'Request to Enroll'}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
            <footer className="mt-auto py-3 bg-light text-center">
                <span className="text-muted">© 2023 E-Learning Platform, Inc. All rights reserved.</span>
            </footer>
        </>
    );
}

export default AllCourses;
