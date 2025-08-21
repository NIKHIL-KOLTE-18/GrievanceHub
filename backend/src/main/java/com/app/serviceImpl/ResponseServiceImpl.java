package com.app.serviceImpl;




import com.app.dto.ResponseDTO;
import com.app.entity.Faculty;
import com.app.entity.Grievance;
import com.app.entity.Response;
import com.app.repository.FacultyRepository;
import com.app.repository.GrievanceRepository;
import com.app.repository.ResponseRepository;
import com.app.service.ResponseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResponseServiceImpl implements ResponseService {

    @Autowired
    private ResponseRepository responseRepo;

    @Autowired
    private FacultyRepository facultyRepo;

    @Autowired
    private GrievanceRepository grievanceRepo;

//    @Autowired

    @Override
    public Response createResponse(ResponseDTO dto) {
        Response response = new Response();

        Faculty faculty = facultyRepo.findById(dto.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
        Grievance grievance = grievanceRepo.findById(dto.getGrievanceId())
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        response.setGrievance(grievance);
        response.setResponder(faculty);
        response.setResponseText(dto.getResponseText());
        response.setRespondedAt(LocalDateTime.now());
        response.setStatus(dto.getStatus());

        return responseRepo.save(response);
    }

    @Override
    public List<Response> getAllResponses() {
        return responseRepo.findAll();
    }

    @Override
    public Response getResponseById(Long id) {
        return responseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Response not found"));
    }
}
