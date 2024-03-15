import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import dark from './images/1.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function CreateCourse()
{
    const [validated, setValidated] = useState(false);
    // State variables for form inputs
    const [courseName, setCourseName] = useState("");
    const [courseId, setCourseNo] = useState("");
    const [description, setDescription] = useState("");
    const [teacher, setTeacher]=useState("");

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {

          // Check if teacher value is empty and set it to "TBD" if it is
          const teacherVal = teacher.trim() ? teacher : "TBD";

            try {
              const serverURL = 'http://localhost:4000';
              const endpoint = '/user/createCourse';
              const fetchURL = `${serverURL}${endpoint}`;
              console.log("I am here");
              const response = await fetch(fetchURL, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: courseName,
                  courseId,
                  teacher: teacherVal,
                  description
                }),
              });
              if (response) {
                console.log("Response made");
              }
      
              if (response.status === 200) {
                console.log('Course successfully created'); // Handle successful course creation (e.g., redirect or clear form)
      
              } else {
                const responseData = await response.json();
      
                if (responseData.status === 'FAILED') {
                  // Display an error message to the user
                  alert(responseData.message);
                } else {
                  console.error('Error creating course:', response.statusText);
                }
              }
            } catch (error) {
              console.error('Error creating course:', error.message);
            }
      
        }setValidated(true);
    };
    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Nav className="mx-auto">
                    <Nav.Link href="#home"><div className="text-center">
                    <img id="logo" src={dark}
                        style={{ width: '100px' }} alt="logo" />
                    </div></Nav.Link>
                </Nav>
            </Container>
            </Navbar>
            <br/>
            <Container>
                <h1 className='App'>Create Course</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col xs={7}>
                        <Form.Group className="mb-4">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Department Name"  value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                            <Form.Control.Feedback type='invalid'>Please enter Department Name</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-4">
                            <Form.Label>Course Number</Form.Label>
                            <Form.Control type="number" placeholder="000"  value={courseId} onChange={(e) => setCourseNo(e.target.value)}required />
                            <Form.Control.Feedback type='invalid'>Please enter Course Number</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Teacher</Form.Label>
                        <Form.Control type="text" placeholder="Enter Teacher Name"  value={teacher} onChange={(e) => setTeacher(e.target.value)} />
                        <Form.Control.Feedback type='invalid'>Enter Teacher Name</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Course Description</Form.Label>
                        <Form.Control as="textarea" rows={3}  value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </Form.Group>
                </Row>
                {/* <Row>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload Files</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                </Row> */}
                <Button as="input" type="submit" value="Create Course" />
            </Form>
            </Container>

        </>
    )
}
export default CreateCourse;
