import React, { useState, useEffect } from "react";
import "../../styles/ui/pop.css";
import axiosInstance from "../../utils/axiosInterceptor";
import { toast } from 'react-toastify';

const EditShipmentModal = ({ show, onClose, shipmentData, onSave, onUpdate }) => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    status: "",
    deliveryDate: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shipmentData) {
      setFormData({
        origin: shipmentData.origin || shipmentData.start || "",
        destination: shipmentData.destination || shipmentData.end || "",
        status: shipmentData.status || "",
        deliveryDate: shipmentData.deliveryDate || (shipmentData.eta ? new Date(shipmentData.eta).toISOString().split('T')[0] : "")
      });
    }
  }, [shipmentData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        shipmentId: shipmentData.shipmentId,
        start: formData.origin,
        end: formData.destination,
        status: formData.status,
        eta: formData.deliveryDate
      };

      await axiosInstance.put(`/shipments/${shipmentData.shipmentId}`, payload);

      toast.success("Shipment updated successfully!");

      if (onSave) onSave(formData); // For Details page local update
      if (onUpdate) onUpdate();     // For Shipments list refresh

      onClose();
    } catch (error) {
      console.error("Error updating shipment:", error);
      toast.error(error.response?.data?.message || "Failed to update shipment");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="edit-shipment-modal">
      <div className="edit-shipment-card">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4 className="modal-title">Edit Shipment</h4>

        <div className="form-grid">
          <div className="form-group">
            <label>Origin Address</label>
            <input
              type="text"
              name="origin"
              className="form-control"
              value={formData.origin}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Destination Address</label>
            <input
              type="text"
              name="destination"
              className="form-control"
              value={formData.destination}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Shipment Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              {[
                'Order Created', 'Pending Collection', 'Driver Assigned', 'Picked Up',
                'In Transit', 'Inter branch Transit', 'Delivered', 'Delivery Failed',
                'Rescheduled', 'Return to Sender', 'Returning to hub', 'Delivery cancelled',
                'At Warehouse', 'Parcel in Sorting Facility', 'Out for Delivery', 'On Hold', 'Awaiting Payment'
              ].map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Delivery Date</label>
            <input
              type="date"
              name="deliveryDate"
              className="form-control"
              value={formData.deliveryDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditShipmentModal;

