import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import Header from "../components/LandingPage/NavbarLanding.jsx";

const ForgotPassword = () => {
  const [role, setRole] = useState("student");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
    setShowAlert(true);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Simulate password change logic
    alert("Password changed successfully!");
  };

  return (
    <>
      <Header />
      <div className="login-page min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="card-custom p-4">
                <h2 className="fw-bold mb-3 text-center">Forgot Password</h2>
                <p className="text-muted text-center mb-4">
                  Enter your PRN (for students) or Faculty ID (for faculty) and registered email to receive an OTP.
                </p>

                {showAlert && (
                  <Alert variant="info" dismissible onClose={() => setShowAlert(false)}>
                    OTP sent to your email. Please check your inbox.
                  </Alert>
                )}

                <Form onSubmit={handleChangePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Role</Form.Label>
                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">
                      {role === "student" ? "PRN Number" : "Faculty ID"}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={role === "student" ? "Enter your PRN number" : "Enter your Faculty ID"}
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Registered Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Enter OTP</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Enter the OTP sent to your email"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      <Button variant="outline-primary" onClick={handleSendOtp}>
                        Send OTP
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {otpSent && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold small">New Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold small">Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Re-enter new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </>
                  )}

                  <Button type="submit" className="primary-btn w-100">
                    Change Password
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
