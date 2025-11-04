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
  const [error, setError] = useState('');

  useEffect(() => {
    if (show) {
      fetchDrivers();
    }
  }, [show]);

  const fetchDrivers = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('🔍 Fetching drivers...');
      console.log('🔑 Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
      console.log('🌐 Base URL:', axiosInstance.defaults.baseURL);
      
      const driversRes = await axiosInstance.get('/admin/drivers/accepted');
      console.log('📊 Drivers API Response Status:', driversRes.status);
      console.log('📊 Drivers API Response Data:', driversRes.data);
      
      // Extract drivers array - handle both response formats
      let allDrivers = [];
      if (Array.isArray(driversRes.data)) {
        allDrivers = driversRes.data;
      } else if (driversRes.data.drivers && Array.isArray(driversRes.data.drivers)) {
        allDrivers = driversRes.data.drivers;
      }
      
      console.log('👥 Extracted Drivers:', allDrivers);
      console.log('👥 Number of drivers:', allDrivers.length);

      // Fetch assigned shipments
      let assignedDriverIds = [];
      try {
        const assignedShipmentsRes = await axiosInstance.get('/admin/shipments/assign');
        console.log('📊 Assigned Shipments Response:', assignedShipmentsRes.data);
        
        const assignedShipments = assignedShipmentsRes.data.shipments || assignedShipmentsRes.data || [];
        console.log('🚛 Assigned Shipments:', assignedShipments);
        
        assignedDriverIds = assignedShipments
          .filter(s => s.driver && s.status === 'Shipping')
          .map(s => s.driver.driverId);
        
        console.log('🚫 Assigned Driver IDs:', assignedDriverIds);
      } catch (err) {
        console.warn('⚠️ Could not fetch assigned shipments, showing all drivers:', err.message);
        // Continue with all drivers if assigned shipments fetch fails
      }
      
      // Filter available drivers
      const availableDrivers = allDrivers.filter(driver => 
        !assignedDriverIds.includes(driver.driverId)
      );
      
      console.log(' Available Drivers:', availableDrivers);
      console.log(' Number of available drivers:', availableDrivers.length);
      
      if (availableDrivers.length === 0) {
        setError('No available drivers found. All drivers may be assigned to active shipments.');
      }
      
      setDrivers(availableDrivers);
    } catch (error) {
      console.error('❌ Error fetching drivers:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error message:', error.message);
      setError('Failed to load drivers. Please try again.');
      setDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedDriver) {
      alert('Please select a driver');
      return;
    }
    
    setLoading(true);
    try {
      await axiosInstance.post('/admin/shipments/assign', {
        shipmentId: shipment?.shipmentId,
        driverId: selectedDriver
      });
      onAssign(selectedDriver, shipment?.shipmentId);
      setSelectedDriver('');
      onClose();
    } catch (error) {
      console.error('Error assigning shipment:', error);
      alert('Failed to assign shipment. Please try again.');
    } finally {
      setLoading(false);
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
              aria-label="Close"
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
                  <p className="mt-2 mb-0 text-muted small">Loading drivers...</p>
                </div>
              ) : error ? (
                <div className="alert alert-warning mb-0" role="alert">
                  {error}
                </div>
              ) : (
                <>
                  <select
                    className="form-select"
                    value={selectedDriver}
                    onChange={(e) => setSelectedDriver(e.target.value)}
                  >
                    <option value="">Choose a driver...</option>
                    {drivers.map((driver) => (
                      <option 
                        key={driver._id || driver.driverId} 
                        value={driver.driverId}
                      >
                        {driver.username || 'Unknown Driver'} (ID: {driver.driverId}) - {driver.vehicleType} ({driver.vehicleNumber})
                      </option>
                    ))}
                  </select>
                  {drivers.length === 0 && !loading && (
                    <small className="text-muted d-block mt-1">
                      No available drivers at the moment
                    </small>
                  )}
                  {drivers.length > 0 && (
                    <small className="text-muted d-block mt-1">
                      {drivers.length} driver{drivers.length !== 1 ? 's' : ''} available
                    </small>
                  )}
                </>
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
              {loading ? 'Assigning...' : 'Assign Driver'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignShipmentModal;