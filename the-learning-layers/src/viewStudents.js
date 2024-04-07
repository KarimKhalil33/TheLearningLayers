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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function GradeAssignment(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const Assignments = ["Assign 1","Assign 2","Assign 3","Assign 4"];
    TeacherCourseNavigation("/teacherAssignment");
    // populate arrays with actual values from the database. Map functions have been defined to enable the information to be used.
    const students= ["Student 1", "Student 2", "Student 3", "Student 4"]
    const assignments= ["Assignment 1", "Assignment 2", "Assignment 3"]
    const quizzes= ["Quiz 1", "Quiz 2", "Quiz 3"]
    return(
        <>
             <TeacherMenu></TeacherMenu>
             <TeacherCourseNavigation setkey="/teacherAssignment"></TeacherCourseNavigation> 
             <article className='main'>
                {/* Yet to be filled out, this portion of the page displays all students for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
                <header>
                    <h1><strong>Students</strong></h1>
                </header>
                    <div className='assignActions'>
                        {/* This section displays the student each student being implemented with an accordion. The accordion contains dropdowns which teachers can use to see students distribution on assignemtns and quizzes */}
                    {students.map((student)=>(<Accordion>
                        <Accordion.Item eventKey="0" className='students'>
                            <Accordion.Header>{student}  <div className='overall'>Overall Grade: </div></Accordion.Header>{/*Add code student course grade here within the overall div */}
                            <Accordion.Body>
                            <div className='studentButtons'>
                            <DropdownButton id="dropdown-basic-button" title="Assignment Grade">
                                {assignments.map((assignment)=>(<Dropdown.Item href="#/action-1">{assignment}</Dropdown.Item>))}
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" title="Quiz Grade">
                            {quizzes.map((quiz)=>(<Dropdown.Item href="#/action-1">{quiz}</Dropdown.Item>))}
                            </DropdownButton>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>))}
                    
                        
                    </div>
            </article>
        </>
    );
}
export default GradeAssignment;