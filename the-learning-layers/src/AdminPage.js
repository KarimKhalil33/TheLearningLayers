import React, { useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminMenu from './AdminMenu'; // Assuming you have an AdminMenu component
import AppFooter from './appFooter';
import { Trash } from 'react-bootstrap-icons';

import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function AdminPage() {

    const [courses, setCourses] = useState([]); // State to hold courses
    let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };
    useEffect(() => {
        // Function to fetch courses
        const fetchCourses = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/adminRoute/courses'); // Adjust the endpoint as needed
            const data = await response.json();
            setCourses(data); // Update courses state with fetched data
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Fetch courses from the backend when the component mounts
    useEffect(() => {
        fetchCourses();
    }, []); // Empty dependency array ensures useEffect runs only once after initial render

    const handleDeleteCourse = async (courseId) => {
        try {
            // Construct the URL for the DELETE request
            const serverURL = 'http://localhost:4000';
            const endpoint = `/api/adminRoute/delete`;
            const fetchURL = `${serverURL}${endpoint}`;

            console.log('Fetch URL:', fetchURL);

            // Send a DELETE request to the backend endpoint
            await fetch(fetchURL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({courseId})
            });

            // After deletion, fetch courses again to update the list
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <>
            <AdminMenu />
            <Container className="my-5">
                <h1 className="text-center mb-4">ADMIN DASHBOARD</h1>
                <h2 className="text-center mb-3">Manage courses and student enrollments.</h2>
                <div className="cards">
                    <Row xs={1} md={2} lg={3} className="g-4">

                    {courses.map((course, index) => ( // Using index as the key
             <Col key={index}>
             <div className="course-card-admin p-3 shadow-sm" style={{ position: 'relative' }}>
                 <Button 
                     variant="danger" 
                     className="button" 
                     style={{ position: 'absolute', top: '10px', right: '10px' }} 
                     onClick={() => handleDeleteCourse(index)}
                 >
                     <Trash /> {/* Use the Trash icon */}
                 </Button>
                 <h3 style={{ color: 'white' }} className="text-center my-3">{course.name} {course.courseId}</h3>
                 <div className="text-center">
                     <Button variant="primary" className="button" onClick={() => routeChange('/viewCourseStudent')}>View</Button>
                 </div>
             </div>
         </Col>
          ))}

                    </Row>
                </div>
            </Container>
    
            <AppFooter></AppFooter>
      
        </>
    );
}

export default AdminPage;

