package com.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve files from "uploads/" folder
        registry
            .addResourceHandler("/uploads/**")
            .addResourceLocations("file:uploads/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
<<<<<<< HEAD:backend/CollegeGrievance-Portal/src/main/java/com/app/config/WebConfig.java
        registry.addMapping("/**") // Apply to all endpoints
            .allowedOrigins("http://localhost:3000") // React dev server
=======
        registry.addMapping("/**")
            // Dev: allow any localhost port (e.g., 3000, 3004)
            .allowedOriginPatterns("http://localhost:*", "http://127.0.0.1:*")
>>>>>>> 66cf20a (added code in backend and frontend):backend/src/main/java/com/app/config/WebConfig.java
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}

//By default, Spring Boot only serves static files from certain folders like:
//
//src/main/resources/static/
//
//src/main/resources/public/

//But we want to serve files (like uploaded images, PDFs, etc.) from a custom 
//folder called /uploads/ ...which is outside src, and not on the classpath
// so We write a class WebConfig.java that tells Spring where to 
//look for those files and how to map them to URLs.


	//Why we dont create upload folder inside src
//We don't create the folder inside src/ because src/ is for source code and gets overwritten on every build or deployment.
//Placing uploads/ outside ensures uploaded files are safe, persistent, and not packaged inside the .jar/.war file.