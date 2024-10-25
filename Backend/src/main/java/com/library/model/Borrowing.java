package com.library.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Formatter;

@NamedStoredProcedureQuery(
        name = "BorrowBook",
        procedureName = "BorrowBook",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_book_id", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_member_id", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_borrow_date", type = Date.class)
        }
)
@NamedStoredProcedureQuery(
        name = "ReturnBook",
        procedureName = "ReturnBook",
        parameters = {
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_borrow_id", type = Integer.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_return_date", type = Date.class),
                @StoredProcedureParameter(mode = ParameterMode.IN, name = "p_daily_fee", type = Double.class)
        }
)
@Entity
@Table(name = "borrowing")
public class Borrowing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "borrow_id")
    private int borrowId;

    @Column(name = "book_id", nullable = false)
    private int bookId;

    @Column(name = "member_id", nullable = false)
    private int memberId;

    @Column(name = "borrow_date", nullable = false)
    private Date borrowDate;

    @Column(name = "return_date")
    private Date returnDate;

    @Column(name = "late_fee", precision = 10, scale = 2)
    private BigDecimal lateFee;

    @Column(name = "due_date", nullable = false)
    private Date dueDate;

//    @ManyToOne
////    @JoinColumn(name = "book_id", foreignKey = @ForeignKey(name = "BOOK_FK"))
//    private Books book;
//
//    @ManyToOne
////    @JoinColumn(name = "member_id", foreignKey = @ForeignKey(name = "MEMBER_FK"))
//    private Members member;
//
//    // Getters and Setters

    public int getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(int borrowId) {
        this.borrowId = borrowId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }

    public BigDecimal getLateFee() {
        return lateFee;
    }

    public void setLateFee(BigDecimal lateFee) {
        this.lateFee = lateFee;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

//    public Books getBook() {
//        return book;
//    }

//    public Members getMember() {
//        return member;
//    }

    @Override
    public String toString() {
        return "Borrowing{" +
                "borrowId=" + borrowId +
                ", bookId=" + bookId +
                ", memberId=" + memberId +
                ", borrowDate=" + borrowDate +
                ", returnDate=" + returnDate +
                ", lateFee=" + lateFee +
                ", dueDate=" + dueDate +
                '}';
    }



}
