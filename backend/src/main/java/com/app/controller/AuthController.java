package com.app.controller;

import com.app.dto.LoginDTO;
import com.app.dto.LoginRequest;
import com.app.dto.UserDTO;
import com.app.entity.User;
import com.app.repository.UserRepository;
import com.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt received for PRN: " + loginRequest.getPrnNo());
            System.out.println("Role: " + loginRequest.getRole());
            
            // Create authentication token using prnNo as username
            UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(
                    String.valueOf(loginRequest.getPrnNo()), 
                    loginRequest.getPassword()
                );

            System.out.println("Authentication token created, attempting authentication...");

            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(authToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            System.out.println("Authentication successful, creating login DTO...");

            // Get user details
            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setUsername(loginRequest.getPrnNo()); // Use Long directly
            loginDTO.setPassword(loginRequest.getPassword());
            loginDTO.setRole(loginRequest.getRole());

            System.out.println("Calling userService.loginUser...");

            String result = userService.loginUser(loginDTO);

            System.out.println("Login result: " + result);

            Map<String, Object> response = new HashMap<>();
            response.put("message", result);
            response.put("username", String.valueOf(loginRequest.getPrnNo()));
            response.put("role", loginRequest.getRole());
            response.put("authenticated", true);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Login failed with exception: " + e.getMessage());
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Authentication failed: " + e.getMessage());
            response.put("authenticated", false);
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            String result = userService.registerUser(userDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", result);
            response.put("success", true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration failed: " + e.getMessage());
            response.put("success", false);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.clearContext();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        
        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getName())) {
            response.put("authenticated", true);
            response.put("username", authentication.getName());
            response.put("authorities", authentication.getAuthorities());
        } else {
            response.put("authenticated", false);
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAuthentication() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("username", auth.getName());
            response.put("authorities", auth.getAuthorities().stream()
                .map(Object::toString)
                .collect(Collectors.toList()));
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", false);
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testConnection() {
        try {
            // Test if we can find the admin user
            Optional<User> adminUser = userRepository.findById(9999999999L);
            if (adminUser.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Database connection successful");
                response.put("adminUser", adminUser.get().getFullname());
                response.put("adminRole", adminUser.get().getRole());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Database connected but admin user not found");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Database connection failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
