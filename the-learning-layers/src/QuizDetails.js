import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css'; // Ensure the CSS file is linked
import StudentMenu from './StudentMenu';
import { Nav } from 'react-bootstrap';
function QuizDetails() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [quiz] = useState({
    id: quizId,
    title: 'Sample Quiz',
    questions: [
      {
        id: 'q1',
        text: 'What is the capital of France?',
        options: [
          { id: 'q1a1', text: 'Paris' },
          { id: 'q1a2', text: 'London' },
          { id: 'q1a3', text: 'Berlin' },
        ],
      },
      {
        id: 'q2',
        text: 'Who is the CEO of Tesla?',
        options: [
          { id: 'q2a1', text: 'Jeff Bezos' },
          { id: 'q2a2', text: 'Elon Musk' },
          { id: 'q2a3', text: 'Bill Gates' },
        ],
      },
    ],
  });

  const [answers, setAnswers] = useState({});

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = () => {
    console.log('Submitting quiz:', answers);
    navigate('/StudentQuizzes'); // Navigate to results page
  };

  return (
    <>
    <StudentMenu></StudentMenu>
    <div className="quiz-details">
      <div className="title-area">
      <h1>{quiz.title}</h1>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="question">
            <div className="question-header">
              <span className="question-number">Question {index + 1}</span>
              <h3 className="question-text">{question.text}</h3>
            </div>
            <div className="options">
              {question.options.map((option) => (
                <label key={option.id} className="option">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    onChange={() => handleOptionChange(question.id, option.id)}
                    checked={answers[question.id] === option.id}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-quiz">Submit Quiz</button>
      </form>
    </div>
    </>
  );
}

export default QuizDetails;
