"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Badge, Nav, Navbar, Alert } from "react-bootstrap"
import ProfileSection from "../components/student/ProfileSection"
import ComplaintSection from "../components/student/ComplaintSection"
import AccountSettings from "../components/student/AccountSettings"
import { Link, useNavigate } from "react-router-dom"
import authService from "../services/api/authService"
import studentService from "../services/api/studentService"

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("complaints")
  const [notifications] = useState(3) // Mock notification count
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userId = authService.getUserId()
        if (!userId) {
          navigate('/login')
          return
        }

        // Get student profile data
        const profileData = await studentService.getStudentProfile(userId)
        setStudentData({
          name: profileData.name || "Student",
          prn: profileData.prnNo?.toString() || "N/A",
          year: profileData.year || "N/A",
          course: profileData.course || "N/A",
          department: profileData.department || "N/A",
          email: profileData.email || "N/A",
          phone: profileData.phoneNumber || "N/A",
          address: profileData.address || "N/A",
          profilePic: profileData.photo || null,
          studentId: profileData.studentId || userId.toString(),
        })
      } catch (err) {
        console.error("Error fetching student data:", err)
        setError("Failed to load student data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [navigate])

  const handleLogout = () => {
    authService.logout()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading student dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <Alert variant="danger">
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </Alert>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <p>No student data available</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="student-dashboard">
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
          <h4 className="mb-0 text-dark">Welcome, {studentData.name}! 👋</h4>
          <small className="text-muted">Manage your complaints and track their progress</small>
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
                      <i className="fas fa-user text-white fs-3"></i>
                    </div>
                    <h6 className="fw-bold mb-1">{studentData.name}</h6>
                    <small className="text-muted">{studentData.prn}</small>
                  </div>
                  <div className="small">
                    <div className="mb-1">
                      <strong>Year:</strong> {studentData.year}
                    </div>
                    <div className="mb-1">
                      <strong>Course:</strong> {studentData.course}
                    </div>
                    <div className="mb-1">
                      <strong>Department:</strong> {studentData.department}
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <Nav className="flex-column">
                  <Nav.Link
                    className={`px-3 py-2 ${activeSection === "complaints" ? "bg-primary-custom text-white" : ""}`}
                    onClick={() => setActiveSection("complaints")}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-clipboard-list me-2"></i>
                    My Complaints
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
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content */}
          <Col lg={9}>
            {activeSection === "complaints" && <ComplaintSection studentData={studentData} />}
            {activeSection === "profile" && <ProfileSection studentData={studentData} onProfileUpdate={setStudentData} />}
            {activeSection === "settings" && <AccountSettings studentData={studentData} />}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StudentDashboard
