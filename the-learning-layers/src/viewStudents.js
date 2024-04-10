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
        fetchGradesForCourse(name, courseId);
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

            // Initialize grades for fetched students
            const studentsWithGrades = studentsData.map(student => ({
                ...student,
                assignmentGrades: [],
                quizGrades: []
            }));

            setStudents(studentsWithGrades);

            // Fetch grades for the course and assign them to the students
            fetchGradesForCourse(name, courseId, studentsWithGrades);
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };
    
    const fetchGradesForCourse = async (courseName, courseId, students) => {
        const courseIdentifier = `${courseName} ${courseId}`;
        try {
            const response = await fetch(`http://localhost:4000/api/teacherRoute/studentGrades?course=${encodeURIComponent(courseIdentifier)}`);
            const gradesData = await response.json();

            // Assign grades to each student based on their student number
            const updatedStudents = students.map(student => ({
                ...student,
                assignmentGrades: gradesData.assignmentGrades.filter(grade => grade.studentNum === student.studentNum) || [],
                quizGrades: gradesData.quizGrades.filter(grade => grade.studentNum === student.studentNum) || []
            }));

            setStudents(updatedStudents);  // Update the state with students' info including their grades
        } catch (error) {
            console.error('Error fetching grades for course:', error);
        }
    };
    
    return(
        <>
{/* This section displays the student each student being implemented with an accordion. The accordion contains dropdowns which teachers can use to see students distribution on assignemtns and quizzes */}                
        <TeacherMenu></TeacherMenu>
        <TeacherCourseNavigation/> 
        <article className='main'>
                <header>
                    <h1><strong>Students</strong></h1>
                </header>
                {students.map(student => (
                    <Accordion key={student.studentNum} className='mb-3'>
                        <Accordion.Item eventKey={student.studentNum.toString()}>
                            <Accordion.Header>
                                {student.firstName} {student.lastName}
                            </Accordion.Header>
                            <Accordion.Body>
                                <h5>Assignment Grades</h5>
                                <ul>
                                    {student.assignmentGrades.map((grade, index) => (
                                        <li key={index}>
                                            {grade.assignmentName}: {grade.grade} - Status: {grade.status} - Comment: {grade.comment}
                                        </li>
                                    ))}
                                </ul>
                                <h5>Quiz Grades</h5>
                                <ul>
                                    {student.quizGrades.map((quiz, index) => (
                                        <li key={index}>
                                            {quiz.quizName}: {quiz.grade}
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </article>
        </>
    );
}
export default GradeAssignment;