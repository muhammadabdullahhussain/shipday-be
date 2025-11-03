import React, { useState } from 'react';

const CreateShipmentForm = ({ onSubmit, onCancel, loading }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert date to ISO format for submission
    const submissionData = {
      ...formData,
      eta: formData.eta ? new Date(formData.eta).toISOString() : '',
      parcelWeight: parseFloat(formData.parcelWeight) || 0,
      cost: parseFloat(formData.cost) || 0
    };
    
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <div className="mb-3">
          <label className="form-label">Sender Name</label>
          <input
            type="text"
            className="form-control"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Sender Phone</label>
          <input
            type="tel"
            className="form-control"
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleChange}
            placeholder="1234567890"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Receiver Name</label>
          <input
            type="text"
            className="form-control"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Receiver Phone</label>
          <input
            type="tel"
            className="form-control"
            name="receiverPhone"
            value={formData.receiverPhone}
            onChange={handleChange}
            placeholder="0987654321"
            required
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
            placeholder="Coimbatore"
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
            placeholder="Surat"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Parcel Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            name="parcelWeight"
            value={formData.parcelWeight}
            onChange={handleChange}
            placeholder="2.5"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Package Type</label>
          <select
            className="form-select"
            name="packageType"
            value={formData.packageType}
            onChange={handleChange}
            required
          >
            <option value="parcel">Parcel</option>
            <option value="document">Document</option>
            <option value="fragile">Fragile</option>
            <option value="electronics">Electronics</option>
             <option value="envelope">Envelope</option>
               <option value="clothing">Clothing</option>
                 <option value="food">Food</option>
                   <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Cost ($)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="25.99"
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">ETA (Expected Arrival Date)</label>
          <input
            type="date"
            className="form-control"
            name="eta"
            value={formData.eta}
            onChange={handleChange}
            min={today}
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
            placeholder="Handle with care - fragile items"
            rows="3"
          />
        </div>
      </div>
      
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Shipment'}
        </button>
      </div>
    </form>
  );
};

export default CreateShipmentForm;