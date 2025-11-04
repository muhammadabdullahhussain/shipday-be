import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../styles/ui/ShipmentListPage.css";
import axiosInstance from "../../utils/axiosInterceptor";
import AssignShipmentModal from "../../components/AssignShipmentModal";
import CreateShipmentForm from "../../components/CreateShipmentForm";
import EditShipmentModal from "../../components/EditShipmentModal";
import ShipmentDetailsModal from "../../components/ShipmentDetailsModal";
import Button from "../../components/ui/Button";
import ActionButton from "../../components/ui/ActionButton";

const ShipmentsTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedShipmentDetails, setSelectedShipmentDetails] = useState(null);

  const rowsPerPage = 8;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchShipments = async () => {  
    try {
      const res = await axiosInstance.get("/shipments");

      const processed = res.data.map((shipment) => {
        // Get driver name from the driver object if it exists, fallback to driverName field
        const driverName = shipment.driver?.username || shipment.driverName || "Unassigned";
        
        // Determine status based on API response or orders
        let status = shipment.status || "Pending";
        
        // If there are orders, check if all are delivered
        if (shipment.orders && shipment.orders.length > 0) {
          const allDelivered = shipment.orders.every((order) => order.status === "Delivered");
          if (allDelivered) {
            status = "Delivered";
          }
        }

        return {
          ...shipment, // Keep all original fields
          origin: shipment.start,
          destination: shipment.end,
          estimatedDelivery: formatDate(shipment.eta),
          dateShipped: formatDate(shipment.dateShipped || shipment.createdAt),
          status: t(`shipments.${status.toLowerCase()}`),
          driverName,
        };
      });

      setShipments(processed);
    } catch (err) {
      console.error("❌ Error fetching shipments", err);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, [t]);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(null);
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  // const generateShipments = async () => {
  //   setLoading(true);
  //   try {
  //     await axiosInstance.post("/shipment/generate");
  //     await fetchShipments();
  //   } catch (err) {
  //     console.error("❌ Error generating shipments", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const filteredShipments = shipments
    .filter((shipment) =>
      shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((shipment) => (statusFilter ? shipment.status === statusFilter : true))
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField];
      const valB = b[sortField];
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredShipments.length / rowsPerPage);
  const currentRows = filteredShipments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const statusBadge = (status) => {
    switch (status) {
      case t("shipments.delivered"):
        return "bg-success text-white";
      case t("shipments.pending"):
        return "bg-warning text-dark";
      case t("shipments.shipping"):
        return "bg-info text-dark";
      case t("shipments.delayed"):
        return "bg-danger text-white";
      default:
        return "bg-dark text-white";
    }
  };



  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedShipments(currentRows.map((s) => s.shipmentId));
    } else {
      setSelectedShipments([]);
    }
  };

  const handleSelectShipment = (shipmentId) => {
    setSelectedShipments((prev) =>
      prev.includes(shipmentId)
        ? prev.filter((id) => id !== shipmentId)
        : [...prev, shipmentId]
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDropdownToggle = (shipmentId) => {
    setDropdownOpen(dropdownOpen === shipmentId ? null : shipmentId);
  };

  const handleEdit = (shipment) => {
    if (shipment.status === t("shipments.pending") || shipment.status === "Pending") {
      setEditingShipment(shipment);
      setShowEditModal(true);
    } else {
      navigate(`/dashboard/shipments/${shipment.shipmentId}`, {
        state: { shipment, action: "edit" },
      });
    }
    setDropdownOpen(null);
  };

  const handleAssignDriver = (shipment) => {
    setSelectedShipment(shipment);
    setShowAssignModal(true);
    setDropdownOpen(null);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedShipment(null);
  };

  const handleDriverAssignment = async (driverId, shipmentId) => {
    try {
      console.log('Assigning driver:', driverId, 'to shipment:', shipmentId);
      // Add API call here to assign driver to shipment
      handleCloseAssignModal();
      await fetchShipments(); // Refresh shipments
    } catch (error) {
      console.error('Error assigning driver:', error);
    }
  };

  const handleUpdateShipment = async (shipmentId, updateData) => {
    try {
      await axiosInstance.patch(`/shipments/${shipmentId}`, updateData);
      setShowEditModal(false);
      setEditingShipment(null);
      await fetchShipments();
    } catch (error) {
      console.error('Error updating shipment:', error);
    }
  };

  const handleDeleteShipment = async (shipment) => {
    if (window.confirm(`Are you sure you want to delete shipment ${shipment.shipmentId}?`)) {
      try {
        await axiosInstance.delete(`/admin/shipments/${shipment.shipmentId}`);
        await fetchShipments();
      } catch (error) {
        console.error('Error deleting shipment:', error);
      }
    }
    setDropdownOpen(null);
  };

  const handleCreateShipment = async (formData) => {
    setCreateLoading(true);
    try {
      await axiosInstance.post('/admin/shipments', formData);
      setShowCreateModal(false);
      await fetchShipments();
    } catch (error) {
      console.error('Error creating shipment:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="shipment-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control search-box"
          placeholder={t("shipments.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => handleSort("shipmentId")}
          >
            {t("shipments.sortById")}{" "}
            {sortField === "shipmentId" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </Button>

          <Button
            variant="outline-secondary"
            icon="filter"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {t("shipments.filter")}
          </Button>

          <Button
            variant="success"
            icon="plus"
            onClick={() => setShowCreateModal(true)}
          >
            Create Shipment
          </Button>

          {/* <button
            className="btn btn-primary"
            onClick={generateShipments}
            disabled={loading}
          >
            {loading ? t("shipments.generating") : t("shipments.addShipment")}
          </button> */}

          {showFilter && (
            <select
              className="form-select mt-2"
              value={statusFilter}
              onChange={handleFilter}
              style={{ width: "200px" }}
            >
              <option value="">{t("shipments.allStatuses")}</option>
              <option value={t("shipments.delivered")}>
                {t("shipments.delivered")}
              </option>
              <option value={t("shipments.pending")}>
                {t("shipments.pending")}
              </option>
              <option value={t("shipments.shipping")}>
                {t("shipments.shipping")}
              </option>
              <option value={t("shipments.delayed")}>
                {t("shipments.delayed")}
              </option>
            </select>
          )}
        </div>
      </div>

      <h5 className="fw-bold mb-3">{t("shipments.title")}</h5>

      {/* ✅ Fixed overflow container */}
      <div
        className="table-responsive"
        style={{
          overflow: "visible",
          position: "relative",
          zIndex: 1,
        }}
      >
        <table
          className="table table-hover align-middle"
          style={{ overflow: "visible", position: "relative" }}
        >
          <thead className="table-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    currentRows.length > 0 &&
                    currentRows.every((row) =>
                      selectedShipments.includes(row.shipmentId)
                    )
                  }
                />
              </th>
              <th>{t("shipments.shipmentId")}</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>{t("shipments.origin")}</th>
              <th>{t("shipments.destination")}</th>
              <th>Driver Name</th>
              <th>{t("shipments.eta")}</th>
              <th>{t("shipments.status")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, idx) => (
              <tr 
                key={idx} 
                style={{ position: "relative", overflow: "visible", cursor: "pointer" }}
                onClick={() => {
                  setSelectedShipmentDetails(item);
                  setShowDetailsModal(true);
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedShipments.includes(item.shipmentId)}
                    onChange={() => handleSelectShipment(item.shipmentId)}
                  />
                </td>
                <td className="text-primary">{item.shipmentId}</td>
                <td>
                  <div>{item.senderName || "N/A"}</div>
                  <small className="text-muted">{item.senderPhone || "N/A"}</small>
                </td>
                <td>
                  <div>{item.receiverName || "N/A"}</div>
                  <small className="text-muted">{item.receiverPhone || "N/A"}</small>
                </td>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
                <td>{item.driverName}</td>
                <td>{item.estimatedDelivery}</td>
                <td>
                  <span className={`badge ${statusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="position-relative">
                  <span
                    className="dots"
                    style={{ cursor: "pointer", fontSize: "20px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownToggle(item.shipmentId);
                    }}
                  >
                    ⋯
                  </span>

                  {dropdownOpen === item.shipmentId && item.status !== t("shipments.delivered") && (
                    <div
                      className="position-absolute"
                      style={{
                        top: "100%",
                        right: 0,
                        zIndex: 9999,
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "8px",
                        minWidth: "150px",
                        border: "1px solid rgba(0,0,0,0.1)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        overflow: "visible",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Edit */}
                      <button
                        className="w-100 border-0 text-start px-3 py-2 d-flex align-items-center gap-2 rounded"
                        style={{
                          backgroundColor: "rgba(131, 110, 254, 0.12)",
                          color: "#836EFE",
                          fontSize: "14px",
                          transition: "background-color 0.2s",
                          marginBottom: "6px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                      >
                        ✏️ Edit
                      </button>

                      {/* Assign Driver */}
                      <button
                        className="w-100 border-0 text-start px-3 py-2 d-flex align-items-center gap-2 rounded"
                        style={{
                          backgroundColor: "rgba(131, 110, 254, 0.12)",
                          color: "#836EFE",
                          fontSize: "14px",
                          transition: "background-color 0.2s",
                          marginBottom: "6px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAssignDriver(item);
                        }}
                      >
                        👤 Assign
                      </button>

                      {/* Delete */}
                      <button
                        className="w-100 border-0 text-start px-3 py-2 d-flex align-items-center gap-2 rounded"
                        style={{
                          backgroundColor: "rgba(220, 38, 38, 0.12)",
                          color: "#dc2626",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteShipment(item);
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-wrapper mt-4 d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              {t("shipments.back")}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <li
              key={p}
              className={`page-item ${p === currentPage ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(p)}>
                {p}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              {t("shipments.next")}
            </button>
          </li>
        </ul>
      </div>

      <AssignShipmentModal
        show={showAssignModal}
        onClose={handleCloseAssignModal}
        shipment={selectedShipment}
        onAssign={handleDriverAssignment}
      />

      {/* Create Shipment Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Shipment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <CreateShipmentForm
                onSubmit={handleCreateShipment}
                onCancel={() => setShowCreateModal(false)}
                loading={createLoading}
              />
            </div>
          </div>
        </div>
      )}

      <EditShipmentModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingShipment(null);
        }}
        shipment={editingShipment}
        onUpdate={fetchShipments}
      />

      <ShipmentDetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        shipment={selectedShipmentDetails}
        statusBadge={statusBadge}
      />
    </div>
  );
};

export default ShipmentsTable;