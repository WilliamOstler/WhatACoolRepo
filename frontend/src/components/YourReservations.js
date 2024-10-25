import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getMemberIdFromCookies } from '../utils/cookieutils';

const YourReservations = () => {
  const [notifications, setNotifications] = useState([]);

  const memberId = getMemberIdFromCookies();

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
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

  const isPastDue = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    return dueDate < today;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };
  useEffect(() => {
    console.log('Current reservations:', reservations);
  }, [reservations]);

  const checkDueDates = useCallback(() => {
    const upcomingNotifications = reservations.filter(reservation => {
      const dueDate = new Date(reservations.dueDate);
      const today = new Date();
      const daysDifference = (dueDate - today) / (1000 * 60 * 60 * 24);
      return daysDifference <= 2 && daysDifference > 0;
    }).map(reservation => `The book "${reservations.bookId}" is due within the next 5 days!`);
    
    setNotifications(upcomingNotifications);
  }, [reservations]);

  useEffect(() => {
    checkDueDates();
  }, [checkDueDates]);

  const handleReturnBook = (reservation) => {
    const confirmReturn = window.confirm(
      `Are you sure you want to return "${reservation.bookTitle}"?`
    );
  
    if (confirmReturn) {
      const returnDate = new Date().toISOString().slice(0,10); // Current date as return date
      const dailyFee = 0; // Adjust based on your logic, or calculate accordingly
      console.log(returnDate)
  
      // Create the URL with query parameters
      const url = new URL('http://localhost:8080/api/borrowing/return');
      url.searchParams.append('borrowId', reservation.borrowId); // Ensure this is a number
      url.searchParams.append('returnDate', returnDate);
      url.searchParams.append('dailyFee', dailyFee);
  
      fetch(url, {
        method: 'POST',
      })
      .then(response => {
        if (response.ok) {
          alert(`Successfully returned: ${reservation.bookTitle}`);
          // Update reservations state
          setReservations(prevReservations =>
            prevReservations.filter(res => res.borrowId !== reservation.borrowId)
          );
        } else {
          return response.text().then(text => { throw new Error(text); });
        }
      })
      .catch(error => {
        alert(`Error returning book: ${error.message}`);
      });
    }
  };
  

  return (
    <div>
      <h2>Your Reservations</h2>
      {notifications.length > 0 && (
        <div className="notification">
          {notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))}
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Borrowed Date</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {reservations.map((reservations, index) => (
    <tr key={reservations.borrowId}>
      <td>{reservations.bookTitle}</td>
      <td>{new Date(reservations.borrowDate).toLocaleDateString() }</td>
      <td>{new Date(reservations.dueDate).toLocaleDateString()}</td>
      <td>
        <button onClick={() => handleReturnBook(reservations)}>
          Return Book
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

    </div>
  );
};

export default YourReservations;
