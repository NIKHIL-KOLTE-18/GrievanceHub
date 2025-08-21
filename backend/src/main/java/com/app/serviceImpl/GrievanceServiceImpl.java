package com.app.serviceImpl;

import com.app.dto.GrievanceCreateDTO;
import com.app.dto.GrievanceResponseDTO;
import com.app.dto.GrievanceUpdateByFacultyDTO;
import com.app.dto.WrapperDTO;
import com.app.entity.Faculty;
import com.app.entity.Grievance;
import com.app.entity.GrievanceCategory;
import com.app.entity.Student;
import com.app.entity.SubCategory;
import com.app.enums.GrievanceStatusEnum;
import com.app.exception.ResourceNotFoundException;
import com.app.project.client.DotNetApiClient;
import com.app.repository.FacultyRepository;
import com.app.repository.GrievanceCategoryRepository;
import com.app.repository.GrievanceRepository;
import com.app.repository.StudentRepository;
import com.app.repository.SubCategoryRepository;
import com.app.service.GrievanceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GrievanceServiceImpl implements GrievanceService {

    private final GrievanceRepository grievanceRepo;

    private final StudentRepository studentRepo;

    private final GrievanceCategoryRepository categoryRepo;

    private final FacultyRepository facultyRepo;

    private final ModelMapper modelMapper;

    private final SubCategoryRepository subCategoryRepo;

    private final DotNetApiClient dotNetApiClient;

    @Override
    public GrievanceResponseDTO createGrievance(GrievanceCreateDTO dto) {
        Student student = studentRepo.findById(dto.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        GrievanceCategory category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        SubCategory subCategory = subCategoryRepo
                .findByNameAndCategoryCategoryId(dto.getSubCategoryName(), dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("SubCategory not found"));

        // Find faculty by subcategory
        Faculty faculty = facultyRepo.findFirstBySubcategory(dto.getSubCategoryName())
                .orElse(null); // Allow null if no faculty found
        
        if (faculty == null) {
            System.out.println("No faculty found for subcategory: " + dto.getSubCategoryName());
            // Try to find any faculty that can handle this category
            faculty = facultyRepo.findAll().stream()
                    .filter(f -> dto.getCategoryName().equalsIgnoreCase(f.getCategory()))
                    .findFirst()
                    .orElse(null);
        }
        
        if (faculty != null) {
            System.out.println("Assigned faculty: " + faculty.getFullName() + " for subcategory: " + dto.getSubCategoryName());
        }

        Grievance grievance = new Grievance();
        grievance.setTitle(dto.getTitle());
        grievance.setDescription(dto.getDescription());
        grievance.setStudent(student);
        grievance.setCategory(category);
        grievance.setSubCategory(subCategory);
        grievance.setFacultyAssigned(faculty); // Assign faculty based on subcategory
        grievance.setSubmittedDate(LocalDate.now());
        grievance.setStatus(GrievanceStatusEnum.PENDING);

        // Save to Spring Boot DB first
        Grievance savedGrievance = grievanceRepo.save(grievance);
        System.out.println("✅ Grievance saved to Spring Boot DB with ID: " + savedGrievance.getId());

        // Create response DTO
        GrievanceResponseDTO responseDTO = new GrievanceResponseDTO();
        responseDTO.setGrievanceId(savedGrievance.getId());
        responseDTO.setTitle(savedGrievance.getTitle());
        responseDTO.setDescription(savedGrievance.getDescription());
        responseDTO.setStatus(savedGrievance.getStatus());
        responseDTO.setSubmittedDate(savedGrievance.getSubmittedDate());
        responseDTO.setLastUpdatedDate(savedGrievance.getLastUpdatedDate());
        responseDTO.setRemark(savedGrievance.getRemark());
        responseDTO.setStudentId(savedGrievance.getStudent().getPrnNo());
        responseDTO.setStudentName(savedGrievance.getStudent().getName());
        responseDTO.setDepartment(savedGrievance.getStudent().getDepartment());
        responseDTO.setYear(savedGrievance.getStudent().getYear());
        if (savedGrievance.getCategory() != null) {
            responseDTO.setCategoryId(savedGrievance.getCategory().getCategoryId());
            responseDTO.setCategoryName(savedGrievance.getCategory().getCategoryName());
        }
        if (savedGrievance.getSubCategory() != null) {
            responseDTO.setSubCategoryId(savedGrievance.getSubCategory().getId());
        }
        if (savedGrievance.getFacultyAssigned() != null) {
            responseDTO.setFacultyAssigned(savedGrievance.getFacultyAssigned().getId());
            responseDTO.setFacultyName(savedGrievance.getFacultyAssigned().getFullName());
        }

        // Sync to .NET microservice
        try {
            WrapperDTO wrapper = new WrapperDTO();
            wrapper.setGrievance(responseDTO);

            System.out.println("🔄 Syncing grievance to .NET microservice...");
            Long remoteId = dotNetApiClient.syncNewGrievanceAndGetRemoteId(wrapper);

            if (remoteId != null) {
                savedGrievance.setRemoteId(remoteId);
                grievanceRepo.save(savedGrievance);
                System.out.println("✅ Successfully synced to .NET with remote ID: " + remoteId);
            } else {
                System.err.println("❌ Failed to get remote ID from .NET service");
            }
        } catch (Exception e) {
            System.err.println("❌ Error syncing to .NET: " + e.getMessage());
            // Don't fail the operation, just log the error
        }

        return responseDTO;
    }

    @Override
    public GrievanceResponseDTO updateGrievanceByFaculty(Long id, GrievanceUpdateByFacultyDTO updateDTO) {
        Grievance grievance = grievanceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance not found"));

        grievance.setStatus(updateDTO.getStatus());
        grievance.setRemark(updateDTO.getRemark());
        grievance.setLastUpdatedDate(LocalDate.now());

        Grievance savedGrievance = grievanceRepo.save(grievance);
        
        GrievanceResponseDTO dto = new GrievanceResponseDTO();
        dto.setGrievanceId(savedGrievance.getId());
        dto.setTitle(savedGrievance.getTitle());
        dto.setDescription(savedGrievance.getDescription());
        dto.setStatus(savedGrievance.getStatus()); // Use enum directly, not toString()
        dto.setSubmittedDate(savedGrievance.getSubmittedDate());
        dto.setLastUpdatedDate(savedGrievance.getLastUpdatedDate());
        dto.setRemark(savedGrievance.getRemark());
        dto.setStudentId(savedGrievance.getStudent().getPrnNo());
        dto.setStudentName(savedGrievance.getStudent().getName());
        dto.setDepartment(savedGrievance.getStudent().getDepartment());
        dto.setYear(savedGrievance.getStudent().getYear());
        if (savedGrievance.getCategory() != null) {
            dto.setCategoryId(savedGrievance.getCategory().getCategoryId());
            dto.setCategoryName(savedGrievance.getCategory().getCategoryName());
        }
        if (savedGrievance.getSubCategory() != null) {
            dto.setSubCategoryId(savedGrievance.getSubCategory().getId());
        }
        if (savedGrievance.getFacultyAssigned() != null) {
            dto.setFacultyAssigned(savedGrievance.getFacultyAssigned().getId());
            dto.setFacultyName(savedGrievance.getFacultyAssigned().getFullName());
        }

        // Sync update to .NET service
        try {
            if (savedGrievance.getRemoteId() != null) {
                // Update existing grievance in .NET
                System.out.println("🔄 Syncing grievance update to .NET with remote ID: " + savedGrievance.getRemoteId());
                WrapperDTO wrapper = new WrapperDTO();
                wrapper.setGrievance(dto);
                dotNetApiClient.syncGrievanceUpdateToDotNet(wrapper, savedGrievance.getRemoteId());
                System.out.println("✅ Successfully synced grievance update to .NET");
            } else {
                // If no remote ID, try to sync as new grievance
                System.out.println("🔄 No remote ID found, syncing as new grievance to .NET");
                syncGrievanceToDotNet(dto);
                System.out.println("✅ Synced grievance update as new grievance to .NET");
            }
        } catch (Exception e) {
            System.err.println("❌ Failed to sync grievance update to .NET: " + e.getMessage());
            // Don't fail the operation, just log the error
        }

        return dto;
    }

    @Override
    public GrievanceResponseDTO getGrievanceById(Long id) {
        Grievance grievance = grievanceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance not found"));
        
        GrievanceResponseDTO dto = new GrievanceResponseDTO();
        dto.setGrievanceId(grievance.getId());
        dto.setTitle(grievance.getTitle());
        dto.setDescription(grievance.getDescription());
        dto.setStatus(grievance.getStatus()); // Use enum directly, not toString()
        dto.setSubmittedDate(grievance.getSubmittedDate());
        dto.setLastUpdatedDate(grievance.getLastUpdatedDate());
        dto.setRemark(grievance.getRemark());
        dto.setStudentId(grievance.getStudent().getPrnNo());
        dto.setStudentName(grievance.getStudent().getName());
        dto.setDepartment(grievance.getStudent().getDepartment());
        dto.setYear(grievance.getStudent().getYear());
        if (grievance.getCategory() != null) {
            dto.setCategoryId(grievance.getCategory().getCategoryId());
            dto.setCategoryName(grievance.getCategory().getCategoryName());
        }
        if (grievance.getSubCategory() != null) {
            dto.setSubCategoryId(grievance.getSubCategory().getId());
        }
        if (grievance.getFacultyAssigned() != null) {
            dto.setFacultyAssigned(grievance.getFacultyAssigned().getId());
            dto.setFacultyName(grievance.getFacultyAssigned().getFullName());
        }
        return dto;
    }

    @Override
    public List<GrievanceResponseDTO> getAllGrievances() {
        List<Grievance> grievances = grievanceRepo.findAll();
        return grievances.stream().map(g -> {
            GrievanceResponseDTO dto = new GrievanceResponseDTO();
            dto.setGrievanceId(g.getId());
            dto.setTitle(g.getTitle());
            dto.setDescription(g.getDescription());
            dto.setStatus(g.getStatus()); // Use enum directly, not toString()
            dto.setSubmittedDate(g.getSubmittedDate());
            dto.setLastUpdatedDate(g.getLastUpdatedDate());
            dto.setRemark(g.getRemark());
            dto.setStudentId(g.getStudent().getPrnNo());
            dto.setStudentName(g.getStudent().getName());
            dto.setDepartment(g.getStudent().getDepartment());
            dto.setYear(g.getStudent().getYear());
            if (g.getCategory() != null) {
                dto.setCategoryId(g.getCategory().getCategoryId());
                dto.setCategoryName(g.getCategory().getCategoryName());
            }
            if (g.getSubCategory() != null) {
                dto.setSubCategoryId(g.getSubCategory().getId());
            }
            if (g.getFacultyAssigned() != null) {
                dto.setFacultyAssigned(g.getFacultyAssigned().getId());
                dto.setFacultyName(g.getFacultyAssigned().getFullName());
            }
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteGrievance(Long id) {
        Grievance grievance = grievanceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance not found"));

        System.out.println("🗑️ Starting deletion of grievance ID: " + id);

        // Delete from .NET first, then from Spring DB
        boolean dotnetDeleted = false;
        
        // Method 1: Delete by Remote ID (Primary method)
        if (grievance.getRemoteId() != null) {
            try {
                System.out.println("🔄 Attempting to delete from .NET using remote ID: " + grievance.getRemoteId());
                dotNetApiClient.deleteGrievance(grievance.getRemoteId());
                System.out.println("✅ Successfully deleted grievance from .NET with remote ID: " + grievance.getRemoteId());
                dotnetDeleted = true;
            } catch (Exception e) {
                System.err.println("❌ Failed to delete grievance from .NET using remote ID: " + e.getMessage());
            }
        } else {
            System.out.println("⚠️ No remote ID found for grievance ID: " + id);
        }

        // Method 2: Fallback - Delete by Composite Key
        if (!dotnetDeleted) {
            try {
                Long studentId = grievance.getStudent() != null ? grievance.getStudent().getPrnNo() : null;
                if (studentId != null && grievance.getTitle() != null && grievance.getSubmittedDate() != null) {
                    System.out.println("🔄 Attempting fallback delete using composite key: (studentId=" + studentId + ", title=" + grievance.getTitle() + ", date=" + grievance.getSubmittedDate() + ")");
                    dotNetApiClient.deleteGrievanceByKey(studentId, grievance.getTitle(), grievance.getSubmittedDate());
                    System.out.println("✅ Fallback composite-key delete successful on .NET");
                    dotnetDeleted = true;
                } else {
                    System.err.println("❌ Insufficient data for composite-key delete on .NET. studentId=" + studentId + ", title=" + grievance.getTitle() + ", date=" + grievance.getSubmittedDate());
                }
            } catch (Exception ex) {
                System.err.println("❌ Fallback delete failed: " + ex.getMessage());
            }
        }

        // Always delete from Spring DB
        try {
            grievanceRepo.delete(grievance);
            System.out.println("✅ Successfully deleted grievance from Spring Boot DB with ID: " + id);
        } catch (Exception e) {
            System.err.println("❌ Failed to delete grievance from Spring Boot DB: " + e.getMessage());
            throw new RuntimeException("Failed to delete grievance from database", e);
        }

        // Summary
        if (dotnetDeleted) {
            System.out.println("🎉 Grievance deletion completed successfully from both Spring Boot and .NET");
        } else {
            System.out.println("⚠️ Grievance deleted from Spring Boot but .NET deletion failed");
        }
    }

    @Override
    public List<GrievanceResponseDTO> getGrievancesAssignedToFaculty(Long facultyId) {
        List<Grievance> grievances = grievanceRepo.findByFacultyAssignedId(facultyId);
        return grievances.stream().map(g -> {
            GrievanceResponseDTO dto = new GrievanceResponseDTO();
            dto.setGrievanceId(g.getId());
            dto.setTitle(g.getTitle());
            dto.setDescription(g.getDescription());
            dto.setStatus(g.getStatus()); // Use enum directly, not toString()
            dto.setSubmittedDate(g.getSubmittedDate());
            dto.setLastUpdatedDate(g.getLastUpdatedDate());
            dto.setRemark(g.getRemark());
            dto.setStudentId(g.getStudent().getPrnNo());
            dto.setStudentName(g.getStudent().getName());
            dto.setDepartment(g.getStudent().getDepartment());
            dto.setYear(g.getStudent().getYear());
            if (g.getCategory() != null) {
                dto.setCategoryId(g.getCategory().getCategoryId());
                dto.setCategoryName(g.getCategory().getCategoryName());
            }
            if (g.getSubCategory() != null) {
                dto.setSubCategoryId(g.getSubCategory().getId());
            }
            dto.setFacultyAssigned(g.getFacultyAssigned().getId());
            dto.setFacultyName(g.getFacultyAssigned().getFullName());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void syncGrievanceToDotNet(GrievanceResponseDTO grievanceDto) {
        try {
            System.out.println("🔄 Syncing grievance to .NET (fallback method): " + grievanceDto.getGrievanceId());
            WrapperDTO wrapper = new WrapperDTO();
            wrapper.setGrievance(grievanceDto); // wrap the grievance
            dotNetApiClient.syncNewGrievance(wrapper);
            System.out.println("✅ Successfully synced grievance to .NET (fallback method)");
        } catch (Exception e) {
            System.err.println("❌ Failed to sync grievance to .NET (fallback method): " + e.getMessage());
            // Don't throw exception to avoid breaking the main operation
        }
    }

    @Override
    public List<GrievanceResponseDTO> getGrievancesByStudent(Long studentId) {
        List<Grievance> grievances = grievanceRepo.findByStudentPrnNo(studentId);
        return grievances.stream().map(g -> {
            GrievanceResponseDTO dto = new GrievanceResponseDTO();
            dto.setGrievanceId(g.getId());
            dto.setTitle(g.getTitle());
            dto.setDescription(g.getDescription());
            dto.setStatus(g.getStatus()); // Use enum directly, not toString()
            dto.setSubmittedDate(g.getSubmittedDate());
            dto.setLastUpdatedDate(g.getLastUpdatedDate());
            dto.setRemark(g.getRemark());
            dto.setStudentId(g.getStudent().getPrnNo());
            dto.setStudentName(g.getStudent().getName());
            dto.setDepartment(g.getStudent().getDepartment());
            dto.setYear(g.getStudent().getYear());
            if (g.getCategory() != null) {
                dto.setCategoryId(g.getCategory().getCategoryId());
                dto.setCategoryName(g.getCategory().getCategoryName());
            }
            if (g.getSubCategory() != null) {
                dto.setSubCategoryId(g.getSubCategory().getId());
            }
            if (g.getFacultyAssigned() != null) {
                dto.setFacultyAssigned(g.getFacultyAssigned().getId());
                dto.setFacultyName(g.getFacultyAssigned().getFullName());
            }
            return dto;
        }).collect(Collectors.toList());
    }

}
