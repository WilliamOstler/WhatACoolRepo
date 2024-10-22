package com.library;

import com.library.model.Books;
import com.library.util.HibernateUtil;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

import java.util.List;

import static java.lang.System.out;

public class Main {
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

            // now lets pull events from the database and list them
            sessionFactory.inTransaction(session -> {
                session.createSelectionQuery("from books",  Books.class).getResultList()
                        .forEach(book -> out.println(book.getTitle()));
            });
        }
        catch (Exception e) {
            // The registry would be destroyed by the SessionFactory, but we
            // had trouble building the SessionFactory so destroy it manually.
            StandardServiceRegistryBuilder.destroy(registry);
        } finally {
            if ( sessionFactory != null ) {
                sessionFactory.close();
            }
        }
    }

}
