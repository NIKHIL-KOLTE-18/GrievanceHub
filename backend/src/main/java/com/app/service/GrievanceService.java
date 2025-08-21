package com.app.service;

import com.app.dto.GrievanceCreateDTO;
import com.app.dto.GrievanceResponseDTO;
import com.app.dto.GrievanceUpdateByFacultyDTO;

import java.util.List;

public interface GrievanceService {

    GrievanceResponseDTO createGrievance(GrievanceCreateDTO dto);

    GrievanceResponseDTO updateGrievanceByFaculty(Long id, GrievanceUpdateByFacultyDTO dto);

    GrievanceResponseDTO getGrievanceById(Long id);

    List<GrievanceResponseDTO> getAllGrievances();

    void deleteGrievance(Long id);

    List<GrievanceResponseDTO> getGrievancesAssignedToFaculty(Long facultyId);

    void syncGrievanceToDotNet(GrievanceResponseDTO grievanceDto);

    List<GrievanceResponseDTO> getGrievancesByStudent(Long prnNo);
}
