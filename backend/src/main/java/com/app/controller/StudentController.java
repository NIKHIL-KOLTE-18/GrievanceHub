package com.app.controller;

import com.app.entity.Student;
import com.app.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@PathVariable is used to bind a URI template
//variable to a method parameter in Spring

//@RequestBody binds the HTTP request body 
//(usually JSON or XML) to a Java object.

//@ResponseEntity use to get status code

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Add student (return 201 CREATED)
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createdStudent = studentService.addStudent(student);
        return ResponseEntity.status(201).body(createdStudent);  //return 201 Created
    }

    // Get all students (200 OK)
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);  
    }

    //Get single student by PRN (200 OK or 404 Not Found)
    @GetMapping("/{prnNo}")
    public ResponseEntity<Student> getStudent(@PathVariable Long prnNo) {
        Student student = studentService.getStudentByPrn(prnNo);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();  // 404
        }
    }

    //Update student (200 OK or 404 Not Found)
    @PutMapping("/{prnNo}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long prnNo,
            @RequestBody Student updatedStudent) {
        Student student = studentService.updateStudent(prnNo, updatedStudent);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();  // 404
        }
    }

    // Delete student (204: No Content or 404 :Not Found)
    @DeleteMapping("/{prnNo}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long prnNo) {
        boolean deleted = studentService.deleteStudentByPrn(prnNo);
        if (deleted) {
            return ResponseEntity.noContent().build();  // 204 No Content
        } else {
            return ResponseEntity.notFound().build();  // 404 Not Found
        }
    }
    
//    @PostMapping("/login")
//    public ResponseEntity<String> loginStudent(@RequestBody LoginRequest request) {
//        String message = studentService.loginStudent(request);
//        return ResponseEntity.ok(message);
//    }
}
