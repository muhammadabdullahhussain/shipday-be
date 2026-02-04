import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInterceptor';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

const FulfillmentConsole = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [createdShipment, setCreatedShipment] = useState(null);

    const initialFormState = {
        senderDetails: {
            fullName: '',
            company: '',
            mobile: '',
            email: '',
            address: { city: '', province: '', postalCode: '', street: '' }
        },
        deliveryDetails: {
            receiverName: '',
            company: '',
            mobile: '',
            email: '',
            address: { city: '', province: '', postalCode: '', street: '' }
        },
        orderNumber: '',
        marketplaceName: '',
        numberOfBoxes: 1,
        deliveryFee: 0,
        parcels: [{ length: '', width: '', height: '', weight: '' }],
        notes: '',
        bookedBy: '',
        dateDispatched: new Date().toISOString().split('T')[0]
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleInputChange = (section, field, value) => {
        if (section) {
            if (field.includes('.')) {
                const [nested, realField] = field.split('.');
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [nested]: {
                            ...prev[section][nested],
                            [realField]: value
                        }
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [field]: value
                    }
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleParcelChange = (index, field, value) => {
        const newParcels = [...formData.parcels];
        newParcels[index][field] = value;
        setFormData(prev => ({ ...prev, parcels: newParcels }));
    };

    const addParcel = () => {
        setFormData(prev => ({
            ...prev,
            parcels: [...prev.parcels, { length: '', width: '', height: '', weight: '' }]
        }));
    };

    const removeParcel = (index) => {
        if (formData.parcels.length > 1) {
            setFormData(prev => ({
                ...prev,
                parcels: prev.parcels.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                isFulfillment: true,
                payment: {
                    method: 'fulfillment',
                    status: 'paid',
                    amount: formData.deliveryFee
                },
                senderName: formData.senderDetails.fullName,
                senderPhone: formData.senderDetails.mobile,
                receiverName: formData.deliveryDetails.receiverName,
                receiverPhone: formData.deliveryDetails.mobile,
                start: formData.senderDetails.address.city,
                end: formData.deliveryDetails.address.city,
                parcelWeight: formData.parcels.reduce((acc, p) => acc + (parseFloat(p.weight) || 0), 0),
                cost: formData.deliveryFee,
                packageType: 'Marketplace Parcel'
            };

            const response = await axiosInstance.post('/admin/shipments', payload);
            toast.success('Marketplace Shipment Created Successfully!');
            setCreatedShipment(response.data.shipment);
        } catch (error) {
            console.error('Fulfillment error:', error);
            toast.error(error.response?.data?.message || 'Failed to create shipment');
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadWaybill = async () => {
        if (!createdShipment) return;
        try {
            const response = await axiosInstance.get(`/admin/shipments/${createdShipment.shipmentId}/waybill`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `waybill-${createdShipment.shipmentId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Waybill download error:', error);
            toast.error('Failed to download waybill');
        }
    };

    // Custom CSS for Premium Look
    const premiumStyles = `
        .fulfillment-premium-container {
            background: #f8f9fc;
            min-height: 100vh;
            padding: 2rem;
            font-family: 'Inter', sans-serif;
        }
        .premium-card {
            background: #ffffff;
            border-radius: 24px;
            border: none;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
            overflow: hidden;
        }
        .premium-header {
            background: linear-gradient(135deg, #836EFE 0%, #6343e0 100%);
            padding: 3rem;
            color: white;
            text-align: left;
        }
        .header-badge {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-bottom: 1rem;
        }
        .section-box {
            background: #ffffff;
            border: 1px solid #edf2f7;
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
            height: 100%;
        }
        .section-box:hover {
            border-color: #836EFE;
            box-shadow: 0 5px 20px rgba(131, 110, 254, 0.05);
        }
        .premium-label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #4a5568;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .premium-input {
            border: 1.5px solid #e2e8f0;
            border-radius: 12px;
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            transition: all 0.2s ease;
            background: #fcfdfe;
        }
        .premium-input:focus {
            outline: none;
            border-color: #836EFE;
            box-shadow: 0 0 0 4px rgba(131, 110, 254, 0.1);
            background: #fff;
        }
        .marketplace-bar {
            background: #f1f3ff;
            border-radius: 20px;
            padding: 2.5rem;
            margin-top: 2rem;
        }
        .parcel-table-container {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #edf2f7;
        }
        .parcel-table th {
            background: #f8f9fc;
            padding: 1rem;
            font-size: 0.7rem;
            font-weight: 800;
            color: #718096;
            border-bottom: 2px solid #edf2f7;
        }
        .parcel-table td {
            padding: 1rem;
            vertical-align: middle;
        }
        .submit-btn-premium {
            background: linear-gradient(135deg, #836EFE 0%, #6343e0 100%);
            color: white;
            border: none;
            padding: 1.25rem 4rem;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            box-shadow: 0 10px 25px rgba(131, 110, 254, 0.3);
            transition: all 0.3s ease;
            margin-top: 2rem;
        }
        .submit-btn-premium:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(131, 110, 254, 0.4);
        }
        .submit-btn-premium:active {
            transform: translateY(-1px);
        }
        .form-icon {
            width: 38px;
            height: 38px;
            background: #f1f3ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #836EFE;
            margin-right: 1rem;
        }
    `;

    return (
        <div className="fulfillment-premium-container">
            <style>{premiumStyles}</style>

            <div className="premium-card">
                {/* Header */}
                <div className="premium-header">
                    <div className="header-badge">Admin System • Logistics</div>
                    <h1 className="fw-black mb-2" style={{ fontSize: '2.5rem', fontWeight: 900 }}>FULFILLMENT CONSOLE</h1>
                    <p className="opacity-75 mb-0" style={{ fontSize: '1.1rem' }}>Enter Marketplace Fulfillment Details for Professional Shipping</p>
                </div>

                <div className="p-4 p-lg-5">
                    {createdShipment && (
                        <div className="alert border-0 shadow-sm d-flex justify-content-between align-items-center mb-5 p-4 rounded-4" style={{ background: '#e6fffa', borderLeft: '5px solid #38b2ac !important' }}>
                            <div>
                                <h4 className="mb-1 fw-bold text-dark">Shipment Successfully Booked</h4>
                                <p className="mb-0 text-muted">Waybill ID: <span className="fw-bold text-primary">{createdShipment.shipmentId}</span> is now active in the system.</p>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-dark rounded-pill px-4 fw-bold" onClick={handleDownloadWaybill}>
                                    <i className="bi bi-printer me-2"></i> Print Waybill
                                </button>
                                <button className="btn btn-outline-dark rounded-pill px-4 fw-bold" onClick={() => {
                                    setCreatedShipment(null);
                                    setFormData(initialFormState);
                                }}>
                                    New Entry
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Row: Addresses */}
                        <div className="row g-4 mb-4">
                            <div className="col-lg-6">
                                <div className="section-box">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="form-icon">
                                            <i className="bi bi-box-arrow-up" style={{ fontSize: '1.2rem' }}></i>
                                        </div>
                                        <h5 className="fw-bold m-0 text-dark">SENDER / PICKUP</h5>
                                    </div>
                                    <div className="row g-3 text-start">
                                        <div className="col-md-6">
                                            <label className="premium-label">Full Name</label>
                                            <input type="text" className="form-control premium-input" required placeholder="e.g. John Doe" value={formData.senderDetails.fullName} onChange={(e) => handleInputChange('senderDetails', 'fullName', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="premium-label">Business Name</label>
                                            <input type="text" className="form-control premium-input" placeholder="e.g. Acme Corp" value={formData.senderDetails.company} onChange={(e) => handleInputChange('senderDetails', 'company', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="premium-label">Mobile Number</label>
                                            <input type="text" className="form-control premium-input" required placeholder="081 234 5678" value={formData.senderDetails.mobile} onChange={(e) => handleInputChange('senderDetails', 'mobile', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="premium-label">Email Address</label>
                                            <input type="email" className="form-control premium-input" placeholder="sender@example.com" value={formData.senderDetails.email} onChange={(e) => handleInputChange('senderDetails', 'email', e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="premium-label">Street Address & Suburb</label>
                                            <input type="text" className="form-control premium-input" placeholder="123 Logistic Lane, Industrial Park" value={formData.senderDetails.address.street} onChange={(e) => handleInputChange('senderDetails', 'address.street', e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="premium-label">City</label>
                                            <input type="text" className="form-control premium-input" placeholder="Johannesburg" value={formData.senderDetails.address.city} onChange={(e) => handleInputChange('senderDetails', 'address.city', e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="premium-label">Province</label>
                                            <input type="text" className="form-control premium-input" placeholder="Gauteng" value={formData.senderDetails.address.province} onChange={(e) => handleInputChange('senderDetails', 'address.province', e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="premium-label">Postal Code</label>
                                            <input type="text" className="form-control premium-input" placeholder="2000" value={formData.senderDetails.address.postalCode} onChange={(e) => handleInputChange('senderDetails', 'address.postalCode', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="section-box" style={{ borderLeft: '4px solid #836EFE' }}>
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="form-icon" style={{ background: '#f1f3ff', color: '#836EFE' }}>
                                            <i className="bi bi-geo-alt" style={{ fontSize: '1.2rem' }}></i>
                                        </div>
                                        <h5 className="fw-bold m-0 text-dark">RECEIVER / DELIVERY</h5>
                                    </div>
                                    <div className="row g-3 text-start">
                                        <div className="col-md-6">
                                            <label className="premium-label">Receiver Name</label>
                                            <input type="text" className="form-control premium-input" required placeholder="e.g. Jane Smith" value={formData.deliveryDetails.receiverName} onChange={(e) => handleInputChange('deliveryDetails', 'receiverName', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="premium-label">Business / Company</label>
                                            <input type="text" className="form-control premium-input" placeholder="Store or Office Name" value={formData.deliveryDetails.company} onChange={(e) => handleInputChange('deliveryDetails', 'company', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="premium-label">Contact Number</label>
                                            <input type="text" className="form-control premium-input" required placeholder="072 987 6543" value={formData.deliveryDetails.mobile} onChange={(e) => handleInputChange('deliveryDetails', 'mobile', e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="premium-label">Email Address</label>
                                            <input type="email" className="form-control premium-input" placeholder="receiver@mail.com" value={formData.deliveryDetails.email} onChange={(e) => handleInputChange('deliveryDetails', 'email', e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <label className="premium-label">Full Shipping Address</label>
                                            <input type="text" className="form-control premium-input" placeholder="Unit 4, Ocean View Apts, 55 Beach Rd" value={formData.deliveryDetails.address.street} onChange={(e) => handleInputChange('deliveryDetails', 'address.street', e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="premium-label">City</label>
                                            <input type="text" className="form-control premium-input" placeholder="Cape Town" value={formData.deliveryDetails.address.city} onChange={(e) => handleInputChange('deliveryDetails', 'address.city', e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="premium-label">Province</label>
                                            <input type="text" className="form-control premium-input" placeholder="Western Cape" value={formData.deliveryDetails.address.province} onChange={(e) => handleInputChange('deliveryDetails', 'address.province', e.target.value)} />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="premium-label">Postal Code</label>
                                            <input type="text" className="form-control premium-input" placeholder="8001" value={formData.deliveryDetails.address.postalCode} onChange={(e) => handleInputChange('deliveryDetails', 'address.postalCode', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marketplace Bar */}
                        <div className="marketplace-bar text-start">
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-3">
                                    <h5 className="fw-bold mb-1"><i className="bi bi-shop me-2"></i> MARKETPLACE</h5>
                                    <p className="small text-muted mb-0">Order Source Details</p>
                                </div>
                                <div className="col-md-2">
                                    <label className="premium-label">Order Number</label>
                                    <input type="text" className="form-control premium-input border-white" required placeholder="e.g. MKP-4492" value={formData.orderNumber} onChange={(e) => handleInputChange(null, 'orderNumber', e.target.value)} />
                                </div>
                                <div className="col-md-3">
                                    <label className="premium-label">Marketplace Name</label>
                                    {/* Logic: If marketplaceName is one of the standard options, Select shows it. 
                                        If it's regular text (custom), Select shows 'Other'.
                                        If it's 'Other' (explicitly selected), Select shows 'Other' and input appears.
                                    */}
                                    {(() => {
                                        const standardOptions = ['Amazon', 'Takealot', 'Bidorbuy', 'Shopify', 'Majjversity', 'Leroy Merlin'];
                                        const isCustom = formData.marketplaceName && !standardOptions.includes(formData.marketplaceName);
                                        const selectValue = isCustom || formData.marketplaceName === 'Other' ? 'Other' : formData.marketplaceName;

                                        return (
                                            <>
                                                <select
                                                    className="form-select premium-input border-white"
                                                    value={selectValue}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (val === 'Other') {
                                                            // Keep current custom value if exists, or set to 'Other' placeholder to trigger input
                                                            handleInputChange(null, 'marketplaceName', 'Other');
                                                        } else {
                                                            handleInputChange(null, 'marketplaceName', val);
                                                        }
                                                    }}
                                                >
                                                    <option value="">Select Marketplace</option>
                                                    {standardOptions.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                    <option value="Other">Other (Custom)</option>
                                                </select>

                                                {(selectValue === 'Other') && (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            className="form-control premium-input border-white"
                                                            placeholder="Enter Marketplace Name"
                                                            value={formData.marketplaceName === 'Other' ? '' : formData.marketplaceName}
                                                            onChange={(e) => handleInputChange(null, 'marketplaceName', e.target.value)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                                <div className="col-md-2">
                                    <label className="premium-label">Parcel Count</label>
                                    <input type="number" className="form-control premium-input border-white" value={formData.numberOfBoxes} onChange={(e) => handleInputChange(null, 'numberOfBoxes', parseInt(e.target.value) || 1)} />
                                </div>
                                <div className="col-md-2">
                                    <label className="premium-label">Fulfillment Fee</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-0 small fw-bold">R</span>
                                        <input type="number" step="0.01" className="form-control premium-input border-0" placeholder="0.00" value={formData.deliveryFee} onChange={(e) => handleInputChange(null, 'deliveryFee', parseFloat(e.target.value) || 0)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parcel Details Table */}
                        <div className="mt-5 text-start">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold m-0"><i className="bi bi-box-seam me-2"></i> LINE ITEM DIMENSIONS</h5>
                                <button type="button" className="btn btn-primary rounded-pill btn-sm px-4 fw-bold" onClick={addParcel}>
                                    + ADD NEW BOX
                                </button>
                            </div>
                            <div className="parcel-table-container">
                                <table className="table parcel-table bg-white mb-0">
                                    <thead>
                                        <tr>
                                            <th>LENGTH (CM)</th>
                                            <th>WIDTH (CM)</th>
                                            <th>HEIGHT (CM)</th>
                                            <th>WEIGHT (KG)</th>
                                            <th style={{ width: '80px' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.parcels.map((parcel, index) => (
                                            <tr key={index}>
                                                <td><input type="number" className="form-control premium-input" placeholder="0" value={parcel.length} onChange={(e) => handleParcelChange(index, 'length', e.target.value)} /></td>
                                                <td><input type="number" className="form-control premium-input" placeholder="0" value={parcel.width} onChange={(e) => handleParcelChange(index, 'width', e.target.value)} /></td>
                                                <td><input type="number" className="form-control premium-input" placeholder="0" value={parcel.height} onChange={(e) => handleParcelChange(index, 'height', e.target.value)} /></td>
                                                <td><input type="number" className="form-control premium-input" placeholder="0.0" value={parcel.weight} onChange={(e) => handleParcelChange(index, 'weight', e.target.value)} /></td>
                                                <td className="text-center">
                                                    {formData.parcels.length > 1 && (
                                                        <button type="button" className="btn btn-outline-danger border-0" onClick={() => removeParcel(index)}><i className="bi bi-trash"></i></button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="row g-4 mt-4 text-start">
                            <div className="col-lg-8">
                                <label className="premium-label">HANDLING INSTRUCTIONS & NOTES</label>
                                <textarea className="form-control premium-input" rows="5" placeholder="Fragile items, fragile handling, specific gate codes, or delivery time preferences..." value={formData.notes} onChange={(e) => handleInputChange(null, 'notes', e.target.value)}></textarea>
                            </div>
                            <div className="col-lg-4">
                                <div className="p-4 rounded-4" style={{ background: '#f8f9fc', border: '1px dashed #cbd5e0' }}>
                                    <div className="mb-4">
                                        <label className="premium-label">ADMIN / BOOKED BY</label>
                                        <input type="text" className="form-control premium-input" required placeholder="Full Admin Name" value={formData.bookedBy} onChange={(e) => handleInputChange(null, 'bookedBy', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="premium-label">DISPATCH DATE</label>
                                        <input type="date" className="form-control premium-input" value={formData.dateDispatched} onChange={(e) => handleInputChange(null, 'dateDispatched', e.target.value)} />
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <button type="submit" className="submit-btn-premium w-100" disabled={loading}>
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : 'CREATE SHIPMENT'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="text-center mt-5 opacity-50 small fw-bold text-uppercase letter-spacing-1">
                ShipDay Logistics Management System • v2.4.0
            </div>
        </div>
    );
};

export default FulfillmentConsole;
