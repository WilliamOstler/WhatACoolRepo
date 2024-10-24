// import React, { useState } from 'react';

// const Login = ({ setIsLoggedIn }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault(); // Prevent form submission
//     // Here, you can add logic to check the username and password.
//     // For now, we'll just simulate a successful login.
//     if (username && password) {
//       setIsLoggedIn(true); // Set login state to true
//       // Redirect to the homepage or perform any other action
//       window.location.href = '/'; // Redirect to homepage
//     }
//   };
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic to handle successful login
    setIsLoggedIn(true); // Update logged-in state
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleLogin}type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
