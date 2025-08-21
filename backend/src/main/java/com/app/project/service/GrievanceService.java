package com.app.project.service;

import com.app.project.client.DotNetApiClient;
import com.app.project.dto.GrievanceStatsDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class GrievanceService {

    @Autowired
    private DotNetApiClient dotNetApiClient;

    @Autowired
    private ModelMapper modelMapper;

    @Cacheable("analytics")
    public GrievanceStatsDTO fetchGrievanceStats() {
        // Directly returning DTO 
       // return dotNetApiClient.getGrievanceStats();
        
        
        
        GrievanceStatsDTO dto = dotNetApiClient.getGrievanceStats();
        System.out.println("Received from .NET: " + dto);
        return dto;
    }
}
