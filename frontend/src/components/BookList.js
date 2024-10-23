import React, { useState } from 'react';

const BookList = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [memberId, setMemberId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllBooks, setShowAllBooks] = useState(true);

    const books = [
        { id: 1, title: "Book One", author: "Author A", year: 2020, isbn: "123-456", copiesAvailable: 5 },
        { id: 2, title: "Book Two", author: "Author B", year: 2021, isbn: "234-567", copiesAvailable: 3 },
        { id: 3, title: "Book Three", author: "Author C", year: 2019, isbn: "345-678", copiesAvailable: 2 },
        { id: 4, title: "Book Four", author: "Author D", year: 2018, isbn: "456-789", copiesAvailable: 1 },
        { id: 5, title: "Book Five", author: "Author E", year: 2022, isbn: "567-890", copiesAvailable: 4 },
        { id: 6, title: "Book Six", author: "Author F", year: 2023, isbn: "678-901", copiesAvailable: 6 },
        { id: 7, title: "Book Seven", author: "Author G", year: 2021, isbn: "789-012", copiesAvailable: 2 },
        { id: 8, title: "Book Eight", author: "Author H", year: 2020, isbn: "890-123", copiesAvailable: 3 },
        { id: 9, title: "Book Nine", author: "Author I", year: 2017, isbn: "901-234", copiesAvailable: 5 },
        { id: 10, title: "Book Ten", author: "Author J", year: 2021, isbn: "012-345", copiesAvailable: 1 },
        // New books with 0 copies available
        { id: 11, title: "Book Eleven", author: "Author K", year: 2022, isbn: "123-890", copiesAvailable: 0 },
        { id: 12, title: "Book Twelve", author: "Author L", year: 2023, isbn: "456-012", copiesAvailable: 0 },
        { id: 13, title: "Book Thirteen", author: "Author M", year: 2021, isbn: "789-345", copiesAvailable: 0 },
        { id: 14, title: "Book Fourteen", author: "Author N", year: 2020, isbn: "012-678", copiesAvailable: 0 }
    ];
    
    const handleReserve = (book) => {
        setSelectedBook(book);
    };

    const handleConfirmReservation = () => {
        alert(`Book reserved: ${selectedBook.title} for Member ID: ${memberId}`);
        setSelectedBook(null);
        setMemberId('');
    };

    const handleCloseReservation = () => {
        setSelectedBook(null);
        setMemberId('');
    };

    const handleToggleBooks = () => {
        setShowAllBooks(!showAllBooks);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.year.toString().includes(searchTerm)
    ).filter(book => showAllBooks || book.copiesAvailable > 0);

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Library Book List</h1>
            <input
                type="text"
                placeholder="Search by title, author, ISBN, or year"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px', textAlign: 'center' }}
            />
            <button 
                onClick={handleToggleBooks}
                style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}
            >
                {showAllBooks ? "Filter out unavailable books" : "Show all books"}
            </button>
            
            {filteredBooks.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'red', fontSize: '18px' }}>
                    Sorry, no books match that description.
                </p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Title</th>
                            <th style={{ textAlign: 'center' }}>Author</th>
                            <th style={{ textAlign: 'center' }}>Year</th>
                            <th style={{ textAlign: 'center' }}>ISBN</th>
                            <th style={{ textAlign: 'center' }}>Copies Available</th>
                            <th style={{ textAlign: 'center', width: '150px' }}>Reserve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map(book => (
                            <tr key={book.id}>
                                <td style={{ textAlign: 'center' }}>{book.title}</td>
                                <td style={{ textAlign: 'center' }}>{book.author}</td>
                                <td style={{ textAlign: 'center' }}>{book.year}</td>
                                <td style={{ textAlign: 'center' }}>{book.isbn}</td>
                                <td style={{ textAlign: 'center', width: '80px' }}>{book.copiesAvailable}</td>
                                <td style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <button 
                                        onClick={() => handleReserve(book)} 
                                        style={{
                                            textAlign: 'center',
                                            padding: '5px 10px',
                                            cursor: 'pointer',
                                            backgroundColor: book.copiesAvailable > 0 ? '#007bff' : 'red', // Change color based on availability
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            fontSize: '14px'
                                        }}
                                        disabled={book.copiesAvailable === 0} // Disable button if no copies available
                                    >
                                        {book.copiesAvailable > 0 ? 'Reserve' : 'Unavailable'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {selectedBook && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>Reserve {selectedBook.title}</h2>
                    <label>
                        Member ID:
                        <input 
                            type="text" 
                            value={memberId} 
                            onChange={(e) => setMemberId(e.target.value)} 
                            style={{ marginLeft: '10px', padding: '8px', fontSize: '16px', width: 'calc(100% - 16px)', marginBottom: '20px' }}
                        />
                    </label>
                    <div>
                        <button 
                            onClick={handleConfirmReservation} 
                            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px' }}
                        >
                            Confirm Reservation
                        </button>
                        <button 
                            onClick={handleCloseReservation} 
                            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
