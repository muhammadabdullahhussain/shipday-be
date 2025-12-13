import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInterceptor';

const ParcelDetailsStep = ({ formData, updateFormData, previousStep, nextStep }) => {
    const [calculatedPrice, setCalculatedPrice] = useState(0);



    const [loading, setLoading] = useState(true);
    const [pricingConfig, setPricingConfig] = useState({
        economy: { baseAmount: 20, divisor: 5000, rate: 1.2, eta: '1-4 days', icon: '🚚' },
        express: { baseAmount: 40, divisor: 4000, rate: 1.2, eta: '1-2 days', icon: '⚡' },
        satchel: { a4: 90, a3: 110 }
    });

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const response = await axiosInstance.get('/pricing');
                if (response.data) {
                    // Merge API data with icons (since icons aren't in DB)
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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('dimensions.')) {
            const dimensionField = name.split('.')[1];
            updateFormData({
                dimensions: {
                    ...formData.dimensions,
                    [dimensionField]: value
                }
            });
        } else {
            updateFormData({ [name]: value });
        }
    };

    // Calculate price whenever relevant fields change
    useEffect(() => {
        calculatePrice();
    }, [
        formData.serviceType,
        formData.parcelType,
        formData.dimensions.length,
        formData.dimensions.width,
        formData.dimensions.height,
        formData.dimensions.weight
    ]);

    const calculatePrice = () => {
        let price = 0;

        if (formData.parcelType === 'satchel-a4') {
            price = pricingConfig.satchel.a4;
        } else if (formData.parcelType === 'satchel-a3') {
            price = pricingConfig.satchel.a3;
        } else if (formData.parcelType === 'custom') {
            const { length, width, height } = formData.dimensions;

            if (length && width && height) {
                const config = pricingConfig[formData.serviceType];
                const volumetricWeight = (parseFloat(length) * parseFloat(width) * parseFloat(height)) / config.divisor;
                price = config.baseAmount + (volumetricWeight * config.rate);
            }
        }

        setCalculatedPrice(price);
        updateFormData({ calculatedPrice: price });
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (formData.parcelType === 'custom') {
            const { length, width, height, weight } = formData.dimensions;
            if (!length || !width || !height || !weight) {
                alert('Please fill in all parcel dimensions');
                return;
            }
        }

        if (calculatedPrice === 0) {
            alert('Please select a valid parcel type');
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
                            <div
                                className={`service-card ${formData.serviceType === 'economy' ? 'selected' : ''}`}
                                onClick={() => updateFormData({ serviceType: 'economy' })}
                            >
                                <div className="service-icon">{pricingConfig.economy.icon}</div>
                                <h5>Economy</h5>
                                <p className="text-muted">ETA: {pricingConfig.economy.eta}</p>
                                <small>Base: R{pricingConfig.economy.baseAmount} + volumetric</small>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div
                                className={`service-card ${formData.serviceType === 'express' ? 'selected' : ''}`}
                                onClick={() => updateFormData({ serviceType: 'express' })}
                            >
                                <div className="service-icon">{pricingConfig.express.icon}</div>
                                <h5>Express</h5>
                                <p className="text-muted">ETA: {pricingConfig.express.eta}</p>
                                <small>Base: R{pricingConfig.express.baseAmount} + volumetric</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Parcel Type Selection */}
                <div className="mb-4">
                    <label className="form-label fw-bold">Parcel Type *</label>
                    <div className="row">
                        <div className="col-md-4">
                            <div
                                className={`parcel-type-card ${formData.parcelType === 'satchel-a4' ? 'selected' : ''}`}
                                onClick={() => updateFormData({ parcelType: 'satchel-a4' })}
                            >
                                <h6>Satchel A4</h6>
                                <p className="price">R{pricingConfig.satchel.a4}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div
                                className={`parcel-type-card ${formData.parcelType === 'satchel-a3' ? 'selected' : ''}`}
                                onClick={() => updateFormData({ parcelType: 'satchel-a3' })}
                            >
                                <h6>Satchel A3</h6>
                                <p className="price">R{pricingConfig.satchel.a3}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div
                                className={`parcel-type-card ${formData.parcelType === 'custom' ? 'selected' : ''}`}
                                onClick={() => updateFormData({ parcelType: 'custom' })}
                            >
                                <h6>Custom Parcel</h6>
                                <p className="price">Calculated</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Parcel Dimensions */}
                {formData.parcelType === 'custom' && (
                    <div className="custom-dimensions mb-4">
                        <h6 className="mb-3">Custom Parcel Dimensions</h6>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Length (cm) *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    name="dimensions.length"
                                    value={formData.dimensions.length}
                                    onChange={handleChange}
                                    placeholder="20"
                                    required
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Width (cm) *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    name="dimensions.width"
                                    value={formData.dimensions.width}
                                    onChange={handleChange}
                                    placeholder="10"
                                    required
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Height (cm) *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    name="dimensions.height"
                                    value={formData.dimensions.height}
                                    onChange={handleChange}
                                    placeholder="10"
                                    required
                                />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Weight (kg) *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    name="dimensions.weight"
                                    value={formData.dimensions.weight}
                                    onChange={handleChange}
                                    placeholder="2.5"
                                    required
                                />
                            </div>
                        </div>

                        {/* Formula Display */}
                        {formData.dimensions.length && formData.dimensions.width && formData.dimensions.height && (
                            <div className="alert alert-info mt-3">
                                <strong>Calculation:</strong> R{pricingConfig[formData.serviceType].baseAmount} +
                                ({formData.dimensions.length} × {formData.dimensions.width} × {formData.dimensions.height}) /
                                {pricingConfig[formData.serviceType].divisor} × R{pricingConfig[formData.serviceType].rate}
                            </div>
                        )}
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
                        <h4 className="mb-0 text-primary">R{calculatedPrice.toFixed(2)}</h4>
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Next: Terms & Payment →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ParcelDetailsStep;
