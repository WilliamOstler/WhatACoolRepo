package com.library.controllers;


import com.library.model.Books;
import com.library.repositories.BookRepository;

import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api/books")
public class BooksController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Books getBookById(@PathVariable Long id) {
        return bookRepository.findById(id).orElse(new Books()); // Todo: Needs Changing to exception
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam Integer publishedYear,
            @RequestParam String isbn,
            @RequestParam Integer copies
    ) {
        try {
            bookRepository.addNewBook(title, author, publishedYear, isbn, copies);
            return ResponseEntity.ok("Book added successfully");
        } catch (Exception e) {
            if (e.getMessage().contains("Book already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Book already exists");
            } else {
                System.err.println("Exception occurred while adding book: " + e.getMessage());
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the book");
            }
        }
    }
}
