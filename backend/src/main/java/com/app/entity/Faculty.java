package com.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "grievances")
@EqualsAndHashCode(exclude = "grievances")
@Table(name = "faculties")
public class Faculty {

    @Id
    private Long id;

    private String fullName;
    private String department;
    private String designation;
    private String email;
    private String phone;
    private String address;
    private String photoUrl;
    private String category;
    private String subcategory;
    private String expertise;

    @OneToMany(mappedBy = "facultyAssigned", cascade = CascadeType.ALL)
    private List<Grievance> grievances = new ArrayList<>();
    
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
