package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

@SpringBootApplication
public class CollegeGrievancePortalApplication {

	public static void main(String[] args) {
		System.out.println("Starting College Grievance Portal Application...");
		SpringApplication.run(CollegeGrievancePortalApplication.class, args);
		System.out.println("College Grievance Portal Application started successfully!");
	}
}
