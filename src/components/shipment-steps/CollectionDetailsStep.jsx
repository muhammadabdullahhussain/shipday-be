import React, { useState } from 'react';

const CollectionDetailsStep = ({ formData, updateFormData, previousStep, nextStep }) => {
    const [useGeolocation, setUseGeolocation] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('collectionAddress.')) {
            const addressField = name.split('.')[1];
            updateFormData({
                collectionAddress: {
                    ...formData.collectionAddress,
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
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Reverse geocode using Nominatim API (OpenStreetMap)
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                            {
                                headers: {
                                    'Accept-Language': 'en'
                                }
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Geocoding failed');
                        }

                        const data = await response.json();
                        const address = data.address;

                        // Extract address components
                        const street = `${address.house_number || ''} ${address.road || address.street || ''}`.trim();
                        const suburb = address.suburb || address.neighbourhood || address.quarter || '';
                        const city = address.city || address.town || address.village || address.municipality || '';
                        const province = address.state || address.province || '';
                        const postalCode = address.postcode || '';

                        // Update form data with geocoded address
                        updateFormData({
                            collectionAddress: {
                                ...formData.collectionAddress,
                                useGeolocation: true,
                                latitude: latitude,
                                longitude: longitude,
                                street: street || formData.collectionAddress.street,
                                suburb: suburb || formData.collectionAddress.suburb,
                                city: city || formData.collectionAddress.city,
                                province: province || formData.collectionAddress.province,
                                postalCode: postalCode || formData.collectionAddress.postalCode
                            }
                        });

                        setUseGeolocation(true);
                        alert('Location captured and address fields filled automatically!');
                    } catch (error) {
                        console.error('Geocoding error:', error);
                        // Still save coordinates even if geocoding fails
                        updateFormData({
                            collectionAddress: {
                                ...formData.collectionAddress,
                                useGeolocation: true,
                                latitude: latitude,
                                longitude: longitude
                            }
                        });
                        setUseGeolocation(true);
                        alert('Location captured! Could not auto-fill address. Please enter manually.');
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get location. Please enter manually.');
                }
            );
        } else {
            alert('Geolocation not supported. Please enter manually.');
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (!formData.dispatcherName || !formData.collectionMobile || !formData.collectionEmail) {
            alert('Please fill in all required fields');
            return;
        }

        if (!formData.collectionAddress.street || !formData.collectionAddress.city ||
            !formData.collectionAddress.province || !formData.collectionAddress.postalCode) {
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
            <h4 className="step-title">Collection Details</h4>
            <p className="step-subtitle">Where should we collect the parcel from?</p>

            <form onSubmit={handleNext}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Dispatcher Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="dispatcherName"
                            value={formData.dispatcherName}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="collectionCompany"
                            value={formData.collectionCompany}
                            onChange={handleChange}
                            placeholder="XYZ Logistics (Optional)"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile Number *</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="collectionMobile"
                            value={formData.collectionMobile}
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
                            name="collectionOffice"
                            value={formData.collectionOffice}
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
                            name="collectionEmail"
                            value={formData.collectionEmail}
                            onChange={handleChange}
                            placeholder="dispatcher@example.com"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">No. of Items *</label>
                        <input
                            type="number"
                            className="form-control"
                            name="collectionAddress.numberOfItems"
                            value={formData.collectionAddress.numberOfItems}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                </div>

                <h5 className="mt-4 mb-3">Collection Address</h5>

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
                            name="collectionAddress.street"
                            value={formData.collectionAddress.street}
                            onChange={handleChange}
                            placeholder="456 Business Avenue"
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
                            name="collectionAddress.suburb"
                            value={formData.collectionAddress.suburb}
                            onChange={handleChange}
                            placeholder="Rosebank"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">City *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="collectionAddress.city"
                            value={formData.collectionAddress.city}
                            onChange={handleChange}
                            placeholder="Johannesburg"
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
                            name="collectionAddress.complex"
                            value={formData.collectionAddress.complex}
                            onChange={handleChange}
                            placeholder="Business Park (Optional)"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Province *</label>
                        <select
                            className="form-select"
                            name="collectionAddress.province"
                            value={formData.collectionAddress.province}
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
                            name="collectionAddress.postalCode"
                            value={formData.collectionAddress.postalCode}
                            onChange={handleChange}
                            placeholder="2196"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Next: Delivery Details →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CollectionDetailsStep;
