package com.app.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GrievanceStatsDTO {

    @JsonProperty("openGrievances")
    private int openGrievances;

    @JsonProperty("pendingGrievances")
    private int pendingGrievances;

    @JsonProperty("closedGrievances")
    private int closedGrievances;  

    @JsonProperty("totalGrievances")
    private int totalGrievances;
}
