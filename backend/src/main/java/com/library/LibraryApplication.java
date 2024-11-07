package com.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
public class LibraryApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        // Customize the application or call application.sources(...) to add sources
        // Since our example is itself a @Configuration class (through
        // @SpringBootApplication)
        // we actually do not need to override this method.
        return application;
    }

    public static void main(String[] args) {
        SpringApplication.run(LibraryApplication.class, args);
    }
//    public static void main(String[] args) {


        //        SessionFactory bookSessionFactory = null;
//        SessionFactory membersSessionFactory = null;
//        SessionFactory borrowingSessionFactory = null;
//        out.println("here");
//        try {
//            final StandardServiceRegistry registry =
//                    new StandardServiceRegistryBuilder()
//                            .build();
//            try {
//                bookSessionFactory =
//                        new MetadataSources(registry)
//                                .addAnnotatedClass(Books.class)
//                                .buildMetadata()
//                                .buildSessionFactory();
//
//                out.println("Success");
//
//                BooksDao booksDao = new BooksDao(bookSessionFactory);
//
//                booksDao.insertBook("Clean Code", "Robert C. Martin", 2008, "978-0132350884", 15);
//
//
//                booksDao.getAllBooks().forEach(book -> out.println(book.toString()));
//
//
//            } catch (Exception e) {
//                // The registry would be destroyed by the SessionFactory, but we
//                // had trouble building the SessionFactory so destroy it manually.
//                StandardServiceRegistryBuilder.destroy(registry);
//
//                out.println(e);
//            }
//
//            try {
//                membersSessionFactory =
//                        new MetadataSources(registry)
//                                .addAnnotatedClass(Members.class)
//                                .buildMetadata()
//                                .buildSessionFactory();
//                out.println("Success");
//
//                MembersDAO membersDAO = new MembersDAO(membersSessionFactory);
//
//                membersDAO.insertMember("John", "Doe", Date.valueOf("1990-01-01"), "john.doe@example.com", "1234567890");
//
//                membersDAO.getAllMembers().forEach(member -> {
//                    out.println(member.toString());
//                });
//            } catch (Exception e) {
//                // The registry would be destroyed by the SessionFactory, but we
//                // had trouble building the SessionFactory so destroy it manually.
//                StandardServiceRegistryBuilder.destroy(registry);
//
//                out.println(e);
//            }
//
//            try {
//                borrowingSessionFactory =
//                        new MetadataSources(registry)
//                                .addAnnotatedClass(Borrowing.class)
//                                .buildMetadata()
//                                .buildSessionFactory();
//
//                out.println("Success");
//
//                BorrowingDAO borrowingDAO = new BorrowingDAO(borrowingSessionFactory);
//
////                borrowingDAO.borrowBook(1, 1, Date.valueOf(LocalDate.now()));
//                borrowingDAO.returnBook(1, Date.valueOf(LocalDate.now()), BigDecimal.valueOf(0.5));
//
//                borrowingDAO.getAllMembers().forEach(borrowing -> {
//                    out.println(borrowing.toString());
//                });
//            } catch (Exception e) {
//                // The registry would be destroyed by the SessionFactory, but we
//                // had trouble building the SessionFactory so destroy it manually.
//                StandardServiceRegistryBuilder.destroy(registry);
//                out.println("OOpsie");
//                out.println(e);
//            }
//        } catch (Exception e) {
//            out.println("whatt");
//        }
//
//


//    }

}
