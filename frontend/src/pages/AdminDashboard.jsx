"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Badge, Nav, Navbar } from "react-bootstrap"
import UserManagementSection from "../components/admin/UserManagementSection.jsx"
import SystemOverviewSection from "../components/admin/SystemOverviewSection.jsx"
import CategoryManagementSection from "../components/admin/CategoryManagementSection.jsx"
import AdminProfileSection from "../components/admin/AdminProfileSection.jsx"
import AdminAccountSettings from "../components/admin/AdminAccountSettings.jsx"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview")
  const [pendingApprovals] = useState(8) // Mock pending approvals count

  // Mock admin data
  const adminData = {
    name: "Admin User",
    adminId: "ADM2024001",
    role: "System Administrator",
    phone: "123-456-7890",
    email: "admin@college.edu",
    profilePic: null,
    joinDate: "2020-01-15",
  }

  const handleLogout = () => {
    console.log("Admin logging out...")
    window.location.href = "/login"
  }

  return (
    <div className="admin-dashboard">
      {/* Top Navigation */}
      <Navbar bg="white" className="shadow-sm border-bottom">
        <Container fluid>
          <Navbar.Brand className="text-primary-custom fw-bold">
            <Link to="/" className="text-decoration-none text-primary-custom">
              GrievanceHub - Admin Panel
            </Link>
          </Navbar.Brand>
          <div className="d-flex align-items-center">


           
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Welcome Header */}
      <div className="bg-dark text-white py-3">
        <Container fluid>
          <h4 className="mb-0">Welcome, {adminData.name}! 🛡️</h4>
          <small>System Administrator - Manage users, oversee grievances, and maintain system integrity</small>
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
                      className="bg-dark rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="fas fa-user-shield text-white fs-3"></i>
                    </div>
                    <h6 className="fw-bold mb-1">{adminData.name}</h6>
                    <small className="text-muted">{adminData.adminId}</small>
                  </div>
                  <div className="small">
                    <div className="mb-1">
                      <strong>Role:</strong> {adminData.role}
                    </div>
                    <div className="mb-1">
                      <strong>Phone No:</strong> {adminData.phone || "N/A"}
                    </div>
                    <div className="mb-1">
                      <strong>Email:</strong> {adminData.email}
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <Nav className="flex-column">
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "overview" ? "bg-dark text-white" : ""}`}
                    onClick={() => setActiveSection("overview")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-chart-pie me-2"></i>
                    System Overview
                  </Nav.Link>
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "users" ? "bg-dark text-white" : ""}`}
                    onClick={() => setActiveSection("users")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-users me-2"></i>
                    User Management

                    
                  </Nav.Link>
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "categories" ? "bg-dark text-white" : ""}`}
                    onClick={() => setActiveSection("categories")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-tags me-2"></i>
                    Manage Categories
                  </Nav.Link>
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "profile" ? "bg-dark text-white" : ""}`}
                    onClick={() => setActiveSection("profile")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-user-edit me-2"></i>
                    Edit Profile
                  </Nav.Link>
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "settings" ? "bg-dark text-white" : ""}`}
                    onClick={() => setActiveSection("settings")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-cog me-2"></i>
                    Account Settings
                  </Nav.Link>
                </Nav>

               
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            {activeSection === "overview" && <SystemOverviewSection />}
            {activeSection === "users" && <UserManagementSection />}
            {activeSection === "categories" && <CategoryManagementSection />}
            {activeSection === "profile" && <AdminProfileSection adminData={adminData} />}
            {activeSection === "settings" && <AdminAccountSettings />}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard
