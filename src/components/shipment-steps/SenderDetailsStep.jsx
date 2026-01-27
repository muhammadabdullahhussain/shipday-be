import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SenderDetailsStep = ({ formData, updateFormData, nextStep, customers = [] }) => {
    const handleCustomerSelect = (e) => {
        const customerId = e.target.value;
        if (!customerId) return;

        const customer = customers.find(c => c._id === customerId || c.id === customerId);
        if (customer) {
            updateFormData({
                senderCustomerId: customer._id || customer.id,
                senderFullName: customer.fullName || customer.name || '',
                senderCompany: customer.companyName || '',
                senderEmail: customer.email || '',
                senderMobile: customer.mobileNumber || customer.phone || '',
                senderAddress: {
                    ...formData.senderAddress, // Preserve defaults if missing
                    street: customer.address?.street || '',
                    suburb: customer.address?.suburb || '',
                    city: customer.address?.city || '',
                    province: customer.address?.province || '',
                    postalCode: customer.address?.postalCode || ''
                }
            });
            toast.info('Customer details auto-filled');
        }
    };
    const [searchLoading, setSearchLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('senderAddress.')) {
            const addressField = name.split('.')[1];
            updateFormData({
                senderAddress: {
                    ...formData.senderAddress,
                    [addressField]: value
                }
            });
        } else {
            updateFormData({ [name]: value });
        }
    };

    const handleNext = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.senderFullName || !formData.senderEmail || !formData.senderMobile) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!formData.senderAddress.street || !formData.senderAddress.city ||
            !formData.senderAddress.province || !formData.senderAddress.postalCode) {
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
    const [useGeolocation, setUseGeolocation] = useState(false);
    const [geoLoading, setGeoLoading] = useState(false);

    const handleGeolocation = () => {
        if (navigator.geolocation) {
            setGeoLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                            {
                                headers: {
                                    'Accept-Language': 'en',
                                    'User-Agent': 'ShipDay-Admin-Dashboard/1.0 (https://shipday.co.za)'
                                }
                            }
                        );

                        if (!response.ok) throw new Error('Geocoding failed');

                        const data = await response.json();
                        const address = data.address || {};

                        const houseNumber = address.house_number || '';
                        const road = address.road || address.street || address.pedestrian || '';
                        const street = `${houseNumber} ${road}`.trim();

                        const suburb = address.suburb || address.neighbourhood || address.quarter || '';
                        const city = address.city || address.town || address.village || '';

                        const rawProvince = address.state || address.province || '';
                        let province = '';
                        if (rawProvince) {
                            const matched = provinces.find(p =>
                                rawProvince.toLowerCase().includes(p.toLowerCase()) ||
                                p.toLowerCase().includes(rawProvince.toLowerCase())
                            );
                            province = matched || rawProvince;
                        }
                        const postalCode = address.postcode || '';

                        updateFormData({
                            senderAddress: {
                                ...formData.senderAddress,
                                useGeolocation: true,
                                latitude: latitude,
                                longitude: longitude,
                                street: street || formData.senderAddress.street,
                                suburb: suburb || formData.senderAddress.suburb,
                                city: city || formData.senderAddress.city,
                                province: province || formData.senderAddress.province,
                                postalCode: postalCode || formData.senderAddress.postalCode
                            }
                        });

                        setUseGeolocation(true);
                        toast.success('Location captured successfully!');
                    } catch (error) {
                        console.error('Geocoding error:', error);
                        // Save coords anyway
                        updateFormData({
                            senderAddress: {
                                ...formData.senderAddress,
                                useGeolocation: true,
                                latitude: latitude,
                                longitude: longitude
                            }
                        });
                        setUseGeolocation(true);
                        toast.warning('Location captured! Please verify address details.');
                    } finally {
                        setGeoLoading(false);
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setGeoLoading(false);
                    toast.error('Unable to retrieve location.');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        } else {
            toast.error('Geolocation not supported by this browser.');
        }
    };

    const handleAddressChange = async (e) => {
        const value = e.target.value;
        // Update form data immediately
        updateFormData({
            senderAddress: {
                ...formData.senderAddress,
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
            senderAddress: {
                ...formData.senderAddress,
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
            <h4 className="step-title">Sender Details</h4>
            <p className="step-subtitle">Please provide the sender's information</p>

            {customers && customers.length > 0 && (
                <div className="mb-4 p-3 bg-light border border-warning rounded-3">
                    <label className="form-label fw-bold text-dark"><i className="bi bi-person-badge-fill me-2 text-yellow"></i>Admin: Select Customer</label>
                    <select className="form-select" onChange={handleCustomerSelect} defaultValue="">
                        <option value="" disabled>-- Auto-fill from Registered Customer --</option>
                        {customers.map(c => (
                            <option key={c._id || c.id} value={c._id || c.id}>
                                {c.fullName || c.name} ({c.email})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <form onSubmit={handleNext}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="senderFullName"
                            value={formData.senderFullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="senderCompany"
                            value={formData.senderCompany}
                            onChange={handleChange}
                            placeholder="ABC Company (Optional)"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address *</label>
                        <input
                            type="email"
                            className="form-control"
                            name="senderEmail"
                            value={formData.senderEmail}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile Number *</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="senderMobile"
                            value={formData.senderMobile}
                            onChange={handleChange}
                            placeholder="+27 12 345 6789"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Telephone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="senderTelephone"
                            value={formData.senderTelephone}
                            onChange={handleChange}
                            placeholder="+27 11 123 4567 (Optional)"
                        />
                    </div>
                </div>

                <h5 className="mt-4 mb-3">Address Details</h5>

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
                                name="senderAddress.street"
                                value={formData.senderAddress.street}
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
                            name="senderAddress.suburb"
                            value={formData.senderAddress.suburb}
                            onChange={handleChange}
                            placeholder="Sandton / Bryanston"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">City *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="senderAddress.city"
                            value={formData.senderAddress.city}
                            onChange={handleChange}
                            placeholder="Johannesburg"
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
                            name="senderAddress.complex"
                            value={formData.senderAddress.complex}
                            onChange={handleChange}
                            placeholder="Sunset Complex / Unit No (Optional)"
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Province *</label>
                        <select
                            className="form-select"
                            name="senderAddress.province"
                            value={formData.senderAddress.province}
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
                            name="senderAddress.postalCode"
                            value={formData.senderAddress.postalCode}
                            onChange={handleChange}
                            placeholder="2196"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-brand-black">
                        Next: Collection Details <i className="bi bi-arrow-right ms-2 text-yellow"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SenderDetailsStep;
