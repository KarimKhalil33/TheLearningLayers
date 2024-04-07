import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Update this to your stylesheet
import StudentMenu from './StudentMenu';
function AssignmentDetails() {
  const navigate = useNavigate();

  // Simulate a function to navigate to the submission page
  const goToSubmissionPage = () => {
    navigate('/SubmitAssignment');
  };

  // Dummy data for assignment details
  const assignmentDetails = {
    title: "M5: Final report and delivery",
    dueDate: "Friday by 11:59 p.m.",
    points: 13,
    submitting: "a file upload",
    description: `For your final submission, you will need to produce a video walk-through and overview of your project as well as complete a report detailing the following items. Please make it clear in your responses which item you are addressing.\n\nVideo Walkthrough (10%)\n\nFor your final deliverable, you will need to produce a short video overview of your product, walking through the features implemented...`
    // ... include the rest of your assignment text here
  };

  return (
      <>
      <StudentMenu></StudentMenu>
    <div className="assignment-detail">
      <header className="assignment-header">
        <h1>{assignmentDetails.title}</h1>
        <button className="start-assignment" onClick={goToSubmissionPage}>Start Assignment</button>
      </header>
      <div className="assignment-meta">
        <span>Due {assignmentDetails.dueDate}</span>
        <span>Points {assignmentDetails.points}</span>
        <span>Submitting {assignmentDetails.submitting}</span>
      </div>
      <article className="assignment-description">
        {assignmentDetails.description}
      </article>
    </div>
    </>
  );
}

export default AssignmentDetails;
