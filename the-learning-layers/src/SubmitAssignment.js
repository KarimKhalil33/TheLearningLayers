import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentMenu from './StudentMenu';
function SubmitAssignment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assignmentId = queryParams.get('assignmentId');
  const courseName=queryParams.get('name');
  const courseId=queryParams.get('courseId');
  const [submission, setSubmission] = useState('');
  const [studentNumber,setStudentNumber]=useState(1);
  const [submissionDate,setSubmissionDate]=useState(1);
  const submissionType="Text box";
  const [content,setContent]=useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getStudentInfo = async () => {
      try { 
        const authenticationId=sessionStorage.getItem("authenticationId").replace(/"/g, "");
        const response=await fetch("http://localhost:4000/user/studentNum",{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authenticationId,
          },
        });
        const data = await response.json();
        setStudentNumber(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    getStudentInfo();
  })
  const handleSubmission = async (event) => {
    event.preventDefault();
    // Here you would normally handle the submission e.g. via an API call
    // console.log(`Submitting for assignment ${assignmentId}: `, submission);
    // After submission, you might navigate to a confirmation page or back to the assignment list
    // navigate('/assignment-submitted'); // or another appropriate route

    try {
      const response = await fetch(`http://localhost:4000/user/submitAssignment?assignmentId=${encodeURIComponent(assignmentId)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentNumber,//we get the username from the frontend and same for other fields
          submissionDate,
          submissionType,
          content,
        }),
      });
      if (response.ok) {
        // If the response is successful
        const responseData = await response.json(); // Parsing the JSON response
        alert("Assignment submitted");
        navigate(`/StudentAssignments?name=${encodeURIComponent(courseName)}&courseId=${encodeURIComponent(courseId)}`)
      } else {
        // If the response is not successful
        console.error('Error saving assignments:', response.statusText);
      }
    }
    catch (error) {
      console.error('Error saving assignments', error.message);
    }
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
              value={content}
              onChange={(e) => {setContent(e.target.value);setSubmissionDate(new Date())}}
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
