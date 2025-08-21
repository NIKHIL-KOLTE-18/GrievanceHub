package com.app.controller;

import com.app.project.client.DotNetApiClient;
import com.app.repository.GrievanceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/system")
public class SystemStatusController {

    private final DotNetApiClient dotNetApiClient;
    private final GrievanceRepository grievanceRepository;

    public SystemStatusController(DotNetApiClient dotNetApiClient,
                                  GrievanceRepository grievanceRepository) {
        this.dotNetApiClient = dotNetApiClient;
        this.grievanceRepository = grievanceRepository;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();

        // Spring Boot is up if this endpoint returned
        status.put("springBootUp", true);

        // DB check
        try {
            grievanceRepository.count();
            status.put("databaseUp", true);
        } catch (Exception e) {
            status.put("databaseUp", false);
        }

        // .NET check
        try {
            dotNetApiClient.getGrievanceStats();
            status.put("dotNetUp", true);
        } catch (Exception ex) {
            status.put("dotNetUp", false);
        }

        return ResponseEntity.ok(status);
    }
}


