import React from 'react';

const AssignDriverModal = ({ 
  show, 
  onClose, 
  assignForm, 
  onFormChange, 
  onAssign 
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
            <h5 className="modal-title">Assign Driver</h5>
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
                  <label className="form-label">Driver Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="driverName"
                    value={assignForm.driverName || ''}
                    onChange={onFormChange}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={assignForm.priority || ''}
                    onChange={onFormChange}
                  >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Start Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="startLocation"
                    value={assignForm.startLocation || ''}
                    onChange={onFormChange}
                    placeholder="Enter pickup location"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">End Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="endLocation"
                    value={assignForm.endLocation || ''}
                    onChange={onFormChange}
                    placeholder="Enter delivery location"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Deadline</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="deadline"
                    value={assignForm.deadline || ''}
                    onChange={onFormChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Reports</label>
                  <select
                    className="form-select"
                    name="reports"
                    value={assignForm.reports || ''}
                    onChange={onFormChange}
                  >
                    <option value="">Select Report Type</option>
                    <option value="daily">Daily Report</option>
                    <option value="weekly">Weekly Report</option>
                    <option value="completion">Completion Report</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    className="form-control"
                    name="specialInstructions"
                    rows="3"
                    value={assignForm.specialInstructions || ''}
                    onChange={onFormChange}
                    placeholder="Enter any special instructions for the driver..."
                  />
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
              className="btn btn-success" 
              onClick={onAssign}
            >
              Assign Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignDriverModal;