import React, { useState } from 'react';
import { toast } from 'react-toastify';

const DeliveryDetailsStep = ({ formData, updateFormData, previousStep, nextStep }) => {
    const [useGeolocation, setUseGeolocation] = useState(false);
    const [geoLoading, setGeoLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

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
            setGeoLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Adding User-Agent and Referer as per Nominatim Usage Policy
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                            {
                                headers: {
                                    'Accept-Language': 'en',
                                    'User-Agent': 'ShipDay-Admin-Dashboard/1.0 (https://shipday.co.za)'
                                }
                            }
                        );

                        if (!response.ok) {
                            throw new Error('Geocoding failed');
                        }

                        const data = await response.json();
                        const address = data.address || {};

                        // Extract address components specifically for SA structure
                        const houseNumber = address.house_number || '';
                        const road = address.road || address.street || address.pedestrian || '';
                        const street = `${houseNumber} ${road}`.trim();

                        // SA specific: Suburb mapping
                        const suburb = address.suburb || address.neighbourhood || address.quarter || address.subdistrict || '';
                        const city = address.city || address.town || address.village || address.municipality || address.city_district || '';

                        // OSM 'state' usually maps to SA Province
                        const rawProvince = address.state || address.province || '';
                        let province = '';

                        // Normalize to match the provinces array exactly
                        if (rawProvince) {
                            const matched = provinces.find(p =>
                                rawProvince.toLowerCase().includes(p.toLowerCase()) ||
                                p.toLowerCase().includes(rawProvince.toLowerCase())
                            );
                            province = matched || rawProvince;
                        }
                        const postalCode = address.postcode || '';

                        // Update form data with geocoded address
                        updateFormData({
                            deliveryAddress: {
                                ...formData.deliveryAddress,
                                useGeolocation: true,
                                latitude: latitude,
                                longitude: longitude,
                                street: street || formData.deliveryAddress.street,
                                suburb: suburb || formData.deliveryAddress.suburb,
                                city: city || formData.deliveryAddress.city,
                                province: province || formData.deliveryAddress.province,
                                postalCode: postalCode || formData.deliveryAddress.postalCode
                            }
                        });

                        setUseGeolocation(true);
                        toast.success('Location captured and address fields filled automatically!');
                    } catch (error) {
                        console.error('Geocoding error:', error);
                        // Still save coordinates even if geocoding fails
                        updateFormData({
                            deliveryAddress: {
                                ...formData.deliveryAddress,
                                useGeolocation: true,
                                latitude: latitude,
                                longitude: longitude
                            }
                        });
                        setUseGeolocation(true);
                        toast.warning('Location captured! Could not auto-fill address details. Please check and enter manually.');
                    } finally {
                        setGeoLoading(false);
                    }
                },
                (error) => {
                    setGeoLoading(false);
                    console.error('Geolocation error:', error);
                    let msg = 'Unable to get location. Please enter manually.';
                    if (error.code === 1) msg = 'Location access denied. Please enable location permissions.';
                    if (error.code === 3) msg = 'Location request timed out. Please try again.';
                    toast.error(msg);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        } else {
            toast.error('Geolocation not supported. Please enter manually.');
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (!formData.receiverName || !formData.receiverMobile || !formData.receiverEmail) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!formData.deliveryAddress.street || !formData.deliveryAddress.city ||
            !formData.deliveryAddress.province || !formData.deliveryAddress.postalCode) {
            toast.error('Please complete the address details');
            return;
        }

        nextStep();
    };

    const provinces = [
        'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
        'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
    ];

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleAddressChange = async (e) => {
        const value = e.target.value;
        // Update form data immediately
        updateFormData({
            deliveryAddress: {
                ...formData.deliveryAddress,
                street: value
            }
        });

        // Debounce logic for API calls
        if (value.length > 3) {
            setSearchLoading(true);
            try {
                // Using Nominatim (OpenStreetMap) instead of LocationIQ to avoid rate limits
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=za&limit=5&addressdetails=1`,
                    {
                        headers: {
                            'User-Agent': 'ShipDay-App/1.0',
                            'Accept-Language': 'en'
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data);
                    setShowSuggestions(true);
                }
            } catch (err) {
                console.error("Autocomplete error:", err);
            } finally {
                setSearchLoading(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (item) => {
        // Parse the selected item (LocationIQ structure)
        const address = item.address || {};

        const street = address.road || address.pedestrian || item.display_place || item.display_name.split(',')[0];
        const suburb = address.suburb || address.neighbourhood || address.residential || '';
        const city = address.city || address.town || address.village || address.county || '';
        const state = address.state || address.province || '';
        const postcode = address.postcode || '';

        // Match province
        let province = '';
        if (state) {
            province = provinces.find(p => state.toLowerCase().includes(p.toLowerCase())) || state;
        }

        updateFormData({
            deliveryAddress: {
                ...formData.deliveryAddress,
                street: street,
                suburb: suburb,
                city: city,
                province: province,
                postalCode: postcode,
                latitude: item.lat,
                longitude: item.lon
            }
        });

        setSuggestions([]);
        setShowSuggestions(false);
        toast.success("Address selected!");
    };

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

                <div className="mb-3 d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-outline-dark btn-sm rounded-pill d-flex align-items-center gap-2 px-3"
                        onClick={handleGeolocation}
                        disabled={geoLoading}
                    >
                        {geoLoading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            <i className="bi bi-geo-alt-fill text-yellow"></i>
                        )}
                        {geoLoading ? 'Locating...' : 'Use Current Location'}
                    </button>
                    {useGeolocation && !geoLoading && (
                        <span className="text-success ms-3 small fw-bold">
                            <i className="bi bi-check-circle-fill me-1"></i> Address Captured
                        </span>
                    )}
                </div>

                <div className="row">

                    <div className="col-md-12 mb-3 position-relative">
                        <label className="form-label mb-0">Street Name and Number *</label>
                        <div className="input-group mt-1">
                            <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                name="deliveryAddress.street"
                                value={formData.deliveryAddress.street}
                                onChange={handleAddressChange}
                                placeholder="Start typing address..."
                                required
                                autoComplete="off"
                            />
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="position-absolute w-100 bg-white shadow-lg rounded mt-1 overflow-hidden" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                {suggestions.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-2 border-bottom hover-bg-light cursor-pointer"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => selectSuggestion(item)}
                                    >
                                        <div className="fw-bold small">{item.display_place || item.address.road}</div>
                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{item.display_name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                        <label className="form-label">Complex / Building</label>
                        <input
                            type="text"
                            className="form-control"
                            name="deliveryAddress.complex"
                            value={formData.deliveryAddress.complex}
                            onChange={handleChange}
                            placeholder="Office Park / Unit No (Optional)"
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
                    <button type="button" className="btn btn-outline-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <button type="submit" className="btn btn-brand-black">
                        Next: Parcel Details <i className="bi bi-arrow-right ms-2 text-yellow"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeliveryDetailsStep;
