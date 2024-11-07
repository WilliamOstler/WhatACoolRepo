package com.library.DAO;

import com.library.model.Books;
import jakarta.persistence.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;

import java.util.ArrayList;
import java.util.List;

import static java.lang.System.out;

public class BooksDao {

    private final SessionFactory sessionFactory;

    public BooksDao (SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void insertBook(String title, String author, int published_year, String isbn, int copies) {
        Session session = sessionFactory.openSession();

        try {

            Transaction transaction = session.beginTransaction();
            NativeQuery<?> query = session.createNativeQuery("CALL AddNewBook(:title, :author, :publishedYear, :isbn, :copies)");
            query.setParameter("title", title);
            query.setParameter("author", author);
            query.setParameter("publishedYear", published_year);
            query.setParameter("isbn", isbn);
            query.setParameter("copies", copies);
            query.executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            System.out.println("Exception Thrown");
        }

        session.close();
    }

    public List<Books> getAllBooks() {
        List<Books> list = new ArrayList<Books>();
        Session session = sessionFactory.openSession();

        try {
             list = session.createSelectionQuery("from Books",  Books.class)
                    .getResultList();
        } catch (Exception e) {
            out.println("Exception" + e);
        }


        session.close();

        return list;
    }
}
