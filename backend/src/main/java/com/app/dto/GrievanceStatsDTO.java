package com.app.dto;



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

}