package com.app.service;

import java.util.List;


import com.app.entity.Student;

public interface StudentService {
	
	Student addStudent(Student student);
	List<Student> getAllStudents();
	Student getStudentByPrn(Long prnNo);
	 boolean deleteStudentByPrn(Long prnNo);
	 Student updateStudent(Long prnNo, Student updatedStudent);
//	 String loginStudent(LoginRequest request);


}
