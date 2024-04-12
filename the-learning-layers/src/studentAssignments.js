import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Make sure you have the CSS file for styling
import StudentMenu from './StudentMenu';
import { Nav } from 'react-bootstrap';
function StudentAssignments() {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState([]);
    // Access query parameters from window.location.search
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const courseId = params.get('courseId');
    const authenticationId=sessionStorage.getItem("authenticationId").replace(/"/g, "");
    const [submissionStatus,setSubmissionStatus]=useState([]);
    const [studentNum,setStudentNum]=useState("");

   


    const fetchAssignments = async (name, courseId) => {
        try {
            // Make fetch request to fetch assignments based on query parameters
            const response = await fetch(`http://localhost:4000/user/getAssignments?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
            const data = await response.json();
            setAssignments(data);
            fetchSubmissionStatus(studentNum)
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    }

    const fetchStudentNum = async (authenticationId) => {
        try {
            const response = await fetch(`http://localhost:4000/user/studentNum?authenticationId=${encodeURIComponent(authenticationId)}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setStudentNum(data);
        } catch (error) {
            console.error('Error fetching studentNumber:', error);
        }
    }
    
    useEffect(() => {
        // Fetch student number first
        fetchStudentNum(authenticationId);
    }, []);
    useEffect(() => {
        // Fetch assignments data from server or local storage
        fetchAssignments(name, courseId);
        if(studentNum){fetchGrades(name,courseId)
        fetchSubmissionStatus(studentNum)};
    }, [name, courseId, studentNum]);
    const fetchGrades=async(name,courseId)=>{
        // try {
        //     const response = await fetch(`http://localhost:4000/user/studentNum?authenticationId=${encodeURIComponent(authenticationId)}`,{
        //         method:'get',
        //         headers:{
        //             'Content-Type': 'application/json',
        //         }
        //     });
        //     const data = await response.json();
        //         setStudentNum(data);
        //     } catch (error) {
        //         console.error('Error fetching studentNumber:', error);
        //     }
        try {
            // Make fetch request to fetch assignments based on query parameters
            const response = await fetch(`http://localhost:4000/user/getGrades?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}&studentNum=${encodeURIComponent(studentNum)}`);
            const data = await response.json();
            console.log(data);
            setGrades(data);
        } catch (error) {
            console.error('Error fetching grades:', error);
        }
    }

    const fetchSubmissionStatus = async (studentNum) => {
        try {
            const submissionStatuses = await Promise.all(
                assignments.map(async (assignment) => {
                    const response = await fetch(`http://localhost:4000/user/checkStatus?assignmentId=${encodeURIComponent(assignment._id)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': studentNum
                        },
                    });
                    const data = await response.json();
                    return { assignmentId: assignment._id, status: data.status };
                })
            );
            console.log(submissionStatuses)
            setSubmissionStatus(submissionStatuses);
        } catch (error) {
            console.error('Error fetching user status:', error);
        }
    }

    const getStatusLabel = (assignment) => {
        console.log(assignment);
        if (assignment== "submitted") {
            return <span className="status submitted">Submitted</span>;
        } else if(assignment=="missing") {
            return <span className="status missing">Missing</span>;
        } 
        else {
            return <span className="status grade">{grades.grade}%</span>;
        }
    };
    console.log(assignments);

    const viewAssignment = (assignmentId) => {
        navigate(`/assignments/${assignmentId}?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`);
      };
    return (
        <>
            <StudentMenu />
            <article className='side-nav'>
                <Nav variant="underline" defaultActiveKey="/viewCourseStudent" className="flex-column ">
                    <Nav.Link className="sidebar" href={`/viewCourseStudent?name=${encodeURIComponent(name)}&courseId=${encodeURIComponent(courseId)}`}>View Course</Nav.Link>
                </Nav>
            </article>
            <div className="assignments-container">
                <div className="title-area">
                    <h1>Assignments</h1>
                </div>
                {assignments.length === 0 ? (
                    <div>No assignments</div>
                ) : (
                    <div className="assignments-grid">
    {assignments.map((assignment, index) => {
        // Find the corresponding submission status for the current assignment
        const status = submissionStatus.find(status => status.assignmentId === assignment._id);
        
        return (
            <div className="assignment-card" key={index} onClick={() => viewAssignment(assignment._id)}>
                <h2>{assignment.name}</h2>
                <p>Due Date: {assignment.dueDate}</p>
                <p>Grade: {grades && grades.assignmentName === assignment.name ? grades.grade : 'Not graded'}</p>
                {status ? (
                    <span className={`status ${status.status}`}>{status.status}</span>
                ) : (
                    <span className="status">Status not available</span>
                )}
            </div>
        );
    })}
</div>
                )}
            </div>

        </>
    );
}

export default StudentAssignments;
