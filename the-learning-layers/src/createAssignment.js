import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import dark from './images/1.png';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function createAssignment()
{
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
                <h1 className='App'>Create Assignment</h1>
                <Form>
                <Row>
                    <Col xs={8}>
                        <Form.Group className="mb-4">
                            <Form.Label>Assignment Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Assignment Name"  required />
                            <Form.Control.Feedback type='invalid'>Please enter username</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Assignment Weight</Form.Label> 
                        <InputGroup className="mb-3">
                            <Form.Control
                            placeholder="Assignment Weight"
                            aria-label="Asignment Weight"
                            aria-describedby="basic-addon2"
                            />
                            <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Enter Assignment Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload Files</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                </Row>
                <Button as="input" type="submit" value="Create Assignment" />
            </Form>
            </Container>

        </>
    )
}
export default createAssignment;