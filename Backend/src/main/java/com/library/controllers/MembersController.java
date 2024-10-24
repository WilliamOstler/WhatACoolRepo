package com.library.controllers;

import com.library.model.Books;
import com.library.model.Members;
import com.library.repositories.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MembersController {

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public List<Members> getAllBooks() {
        return memberRepository.findAll();
    }

    @GetMapping("/{id}")
    public Members getMemberById(@PathVariable Long id) {
        return memberRepository.findById(id).orElse(new Members()); // Todo: Needs Changing to exception
    }



}
