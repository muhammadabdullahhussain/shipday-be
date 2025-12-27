import React from 'react';
import { toast } from 'react-toastify';

const SenderDetailsStep = ({ formData, updateFormData, nextStep }) => {
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

    return (
        <div className="step-container">
            <h4 className="step-title">Sender Details</h4>
            <p className="step-subtitle">Please provide the sender's information</p>

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

                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Street Name and Number *</label>
                        <input
                            type="text"
                            className="form-control"
                            name="senderAddress.street"
                            value={formData.senderAddress.street}
                            onChange={handleChange}
                            placeholder="123 Main Street"
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
