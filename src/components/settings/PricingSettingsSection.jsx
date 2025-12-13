import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInterceptor';
import Button from '../ui/Button';

const PricingSettingsSection = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {
            const response = await axiosInstance.get('/pricing');
            setConfig(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load pricing configuration');
            setLoading(false);
        }
    };

    const handleChange = (section, field, value) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: parseFloat(value) || 0
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
            await axiosInstance.put('/pricing', config);
            setSuccess('Pricing updated successfully');
        } catch (err) {
            setError('Failed to update pricing');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading pricing...</div>;
    if (!config) return <div>Error loading configuration</div>;

    return (
        <div className="section-container">
            <h4 className="section-title">Pricing Configuration</h4>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="row mt-4">
                {/* Economy Settings */}
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Economy Service</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Base Amount (R)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={config.economy.baseAmount}
                                    onChange={(e) => handleChange('economy', 'baseAmount', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Volumetric Divisor</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={config.economy.divisor}
                                    onChange={(e) => handleChange('economy', 'divisor', e.target.value)}
                                />
                                <small className="text-muted">Higher = Cheaper volumetric weight</small>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Multiplier Rate</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    value={config.economy.rate}
                                    onChange={(e) => handleChange('economy', 'rate', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Express Settings */}
                <div className="col-md-6 mb-4">
                    <div className="card h-100">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Express Service</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Base Amount (R)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={config.express.baseAmount}
                                    onChange={(e) => handleChange('express', 'baseAmount', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Volumetric Divisor</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={config.express.divisor}
                                    onChange={(e) => handleChange('express', 'divisor', e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Multiplier Rate</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="form-control"
                                    value={config.express.rate}
                                    onChange={(e) => handleChange('express', 'rate', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Satchel Settings */}
                <div className="col-md-12 mb-4">
                    <div className="card">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Satchel Flat Rates</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Satchel A4 Cost (R)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={config.satchel.a4}
                                        onChange={(e) => handleChange('satchel', 'a4', e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Satchel A3 Cost (R)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={config.satchel.a3}
                                        onChange={(e) => handleChange('satchel', 'a3', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    variant="primary"
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};

export default PricingSettingsSection;
