package com.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Primary
@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()  // Allow all GET requests to /api/*
                .requestMatchers(HttpMethod.POST, "/api/**").permitAll() // Allow all POST requests to /api/*
                .requestMatchers(HttpMethod.PUT, "/api/**").permitAll()  // Allow all PUT requests to /api/*
                .requestMatchers(HttpMethod.DELETE, "/api/**").permitAll() // Allow all DELETE requests to /api/*
                .anyRequest().permitAll() // Allow any other requests
                .and()
                .csrf().disable()  // Disable CSRF protection for APIs
                .httpBasic();  // Use basic authentication (if necessary)

        return http.build();
    }
}
