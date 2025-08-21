"use client"

import { Link } from "react-router-dom"
import { Container, Navbar as BootstrapNavbar, Button } from "react-bootstrap"

const Navbar = ({
  brandText = "GrievanceHub",
  onLogout,
  userType = "guest",
}) => {
  const getBrandColor = () => {
    switch (userType) {
      case "admin":
        return "text-dark"
      case "faculty":
        return "text-primary-custom"
      case "student":
        return "text-primary-custom"
      default:
        return "text-primary-custom"
    }
  }

  return (
    <BootstrapNavbar bg="white" className="shadow-sm border-bottom">
      <Container fluid>
        <BootstrapNavbar.Brand className={`fw-bold ${getBrandColor()}`}>
          <Link to="/" className={`text-decoration-none ${getBrandColor()}`}>
            {brandText}
          </Link>
        </BootstrapNavbar.Brand>

        {onLogout && (
          <div className="d-flex align-items-center">
            <Button variant="outline-danger" size="sm" onClick={onLogout}>
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </Button>
          </div>
        )}
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
