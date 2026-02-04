import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInterceptor';

const ParcelDetailsStep = ({ formData, updateFormData, previousStep, nextStep }) => {
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pricingConfig, setPricingConfig] = useState({
        economy: { baseAmount: 20, divisor: 5000, rate: 1.2, eta: '1-4 days', icon: '🚚' },
        express: { baseAmount: 40, divisor: 4000, rate: 1.2, eta: '1-2 days', icon: '⚡' },
        satchel: { a4: 99, a3: 120 }
    });

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const response = await axiosInstance.get('/pricing');
                if (response.data) {
                    setPricingConfig(prev => ({
                        ...prev,
                        economy: { ...prev.economy, ...response.data.economy },
                        express: { ...prev.express, ...response.data.express },
                        satchel: { ...prev.satchel, ...response.data.satchel }
                    }));
                }
            } catch (err) {
                console.error("Using default pricing due to fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPricing();
    }, []);

    const handleChange = (e, index) => {
        const { name, value } = e.target;

        if (name.startsWith('dimensions.')) {
            // Handle array update
            const newDimensions = [...formData.dimensions];
            const field = name.split('.')[1];
            newDimensions[index] = { ...newDimensions[index], [field]: value };

            updateFormData({ dimensions: newDimensions });
        } else {
            updateFormData({ [name]: value });
        }
    };

    const addBox = () => {
        updateFormData({
            dimensions: [...formData.dimensions, { length: '', width: '', height: '', weight: '' }]
        });
    };

    const removeBox = (index) => {
        if (formData.dimensions.length > 1) {
            const newDimensions = formData.dimensions.filter((_, i) => i !== index);
            updateFormData({ dimensions: newDimensions });
        }
    };

    // Calculate price whenever relevant fields change
    useEffect(() => {
        calculatePrice();
    }, [
        formData.serviceType,
        formData.parcelType,
        JSON.stringify(formData.dimensions)
    ]);

    const calculatePrice = () => {
        let price = 0;

        if (formData.parcelType === 'satchel-a4') {
            price = pricingConfig.satchel.a4;
        } else if (formData.parcelType === 'satchel-a3') {
            price = pricingConfig.satchel.a3;
        } else if (formData.parcelType === 'custom') {
            const config = pricingConfig[formData.serviceType];
            let totalVolumetricWeight = 0;
            let totalActualWeight = 0;

            formData.dimensions.forEach(dim => {
                if (dim.length && dim.width && dim.height) {
                    const volWeight = (parseFloat(dim.length) * parseFloat(dim.width) * parseFloat(dim.height)) / config.divisor;
                    totalVolumetricWeight += volWeight;
                    totalActualWeight += (parseFloat(dim.weight) || 0);
                }
            });

            const chargeableWeight = Math.max(totalActualWeight, totalVolumetricWeight);
            price = config.baseAmount + (chargeableWeight * config.rate);
        }

        setCalculatedPrice(price);
        updateFormData({ calculatedPrice: price });
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (formData.parcelType === 'custom') {
            const isValid = formData.dimensions.every(dim => dim.length && dim.width && dim.height && dim.weight);
            if (!isValid) {
                toast.error('Please fill in dimensions for all boxes');
                return;
            }
        }

        if (calculatedPrice === 0) {
            toast.error('Please select a valid parcel type');
            return;
        }

        nextStep();
    };

    return (
        <div className="step-container">
            <h4 className="step-title">Parcel Details</h4>
            <p className="step-subtitle">Tell us about your parcel</p>

            <form onSubmit={handleNext}>
                {/* Service Type Selection */}
                <div className="mb-4">
                    <label className="form-label fw-bold">Service Type *</label>
                    <div className="row">
                        <div className="col-md-6">
                            <label className={`service-card ${formData.serviceType === 'economy' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="serviceType"
                                    value="economy"
                                    checked={formData.serviceType === 'economy'}
                                    onChange={handleChange}
                                    className="form-check-input me-2"
                                    required
                                />
                                <div className="service-content">
                                    <div className="service-icon">{pricingConfig.economy.icon}</div>
                                    <h5>Economy</h5>
                                    <p className="text-muted">ETA: {pricingConfig.economy.eta}</p>
                                    <small>Base: R{pricingConfig.economy.baseAmount} + volumetric</small>
                                </div>
                            </label>
                        </div>
                        <div className="col-md-6">
                            <label className={`service-card ${formData.serviceType === 'express' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="serviceType"
                                    value="express"
                                    checked={formData.serviceType === 'express'}
                                    onChange={handleChange}
                                    className="form-check-input me-2"
                                    required
                                />
                                <div className="service-content">
                                    <div className="service-icon">{pricingConfig.express.icon}</div>
                                    <h5>Express</h5>
                                    <p className="text-muted">ETA: {pricingConfig.express.eta}</p>
                                    <small>Base: R{pricingConfig.express.baseAmount} + volumetric</small>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Parcel Type Selection */}
                <div className="mb-4">
                    <label className="form-label fw-bold">Parcel Type *</label>
                    <div className="row">
                        <div className="col-md-4">
                            <label className={`parcel-type-card ${formData.parcelType === 'satchel-a4' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="parcelType"
                                    value="satchel-a4"
                                    checked={formData.parcelType === 'satchel-a4'}
                                    onChange={handleChange}
                                    className="form-check-input me-2"
                                    required
                                />
                                <div className="parcel-content">
                                    <h6>Satchel A4</h6>
                                    <p className="price">R{pricingConfig.satchel.a4}</p>
                                </div>
                            </label>
                        </div>
                        <div className="col-md-4">
                            <label className={`parcel-type-card ${formData.parcelType === 'satchel-a3' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="parcelType"
                                    value="satchel-a3"
                                    checked={formData.parcelType === 'satchel-a3'}
                                    onChange={handleChange}
                                    className="form-check-input me-2"
                                    required
                                />
                                <div className="parcel-content">
                                    <h6>Satchel A3</h6>
                                    <p className="price">R{pricingConfig.satchel.a3}</p>
                                </div>
                            </label>
                        </div>
                        <div className="col-md-4">
                            <label className={`parcel-type-card ${formData.parcelType === 'custom' ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    name="parcelType"
                                    value="custom"
                                    checked={formData.parcelType === 'custom'}
                                    onChange={handleChange}
                                    className="form-check-input me-2"
                                    required
                                />
                                <div className="parcel-content">
                                    <h6>Custom Parcel</h6>
                                    <p className="price">Calculated</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Custom Parcel Dimensions */}
                {formData.parcelType === 'custom' && (
                    <div className="custom-dimensions-box mb-4 p-4 rounded-4 border-2 border-dashed border-warning bg-light bg-opacity-10">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-rulers fs-4 text-warning me-3"></i>
                                <h6 className="mb-0 fw-bold">Parcel Dimensions</h6>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-warning" onClick={addBox}>
                                <i className="bi bi-plus-lg me-1"></i> Add Box
                            </button>
                        </div>

                        {formData.dimensions.map((dim, index) => (
                            <div key={index} className="position-relative mb-4 p-3 border rounded bg-white shadow-sm">
                                {formData.dimensions.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn-close position-absolute top-0 end-0 m-2"
                                        aria-label="Remove"
                                        onClick={() => removeBox(index)}
                                    ></button>
                                )}
                                <h6 className="text-muted small mb-2">Box {index + 1}</h6>
                                <div className="row g-3">
                                    <div className="col-6 col-md-3">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="form-control form-control-sm"
                                                name="dimensions.length"
                                                value={dim.length}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="L"
                                                required
                                            />
                                            <label>Length (cm)</label>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="form-control form-control-sm"
                                                name="dimensions.width"
                                                value={dim.width}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="W"
                                                required
                                            />
                                            <label>Width (cm)</label>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="form-control form-control-sm"
                                                name="dimensions.height"
                                                value={dim.height}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="H"
                                                required
                                            />
                                            <label>Height (cm)</label>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="form-control form-control-sm"
                                                name="dimensions.weight"
                                                value={dim.weight}
                                                onChange={(e) => handleChange(e, index)}
                                                placeholder="Kg"
                                                required
                                            />
                                            <label>Weight (kg)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Status indicators for last box */}
                        <div className="status-indicators-strip d-flex flex-wrap gap-2 mt-2">

                        </div>

                        {/* Formula Display */}
                        <div className="alert alert-info mt-4 border-0 shadow-sm bg-white text-dark">
                            <div className="d-flex align-items-center mb-2">
                                <i className="bi bi-calculator fs-5 text-primary me-2"></i>
                                <strong>Real-time Price Engine</strong>
                            </div>
                            <div className="small opacity-75">
                                Pricing based on total volumetric vs actual weight of all boxes.
                            </div>
                        </div>
                    </div>
                )}

                {/* Special Instructions */}
                <div className="mb-4">
                    <label className="form-label">Special Instructions</label>
                    <textarea
                        className="form-control"
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Handle with care, fragile items..."
                    />
                </div>

                {/* Calculated Price Display */}
                <div className="price-summary mb-4">
                    <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <h5 className="mb-0">Estimated Courier Fee:</h5>
                        <h4 className="mb-0 text-dark">R{calculatedPrice.toFixed(2)}</h4>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <button type="submit" className="btn btn-brand-black">
                        Next: Terms & Payment <i className="bi bi-arrow-right ms-2 text-yellow"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ParcelDetailsStep;
