import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Importing CSS styles for the component

// Profile functional component definition
function Profile() {
  // State for storing user profile data
  const [userProfile, setUserProfile] = useState({});
  // Hook for navigating programmatically
  const navigate = useNavigate();

  // Effect hook to fetch user profile data after component mounts
  useEffect(() => {
    // Retrieve session data
    const authenticationId = sessionStorage.getItem('authenticationId');
    const collectionName = sessionStorage.getItem('collectionName');
    // Base URL for the server
    const serverURL = 'http://localhost:4000';
    const s = collectionName.toLowerCase();
    console.log(s)
    // Construct the endpoint based on the user's role
    let endpoint = `/profile/${s}/${authenticationId}`;
    
    // Function to fetch user profile from the server
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${serverURL}${endpoint}`, {
          method: 'GET', // HTTP GET method
          headers: {
            'Content-Type': 'application/json', // Setting content type as JSON
          }
        });

        if (response.ok) { // If the request was successful
          const data = await response.json(); // Parsing the response body as JSON
          setUserProfile(data); // Setting user profile data in the state
        } else {
          throw new Error('Failed to fetch profile'); // Throw an error if request failed
        }
      } catch (error) {
        console.error('Error fetching profile:', error); // Log any errors
      }
    };

    fetchProfile(); // Invoke the function to fetch profile data
  }, []); // Empty dependency array means this effect runs once after initial render

  // Function to handle user logout
  const handleLogout = () => {
    // Clear session data
    sessionStorage.removeItem('authenticationId');
    sessionStorage.removeItem('collectionName');
    navigate('/login'); // Navigate to login page
  };

  // Component render method
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {userProfile.username}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        {/* More fields can be added here based on the user data */}
      </div>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default Profile; // Export the component for use in other parts of the app
