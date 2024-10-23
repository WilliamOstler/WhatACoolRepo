import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import YourReservations from './components/YourReservations';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Link to="/" className="nav-link">Book List</Link>
                        <Link to="/reserve" className="nav-link">Reserve a Book</Link>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/reserve" element={<YourReservations />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
