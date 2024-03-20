import React, { useState } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';

function PendingEnrollments() {
    const [enrollments, setEnrollments] = useState([
        { id: 1, studentName: 'John Doe', courseName: 'Introduction to Programming' },
        { id: 2, studentName: 'Jane Smith', courseName: 'Advanced Mathematics' },
        // Add more mock data as needed
    ]);

    const acceptEnrollment = (id) => {
        // Logic to accept enrollment
        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
        // Here you would also update the backend to reflect this change
    };

    const rejectEnrollment = (id) => {
        // Logic to reject enrollment
        setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
        // Update the backend accordingly
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-3">Pending Enrollments</h2>
            <ListGroup>
                {enrollments.map((enrollment) => (
                    <ListGroup.Item key={enrollment.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{enrollment.studentName}</strong> for <em>{enrollment.courseName}</em>
                        </div>
                        <div>
                            <Button variant="success" size="sm" onClick={() => acceptEnrollment(enrollment.id)} className="me-2">Accept</Button>
                            <Button variant="danger" size="sm" onClick={() => rejectEnrollment(enrollment.id)}>Reject</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default PendingEnrollments;
