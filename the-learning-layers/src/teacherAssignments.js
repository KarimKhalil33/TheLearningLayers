import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import dark from './images/1.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 import TeacherMenu from './TeacherMenu';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import AppFooter from './appFooter';
import InputGroup from 'react-bootstrap/InputGroup';
import TeacherCourseNavigation from './teacherCourseNavigation';

function TeacherAssignments(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Access query parameters from window.location.search
    const params = new URLSearchParams(window.location.search);
    const courseName = params.get('name');
    const courseId = params.get('courseId');

    const course = `${courseName} ${courseId}`;

    TeacherCourseNavigation( courseName, courseId );

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    // State hook for the file
    const [file, setFile] = useState(null);
    
    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('course', course);
        formData.append('weight', weight);
        formData.append('description', description);
        formData.append('startDate', startDate);
        formData.append('dueDate', dueDate);
        formData.append('file', file); // Append the file

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            try {
                const fetchURL = `http://localhost:4000/api/teacherRoute/teacherAssignments?courseId=${encodeURIComponent(courseId)}&name=${encodeURIComponent(name)}`;
                
                const response = await fetch(fetchURL, {
                method: 'POST',
                body: formData, // Send formData
                });

                console.log(response);
                if (response) {
                console.log("Response made");
                }

                if (response.status === 200) {
                console.log('Assignment successfully created');
        
                } else {
                const responseData = await response.json();
        
                if (responseData.status === 'FAILED') {
                    // Display an error message to the user
                    alert(responseData.message);
                } else {
                    console.error('Error creating assignment', response.statusText);
                }
                }
            } catch (error) {
                console.error('Error creating assignment', error.message);
            }
        } setValidated(true);
    };

    return(
        <>
             <TeacherMenu></TeacherMenu>
             <TeacherCourseNavigation/>
            {/* A button opens a modal which allows the teacher to create an assignment */}
            <div className='newAssessments'>
                <p><Button variant="primary" onClick={handleShow}>
                    Create Assignment
                </Button></p>
                {/* Modal contains fields which teacher has to fill in order to create an account */}
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Assignment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={8}>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor='assignmentName'>Assignment Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Assignment Name" id='assignmentName' value={name} onChange={e => setName(e.target.value)} required />
                                        <Form.Control.Feedback type='invalid'>Please enter assignment name</Form.Control.Feedback>
                                    </Form.Group>
                                    {/* The teacher is required to name the assignemnt */}
                                </Col>
                                <Col>
                                    <Form.Label htmlFor='weight'>Weight</Form.Label> 
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        placeholder="Assignment Weight"
                                        aria-label="Asignment Weight"
                                        aria-describedby="basic-addon2"
                                        id='weight'
                                        required
                                        value={weight}
                                        onChange={e => setWeight(e.target.value)}
                                        />
                                        <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                {/* The teacher is able to describe the assignment */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label htmlFor='assignmentDescription'>Enter Assignment Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} id='assignmentDescription' required value={description} onChange={e => setDescription(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Row>
                                {/* If the assignment has any extra documents, the teacher is able to upload it here */}
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label htmlFor='uploadFile'>Upload Files</Form.Label>
                                    <Form.Control type="file" id='uploadFile' required onChange={e => setFile(e.target.files[0])}  />
                                </Form.Group>
                            </Row>
                            <Row>
                                {/* The teacher must set start and end dates for the assignment */}
                                <Col>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor='startDate'>Start Date</Form.Label>
                                        <Form.Control type="Date" id='startDate' required value={startDate} onChange={e => setStartDate(e.target.value)}/>
                                        <Form.Control.Feedback type='invalid'>Please enter a date</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-4">
                                        <Form.Label htmlFor='endDate'>End Date</Form.Label>
                                        <Form.Control type="Date" id='endDate' required value={dueDate} onChange={e => setDueDate(e.target.value)} />
                                        <Form.Control.Feedback type='invalid'>Please enter a date</Form.Control.Feedback>
                                    </Form.Group>
                            </Row>
                            <Button as="input" type="submit" value="Create Assignment" />
                        </Form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Button>Create Quiz</Button>
            </div>
            <article className='main'>
                {/* Yet to be filled out, this portion of the page displays all assignments for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
                <header>
                    <h1><strong>Assignments</strong></h1>
                </header>
                <Row className="existingAssignment">
                    Assignment Name
                    <div className='assignActions'>
                    <Button variant='danger'>Delete</Button>
                    <Button variant='success' onClick={()=>routeChange('/gradeAssignment')}>Grade</Button></div>
                </Row>
                <Row className="existingAssignment">
                    Assignment Name
                    <div className='assignActions'>
                    <Button variant='danger'>Delete</Button>
                    <Button variant='success'>Grade</Button></div>
                </Row>
            </article>
            
        </>
    );
    //this should show
}
export default TeacherAssignments;