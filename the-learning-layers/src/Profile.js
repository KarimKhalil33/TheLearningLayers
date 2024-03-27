import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Assuming there is a CSS file for styling

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const authenticationId = sessionStorage.getItem('authenticationId');
    const collectionName = sessionStorage.getItem('collectionName');
    const serverURL = 'http://localhost:4000';

    // Construct the endpoint based on the user's role
    let endpoint = `/profile/${collectionName.toLowerCase()}/${authenticationId}`;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${serverURL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include authentication token if necessary
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data);
        } else {
          throw new Error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('authenticationId');
    sessionStorage.removeItem('collectionName');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-info">
        <p><strong>Username:</strong> {userProfile.username}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        {/* Add more fields as needed based on the user role and available data */}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
