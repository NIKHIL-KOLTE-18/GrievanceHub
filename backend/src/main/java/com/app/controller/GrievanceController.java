package com.app.controller;

import com.app.dto.GrievanceCreateDTO;
import com.app.dto.GrievanceResponseDTO;
import com.app.dto.GrievanceUpdateByFacultyDTO;
import com.app.service.GrievanceService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/grievances")
@RequiredArgsConstructor
public class GrievanceController {

    private final GrievanceService grievanceService;

    /**
     * Create a new grievance (by student)
     * Accepts JSON grievance details only (no file upload)
     */
    @PostMapping("")
    public ResponseEntity<GrievanceResponseDTO> createGrievance(
            @Valid @RequestBody GrievanceCreateDTO grievanceDTO) {

        GrievanceResponseDTO savedGrievance = grievanceService.createGrievance(grievanceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGrievance);
    }

    @GetMapping
    public ResponseEntity<List<GrievanceResponseDTO>> getAllGrievances() {
        return ResponseEntity.ok(grievanceService.getAllGrievances());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrievanceResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(grievanceService.getGrievanceById(id));
    }

    @PutMapping("/{id}/faculty-update")
    public ResponseEntity<GrievanceResponseDTO> updateByFaculty(
            @PathVariable Long id,
            @RequestBody GrievanceUpdateByFacultyDTO updateDTO) {

        GrievanceResponseDTO updated = grievanceService.updateGrievanceByFaculty(id, updateDTO);
//        grievanceService.syncGrievanceToDotNet(updated);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<GrievanceResponseDTO>> getGrievancesByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(grievanceService.getGrievancesByStudent(studentId));
    }

    @GetMapping("/faculty/{facultyId}")
    public ResponseEntity<List<GrievanceResponseDTO>> getGrievancesForFaculty(@PathVariable Long facultyId) {
        return ResponseEntity.ok(grievanceService.getGrievancesAssignedToFaculty(facultyId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGrievance(@PathVariable Long id) {
        grievanceService.deleteGrievance(id);
        return ResponseEntity.noContent().build();
    }

}
