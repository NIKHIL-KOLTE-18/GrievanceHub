// Grievance.java
package com.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.app.enums.GrievanceStatusEnum;

@Entity
@Table(name = "grievances")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grievance {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String attachmentPath;

    private LocalDate submittedDate;

    private LocalDate lastUpdatedDate;

//    private String facultyAssigned;

    private String remark;
    
    // Added this new field for delete purpose from dotnet
    private Long remoteId;

    @Enumerated(EnumType.STRING)
    private GrievanceStatusEnum status = GrievanceStatusEnum.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prn_no")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private GrievanceCategory category;
    
    
    //This will add a foreign key column faculty_assigned_id in your grievance table.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_assigned_id")
    private Faculty facultyAssigned;
    
    //to assign grievance base on subcategory to faculty 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sub_category_id")  // FK column in grievances table
    private SubCategory subCategory;


}
