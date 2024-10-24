import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FaBell, FaHome, FaSignOutAlt } from 'react-icons/fa'; // Import the exit icon
import BookList from './components/BookList';
import YourReservations from './components/YourReservations';
import Homepage from './components/Homepage'; 
import Login from './components/Login'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state for login status

  const reservations = useMemo(() => [
    { book: '1984', borrowedDate: '2024-10-20', dueDate: '2024-10-25', lateFee: '$0.00' },
    { book: 'Brave New World', borrowedDate: '2024-10-21', dueDate: '2024-10-26', lateFee: '$2.00' }
  ], []);

  const handleLogout = () => {
    setIsLoggedIn(false); // Function to log out the user
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <nav>
            <Link to="/" className="nav-link">
              <FaHome style={{ marginRight: '5px' }} /> Homepage
            </Link>
            <Link to="/books" className="nav-link">Book List</Link>
            <Link to="/reserve" className="nav-link">Reserve a Book</Link>
            {isLoggedIn ? (
              <Link to="/" className="nav-link" onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={<BookList isLoggedIn={isLoggedIn} />} />
          <Route path="/reserve" element={<YourReservations isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* Redirect to homepage if already logged in */}
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
