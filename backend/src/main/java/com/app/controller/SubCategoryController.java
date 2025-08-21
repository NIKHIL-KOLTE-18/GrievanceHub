package com.app.controller;

import com.app.dto.SubCategoryDTO;
import com.app.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subcategories")
public class SubCategoryController {

    @Autowired
    private SubCategoryService subCategoryService;

    @PostMapping("/add/{categoryId}")
    public ResponseEntity<String> addSubCategory(@RequestBody SubCategoryDTO dto,
                                                 @PathVariable Long categoryId) {
        return ResponseEntity.ok(subCategoryService.addSubCategory(dto, categoryId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubCategoryDTO>> getAllSubCategories() {
        return ResponseEntity.ok(subCategoryService.getAllSubCategories());
    }

    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<List<SubCategoryDTO>> getByCategory(@PathVariable Long categoryId) {
        // simple filter until a dedicated service method is added
        List<SubCategoryDTO> all = subCategoryService.getAllSubCategories();
        return ResponseEntity.ok(
                all.stream().filter(sc -> sc.getCategoryId() != null && sc.getCategoryId().equals(categoryId)).toList()
        );
    }
}
