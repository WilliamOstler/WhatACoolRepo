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
        { id: 11, title: "Book Eleven", author: "Author K", year: 2022, isbn: "123-890", copiesAvailable: 0, unavailableForDays: 10 },
        { id: 12, title: "Book Twelve", author: "Author L", year: 2023, isbn: "456-012", copiesAvailable: 0, unavailableForDays: 5 },
        { id: 13, title: "Book Thirteen", author: "Author M", year: 2021, isbn: "789-345", copiesAvailable: 0, unavailableForDays: 4 },
        { id: 14, title: "Book Fourteen", author: "Author N", year: 2020, isbn: "012-678", copiesAvailable: 0, unavailableForDays: 3 },
        { id: 15, title: "Book Fifteen", author: "Author O", year: 2019, isbn: "999-888", copiesAvailable: 0, unavailableForDays: 8 },
        { id: 16, title: "Book Sixteen", author: "Author P", year: 2020, isbn: "111-222", copiesAvailable: 0, unavailableForDays: 1 },
        { id: 17, title: "Book Seventeen", author: "Author Q", year: 2019, isbn: "333-444", copiesAvailable: 0, unavailableForDays: 6 },
        { id: 18, title: "Book Eighteen", author: "Author R", year: 2022, isbn: "555-666", copiesAvailable: 4 },
        { id: 19, title: "Book Nineteen", author: "Author S", year: 2021, isbn: "777-888", copiesAvailable: 2 },
        { id: 20, title: "Book Twenty", author: "Author T", year: 2023, isbn: "999-000", copiesAvailable: 1 },
        { id: 21, title: "Book Twenty-One", author: "Author U", year: 2020, isbn: "111-000", copiesAvailable: 0, unavailableForDays: 3 },
        { id: 22, title: "Book Twenty-Two", author: "Author V", year: 2018, isbn: "222-333", copiesAvailable: 6 },
        { id: 23, title: "Book Twenty-Three", author: "Author W", year: 2019, isbn: "444-555", copiesAvailable: 0, unavailableForDays: 10 },
        { id: 24, title: "Book Twenty-Four", author: "Author X", year: 2017, isbn: "666-777", copiesAvailable: 5 },
        { id: 25, title: "Book Twenty-Five", author: "Author Y", year: 2020, isbn: "888-999", copiesAvailable: 3 }
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

    const getNextAvailabilityInDays = (bookId) => {
        return Math.floor(Math.random() * 5) + 1; // Random 1-5 days for others
    };

    const filteredBooks = books
        .filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.includes(searchTerm) ||
            book.year.toString().includes(searchTerm)
        )
        .filter(book => showAllBooks || book.copiesAvailable > 0)
        .sort((a, b) => {
            const aAvailable = a.copiesAvailable > 0;
            const bAvailable = b.copiesAvailable > 0;

            const aTemporarilyUnavailable = a.unavailableForDays < 7 && a.copiesAvailable === 0;
            const bTemporarilyUnavailable = b.unavailableForDays < 7 && b.copiesAvailable === 0;

            const aPermanentlyUnavailable = a.unavailableForDays >= 7 && a.copiesAvailable === 0;
            const bPermanentlyUnavailable = b.unavailableForDays >= 7 && b.copiesAvailable === 0;

            if (aAvailable && !bAvailable) return -1; // 'a' comes first if available
            if (!aAvailable && bAvailable) return 1; // 'b' comes first if available

            if (aTemporarilyUnavailable && !bTemporarilyUnavailable) return -1; // 'a' comes first if temporarily unavailable
            if (!aTemporarilyUnavailable && bTemporarilyUnavailable) return 1; // 'b' comes first if temporarily unavailable

            if (aPermanentlyUnavailable && !bPermanentlyUnavailable) return 1; // 'b' comes first if 'a' is permanently unavailable
            if (!aPermanentlyUnavailable && bPermanentlyUnavailable) return -1; // 'a' comes first if 'b' is permanently unavailable

            // If both are in the same category, sort by title
            return a.title.localeCompare(b.title);
        });

    return (
        <div>
            <h1>Book List</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleToggleBooks}>
                {showAllBooks ? 'Show Available Books Only' : 'Show All Books'}
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>ISBN</th>
                        <th>Copies Available</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book) => (
                        <tr key={book.id}>
                            {book.copiesAvailable > 0 ? (
                                <>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.year}</td>
                                    <td>{book.isbn}</td>
                                    <td style={{ textAlign: 'center', width: '80px' }}>{book.copiesAvailable}</td>
                                    <td style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                        <button 
                                            onClick={() => handleReserve(book)} 
                                            style={{
                                                textAlign: 'center',
                                                padding: '5px 10px',
                                                cursor: 'pointer',
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                fontSize: '14px',
                                                margin: '0 5px' // Added margin for spacing
                                            }}
                                        >
                                            Reserve
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.year}</td>
                                    <td>{book.isbn}</td>
                                    <td colSpan="2" style={{ textAlign: 'center' }}>
                                        {book.unavailableForDays >= 7 ? (
                                            <button 
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    fontSize: '14px',
                                                    margin: '0 5px' // Added margin for spacing
                                                }}
                                            >
                                                Unavailable
                                            </button>
                                        ) : (
                                            <button 
                                                style={{
                                                    textAlign: 'center',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer',
                                                    backgroundColor: 'orange',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    fontSize: '14px',
                                                    margin: '0 5px' // Added margin for spacing
                                                }}
                                            >
                                                Available in {getNextAvailabilityInDays(book.id)} day(s)
                                            </button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedBook && (
                <div>
                    <h2>Reserve Book</h2>
                    <p>Book: {selectedBook.title}</p>
                    <input 
                        type="text" 
                        placeholder="Enter Member ID" 
                        value={memberId} 
                        onChange={(e) => setMemberId(e.target.value)} 
                    />
                    <div style={{ marginTop: '10px' }}>
                        <button 
                            onClick={handleConfirmReservation}
                            style={{
                                marginRight: '10px', // Added margin for spacing
                                padding: '5px 10px',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Confirm Reservation
                        </button>
                        <button 
                            onClick={handleCloseReservation}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;
