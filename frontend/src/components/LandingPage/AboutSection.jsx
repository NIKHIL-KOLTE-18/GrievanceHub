import { Container, Row, Col, Card } from "react-bootstrap"

const AboutSection = () => {
  const problems = [
    {
      icon: "fas fa-file-alt",
      title: "Manual Processes",
      description: "Eliminates paper-based complaint handling and reduces administrative overhead",
    },
    {
      icon: "fas fa-clock",
      title: "Delayed Resolution",
      description: "Ensures timely response and tracking of complaint resolution progress",
    },
    {
      icon: "fas fa-eye-slash",
      title: "Lack of Transparency",
      description: "Provides complete visibility into complaint status and resolution process",
    },
    {
      icon: "fas fa-user-times",
      title: "Poor Accountability",
      description: "Maintains detailed records and ensures responsible handling of grievances",
    },
  ]

  return (
    <section id="about" className="about-section py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <div className="mb-4">
              <div
                className="bg-primary-custom rounded-circle p-4 mx-auto mb-3"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="fas fa-university text-white fs-2"></i>
              </div>
            </div>
            <h2 className="fw-bold mb-3">About GrievanceHub</h2>
            <p className="text-muted lead">Transforming how educational institutions handle student grievances</p>
          </Col>
        </Row>



        <Row className="mb-5">
          <Col>
            <h4 className="fw-bold text-center mb-4">Problems We Solve</h4>
          </Col>
        </Row>
        <Row className="mb-5">
          {problems.map((problem, index) => (
            <Col key={index} md={6} lg={3} className="mb-4">
              <Card className="card-custom h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <div className="bg-danger rounded-circle p-3 mx-auto" style={{ width: "60px", height: "60px" }}>
                      <i className={`${problem.icon} text-white`}></i>
                    </div>
                  </div>
                  <h6 className="fw-bold mb-3 text-danger">{problem.title}</h6>
                  <p className="text-muted small">{problem.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <Card className="card-custom h-100 border-0 shadow-sm">
              <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success rounded-circle p-3 me-3" style={{ width: "50px", height: "50px" }}>
                    <i className="fas fa-bullseye text-white"></i>
                  </div>
                  <h5 className="fw-bold mb-0 text-success">Our Mission</h5>
                </div>
                <p className="text-muted mb-0">
                  To empower students with a transparent, efficient, and accessible platform for raising and tracking
                  their grievances, while enabling educational institutions to maintain high standards of student
                  satisfaction and institutional excellence. We strive to create an environment where every student
                  concern is addressed promptly and fairly, fostering trust and continuous improvement in the academic
                  ecosystem.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="card-custom h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-info rounded-circle p-3 me-3" style={{ width: "50px", height: "50px" }}>
                    <i className="fas fa-eye text-white"></i>
                  </div>
                  <h5 className="fw-bold mb-0 text-info">Our Vision</h5>
                </div>
                <p className="text-muted mb-0">
                  To digitally transform how academic institutions address student concerns, creating a more responsive,
                  student-friendly, and accountable educational environment. We envision a future where technology
                  bridges communication gaps, ensures transparency in grievance resolution, and contributes to building
                  stronger, more trusting relationships between students, faculty, and administration across educational
                  institutions worldwide.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <div className="bg-white p-3 rounded shadow-sm">
              <h6 className="fw-bold text-primary-custom mb-3">
                <i className="fas fa-handshake me-2"></i>
                Building Trust Through Technology
              </h6>
              <p className="text-muted mb-0">
                Our system is built on the principles of transparency, accountability, and efficiency. We believe that
                by providing the right tools and processes, we can help educational institutions create an environment
                where students feel heard, faculty can respond effectively, and administrators can maintain oversight
                and continuous improvement.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutSection
