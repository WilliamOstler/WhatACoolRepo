import React from 'react';
import './App.css';
import BookList from './components/BookList';
import YourReservations from './components/YourReservations'; // Import the component
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

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
