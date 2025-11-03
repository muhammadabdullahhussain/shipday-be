import React from 'react';

const ShipmentDetailsModal = ({ show, onClose, shipment, statusBadge }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Shipment Details - {shipment?.shipmentId}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Sender Information</h6>
                <p><strong>Name:</strong> {shipment?.senderName || 'N/A'}</p>
                <p><strong>Phone:</strong> {shipment?.senderPhone || 'N/A'}</p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Receiver Information</h6>
                <p><strong>Name:</strong> {shipment?.receiverName || 'N/A'}</p>
                <p><strong>Phone:</strong> {shipment?.receiverPhone || 'N/A'}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Shipment Details</h6>
                <p><strong>Origin:</strong> {shipment?.start}</p>
                <p><strong>Destination:</strong> {shipment?.end}</p>
                <p><strong>Weight:</strong> {shipment?.parcelWeight}kg</p>
                <p><strong>Package Type:</strong> {shipment?.packageType}</p>
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Other Information</h6>
                <p><strong>Cost:</strong> ${shipment?.cost}</p>
                <p><strong>ETA:</strong> {new Date(shipment?.eta).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`badge ${statusBadge(shipment?.status)}`}>{shipment?.status}</span></p>
                <p><strong>Notes:</strong> {shipment?.notes || 'No notes'}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsModal;