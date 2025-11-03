import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInterceptor";
import EditDriverModal from "../../components/EditDriverModal";
import AssignDriverModal from "../../components/AssignDriverModal";
import DriverVerificationModal from "../../components/DriverVerificationModal";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState("accepted");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({});
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const fetchDrivers = async (status) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/admin/drivers/${status}`);
      setDrivers(data.drivers);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers(filter);
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(null);
      }
    };

    if (dropdownOpen) {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [dropdownOpen]);

  const handleDropdownToggle = (driverId) => {
    setDropdownOpen(dropdownOpen === driverId ? null : driverId);
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setEditForm({
      username: driver.username,
      email: driver.email,
      phone: driver.phone,
      vehicleType: driver.vehicleType,
      vehicleNumber: driver.vehicleNumber,
      status: driver.status,
      isActive: driver.isActive
    });
    setShowEditModal(true);
    setDropdownOpen(null);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedDriver(null);
    setEditForm({});
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      console.log('Saving changes:', editForm);
      // Add API call here to update driver
      handleCloseModal();
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  const handleAssign = (driver) => {
    setSelectedDriver(driver);
    setAssignForm({
      driverName: driver.username,
      priority: '',
      startLocation: '',
      endLocation: '',
      deadline: '',
      reports: '',
      specialInstructions: ''
    });
    setShowAssignModal(true);
    setDropdownOpen(null);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedDriver(null);
    setAssignForm({});
  };

  const handleAssignFormChange = (e) => {
    const { name, value } = e.target;
    setAssignForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignDriver = async () => {
    try {
      console.log('Assigning driver:', assignForm);
      // Add API call here to assign driver
      handleCloseAssignModal();
    } catch (error) {
      console.error('Error assigning driver:', error);
    }
  };

  const handleVerifyDriver = (driver) => {
    setSelectedDriver(driver);
    setShowVerificationModal(true);
    setDropdownOpen(null);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
    setSelectedDriver(null);
  };

  const updateDriverStatus = async (driverId, status) => {
    try {
      await axiosInstance.put('/admin/drivers/status', { driverId, status });
      handleCloseVerificationModal();
      fetchDrivers(filter);
    } catch (error) {
      console.error('Error updating driver status:', error);
      alert('Error updating driver status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAcceptDriver = async (driver) => {
    await updateDriverStatus(driver.driverId, 'approved');
  };

  const handleRejectDriver = async (driver) => {
    await updateDriverStatus(driver.driverId, 'rejected');
  };

  const handleDelete = (driver) => {
    if (window.confirm(`Are you sure you want to delete driver ${driver.username}?`)) {
      console.log("Delete driver:", driver);
      setDropdownOpen(null);
    }
  };

  const statusBadge = (status) => {
    return status === "approved" ? "bg-success text-white" : "bg-warning text-dark";
  };

  const activeBadge = (isActive) => {
    return isActive ? "bg-primary text-white" : "bg-secondary text-white";
  };

  return (
    <div className="drivers-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Drivers Management</h4>
        <div className="btn-group">
          <button
            className={`btn ${filter === "accepted" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("accepted")}
          >
            Accepted ({drivers.length})
          </button>
          <button
            className={`btn ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div
            className="table-responsive d-none d-lg-block"
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
                  <th>Driver ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Number</th>
                  <th>Status</th>
                  <th>Active</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr key={driver._id} style={{ position: "relative", overflow: "visible" }}>
                    <td className="text-primary fw-bold">{driver.driverId}</td>
                    <td>{driver.username}</td>
                    <td>{driver.email}</td>
                    <td>{driver.phone}</td>
                    <td>
                      <span className="badge bg-info text-dark">{driver.vehicleType}</span>
                    </td>
                    <td>{driver.vehicleNumber}</td>
                    <td>
                      <span className={`badge ${statusBadge(driver.status)}`}>
                        {driver.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${activeBadge(driver.isActive)}`}>
                        {driver.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{new Date(driver.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div
                        className="dropdown-container"
                        style={{
                          position: "relative",
                          zIndex: dropdownOpen === driver._id ? 9999 : 1,
                        }}
                      >
                        <span
                          className="dots"
                          style={{ cursor: "pointer", fontSize: "20px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDropdownToggle(driver._id);
                          }}
                        >
                          ⋯
                        </span>
                        {dropdownOpen === driver._id && (
                          <div
                            className="dropdown-menu show"
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: "0",
                              zIndex: 9999,
                              minWidth: "150px",
                              padding: "8px",
                              marginTop: "4px",
                              backgroundColor: "white",
                              border: "1px solid rgba(0,0,0,0.1)",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              overflow: "visible",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {filter === "pending" ? (
                              <>
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
                                    handleVerifyDriver(driver);
                                  }}
                                  onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "rgba(131, 110, 254, 0.2)")
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "rgba(131, 110, 254, 0.12)")
                                  }
                                >
                                  Verify
                                </button>
                              </>
                            ) : (
                              <>
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
                                    handleEdit(driver);
                                  }}
                                  onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "rgba(131, 110, 254, 0.2)")
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "rgba(131, 110, 254, 0.12)")
                                  }
                                >
                                  Edit
                                </button>
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
                                    handleAssign(driver);
                                  }}
                                  onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "rgba(131, 110, 254, 0.2)")
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "rgba(131, 110, 254, 0.12)")
                                  }
                                >
                                  Assign
                                </button>
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
                                    handleDelete(driver);
                                  }}
                                  onMouseOver={(e) =>
                                    (e.target.style.backgroundColor = "rgba(220, 38, 38, 0.2)")
                                  }
                                  onMouseOut={(e) =>
                                    (e.target.style.backgroundColor = "rgba(220, 38, 38, 0.12)")
                                  }
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loading && drivers.length === 0 && (
        <div className="text-center py-4">
          <p className="text-muted">No {filter} drivers found.</p>
        </div>
      )}

      <EditDriverModal
        show={showEditModal}
        onClose={handleCloseModal}
        editForm={editForm}
        onFormChange={handleFormChange}
        onSave={handleSaveChanges}
      />
      
      <AssignDriverModal
        show={showAssignModal}
        onClose={handleCloseAssignModal}
        assignForm={assignForm}
        onFormChange={handleAssignFormChange}
        onAssign={handleAssignDriver}
      />
      
      <DriverVerificationModal
        show={showVerificationModal}
        onClose={handleCloseVerificationModal}
        driver={selectedDriver}
        onAccept={handleAcceptDriver}
        onReject={handleRejectDriver}
      />
    </div>
  );
};

export default Drivers;
