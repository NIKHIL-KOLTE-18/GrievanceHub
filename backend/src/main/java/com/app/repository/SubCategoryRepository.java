package com.app.repository;

import com.app.entity.SubCategory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
	
    Optional<SubCategory> findByNameAndCategoryCategoryId(String name, Long categoryId);

}