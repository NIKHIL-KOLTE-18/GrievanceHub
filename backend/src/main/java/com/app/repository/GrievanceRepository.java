package com.app.repository;

import com.app.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    
    // Fetch all grievances submitted by a particular student
    List<Grievance> findByStudentPrnNo(Long prnNo);

    // Fetch grievances assigned to a particular faculty
    //SELECT * FROM grievances WHERE faculty_assigned_id = :facultyId;
    List<Grievance> findByFacultyAssignedId(Long facultyId);

    // Optional: Fetch grievances by status
    List<Grievance> findByStatus(String status);
    
    @Query("select g from Grievance g left join fetch g.student left join fetch g.category left join fetch g.subCategory left join fetch g.facultyAssigned")
    List<Grievance> findAllWithRelations();
    
    
    

}
