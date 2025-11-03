import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptor';

const EditShipmentModal = ({ show, onClose, shipment, onUpdate }) => {
  const [formData, setFormData] = useState({
    shipmentId: '',
    start: '',
    end: '',
    eta: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && shipment) {
      setFormData({
        shipmentId: shipment.shipmentId || '',
        start: shipment.origin || '',
        end: shipment.destination || '',
        eta: shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toISOString().slice(0, 16) : ''
      });
    }
  }, [show, shipment]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put('/admin/update-shipment', {
        shipmentId: formData.shipmentId,
        start: formData.start,
        end: formData.end,
        eta: new Date(formData.eta).toISOString()
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating shipment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Shipment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Shipment ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="shipmentId"
                  value={formData.shipmentId}
                  readOnly
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Start Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">End Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">ETA</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="eta"
                  value={formData.eta}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Shipment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShipmentModal;