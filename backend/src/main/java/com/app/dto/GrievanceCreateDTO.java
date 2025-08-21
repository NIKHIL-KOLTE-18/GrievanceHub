package com.app.dto;

import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


/**
 * DTO for creating a grievance.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrievanceCreateDTO {

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category Name is required")
    private String categoryName;

    @NotBlank(message = "Sub Category Name is required")
    private String subCategoryName;

    @NotNull(message = "Student ID is required")
    private Long studentId; // Maps to prn_no in DB
}
