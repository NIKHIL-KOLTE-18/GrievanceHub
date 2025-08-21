package com.app.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacultyCreateDTO {
    private Long id;
    private String fullName;
    private String department;
    private String designation;
    private String email;
    private String phone;
    private String address;
    private String photoUrl;
    private String category;
    private String subcategory;
    private String expertise;
}
