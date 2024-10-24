package com.library.repositories;

import com.library.model.Borrowing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface BorrowingRepository extends JpaRepository<Borrowing, Integer> {

    @Procedure(name = "BorrowBook")
    void borrowBook(
            @Param("p_book_id") Integer bookId,
            @Param("p_member_id") Integer memberId,
            @Param("p_borrow_date") Date borrowDate
    );

    @Procedure(name = "ReturnBook")
    void returnBook(
            @Param("p_borrow_id") Integer borrowId,
            @Param("p_return_date") Date returnDate,
            @Param("p_daily_fee") Double dailyFee
    );


    List<Borrowing> findAllByMemberId(int memberId);

    List<Borrowing> findAllByBookId(int bookId);
}