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
// import TeacherMenu from './TeacherMenu';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import AppFooter from './appFooter';
import InputGroup from 'react-bootstrap/InputGroup';
function TeacherAssignments(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            {/* <TeacherMenu></TeacherMenu> */}
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
                        <Form>
                            <Row>
                                <Col xs={8}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Assignment Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Assignment Name"  required />
                                        <Form.Control.Feedback type='invalid'>Please enter assignment name</Form.Control.Feedback>
                                    </Form.Group>
                                    {/* The teacher is required to name the assignemnt */}
                                </Col>
                                <Col>
                                    <Form.Label>Weight</Form.Label> 
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                        placeholder="Assignment Weight"
                                        aria-label="Asignment Weight"
                                        aria-describedby="basic-addon2"
                                        />
                                        <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                {/* The teacher is able to describe the assignment */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Enter Assignment Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Row>
                            <Row>
                                {/* If the assignment has any extra documents, the teacher is able to upload it here */}
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Label>Upload Files</Form.Label>
                                    <Form.Control type="file" multiple />
                                </Form.Group>
                            </Row>
                            <Row>
                                {/* The teacher must set start and end dates for the assignment */}
                                <Col>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control type="Date"  required />
                                        <Form.Control.Feedback type='invalid'>Please enter a date</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Form.Group className="mb-4">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control type="Date" required />
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
            {/* <div className="assignment">
                <h5>Assignment Name</h5>
                <h6></h6>
            </div> */}
            <article className='main'>
                <header>
                    <h1><strong>Assignments</strong></h1>
                </header>
                <div className="existingAssignment">
                    <p>Assignment Name</p>
                    <Button variant='danger'>Delete Assignment</Button>
                    <Button variant='success'>Grade Assignments</Button>
                    <Button variant='info'>Edit Assignment</Button>
                </div>
            </article>
            
        </>
    );
}
export default TeacherAssignments;