package com.app.entity;

//When using @Data, Lombok includes toString(), equals(), and hashCode() — which can cause problems in bidirectional relationships like:

//GrievanceCategory → SubCategory → GrievanceCategory (infinite loop)

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"grievances", "subCategories"})
@EqualsAndHashCode(exclude = {"grievances", "subCategories"})
@Entity
@Table(name = "grievance_categories")
public class GrievanceCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

//    @Column(nullable = false, unique = true)
    private Long categoryId;

    private String categoryName;
    
//    private String subcategoryName;

    private String categoryDescription;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Grievance> grievances = new ArrayList<>();

    
    
    //when we delete GrievanceCategory, and all its SubCategories will be deleted automatically.
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubCategory> subCategories = new ArrayList<>();

}
