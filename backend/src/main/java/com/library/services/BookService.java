package com.library.services;

import com.library.model.Books;
import com.library.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public String getBookTitleById(long bookId) {
        Optional<Books> book = bookRepository.findById(bookId);
        return book.map(Books::getTitle).orElse("Book not found");
    }
}
