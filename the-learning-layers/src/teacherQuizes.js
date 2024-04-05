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
import { useState } from 'react';
import AppFooter from './appFooter';
import InputGroup from 'react-bootstrap/InputGroup';
import TeacherCourseNavigation from './teacherCourseNavigation';
import { click } from '@testing-library/user-event/dist/click';

function TeacherQuizes()
{
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let countQues = 0;


const addQuestions = (e) => {
    countQues++;
    const quiz = document.getElementById('quiz');
    let questionHTML = '<div class="row"><div class="col-xs-8"><div class="form-group mb-6"><label for="Question'+countQues+'">Question'+countQues+'</label><input type="text" class="form-control" placeholder="Enter Question" id="Question'+countQues+'" required /><div class="invalid-feedback">Please enter Question</div></div></div><div id="options"><label for="Question'+countQues+'.1">Option1</label><input type="text" class="form-control" placeholder="Enter Option1" id="Question'+countQues+'option1" required /><div class="invalid-feedback">Please enter Option</div><label for="Question'+countQues+'.2">Option2</label><input type="text" class="form-control" placeholder="Enter Option2" id="Question'+countQues+'option2" required /><div class="invalid-feedback">Please enter Option</div><label for="Question'+countQues+'.3">Option3</label><input type="text" class="form-control" placeholder="Enter Option3" id="Question'+countQues+'option3" required /><div class="invalid-feedback">Please enter Option</div><label for="Question'+countQues+'.4">Option4</label><input type="text" class="form-control" placeholder="Enter Option4" id="Question'+countQues+'option4" required /><div class="invalid-feedback">Please enter Option</div></div></div></div></div>';
    
    // Create a new div element
    let newElement = document.createElement('div');
    // Set its innerHTML to your HTML string
    newElement.innerHTML = questionHTML;
    // Append the new element to quiz
    quiz.append(newElement);
}


    const handleSubmit = async (e) => {
        const formData = new FormData();}
    return(
        <>
            <TeacherMenu></TeacherMenu>
            <TeacherCourseNavigation></TeacherCourseNavigation>
            <div className='newAssessments'>
            <Button onClick={handleShow}>Create Quiz</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form id="quiz" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                                <Col xs={8}>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor='quizName'>Quiz Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Quiz Name" id='quizName' value={name} onChange={e => setName(e.target.value)} required />
                                        <Form.Control.Feedback type='invalid'>Please enter quiz name</Form.Control.Feedback>
                                    </Form.Group>
                                    {/* The teacher is required to name the quiz */}
                                </Col>
                        </Row>
                        <Row>
                                <Col xs={5}>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor='Ques'>Add Question</Form.Label>
                                        <Button id='Ques' name='Ques' onClick={addQuestions}  required >Add Question</Button>
                                    </Form.Group>
                                    {/* The teacher is required to name the quiz */}
                                </Col>
                        </Row>

                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
                <article className='main'>
                {/* Yet to be filled out, this portion of the page displays all assignments for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
                <header>
                    <h1><strong>Quizzes</strong></h1>
                </header>
                <Row className="existingAssignment">
                    Quiz Name
                    <div className='assignActions'>
                    <Button variant='danger'>Delete</Button>
                    <Button variant='success'>Grade</Button>
                    <Button variant='info'>Edit</Button></div>
                </Row>
                <Row className="existingAssignment">
                    Quiz Name
                    <div className='assignActions'>
                    <Button variant='danger'>Delete</Button>
                    <Button variant='success'>Grade</Button>
                    <Button variant='info'>Edit</Button></div>
                </Row>
            </article>
        </>
    );
}


export default TeacherQuizes;