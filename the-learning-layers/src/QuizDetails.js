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



  // const [quiz] = useState({
  //   id: quizId,
  //   title: 'Sample Quiz',
  //   questions: [
  //     {
  //       id: 'q1',
  //       text: 'What is the capital of France?',
  //       options: [
  //         { id: 'q1a1', text: 'Paris' },
  //         { id: 'q1a2', text: 'London' },
  //         { id: 'q1a3', text: 'Berlin' },
  //       ],
  //     },
  //     {
  //       id: 'q2',
  //       text: 'Who is the CEO of Tesla?',
  //       options: [
  //         { id: 'q2a1', text: 'Jeff Bezos' },
  //         { id: 'q2a2', text: 'Elon Musk' },
  //         { id: 'q2a3', text: 'Bill Gates' },
  //       ],
  //     },
  //   ],
  // });


  const [quiz, setQuiz] = useState({questions: []});
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    // Fetch quiz data from the backend API
    fetch(`http://localhost:4000/user/liveQuiz?id=${quizId}`)

      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }
        return response.json();
      })
      .then(data => {
        setQuiz(data);
      })
      .catch(error => {
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
    console.log('Submitting quiz:', answers);
    console.log(name);
    console.log(courseId);

    navigate(`/StudentQuizzes?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`); // Navigate back to quiz page
  };

  return (
    <>
    <StudentMenu></StudentMenu>
    <div className="quiz-details">
      <div className="title-area">
      <h1>{quiz.name}</h1>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
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
        <button type="submit" className="submit-quiz">Submit Quiz</button>
      </form>
    </div>
    </>
  );
}

export default QuizDetails;
