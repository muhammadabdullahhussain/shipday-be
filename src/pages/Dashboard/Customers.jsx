import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../styles/ui/transaction.css";
import axiosInstance from "../../utils/axiosInterceptor";
import { isAdmin, isSuperAdmin } from "../../utils/authHelper";

import { createPortal } from "react-dom";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import AddNewCustomerModal from "../../components/customers/AddNewCustomerModal";
import EditCustomerModal from "../../components/customers/EditCustomerModal";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomerToEdit, setSelectedCustomerToEdit] = useState(null);

  // Custom Portal Menu State
  const [menuConfig, setMenuConfig] = useState(null); // { id, top, left }

  const navigate = useNavigate();

  // Fetch customers from backend
  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/customers");
      const data = res.data;

      const formatted = data.customers
        .filter(cust => !['Admin', 'Manager', 'Super Admin', 'Admin Staff'].includes(cust.role))
        .map((cust, i) => ({
          mongodbId: cust.id,
          id: cust.customerId || `CUST-${i.toString().padStart(6, "0")}`,
          name: cust.fullName || "N/A",
          company: cust.company || "N/A",
          address: cust.location?.address || "N/A",
          email: cust.email || "N/A",
          contact: cust.phone || "N/A",
          totalOrders: cust.totalOrders || "0",
          walletBalance: cust.walletBalance !== undefined ? `R${cust.walletBalance.toFixed(2)}` : "R0.00",
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

  const handleSortClick = () => setSortAsc(!sortAsc);
  const handleFilterClick = () => setShowFilterDropdown(!showFilterDropdown);
  const handleStatusFilterSelect = (status) => {
    setFilterStatus(status);
    setShowFilterDropdown(false);
    setCurrentPage(1);
  };

  const handleRowClick = (customer) => {
    navigate(`/dashboard/customers/${customer.id}`, { state: { customer } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this customer?")) {
      setCustomersData((prev) => prev.filter((customer) => customer.id !== id));
      // Call API here if needed
    }
  };

  const handleEdit = (id) => {
    const customer = customersData.find((c) => c.id === id);
    if (!customer) return;

    setSelectedCustomerToEdit(customer);
    setShowEditModal(true);
    setMenuConfig(null);
  };

  const handleDotsClick = (e, customerId) => {
    e.stopPropagation();
    if (menuConfig?.id === customerId) {
      setMenuConfig(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const menuHeight = 110; // approximate height of the menu
    const spacing = 5;

    // Check if there's enough space below
    const showUp = rect.bottom + menuHeight + spacing > window.innerHeight;

    setMenuConfig({
      id: customerId,
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

  const filteredCustomers = customersData
    .filter((c) =>
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((c) => (filterStatus === "" ? true : c.status === filterStatus))
    .sort((a, b) => (sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredCustomers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const isAllSelected = currentRows.length > 0 && selectedCustomers.length === currentRows.length;

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCustomers(currentRows.map((c) => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectOne = (e, id) => {
    e.stopPropagation();
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="container-fluid shipments-table-section">
      {/* Search and Filters */}
      <div className="row align-items-center mb-3">
        <div className="col-md-3">
          <div className="input-group search-box">
            <input
              type="text"
              className="form-control border-0 bg-white"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
            />
            <span className="input-group-text border-0 bg-white pe-3">
              <i className="bi bi-search text-muted"></i>
            </span>
          </div>
        </div>
        <div className="col-md-9 d-flex justify-content-end gap-3 mt-2 mt-md-0 position-relative">
          {(isAdmin() || isSuperAdmin()) && (
            <button className="btn btn-primary px-4 rounded-pill shadow-sm" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-plus-lg me-2"></i> Add Manually
            </button>
          )}
          <button className="btn btn-outline-secondary px-4 rounded-pill bg-white" onClick={handleSortClick}>
            <i className="bi bi-funnel me-2"></i> Sort
          </button>
          <button className="btn btn-outline-secondary px-4 rounded-pill bg-white" onClick={handleFilterClick}>
            <i className="bi bi-sliders me-2"></i> Filter
          </button>
          {showFilterDropdown && (
            <div className="position-absolute bg-white border p-1 shadow-lg rounded-3 animate-fade-in" style={{ right: 0, top: "110%", zIndex: 1000, minWidth: "160px" }}>
              <div onClick={() => handleStatusFilterSelect("")} className="dropdown-item py-2 px-3 rounded-2" style={{ cursor: "pointer" }}>All Statuses</div>
              <div onClick={() => handleStatusFilterSelect("Active")} className="dropdown-item py-2 px-3 rounded-2" style={{ cursor: "pointer" }}>Active</div>
              <div onClick={() => handleStatusFilterSelect("Disabled")} className="dropdown-item py-2 px-3 rounded-2 text-danger" style={{ cursor: "pointer" }}>Disabled</div>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="row align-items-center justify-content-between mb-4">
        <div className="col">
          <h4 className="fw-bold shipment-title m-0">All Customers List</h4>
        </div>
        <div className="col-auto">
          <select className="form-select form-select-sm border-0 bg-white shadow-sm rounded-pill px-3 py-2">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive" style={{ overflow: "visible" }}>
        <table className="table table-hover align-middle bg-white rounded-4 overflow-hidden shadow-sm">
          <thead className="table-light">
            <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
              <th className="ps-4">
                <input type="checkbox" className="form-check-input" checked={isAllSelected} onChange={handleSelectAll} />
              </th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Company</th>
              <th className="d-none d-lg-table-cell">Email</th>
              <th className="d-none d-xl-table-cell">Contact</th>
              <th>Orders</th>
              <th>Wallet</th>
              <th>Status</th>
              <th className="pe-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((customer) => (
              <tr key={customer.id} onClick={() => handleRowClick(customer)} style={{ cursor: "pointer", borderBottom: "1px solid #f1f5f9" }}>
                <td className="ps-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={(e) => handleSelectOne(e, customer.id)}
                  />
                </td>
                <td className="fw-medium text-primary">{customer.id}</td>
                <td className="fw-bold text-dark">{customer.name}</td>
                <td className="text-muted">{customer.company}</td>
                <td className="d-none d-lg-table-cell text-muted">{customer.email}</td>
                <td className="d-none d-xl-table-cell text-muted">{customer.contact}</td>
                <td className="text-center">{customer.totalOrders}</td>
                <td className="fw-bold text-dark">{customer.walletBalance}</td>
                <td>
                  <span className={`badge rounded-pill px-3 py-2 ${customer.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="pe-4 text-end" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn btn-light btn-sm rounded-circle p-2 border-0"
                    onClick={(e) => handleDotsClick(e, customer.id)}
                    style={{ width: "32px", height: "32px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <i className="bi bi-three-dots-vertical" style={{ fontSize: "1.1rem", color: "#64748b" }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4 px-2">
        <div className="text-muted small">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredCustomers.length)} of {filteredCustomers.length} customers
        </div>
        <nav>
          <ul className="pagination pagination-sm mb-0 gap-1">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link rounded-pill border-0 bg-light text-dark px-3" onClick={() => handlePageChange(currentPage - 1)}>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button
                  className={`page-link rounded-pill border-0 px-3 ${currentPage === index + 1 ? "bg-primary text-white shadow-sm" : "bg-light text-dark"}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link rounded-pill border-0 bg-light text-dark px-3" onClick={() => handlePageChange(currentPage + 1)}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <AddNewCustomerModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onCustomerAdded={fetchCustomers}
      />

      <EditCustomerModal
        show={showEditModal}
        handleClose={() => { setShowEditModal(false); setSelectedCustomerToEdit(null); }}
        customer={selectedCustomerToEdit}
        onUpdate={fetchCustomers}
      />

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
          <button
            className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2"
            onClick={() => handleEdit(menuConfig.id)}
            style={{ fontSize: "14px", border: "none", background: "none", textAlign: "left", width: "100%" }}
          >
            <i className="bi bi-pencil-square text-primary"></i>
            <span>Edit Details</span>
          </button>
          <button
            className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2 text-danger"
            onClick={() => { handleDelete(menuConfig.id); setMenuConfig(null); }}
            style={{ fontSize: "14px", border: "none", background: "none", textAlign: "left", width: "100%" }}
          >
            <i className="bi bi-trash3"></i>
            <span>Remove</span>
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Customers;
