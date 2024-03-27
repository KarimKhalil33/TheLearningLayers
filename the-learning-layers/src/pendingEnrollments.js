import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

function PendingEnrollments() {
    const [enrollments, setEnrollments] = useState([]);

    // Fetch enrollments when component mounts
    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            // Make a GET request to fetch pending enrollments
            const response = await fetch('http://localhost:4000/api/enrollmentRoute/pending');
            const data = await response.json();
            setEnrollments(data); // Update state with fetched enrollments
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };

    const acceptEnrollment = async (studentNum, title) => {
        try {
            // Make a POST request to accept enrollment
            await fetch('http://localhost:4000/api/enrollmentRoute/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studentNum, title })
            });

            // Update state to remove the accepted enrollment
            setEnrollments(enrollments.filter(enrollment => enrollment.studentNum !== studentNum));
        } catch (error) {
            console.error('Error accepting enrollment:', error);
        }
    };

    const rejectEnrollment = async (studentNum) => {
        try {
            // Make a POST request to reject enrollment
            await fetch(`http://localhost:4000/api/enrollmentRoute/reject/${studentNum}`, {
                method: 'POST'
            });

            // Update state to remove the rejected enrollment
            setEnrollments(enrollments.filter(enrollment => enrollment.studentNum !== studentNum));
        } catch (error) {
            console.error('Error rejecting enrollment:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-3">Pending Enrollments</h2>
            <ListGroup>
                {enrollments.map((enrollment) => (
                    <ListGroup.Item key={enrollment.studentNum} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{enrollment.studentfisrtName} {enrollment.studentlastName}</strong> for <em>{enrollment.title}</em>
                        </div>
                        <div>
                            <Button variant="success" size="sm" onClick={() => acceptEnrollment(enrollment.studentNum, enrollment.title)} className="me-2">Accept</Button>
                            <Button variant="danger" size="sm" onClick={() => rejectEnrollment(enrollment.studentNum)}>Reject</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default PendingEnrollments;

