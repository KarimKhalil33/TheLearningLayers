import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminMenu from './AdminMenu'; // Assuming you have an AdminMenu component
import  { useEffect, useState, routeChange } from 'react';
import './App.css';
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
                     onClick={() => { /* Add delete logic here */ }}
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
