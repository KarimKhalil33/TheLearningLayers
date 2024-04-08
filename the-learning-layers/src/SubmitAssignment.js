import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentMenu from './StudentMenu';
function SubmitAssignment() {
  const { assignmentId } = useParams(); // Get assignment ID from URL
  const [submission, setSubmission] = useState('');
  const navigate = useNavigate();

  const handleSubmission = (event) => {
    event.preventDefault();
    // Here you would normally handle the submission e.g. via an API call
    console.log(`Submitting for assignment ${assignmentId}: `, submission);
    // After submission, you might navigate to a confirmation page or back to the assignment list
    navigate('/assignment-submitted'); // or another appropriate route
  };

  return (
      <>
      <StudentMenu></StudentMenu>
    <div className="submit-assignment-container">
      <h2>Submit Assignment</h2>
      <form onSubmit={handleSubmission}>
        <div className="form-group">
          <label htmlFor="assignmentText">Your Submission:</label>
          <textarea
            id="assignmentText"
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder="Type your assignment here..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignmentFile">Or upload a file:</label>
          <input type="file" id="assignmentFile" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}

export default SubmitAssignment;
