import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AddNewStaffModal from "../../components/staff/AddNewStaffModal";
import AssignNewTaskModal from "../../components/staff/AssignNewTaskModal";
import "../../styles/ui/transaction.css";
import axiosInstance from "../../utils/axiosInterceptor";
import { isSuperAdmin } from "../../utils/authHelper";

const StaffManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(8);
  const [menuConfig, setMenuConfig] = useState(null); // { id, top, left }
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const isUserSuperAdmin = isSuperAdmin();

  // Fetch all staff
  useEffect(() => {
    const loadStaff = async () => {
      try {
        const res = await axiosInstance.get("/staff/all");
        setStaffData(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };
    loadStaff();
  }, []);

  const totalPages = Math.ceil(staffData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = staffData.slice(indexOfFirstRow, indexOfLastRow);

  const handleDotsClick = (e, staffId) => {
    e.stopPropagation();
    if (menuConfig?.id === staffId) {
      setMenuConfig(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const menuHeight = 100; // approximate height
    const spacing = 5;

    // Check if there's enough space below
    const showUp = rect.bottom + menuHeight + spacing > window.innerHeight;

    setMenuConfig({
      id: staffId,
      top: showUp ? rect.top - menuHeight - spacing : rect.bottom + spacing,
      left: rect.left - 120,
    });
  };

  useEffect(() => {
    const handleEvents = () => setMenuConfig(null);
    window.addEventListener("click", handleEvents);
    window.addEventListener("scroll", handleEvents, true);
    return () => {
      window.removeEventListener("click", handleEvents);
      window.removeEventListener("scroll", handleEvents, true);
    };
  }, []);

  const handleSelectAll = (e) => {
    const pageIndexes = currentRows.map((_, idx) => (currentPage - 1) * rowsPerPage + idx);
    if (e.target.checked) {
      setSelectedStaff((prev) => Array.from(new Set([...prev, ...pageIndexes])));
    } else {
      setSelectedStaff((prev) => prev.filter((index) => !pageIndexes.includes(index)));
    }
  };

  const handleSelectRow = (e, index) => {
    const globalIndex = (currentPage - 1) * rowsPerPage + index;
    if (e.target.checked) {
      setSelectedStaff((prev) => [...prev, globalIndex]);
    } else {
      setSelectedStaff((prev) => prev.filter((i) => i !== globalIndex));
    }
  };

  const isAllSelected = currentRows.every((_, idx) =>
    selectedStaff.includes((currentPage - 1) * rowsPerPage + idx)
  );

  const handleRowClick = (staff) => {
    navigate(`/dashboard/staff/${encodeURIComponent(staff.fullName)}`, { state: { staff } });
  };

  // Delete staff
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await axiosInstance.delete(`/staff/delete/${id}`);
        setStaffData(prev => prev.filter(s => s._id !== id));
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleSaveEdit = (updatedStaff) => {
    setStaffData(prev =>
      prev.map((s) => (s._id === updatedStaff._id ? updatedStaff : s))
    );
    setEditStaff(null);
  };

  const [editLocationLoading, setEditLocationLoading] = useState(false);

  const handleGetLocationForEdit = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setEditLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setEditStaff((prev) => ({
          ...prev,
          latitude,
          longitude,
          baseLocation: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }));
        setEditLocationLoading(false);
        toast.success("Location fetched successfully!");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to retrieve location. Please allow location access.");
        setEditLocationLoading(false);
      }
    );
  };



  return (
    <div className="container-fluid px-4 py-4">
      {/* Header & Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Staff Management</h4>
          <p className="text-muted small mb-0">Manage drivers, warehouse staff, and their schedules.</p>
        </div>
        <div className="d-flex gap-3">
          <div className="input-group" style={{ width: "300px" }}>
            <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 rounded-end-pill ps-0"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ boxShadow: "none" }}
            />
          </div>
          <Button variant="primary" className="rounded-pill px-4 shadow-sm" onClick={() => setShowAddModal(true)}>
            <i className="bi bi-person-plus-fill me-2"></i> Add Staff
          </Button>
        </div>
      </div>

      {/* Staff Table Card */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 px-4 border-bottom">
          <h5 className="fw-bold mb-0">All Staff List</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0" style={{ minWidth: "1000px" }}>
              <thead className="bg-light">
                <tr>
                  <th className="ps-4" style={{ width: "50px" }}>
                    <input type="checkbox" className="form-check-input" checked={isAllSelected} onChange={handleSelectAll} />
                  </th>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Shift</th>
                  <th>Location</th>
                  <th>Rating</th>
                  <th>Attendance</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((staff, index) => {
                  const globalIndex = (currentPage - 1) * rowsPerPage + index;
                  return (
                    <tr
                      key={staff._id}
                      onClick={() => handleRowClick(staff)}
                      style={{ cursor: "pointer", transition: "all 0.2s" }}
                    >
                      <td className="ps-4">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedStaff.includes(globalIndex)}
                          onChange={(e) => handleSelectRow(e, index)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="text-muted small fw-medium">{staff.staffId?.toUpperCase() || "--"}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "35px", height: "35px", fontSize: "14px" }}>
                            {staff.fullName.charAt(0)}
                          </div>
                          <span className="fw-medium">{staff.fullName}</span>
                        </div>
                      </td>
                      <td><span className="badge bg-secondary-subtle text-secondary fw-normal px-2 py-1">{staff.role}</span></td>
                      <td className="small">{staff.shift || "--"}</td>
                      <td>
                        {staff.latitude && staff.longitude ? (
                          <a
                            href={`https://www.google.com/maps?q=${staff.latitude},${staff.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary border-0 rounded-pill px-3 d-inline-flex align-items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                            style={{ background: "#eef2ff" }}
                          >
                            <i className="bi bi-geo-alt-fill text-primary"></i> <span className="small fw-semibold">View Map</span>
                          </a>
                        ) : (
                          <span className="text-muted small">{staff.baseLocation || "--"}</span>
                        )}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <i className="bi bi-star-fill text-warning" style={{ fontSize: "0.8rem" }}></i>
                          <span className="small fw-bold text-dark">4.0</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-1 ${staff.attendance === "Absent" ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success"}`}
                          style={{ cursor: "pointer" }}
                          onClick={async (e) => {
                            e.stopPropagation();
                            const newStatus = staff.attendance === "Absent" ? "Present" : "Absent";
                            try {
                              const res = await axiosInstance.put(`/staff/update/${staff._id}`, { attendance: newStatus });
                              const updatedStaff = res.data.staff;
                              if (updatedStaff) {
                                setStaffData(prev =>
                                  prev.map(s =>
                                    s._id === updatedStaff._id ? { ...s, attendance: updatedStaff.attendance } : s
                                  )
                                );
                              }
                            } catch (err) {
                              console.error("Failed to update attendance:", err);
                            }
                          }}
                        >
                          <i className={`bi ${staff.attendance === "Absent" ? "bi-x-circle" : "bi-check-circle"} me-1`}></i>
                          {staff.attendance || "Present"}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-light btn-sm rounded-circle p-0 d-inline-flex align-items-center justify-content-center"
                          style={{ width: "32px", height: "32px" }}
                          onClick={(e) => handleDotsClick(e, staff._id)}
                        >
                          <i className="bi bi-three-dots-vertical text-muted"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4 px-2">
        <div className="text-muted small">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, staffData.length)} of {staffData.length} entries
        </div>
        <nav>
          <ul className="pagination pagination-sm mb-0 gap-1">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link rounded-pill border-0 bg-light text-dark px-3" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <li key={p} className={`page-item ${p === currentPage ? "active" : ""}`}>
                <button
                  className={`page-link rounded-pill border-0 px-3 ${p === currentPage ? "bg-primary text-white shadow-sm" : "bg-light text-dark"}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link rounded-pill border-0 bg-light text-dark px-3" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {showAddModal && (
        <AddNewStaffModal
          onClose={() => setShowAddModal(false)}
          onStaffAdded={(newStaff) => setStaffData((prev) => [...prev, newStaff])}
        />
      )}
      {showAssignModal && (
        <AssignNewTaskModal onClose={() => setShowAssignModal(false)} />
      )}

      {/* React Bootstrap Edit Modal */}
      {editStaff && (
        <Modal show onHide={() => setEditStaff(null)} centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">Edit Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="pt-2">
              <Row className="mb-3">
                <Col>
                  <Form.Label className="small fw-bold text-muted">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editStaff.fullName}
                    onChange={(e) => setEditStaff({ ...editStaff, fullName: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label className="small fw-bold text-muted">Contact Info</Form.Label>
                  <Form.Control
                    type="text"
                    value={editStaff.contactInfo}
                    onChange={(e) => setEditStaff({ ...editStaff, contactInfo: e.target.value })}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label className="small fw-bold text-muted">Role</Form.Label>
                  <Form.Select
                    value={editStaff.role}
                    onChange={(e) => setEditStaff({ ...editStaff, role: e.target.value })}
                  >
                    <option>Driver</option>
                    <option>Warehouse Manager</option>
                    <option>Delivery Coordinator</option>
                    <option>Security</option>
                    <option>Inventory Coordinator</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label className="small fw-bold text-muted">Shift</Form.Label>
                  <Form.Select
                    value={editStaff.shift}
                    onChange={(e) => setEditStaff({ ...editStaff, shift: e.target.value })}
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Night</option>
                    <option>Rotational</option>
                  </Form.Select>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editStaff.email}
                  onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Base Location {editStaff.role === "Driver" && "(GPS)"}</Form.Label>
                {editStaff.role === "Driver" ? (
                  <>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        value={editStaff.baseLocation}
                        onChange={(e) => setEditStaff({ ...editStaff, baseLocation: e.target.value })}
                        readOnly={!!editStaff.latitude}
                        placeholder="Click button to get GPS coordinates"
                      />
                      <Button
                        variant="outline-primary"
                        onClick={handleGetLocationForEdit}
                        disabled={editLocationLoading}
                        style={{ minWidth: "140px" }}
                      >
                        {editLocationLoading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <>
                            <i className="bi bi-geo-alt-fill me-1"></i> Get GPS
                          </>
                        )}
                      </Button>
                      {editStaff.latitude && (
                        <Button
                          variant="outline-danger"
                          onClick={() => setEditStaff(prev => ({ ...prev, baseLocation: "", latitude: null, longitude: null }))}
                          title="Clear Location"
                        >
                          <i className="bi bi-x-lg"></i>
                        </Button>
                      )}
                    </div>
                    {editStaff.latitude && (
                      <small className="text-success mt-1 d-block">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Location captured: {editStaff.latitude.toFixed(6)}, {editStaff.longitude.toFixed(6)}
                      </small>
                    )}
                  </>
                ) : (
                  <Form.Control
                    type="text"
                    value={editStaff.baseLocation}
                    onChange={(e) => setEditStaff({ ...editStaff, baseLocation: e.target.value })}
                  />
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="light" onClick={() => setEditStaff(null)} className="rounded-3">Cancel</Button>
            <Button
              variant="primary"
              className="rounded-3 px-4 shadow-sm"
              onClick={async () => {
                try {
                  const res = await axiosInstance.put(`/staff/update/${editStaff._id}`, editStaff);
                  if (res.data.staff) {
                    handleSaveEdit(res.data.staff);
                  }
                  toast.success("Staff updated successfully!");
                } catch {
                  toast.error("Update failed");
                }
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* PORTAL MENU */}
      {menuConfig && createPortal(
        <div
          className="position-fixed bg-white border shadow-lg rounded-3 p-1 animate-fade-in"
          style={{
            top: menuConfig.top,
            left: menuConfig.left,
            zIndex: 9999,
            minWidth: "150px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {isUserSuperAdmin ? (
            <>
              <button
                className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2"
                onClick={() => {
                  setEditStaff(staffData.find(s => s._id === menuConfig.id));
                  setMenuConfig(null);
                }}
                style={{ fontSize: "14px", border: "none", background: "none", textAlign: "left", width: "100%" }}
              >
                <i className="bi bi-pencil-square text-primary"></i>
                <span>Edit</span>
              </button>
              <button
                className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2 text-danger"
                onClick={(e) => {
                  handleDelete(e, menuConfig.id);
                  setMenuConfig(null);
                }}
                style={{ fontSize: "14px", border: "none", background: "none", textAlign: "left", width: "100%" }}
              >
                <i className="bi bi-trash3"></i>
                <span>Delete</span>
              </button>
            </>
          ) : (
            <div className="dropdown-item py-2 px-3 text-muted small">View Only</div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default StaffManagement;
