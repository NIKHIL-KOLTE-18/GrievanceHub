import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="fw-bold">GrievanceHub</h5>
            <p className="text-muted">Streamlining college grievance management</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-muted">&copy; 2024 GrievanceHub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
