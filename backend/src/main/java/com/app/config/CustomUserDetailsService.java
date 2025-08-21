package com.app.config;

import com.app.entity.User;
import com.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("CustomUserDetailsService.loadUserByUsername called with username: " + username);
        
        // Convert String username to Long for database lookup
        Long prnNo;
        try {
            prnNo = Long.parseLong(username);
            System.out.println("Converted username to PRN: " + prnNo);
        } catch (NumberFormatException e) {
            System.err.println("Invalid username format: " + username);
            throw new UsernameNotFoundException("Invalid username format: " + username);
        }
        
        User user = userRepository.findById(prnNo)
                .orElseThrow(() -> {
                    System.err.println("User not found for PRN: " + prnNo);
                    return new UsernameNotFoundException("User not found: " + username);
                });

        System.out.println("User found in CustomUserDetailsService: " + user.getFullname() + ", role: " + user.getRole());

        // Convert our UserRole enum to Spring Security role format
        String role = "ROLE_" + user.getRole().name();
        System.out.println("Spring Security role: " + role);

        return org.springframework.security.core.userdetails.User.builder()
                .username(String.valueOf(user.getUsername())) // Convert Long to String
                .password(user.getPassword())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority(role)))
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
