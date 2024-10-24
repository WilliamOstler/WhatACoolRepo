import React, { useEffect, useState, useCallback, useMemo } from 'react';

const YourReservations = () => {
  const [notifications, setNotifications] = useState([]);

  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/borrowing')
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

  const handleReturnBook = (book) => {
    const confirmReturn = window.confirm(
      `Are you sure you want to return "${book}"?\n\nIf you decide to return the book, you will never have the chance to read the book again and will die without reading its pages ever again.\n\n You will loose all respect from the library.\n\nAs much as we legally can not ban you. Any time you walk into our library again, you will feel the presense of immense shame. You will not sleep at night. Goodbye.`
    );
    if (confirmReturn) {
      console.log(`Returned: ${book}`);
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
            <th>Late Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {reservations.map((reservations, index) => (
    <tr key={reservations.borrowId}>
      <td>{reservations.bookId}</td>
      <td>{new Date(reservations.borrowDate).toLocaleString() }</td>
      <td>{new Date(reservations.dueDate).toLocaleString()}</td>
      <td>{reservations.lateFee}</td>
      <td>
        <button onClick={() => handleReturnBook(reservations.bookId)}>
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
