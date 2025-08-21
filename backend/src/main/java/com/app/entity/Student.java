package com.app.entity;

//package com.grievance.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity //marks it as JPA entity
@Data //(from Lombok) gives getters/setters automatically
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @Column(nullable = false, unique = true)
//    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long prnNo; //primary key 

    private String name;
    private String email;
    private String phoneNumber;
    private String department;
    private String year;
    private String course;
    private String photo;  //Store image UR

//    @Column(nullable = false)
//    private String password; 
    private String address;
    
    
    
 //
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id") // this column in student table references user table
    private User user;


}


//@Id + @GeneratedValue is for auto-generating IDs