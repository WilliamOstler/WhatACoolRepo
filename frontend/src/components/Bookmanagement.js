// src/components/BookManagement.js
import React, { useState, useEffect } from 'react';
import Dialog from './Dialog';

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        publishedYear: '',
        isbn: '',
        copies: ''
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleAddBook = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams(); // Create form data
        formData.append('title', newBook.title);
        formData.append('author', newBook.author);
        formData.append('publishedYear', newBook.publishedYear);
        formData.append('isbn', newBook.isbn);
        formData.append('copies', newBook.copies);

        try {
            const response = await fetch('http://localhost:8080/api/books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Set content type for form data
                },
                body: formData.toString(), // Convert form data to string
            });

            if (response.ok) {
                const addedBook = await response.text(); // Assuming the response is just a success message
                setBooks([...books, { ...newBook, bookId: books.length + 1 }]); // Adjusting ID temporarily
                setNewBook({ title: '', author: '', publishedYear: '', isbn: '', copies: '' });
                setIsDialogOpen(false); // Close the dialog
            } else {
                const errorText = await response.text(); // Read error message
                alert(errorText || 'Error adding book');
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div>
            <h2>Book Management</h2>
            <button onClick={() => setIsDialogOpen(true)}>Add New Book</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Published Year</th>
                        <th>ISBN</th>
                        <th>Copies</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookId}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.published_year}</td>
                            <td>{book.isbn}</td>
                            <td>{book.copies}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <h3>Add a New Book</h3>
                <form onSubmit={handleAddBook}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Published Year"
                        value={newBook.publishedYear}
                        onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Copies"
                        value={newBook.copies}
                        onChange={(e) => setNewBook({ ...newBook, copies: e.target.value })}
                        required
                    />
                    <button type="submit">Add Book</button>
                </form>
            </Dialog>
        </div>
    );
};

export default BookManagement;
