import { Container, Row, Col, Card } from "react-bootstrap"

const FeaturesSection = () => {
  const features = [
    {
      icon: "fas fa-users",
      title: "Role-Based Access",
      description: "Secure authentication for Students, Faculty, and Administrators with appropriate permissions",
    },
    {
      icon: "fas fa-robot",
      title: "AI Chatbot Support",
      description: "Get instant answers to common questions before raising a formal complaint",
    },
    {
      icon: "fas fa-chart-line",
      title: "Real-time Tracking",
      description: "Monitor complaint status and resolution progress with detailed history",
    },
  ]

  return (
    <section className="features-section bg-white">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold mb-3">Key Features</h2>
            <p className="text-muted">Everything you need for effective grievance management</p>
          </Col>
        </Row>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="card-custom h-100 text-center p-4">
                <div className="mb-3">
                  <div
                    className="bg-primary-custom rounded-circle p-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className={`${feature.icon} text-white`}></i>
                  </div>
                </div>
                <Card.Body>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default FeaturesSection
