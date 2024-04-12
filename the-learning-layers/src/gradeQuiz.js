import React, { useState, useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import TeacherCourseNavigation from './teacherCourseNavigation';
import Accordion from 'react-bootstrap/Accordion';

function GradeQuiz() {
     // Access query parameters from window.location.search
     const params = new URLSearchParams(window.location.search);
    const name=params.get('name');
    const courseId=params.get('courseId');
    const quizId = params.get('quizId');

    const navigate = useNavigate();

    const routeChange = (path) => {
        navigate(path);
    };


    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const quizResponse = await fetch(`http://localhost:4000/user/getQuizDetails?courseId=${encodeURIComponent(courseId)}&courseName=${encodeURIComponent(name)}&quizId=${encodeURIComponent(quizId)}`);
                const quizData = await quizResponse.json();
                setGrades(quizData); // Corrected to setGrades
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchQuizDetails();
    }, [courseId, name, quizId]); // Added dependencies to the useEffect hook

    return(
        <>
             <TeacherMenu></TeacherMenu>
             <TeacherCourseNavigation setkey="/teacherAssignment"></TeacherCourseNavigation> 
             <article className='main'>
                {/* Yet to be filled out, this portion of the page displays all assignments for the course and gives the teacher the option to grade, view/Edit, or delete the assignment from the course*/}
                <header>
                    <h1><strong>Quizzes</strong></h1>
                </header>
                    <div className='assignActions'>
                    {grades.map((grade) => (
                    <Accordion>
                        <Accordion.Item eventKey="0" className='students'>
                            <Accordion.Header>{grade.studentName} ~ {grade.studentNumber}</Accordion.Header>
                            <Accordion.Body>
                            <div className='submitted-assessment'>
                                {grade.answers}
                            </div>
                            <Form>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                <InputGroup>
                                    <InputGroup.Text>Comments</InputGroup.Text>
                                    <Form.Control as="textarea" aria-label="Comments" />
                                </InputGroup>
                                </Col>
                                <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                {grade.grade}
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    
                                    <Form.Control id="inlineFormInputGroup" placeholder={grade.grade} />
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
                        </Accordion>))}
                    </div>
            </article>   
        </>
    );
}
export default GradeQuiz;