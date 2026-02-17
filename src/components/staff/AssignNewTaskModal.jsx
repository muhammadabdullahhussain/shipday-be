import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../../styles/ui/transaction.css";



const AssignNewTaskModal = ({ onClose }) => {
  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">Assign New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-3">
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Employee Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Role</Form.Label>
                <Form.Select>
                  <option>Manager</option>
                  <option>Driver</option>
                  <option>Coordinator</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Task Type</Form.Label>
                <Form.Select>
                  <option>Select Task Type</option>
                  <option>Pickup</option>
                  <option>Drop-off</option>
                  <option>Inventory Check</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Priority</Form.Label>
                <Form.Select>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Deadline</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Reports</Form.Label>
                <Form.Select>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>None</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="small fw-bold text-muted">Special Instructions</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Add any specific instructions for the task" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="light" onClick={onClose} className="rounded-3">Cancel</Button>
        <Button variant="primary" className="rounded-3 px-4 shadow-sm">Save Route</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignNewTaskModal;
