package com.app.project.controller;

import com.app.project.dto.GrievanceStatsDTO;
import com.app.project.service.GrievanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * GrievanceController exposes REST endpoints for grievance analytics.
 * It delegates business logic to the GrievanceService.
 */
@RestController // Marks this class as a REST controller that returns JSON responses
public class GrievanceControllerNET {

    @Autowired // Injects GrievanceService bean
    private GrievanceService grievanceService;

    /**
     * API endpoint to fetch grievance statistics from the .NET microservice.
     * Example: GET http://localhost:9090/grievance/stats
     */
    @GetMapping("/grievance/stats")
    public GrievanceStatsDTO getGrievanceStats() {
        // Call the service method, which internally calls the .NET API
        return grievanceService.fetchGrievanceStats();
    }
}
