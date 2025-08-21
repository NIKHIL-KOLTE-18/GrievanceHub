package com.app.controller;

import com.app.repository.StudentRepository;
import com.app.repository.FacultyRepository;
import com.app.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private GrievanceRepository grievanceRepository;

    @GetMapping("/home")
    public ResponseEntity<Map<String, Object>> getHomeStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Get actual counts from repositories
        long totalStudents = studentRepository.count();
        long totalFaculty = facultyRepository.count();
        long totalGrievances = grievanceRepository.count();
        
        // Get detailed grievance statistics
        long resolvedGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "RESOLVED".equals(g.getStatus().toString()))
                .count();
        
        long pendingGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "PENDING".equals(g.getStatus().toString()))
                .count();
        
        long inProgressGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "IN_PROGRESS".equals(g.getStatus().toString()))
                .count();
        
        long rejectedGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "REJECTED".equals(g.getStatus().toString()))
                .count();
        
        // Calculate resolution rate
        double resolutionRate = totalGrievances > 0 ? (double) resolvedGrievances / totalGrievances * 100 : 0;
        
        stats.put("totalStudents", totalStudents);
        stats.put("totalFaculty", totalFaculty);
        stats.put("totalGrievances", totalGrievances);
        stats.put("resolvedGrievances", resolvedGrievances);
        stats.put("pendingGrievances", pendingGrievances);
        stats.put("inProgressGrievances", inProgressGrievances);
        stats.put("rejectedGrievances", rejectedGrievances);
        stats.put("resolutionRate", Math.round(resolutionRate * 100.0) / 100.0); // Round to 2 decimal places
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        // Get basic counts
        long totalStudents = studentRepository.count();
        long totalFaculty = facultyRepository.count();
        long totalGrievances = grievanceRepository.count();
        
        // Get grievance status breakdown
        long resolvedGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "RESOLVED".equals(g.getStatus().toString()))
                .count();
        
        long pendingGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "PENDING".equals(g.getStatus().toString()))
                .count();
        
        long inProgressGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "IN_PROGRESS".equals(g.getStatus().toString()))
                .count();
        
        long rejectedGrievances = grievanceRepository.findAll().stream()
                .filter(g -> "REJECTED".equals(g.getStatus().toString()))
                .count();
        
        stats.put("totalStudents", totalStudents);
        stats.put("totalFaculty", totalFaculty);
        stats.put("totalGrievances", totalGrievances);
        stats.put("resolvedGrievances", resolvedGrievances);
        stats.put("pendingGrievances", pendingGrievances);
        stats.put("inProgressGrievances", inProgressGrievances);
        stats.put("rejectedGrievances", rejectedGrievances);
        
        return ResponseEntity.ok(stats);
    }
}
