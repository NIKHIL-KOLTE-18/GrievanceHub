//import jakarta.persistence.Entity;
package com.app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "category")
@EqualsAndHashCode(exclude = "category")
@Entity
@Table(name = "sub_categories")
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

//    private String description;

    @ManyToOne(fetch = FetchType.LAZY) // for better performance
    @JoinColumn(name = "category_id", nullable = false)
    private GrievanceCategory category;
}
