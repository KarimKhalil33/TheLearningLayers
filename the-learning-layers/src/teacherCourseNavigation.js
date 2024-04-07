import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
function TeacherCourseNavigation({ courseId, courseName }){
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const navigateToCourse = () => {
        // Navigate with courseId and courseName in the URL
        navigate(`/viewCourseTeacher/${courseId}/${encodeURIComponent(courseName)}`);
      };

    const navigateToAssignments = () => {
        // Navigate to assignments with courseId and courseName
        navigate(`/teacherAssignments/${courseId}/${encodeURIComponent(courseName)}`);
    };
    return(
        <>
        <article className='side-nav'>
            <Nav variant="underline" className="flex-column teachernav">
                <Nav.Link className ="sidebar" eventKey="/viewCourseTeacher" onClick={navigateToCourse}>View Course</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherAssignment" onClick={navigateToAssignments}>Assignments</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherQuizes" onClick={()=>routeChange('/teacherQuizes')} >Quizzes</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/viewStudents" onClick={() => routeChange('/viewStudents')}>Students</Nav.Link>
            </Nav>
        </article>
        </>
    )
}
export default TeacherCourseNavigation;