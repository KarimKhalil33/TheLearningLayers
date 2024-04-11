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
  const course = name + " " + courseId;
  const username = JSON.parse(sessionStorage.getItem('authenticationId'));
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
    navigate(`/quiz/${quizId}?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
  };

  const getStatusClass = (status) => {
    console.log(status);
    switch (status) {
      case 'Submitted':
        return 'Submitted';
      case 'In Review':
        return 'In Review';
      case 'Incomplete':
        return 'Incomplete';
      default: 
        return 'In Progress';
    }
  };

  const getQuizDetails = async (quizId ) => {
    try {
        const response = await fetch(`http://localhost:4000/user/getStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quizId, username, course }) // Set the status to 'Graded'
        });
        if (response.ok) {
            console.log('Submission updated successfully');
            const {status, comments } = await response.json();
            return { status, comments };
        } else {
            throw new Error('Failed to update submission');
        }
    } catch (error) {
        console.error('Error updating submission:', error);
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
              {getQuizDetails(quiz._id).status !== 'Missing' ? `Grade: ${quiz.grade || 'Pending'}` : 'Incomplete'}
            </p>
            <p className="due-date">Due Date: {quiz.dueDate}</p>
            <p className="due-date">Comments: {getQuizDetails(quiz._id).comments}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default StudentQuizzes;
