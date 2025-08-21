package com.app.serviceImpl;

import com.app.dto.FacultyCreateDTO;
import com.app.dto.FacultyResponseDTO;
import com.app.entity.Faculty;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.FacultyRepository;
import com.app.service.FacultyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public FacultyResponseDTO createFaculty(FacultyCreateDTO dto) {
        Faculty faculty = modelMapper.map(dto, Faculty.class);
        Faculty saved = facultyRepository.save(faculty);
        return modelMapper.map(saved, FacultyResponseDTO.class);
    }

    @Override
    public FacultyResponseDTO getFacultyById(Long id) {
        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found with id: " + id));
        return modelMapper.map(faculty, FacultyResponseDTO.class);
    }

    @Override
    public List<FacultyResponseDTO> getAllFaculties() {
        return facultyRepository.findAll()
                .stream()
                .map(faculty -> modelMapper.map(faculty, FacultyResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFacultyById(Long id) {
//        Long facultyId = Long.parseLong(id);
        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Faculty not found with id: " + id));
        facultyRepository.delete(faculty);
    }
}
