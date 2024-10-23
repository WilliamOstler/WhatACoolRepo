import React, { useEffect, useState, useCallback, useMemo } from 'react';

const YourReservations = () => {
  const [notifications, setNotifications] = useState([]);

  const reservations = useMemo(() => [
    { book: '1984', borrowedDate: '2024-01-01', dueDate: '2024-02-01', lateFee: '$0.00' },
    { book: 'Brave New World', borrowedDate: '2024-01-15', dueDate: '2024-10-24', lateFee: '$2.00' }
  ], []);

  const isPastDue = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    return dueDate < today;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

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

  const handleReturnBook = (book) => {
    const confirmReturn = window.confirm(
      `Are you sure you want to return "${book}"?\n\nIf you decide to return the book, you will never have the chance to read the book again and will die without reading its pages ever again.`
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
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.book}</td>
              <td>{formatDate(reservation.borrowedDate)}</td>
              <td style={{ color: isPastDue(reservation.dueDate) ? 'red' : 'green' }}>
                {formatDate(reservation.dueDate)}
              </td>
              <td>{reservation.lateFee}</td>
              <td>
                <button onClick={() => handleReturnBook(reservation.book)}>
                  Return Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <img src="/mcdonalds-logo.png" alt="McDonald's Logo" style={{ width: '150px', marginTop: '20px' }} />
      </footer>
    </div>
  );
};

export default YourReservations;
