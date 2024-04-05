import React, { useState, useEffect } from 'react'; 
import { Container, ListGroup, Button } from 'react-bootstrap';

function PendingEnrollments() {
    const [enrollments, setEnrollments] = useState({});

    useEffect(() => {

        const fetchEnrollments = async () => {
            try {
                // Make a GET request to fetch pending enrollments
                const response = await fetch('http://localhost:4000/api/enrollmentRoute/pending');
                const data = await response.json();
                // Convert array to object with _id as key
                const enrollmentsObject = {};
                data.forEach(enrollment => {
                    enrollmentsObject[enrollment._id] = enrollment;
                });
                setEnrollments(enrollmentsObject); // Update state with fetched enrollments
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            }
        };

        fetchEnrollments();
    }, []);

    const acceptEnrollment = async (id, studentNum, title) => {
        try {
            // Make a POST request to accept enrollment
            await fetch('http://localhost:4000/api/enrollmentRoute/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, studentNum, title})
            });

            // Update state to remove the accepted enrollment
            const updatedEnrollments = { ...enrollments };
            delete updatedEnrollments[id];
            setEnrollments(updatedEnrollments);
        } catch (error) {
            console.error('Error accepting enrollment:', error);
        }
    };

    const rejectEnrollment = async (id, title, studentNum) => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('studentNum', studentNum);

            console.log(formData);
    
            await fetch(`http://localhost:4000/api/enrollmentRoute/reject`, {
                method: 'POST', 
                body: formData
            });
    
            const updatedEnrollments = { ...enrollments };
            delete updatedEnrollments[id];
            setEnrollments(updatedEnrollments);
        } catch (error) {
            console.error('Error rejecting enrollment:', error);
        }
    };
    

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-3">Pending Enrollments</h2>
            <ListGroup>
                {Object.keys(enrollments).map(id => {
                    const enrollment = enrollments[id];
                    return (
                        <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{enrollment.studentfisrtName} {enrollment.studentlastName}</strong> for <em>{enrollment.title}</em>
                            </div>
                            <div>
                                <Button variant="success" size="sm" onClick={() => acceptEnrollment(id, enrollment.studentNum, enrollment.title)} className="me-2">Accept</Button>
                                <Button variant="danger" size="sm" onClick={() => rejectEnrollment(id, enrollment.studentNum, enrollment.title)}>Reject</Button>
                            </div>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </Container>
    );
}

export default PendingEnrollments;

