"use client"

import { useState } from "react"
import { Card, Button, Table, Modal, Form, Row, Col, Badge } from "react-bootstrap"

const CategoryManagementSection = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    department: "",
    subcategory: "",
    priority: "medium",
  })

  // Mock categories data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Academic Issues",
      description: "Issues related to courses, exams, grades, and academic matters",
      department: "Computer Science",
      priority: "high",
      subcategory: "Exam Issue",
      grievanceCount: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Infrastructure",
      description: "Problems with college infrastructure, facilities, and maintenance",
      department: "Administration",
      priority: "medium",
      subcategory: "Classroom Maintenance",
      grievanceCount: 23,
      status: "active",
    },
    {
      id: 3,
      name: "Hostel Issues",
      description: "Hostel-related complaints including accommodation and facilities",
      department: "Administration",
      priority: "medium",
      subcategory: "Hostel",
      grievanceCount: 18,
      status: "active",
    },
    {
      id: 4,
      name: "Fee Related",
      description: "Issues related to fee payment, refunds, and financial matters",
      department: "Accounts",
      priority: "high",
      subcategory: "Fees",
      grievanceCount: 12,
      status: "active",
    },
    {
      id: 5,
      name: "Library Services",
      description: "Library-related issues including book availability and services",
      department: "Library",
      priority: "low",
      subcategory: "General",
      grievanceCount: 8,
      status: "inactive",
    },
  ])

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Administration",
    "Library",
    "Accounts",
  ]

  const handleAddCategory = (e) => {
    e.preventDefault()
    const category = {
      id: categories.length + 1,
      ...newCategory,
      grievanceCount: 0,
      status: "active",
    }
    setCategories([...categories, category])
    setNewCategory({ name: "", description: "", department: "", priority: "medium", autoAssign: false })
    setShowAddModal(false)
    alert("Category added successfully!")
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      department: category.department,
      priority: category.priority,
      autoAssign: category.autoAssign,
    })
    setShowEditModal(true)
  }

  const handleUpdateCategory = (e) => {
    e.preventDefault()
    const updatedCategories = categories.map((cat) =>
      cat.id === selectedCategory.id ? { ...cat, ...newCategory } : cat,
    )
    setCategories(updatedCategories)
    setShowEditModal(false)
    setSelectedCategory(null)
    setNewCategory({ name: "", description: "", department: "", priority: "medium", autoAssign: false })
    alert("Category updated successfully!")
  }

  const handleToggleStatus = (categoryId) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === categoryId ? { ...cat, status: cat.status === "active" ? "inactive" : "active" } : cat,
    )
    setCategories(updatedCategories)
  }

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== categoryId))
      alert("Category deleted successfully!")
    }
  }

  const getPriorityBadge = (priority) => {
    const variants = {
      high: "danger",
      medium: "warning",
      low: "info",
    }
    return <Badge bg={variants[priority] || "secondary"}>{priority}</Badge>
  }

  const getStatusBadge = (status) => {
    const variants = {
      active: "success",
      inactive: "secondary",
    }
    return <Badge bg={variants[status] || "secondary"}>{status}</Badge>
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">Manage Categories</h5>
        <Button className="primary-btn" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus me-2"></i>
          Add New Category
        </Button>
      </div>

      {/* Categories Table */}
      <Card className="card-custom">
        <Card.Body>
          <div className="table-responsive">
            <Table hover>
              <thead className="table-light">
                <tr>
                  <th>Category Name</th>
                  <th>Department</th>
                  <th>Subcategory</th>
                  <th>Priority</th>
                  <th>Grievances</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <div>
                        <div className="fw-semibold">{category.name}</div>
                        <small className="text-muted">{category.description}</small>
                      </div>
                    </td>
                    <td>{category.department}</td>
                    <td>{category.subcategory}</td>
                    <td>{getPriorityBadge(category.priority)}</td>
                    <td>
                      <Badge bg="primary">{category.grievanceCount}</Badge>
                    </td>
                    <td>{getStatusBadge(category.status)}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEditCategory(category)}>
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          variant={category.status === "active" ? "outline-warning" : "outline-success"}
                          size="sm"
                          onClick={() => handleToggleStatus(category.id)}
                        >
                          <i className={`fas ${category.status === "active" ? "fa-pause" : "fa-play"}`}></i>
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                          <i className="fas fa-trash"></i>
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

      {/* Add Category Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCategory}>
          <Modal.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    value={newCategory.department}
                    onChange={(e) => setNewCategory({ ...newCategory, department: e.target.value })}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subcategory (e.g. Exam Issue, Hostel, Fees)"
                    value={newCategory.subcategory}
                    onChange={(e) => setNewCategory({ ...newCategory, subcategory: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter category description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority Level</Form.Label>
                  <Form.Select
                    value={newCategory.priority}
                    onChange={(e) => setNewCategory({ ...newCategory, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {/* <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Auto Assignment</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Enable automatic assignment to faculty"
                    checked={newCategory.autoAssign}
                    onChange={(e) => setNewCategory({ ...newCategory, autoAssign: e.target.checked })}
                  />
                </Form.Group>
              </Col> */}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="primary-btn">
              Add Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateCategory}>
          <Modal.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    value={newCategory.department}
                    onChange={(e) => setNewCategory({ ...newCategory, department: e.target.value })}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subcategory (e.g. Exam Issue, Hostel, Fees)"
                    value={newCategory.subcategory}
                    onChange={(e) => setNewCategory({ ...newCategory, subcategory: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter category description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                required
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority Level</Form.Label>
                  <Form.Select
                    value={newCategory.priority}
                    onChange={(e) => setNewCategory({ ...newCategory, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Auto Assignment</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Enable automatic assignment to faculty"
                    checked={newCategory.autoAssign}
                    onChange={(e) => setNewCategory({ ...newCategory, autoAssign: e.target.checked })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" className="primary-btn">
              Update Category
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default CategoryManagementSection
