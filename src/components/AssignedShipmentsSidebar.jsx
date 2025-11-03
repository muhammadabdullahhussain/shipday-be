import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptor';

const AssignedShipmentsSidebar = ({ isOpen, onClose }) => {
  const [assignedShipments, setAssignedShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAssignedShipments();
    }
  }, [isOpen]);

  const fetchAssignedShipments = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get('/admin/assigned-shipments');
      setAssignedShipments(data.shipments || []);
    } catch (error) {
      console.error('Error fetching assigned shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Pending': 'bg-warning text-dark',
      'Shipping': 'bg-info text-white',
      'Delivered': 'bg-success text-white',
      'Delayed': 'bg-danger text-white',
      'Cancelled': 'bg-secondary text-white'
    };
    return badges[status] || 'bg-light text-dark';
  };

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg" style={{ width: '400px', zIndex: 1050 }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Assigned Shipments</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      
      <div className="p-3" style={{ height: 'calc(100vh - 70px)', overflowY: 'auto' }}>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : assignedShipments.length === 0 ? (
          <div className="text-center py-4 text-muted">
            No assigned shipments found
          </div>
        ) : (
          <div className="row g-3">
            {assignedShipments.map((shipment) => (
              <div key={shipment._id} className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="card-title mb-0 text-primary">{shipment.shipmentId}</h6>
                      <span className={`badge ${getStatusBadge(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <small className="text-muted d-block">Route</small>
                      <div className="fw-medium">{shipment.start} → {shipment.end || 'TBD'}</div>
                    </div>
                    
                    <div className="mb-2">
                      <small className="text-muted d-block">Driver</small>
                      <div className="fw-medium">{shipment.driver?.username || 'Unassigned'}</div>
                      {shipment.driver && (
                        <small className="text-muted">
                          {shipment.driver.vehicleType} • ID: {shipment.driver.driverId}
                        </small>
                      )}
                    </div>
                    
                    <div className="row g-2">
                      <div className="col-6">
                        <small className="text-muted d-block">Vehicle</small>
                        <span className="badge bg-light text-dark">{shipment.vehicleType}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block">ETA</small>
                        <small className="fw-medium">
                          {new Date(shipment.eta).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                    
                    {shipment.notes && (
                      <div className="mt-2">
                        <small className="text-muted d-block">Notes</small>
                        <small className="text-truncate d-block">{shipment.notes}</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedShipmentsSidebar;