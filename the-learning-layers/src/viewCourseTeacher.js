import React from 'react';
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
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import AppFooter from './appFooter';
import TeacherCourseNavigation from './teacherCourseNavigation';

function ViewCourseTeach(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };
    return(
        <>
        <TeacherMenu></TeacherMenu>
        {/* sidebar for teachers to be able to work through the different pages of the course */}
        {/* <article className='side-nav'>
            <Nav variant="underline" defaultActiveKey="/viewCourseTeacher" className="flex-column ">
                <Nav.Link className ="sidebar" eventKey="/viewCourseTeacher">View Course</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherAssignment" onClick={() => routeChange('/teacherAssignment')}>Assignments</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="link-2">Quizzes</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="link-3">Grades</Nav.Link>
            </Nav>
        </article> */}
        <TeacherCourseNavigation setkey="/viewCourseTeacher"></TeacherCourseNavigation>
        <article className='upcoming'>
            {/*Section for teachers to be able to monitor upcoming assignments  */}
                <h3><strong>Upcoming</strong></h3>
                <ul>
                    <li><a href="">Assignment 1</a> <span className='assignDate'>Date</span></li>
                    <li><a href="">Assignment 2</a> <span className='assignDate'>Date</span></li>
                    <li><a href="">Assignment 3</a> <span className='assignDate'>Date</span></li>
                    <li><a href="">Assignment 4</a> <span className='assignDate'>Date</span></li>
                </ul>
        </article>
        <article className="main">
            <header>
                <h1><strong>Course Name</strong></h1>
                <h2>Course Description</h2>
            </header>
            {/* Section detailing the course content */}
            <section id='courseDetails'>
                <h3><strong>About the course</strong></h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </section>
            {/*Section details the course syllabus */}
            <section id='syllabus'>
                <h3><strong>Syllabus</strong></h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            <Button variant="primary" onClick={handleShow}>
                Edit Page
            </Button>
            {/*A modal opens up showing a text area for the user to be able to edit the content on the page... submitting the page should update the page */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Course Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>About the Course</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Course syllabus</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </article>

        <AppFooter></AppFooter>
        </>
    )
}

export default ViewCourseTeach;