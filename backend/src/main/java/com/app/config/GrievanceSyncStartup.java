package com.app.config;

import com.app.dto.GrievanceResponseDTO;
import com.app.dto.WrapperDTO;
import com.app.entity.Grievance;
import com.app.enums.GrievanceStatusEnum;
import com.app.project.client.DotNetApiClient;
import com.app.repository.GrievanceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class GrievanceSyncStartup {

    @Bean
    @Transactional
    CommandLineRunner syncExistingGrievances(GrievanceRepository grievanceRepository,
                                            DotNetApiClient dotNetApiClient) {
        return args -> {
            try {
                System.out.println("Starting grievance sync with .NET service...");
                int syncedCount = 0;
                
                // Fetch with relations to avoid lazy init errors
                for (Grievance g : grievanceRepository.findAllWithRelations()) {
                    if (g.getRemoteId() == null) {
                        try {
                            // Create DTO manually to avoid ModelMapper issues
                            GrievanceResponseDTO dto = new GrievanceResponseDTO();
                            dto.setGrievanceId(g.getId());
                            dto.setTitle(g.getTitle());
                            dto.setDescription(g.getDescription());
                            dto.setStatus(g.getStatus());
                            dto.setSubmittedDate(g.getSubmittedDate());
                            dto.setLastUpdatedDate(g.getLastUpdatedDate());
                            dto.setRemark(g.getRemark());
                            
                            // Safely access student data
                            if (g.getStudent() != null) {
                                dto.setStudentId(g.getStudent().getPrnNo());
                                dto.setStudentName(g.getStudent().getName());
                                dto.setDepartment(g.getStudent().getDepartment());
                                dto.setYear(g.getStudent().getYear());
                            }
                            
                            if (g.getCategory() != null) {
                                dto.setCategoryId(g.getCategory().getCategoryId());
                                dto.setCategoryName(g.getCategory().getCategoryName());
                            }
                            
                            if (g.getSubCategory() != null) {
                                dto.setSubCategoryId(g.getSubCategory().getId());
                            }
                            
                            if (g.getFacultyAssigned() != null) {
                                dto.setFacultyAssigned(g.getFacultyAssigned().getId());
                            }
                            
                            WrapperDTO wrapper = new WrapperDTO();
                            wrapper.setGrievance(dto);
                            
                            Long remoteId = dotNetApiClient.syncNewGrievanceAndGetRemoteId(wrapper);
                            if (remoteId != null) {
                                g.setRemoteId(remoteId);
                                grievanceRepository.save(g);
                                syncedCount++;
                                System.out.println("Synced grievance ID " + g.getId() + " with .NET ID " + remoteId);
                            }
                        } catch (Exception ex) {
                            System.err.println("Failed to sync grievance " + g.getId() + ": " + ex.getMessage());
                        }
                    }
                }
                System.out.println("Grievance sync completed. Synced " + syncedCount + " grievances.");
            } catch (Exception ex) {
                System.err.println("Startup sync error: " + ex.getMessage());
                ex.printStackTrace();
            }
        };
    }
}


