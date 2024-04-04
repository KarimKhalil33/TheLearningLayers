import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { json, useNavigate, useParams } from "react-router-dom";
import dark from './images/1.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TeacherMenu from './TeacherMenu';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import AppFooter from './appFooter';
import TeacherCourseNavigation from './teacherCourseNavigation';

function ViewCourseTeach(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [course, setCourse] = useState([]);
    useEffect(() => {
        // Access query parameters from window.location.search
        const params = new URLSearchParams(window.location.search);
        const courseName = params.get('name');
        const courseId = params.get('courseId');

        // Now you can use `name` and `courseId` to fetch data from the database
        // For example, fetch course based on the received parameters
        fetchCourse(courseName, courseId);
    }, []); // Effect runs only once when component mounts

    const fetchCourse = async (courseName, courseId) => {
        try {
            // Make fetch request to fetch course based on query parameters
            const response = await fetch(`http://localhost:4000/api/teacherRoute/viewCourseTeacher?name=${encodeURIComponent(courseName)}&courseId=${encodeURIComponent(courseId)}`);
            const data = await response.json();
            alert("in");
            console.log(data);
            setCourse(data);
        } catch (error) {
            console.error('Error fetching course:', error);
        }
    };

    return(
        <>
        <TeacherMenu></TeacherMenu>
        <TeacherCourseNavigation courseName={course.name} courseId={course.courseId} />
        <article className="main">
            <header>
                <h1><strong>{course.name} {course.courseId}</strong></h1>
                <h2>{course.title}</h2>
            </header>
            {/* Section detailing the course content */}
            <section id='courseDetails'>
                <h3><strong>About the course</strong></h3>
                {course.description}
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