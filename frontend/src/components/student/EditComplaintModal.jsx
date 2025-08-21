import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const EditComplaintModal = ({ show, onHide, complaint, onSave, categories, subcategoryOptions }) => {
  const [editedComplaint, setEditedComplaint] = useState({ ...complaint });

  // Update subcategory if category changes
  const handleCategoryChange = (e) => {
    setEditedComplaint({
      ...editedComplaint,
      category: e.target.value,
      subcategory: "",
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedComplaint);
    onHide();
  };

  if (!complaint) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Complaint</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSave}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Complaint Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editedComplaint.title}
                  onChange={(e) => setEditedComplaint({ ...editedComplaint, title: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={editedComplaint.category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Subcategory</Form.Label>
                <Form.Select
                  value={editedComplaint.subcategory}
                  onChange={(e) => setEditedComplaint({ ...editedComplaint, subcategory: e.target.value })}
                  required
                  disabled={!editedComplaint.category}
                >
                  <option value="">{editedComplaint.category ? "Select Subcategory" : "Select Category First"}</option>
                  {editedComplaint.category && subcategoryOptions[editedComplaint.category].map((subcat) => (
                    <option key={subcat} value={subcat}>
                      {subcat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={editedComplaint.description}
              onChange={(e) => setEditedComplaint({ ...editedComplaint, description: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" className="primary-btn">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditComplaintModal;
