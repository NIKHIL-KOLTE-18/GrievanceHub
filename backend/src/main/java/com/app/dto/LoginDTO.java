package com.app.dto;

import com.app.enums.UserRoleEnum;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private Long username;
    private String password;
    private UserRoleEnum role;
}