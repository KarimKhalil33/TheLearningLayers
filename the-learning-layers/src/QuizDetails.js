import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css'; // Ensure the CSS file is linked
import StudentMenu from './StudentMenu';
import { Nav } from 'react-bootstrap';

function QuizDetails() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const courseId = params.get('courseId');
  const username = JSON.parse(sessionStorage.getItem('authenticationId'));

  const [quiz, setQuiz] = useState({ questions: [] });
  const [answers, setAnswers] = useState({});
  const [gradingInProgress, setGradingInProgress] = useState(false);
  const [gradedScore, setGradedScore] = useState(null);

  useEffect(() => {
    // Fetch quiz data from the backend API
    fetch(`http://localhost:4000/user/liveQuiz?id=${quizId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, [quizId]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = () => {
    // Grading the quiz using ChatGPT API
    setGradingInProgress(true);

    fetch('http://localhost:4000/api/chat/gradeQuiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId,
        username,
        name,
        courseId,
        questions: quiz.questions,
        answers,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to grade quiz');
        }
        return response.json();
      })
      .then((data) => {

        // Update state with graded score
        setGradedScore(data);
        setGradingInProgress(false);
      })
      .catch((error) => {
        console.error('Error grading quiz:', error);
        setGradingInProgress(false);
      });
  };

  return (
    <>
      <StudentMenu></StudentMenu>
      <div className="quiz-details">
        <div className="title-area">
          <h1>{quiz.name}</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="question">
              <div className="question-header">
                <span className="question-number">Question {index + 1}</span>
                <h3 className="question-text">{question.question}</h3>
              </div>
              <div className="options">
                {question.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="option">
                    <input
                      type="radio"
                      name={`question_${index}`}
                      value={option}
                      onChange={() => handleOptionChange(question.question, option)}
                      checked={answers[question.question] === option}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="submit-quiz">
            {gradingInProgress ? 'Grading...' : 'Submit Quiz'}
          </button>
        </form>
        {gradedScore !== null && (
          <div className="graded-score">Results: {gradedScore} </div>
        )}
      </div>
    </>
  );
}

export default QuizDetails;
