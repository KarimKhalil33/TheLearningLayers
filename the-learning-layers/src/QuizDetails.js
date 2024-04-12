import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.css';
import StudentMenu from './StudentMenu';

function QuizDetails() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({ questions: [] });
  const [answers, setAnswers] = useState({});
  const [gradingInProgress, setGradingInProgress] = useState(false);
  const [gradedScore, setGradedScore] = useState(null);
  const [feedback, setFeedback] = useState();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const courseId = params.get('courseId');
    // Get the username from session storage
    const username = JSON.parse(sessionStorage.getItem('authenticationId'));

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
        console.log(data);
        try {
          
          // Find the JSON object within the response text
          const startIndex = data.indexOf('{');
          const endIndex = data.lastIndexOf('}');
          const jsonData = data.substring(startIndex, endIndex+1);
    
          // Parse the JSON object
          const { "Total Grade": totalGrade, "Feedback": feedback } = JSON.parse(jsonData);
    
          // Update state with graded score and feedback
          setGradedScore(totalGrade);
          setFeedback(feedback);
          setGradingInProgress(false);
          // Save the graded quiz
          saveGradedQuiz(totalGrade);
        } catch (error) {
          console.error('Error parsing JSON response:', error);
          setGradingInProgress(false);
        }
      })
      .catch((error) => {
        console.error('Error grading quiz:', error);
        setGradingInProgress(false);
      });
  };

  // Function to save the graded quiz
const saveGradedQuiz = (totalGrade) => {


  // Make a separate request to save the graded quiz
  fetch('http://localhost:4000/user/saveGradedQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      courseId,
      name,
      quizId,
      totalGrade,
      answers
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to save graded quiz');
      }
      console.log('Graded quiz saved successfully');
    })
    .catch((error) => {
      console.error('Error saving graded quiz:', error);
    });
};

  return (
    <>
      <StudentMenu />
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
          <button type="submit" className="submit-quiz" disabled={gradingInProgress}>
            {gradingInProgress ? 'Grading...' : 'Submit Quiz'}
          </button>
        </form>
        {gradedScore !== null && (
          <div className="graded-score">
            <p>Results: Total Grade: {gradedScore}</p>
            <p>Feedback: {feedback}</p>
            <p> Your Instructor will review and finalize your Results</p>
          </div>
        )}
      </div>
    </>
  );
}

export default QuizDetails;