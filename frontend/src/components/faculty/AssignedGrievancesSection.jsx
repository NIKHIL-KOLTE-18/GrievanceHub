"use client"

import { useState } from "react"
import { Card, Button, Table, Badge, Modal, Form, Row, Col, InputGroup } from "react-bootstrap"

const AssignedGrievancesSection = ({ facultyData }) => {
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [facultyNotes, setFacultyNotes] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [showContactModal, setShowContactModal] = useState(false)

  // Mock assigned grievances data
  const [grievances, setGrievances] = useState([
    {
      id: "GRV001",
      title: "Library Book Issue",
      raisedBy: "John Doe",
      studentPRN: "PRN2024001",
      status: "Pending",
      dateAssigned: "2024-01-15",
      description:
        "Unable to access required books for my course. The library system shows the books are available but when I go to collect them, they are not on the shelf. This has been happening for the past week and is affecting my studies. I need these books for my upcoming assignment which is due next week.",
      category: "Academic",
      attachedFile: "library_issue_screenshot.png",
      studentDepartment: "Computer Science",
      facultyNotes: "",
      resolutionFile: null,
      rating: null,
    },
    {
      id: "GRV002",
      title: "Hostel Maintenance Issue",
      raisedBy: "Jane Smith",
      studentPRN: "PRN2024002",
      status: "In Progress",
      dateAssigned: "2024-01-12",
      description:
        "Air conditioning not working in room 205. The issue started 3 days ago and despite multiple complaints to the hostel warden, no action has been taken. The room temperature is unbearable, especially during the night, making it difficult to study and sleep.",
      category: "Administrative",
      attachedFile: null,
      studentDepartment: "Computer Science",
      facultyNotes: "Contacted maintenance team. Work scheduled for tomorrow.",
      resolutionFile: null,
      rating: null,
    },
    {
      id: "GRV003",
      title: "Exam Schedule Conflict",
      raisedBy: "Mike Johnson",
      studentPRN: "PRN2024003",
      status: "Resolved",
      dateAssigned: "2024-01-08",
      description:
        "Two exams scheduled at the same time for different subjects. This creates a conflict as I cannot attend both exams simultaneously. Need rescheduling of one of the exams.",
      category: "Academic",
      attachedFile: "exam_schedule.pdf",
      studentDepartment: "Computer Science",
      facultyNotes: "Rescheduled Database exam to next day. Student notified.",
      resolutionFile: "revised_schedule.pdf",
      rating: 5,
    },
    {
      id: "GRV004",
      title: "Canteen Food Quality",
      raisedBy: "Sarah Wilson",
      studentPRN: "PRN2024004",
      status: "Rejected",
      dateAssigned: "2024-01-05",
      description:
        "Poor quality food being served in the canteen. Multiple students have complained about the taste and hygiene. This is affecting student health and satisfaction.",
      category: "Administrative",
      attachedFile: null,
      studentDepartment: "Computer Science",
      facultyNotes: "Forwarded to canteen committee. Outside faculty jurisdiction.",
      resolutionFile: null,
      rating: 2,
    },
  ])

  const getStatusBadge = (status) => {
    const variants = {
      Pending: "warning",
      "In Progress": "info",
      Resolved: "success",
      Rejected: "danger",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const handleViewGrievance = (grievance) => {
    setSelectedGrievance(grievance)
    setNewStatus(grievance.status)
    setFacultyNotes(grievance.facultyNotes || "")
    setShowViewModal(true)
  }

  const handleUpdateStatus = () => {
    if (selectedGrievance) {
      const updatedGrievances = grievances.map((g) =>
        g.id === selectedGrievance.id
          ? {
              ...g,
              status: newStatus,
              facultyNotes: facultyNotes,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : g,
      )
      setGrievances(updatedGrievances)
      setSelectedGrievance({ ...selectedGrievance, status: newStatus, facultyNotes: facultyNotes })
      alert("Status updated successfully!")
    }
  }

  const generateSummary = (description) => {
    // Simple summary generation (in real app, this could be AI-powered)
    const sentences = description.split(". ")
    return sentences.slice(0, 2).map((sentence, index) => <li key={index}>{sentence.trim()}</li>)
  }

  const filteredGrievances = grievances.filter((grievance) => {
    const matchesSearch =
      grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.raisedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grievance.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "" || grievance.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Header with Search and Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">Assigned Grievances</h5>
        <div className="d-flex gap-2">
          <InputGroup style={{ width: "250px" }}>
            <InputGroup.Text>
              <i className="fas fa-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search grievances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Form.Select
            style={{ width: "150px" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </Form.Select>
        </div>
      </div>

      {/* Grievances Table */}
      <Card className="card-custom">
        <Card.Body>
          {filteredGrievances.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-tasks text-muted fs-1 mb-3"></i>
              <h6 className="text-muted">No grievances found</h6>
              <p className="text-muted small">No grievances match your current filters</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Complaint ID</th>
                    <th>Title</th>
                    <th>Raised By</th>
                    <th>Status</th>
                    <th>Date Assigned</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrievances.map((grievance) => (
                    <tr key={grievance.id}>
                      <td className="fw-bold text-primary-custom">{grievance.id}</td>
                      <td>{grievance.title}</td>
                      <td>
                        <div>
                          <div className="fw-semibold">{grievance.raisedBy}</div>
                          <small className="text-muted">{grievance.studentPRN}</small>
                        </div>
                      </td>
                      <td>{getStatusBadge(grievance.status)}</td>
                      <td>{grievance.dateAssigned}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => handleViewGrievance(grievance)}>
                          <i className="fas fa-eye me-1"></i>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* View Grievance Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Grievance Details - {selectedGrievance?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGrievance && (
            <Row>
              {/* Left Column - Grievance Details */}
              <Col md={8}>
                {/* Student Information */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-user me-2"></i>
                      Student Information
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <strong>Name:</strong> {selectedGrievance.raisedBy}
                      </Col>
                      <Col md={6}>
                        <strong>PRN:</strong> {selectedGrievance.studentPRN}
                      </Col>
                      <Col md={6}>
                        <strong>Department:</strong> {selectedGrievance.studentDepartment}
                      </Col>
                      <Col md={6}>
                        <strong>Category:</strong> {selectedGrievance.category}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Grievance Details */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-clipboard-list me-2"></i>
                      Grievance Details
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <strong>Title:</strong> {selectedGrievance.title}
                    </div>
                    <div className="mb-3">
                      <strong>Status:</strong> {getStatusBadge(selectedGrievance.status)}
                    </div>
                    <div className="mb-3">
                      <strong>Date Assigned:</strong> {selectedGrievance.dateAssigned}
                    </div>
                    <div className="mb-3">
                      <strong>Description:</strong>
                      <p className="mt-2 p-3 bg-light rounded">{selectedGrievance.description}</p>
                    </div>
                    {selectedGrievance.attachedFile && (
                      <div className="mb-3">
                        <strong>Attached File:</strong>
                        <div className="mt-2">
                          <Button variant="outline-primary" size="sm">
                            <i className="fas fa-download me-1"></i>
                            {selectedGrievance.attachedFile}
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card.Body>
                </Card>

                {/* Auto-Generated Summary */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-list-ul me-2"></i>
                      Summary Points
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <ul className="mb-0">{generateSummary(selectedGrievance.description)}</ul>
                  </Card.Body>
                </Card>

                {/* Rating (if resolved) */}
                {selectedGrievance.rating && (
                  <Card className="mb-3">
                    <Card.Header className="bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-star me-2"></i>
                        Student Rating
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < selectedGrievance.rating ? "text-warning" : "text-muted"}`}
                          ></i>
                        ))}
                        <span className="ms-2">({selectedGrievance.rating}/5)</span>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Col>

              {/* Right Column - Actions */}
              <Col md={4}>
                {/* Update Status */}
                <Card className="mb-3">
                  <Card.Header className="bg-primary-custom text-white">
                    <h6 className="mb-0">
                      <i className="fas fa-edit me-2"></i>
                      Update Status
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </Form.Select>
                    </Form.Group>
                    <Button className="primary-btn w-100" onClick={handleUpdateStatus}>
                      Update Status
                    </Button>
                  </Card.Body>
                </Card>

                {/* Faculty Notes */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-sticky-note me-2"></i>
                      Faculty Notes
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Add your notes or remarks..."
                        value={facultyNotes}
                        onChange={(e) => setFacultyNotes(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Upload Resolution File */}
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-upload me-2"></i>
                      Resolution File
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-2">
                      <Form.Control type="file" size="sm" />
                    </Form.Group>
                    <Button variant="outline-primary" size="sm" className="w-100">
                      Upload File
                    </Button>
                    {selectedGrievance.resolutionFile && (
                      <div className="mt-2">
                        <small className="text-success">
                          <i className="fas fa-check me-1"></i>
                          {selectedGrievance.resolutionFile}
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-bolt me-2"></i>
                      Quick Actions
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Button variant="success" size="sm">
                        <i className="fas fa-check me-1"></i>
                        Mark as Resolved
                      </Button>
                      <Button variant="info" size="sm" onClick={() => setShowContactModal(true)}>
                        <i className="fas fa-phone me-1"></i>
                        Contact Student
                      </Button>
      {/* Contact Student Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGrievance ? (
            <div>
              <p><strong>Name:</strong> {selectedGrievance.raisedBy}</p>
              <p><strong>PRN:</strong> {selectedGrievance.studentPRN}</p>
              <p><strong>Department:</strong> {selectedGrievance.studentDepartment}</p>
              {/* Add more fields if available, e.g., email, phone */}
              <p><strong>Email:</strong> {selectedGrievance.studentEmail || 'Not available'}</p>
              <p><strong>Phone:</strong> {selectedGrievance.studentPhone || 'Not available'}</p>
            </div>
          ) : (
            <p>No student selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowContactModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AssignedGrievancesSection
