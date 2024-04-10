import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Update the CSS import as necessary
import StudentMenu from './StudentMenu';
import { Nav } from 'react-bootstrap';
function StudentQuizzes() {
  const navigate = useNavigate();
  // Access query parameters from window.location.search
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const courseId = params.get('courseId');

  // const quizzes = [
  //   {
  //     id: 'quiz1',
  //     title: 'Quiz 1',
  //     description: 'Test your knowledge of world geography!',
  //     grade: '85%',
  //     dueDate: '2023-12-31',
  //     status: 'Submitted',
  //   },
  //   {
  //       id: 'quiz2',
  //       title: 'Quiz 2',
  //       description: 'Test your knowledge of world geography!',
  //       grade: null,
  //       dueDate: '2023-12-31',
  //       status: 'Missing',
  //     },
  //     {
  //       id: 'quiz3',
  //       title: 'Quiz 3',
  //       description: 'Test your knowledge of world geography!',
  //       grade: null,
  //       dueDate: '2023-12-31',
  //       status: 'GradingPending',
  //     },
  //     {
  //       id: 'quiz4',
  //       title: 'Quiz 4',
  //       description: 'Test your knowledge of world geography!',
  //       grade: null,
  //       dueDate: '2023-12-31',
  //       status: 'GradingPending',
  //     },
  //     {
  //       id: 'quiz5',
  //       title: 'Quiz 5',
  //       description: 'Test your knowledge of world geography!',
  //       grade: '75%',
  //       dueDate: '2023-12-31',
  //       status: 'Submitted',
  //     },
  //   // Additional quizzes...
  // ];

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/user/quizzes?courseId=${encodeURIComponent(courseId)}&courseName=${encodeURIComponent(name)}`)
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
  }, [courseId, name]);

  const handleQuizSelection = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Submitted':
        return 'grade Submitted';
      case 'Pending':
        return 'grade GradingPending';
      case 'Missing':
        return 'grade Missing';
      default: 
        return 'In Progress';
    }
  };

  return (
    <> 
    <StudentMenu />
    <article className='side-nav'>
        <Nav variant="underline" defaultActiveKey="/viewCourseStudent" className="flex-column ">
            <Nav.Link className="sidebar" href={`/viewCourseStudent?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`}>View Course</Nav.Link> {/* add link here */ }
        </Nav>
    </article>
    <div className="quizzes-container">
      <div className="title-area">
            <h1>Quizzes</h1>
      </div>
      <div className="quizzes-list">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card" onClick={() => handleQuizSelection(quiz._id)}>
            <h2>{quiz.name}</h2>
            <p>{quiz.description}</p>
            <p className={getStatusClass(quiz.status)}>
              {quiz.status !== 'Missing' ? `Grade: ${quiz.grade || 'Pending'}` : 'Missed'}
            </p>
            <p className="due-date">Due Date: {quiz.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default StudentQuizzes;
