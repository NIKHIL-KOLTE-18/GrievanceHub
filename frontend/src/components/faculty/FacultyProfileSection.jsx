"use client"

import { useState } from "react"
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap"

const FacultyProfileSection = ({ facultyData }) => {
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({
    name: facultyData.name,
    email: facultyData.email,
    phone: "+91 9876543210",
    address: "123 Faculty Colony, College Campus, City - 123456",
    profilePic: null,
    specialization: "Database Systems, Machine Learning",
    experience: "5 years",
    category: "Academic",
    subcategory: "Exam Issue",
  })

  const categories = ["Academic", "Administrative", "Behavioral", "Infrastructure", "Other"];
  const subcategoryOptions = {
    Academic: ["Exam Issue", "Assignment Grading", "Syllabus Coverage"],
    Administrative: ["Hostel", "Fees", "Transport", "Scholarship"],
    Behavioral: ["Faculty Misconduct", "Student Misconduct", "Harassment"],
    Infrastructure: ["Wi-Fi", "Classroom Maintenance", "Lab Equipment"],
    Other: ["General", "Suggestion", "Technical Support"],
  };
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profilePic: file,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    // Name validation
    if (!profileData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    // Email validation
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    // Phone validation
    if (!profileData.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\+?\d{10,13}$/.test(profileData.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    // Address validation
    if (!profileData.address.trim()) {
      newErrors.address = "Address is required.";
    }
    // Specialization validation
    if (!profileData.specialization.trim()) {
      newErrors.specialization = "Specialization is required.";
    }
    // Experience validation
    if (!profileData.experience.trim()) {
      newErrors.experience = "Experience is required.";
    }
    // Category validation
    if (!profileData.category.trim()) {
      newErrors.category = "Category is required.";
    }
    // Subcategory validation
    if (!profileData.subcategory.trim()) {
      newErrors.subcategory = "Subcategory is required.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    console.log("Profile updated:", profileData);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  }

    return (
    <div>
      <h5 className="mb-4">Edit Profile</h5>

      {showAlert && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowAlert(false)}
        >
          Profile updated successfully!
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={profileData.specialization}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.specialization}
              />
              <Form.Control.Feedback type="invalid">
                {errors.specialization}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Experience</Form.Label>
              <Form.Control
                type="text"
                name="experience"
                value={profileData.experience}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.experience}
              />
              <Form.Control.Feedback type="invalid">
                {errors.experience}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Category</Form.Label>
              <Form.Select
                name="category"
                value={profileData.category}
                onChange={handleCategoryChange}
                size="sm"
                isInvalid={!!errors.category}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small">Subcategory</Form.Label>
              <Form.Select
                name="subcategory"
                value={profileData.subcategory}
                onChange={handleInputChange}
                size="sm"
                isInvalid={!!errors.subcategory}
              >
                {subcategoryOptions[profileData.category].map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.subcategory}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" className="primary-btn mt-2">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default FacultyProfileSection;
