package com.library.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Primary
@Configuration
public class WebSecurityConfig {

    @Bean(name = "customSecurityFilterChain")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and()
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/**").permitAll()  // Allow all requests
                        .anyRequest().authenticated());  // All other requests need authentication

        return http.build();
    }

    // This will be used for custom CORS settings
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        // Explicitly list allowed origins
        config.addAllowedOrigin("http://localhost:3000");  // Your frontend URL
        config.addAllowedOrigin("http://35.210.27.73");    // Your production backend IP
        config.addAllowedOrigin("http://35.210.27.73:80");
        config.addAllowedOrigin("http://35.210.27.73:3000");
        config.addAllowedOrigin("http://35.210.27.73:8080");

        // Or use allowedOriginPatterns for pattern matching (if necessary)
        // config.addAllowedOriginPattern("http://*.yourdomain.com");

        config.addAllowedHeader("*");
        config.addAllowedMethod(HttpMethod.GET);
        config.addAllowedMethod(HttpMethod.POST);
        config.addAllowedMethod(HttpMethod.PUT);
        config.addAllowedMethod(HttpMethod.DELETE);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);

    }
}
