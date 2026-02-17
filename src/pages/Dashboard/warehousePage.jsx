// Warehouse.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import AddWarehouseModal from "../../components/warehouse/AddWarehouseModal";
import "../../styles/ui/transaction.css";
import axiosInstance from "../../utils/axiosInterceptor";
import ConfirmationModal from "../../components/common/ConfirmationModal";


const Warehouse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Custom Portal Menu State
  const [menuConfig, setMenuConfig] = useState(null); // { id, top, left }

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get("/warehouse/all")
      .then(res => setWarehouses(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);


  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "success";
      case "Under Maintenance": return "warning";
      case "Full Capacity": return "danger";
      case "Closed": return "dark";
      default: return "secondary";
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setShowModal(true);
  };

  const handleDeleteClick = (warehouse) => {
    setItemToDelete(warehouse);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      axiosInstance.delete(`/warehouse/delete/${itemToDelete._id}`)
        .then(() => {
          setWarehouses(prev => prev.filter(w => w._id !== itemToDelete._id));
          setShowDeleteModal(false);
          setItemToDelete(null);
        })
        .catch(err => console.error("Delete error:", err));
    }
  };

  const filteredWarehouses = warehouses.filter((w) =>
    w.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredWarehouses.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredWarehouses.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleRowClick = (warehouse) => {
    navigate(`${warehouse._id}`, { state: { warehouse } });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const currentIds = currentRows.map(w => w._id);
      setSelectedWarehouses(currentIds);
    } else {
      setSelectedWarehouses([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedWarehouses((prev) =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDotsClick = (e, warehouseId) => {
    e.stopPropagation();
    if (menuConfig?.id === warehouseId) {
      setMenuConfig(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const menuHeight = 100; // approximate height
    const spacing = 5;

    // Check if there's enough space below
    const showUp = rect.bottom + menuHeight + spacing > window.innerHeight;

    setMenuConfig({
      id: warehouseId,
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

  return (
    <div className="container-fluid shipments-table-section">
      {/* Search + Add */}
      <div className="row align-items-center mb-3">
        <div className="col-md-6 col-lg-4">
          <div className="input-group search-box">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="input-group-text">
              <i className="bi bi-search text-success"></i>
            </span>
          </div>
        </div>
        <div className="col text-end">
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            Add New Warehouse
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} /></th>
              <th>Warehouse ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Manager</th>
              <th>Admin Email</th>
              <th>Contact</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((w) => (
              <tr key={w._id} onClick={() => handleRowClick(w)} style={{ cursor: "pointer" }}>
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedWarehouses.includes(w._id)}
                    onChange={() => handleCheckboxChange(w._id)}
                  />
                </td>
                <td className="text-warning fw-semibold">{w.id}</td>
                <td>{w.name}</td>
                <td className="text-success">{w.location}</td>
                <td>{w.managerName || "--"}</td>
                <td>{w.adminEmail || "--"}</td>
                <td>{w.contactNumber || "--"}</td>
                <td>
                  <span className={`badge bg-${getStatusColor(w.status)}`} style={{ width: "130px", display: "inline-block" }}>
                    {w.status}
                  </span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn btn-light btn-sm rounded-circle p-2 border-0"
                    onClick={(e) => handleDotsClick(e, w._id)}
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
      <div className="row mt-3">
        <div className="col d-flex justify-content-end">
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>‹</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>›</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal */}
      <AddWarehouseModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditingWarehouse(null);
        }}
        editingWarehouse={editingWarehouse}
        onWarehouseAdded={(newWarehouse) =>
          setWarehouses((prev) => [...prev, newWarehouse])
        }
        onWarehouseUpdated={(updatedWarehouse) =>
          setWarehouses((prev) =>
            prev.map((w) => (w._id === updatedWarehouse._id ? updatedWarehouse : w))
          )
        }
      />
      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Warehouse"
        message={`Are you sure you want to delete ${itemToDelete?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Delete"
        variant="danger"
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
            onClick={() => {
              handleEdit(warehouses.find(w => w._id === menuConfig.id));
              setMenuConfig(null);
            }}
            style={{ fontSize: "14px", border: "none", background: "none", textAlign: "left", width: "100%" }}
          >
            <i className="bi bi-pencil-square text-primary"></i>
            <span>Edit</span>
          </button>
          <button
            className="dropdown-item py-2 px-3 rounded-2 d-flex align-items-center gap-2 text-danger"
            onClick={() => {
              const w = warehouses.find(wh => wh._id === menuConfig.id);
              if (w) handleDeleteClick(w);
              setMenuConfig(null);
            }}
            style={{ fontSize: "14px", border: "none", background: "none", textAlign: "left", width: "100%" }}
          >
            <i className="bi bi-trash3"></i>
            <span>Delete</span>
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Warehouse;
