import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="bg-primary-custom text-white py-4" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' }}>
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="fw-bold">GrievanceHub</h5>
            <p className="text-white-50">Streamlining College Grievance Portal</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="text-white-50">&copy; 2024 GrievanceHub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
