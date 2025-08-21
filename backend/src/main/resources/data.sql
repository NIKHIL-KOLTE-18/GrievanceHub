-- Seed categories/subcategories/students/faculties/basic grievances for demo

-- 1. First create categories
INSERT INTO grievance_categories (category_id, category_description, category_name) VALUES
  (1, 'Academic related issues', 'Academics'),
  (2, 'Infrastructure related issues', 'Infrastructure'),
  (3, 'Administrative issues', 'Administrative')
ON DUPLICATE KEY UPDATE category_name=VALUES(category_name);

-- 2. Then create subcategories
INSERT INTO sub_categories (id, name, category_id) VALUES
  (1, 'Examination', 1),
  (2, 'Attendance', 1),
  (3, 'Library', 2),
  (4, 'Hostel', 2),
  (5, 'Fees', 3),
  (6, 'Documents', 3)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. Create users first (with BCrypt encrypted passwords - password = "password")
INSERT INTO user (username, email, fullname, password, role) VALUES
  (1000000001, 'alice@student.edu', 'Alice Student', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'STUDENT'),
  (2000000001, 'bob@faculty.edu', 'Bob Faculty', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'FACULTY'),
  (2000000002, 'carol@faculty.edu', 'Carol Professor', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'FACULTY'),
  (2000000003, 'david@faculty.edu', 'David Lecturer', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'FACULTY'),
  (9999999999, 'admin@admin.edu', 'Admin User', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN')
ON DUPLICATE KEY UPDATE fullname=VALUES(fullname);

-- 4. Create student after user exists
INSERT INTO student (prn_no, name, email, phone_number, department, year, course, photo, address, user_id) VALUES
  (1000000001, 'Alice Student', 'alice@student.edu', '9999999999', 'CSE', 'TY', 'B.Tech', 'https://via.placeholder.com/150/007bff/ffffff?text=AS', 'Pune', 1000000001)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 5. Create faculties after users exist
INSERT INTO faculties (id, full_name, email, phone, department, designation, photo_url, address, category, subcategory, expertise, user_id) VALUES
  (2000000001, 'Bob Faculty', 'bob@faculty.edu', '8888888888', 'CSE', 'Assistant Professor', 'https://via.placeholder.com/150/28a745/ffffff?text=BF', 'Pune', 'Academics', 'Examination', 'Exam Operations', 2000000001),
  (2000000002, 'Carol Professor', 'carol@faculty.edu', '7777777777', 'CSE', 'Associate Professor', 'https://via.placeholder.com/150/ffc107/ffffff?text=CP', 'Mumbai', 'Infrastructure', 'Library', 'Library Management', 2000000002),
  (2000000003, 'David Lecturer', 'david@faculty.edu', '6666666666', 'ECE', 'Lecturer', 'https://via.placeholder.com/150/dc3545/ffffff?text=DL', 'Delhi', 'Administrative', 'Fees', 'Fee Management', 2000000003)
ON DUPLICATE KEY UPDATE full_name=VALUES(full_name);

-- 6. Create grievances after all other entities exist
INSERT INTO grievances (id, title, description, attachment_path, submitted_date, last_updated_date, remark, remote_id, status, prn_no, category_id, sub_category_id, faculty_assigned_id)
VALUES 
  (1, 'Revaluation Request', 'Need revaluation for Data Structures subject', NULL, CURDATE(), CURDATE(), 'Under review', NULL, 'PENDING', 1000000001, 1, 1, 2000000001),
  (2, 'Library Book Issue', 'Unable to access online library resources', NULL, CURDATE(), CURDATE(), 'Investigating', NULL, 'IN_PROGRESS', 1000000001, 2, 3, 2000000002),
  (3, 'Fee Receipt Problem', 'Fee receipt not generated after payment', NULL, CURDATE(), CURDATE(), 'Processing', NULL, 'PENDING', 1000000001, 3, 5, 2000000003)
ON DUPLICATE KEY UPDATE title=VALUES(title);


