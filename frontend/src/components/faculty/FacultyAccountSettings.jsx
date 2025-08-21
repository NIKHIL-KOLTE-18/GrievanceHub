"use client"

import { useState } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"

const FacultyAccountSettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showAlert, setShowAlert] = useState({ show: false, type: "", message: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault()

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
        message: "Password must be at least 6 characters long!",
      })
      return
    }

    console.log("Password update:", passwordData)
    setShowAlert({
      show: true,
      type: "success",
      message: "Password updated successfully!",
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setTimeout(() => setShowAlert({ show: false, type: "", message: "" }), 3000)
  }

  return (
    <div>
      <h5 className="mb-4">Account Settings</h5>

      {showAlert.show && (
        <Alert
          variant={showAlert.type}
          dismissible
          onClose={() => setShowAlert({ show: false, type: "", message: "" })}
        >
          {showAlert.message}
        </Alert>
      )}

      {/* Change Password Section */}
      <Card className="card-custom mb-4">
        <Card.Header className="bg-light">
          <h6 className="mb-0">
            <i className="fas fa-lock me-2"></i>
            Change Password
          </h6>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                required
              />
              <Form.Text className="text-muted">Password must be at least 6 characters long.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="primary-btn">
              <i className="fas fa-key me-2"></i>
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Account Information */}
      <Card className="card-custom">
        <Card.Header className="bg-light">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Account Information
          </h6>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Account Status:</strong>
              <span className="badge bg-success ms-2">Active</span>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Account Type:</strong> Faculty
            </div>
            <div className="col-md-6 mb-3">
              <strong>Last Login:</strong> 2024-01-15 09:15 AM
            </div>
            <div className="col-md-6 mb-3">
              <strong>Account Created:</strong> 2020-08-15
            </div>
            
          </div>

          

          
        </Card.Body>
      </Card>
    </div>
  )
}

export default FacultyAccountSettings
