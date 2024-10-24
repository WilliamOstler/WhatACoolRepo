package com.library.repositories;

import com.library.model.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Books, Long> {

    @Procedure(name = "AddNewBook")
    void addNewBook(
            @Param("p_title") String title,
            @Param("p_author") String author,
            @Param("p_published_year") Integer publishedYear,
            @Param("p_isbn") String isbn,
            @Param("p_copies") Integer copies
    );

}
