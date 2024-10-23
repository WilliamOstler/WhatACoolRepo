import React, { useState } from 'react';

const BookList = () => {
    const [selectedBook, setSelectedBook] = useState(null);
    const [memberId, setMemberId] = useState('');

    const books = [
        { id: 1, title: "Book One", author: "Author A", year: 2020, isbn: "123-456", copiesAvailable: 5 },
        { id: 2, title: "Book Two", author: "Author B", year: 2021, isbn: "234-567", copiesAvailable: 3 },
        { id: 3, title: "Book Three", author: "Author C", year: 2019, isbn: "345-678", copiesAvailable: 2 }
    ];

    const handleReserve = (book) => {
        setSelectedBook(book);
    };

    const handleConfirmReservation = () => {
        alert(`Book reserved: ${selectedBook.title} for Member ID: ${memberId}`);
        setSelectedBook(null);
        setMemberId('');
    };

    return (
        <div>
            <h1>Book List</h1>
            <table>
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
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.isbn}</td>
                            <td>{book.copiesAvailable}</td>
                            <td>
                                <button onClick={() => handleReserve(book)}>Reserve</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {selectedBook && (
                <div>
                    <h2>Reserve {selectedBook.title}</h2>
                    <label>
                        Member ID:
                        <input 
                            type="text" 
                            value={memberId} 
                            onChange={(e) => setMemberId(e.target.value)} 
                        />
                    </label>
                    <button onClick={handleConfirmReservation}>Confirm Reservation</button>
                </div>
            )}
        </div>
    );
};

export default BookList;
