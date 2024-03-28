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
    
    // async () => (
        
    // )
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
                    <Accordion>
                        <Accordion.Item eventKey="0" className='students'>
                            <Accordion.Header>Student Name  <div className='overall'>Overall Grade: </div></Accordion.Header>
                            <Accordion.Body>
                            <div className='studentButtons'>
                            <DropdownButton id="dropdown-basic-button" title="Assignment Grade">
                                <Dropdown.Item href="#/action-1">Assignment 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Assignment 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Assignment 3</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" title="Quiz Grade">
                            <Dropdown.Item href="#/action-1">Assignment 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Assignment 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Assignment 3</Dropdown.Item>
                            </DropdownButton>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                        <Accordion>
                        <Accordion.Item eventKey="0" className = "students">
                            <Accordion.Header>Student Name  <span>Overall Grade: </span></Accordion.Header>
                            <Accordion.Body>
                            <div className='studentButtons'>
                            <DropdownButton id="dropdown-basic-button" title="Assignment Grade">
                                <Dropdown.Item href="#/action-1">Assignment 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Assignment 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Assignment 3</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" title="Quiz Grade">
                            <Dropdown.Item href="#/action-1">Assignment 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Assignment 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Assignment 3</Dropdown.Item>
                            </DropdownButton>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>

                        <Accordion>
                        <Accordion.Item eventKey="0" className='students'>
                            <Accordion.Header>Student Name  <span>Overall Grade: </span></Accordion.Header>
                            <Accordion.Body>
                            <div className='studentButtons'>
                            <DropdownButton id="dropdown-basic-button" title="Assignment Grade">
                                <Dropdown.Item href="#/action-1">Assignment 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Assignment 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Assignment 3</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton id="dropdown-basic-button" title="Quiz Grade">
                            <Dropdown.Item href="#/action-1">Assignment 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Assignment 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Assignment 3</Dropdown.Item>
                            </DropdownButton>
                            </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                    </div>
                
            </article>
            
        </>
    );
    //this should show
}
export default GradeAssignment;