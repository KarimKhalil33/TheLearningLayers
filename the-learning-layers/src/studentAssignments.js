import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure you have the CSS file for styling
import StudentMenu from './StudentMenu';

function StudentAssignments() {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([
        // Example assignments data
        { id: 1, title: "Assignment 1", dueDate: "2023-09-15", status: "submitted", grade: 80 },
        { id: 2, title: "Assignment 2", dueDate: "2023-09-22", status: "missing", grade: null },
        { id: 3, title: "Assignment 3", dueDate: "2023-09-29", status: "submitted", grade: 90 },
        { id: 4, title: "Assignment 4", dueDate: "2023-10-06", status: "submitted", grade: null },
        { id: 5, title: "Assignment 5", dueDate: "2023-10-06", status: "submitted", grade: 95 },
        { id: 6, title: "Assignment 6", dueDate: "2023-10-06", status: "missing", grade: null },
    ]);

    useEffect(() => {
        // Fetch assignments data from server or local storage
    }, []);

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
        <StudentMenu/>
        <div className="assignments-container">
            <div className="title-area">
                <h1>Assignments</h1>
            </div>
            <div className="assignments-grid">
                {assignments.map(assignment => (
                    <div className="assignment-card" key={assignment.id} onClick={() => viewAssignment(assignment.id)}>
                        <h2>{assignment.title}</h2>
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
