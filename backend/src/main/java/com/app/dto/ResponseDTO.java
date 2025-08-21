package com.app.dto;

import com.app.enums.ResponseStatusEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;



@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class ResponseDTO {

    private Long grievanceId;
    private Long facultyId;
    private String responseText;
    private LocalDateTime respondedAt;
    private ResponseStatusEnum status;

    
}
