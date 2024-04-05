import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function AssignmentDetails() {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    // Fetch the assignment details from the server
    const fetchAssignmentDetails = async () => {
      const response = await fetch(`http://localhost:4000/assignments/${assignmentId}`);
      const data = await response.json();
      setAssignment(data);
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{assignment.title}</h1>
      <p>{assignment.description}</p>
      <p>Due Date: {assignment.dueDate}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default AssignmentDetails;
