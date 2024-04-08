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
import { useState, useEffect } from 'react';
import AppFooter from './appFooter';
import InputGroup from 'react-bootstrap/InputGroup';
import TeacherCourseNavigation from './teacherCourseNavigation';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function GradeAssignment(){
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Access query parameters from window.location.search
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const courseId = params.get('courseId');

        fetchCourse( name, courseId);
    }, []); // Effect runs only once when component mounts

    const fetchCourse = async (name, courseId) => {
        try {
            // Fetch course details to get student numbers
            const courseResponse = await fetch(`http://localhost:4000/api/teacherRoute/viewCourseTeacher?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
            const course = await courseResponse.json();
            
            // Now fetch student details using the student numbers from the course
            const studentNumbers = course.students.join(',');
            const studentsResponse = await fetch(`http://localhost:4000/api/teacherRoute/viewStudents?studentNumbers=${studentNumbers}`);
            const studentsData = await studentsResponse.json();

            setStudents(studentsData);
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    TeacherCourseNavigation("/teacherAssignment");

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