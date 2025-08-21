package com.app.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BootstrapData {

    @Bean
    CommandLineRunner seedUsers() {
        return args -> {
            // User seeding is now handled by data.sql
            System.out.println("Bootstrap data initialization completed.");
        };
    }
}


