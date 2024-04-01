import React, { useState, useEffect } from 'react';
import './App.css'; // Assume you have a CSS file for styling

function EditProfile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    // Add other fields as needed
  });

  useEffect(() => {
    // Here you would fetch the current user profile details to populate the form
    // For now, we will simulate this with sessionStorage
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    
    if (username && email) {
      setProfile({ ...profile, username, email });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission to update the profile details
    console.log('Profile updated:', profile);
    // After updating, you might want to navigate back to the profile page or show a success message
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
          value={profile.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
        />

        {/* Add more fields as needed */}
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
