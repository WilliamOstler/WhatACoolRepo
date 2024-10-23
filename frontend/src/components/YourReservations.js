import React from 'react';

const YourReservations = () => {
  // Placeholder data for reservations
  const reservations = [
    { book: '1984', borrowedDate: '2024-01-01', dueDate: '2024-02-01', lateFee: '$0.00' },
    { book: 'Brave New World', borrowedDate: '2024-01-15', dueDate: '2024-02-15', lateFee: '$2.00' },
    { book: 'Williams big fat book with lots of cool pages', borrowedDate: '2024-01-15', dueDate: '2025-02-15', lateFee: '$2.00' }
  ];

  const isPastDue = (date) => {
    const today = new Date();
    const dueDate = new Date(date);
    return dueDate < today;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB');
  };

  return (
    <div>
      <h2>Your Reservations</h2>
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
              <td><button>Return Book</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourReservations;