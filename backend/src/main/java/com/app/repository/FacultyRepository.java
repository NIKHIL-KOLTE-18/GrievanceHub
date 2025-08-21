package com.app.repository;

import com.app.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    // Find faculty by subcategory for auto-assignment
    List<Faculty> findBySubcategory(String subcategory);
    
    // Find single faculty by subcategory (for auto-assignment)
    Optional<Faculty> findFirstBySubcategory(String subcategory);
}
