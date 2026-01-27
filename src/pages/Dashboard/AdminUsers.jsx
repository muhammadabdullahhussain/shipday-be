import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../styles/ui/transaction.css";
import axiosInstance from "../../utils/axiosInterceptor";
import { isAdmin, isSuperAdmin } from "../../utils/authHelper";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortAsc, setSortAsc] = useState(true);
  const [roleFilter, setRoleFilter] = useState("All");
  const isUserSuperAdmin = isSuperAdmin();
  const [customersData, setCustomersData] = useState([]);

  // Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'Admin', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Fetch admins from backend
  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customers"); // Reusing same endpoint
      const data = res.data;

      const internalRoles = ['Admin', 'Manager', 'Super Admin', 'Admin Staff'];

      const formatted = data.customers
        .filter(cust => internalRoles.includes(cust.role))
        .map((cust, i) => ({
          _id: cust.id, // Actual Mongo ID
          id: cust.customerId || `ADM-${i.toString().padStart(6, "0")}`,
          name: cust.fullName || "N/A",
          company: cust.company || "ShipDay Internal",
          address: cust.location?.address || "N/A",
          email: cust.email || "N/A",
          contact: cust.phone || "N/A",
          role: cust.role,
          status: cust.status || "Active",
        }));
      setCustomersData(formatted);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await axiosInstance.delete(`/auth/delete/${selectedUser._id}`);
      setCustomersData(prev => prev.filter(c => c._id !== selectedUser._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, password: '' });
    setShowPassword(false);
    setShowEditModal(true);
  };

  const confirmEdit = async () => {
    if (!selectedUser) return;
    try {
      await axiosInstance.put(`/auth/update-user/${selectedUser._id}`, {
        fullName: editForm.name,
        email: editForm.email,
        role: editForm.role,
        password: editForm.password
      });

      setCustomersData(prev => prev.map(c =>
        c._id === selectedUser._id
          ? { ...c, name: editForm.name, email: editForm.email, role: editForm.role }
          : c
      ));
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  const filteredCustomers = customersData
    .filter((c) =>
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(c => roleFilter === "All" ? true : c.role === roleFilter)
    .sort((a, b) => (sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Admin': return 'bg-danger';
      case 'Admin': return 'bg-primary';
      case 'Manager': return 'bg-info text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container-fluid shipments-table-section">
      {/* Search and Filters */}
      <div className="row align-items-center mb-3 gap-3">
        <div className="col-md-3">
          <div className="input-group search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search Admins"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="input-group-text">
              <i className="bi bi-search text-success"></i>
            </span>
          </div>
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <div className="row align-items-center justify-content-between mb-3">
        <div className="col">
          <h4 className="fw-bold shipment-title">Admin / Managers List</h4>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              {isUserSuperAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((customer, index) => (
              <tr key={index}>
                <td className="shipment-id">{customer.id}</td>
                <td>{customer.name}</td>
                <td><span className={`badge ${getRoleBadge(customer.role)}`}>{customer.role}</span></td>
                <td>{customer.email}</td>
                <td><span className="badge bg-success">{customer.status}</span></td>
                {isUserSuperAdmin && (
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openEditModal(customer)}
                      disabled={customer.role === 'Super Admin'}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => openDeleteModal(customer)}
                      disabled={customer.role === 'Super Admin'}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin / Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave blank to keep current password"
                  value={editForm.password}
                  onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                />
                <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirmEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
          <br /><br />
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete User</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default AdminUsers;
