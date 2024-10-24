package com.library.services;

import com.library.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class, noRollbackFor = DataAccessException.class)
    public void addNewBook(String title, String author, Integer publishedYear, String isbn, Integer copies) {
        bookRepository.addNewBook(title, author, publishedYear, isbn, copies);
    }
}