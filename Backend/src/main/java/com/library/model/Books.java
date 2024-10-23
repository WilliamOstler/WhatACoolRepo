package com.library.model;

import jakarta.persistence.*;

@NamedStoredProcedureQuery(
        name="AddNewBook",
        procedureName = "AddNewBook"
)
@Entity
@Table(name = "Books")
public class Books {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "published_year")
    private int published_year;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "copies")
    private int copies;


    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public int getPublished_year() {
        return published_year;
    }
    public void setPublished_year(int published_year) {
        this.published_year = published_year;
    }
    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public int getCopies() {
        return copies;
    }
    public void setCopies(int copies) {
        this.copies = copies;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", published_year=" + published_year +
                ", isbn='" + isbn + '\'' +
                ", copies=" + copies +
                '}';
    }

}