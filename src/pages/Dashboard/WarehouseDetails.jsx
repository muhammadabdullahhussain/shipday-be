import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import {
  Table,
  Badge,
  Dropdown,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import "../../styles/ui/transaction.css";
import axiosInstance from "../../utils/axiosInterceptor"; //  use interceptor

const WarehouseDetails = () => {
  const { id: warehouseId } = useParams();
  const location = useLocation();

  const warehouse = location.state?.warehouse || {
    id: "WH-000",
    name: "Default Warehouse",
    location: "Unknown",
    capacity: "0 sq. ft.",
    spaceUsed: "0 sq. ft.",
  };

  const [assignedStaff, setAssignedStaff] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editStaff, setEditStaff] = useState(null);

  // Fetch assigned staff
  useEffect(() => {
    axiosInstance
      .get(`/warehouse-staff/${warehouseId}`)
      .then((res) => setAssignedStaff(res.data))
      .catch((err) => console.error("Fetch assigned staff failed:", err));
  }, [warehouseId]);

  // Fetch all staff
  useEffect(() => {
    axiosInstance
      .get("/staff/all")
      .then((res) => setAllStaff(res.data))
      .catch((err) => console.error("Fetch all staff failed:", err));
  }, []);

  // Assign staff
  const handleAssignStaff = (staff) => {
    const payload = {
      staffId: staff._id,
      fullName: staff.fullName,
      role: staff.role,
      shift: staff.shift,
      attendance: staff.attendance || "Present",
      warehouseId,
      warehouseName: warehouse.name,
    };

    axiosInstance
      .post("/warehouse-staff/assign", payload)
      .then((res) => {
        setAssignedStaff((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          toast.error("Staff is already assigned to another warehouse");
        } else {
          console.error("Assign failed:", err);
        }
      });
  };

  const handleSelectAll = (e) => {
    setSelectedStaff(
      e.target.checked ? assignedStaff.map((s) => s.staffId) : []
    );
  };

  const handleCheckboxChange = (staffId) => {
    setSelectedStaff((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    );
  };

  const handleDelete = (assignmentId) => {
    if (window.confirm("Unassign this staff?")) {
      axiosInstance
        .delete(`/warehouse-staff/delete/${assignmentId}`)
        .then(() => {
          setAssignedStaff((prev) =>
            prev.filter((s) => s._id !== assignmentId)
          );
          setSelectedStaff((prev) =>
            prev.filter((id) => id !== assignmentId)
          );
        })
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  const handleEditSubmit = () => {
    axiosInstance
      .put(`/warehouse-staff/update/${editStaff._id}`, editStaff)
      .then((res) => {
        setAssignedStaff((prev) =>
          prev.map((s) => (s._id === res.data._id ? res.data : s))
        );
        setEditStaff(null);
      })
      .catch((err) => console.error("Update failed:", err));
  };

  // Assigned staff IDs (to prevent re-assigning from list)
  const assignedStaffIds = assignedStaff.map((s) => s.staffId);

  return (
    <div className="container-fluid px-4 py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Warehouse Details</h4>
          <p className="text-muted small mb-0">Manage warehouse capacity, staff, and operations.</p>
        </div>
        <Button variant="primary" className="px-4 py-2 rounded-3 shadow-sm" onClick={() => setShowAssignModal(true)}>
          <i className="bi bi-person-plus-fill me-2"></i> Assign Staff
        </Button>
      </div>

      {/* Info Cards Row */}
      <div className="row g-4 mb-4">
        {[
          { label: "Warehouse ID", value: warehouse.id, icon: "bi-building", color: "primary" },
          { label: "Name", value: warehouse.name, icon: "bi-geo-alt", color: "success" },
          { label: "Location", value: warehouse.location, icon: "bi-map", color: "info" },
          { label: "Capacity", value: warehouse.capacity, icon: "bi-box-seam", color: "warning" },
          { label: "Used Space", value: warehouse.spaceUsed, icon: "bi-pie-chart", color: "danger" },
        ].map((item, idx) => (
          <div className="col-md-4 col-lg-2" key={idx} style={{ flex: "1 0 18%" }}>
            <div className="card border-0 shadow-sm h-100 rounded-3 position-relative overflow-hidden">
              <div className={`position-absolute top-0 start-0 w-100 h-100 bg-${item.color} opacity-10`}></div>
              <div className="card-body p-3 text-center position-relative">
                <div className={`d-inline-flex align-items-center justify-content-center bg-${item.color}-subtle text-${item.color} rounded-circle mb-2`} style={{ width: "40px", height: "40px" }}>
                  <i className={`bi ${item.icon} fs-5`}></i>
                </div>
                <h6 className="text-muted small text-uppercase mb-1 fw-bold">{item.label}</h6>
                <p className="h6 fw-bold mb-0 text-dark text-truncate" title={item.value}>{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Staff Table Section */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 px-4 border-bottom d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Assigned Staff</h5>
          <span className="badge bg-light text-dark border rounded-pill px-3">{assignedStaff.length} Members</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0" style={{ minWidth: "800px" }}>
              <thead className="bg-light">
                <tr>
                  <th className="ps-4" style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedStaff.length > 0 && selectedStaff.length === assignedStaff.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Name</th>
                  <th>Staff ID</th>
                  <th>Role</th>
                  <th>Shift</th>
                  <th>Attendance</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignedStaff.length > 0 ? (
                  assignedStaff.map((staff) => (
                    <tr key={staff._id} style={{ transition: "all 0.2s" }}>
                      <td className="ps-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedStaff.includes(staff.staffId)}
                          onChange={() => handleCheckboxChange(staff.staffId)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", fontSize: "14px" }}>
                            {staff.fullName.charAt(0)}
                          </div>
                          <span className="fw-medium">{staff.fullName}</span>
                        </div>
                      </td>
                      <td className="text-muted small">{staff.staffId}</td>
                      <td><Badge bg="secondary" className="fw-normal px-2 py-1">{staff.role}</Badge></td>
                      <td>{staff.shift}</td>
                      <td>
                        <span className={`badge rounded-pill px-3 py-1 ${staff.attendance === "Absent" ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success"}`}>
                          <i className={`bi ${staff.attendance === "Absent" ? "bi-x-circle" : "bi-check-circle"} me-1`}></i>
                          {staff.attendance || "Present"}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <Dropdown align="end">
                          <Dropdown.Toggle as="button" className="btn btn-sm btn-light rounded-circle border-0 p-0 d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                            <i className="bi bi-three-dots-vertical text-muted"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="border shadow-lg rounded-3 p-1">
                            <Dropdown.Item onClick={() => setEditStaff(staff)} className="rounded-2 py-2 px-3 small">
                              <i className="bi bi-pencil me-2 text-primary"></i> Edit Details
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(staff._id)} className="rounded-2 py-2 px-3 small text-danger">
                              <i className="bi bi-trash me-2"></i> Unassign
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-light rounded-circle p-3 mb-3">
                          <i className="bi bi-people fs-1 text-secondary opacity-50"></i>
                        </div>
                        <p className="mb-0">No staff assigned to this warehouse yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Assign Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <p className="text-muted small mb-3">Select staff members to assign to <strong>{warehouse.name}</strong>.</p>
          <div className="border rounded-3 overflow-hidden">
            <Table hover responsive className="mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="ps-3">Name</th>
                  <th>Role</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th className="text-end pe-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allStaff.map((s) => {
                  const isAssigned = assignedStaffIds.includes(s.staffId);
                  return (
                    <tr key={s._id}>
                      <td className="ps-3 fw-medium">{s.fullName}</td>
                      <td className="small text-muted">{s.role}</td>
                      <td className="small">{s.shift}</td>
                      <td>
                        {isAssigned ? (
                          <span className="badge bg-secondary-subtle text-secondary rounded-pill">Assigned</span>
                        ) : (
                          <span className="badge bg-success-subtle text-success rounded-pill">Available</span>
                        )}
                      </td>
                      <td className="text-end pe-3">
                        <Button
                          size="sm"
                          variant={isAssigned ? "light" : "primary"}
                          className={`rounded-pill px-3 ${isAssigned ? "text-muted" : "shadow-sm"}`}
                          disabled={isAssigned}
                          onClick={() => handleAssignStaff(s)}
                        >
                          {isAssigned ? "Assigned" : "Assign"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={() => setShowAssignModal(false)} className="rounded-3">Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal - Kept functional logic, just styled buttons */}
      {editStaff && (
        <Modal show onHide={() => setEditStaff(null)} centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">Edit Staff Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Role</Form.Label>
                <Form.Select className="py-2" value={editStaff.role} onChange={(e) => setEditStaff({ ...editStaff, role: e.target.value })}>
                  <option>Warehouse Manager</option>
                  <option>Delivery Coordinator</option>
                  <option>Driver</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Shift</Form.Label>
                <Form.Select className="py-2" value={editStaff.shift} onChange={(e) => setEditStaff({ ...editStaff, shift: e.target.value })}>
                  <option>Morning</option>
                  <option>Evening</option>
                  <option>Night</option>
                  <option>Rotational</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Attendance</Form.Label>
                <Form.Select className="py-2" value={editStaff.attendance} onChange={(e) => setEditStaff({ ...editStaff, attendance: e.target.value })}>
                  <option>Present</option>
                  <option>Absent</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="light" onClick={() => setEditStaff(null)} className="rounded-3">Cancel</Button>
            <Button variant="primary" onClick={handleEditSubmit} className="rounded-3 px-4 shadow-sm">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default WarehouseDetails;
