package com.app.dto;

import com.app.enums.GrievanceStatusEnum;
import lombok.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrievanceUpdateByFacultyDTO {

    @NotBlank
    private Long grievanceId;

    @NotNull
    private Long facultyAssigned;

    @NotBlank
    private String remark;

    @NotNull
    private GrievanceStatusEnum status;
}
