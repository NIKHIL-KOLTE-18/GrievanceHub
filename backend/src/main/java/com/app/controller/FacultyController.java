package com.app.controller;

import com.app.dto.FacultyCreateDTO;
import com.app.dto.FacultyResponseDTO;
import com.app.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    // Create a new Faculty
    @PostMapping
    public ResponseEntity<FacultyResponseDTO> createFaculty(@RequestBody FacultyCreateDTO dto) {
        FacultyResponseDTO createdFaculty = facultyService.createFaculty(dto);
        return ResponseEntity.ok(createdFaculty);
    }

    // Get Faculty by ID
    @GetMapping("/{id}")
    public ResponseEntity<FacultyResponseDTO> getFacultyById(@PathVariable Long id) {
        FacultyResponseDTO faculty = facultyService.getFacultyById(id);
        return ResponseEntity.ok(faculty);
    }

    // Get all Faculties
    @GetMapping
    public ResponseEntity<List<FacultyResponseDTO>> getAllFaculties() {
        List<FacultyResponseDTO> faculties = facultyService.getAllFaculties();
        return ResponseEntity.ok(faculties);
    }

    // Delete Faculty by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFacultyById(id);
        return ResponseEntity.ok("Faculty deleted successfully.");
    }
}
