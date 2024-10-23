import React, { useState } from 'react';

const BookList = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [memberId, setMemberId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
        { id: 10, title: "Book Ten", author: "Author J", year: 2021, isbn: "012-345", copiesAvailable: 1 }
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

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm)
    );

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Library Book List</h1>
            <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', width: '100%', marginBottom: '20px', fontSize: '16px' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>ISBN</th>
                        <th>Copies Available</th>
                        <th>Reserve</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.isbn}</td>
                            <td>{book.copiesAvailable}</td>
                            <td>
                                <button 
                                    onClick={() => handleReserve(book)} 
                                    style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px' }}
                                >
                                    Reserve
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
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
