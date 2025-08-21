package com.app.controller;

import com.app.dto.GrievanceCategoryDTO;
import com.app.entity.GrievanceCategory;
import com.app.service.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public GrievanceCategoryDTO addCategory(@RequestBody GrievanceCategoryDTO dto) {
        GrievanceCategory saved = categoryService.addCategoryFromDTO(dto);
        return mapToDTO(saved);
    }

    @GetMapping
    public List<GrievanceCategoryDTO> getAllCategories() {
        List<GrievanceCategory> list = categoryService.getAllCategories();
        return list.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private GrievanceCategoryDTO mapToDTO(GrievanceCategory category) {
        return GrievanceCategoryDTO.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryDescription(category.getCategoryDescription())
                .build();
    }
}
