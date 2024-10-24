package com.library.controllers;


import com.library.model.Books;
import com.library.repositories.BookRepository;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/books")
public class BooksController {

    @Autowired
    private BookRepository bookRepository;
    private final StandardServiceRegistry registry =
            new StandardServiceRegistryBuilder()
                    .build();

    @GetMapping
    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Books getBookById(@PathVariable Long id) {
        return bookRepository.findById(id).orElse(new Books()); // Todo: Needs Changing to exception
    }

    @PostMapping("/add")
    public void addBook(
            @RequestParam String title,
            @RequestParam String author,
            @RequestParam Integer publishedYear,
            @RequestParam String isbn,
            @RequestParam Integer copies
    ) {
        bookRepository.addNewBook(title, author, publishedYear, isbn, copies);
    }


}
