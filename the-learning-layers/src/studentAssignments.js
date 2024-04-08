import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure you have the CSS file for styling
import StudentMenu from './StudentMenu';
import { Nav } from 'react-bootstrap';
function StudentAssignments() {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState([]);
    // Access query parameters from window.location.search
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const courseId = params.get('courseId');

    useEffect(() => {
        // Fetch assignments data from server or local storage
        fetchAssignments(name, courseId);
        // fetchGrades(name,courseId);
    }, []);

    const fetchAssignments = async (name, courseId) => {
        try {
            // Make fetch request to fetch assignments based on query parameters
            const response = await fetch(`http://localhost:4000/user/getAssignments?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
            const data = await response.json();
            setAssignments(data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    }

    // const fetchGrades=async(name,courseId)=>{
    //     try {
    //         // Make fetch request to fetch assignments based on query parameters
    //         const response = await fetch(`http://localhost:4000/user/getGrades?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
    //         const data = await response.json();
    //         setGrades(data);
    //     } catch (error) {
    //         console.error('Error fetching grades:', error);
    //     }
    // }

    const getStatusLabel = (assignment) => {
        if (assignment.status === "submitted") {
            return <span className="status submitted">Submitted</span>;
        } else if (assignment.status === "missing") {
            return <span className="status missing">Missing</span>;
        } else {
            return <span className="status grade">{assignment.grade}%</span>;
        }
    };

    const viewAssignment = (assignmentId) => {
        navigate(`/assignments/${assignmentId}`);
      };
    return (
        <>
            <StudentMenu />
            <article className='side-nav'>
                <Nav variant="underline" defaultActiveKey="/viewCourseStudent" className="flex-column ">
                    <Nav.Link className="sidebar" href='/viewCourseStudent'>View Course</Nav.Link>
                </Nav>
            </article>
            <div className="assignments-container">
                <div className="title-area">
                    <h1>Assignments</h1>
                </div>
                {assignments.length === 0 ? (
                    <div>No assignments</div>
                ) : (
                    <div className="assignments-grid">
                        {assignments.map((assignment, index) => (
                            <div className="assignment-card" key={index} onClick={() => viewAssignment(assignment._id)}>
                                <h2>{assignment.name}</h2>
                                <p>Due Date: {assignment.dueDate}</p>
                                {/* <p>Grade: {grades[index] ? grades[index].grade : 'Not graded'}</p> */}
                                {getStatusLabel(assignment) /*change to grades[index]*/}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    );
}

export default StudentAssignments;
