import React, { useState,useEffect } from 'react';
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
    //get user info from session
   const username = JSON.parse(sessionStorage.getItem('authenticationId'));

    const [enrollmentStatus, setEnrollmentStatus] = useState([]);

    const [courses, setCourses] = useState([]); // State to hold courses
  useEffect(() => {
          //grab courses the student is enrolled in
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


//  // Request to fetch all courses that the student is enrolled in
// const fetchCourses = async () => {
//   console.log(username);
//   try {
//     const response = await fetch(`http://localhost:4000/api/enrollmentRoute/available`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username: username }),
  
      
//     }
    
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch courses');
//     }

//     const data = await response.json();
//     console.log(data);
//     setCourses(data); // Update state with fetched courses
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//   }
// };

// fetchCourses(); // Call the fetch function


//     }, []);
    


    // Function to handle enrollment
    const handleEnrollment = async (name, courseId, title) => {
      console.log(username);
      try {
        const response = await fetch('http://localhost:4000/api/enrollmentRoute/pending', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username, // Send student's username
            courseName: name, // Send course name ex: COSC
            courseId: courseId, // Send course ID ex : 310
            title : title //Send course title ex: "Software Engineering"
          }),
        });
  
        if (response.ok) {
          // If request for enrollment is successful, update enrollment status
          const uniqueId = `${name}-${courseId}`;
          setEnrollmentStatus((prevStatus) => ({
            ...prevStatus,
            [uniqueId]: 'Pending Request'
          }));
          console.log('Enrollment request sent successfully.');
        } else {
          console.error('Failed to send enrollment request:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending enrollment request:', error);
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
                <Button variant="primary" onClick={() => handleEnrollment(course.name, course.courseId, course.title)}>
                        {enrollmentStatus[`${course.name}-${course.courseId}`] || 'Request to Enroll'}
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

export default AllCourses