package com.app.dto;

import com.app.enums.UserRoleEnum;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long username;
    private String fullName;
    private String password;
    private String email;
    private UserRoleEnum role;
}

//To registerUser