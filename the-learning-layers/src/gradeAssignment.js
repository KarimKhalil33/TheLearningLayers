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
import { useState, useEffect } from 'react';
import AppFooter from './appFooter';
import InputGroup from 'react-bootstrap/InputGroup';
import TeacherCourseNavigation from './teacherCourseNavigation';
import Accordion from 'react-bootstrap/Accordion';
function GradeAssignment() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Access query parameters from window.location.search
    const params = new URLSearchParams(window.location.search);
    const assignmentId = params.get('assignmentId');
    const name = params.get('name');
    const courseId = params.get('courseId');
    const courseName = name + " " + courseId;

    const [assignmentName, setAssignmentName] = useState("");
    const [students, setStudents] = useState([]);
    TeacherCourseNavigation("/teacherAssignment");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch assignment details
                const assignmentResponse = await fetch(`http://localhost:4000/api/teacherRoute/getAssignmentDetails?assignmentId=${encodeURIComponent(assignmentId)}`);
                const assignmentData = await assignmentResponse.json();
                setAssignmentName(assignmentData);

                // Fetch submissions for the assignment
                const submissionsResponse = await fetch(`http://localhost:4000/api/teacherRoute/getSubmissions?assignmentId=${encodeURIComponent(assignmentId)}`);
                const submissionsData = await submissionsResponse.json();
                console.log(submissionsData)
                setStudents(submissionsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [assignmentId]);

    const handleGradeSubmit = async (studentNum, grade, comment) => {
        console.log(studentNum+" "+grade+" "+comment);
        try {
            const response = await fetch('http://localhost:4000/api/teacherRoute/storeGrades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course: courseName,
                    assignmentName: assignmentName,
                        studentNum: studentNum,
                        gradeValue: grade,
                        comment: comment
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error submitting grades:', error);
        }
    };
    // async () => (

    // )
    return (
        <>
            <TeacherMenu></TeacherMenu>
            <TeacherCourseNavigation setkey="/teacherAssignment"></TeacherCourseNavigation>
            <article className='main'>
                {/* Yet to be filled out, this portion of the page displays all assignments for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
                <header>
                    <h1><strong>{assignmentName}</strong></h1>
                </header>
                <div className='assignActions'>
                    {students.message ? (
                        <p>No submission</p>
                    ) : (
                        students.map((student, index) => (
                            <Accordion key={index}>
                                <Accordion.Item eventKey={index} className='students'>
                                    <Accordion.Header>Student Number: {student.studentNumber}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='submitted-assessment'>
                                            {student.content}
                                        </div>
                                        <span>
                                            File: {student.file && (
                                                <a href={`http://localhost:4000/files/${student.file}`} download>
                                                    {student.file.split('/').pop()}
                                                </a>
                                            )}

                                        </span>
                                        <Form onSubmit={(e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.target);
                                            const grade = formData.get('grade');
                                            const comment = formData.get('comment');
                                            handleGradeSubmit(student.studentNumber, grade, comment);
                                        }}>
                                            <Row className="align-items-center">
                                                <Col xs="auto">
                                                    <InputGroup>
                                                        <InputGroup.Text>Comments</InputGroup.Text>
                                                        <Form.Control as="textarea" name="comment" aria-label="Comments" />
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                                        Grade
                                                    </Form.Label>
                                                    <InputGroup className="mb-2">
                                                        <Form.Control name="grade" id="inlineFormInputGroup" placeholder="Grade" />
                                                        <InputGroup.Text>%</InputGroup.Text>
                                                    </InputGroup>
                                                </Col>
                                                <Col xs="auto">
                                                    <Button type="submit" className="mb-2">
                                                        Submit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))
                    )}
                </div>


            </article>

        </>
    );
}
export default GradeAssignment;