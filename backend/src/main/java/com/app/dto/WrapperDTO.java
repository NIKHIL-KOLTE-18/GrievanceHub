package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WrapperDTO {

<<<<<<< HEAD:backend/CollegeGrievance-Portal/src/main/java/com/app/dto/WrapperDTO.java
    @JsonProperty("Grievance")
=======
    @JsonProperty("Grievance") // exact same casing as .NET expects
>>>>>>> 66cf20a (added code in backend and frontend):backend/src/main/java/com/app/dto/WrapperDTO.java
    private GrievanceResponseDTO grievance;

    public GrievanceResponseDTO getGrievance() {
        return grievance;
    }

    public void setGrievance(GrievanceResponseDTO grievance) {
        this.grievance = grievance;
    }
}
