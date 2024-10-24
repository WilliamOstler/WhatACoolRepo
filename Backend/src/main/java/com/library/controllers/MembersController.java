package com.library.controllers;

import com.library.model.Books;
import com.library.model.Members;
import com.library.repositories.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.Date;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}/name")
    public ResponseEntity<String> getNameById(@PathVariable int id) {
        Optional<Members> member = memberRepository.findById((long) id);
        if (member.isPresent()) {
            return ResponseEntity.ok(member.get().getFirstName() + " " + member.get().getLastName());
        } else {
            return ResponseEntity.status(404).body("Book not found");
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addMember(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam Date dateOfBirth,
            @RequestParam String email,
            @RequestParam String phone
    ) {
        try {
            memberRepository.addNewMember(firstName, lastName, dateOfBirth, email, phone);
            return ResponseEntity.ok("Member added successfully");
        } catch (Exception e) {
            if (e.getMessage().contains("User already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
            } else {
                System.err.println("Exception occurred while adding member: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the member");
            }
        }
    }



}
