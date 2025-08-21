"use client"
import { Card, Row, Col, Table, Badge, Button } from "react-bootstrap"

const SystemOverviewSection = () => {
  // Mock system statistics
  const stats = {
    totalUsers: 1247,
    activeStudents: 1156,
    activeFaculty: 89,
    pendingApprovals: 8,
    totalGrievances: 342,
    pendingGrievances: 45,
    resolvedGrievances: 267,
    rejectedGrievances: 30,
    avgResolutionTime: "4.2 days",
    satisfactionRate: "87%",
  }

  // Recent Activities section removed

  // Mock department statistics
  const departmentStats = [ 
    { department: "Computer Science", total: 89, pending: 12, resolved: 67, rejected: 10 },
    { department: "Information Technology", total: 76, pending: 8, resolved: 58, rejected: 10 },
    { department: "Electronics", total: 54, pending: 6, resolved: 42, rejected: 6 },
    { department: "Mechanical", total: 67, pending: 9, resolved: 48, rejected: 10 },
    { department: "Civil", total: 56, pending: 10, resolved: 38, rejected: 8 },
  ]

  const getActivityIcon = (type) => {
    const icons = {
      registration: "fas fa-user-plus text-info",
      grievance: "fas fa-clipboard-list text-warning",
      system: "fas fa-server text-success",
    }
    return icons[type] || "fas fa-info-circle text-muted"
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      completed: "success",
      approved: "success",
      assigned: "info",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  return (
    <div>
      <h5 className="mb-4">System Overview</h5>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="card-custom h-100">
            <Card.Body className="text-center">
              <div className="mb-2">
                <i className="fas fa-users text-primary-custom fs-2"></i>
              </div>
              <h4 className="fw-bold text-primary-custom">{stats.totalUsers}</h4>
              <p className="text-muted mb-0">Total Users</p>
              
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="card-custom h-100">
            <Card.Body className="text-center">
              <div className="mb-2">
                <i className="fas fa-clipboard-list text-warning fs-2"></i>
              </div>
              <h4 className="fw-bold text-warning">{stats.totalGrievances}</h4>
              <p className="text-muted mb-0">Total Grievances</p>
             
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="card-custom h-100">
            <Card.Body className="text-center">
              <div className="mb-2">
                <i className="fas fa-check-circle text-success fs-2"></i>
              </div>
              <h4 className="fw-bold text-success">{stats.resolvedGrievances}</h4>
              <p className="text-muted mb-0">Resolved</p>
              
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="card-custom h-100">
            <Card.Body className="text-center">
              <div className="mb-2">
                <i className="fas fa-user-clock text-danger fs-2"></i>
              </div>
              <h4 className="fw-bold text-danger">{stats.pendingApprovals}</h4>
              <p className="text-muted mb-0">Pending Approvals</p>
             
            </Card.Body>
          </Card>
        </Col>
      </Row>


      <Row>
        {/* Department Statistics + Active Students/Faculty */}
        <Col md={6} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Header className="bg-light">
              <h6 className="mb-0">
                <i className="fas fa-building me-2"></i>
                Department-wise Grievances
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Total</th>
                      <th>Pending</th>
                      <th>Resolved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentStats.map((dept, index) => (
                      <tr key={index}>
                        <td className="small">{dept.department}</td>
                        <td>
                          <Badge bg="primary">{dept.total}</Badge>
                        </td>
                        <td>
                          <Badge bg="warning">{dept.pending}</Badge>
                        </td>
                        <td>
                          <Badge bg="success">{dept.resolved}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2">
                <i className="fas fa-graduation-cap text-primary-custom fs-2"></i>
              </div>
              <h4 className="fw-bold text-primary-custom">{stats.activeStudents}</h4>
              <p className="text-muted mb-0">Active Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="card-custom h-100">
            <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2">
                <i className="fas fa-chalkboard-teacher text-warning fs-2"></i>
              </div>
              <h4 className="fw-bold text-warning">{stats.activeFaculty}</h4>
              <p className="text-muted mb-0">Active Faculty</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     
    </div>
  )
}

export default SystemOverviewSection
