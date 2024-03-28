import React, { useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

function PendingEnrollments() {
    const [enrollments, setEnrollments] = useState([
        { studentNum: 1, studentName: 'John Doe', title: 'Introduction to Programming' },
        { studentNum: 2, studentName: 'Jane Smith', title: 'Advanced Mathematics' },
        // Add more mock data as needed
    ]);

    const acceptEnrollment = async (key,studentNum, title) => {
        try {


            // Make a POST request to accept enrollment
            const serverURL = 'http://localhost:4000';
            const endpoint = '/api/enrolmentRoute/accept';
            const fetchURL = `${serverURL}${endpoint}`;

            await fetch(fetchURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({key,studentNum,title})
            });

            // Update state to remove the accepted enrollment
            setEnrollments(enrollments.filter(enrollment => enrollment._id !== key));

        } catch (error) {
            console.error('Error accepting enrollment:', error);
        }

        setEnrollments(enrollments.filter(enrollment => enrollment.studentNum !== studentNum));
    };




    const rejectEnrollment = async (key,studentNum, title) => {
        try {
            // Make a POST request to reject enrollment

            await fetch(`http://localhost:4000/api/enrollmentRoute/reject/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({key,studentNum, title })
            });

            // Update state to remove the rejected enrollment
            setEnrollments(enrollments.filter(enrollment => enrollment._id !== key));

        } catch (error) {
            console.error('Error rejecting enrollment:', error);
        }

        setEnrollments(enrollments.filter(enrollment => enrollment.studentNum !== studentNum));
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
                            <Button variant="success" size="sm" onClick={() => acceptEnrollment(enrollment._id ,enrollment.studentNum, enrollment.title)} className="me-2">Accept</Button>
                            <Button variant="danger" size="sm" onClick={() => rejectEnrollment(enrollment._id, enrollment.studentNum, enrollment.title)}>Reject</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default PendingEnrollments;