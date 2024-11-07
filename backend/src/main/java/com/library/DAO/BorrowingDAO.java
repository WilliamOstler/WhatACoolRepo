package com.library.DAO;

import com.library.model.Borrowing;
import com.library.model.Members;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class BorrowingDAO {
    SessionFactory sessionFactory = null;

    public BorrowingDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void borrowBook(int bookId, int memberId, Date borrowDate) {
        Session session = sessionFactory.openSession();

        try {
            Transaction transaction = session.beginTransaction();
            NativeQuery<?> query = session.createNativeQuery("CALL BorrowBook(:bookId, :memberId, :borrowDate)");
            query.setParameter("bookId", bookId);
            query.setParameter("memberId", memberId);
            query.setParameter("borrowDate", borrowDate);
            query.executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            System.out.println("Exception Thrown: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    public void returnBook(int borrowId, Date returnDate, BigDecimal dailyFee) {
        Session session = sessionFactory.openSession();

        try {
            Transaction transaction = session.beginTransaction();
            NativeQuery<?> query = session.createNativeQuery("CALL ReturnBook(:borrowId, :returnDate, :dailyFee)");
            query.setParameter("borrowId", borrowId);
            query.setParameter("returnDate", returnDate);
            query.setParameter("dailyFee", dailyFee);
            query.executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            System.out.println("Exception Thrown: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    public List<Borrowing> getAllMembers() {
        List<Borrowing> list = new ArrayList<>();
        Session session = sessionFactory.openSession();

        try {
            list = session.createSelectionQuery("from Borrowing", Borrowing.class)
                    .getResultList();
        } catch (Exception e) {
            System.out.println("Exception "+ e);
        } finally {
            session.close();
        }

        return list;
    }


}
