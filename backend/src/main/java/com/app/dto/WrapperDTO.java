package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WrapperDTO {

    @JsonProperty("Grievance") // exact same casing as .NET expects
    private GrievanceResponseDTO grievance;

    public GrievanceResponseDTO getGrievance() {
        return grievance;
    }

    public void setGrievance(GrievanceResponseDTO grievance) {
        this.grievance = grievance;
    }
}
