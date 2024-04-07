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
import {useEffect} from 'react';
import AppFooter from './appFooter';
import StudentMenu from './StudentMenu';

function ViewCourseStudent() {
    
    const [course, setCourse] = useState([]);
    useEffect(() => {
        // Access query parameters from window.location.search
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const courseId = params.get('courseId');

        // Now you can use `name` and `courseId` to fetch data from the database
        // For example, fetch courses based on the received parameters
        fetchCourses(name, courseId);
    }, []); // Effect runs only once when component mounts


    const fetchCourses = async (name, courseId) => {
        try {
            // Make fetch request to fetch courses based on query parameters
            const response = await fetch(`http://localhost:4000/api/adminRoute/viewCourseStudent?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
            const data = await response.json();
            console.log(data);
            setCourse(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return(
        <>
        <StudentMenu/>
        {/* sidebar for teachers to be able to work through the different pages of the course */}
        <article className='side-nav'>
            <Nav variant="underline" defaultActiveKey="/viewCourseStudent" className="flex-column ">
                <Nav.Link className ="sidebar" eventKey="/viewCourseStudent">View Course</Nav.Link>
                <Nav.Link  href="/StudentAssignments" className ="sidebar" eventKey="">Assignments</Nav.Link>
                <Nav.Link href="/Grades" className ="sidebar" eventKey="link-3">Grades</Nav.Link>
            </Nav>
        </article>
        <article className='upcoming'>
            {/*Section for teachers to be able to monitor upcoming assignments  */}
                <h3><strong>Upcoming</strong></h3>
                <ul>
                    <li><a href="">Assignment 1</a> <span className='assignDate'>Date</span></li>
                    <li><a href="">Assignment 2</a> <span className='assignDate'>Date</span></li>
                    <li><a href="">Assignment 3</a> <span className='assignDate'>Date</span></li>
                    <li><a href="">Assignment 4</a> <span className='assignDate'>Date</span></li>
                </ul>
        </article>
        <article className="main">
            <header>
            <h1><strong>{course.name} {course.courseId}</strong></h1>
                <h2>Course Description</h2>
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
            
        </article>
        </>
    )
}

export default ViewCourseStudent



