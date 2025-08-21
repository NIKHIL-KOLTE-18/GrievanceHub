import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import axios from "axios"
import Header from "../components/LandingPage/NavbarLanding.jsx"
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9090/api";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    department: "",
    role: "student",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVariant, setAlertVariant] = useState("success")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Electrical",
    "Chemical",
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let newErrors = {}
    if (!formData.fullName) newErrors.fullName = "Full name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.studentId) newErrors.studentId = "Student/Employee ID is required"
    if (!formData.department) newErrors.department = "Please select your department"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setShowAlert(false)

    try {
      const response = await axios.post(`${API_BASE_URL}/users/register`, {
        username: parseInt(formData.studentId), // Convert to Long for backend
        fullName: formData.fullName,
        email: formData.email,
        studentId: formData.studentId,
        department: formData.department,
        role: formData.role.toUpperCase(), // Ensure role is uppercase
        password: formData.password,
      })

      setAlertVariant("success")
      setAlertMessage("Registration successful! Redirecting to login...")
      setShowAlert(true)

      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (error) {
      setAlertVariant("danger")
      setAlertMessage(error.response?.data?.message || "Registration failed. Try again.")
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <>
      <Header />
      <div className="register-page min-vh-100 d-flex align-items-center py-4">
        <Container fluid >
          <Row className="justify-content-center">
            <Col lg={11} xl={10}>
              <Card className="card-custom overflow-hidden">
                <Row className="g-0 min-vh-100">
                  {/* Left Side - Illustration */}
                  <Col md={5} className="d-none d-md-block">
                    <div className="illustration-container h-100 d-flex align-items-center justify-content-center">
                      <div className="text-center">
                        <div className="mb-4">
                          <div
                            className="bg-primary-custom rounded-3 p-4 mb-4 mx-auto d-flex align-items-center justify-content-center"
                            style={{ width: "100px", height: "100px" }}
                          >
                            <i className="fas fa-user-plus text-white" style={{ fontSize: "2.5rem" }}></i>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="d-flex justify-content-center gap-3">
                            <div className="bg-white rounded-circle p-3 shadow-sm">
                              <i className="fas fa-graduation-cap text-primary-custom fs-5"></i>
                            </div>
                            <div className="bg-white rounded-circle p-3 shadow-sm">
                              <i className="fas fa-chalkboard-teacher text-primary-custom fs-5"></i>
                            </div>
                            <div className="bg-white rounded-circle p-3 shadow-sm">
                              <i className="fas fa-user-tie text-primary-custom fs-5"></i>
                            </div>
                          </div>
                        </div>
                        <h4 className="text-primary-custom fw-bold mb-3">Join Our Community</h4>
                        <p className="text-muted px-3">Students, Faculty, and Administrators working together</p>

                        {/* Registration Process Stepper */}
                        <div className="mt-5">
                          <h5 className="fw-bold text-dark mb-4">Registration Process</h5>
                          <div className="d-flex flex-row justify-content-center gap-4">
                            {/* Step 1 */}
                            <div className="text-center">
                              <div className="bg-primary-custom rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                <i className="fas fa-user-plus text-white fs-4"></i>
                              </div>
                              <div className="fw-semibold">Register</div>
                              <div className="small text-muted">Create account<br/>with institutional credentials</div>
                            </div>
                            {/* Step 2 */}
                            <div className="text-center">
                              <div className="bg-primary-custom rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                <span className="fw-bold text-white fs-5">2</span>
                              </div>
                              <div className="fw-semibold">Verification</div>
                              <div className="small text-muted">Admin verifies<br/>credentials and department</div>
                            </div>
                            {/* Step 3 */}
                            <div className="text-center">
                              <div className="bg-primary-custom rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                <i className="fas fa-check text-white fs-5"></i>
                              </div>
                              <div className="fw-semibold">Approval</div>
                              <div className="small text-muted">Receive approval<br/>and dashboard access</div>
                            </div>
                            {/* Step 4 */}
                            <div className="text-center">
                              <div className="bg-primary-custom rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                <i className="fas fa-play text-white fs-5"></i>
                              </div>
                              <div className="fw-semibold">Start Managing</div>
                              <div className="small text-muted">Begin receiving<br/>and resolving complaints</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </Col>

                  {/* Right Side - Form */}
                  <Col md={7} className="p-4">
                    <div className="register-form h-100 d-flex flex-column">
                      <div className="mb-3">
                        <Link to="/" className="text-decoration-none">
                          <h5 className="fw-bold text-primary-custom mb-3">← GrievanceHub</h5>
                        </Link>
                        <h2 className="fw-bold mb-2">Create Account</h2>
                        <p className="text-muted mb-3">
                          Join our platform to submit and track your grievances efficiently.
                        </p>
                      </div>

                      {showAlert && (
                        <Alert variant="success" dismissible onClose={() => setShowAlert(false)} className="mb-3">
                          Registration request submitted! Admin approval required to access the system.
                        </Alert>
                      )}

                      <Form onSubmit={handleSubmit} className="flex-grow-1">
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-semibold small">Full Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                size="sm"
                                required
                                isInvalid={!!errors.fullName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.fullName}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-semibold small">Email Address</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                size="sm"
                                required
                                isInvalid={!!errors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-semibold small">Employee ID</Form.Label>
                              <Form.Control
                                type="text"
                                name="studentId"
                                placeholder="Enter your ID"
                                value={formData.studentId}
                                onChange={handleChange}
                                size="sm"
                                required
                                isInvalid={!!errors.studentId}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.studentId}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label className="fw-semibold small">Department</Form.Label>
                              <Form.Select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                size="sm"
                                required
                                isInvalid={!!errors.department}
                              >
                                <option value="">Select Department</option>
                                {departments.map((dept) => (
                                  <option key={dept} value={dept}>
                                    {dept}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                {errors.department}
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                           <Form.Group className="mb-3">
                              <Form.Label className="fw-semibold small">Password</Form.Label>
                              <div className="position-relative">
                                <Form.Control
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Create a password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  size="sm"
                                  required
                                  isInvalid={!!errors.password}
                                />
                                <span
                                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setShowPassword((prev) => !prev)}
                                >
                                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
                                </span>
                                <Form.Control.Feedback type="invalid">
                                  {errors.password}
                                </Form.Control.Feedback>
                              </div>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                          <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold small">Confirm Password</Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              size="sm"
                              required
                              isInvalid={!!errors.confirmPassword}
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y me-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                              <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-muted`}></i>
                            </span>
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </div>
                        </Form.Group>
                           
                          </Col>
                        </Row>

                       

                        <Form.Group className="mb-3">
                          <Form.Check
                            type="checkbox"
                            name="agreeTerms"
                            label="I agree to the Terms of Service and Privacy Policy of GrievanceHub"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="small"
                            required
                            isInvalid={!!errors.agreeTerms}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.agreeTerms}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Button type="submit" className="primary-btn w-100 mb-3">
                          Create Account
                        </Button>

                        <div className="text-center">
                          <span className="text-muted small">Already have an account? </span>
                          <Link to="/login" className="text-primary-custom text-decoration-none fw-semibold small">
                            Sign in here
                          </Link>
                        </div>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default RegisterPage
