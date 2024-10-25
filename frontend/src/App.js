import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FaBell, FaHome, FaSignOutAlt } from 'react-icons/fa';
import BookList from './components/BookList';
import YourReservations from './components/YourReservations';
import Homepage from './components/Homepage';
import Login from './components/Login';
import ChatBox from './components/ChatBox';
import Cookies from 'js-cookie';
import './App.css';
import { getMemberIdFromCookies } from './utils/cookieutils';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memberId = getMemberIdFromCookies();
    if (memberId) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  console.log('Is Logged In:', isLoggedIn); // Debugging line


  const reservations = useMemo(() => [
    { book: '1984', borrowedDate: '2024-10-20', dueDate: '2024-10-25', lateFee: '$0.00' },
    { book: 'Brave New World', borrowedDate: '2024-10-21', dueDate: '2024-10-26', lateFee: '$2.00' }
  ], []);

  const checkDueDates = useCallback(() => {
    const upcomingNotifications = reservations.filter(reservation => {
      const dueDate = new Date(reservation.dueDate);
      const today = new Date();
      const daysDifference = (dueDate - today) / (1000 * 60 * 60 * 24);
      return daysDifference <= 2 && daysDifference > 0;
    }).map(reservation => `The book "${reservation.book}" is due within the next 2 days!`);
    setNotifications(upcomingNotifications);
  }, [reservations]);

  useEffect(() => {
    checkDueDates();
  }, [checkDueDates]);

  const handleCloseNotification = (index) => {
    setNotifications(prevNotifications => prevNotifications.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Cookies.remove('memberId');
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src="/logo.png" alt="Logo" className="logo" />
          <nav>
            <Link to="/" className="nav-link"><FaHome style={{ marginRight: '5px' }} /> Homepage</Link>
            {isLoggedIn && (
              <>
                <Link to="/books" className="nav-link">Book List</Link>
                <Link to="/reserve" className="nav-link">My Reservations</Link>
              </>
            )}
            {isLoggedIn ? (
              <Link to="/" className="nav-link" onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav>
          {isLoggedIn && ( // Only show the notification bell if logged in
            <div className="notification-bell">
              <FaBell />
              {notifications.length > 0 && (
                <>
                  <div className="notification-count">{notifications.length}</div>
                  <div className="notifications-dropdown">
                    {notifications.map((notification, index) => (
                      <div key={index} className="notification-item">
                        <p>{notification}</p>
                        <button onClick={() => handleCloseNotification(index)}>X</button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={isLoggedIn ? <BookList /> : <Navigate to="/login" />} />
          <Route path="/reserve" element={isLoggedIn ? <YourReservations /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
