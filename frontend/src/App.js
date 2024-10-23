import React from 'react';
import './App.css';
import BookList from './components/BookList';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Placeholder component for 'Your Reservations' page
const YourReservations = () => (
  <div>
    <h2>Your Reservations</h2>
    {/* Add your reservations content here */}
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Reserve a Book</Link>
          <Link to="/reservations">Your Reservations</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/reservations" element={<YourReservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
