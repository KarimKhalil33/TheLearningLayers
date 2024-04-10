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
import InputGroup from 'react-bootstrap/InputGroup';
import TeacherCourseNavigation from './teacherCourseNavigation';
import Accordion from 'react-bootstrap/Accordion';
function GradeQuiz(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const params = new URLSearchParams(window.location.search);
    const courseName = params.get('name');
    const courseId = params.get('courseId');

 
     let navigate = useNavigate();
     const routeChange = (path) => {
         navigate(path);
     };

    const students = ["Student 1","Student 2","Student 3","Student 4"];
    TeacherCourseNavigation("/teacherAssignment");
    return(
        <>
             <TeacherMenu></TeacherMenu>
             <TeacherCourseNavigation setkey="/teacherAssignment"></TeacherCourseNavigation> 
             <article className='main'>
                {/* Yet to be filled out, this portion of the page displays all assignments for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
                <header>
                    <h1><strong>Quizzes</strong></h1>
                </header>
                    <div className='assignActions'>
                    {students.map((student) => (
                    <Accordion>
                        <Accordion.Item eventKey="0" className='students'>
                            <Accordion.Header>{student}</Accordion.Header>
                            <Accordion.Body>
                            <div className='submitted-assessment'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </div>
                            <Form>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                <InputGroup>
                                    <InputGroup.Text>Comments</InputGroup.Text>
                                    <Form.Control as="textarea" aria-label="Comments" />
                                </InputGroup>
                                </Col>
                                <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                    Grade
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    
                                    <Form.Control id="inlineFormInputGroup" placeholder="Grade" />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                </Col>
                                <Col xs="auto">
                                <Button type="submit" className="mb-2">
                                    Submit
                                </Button>
                                </Col>
                            </Row>
                            </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>))}
                    </div>
            </article>   
        </>
    );
}
export default GradeQuiz;