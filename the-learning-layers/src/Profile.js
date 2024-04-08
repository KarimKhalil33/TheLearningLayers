import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Assume you have a CSS file for styling

function Profile() {
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

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    const handleEdit = () => {
        navigate('/EditProfile');
    };

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-card">
                <div className="profile-info">
                    <p><strong>Username:</strong> {userProfile.username}</p>
                   
                </div>
                <div className="profile-actions">
                    <button onClick={handleEdit}>Edit Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
