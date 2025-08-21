package com.app.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.app.entity.Student;
import com.app.repository.StudentRepository;
import com.app.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {
	
	//Each @Autowired is for one separate dependency:One per dependency 
	@Autowired
	StudentRepository studentRepository; 
	
	@Autowired 
	private BCryptPasswordEncoder encoder;

	@Override
	public Student addStudent(Student student) {
//		Encode the password before saving
//        student.setPassword(encoder.encode(student.getPassword()));
		 return studentRepository.save(student);
		
		
	}

	@Override
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	@Override
	public Student getStudentByPrn(Long prnNo) {
		return studentRepository.findById(prnNo).orElse(null);
	}

	public boolean deleteStudentByPrn(Long prnNo) {
	    Student student = studentRepository.findById(prnNo).orElse(null);
	    if (student != null) {
	    	studentRepository.delete(student);
	        return true;
	    } else {
	        return false;
	    }
	}


	@Override
	public Student updateStudent(Long prnNo, Student updatedStudent) {
		//first get the existing student by prno
		Student existingStudent = studentRepository.findById(prnNo)
				.orElseThrow(()->new RuntimeException("Student not found!!"));
		
		//after getting existing student update that student
		existingStudent.setName(updatedStudent.getName());
		existingStudent.setEmail(updatedStudent.getEmail());
		existingStudent.setDepartment(updatedStudent.getDepartment());
		existingStudent.setYear(updatedStudent.getYear());
	    existingStudent.setCourse(updatedStudent.getCourse());
	    existingStudent.setPhoto(updatedStudent.getPhoto());
	 // Re-encode the password if it’s updated
//	    existingStudent.setPassword(encoder.encode(updatedStudent.getPassword()));

	    return studentRepository.save(existingStudent);
	
		
	}

//	@Override
//	public String loginStudent(LoginRequest request) {
//		//first get that Student using prn number
//		Student loginStudent = studentRepository.findById(request.getPrnNo())
//				.orElseThrow(()-> new RuntimeException("Invalid PRN!!"));
//		
//		boolean isPasswordMatch = encoder.matches(request.getPassword(), loginStudent.getPassword());
//		
//		if(isPasswordMatch) {
//			return "Login Successfully!!";
//		}
//		else {
//			throw new RuntimeException("Invalid Password!!!");
//		}
//		
//	}
//	

}
