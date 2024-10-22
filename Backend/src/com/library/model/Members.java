package com.library.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "members")
public class Members {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_of_birth", nullable = false)
    private Date date_of_birth;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "first_name", nullable = false)
    private String first_name;

    @Column(name = "last_name", nullable = false)
    private String last_name;

    @Column(name = "phone", nullable = false)
    private String phone;



    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateOfBirth() {
        return date_of_birth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.date_of_birth = dateOfBirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String Email) {
        this.email = Email;
    }

    public String getFirstName() {
        return first_name;
    }

    public void setFirstName(String firstName) {
        this.first_name = firstName;
    }

    public String getLastName() {
        return last_name;
    }

    public void setLastName(String lastName) {
        this.last_name = lastName;
    }

    public String getPhoneNumber() {
        return phone;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phone = phoneNumber;
    }

}