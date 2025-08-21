package com.app.service;

import com.app.dto.SubCategoryDTO;
import java.util.List;

public interface SubCategoryService {
    String addSubCategory(SubCategoryDTO dto, Long categoryId);
    List<SubCategoryDTO> getAllSubCategories();
}