import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched books:', data);
        setBooks(data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  // Function to render the button based on the number of available copies
  const renderActionButton = (book) => {
    if (book.copies > 0) {
      return <button onClick={() => handleReserve(book)}>Reserve</button>;
    } else {
      return <button disabled>Unavailable</button>;
    }
  };

  // Mock reserve function
  const handleReserve = (book) => {
    // Logic for handling book reservation
    alert(`You reserved: ${book.title}`);
  };

  return (
    <div>
      <h1>Book List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>ISBN</th>
            <th>Copies Available</th>
            <th>Action</th> {/* Add an Action column for buttons */}
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published_year}</td>
                <td>{book.isbn}</td>
                <td>{book.copies}</td> {/* Display the number of available copies */}
                <td>{renderActionButton(book)}</td> {/* Render the action button */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
