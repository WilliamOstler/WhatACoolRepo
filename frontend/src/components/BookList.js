import React, { useState, useEffect } from 'react';
import { getMemberIdFromCookies } from '../utils/cookieutils';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllBooks, setShowAllBooks] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books from the API
  const fetchBooks = () => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  const renderActionButton = (book) => {
    if (book.copies > 0) {
      return <button onClick={() => handleReserve(book)}>Reserve</button>;
    } else {
      return <button disabled style={{ backgroundColor: 'red', cursor: 'not-allowed' }}>Unavailable</button>;
    }
  };

  const handleReserve = (book) => {
    const memberId = getMemberIdFromCookies(); // Replace this with the actual member ID from your context or state
    const borrowDate = new Date().toISOString().slice(0, 10); // Format the date as needed

    const url = new URL('http://localhost:8080/api/borrowing/borrow');
    url.searchParams.append('bookId', book.id);
    url.searchParams.append('memberId', memberId);
    url.searchParams.append('borrowDate', borrowDate);

    fetch(url, {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          alert(`You reserved: ${book.title}`);
          fetchBooks();
        } else {
          return response.text().then(text => { throw new Error(text); });
        }
      })
      .catch(error => {
        alert(`Error reserving book: ${error.message}`);
      });
  };

  const handleToggleBooks = () => {
    setShowAllBooks(!showAllBooks);
  };

  const filteredBooks = books
    .filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm) ||
      book.published_year.toString().includes(searchTerm)
    )
    .filter(book => showAllBooks || book.copies > 0);

  return (
    <div>
      <h1>Book List</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '98%' }}
      />
      <button onClick={handleToggleBooks} style={{ marginBottom: '20px' }}>
        {showAllBooks ? 'Show Available Books Only' : 'Show All Books'}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', margin: '0 auto' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Title</th>
              <th style={{ textAlign: 'center' }}>Author</th>
              <th style={{ textAlign: 'center' }}>Published Date</th>
              <th style={{ textAlign: 'center' }}>ISBN</th>
              <th style={{ textAlign: 'center' }}>Copies Available</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              filteredBooks.map(book => (
                <tr key={book.id}>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{book.title}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{book.author}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{book.published_year}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{book.isbn}</td>
                  {book.copies > 0 ? (
                    <>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{book.copies}</td>
                      <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{renderActionButton(book)}</td>
                    </>
                  ) : (
                    <td colSpan="2" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      {renderActionButton(book)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', verticalAlign: 'middle' }}>No books available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
