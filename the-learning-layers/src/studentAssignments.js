import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure you have the CSS file for styling
import StudentMenu from './StudentMenu';

function StudentAssignments() {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([
        // Example assignments data
        { id: 1, name: "Assignment 1", dueDate: "2023-09-15", status: "submitted", grade: 80 },
        { id: 2, name: "Assignment 2", dueDate: "2023-09-22", status: "missing", grade: null },
        { id: 3, name: "Assignment 3", dueDate: "2023-09-29", status: "submitted", grade: 90 },
        { id: 4, name: "Assignment 4", dueDate: "2023-10-06", status: "submitted", grade: null },
        { id: 5, name: "Assignment 5", dueDate: "2023-10-06", status: "submitted", grade: 95 },
        { id: 6, name: "Assignment 6", dueDate: "2023-10-06", status: "missing", grade: null },
    ]);
    // Access query parameters from window.location.search
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const courseId = params.get('courseId');
    // useEffect(async () => {
    //     // Fetch assignments data from server or local storage
    //     try {
    //         // Make fetch request to fetch assignments based on query parameters
    //         const response = await fetch(`http://localhost:4000/user/getAssignments?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
    //         const data = await response.json();
    //         setAssignments(data);
    //     } catch (error) {
    //         console.error('Error fetching assignments:', error);
    //     }
    // }, []);

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
        navigate(`/assignment/${assignmentId}`);
    };

    return (
        <>
            <StudentMenu />
            <div className="assignments-container">
                <div className="title-area">
                    <h1>Assignments</h1>
                </div>
                <div className="assignments-grid">
                    {assignments.map(assignment => (
                        <div className="assignment-card" key={assignment.id} onClick={() => viewAssignment(assignment.id)}>
                            <h2>{assignment.name}</h2>
                            <p>Due Date: {assignment.dueDate}</p>
                            <p>Grade: {assignment.grade}</p>
                            {getStatusLabel(assignment)}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default StudentAssignments;
