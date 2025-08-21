package com.app.dto;

<<<<<<< HEAD:backend/CollegeGrievance-Portal/src/main/java/com/app/dto/GrievanceStatsDTO.java

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class GrievanceStatsDTO {
    private int totalGrievances;
    private int pendingCount;
    private int inProgressCount;
    private int resolvedCount;
    private int rejectedCount;
    
    //Must match JSON property names from .NET
=======
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data // Generates getters, setters, toString, equals, hashCode
@Schema(description = "DTO for grievance statistics returned from .NET analytics service")
public class GrievanceStatsDTO {

    @Schema(description = "Total number of grievances synced", example = "5")
    private int totalGrievances;

    @Schema(description = "Number of grievances with status OPEN", example = "2")
    private int open;

    @Schema(description = "Number of grievances with status PENDING", example = "1")
    private int pending;

    @Schema(description = "Number of grievances with status RESOLVED", example = "2")
    private int resolved;
>>>>>>> 66cf20a (added code in backend and frontend):backend/src/main/java/com/app/dto/GrievanceStatsDTO.java
}
