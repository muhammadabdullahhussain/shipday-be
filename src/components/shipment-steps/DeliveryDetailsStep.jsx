import React, { useState } from 'react';

const DeliveryDetailsStep = ({ formData, updateFormData, previousStep, nextStep }) => {
    const [useGeolocation, setUseGeolocation] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('deliveryAddress.')) {
            const addressField = name.split('.')[1];
            updateFormData({
                deliveryAddress: {
                    ...formData.deliveryAddress,
                    [addressField]: value
                }
            });
        } else {
            updateFormData({ [name]: value });
        }
    };

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    updateFormData({
                        deliveryAddress: {
                            ...formData.deliveryAddress,
                            useGeolocation: true,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    });
                    setUseGeolocation(true);
                    alert('Location captured! Please fill in address details.');
                },
                (error) => {
                    alert('Unable to get location. Please enter manually.');
                }
            );
        } else {
            alert('Geolocation not supported. Please enter manually.');
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (!formData.receiverName || !formData.receiverMobile || !formData.receiverEmail) {
            alert('Please fill in all required fields');
            return;
        }

        if (!formData.deliveryAddress.street || !formData.deliveryAddress.city ||
            !formData.deliveryAddress.province || !formData.deliveryAddress.postalCode) {
            alert('Please complete the address details');
            return;
        }

        nextStep();
    };

    const provinces = [
        'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
        'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
    ];

    return (
        <div className="step-container">
            <h4 className="step-title">Delivery Details</h4>
            <p className="step-subtitle">Where should we deliver the parcel?</p>

            <form onSubmit={handleNext}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Receiver Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="receiverName"
                            value={formData.receiverName}
                            onChange={handleChange}
                            placeholder="Mike Johnson"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryCompany"
                            value={formData.deliveryCompany}
                            onChange={handleChange}
                            placeholder="Tech Corp (Optional)"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile Number *</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="receiverMobile"
                            value={formData.receiverMobile}
                            onChange={handleChange}
                            placeholder="+27 12 345 6789"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Office Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="receiverOffice"
                            value={formData.receiverOffice}
                            onChange={handleChange}
                            placeholder="+27 11 123 4567 (Optional)"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address *</label>
                        <input
                            type="email"
                            className="form-control"
                            name="receiverEmail"
                            value={formData.receiverEmail}
                            onChange={handleChange}
                            placeholder="receiver@example.com"
                            required
                        />
                    </div>
                </div>

                <h5 className="mt-4 mb-3">Delivery Address</h5>

                <div className="mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleGeolocation}
                    >
                        📍 Use Current Location
                    </button>
                    {useGeolocation && (
                        <span className="text-success ms-2">✓ Location captured</span>
                    )}
                </div>

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Street Name and Number *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryAddress.street"
                            value={formData.deliveryAddress.street}
                            onChange={handleChange}
                            placeholder="789 Delivery Lane"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Suburb *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryAddress.suburb"
                            value={formData.deliveryAddress.suburb}
                            onChange={handleChange}
                            placeholder="Centurion"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">City *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryAddress.city"
                            value={formData.deliveryAddress.city}
                            onChange={handleChange}
                            placeholder="Pretoria"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Complex Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryAddress.complex"
                            value={formData.deliveryAddress.complex}
                            onChange={handleChange}
                            placeholder="Office Park (Optional)"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Province *</label>
                        <select
                            className="form-select"
                            name="deliveryAddress.province"
                            value={formData.deliveryAddress.province}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Province</option>
                            {provinces.map(province => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Postal Code *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryAddress.postalCode"
                            value={formData.deliveryAddress.postalCode}
                            onChange={handleChange}
                            placeholder="0157"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Next: Parcel Details →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeliveryDetailsStep;
