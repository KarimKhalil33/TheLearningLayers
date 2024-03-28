import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS for styling
import Container from 'react-bootstrap/Container'; // Import Container from React Bootstrap for layout
import StudentMenu from './StudentMenu'; // Import StudentMenu component for navigation
import AppFooter from './appFooter'; // Import AppFooter component for the page footer

// Grades functional component definition
function Grades() {
    // State for storing grades data
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        // Function to fetch grades data from the server
        const fetchGrades = async () => {
            // Get the student ID from session storage
            const studentId = JSON.parse(sessionStorage.getItem('authenticationId'));
            // Define the base URL for the server
            const serverURL = 'http://localhost:4000';

            try {
                // Fetch grades data for the student
                const response = await fetch(`${serverURL}/grades/${studentId}`);
                if (response.ok) { // Check if the fetch was successful
                    const data = await response.json(); // Parse the response as JSON
                    setGrades(data); // Set the fetched grades data in the state
                } else {
                    throw new Error('Failed to fetch grades'); // Throw error if fetch failed
                }
            } catch (error) {
                console.error('Error fetching grades:', error); // Log errors to the console
            }
        };

        fetchGrades(); // Invoke the fetchGrades function to load data
    }, []); // Empty dependency array means this effect runs once after initial render

    // Component render method
    return (
        <>
            <StudentMenu /> {/* Include the Student Menu at the top */}
            <Container className="my-5"> {/* Container for styling and layout */}
                <h1>My Grades</h1>
                {grades.length > 0 ? (
                    <ul>
                        {/* Map through the grades array to render each grade */}
                        {grades.map((grade, index) => (
                            <li key={index}> {/* Use index as key for each list item */}
                                <strong>{grade.assignmentName}:</strong> {grade.score ? `${grade.score}/100` : 'Pending'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No grades available.</p> // Display message if no grades are available
                )}
            </Container>
            <AppFooter /> {/* Include the App Footer at the bottom */}
        </>
    );
}

export default Grades; // Export the component for use in other parts of the app
