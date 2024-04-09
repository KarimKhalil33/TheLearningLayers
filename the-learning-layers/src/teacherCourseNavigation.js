import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function TeacherCourseNavigation(){
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const courseId = params.get('courseId');

    return(
        <>
        <article className='side-nav'>
            <Nav variant="underline" className="flex-column teachernav">
                <Nav.Link className ="sidebar" eventKey="/viewCourseTeacher" onClick={() => routeChange(`/viewCourseTeacher?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`)}>View Course</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherAssignment" onClick={() => routeChange(`/teacherAssignments?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`)}>Assignments</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/teacherQuizes" onClick={()=>routeChange('/teacherQuizes')} >Quizzes</Nav.Link>
                <Nav.Link className ="sidebar" eventKey="/viewStudents" onClick={() => routeChange(`/viewStudents?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`)}>Students</Nav.Link>
            </Nav>
        </article>
        </>
    )
}
export default TeacherCourseNavigation;