import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentMenu from './StudentMenu';
function SubmitAssignment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assignmentId = queryParams.get('assignmentId');
  const courseName=queryParams.get('name');
  const courseId=queryParams.get('courseId');
  const authenticationId = sessionStorage.getItem("authenticationId").replace(/"/g, "");
  const [studentNumber,setStudentNumber]=useState(1);
  const [submissionDate,setSubmissionDate]=useState(1);
  const submissionType="Text box";
  const [content,setContent]=useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getStudentInfo = async () => {
      try { 
        const authenticationId=sessionStorage.getItem("authenticationId").replace(/"/g, "");
      const response=await fetch(`http://localhost:4000/user/studentNum?authenticationId=${encodeURIComponent(authenticationId)}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setStudentNumber(data);
      
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    getStudentInfo();
  })
  const handleSubmission = async (event) => {
    event.preventDefault();
    if (!content && !file) {
      alert('Please provide your submission text or upload a file');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('studentNumber', studentNumber);
      formData.append('submissionDate', submissionDate);
      formData.append('submissionType', submissionType);
      formData.append('content', content);
      if (file) {
        formData.append('file', file);
      }
  
      const response = await fetch(`http://localhost:4000/user/submitAssignment?assignmentId=${encodeURIComponent(assignmentId)}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const responseData = await response.json();
        alert("Assignment submitted");
        navigate(`/StudentAssignments?name=${encodeURIComponent(courseName)}&courseId=${encodeURIComponent(courseId)}`)
      } else {
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="assignmentFile">Or upload a file:</label>
            <input type="file" id='assignmentFile' required onChange={e => setFile(e.target.files[0])}  />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default SubmitAssignment;
