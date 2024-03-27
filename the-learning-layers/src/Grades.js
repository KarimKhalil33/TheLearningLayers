import React, { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import StudentMenu from './StudentMenu';
import AppFooter from './appFooter';

function Grades() {
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchGrades = async () => {
            const studentId = JSON.parse(sessionStorage.getItem('authenticationId')); // Assuming this is how we get the student ID
            const serverURL = 'http://localhost:4000';

            try {
                const response = await fetch(`${serverURL}/grades/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setGrades(data);
                } else {
                    throw new Error('Failed to fetch grades');
                }
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };

        fetchGrades();
    }, []);

    return (
        <>
            <StudentMenu />
            <Container className="my-5">
                <h1>My Grades</h1>
                {grades.length > 0 ? (
                    <ul>
                        {grades.map((grade, index) => (
                            <li key={index}>
                                <strong>{grade.assignmentName}:</strong> {grade.score ? `${grade.score}/100` : 'Pending'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No grades available.</p>
                )}
            </Container>
            <AppFooter />
        </>
    );
}

export default Grades;
