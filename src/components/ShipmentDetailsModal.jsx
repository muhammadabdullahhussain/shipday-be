import React from 'react';
import { BASE_URL } from '../utils/apiConfig';

const ShipmentDetailsModal = ({ show, onClose, shipment, statusBadge }) => {
  if (!show) return null;

  const handleDownload = (type) => {
    // Construct URL based on BASE_URL which already includes /api
    const url = `${BASE_URL}/admin/shipments/${shipment.shipmentId}/${type}`;
    window.open(url, '_blank');
  };

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
                {shipment?.senderDetails ? (
                  <>
                    <p><strong>Name:</strong> {shipment.senderDetails.fullName}</p>
                    <p><strong>Company:</strong> {shipment.senderDetails.company || 'N/A'}</p>
                    <p><strong>Phone:</strong> {shipment.senderDetails.mobile}</p>
                    <p><strong>Email:</strong> {shipment.senderDetails.email}</p>
                    <p><strong>Address:</strong> {shipment.senderDetails.address.street}, {shipment.senderDetails.address.suburb}, {shipment.senderDetails.address.city}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Name:</strong> {shipment?.senderName || 'N/A'}</p>
                    <p><strong>Phone:</strong> {shipment?.senderPhone || 'N/A'}</p>
                  </>
                )}
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Receiver Information</h6>
                {shipment?.deliveryDetails ? (
                  <>
                    <p><strong>Name:</strong> {shipment.deliveryDetails.receiverName}</p>
                    <p><strong>Company:</strong> {shipment.deliveryDetails.company || 'N/A'}</p>
                    <p><strong>Phone:</strong> {shipment.deliveryDetails.mobile}</p>
                    <p><strong>Email:</strong> {shipment.deliveryDetails.email}</p>
                    <p><strong>Address:</strong> {shipment.deliveryDetails.address.street}, {shipment.deliveryDetails.address.suburb}, {shipment.deliveryDetails.address.city}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Name:</strong> {shipment?.receiverName || 'N/A'}</p>
                    <p><strong>Phone:</strong> {shipment?.receiverPhone || 'N/A'}</p>
                  </>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Shipment Details</h6>
                {shipment?.parcelDetails ? (
                  <>
                    <p><strong>Service:</strong> <span className="text-capitalize">{shipment.parcelDetails.serviceType}</span></p>
                    <p><strong>Parcel:</strong> {shipment.parcelDetails.parcelType}</p>
                    <p><strong>Dimensions:</strong> {shipment.parcelDetails.dimensions.length}x{shipment.parcelDetails.dimensions.width}x{shipment.parcelDetails.dimensions.height} cm</p>
                    <p><strong>Weight:</strong> {shipment.parcelDetails.dimensions.weight}kg</p>
                  </>
                ) : (
                  <>
                    <p><strong>Origin:</strong> {shipment?.start}</p>
                    <p><strong>Destination:</strong> {shipment?.end}</p>
                    <p><strong>Weight:</strong> {shipment?.parcelWeight}kg</p>
                    <p><strong>Package Type:</strong> {shipment?.packageType}</p>
                  </>
                )}
              </div>
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">Other Information</h6>
                <p><strong>Cost:</strong> R{shipment?.payment?.amount?.toFixed(2) || shipment?.cost || '0.00'}</p>
                <p><strong>ETA:</strong> {new Date(shipment?.eta).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`badge ${statusBadge(shipment?.status)}`}>{shipment?.status}</span></p>
                <p><strong>Notes:</strong> {shipment?.notes || 'No notes'}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary me-auto"
              onClick={() => handleDownload('waybill')}
            >
              📄 Download Waybill
            </button>
            <button
              type="button"
              className="btn btn-outline-dark me-2"
              onClick={() => handleDownload('pod')}
            >
              ✍️ Download POD
            </button>
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