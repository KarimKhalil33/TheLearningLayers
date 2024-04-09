// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentMenu from './StudentMenu';
import TeacherMenu from './TeacherMenu';
import AdminMenu from './AdminMenu';


function Profile() {
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();
    const collectionName = JSON.parse(sessionStorage.getItem('collectionName'));

    useEffect(() => {
        const username = JSON.parse(sessionStorage.getItem('authenticationId'));
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

    const getMenuComponent = () => {
        switch (collectionName) {
            case 'User':
                return <StudentMenu />;
            case 'Teacher':
                return <TeacherMenu />;
            case 'Admin':
                return <AdminMenu />;
            default:
                return null; // or a default menu
        }
    };

    return (
        <div>
            {getMenuComponent()}
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
        </div>
    );
}

export default Profile;
