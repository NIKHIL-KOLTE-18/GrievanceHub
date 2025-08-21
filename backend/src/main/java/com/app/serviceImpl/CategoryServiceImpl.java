package com.app.serviceImpl;

import com.app.dto.GrievanceCategoryDTO;
import com.app.entity.GrievanceCategory;

import com.app.repository.GrievanceCategoryRepository;
import com.app.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private GrievanceCategoryRepository categoryRepo;

    @Autowired
    private ModelMapper modelMapper;  // Injected here

    @Override
    public GrievanceCategory addCategoryFromDTO(GrievanceCategoryDTO dto) {
        // Map basic fields using ModelMapper
        GrievanceCategory category = modelMapper.map(dto, GrievanceCategory.class);

        // Set parent category in each subcategory manually
        if (category.getSubCategories() != null) {
            category.getSubCategories().forEach(sub -> sub.setCategory(category));
        }

        return categoryRepo.save(category);
    }

    @Override
    public GrievanceCategory addCategory(GrievanceCategory category) {
        return categoryRepo.save(category);
    }

    @Override
    @Cacheable("categories")
    public List<GrievanceCategory> getAllCategories() {
        return categoryRepo.findAll();
    }
    
    
    @Override
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id); // JPA will handle cascading due to annotation
    }

}
