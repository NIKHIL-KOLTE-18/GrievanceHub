"use client"

import { useState } from "react"
import { Card, Button, Table, Badge, Modal, Form, Row, Col, Nav, InputGroup } from "react-bootstrap"

const UserManagementSection = () => {
  const [activeTab, setActiveTab] = useState("pending")
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock pending registrations
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@college.edu",
      role: "faculty",
      department: "Computer Science",
      designation: "Assistant Professor",
      facultyId: "FAC2024010",
      registrationDate: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@student.college.edu",
      role: "student",
      department: "Information Technology",
      prn: "PRN2024156",
      year: "2024",
      course: "Bachelor of Technology",
      registrationDate: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@college.edu",
      role: "faculty",
      department: "Electronics",
      designation: "Associate Professor",
      facultyId: "FAC2024011",
      registrationDate: "2024-01-13",
      status: "pending",
    },
  ])

  // Mock active users
  const [activeUsers, setActiveUsers] = useState([
    {
      id: 4,
      name: "Dr. Mike Johnson",
      email: "mike.johnson@college.edu",
      role: "faculty",
      department: "Computer Science",
      designation: "Professor",
      facultyId: "FAC2024001",
      status: "active",
      lastLogin: "2024-01-15 09:30 AM",
      grievancesHandled: 23,
    },
    {
      id: 5,
      name: "Alice Brown",
      email: "alice.brown@student.college.edu",
      role: "student",
      department: "Computer Science",
      prn: "PRN2024001",
      year: "2024",
      status: "active",
      lastLogin: "2024-01-15 10:15 AM",
      grievancesRaised: 3,
    },
  ])

  const handleApproveUser = (userId) => {
    const user = pendingUsers.find((u) => u.id === userId)
    if (user) {
      // Move to active users
      setActiveUsers([...activeUsers, { ...user, status: "active", lastLogin: "Never" }])
      // Remove from pending
      setPendingUsers(pendingUsers.filter((u) => u.id !== userId))
      alert(`${user.name} has been approved successfully!`)
    }
  }

  const handleRejectUser = (userId) => {
    if (window.confirm("Are you sure you want to reject this registration?")) {
      const user = pendingUsers.find((u) => u.id === userId)
      setPendingUsers(pendingUsers.filter((u) => u.id !== userId))
      alert(`${user.name}'s registration has been rejected.`)
    }
  }

  const handleDeactivateUser = (userId) => {
    if (window.confirm("Are you sure you want to deactivate this user?")) {
      const user = activeUsers.find((u) => u.id === userId)
      setActiveUsers(activeUsers.map((u) => (u.id === userId ? { ...u, status: "inactive" } : u)))
      alert(`${user.name} has been deactivated.`)
    }
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  const getRoleBadge = (role) => {
    const variants = {
      faculty: "primary",
      student: "success",
      admin: "danger",
    }
    return <Badge bg={variants[role] || "secondary"}>{role}</Badge>
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      active: "success",
      inactive: "danger",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  const filteredPendingUsers = pendingUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredActiveUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">User Management</h5>
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text>
            <i className="fas fa-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Navigation Tabs */}
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link active={activeTab === "pending"} onClick={() => setActiveTab("pending")}>
            <i className="fas fa-user-clock me-2"></i>
            Pending Approvals
            <Badge bg="warning" pill className="ms-2">
              {pendingUsers.length}
            </Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "active"} onClick={() => setActiveTab("active")}>
            <i className="fas fa-users me-2"></i>
            Active Users
            <Badge bg="success" pill className="ms-2">
              {activeUsers.filter((u) => u.status === "active").length}
            </Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "inactive"} onClick={() => setActiveTab("inactive")}>
            <i className="fas fa-user-slash me-2"></i>
            Inactive Users
            <Badge bg="danger" pill className="ms-2">
              {activeUsers.filter((u) => u.status === "inactive").length}
            </Badge>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Pending Approvals Tab */}
      {activeTab === "pending" && (
        <Card className="card-custom">
          <Card.Header className="bg-warning text-dark">
            <h6 className="mb-0">
              <i className="fas fa-user-clock me-2"></i>
              Pending Registration Approvals
            </h6>
          </Card.Header>
          <Card.Body>
            {filteredPendingUsers.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-check-circle text-success fs-1 mb-3"></i>
                <h6 className="text-muted">No pending approvals</h6>
                <p className="text-muted small">All registrations have been processed</p>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover>
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPendingUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="fw-semibold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>{user.department}</td>
                        <td>{user.registrationDate}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button variant="outline-info" size="sm" onClick={() => handleViewUser(user)}>
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-success" size="sm" onClick={() => handleApproveUser(user.id)}>
                              <i className="fas fa-check"></i>
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleRejectUser(user.id)}>
                              <i className="fas fa-times"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Active Users Tab */}
      {activeTab === "active" && (
        <Card className="card-custom">
          <Card.Header className="bg-success text-white">
            <h6 className="mb-0">
              <i className="fas fa-users me-2"></i>
              Active Users
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Last Login</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActiveUsers
                    .filter((u) => u.status === "active")
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="fw-semibold">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td>{user.department}</td>
                        <td>{user.lastLogin}</td>
                        <td>{getStatusBadge(user.status)}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button variant="outline-info" size="sm" onClick={() => handleViewUser(user)}>
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button variant="outline-warning" size="sm" onClick={() => handleDeactivateUser(user.id)}>
                              <i className="fas fa-user-slash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Inactive Users Tab */}
      {activeTab === "inactive" && (
        <Card className="card-custom">
          <Card.Header className="bg-danger text-white">
            <h6 className="mb-0">
              <i className="fas fa-user-slash me-2"></i>
              Inactive Users
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActiveUsers
                    .filter((u) => u.status === "inactive")
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="fw-semibold text-muted">{user.name}</td>
                        <td className="text-muted">{user.email}</td>
                        <td>{getRoleBadge(user.role)}</td>
                        <td className="text-muted">{user.department}</td>
                        <td>{getStatusBadge(user.status)}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button variant="outline-info" size="sm" onClick={() => handleViewUser(user)}>
                              <i className="fas fa-eye"></i>
                            </Button>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() =>
                                setActiveUsers(
                                  activeUsers.map((u) => (u.id === user.id ? { ...u, status: "active" } : u)),
                                )
                              }
                            >
                              <i className="fas fa-user-check"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* View User Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Row>
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Basic Information</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-2">
                      <strong>Name:</strong> {selectedUser.name}
                    </div>
                    <div className="mb-2">
                      <strong>Email:</strong> {selectedUser.email}
                    </div>
                    <div className="mb-2">
                      <strong>Role:</strong> {getRoleBadge(selectedUser.role)}
                    </div>
                    <div className="mb-2">
                      <strong>Department:</strong> {selectedUser.department}
                    </div>
                    {selectedUser.role === "faculty" && (
                      <>
                        <div className="mb-2">
                          <strong>Faculty ID:</strong> {selectedUser.facultyId}
                        </div>
                        <div className="mb-2">
                          <strong>Designation:</strong> {selectedUser.designation}
                        </div>
                      </>
                    )}
                    {selectedUser.role === "student" && (
                      <>
                        <div className="mb-2">
                          <strong>PRN:</strong> {selectedUser.prn}
                        </div>
                        <div className="mb-2">
                          <strong>Year:</strong> {selectedUser.year}
                        </div>
                        <div className="mb-2">
                          <strong>Course:</strong> {selectedUser.course}
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Account Status</h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-2">
                      <strong>Status:</strong> {getStatusBadge(selectedUser.status)}
                    </div>
                    {selectedUser.registrationDate && (
                      <div className="mb-2">
                        <strong>Registration Date:</strong> {selectedUser.registrationDate}
                      </div>
                    )}
                    {selectedUser.lastLogin && (
                      <div className="mb-2">
                        <strong>Last Login:</strong> {selectedUser.lastLogin}
                      </div>
                    )}
                    {selectedUser.grievancesHandled && (
                      <div className="mb-2">
                        <strong>Grievances Handled:</strong> {selectedUser.grievancesHandled}
                      </div>
                    )}
                    {selectedUser.grievancesRaised && (
                      <div className="mb-2">
                        <strong>Grievances Raised:</strong> {selectedUser.grievancesRaised}
                      </div>
                    )}
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

export default UserManagementSection
