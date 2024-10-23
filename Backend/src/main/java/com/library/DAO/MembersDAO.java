package com.library.DAO;

import com.library.model.Members;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class MembersDAO {

    private final SessionFactory sessionFactory;

    public MembersDAO (SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void insertMember(String firstName, String lastName, Date dateOfBirth, String email, String phone) {
        Session session = sessionFactory.openSession();

        try {
            Transaction transaction = session.beginTransaction();
            NativeQuery<?> query = session.createNativeQuery("CALL AddNewMember(:firstName, :lastName, :dateOfBirth, :email, :phone)");
            query.setParameter("firstName", firstName);
            query.setParameter("lastName", lastName);
            query.setParameter("dateOfBirth", dateOfBirth);
            query.setParameter("email", email);
            query.setParameter("phone", phone);
            query.executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            System.out.println("Exception Thrown: " + e.getMessage());
        } finally {
            session.close();
        }
    }

    public List<Members> getAllMembers() {
        List<Members> list = new ArrayList<>();
        Session session = sessionFactory.openSession();

        try {
            list = session.createSelectionQuery("from Members", Members.class)
                    .getResultList();
        } catch (Exception e) {
            System.out.println("Exception "+ e);
        } finally {
            session.close();
        }

        return list;
    }

}
