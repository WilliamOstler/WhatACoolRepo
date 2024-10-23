package com.library.DAO;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;

public class BooksDao {
    public void insertBook(Long id, String title, String author, int published_year, String isbn, int copies) {

    }

}
