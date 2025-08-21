package com.app.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.entity.User;
import com.app.repository.UserRepository;
import com.app.service.UserService;

import org.modelmapper.ModelMapper;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper mapper;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public String registerUser(UserDTO dto) {
        if (userRepo.existsById(dto.getUsername())) {
            return "User already exists";
        }
        User user = mapper.map(dto, User.class);
        user.setPassword(encoder.encode(dto.getPassword()));
        userRepo.save(user);
        return "User registered successfully";
    }

    @Override
    public String loginUser(LoginDTO dto) {
        System.out.println("UserServiceImpl.loginUser called with username: " + dto.getUsername() + ", role: " + dto.getRole());
        
        // Use the Long username directly since LoginDTO now has Long username
        Optional<User> optionalUser = userRepo.findByUsernameAndRole(dto.getUsername(), dto.getRole());
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println("User found: " + user.getFullname() + ", role: " + user.getRole());
            
            if (encoder.matches(dto.getPassword(), user.getPassword())) {
                System.out.println("Password matches successfully");
                return switch (user.getRole()) {
                    case STUDENT -> "Redirecting to Student Page";
                    case FACULTY -> "Redirecting to Faculty Page";
                    case ADMIN -> "Redirecting to Admin Page";
                };
            } else {
                System.out.println("Password does not match");
            }
        } else {
            System.out.println("User not found for username: " + dto.getUsername() + " and role: " + dto.getRole());
        }
        return "Invalid credentials";
    }
}
