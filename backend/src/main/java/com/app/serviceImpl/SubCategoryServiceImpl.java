package com.app.serviceImpl;

import com.app.dto.SubCategoryDTO;
import com.app.entity.GrievanceCategory;
import com.app.entity.SubCategory;
import com.app.repository.GrievanceCategoryRepository;
import com.app.repository.SubCategoryRepository;
import com.app.service.SubCategoryService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepo;

    @Autowired
    private GrievanceCategoryRepository categoryRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public String addSubCategory(SubCategoryDTO dto, Long categoryId) {
        GrievanceCategory category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        SubCategory subCategory = mapper.map(dto, SubCategory.class);
        subCategory.setCategory(category);

        subCategoryRepo.save(subCategory);
        return "Subcategory added successfully";
    }

    @Override
    @Cacheable("subcategories")
    public List<SubCategoryDTO> getAllSubCategories() {
        List<SubCategory> list = subCategoryRepo.findAll();
        return list.stream()
                   .map(sub -> SubCategoryDTO.builder()
                           .id(sub.getId())
                           .name(sub.getName())
                           .categoryId(sub.getCategory() != null ? sub.getCategory().getCategoryId() : null)
                           .build())
                   .collect(Collectors.toList());
    }
}
