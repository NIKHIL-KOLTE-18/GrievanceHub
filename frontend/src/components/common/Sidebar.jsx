"use client"

import { Card, Nav, Button, Badge } from "react-bootstrap"

const Sidebar = ({ userInfo, menuItems, activeSection, onSectionChange, showChatBot = true, userType = "student" }) => {
  const getUserIcon = () => {
    switch (userType) {
      case "admin":
        return "fas fa-user-shield"
      case "faculty":
        return "fas fa-chalkboard-teacher"
      case "student":
        return "fas fa-user"
      default:
        return "fas fa-user"
    }
  }

  const getActiveColor = () => {
    switch (userType) {
      case "admin":
        return "bg-dark text-white"
      case "faculty":
        return "bg-primary-custom text-white"
      case "student":
        return "bg-primary-custom text-white"
      default:
        return "bg-primary-custom text-white"
    }
  }

  return (
    <Card className="card-custom">
      <Card.Body className="p-0">
        {/* Profile Section */}
        <div className="p-3 border-bottom">
          <div className="text-center mb-3">
            <div
              className={`${userType === "admin" ? "bg-dark" : "bg-primary-custom"} rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center`}
              style={{ width: "80px", height: "80px" }}
            >
              <i className={`${getUserIcon()} text-white fs-3`}></i>
            </div>
            <h6 className="fw-bold mb-1">{userInfo.name}</h6>
            <small className="text-muted">{userInfo.id}</small>
          </div>
          <div className="small">
            {Object.entries(userInfo.details).map(([key, value]) => (
              <div key={key} className="mb-1">
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <Nav className="flex-column">
          {menuItems.map((item) => (
            <Nav.Link
              key={item.key}
              className={`px-3 py-2 ${activeSection === item.key ? getActiveColor() : ""}`}
              onClick={() => onSectionChange(item.key)}
              style={{ cursor: "pointer" }}
            >
              <i className={`${item.icon} me-2`}></i>
              {item.label}
              {item.badge && (
                <Badge bg={item.badgeColor || "danger"} pill className="ms-2" style={{ fontSize: "0.6rem" }}>
                  {item.badge}
                </Badge>
              )}
            </Nav.Link>
          ))}
        </Nav>

        {/* Chat with Bot Button */}
        {showChatBot && (
          <div className="p-3 border-top">
            <Button variant="outline-primary" size="sm" className="w-100">
              <i className="fas fa-robot me-2"></i>
              Chat with Bot
            </Button>
          </div>
        )}

        {/* System Status (Admin only) */}
        {userType === "admin" && (
          <div className="p-3 border-top">
            <div className="small">
              <div className="d-flex justify-content-between mb-1">
                <span>System Status:</span>
                <Badge bg="success">Online</Badge>
              </div>
              <div className="d-flex justify-content-between">
                <span>Last Backup:</span>
                <small className="text-muted">2 hours ago</small>
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default Sidebar
