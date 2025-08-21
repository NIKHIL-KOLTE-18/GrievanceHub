package com.app.repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.GrievanceCategory;

@Repository
public interface GrievanceCategoryRepository extends JpaRepository<GrievanceCategory, Long> {
	Optional<GrievanceCategory> findByCategoryName(String categoryName);

	boolean existsByCategoryName(String categoryName);

}

