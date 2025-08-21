package com.app.entity;

import com.app.enums.UserRoleEnum;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
	@Id
	private Long username;
	
	private String password;
	
	private String fullname;
	
	private String email;
	
	@Enumerated(EnumType.STRING)
	private UserRoleEnum role;
	
	@JsonManagedReference
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Student student;

	@JsonManagedReference
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	private Faculty faculty;
}
