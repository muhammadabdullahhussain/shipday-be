import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptor';

const AssignShipmentModal = ({ 
  show, 
  onClose, 
  shipment,
  onAssign 
}) => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchDrivers();
    }
  }, [show]);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const [driversRes, assignedShipmentsRes] = await Promise.all([
        axiosInstance.get('/admin/drivers/accepted'),
        axiosInstance.get('/admin/assigned-shipments')
      ]);
      
      const allDrivers = driversRes.data.drivers || [];
      const assignedShipments = assignedShipmentsRes.data.shipments || [];
      
      const assignedDriverIds = assignedShipments
        .filter(s => s.driver && s.status === 'Shipping')
        .map(s => s.driver.driverId);
      
      const availableDrivers = allDrivers.filter(driver => 
        !assignedDriverIds.includes(driver.driverId)
      );
      
      setDrivers(availableDrivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (selectedDriver) {
      setLoading(true);
      try {
        await axiosInstance.post('/admin/assign-shipment', {
          shipmentId: shipment?.shipmentId,
          driverId: selectedDriver
        });
        onAssign(selectedDriver, shipment?.shipmentId);
        setSelectedDriver('');
        onClose();
      } catch (error) {
        console.error('Error assigning shipment:', error);
      } finally {
        setLoading(false);
      }
    }
  };

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
            <h5 className="modal-title">Assign Driver to Shipment</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Shipment ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={shipment?.shipmentId || ''}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Customer Contact</label>
                <input
                  type="text"
                  className="form-control"
                  value={shipment?.customerContact || 'N/A'}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Start Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={shipment?.origin || ''}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">End Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={shipment?.destination || ''}
                  readOnly
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Driver</label>
              {loading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <select
                  className="form-select"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                >
                  <option value="">Choose a driver...</option>
                  {drivers.map((driver) => (
                    <option key={driver.driverId} value={driver.driverId}>
                      {driver.username} - {driver.vehicleType} ({driver.vehicleNumber})
                    </option>
                  ))}
                </select>
              )}
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
              className="btn btn-success" 
              onClick={handleAssign}
              disabled={!selectedDriver || loading}
            >
              Assign Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignShipmentModal;