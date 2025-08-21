package com.app.service;

import com.app.dto.FacultyCreateDTO;
import com.app.dto.FacultyResponseDTO;

import java.util.List;

public interface FacultyService {
    FacultyResponseDTO createFaculty(FacultyCreateDTO dto);
    FacultyResponseDTO getFacultyById(Long id);
    List<FacultyResponseDTO> getAllFaculties();
    void deleteFacultyById(Long id);
}
