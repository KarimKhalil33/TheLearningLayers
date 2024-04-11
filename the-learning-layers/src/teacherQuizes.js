import React, { useState, useEffect } from 'react';
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
import TeacherCourseNavigation from './teacherCourseNavigation';

function TeacherQuizes() {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [quizzes,setQuizzes] = useState([]);;


       // Access query parameters from window.location.search
   const params = new URLSearchParams(window.location.search);
   const courseName = params.get('name');
   const courseId = params.get('courseId');

    let countQues = 0;

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
//handle changes to question fields dynamically
    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            question: value
        };
        setQuestions(updatedQuestions);
    };
//handle changes to option fields dynamically
    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };
//add another question field
    const addQuestion = () => {
        countQues++;
        setQuestions([...questions, { question: '', options: ['', '', '', ''] }]);
    };
//set quizzes for course
    useEffect(() => {
        fetch(`http://localhost:4000/api/teacherRoute/quizzes?courseId=${encodeURIComponent(courseId)}&courseName=${encodeURIComponent(courseName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setQuizzes(data);
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
            });
    }, []);
    

    //function to delete a quiz using quiz id
    const deleteQuiz = async (id ) => {
        try {
    
            await fetch(`http://localhost:4000/api/teacherRoute/delete`, {
                method: 'POST',    
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });
    
            //update the displayed quizzes
            const updatedQuizzes = quizzes.filter(quiz => quiz._id !== id);
            setQuizzes(updatedQuizzes);
        } catch (error) {
            console.error('Error rejecting enrollment:', error);
        }
    };

//this funtion deals with form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        //Form should not submit without a name
        if (questions.length === 0) {
            alert('Please add at least one question before submitting the quiz.');
            return;
        }
   //Form should not submit without questions
        if (questions.length === 0) {
            alert('Please add at least one question before submitting the quiz.');
            return;
        }
    //All field should be filled
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        //Send a post request to database with form data
        try {
            const response = await fetch('http://localhost:4000/api/teacherRoute/quizzes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    courseName: courseName,
                    courseId: courseId,
                    questions: questions
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add quiz');
            }

            const data = await response.json();
            console.log('Quiz added successfully:', data);

     // Merge the newly added quiz with the existing quizzes
        setQuizzes(prevQuizzes => [...prevQuizzes, data]);

            handleClose();
        } catch (error) {
            console.error('Error adding quiz:', error);
        }
    };

    return (
        <>
            <TeacherMenu />
            <TeacherCourseNavigation />
                <div className='newAssessment'>
                <Button onClick={handleShow}>Create Quiz</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Quiz</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor='quizName'>Quiz Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Quiz Name" id='quizName' value={name} onChange={e => setName(e.target.value)} required />
                                <Form.Control.Feedback type='invalid'>Please enter quiz name</Form.Control.Feedback>
                            </Form.Group>
                            {questions.map((question, index) => (
                                <div key={index}>
                                    <Form.Group>
                                        <Form.Label htmlFor={`question-${index}`}>Question {index + 1}</Form.Label>
                                        <Form.Control type="text" id={`question-${index}`} value={question.question} onChange={(e) => handleQuestionChange(index, e.target.value)} required />
                                        <Form.Control.Feedback type='invalid'>Please enter a question</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex}>
                                                <Form.Label htmlFor={`option-${index}-${optionIndex}`}>Option {optionIndex + 1}</Form.Label>
                                                <Form.Control type="text" id={`option-${index}-${optionIndex}`} value={option} onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)} required />
                                                <Form.Control.Feedback type='invalid'>Please enter an option</Form.Control.Feedback>
                                            </div>
                                        ))}
                                    </Form.Group>
                                </div>
                            ))}
                            <Button onClick={addQuestion}>Add Question</Button>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                </div>
            <Container className='main'>
                <header>
                    <h1><strong>Quizzes</strong></h1>
                </header>
                {quizzes.map((quiz, index) => (
                    <Row key={index} className="existingAssignment">
                        {quiz.name}
                        <div className='assignActions'>
                            <Button variant='danger' onClick={() => deleteQuiz(quiz._id)}>Delete</Button>
                            <Button variant='success' onClick={() => routeChange(`/gradeQuiz?courseId=${encodeURIComponent(courseId)}&name=${encodeURIComponent(courseName)}`)}>Grade</Button>
                        </div>
                    </Row>
                ))}
            </Container>
        </>
    );
}

export default TeacherQuizes;
