import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ setIsLoggedIn }) => {
    const [memberId, setMemberId] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!memberId) {
            alert('Member ID is required.'); // Basic validation
            return;
        }
        // Store member ID in cookies
        Cookies.set('memberId', memberId, { expires: 7 }); // Expires in 7 days
        setIsLoggedIn(true);
        navigate('/'); // Redirect to homepage after logging in
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
        </div>
    );
};

export default Login;
