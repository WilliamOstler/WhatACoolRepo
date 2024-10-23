package com.library;

import com.library.DAO.BooksDao;
import com.library.model.Books;
import com.library.util.HibernateUtil;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.query.MutationQuery;
import org.hibernate.query.NativeQuery;

import java.awt.print.Book;
import java.util.List;

import static java.lang.System.out;

public class Main {

    SessionFactory sessionFactory = null;

    protected void setUp() {
        // A SessionFactory is set up once for an application!
        final StandardServiceRegistry registry =
                new StandardServiceRegistryBuilder()
                        .build();
        try {
            sessionFactory =
                    new MetadataSources(registry)
                            .addAnnotatedClass(Books.class)
                            .buildMetadata()
                            .buildSessionFactory();
        }
        catch (Exception e) {
            // The registry would be destroyed by the SessionFactory, but we
            // had trouble building the SessionFactory so destroy it manually.
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }
    public static void main(String[] args) {
        SessionFactory sessionFactory = null;

        final StandardServiceRegistry registry =
                new StandardServiceRegistryBuilder()
                        .build();
        try {
            sessionFactory =
                    new MetadataSources(registry)
                            .addAnnotatedClass(Books.class)
                            .buildMetadata()
                            .buildSessionFactory();

            out.println("Success");

            BooksDao booksDao = new BooksDao(sessionFactory);

            booksDao.insertBook("Clean Code", "Robert C. Martin", 2008, "978-0132350884", 15);


            booksDao.getAllBooks().forEach(book -> out.println(book.toString()));


        }
        catch (Exception e) {
            // The registry would be destroyed by the SessionFactory, but we
            // had trouble building the SessionFactory so destroy it manually.
            StandardServiceRegistryBuilder.destroy(registry);

            out.println(e);
        } finally {


        }


//        final StandardServiceRegistry registry =
//                new StandardServiceRegistryBuilder()
//                        .build();
//        try {
//            sessionFactory =
//                    new MetadataSources(registry)
//                            .addAnnotatedClass(Books.class)
//                            .buildMetadata()
//                            .buildSessionFactory();
//
//            // now lets pull events from the database and list them
//            sessionFactory.inTransaction(session -> {
//                session.createSelectionQuery("from books",  Books.class).getResultList()
//                        .forEach(book -> out.println(book.getTitle()));
//            });
//        }
//        catch (Exception e) {
//            // The registry would be destroyed by the SessionFactory, but we
//            // had trouble building the SessionFactory so destroy it manually.
//            StandardServiceRegistryBuilder.destroy(registry);
//        } finally {
//            if ( sessionFactory != null ) {
//                sessionFactory.close();
//            }
//        }
    }

}
