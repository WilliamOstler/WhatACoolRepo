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
import { getMemberIdFromCookies, getMemberNameFromCookies } from './utils/cookieutils';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import MemberManagement from './components/MemberManagement';
import BookManagement from './components/Bookmanagement';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const memberId = getMemberIdFromCookies();
    if (memberId) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  console.log('Is Logged In:', isLoggedIn); // Debugging line


  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const memberId = getMemberIdFromCookies();
    fetch(`http://localhost:8080/api/borrowing/active/${memberId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched books:', data);
        setReservations(data);
        console.log(reservations);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });

}, []);
  const checkDueDates = useCallback(() => {
    const upcomingNotifications = reservations.filter(reservation => {
      const dueDate = new Date(reservation.dueDate);
      const today = new Date();
      const daysDifference = (dueDate - today) / (1000 * 60 * 60 * 24);
      return daysDifference <= 2 && daysDifference > 0;
    }).map(reservation => `The book "${reservation.bookTitle}" is due within the next 2 days!`);
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
    Cookies.remove('memberName')
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src="/logo.png" alt="Logo" className="logo" />
          {!isAdminLoggedIn && (<><nav>
            <Link to="/" className="nav-link"><FaHome style={{ marginRight: '5px' }} /> Homepage</Link>
            {isLoggedIn && (
              <>
                <Link to="/books" className="nav-link">Book List</Link>
                <Link to="/reserve" className="nav-link">My Reservations</Link>
                <span style={{ margin: '0 10px' }}>Welcome, {getMemberNameFromCookies()}</span>
              </>
            )}
            {isLoggedIn ? (
              
              <Link to="/" className="nav-link" onClick={handleLogout}>
                <FaSignOutAlt style={{ marginRight: '5px' }} /> Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav></>)}
          {
            isAdminLoggedIn && (<>
            <nav>
                <Link to="/admin/members" className="nav-link">Members</Link>
                <Link to="/admin/books" className="nav-link">Books</Link>
                <Link to="/admin" className="nav-link" onClick={handleAdminLogout}>
                  <FaSignOutAlt style={{ marginRight: '5px' }}> Logout </FaSignOutAlt>
                </Link>

            </nav>
            </>)
          }

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
          <Route path="/admin" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />}/>
          <Route path="/admin/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
          <Route path="/admin/dashboard" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/members" element={isAdminLoggedIn ? <MemberManagement /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/books" element={isAdminLoggedIn ? <BookManagement /> : <Navigate to="/admin/login" />} />
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
        <ChatBox />
      </div>
    </Router>
  );
}

export default App;
