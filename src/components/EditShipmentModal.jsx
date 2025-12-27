import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInterceptor';

const EditShipmentModal = ({ show, onClose, shipment, onUpdate }) => {
  const [formData, setFormData] = useState({
    shipmentId: '',
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: '',
    start: '',
    end: '',
    parcelWeight: '',
    packageType: 'parcel',
    cost: '',
    eta: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && shipment) {
      console.log('Received shipment object:', shipment);

      // Extract the correct ID from shipment object
      const id = shipment.shipmentId || shipment._id || shipment.id || '';

      setFormData({
        shipmentId: id,
        senderName: shipment.senderName || '',
        senderPhone: shipment.senderPhone || '',
        receiverName: shipment.receiverName || '',
        receiverPhone: shipment.receiverPhone || '',
        start: shipment.origin || shipment.start || '',
        end: shipment.destination || shipment.end || '',
        parcelWeight: shipment.parcelWeight || '',
        packageType: shipment.packageType || 'parcel',
        cost: shipment.cost || '',
        eta: shipment.estimatedDelivery
          ? new Date(shipment.estimatedDelivery).toISOString().slice(0, 10)
          : (shipment.eta ? new Date(shipment.eta).toISOString().slice(0, 10) : ''),
        notes: shipment.notes || ''
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

    // Validate shipmentId exists
    if (!formData.shipmentId) {
      toast.error('Shipment ID is missing. Cannot update shipment.');
      console.error('shipmentId is undefined or empty');
      return;
    }

    setLoading(true);

    try {
      // Match Postman request structure exactly
      const payload = {
        shipmentId: formData.shipmentId,
        senderName: formData.senderName,
        senderPhone: formData.senderPhone,
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone,
        start: formData.start,
        end: formData.end,
        parcelWeight: parseFloat(formData.parcelWeight) || 0,
        packageType: formData.packageType,
        cost: parseFloat(formData.cost) || 0,
        eta: formData.eta ? new Date(formData.eta + 'T10:30:00.000Z').toISOString() : '',
        notes: formData.notes
      };

      console.log('Sending PUT request to:', `/shipments/${formData.shipmentId}`);
      console.log('Payload:', payload);

      const response = await axiosInstance.put(
        `/shipments/${formData.shipmentId}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update successful:', response.data);
      toast.success('Shipment updated successfully!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating shipment:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);

      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || 'Unknown error occurred';

      toast.error(`Failed to update shipment: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Shipment</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={loading}
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
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Sender Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Sender Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="senderPhone"
                      value={formData.senderPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Receiver Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Receiver Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="receiverPhone"
                      value={formData.receiverPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Start Location *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="start"
                      value={formData.start}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">End Location *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="end"
                      value={formData.end}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Parcel Weight (kg) *</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      name="parcelWeight"
                      value={formData.parcelWeight}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Package Type *</label>
                    <select
                      className="form-select"
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleChange}
                      required
                    >
                      <option value="parcel">Parcel</option>
                      <option value="documents">Documents</option>
                      <option value="fragile">Fragile</option>
                      <option value="electronics">Electronics</option>
                      <option value="envelope">Envelope</option>
                      <option value="clothing">Clothing</option>
                      <option value="food">Food</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Cost ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">ETA (Expected Arrival Date) *</label>
                <input
                  type="date"
                  className="form-control"
                  name="eta"
                  value={formData.eta}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add any special instructions or notes..."
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
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  'Update Shipment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShipmentModal;