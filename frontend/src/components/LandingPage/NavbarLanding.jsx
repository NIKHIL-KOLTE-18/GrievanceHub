import { Link } from "react-router-dom"
import { Container, Button } from "react-bootstrap"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <Container>
        <div className="navbar-brand text-primary-custom">GrievanceHub</div>
        <div className="navbar-nav ms-auto d-flex flex-row align-items-center">
          <Link to="/" className="nav-link me-3">Home</Link>
          <a href="#about" className="nav-link me-3">About Us</a>
          {/* <Link to="/login" className="nav-link me-3">Login</Link> */}
          <Link to="/register">
            <Button className="primary-btn">Get Started</Button>
          </Link>
        </div>
      </Container>
    </nav>
  )
}

export default Header
