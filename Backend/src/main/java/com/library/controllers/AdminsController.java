package com.library.controllers;


import com.library.model.Admins;
import com.library.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.Optional;

@RestController
@RequestMapping("api/admins")
public class AdminsController {

    @Autowired
    private AdminRepository adminRepository;

    // DTO for login request
    public static class AdminLoginRequest {
        private String username;
        private String password;

        // Getters and Setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    @PostMapping("/add")
    public ResponseEntity<String> addAdmin(@RequestBody Admins admin) {
        // Optional: You may want to check if the username already exists
        if (adminRepository.findByUsername(admin.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Admin with this username already exists");
        }

        // Save the new admin to the database
        adminRepository.save(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin added successfully");
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLoginRequest loginRequest) {
        // Find admin by username
        Optional<Admins> adminOpt = adminRepository.findByUsername(loginRequest.getUsername());

        // Validate admin existence and password
        if (adminOpt.isPresent()) {
            Admins admin = adminOpt.get();
            // Check if the provided password matches (assuming a method for password validation)
            if (admin.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok("Login successful");
            } else {
                return ResponseEntity.status(401).body("Invalid password");
            }
        } else {
            return ResponseEntity.status(404).body("Admin not found");
        }
    }


}
