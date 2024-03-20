import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminMenu from './AdminMenu'; // Assuming you have an AdminMenu component
function AdminPage() {
    const courses = [
        { title: 'Introduction to Programming', id: 1 },
        { title: 'Advanced Programming', id: 2 },
        { title: 'Data Structures', id: 3 },
        { title: 'Data Structures', id: 3 },
        { title: 'Data Structures', id: 3 },
        { title: 'Data Structures', id: 3 },
        { title: 'Data Structures', id: 3 },
        // List other courses as needed
    ];
    
    return (
        <>
            <AdminMenu />
            <Container className="my-5">
                <h1 className="text-center mb-4">ADMIN DASHBOARD</h1>
                <h2 className="text-center mb-3">Manage courses and student enrollments.</h2>
                <div className="cards">
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {courses.map((course) => (
                            <Col key={course.id}>
                                <div className="course-card-admin p-3 shadow-sm">
                                    <h3 style={{ color: 'white' }} className="text-center my-3">{course.title}</h3>
                                    <div className="text-center">
                                        <Button variant="primary" className="mb-2">Delete</Button>
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

export default AdminPage;
