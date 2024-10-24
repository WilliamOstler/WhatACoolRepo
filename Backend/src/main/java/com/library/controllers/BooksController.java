package com.library.controllers;


import com.library.DAO.BooksDao;
import com.library.model.Books;
import com.library.repositories.BookRepository;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static java.lang.System.out;

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
}
