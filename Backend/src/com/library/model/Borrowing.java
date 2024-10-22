package com.library.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "borrowing")
public class Borrowing {

    @id
    private int borrowId;


}
