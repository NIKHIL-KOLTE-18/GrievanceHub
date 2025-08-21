import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const StudentSection = () => {
  const studentFeatures = [
    {
      icon: "fas fa-user-circle",
      title: "Profile Management",
      description: "View and update personal details and contact preferences.",
    },
    {
      icon: "fas fa-plus-circle",
      title: "Raise Complaints",
      description: "Submit grievances with descriptions and attachments.",
    },
    {
      icon: "fas fa-search",
      title: "Track Status",
      description: "Monitor real-time progress with detailed updates.",
    },
    {
      icon: "fas fa-edit",
      title: "Manage Complaints",
      description: "Edit or delete complaints before assignment.",
    },
  ]

  return (
    <section id="students" className="student-section py-3 bg-light">
      <Container>
        <Row className="text-center mb-3">
          <Col>
            <div className="mb-2">
              <div
                className="bg-primary-custom rounded-circle p-2 mx-auto mb-1"
                style={{ width: "40px", height: "40px" }}
              >
                <i className="fas fa-graduation-cap text-white small"></i>
              </div>
            </div>
            <h2 className="fw-bold mb-1" style={{ fontSize: '1.5rem' }}>For Students</h2>
            <p className="text-muted small mb-0">Streamlined grievance management designed specifically for student needs</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6} className="mb-3">
            <Card className="card-custom h-100 border-0 shadow-sm">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-success rounded-circle p-2 me-2" style={{ width: "32px", height: "32px" }}>
                    <i className="fas fa-check text-white small"></i>
                  </div>
                  <h6 className="fw-bold mb-0 text-success">No Registration Required</h6>
                </div>
                <p className="text-muted mb-2 small">
                  Your credentials are pre-provided by the institute.
                </p>
                <div className="bg-light p-2 rounded">
                  <small className="text-muted">
                    <i className="fas fa-shield-alt me-1 text-primary-custom"></i>
                    Your data is secure and protected with institute-level authentication
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-3">
            <Card className="card-custom h-100 border-0 shadow-sm">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-2">
                  <div className="bg-primary-custom rounded-circle p-2 me-2" style={{ width: "32px", height: "32px" }}>
                    <i className="fas fa-key text-white small"></i>
                  </div>
                  <h6 className="fw-bold mb-0">Easy Access</h6>
                </div>
                <p className="text-muted mb-2 small">
                  Log in with your PRN Manage your profile, submit
                  complaints, and track their progress all in one place.
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <Link to="/login">
                    <Button className="primary-btn btn-sm">
                      <i className="fas fa-sign-in-alt me-1"></i>
                      Student Login
                    </Button>
                  </Link>
                  <small className="text-muted">Use your PRN to login</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5 className="fw-bold text-center mb-3">What You Can Do</h5>
          </Col>
        </Row>
        <Row>
          {studentFeatures.map((feature, index) => (
            <Col key={index} md={6} lg={3} className="mb-3">
              <Card className="card-custom h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="mb-2">
                    <div
                      className="bg-primary-custom rounded-circle p-2 mx-auto"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className={`${feature.icon} text-white small`}></i>
                    </div>
                  </div>
                  <h6 className="fw-bold mb-2 small">{feature.title}</h6>
                  <p className="text-muted small" style={{ fontSize: "0.75rem" }}>
                    {feature.description}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <div className="bg-white p-3 rounded shadow-sm">
              <h6 className="fw-bold text-primary-custom mb-1 small">
                <i className="fas fa-info-circle me-1"></i>
                Important Note
              </h6>
              <p className="text-muted mb-0 small">
                You can edit or delete complaints only before faculty assignment. Once assigned, track progress and
                communicate through the system.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default StudentSection
