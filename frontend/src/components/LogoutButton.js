// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Import the sign-out icon

const LogoutButton = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // Set logged-in state to false
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div 
            className="nav-link" 
            onClick={handleLogout} // Call handleLogout on click
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} // Align items inline
        >
            <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
        </div>
    );
};

export default LogoutButton;
