package com.app.config;

import jakarta.annotation.PostConstruct;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.app.dto.GrievanceCreateDTO;
import com.app.entity.Grievance;

@Configuration
public class ModelMapperConfig {

    private final ModelMapper modelMapper = new ModelMapper();

    @Bean
    public ModelMapper modelMapper() {
        return modelMapper;
    }

    @PostConstruct
    public void setupMapper() {
        modelMapper.addMappings(new PropertyMap<GrievanceCreateDTO, Grievance>() {
            @Override
            protected void configure() {
                skip().setId(null);
                skip().setCategory(null);
                skip().setStudent(null);
                skip().setSubCategory(null);
                map().setTitle(source.getTitle());
                map().setDescription(source.getDescription());
            }
        });

        // Fix Grievance to GrievanceResponseDTO mapping
        modelMapper.addMappings(new PropertyMap<Grievance, com.app.dto.GrievanceResponseDTO>() {
            @Override
            protected void configure() {
                skip().setGrievanceId(null);
                skip().setStudentId(null);
                skip().setCategoryId(null);
                skip().setCategoryName(null);
                skip().setFacultyAssigned(null);
                skip().setSubCategoryId(null);
                skip().setStudentName(null);
                skip().setDepartment(null);
                skip().setYear(null);
            }
        });
    }
}

// Note: The root cause was ModelMapper trying to map multiple Long fields (categoryId, studentId) to the same entity id field.
// The solution is to skip these mappings explicitly or avoid ModelMapper for complex DTO-to-entity conversion.
