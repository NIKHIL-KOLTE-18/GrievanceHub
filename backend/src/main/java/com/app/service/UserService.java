package com.app.service;


import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;

public interface UserService {
    String registerUser(UserDTO dto);
    String loginUser(LoginDTO dto);
}