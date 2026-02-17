// AddWarehouseModal.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../../styles/ui/WarehouseDetails.css";
import axiosInstance from "../../utils/axiosInterceptor";


const AddWarehouseModal = ({ show, handleClose, onWarehouseAdded, onWarehouseUpdated, editingWarehouse }) => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    managerName: "",
    adminName: "",
    contactNumber: "",
    adminContact: "",
    centerEmail: "",
    adminEmail: "",
    capacity: "",
    spaceUsed: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.name.trim() ||
      !form.location.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      try {
        const url = editingWarehouse
          ? `/warehouse/update/${editingWarehouse._id}`
          : "/warehouse/add";

        const method = editingWarehouse ? axiosInstance.put : axiosInstance.post;

        const response = await method(url, form);
        const data = response.data;

        toast.success(editingWarehouse ? "Warehouse updated!" : "Warehouse added successfully!");

        if (editingWarehouse && onWarehouseUpdated) {
          onWarehouseUpdated(data.warehouse);
        } else if (onWarehouseAdded) {
          onWarehouseAdded(data.warehouse);
        }

        handleClose();
        setForm({
          name: "",
          location: "",
          managerName: "",
          adminName: "",
          contactNumber: "",
          centerEmail: "",
          adminEmail: "",
          capacity: "",
          spaceUsed: "",
          status: "Active",
        });
      } catch (err) {
        console.error("Add warehouse error:", err);
        toast.error(err.response?.data?.message || "❌ Server error");
      } finally {
        setLoading(false);
      }

    } catch (err) {
      console.error("Add warehouse error:", err);
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="fulfillment-modal"
    >
      <Modal.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-bold">{editingWarehouse ? "Edit Warehouse" : "Add New Warehouse"}</h5>
          <button className="btn-close" onClick={handleClose}></button>
        </div>

        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Warehouse Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter warehouse address/location"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Manager Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Manager Name"
                name="managerName"
                value={form.managerName}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Admin Name"
                name="adminName"
                value={form.adminName}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Capacity (sq ft)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 5000"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Space Used (sq ft)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 1200"
                name="spaceUsed"
                value={form.spaceUsed}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Center Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Center Contact"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Admin Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Admin Contact"
                name="adminContact"
                value={form.adminContact}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Center Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="center@email.com"
                name="centerEmail"
                value={form.centerEmail}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Admin Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="admin@email.com"
                name="adminEmail"
                value={form.adminEmail}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Under Maintenance</option>
                <option>Closed</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWarehouseModal;
