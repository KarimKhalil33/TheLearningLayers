import React, { useState, useEffect } from 'react';
import './App.css'; // Assume you have a CSS file for styling
import { useNavigate } from 'react-router-dom';
function EditProfile() {
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("authenticationId"));
    if (username) {
        setUserProfile({ username });
    } else {
        console.error('No user data available');
    }
}, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission to update the profile details
    console.log('Profile updated:', userProfile);
    // After updating, you might want to navigate back to the profile page or show a success message
    navigate('/profile');
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userProfile.username}
          onChange={handleChange}
        />

        {/* Add more fields as needed */}
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
