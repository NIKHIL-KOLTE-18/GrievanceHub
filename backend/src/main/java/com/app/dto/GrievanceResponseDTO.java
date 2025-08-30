package com.app.dto;

import com.app.enums.GrievanceStatusEnum;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

//Full response sent to frontend (e.g., to show in dashboard for Student or Faculty)


public class GrievanceResponseDTO {

    private Long grievanceId;

    private String title;

    private String description;

    private String attachmentPath;

    private Long studentId;

    private String studentName;   // from student entity

    private String department;

    private String year;

    private Long categoryId;

    private String categoryName;

// ...existing code...
    @JsonProperty("FacultyId")
    private Long facultyAssigned;   // Faculty id
    
    private String facultyName;
    
    private Long subCategoryId;

    private String remark;

    private GrievanceStatusEnum status;

    private LocalDate submittedDate;

    private LocalDate lastUpdatedDate;
}


// Workflow:
//Faculty submits the update form →
//
//Controller receives data via GrievanceUpdateByFacultyDTO →
//
//Service layer updates the corresponding Grievance entity →
//
//Changes are persisted in the grievances table (in DB).
