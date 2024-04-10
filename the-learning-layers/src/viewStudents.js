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
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // Access query parameters from window.location.search
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const courseId = params.get('courseId');

        fetchCourse( name, courseId);
        fetchGradesForStudents(students, name, courseId);
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
    
    const fetchGradesForStudents = async (students, courseName, courseId) => {
        try {
            // The course field in the grades schema is a combination of courseName and courseId
            const courseIdentifier = `${courseName} ${courseId}`;
    
            // Map over each student and fetch their grades using their student number and courseIdentifier
            const gradesRes = students.map(student =>
                fetch(`http://localhost:4000/api/teacherRoute/studentGrades?studentNum=${student.studentNum}&course=${encodeURIComponent(courseIdentifier)}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch grades');
                        }
                        return response.json(); // Assuming the endpoint returns JSON
                    })
            );
    
            // Wait for all the grade fetches to complete
            const grades = await Promise.all(gradesRes);
    
            // grades now contains an array of grades for each student in the specific course
            console.log(grades);
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    };
    
    return(
        <>
{/* This section displays the student each student being implemented with an accordion. The accordion contains dropdowns which teachers can use to see students distribution on assignemtns and quizzes */}                
        <TeacherMenu></TeacherMenu>
        <TeacherCourseNavigation/> 
        <article className='main'>
        {/* Yet to be filled out, this portion of the page displays all students for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
            <header>
                <h1><strong>Students</strong></h1>
            </header>
            <div className='assignActions'>
                {/* This section displays the student each student being implemented with an accordion. The accordion contains dropdowns which teachers can use to see students distribution on assignemtns and quizzes */}
                {students.map((student)=>(<Accordion>
                    <Accordion.Item eventKey="0" className='students'>
                        <Accordion.Header>{student.firstName} {student.lastName}  <div className='overall'>Overall Grade: </div></Accordion.Header>{/*Add code student course grade here within the overall div */}
                        <Accordion.Body>
                        <div className='studentButtons'>
                            <div>
                                <h5>Assignment Grades</h5>
                                {assignments.map((assignment)=>(<div>{assignment}</div>))}
                            </div>
                            <div>
                                <h5>Quiz Grades</h5>
                                {quizzes.map((quiz)=>(<div>{quiz}</div>))}
                            </div>
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