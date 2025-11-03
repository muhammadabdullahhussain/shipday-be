import React from 'react';

const DriverVerificationModal = ({ 
  show, 
  onClose, 
  driver,
  onAccept,
  onReject 
}) => {
  if (!show) return null;

  return (
    <div 
      className="modal d-block" 
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000
      }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Driver Verification - {driver?.username}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Driver ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.driverId || ''}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.username || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={driver?.email || ''}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.phone || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Vehicle Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.vehicleType || ''}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Vehicle Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.vehicleNumber || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">License Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.licenseNumber || 'N/A'}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Registration Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={driver?.createdAt ? new Date(driver.createdAt).toLocaleDateString() : 'N/A'}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">ID Proof Documents</label>
              <div className="border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                {driver?.idProof ? (
                  <div className="row">
                    <div className="col-md-6">
                      <img src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/uploads/${driver.idProof}`} alt="ID Proof" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                      <p><strong>Document Type:</strong> {driver.idProofType || 'ID Card'}</p>
                      <p><strong>Status:</strong> Pending Verification</p>
                      <p><strong>File:</strong> {driver.idProof}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted mb-0">No ID proof uploaded</p>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger me-2" 
              onClick={() => onReject(driver)}
            >
              Reject
            </button>
            <button 
              type="button" 
              className="btn btn-success" 
              onClick={() => onAccept(driver)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverVerificationModal;