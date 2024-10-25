import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ setIsLoggedIn }) => {
    const [memberId, setMemberId] = useState('');
    const [memberExists, setMemberExists] = useState(null); // State to track if the member exists
    const navigate = useNavigate();

    useEffect(() => {
        // Function to check if the member exists
        const checkMemberExists = async () => {
            if (!memberId) return; // If no memberId, don't check

            try {
                const response = await fetch(`http://localhost:8080/api/members/${memberId}/exists`);
                
                // If the response is okay, set memberExists to true, else false
                if (response.status == '404') {
                    setMemberExists(false);
                } else {
                    setMemberExists(true);
                }
            } catch (error) {
                console.error('Error checking member existence:', error);
                setMemberExists(false); // Consider member as non-existent if there's an error
            }
        };

        checkMemberExists();
    }, [memberId]); // Run the effect when memberId changes

    const handleLogin = (e) => {
        e.preventDefault();
        if (!memberId) {
            alert('Member ID is required.'); // Basic validation
            return;
        }

        // Proceed only if the member exists
        if (memberExists) {
            // Store member ID in cookies
            Cookies.set('memberId', memberId, { expires: 7 }); // Expires in 7 days
            setIsLoggedIn(true);
            navigate('/'); // Redirect to homepage after logging in
        } else {
            alert('Member ID does not exist.'); // Alert if member does not exist
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Enter your Member ID:</label>
                    <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        style={{ marginBottom: '10px' }} // Add margin here
                    />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Login</button> {/* Add margin here */}
            </form>
            {memberExists === false && <p style={{ color: 'red' }}>Member ID does not exist.</p>}

            <p>If you require a member ID, please contact our team who will register you into the library.</p>
        </div>
    );
};

export default Login;
