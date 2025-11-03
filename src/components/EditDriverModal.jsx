import React from 'react';

const EditDriverModal = ({ 
  show, 
  onClose, 
  editForm, 
  onFormChange, 
  onSave 
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
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Driver Information</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={editForm.username || ''}
                    onChange={onFormChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={editForm.email || ''}
                    onChange={onFormChange}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={editForm.phone || ''}
                    onChange={onFormChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Vehicle Type</label>
                  <select
                    className="form-select"
                    name="vehicleType"
                    value={editForm.vehicleType || ''}
                    onChange={onFormChange}
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Vehicle Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleNumber"
                    value={editForm.vehicleNumber || ''}
                    onChange={onFormChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={editForm.status || ''}
                    onChange={onFormChange}
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="isActive"
                      checked={editForm.isActive || false}
                      onChange={onFormChange}
                    />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
              </div>
            </form>
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
              className="btn btn-primary" 
              onClick={onSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDriverModal;