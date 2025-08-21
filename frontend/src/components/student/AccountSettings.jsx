"use client"

import { useState } from "react"
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap"
import studentService from "../../services/api/studentService"
import authService from "../../services/api/authService"

const AccountSettings = ({ studentData }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showAlert, setShowAlert] = useState({ show: false, type: "", message: "" })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setShowAlert({
        show: true,
        type: "danger",
        message: "New passwords do not match!",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      setShowAlert({
        show: true,
        type: "danger",
        message: "New password must be at least 6 characters long!",
      })
      return
    }

    setLoading(true)
    
    try {
      const userId = authService.getUserId()
      if (!userId) {
        throw new Error("User not authenticated")
      }

      const result = await studentService.updateStudentPassword(userId, passwordData)
      
      setShowAlert({
        show: true,
        type: "success",
        message: result,
      })
      
      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      
      setTimeout(() => setShowAlert({ show: false, type: "", message: "" }), 5000)
    } catch (error) {
      console.error("Password update error:", error)
      setShowAlert({
        show: true,
        type: "danger",
        message: error.response?.data || "Failed to update password. Please try again.",
      })
      
      setTimeout(() => setShowAlert({ show: false, type: "", message: "" }), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h5 className="mb-4">Account Settings</h5>

      {showAlert.show && (
        <Alert variant={showAlert.type} dismissible onClose={() => setShowAlert({ show: false, type: "", message: "" })}>
          {showAlert.message}
        </Alert>
      )}

      <Card className="card-custom">
        <Card.Body>
          <h6 className="fw-bold mb-3 text-primary-custom">Change Password</h6>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter current password"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter new password"
                    minLength={6}
                  />
                  <Form.Text className="text-muted">Password must be at least 6 characters long</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm new password"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" className="primary-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-key me-2"></i>
                    Update Password
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Account Information */}
      <Card className="card-custom mt-4">
        <Card.Body>
          <h6 className="fw-bold mb-3 text-primary-custom">Account Information</h6>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Username:</strong>
                <p className="text-muted mb-0">{studentData.studentId || "N/A"}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Email:</strong>
                <p className="text-muted mb-0">{studentData.email || "N/A"}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Full Name:</strong>
                <p className="text-muted mb-0">{studentData.name || "N/A"}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Department:</strong>
                <p className="text-muted mb-0">{studentData.department || "N/A"}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <strong>Course:</strong>
                <p className="text-muted mb-0">{studentData.course || "N/A"}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <strong>Year:</strong>
                <p className="text-muted mb-0">{studentData.year || "N/A"}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AccountSettings
