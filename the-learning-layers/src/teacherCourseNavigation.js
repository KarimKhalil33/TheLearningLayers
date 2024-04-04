import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
function TeacherCourseNavigation(setkey){
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };
    return(
        <>
        <article className='side-nav'>
            <Nav variant="underline" defaultActiveKey={setkey} className="flex-column teachernav">
                <Nav.Link className ="sidebar" eventKey="/viewCourseTeacher" onClick={() => routeChange('/viewCourseTeacher')}>View Course</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherAssignment" onClick={() => routeChange('/teacherAssignment')}>Assignments</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherQuizes" onClick={() => routeChange('/teacherQuizes')}>Quizzes</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/viewStudents" onClick={() => routeChange('/viewStudents')}>Students</Nav.Link>
            </Nav>
        </article>
        </>
    )
}
export default TeacherCourseNavigation;