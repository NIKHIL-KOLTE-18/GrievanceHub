"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Badge, Nav, Navbar } from "react-bootstrap"
import FacultyProfileSection from "../components/faculty/FacultyProfileSection"
import AssignedGrievancesSection from "../components/faculty/AssignedGrievancesSection"
import FacultyAccountSettings from "../components/faculty/FacultyAccountSettings"
import { Link } from "react-router-dom"

const FacultyDashboard = () => {
  const [activeSection, setActiveSection] = useState("grievances")
  const [notifications] = useState(5) // Mock notification count for new assigned grievances

  // Mock faculty data
  const facultyData = {
    name: "Shubham Patil",
    facultyId: "25250001",
    department: "Computer Science",
    designation: "Assistant Professor",
    email: "shubhampatil01@gmail.com ",
    profilePic: null, // Will show default avatar
    joinDate: "2020-08-15",
  }

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logging out...")
    // Redirect to login page
    window.location.href = "/login"
  }

  return (
    <div className="faculty-dashboard">
      {/* Top Navigation */}
      <Navbar bg="white" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand className="text-primary-custom fw-bold">
            <Link to="/" className="text-decoration-none text-primary-custom">
              GrievanceHub
            </Link>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            {/* Notification icon removed */}
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Welcome Header */}
      <div className="bg-light py-3">
        <Container fluid>
          <h4 className="mb-0 text-dark">Welcome, {facultyData.name}! 👨‍🏫</h4>
          <small className="text-muted">Manage assigned grievances and help resolve student issues</small>
        </Container>
      </div>

      <Container fluid className="py-4">
        <Row>
          {/* Left Sidebar */}
          <Col lg={3} className="mb-4">
            <Card className="card-custom">
              <Card.Body className="p-0">
                {/* Profile Section */}
                <div className="p-3 border-bottom">
                  <div className="text-center mb-3">
                    <div
                      className="bg-primary-custom rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="fas fa-chalkboard-teacher text-white fs-3"></i>
                    </div>
                    <h6 className="fw-bold mb-1">{facultyData.name}</h6>
                    <small className="text-muted">{facultyData.facultyId}</small>
                  </div>
                  <div className="small">
                    <div className="mb-1">
                      <strong>Department:</strong> {facultyData.department}
                    </div>
                    <div className="mb-1">
                      <strong>Designation:</strong> {facultyData.designation}
                    </div>
                    <div className="mb-1">
                      <strong>Email:</strong> {facultyData.email}
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <Nav className="flex-column">
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "grievances" ? "bg-primary-custom text-white" : ""}`}
                    onClick={() => setActiveSection("grievances")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-tasks me-2"></i>
                    Assigned Grievances
                    {notifications > 0 && (
                      <Badge bg="danger" pill className="ms-2" style={{ fontSize: "0.6rem" }}>
                        {notifications}
                      </Badge>
                    )}
                  </Nav.Link>
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "profile" ? "bg-primary-custom text-white" : ""}`}
                    onClick={() => setActiveSection("profile")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-user-edit me-2"></i>
                    Edit Profile
                  </Nav.Link>
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "settings" ? "bg-primary-custom text-white" : ""}`}
                    onClick={() => setActiveSection("settings")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-cog me-2"></i>
                    Account Settings
                  </Nav.Link>
                </Nav>

                {/* Chat with Bot Button */}
                <div className="p-3 border-top">
                  <Button variant="outline-primary" size="sm" className="w-100">
                    <i className="fas fa-robot me-2"></i>
                    Chat with Bot
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            {activeSection === "grievances" && <AssignedGrievancesSection facultyData={facultyData} />}
            {activeSection === "profile" && <FacultyProfileSection facultyData={facultyData} />}
            {activeSection === "settings" && <FacultyAccountSettings />}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FacultyDashboard
