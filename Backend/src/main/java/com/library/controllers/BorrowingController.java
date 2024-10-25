package com.library.controllers;

import com.library.dto.BorrowingWithTitle;
import com.library.model.Books;
import com.library.model.Borrowing;
import com.library.repositories.BookRepository;
import com.library.repositories.BorrowingRepository;
import com.library.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/borrowing")
public class BorrowingController {
    @Autowired
    private BorrowingRepository borrowingRepository;

    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Borrowing> getAllBorrowings() {
        return borrowingRepository.findAll();
    }

    @GetMapping("member/{memberId}")
    public List<Borrowing> getBorrowingsByMemberId(@PathVariable int memberId) {
        return borrowingRepository.findAllByMemberId(memberId);
    }

    @GetMapping("book/{bookId}")
    public List<Borrowing> getBorrowingsByBookId(@PathVariable int bookId) {
        return borrowingRepository.findAllByBookId(bookId);
    }

    @GetMapping("/active")
    public List<BorrowingWithTitle> getActiveBorrowings() {
        List<Borrowing> borrowings = borrowingRepository.findAll();

        // Fetch title for each borrowing record
        return borrowings.stream()
                .filter(borrowing ->  borrowing.getReturnDate() == null)
                .map(borrowing -> {
            String title = bookService.getBookTitleById(borrowing.getBookId());

            return new BorrowingWithTitle(
                    borrowing.getBorrowId(),
                    borrowing.getBookId(),
                    title,
                    borrowing.getMemberId(),
                    borrowing.getBorrowDate(),
                    borrowing.getReturnDate(),
                    borrowing.getDueDate(),
                    borrowing.getLateFee()
            );


        }).collect(Collectors.toList());
    }

    @GetMapping("/inactive")
    public List<BorrowingWithTitle> getInactiveBorrowings() {
        List<Borrowing> borrowings = borrowingRepository.findAll();

        // Fetch title for each borrowing record
        return borrowings.stream()
                .filter(borrowing ->  borrowing.getReturnDate() != null)
                .map(borrowing -> {
                    String title = bookService.getBookTitleById(borrowing.getBookId());

                    return new BorrowingWithTitle(
                            borrowing.getBorrowId(),
                            borrowing.getBookId(),
                            title,
                            borrowing.getMemberId(),
                            borrowing.getBorrowDate(),
                            borrowing.getReturnDate(),
                            borrowing.getDueDate(),
                            borrowing.getLateFee()
                    );


                }).collect(Collectors.toList());
    }

    @PostMapping("/borrow")
    public ResponseEntity<String> borrowBook(
            @RequestParam Integer bookId,
            @RequestParam Integer memberId,
            @RequestParam Date borrowDate
    ) {
        try {
            borrowingRepository.borrowBook(bookId, memberId, borrowDate);
            return ResponseEntity.ok("Book borrowed successfully");
        } catch (Exception e) {
            if (e.getMessage().contains("Book not available")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Book not available");
            } else {
                System.err.println("Exception occurred while borrowing book: " + e.getMessage());
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to borrow the book");
            }
        }
    }

    @PostMapping("/return")
    public ResponseEntity<String> returnBook(
            @RequestParam Integer borrowId,
            @RequestParam Date returnDate,
            @RequestParam Double dailyFee
    ) {
        try {
            borrowingRepository.returnBook(borrowId, returnDate, dailyFee);
            return ResponseEntity.ok("Book returned successfully");
        } catch (Exception e) {
            System.err.println("Exception occurred while returning book: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to return the book");
        }
    }

}
