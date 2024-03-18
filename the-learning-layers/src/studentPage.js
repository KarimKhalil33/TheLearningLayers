
import React, { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StudentMenu from './StudentMenu';
function StudentPage() {
  // Placeholder data for courses, this would likely be fetched from a database in a real application.
  /*
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
  */

  const [courses, setCourses] = useState([]); // State to hold courses

  useEffect(() => {
    // Function to fetch courses
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/createCourse'); // Adjust the endpoint as needed
        const data = await response.json();
        console.log(data);
        setCourses(data); // Update state with fetched courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); // Call the fetch function
  }, []);

  return (
    <>
    <StudentMenu></StudentMenu>  
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
              <div className="course-card p-3 shadow-sm">
                <h3 style={{ color: 'white' }} className="text-center my-3">{course.name} {course.courseId}</h3>
                <div className="text-center">
                  <Button variant="primary">View Course</Button>

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

export default StudentPage;
