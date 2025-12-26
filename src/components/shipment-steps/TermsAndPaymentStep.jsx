import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import PaymentSelectionModal from '../PaymentSelectionModal';

const TermsAndPaymentStep = ({ formData, updateFormData, previousStep, onSubmit, onCancel, loading, isPublic }) => {
    const [showTermsModal, setShowTermsModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateFormData({
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions to proceed');
            return;
        }

        const shipmentData = {
            senderDetails: {
                fullName: formData.senderFullName,
                company: formData.senderCompany,
                email: formData.senderEmail,
                mobile: formData.senderMobile,
                telephone: formData.senderTelephone,
                address: formData.senderAddress
            },
            collectionDetails: {
                dispatcherName: formData.dispatcherName,
                company: formData.collectionCompany,
                mobile: formData.collectionMobile,
                office: formData.collectionOffice,
                email: formData.collectionEmail,
                address: formData.collectionAddress,
                numberOfItems: formData.collectionAddress.numberOfItems
            },
            deliveryDetails: {
                receiverName: formData.receiverName,
                company: formData.deliveryCompany,
                mobile: formData.receiverMobile,
                office: formData.receiverOffice,
                email: formData.receiverEmail,
                address: formData.deliveryAddress
            },
            parcelDetails: {
                serviceType: formData.serviceType,
                parcelType: formData.parcelType,
                dimensions: formData.dimensions,
                specialInstructions: formData.specialInstructions
            },
            payment: {
                method: '', // Will be selected on next page
                amount: formData.calculatedPrice
            }
        };

        navigate('/payment/select', {
            state: {
                shipmentData,
                totalAmount: formData.calculatedPrice,
                isPublic // Pass logic flag
            }
        });
    };

    // Sample terms - in production, fetch from backend
    const termsContent = `
    TERMS AND CONDITIONS

    1. Acceptance of Terms
    By using ShipDay courier services, you agree to be bound by these terms and conditions.

    2. Service Description
    ShipDay provides courier and delivery services for parcels and documents within South Africa.

    3. Pricing
    - All prices are in South African Rand (ZAR)
    - Prices are calculated based on parcel dimensions, weight, and service type
    - Additional charges may apply for special handling or remote locations

    4. Liability
    - ShipDay is liable for loss or damage up to R1000 per parcel
    - Additional insurance can be purchased for valuable items
    - Claims must be submitted within 7 days of delivery

    5. Prohibited Items
    The following items are not permitted:
    - Dangerous goods, explosives, flammable materials
    - Illegal substances or contraband
    - Perishable food items (unless pre-arranged)

    6. Delivery
    - Delivery times are estimates and not guaranteed
    - Signature may be required upon delivery
    - We will attempt delivery 3 times before returning to sender

    7. Payment
    - Payment must be made before collection
    - Accepted methods: E-wallet, Credit/Debit Card, Cash on Delivery
    - Refunds are processed within 7-14 business days

    8. Privacy
    Your personal information will be used solely for delivery purposes and will not be shared with third parties.

    Last updated: December 2025
  `;

    return (
        <div className="step-container">
            <h4 className="step-title">Terms & Payment</h4>
            <p className="step-subtitle">Review and accept terms, then choose payment method</p>

            <form onSubmit={handleSubmit}>
                {/* Order Summary */}
                <div className="order-summary mb-4">
                    <h5 className="mb-3">Order Summary</h5>
                    <div className="summary-card p-3 bg-light rounded">
                        <div className="row mb-2">
                            <div className="col-6"><strong>Service Type:</strong></div>
                            <div className="col-6 text-end text-capitalize">{formData.serviceType}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6"><strong>Parcel Type:</strong></div>
                            <div className="col-6 text-end">{formData.parcelType.replace('-', ' ').toUpperCase()}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6"><strong>From:</strong></div>
                            <div className="col-6 text-end">{formData.collectionAddress.city}</div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-6"><strong>To:</strong></div>
                            <div className="col-6 text-end">{formData.deliveryAddress.city}</div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-6"><strong>Total Amount:</strong></div>
                            <div className="col-6 text-end"><h5 className="text-primary mb-0">R{formData.calculatedPrice.toFixed(2)}</h5></div>
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="terms-section mb-4">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="termsAccepted">
                            I accept the{' '}
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => setShowTermsModal(true)}
                            >
                                Terms and Conditions
                            </button>
                        </label>
                    </div>
                </div>

                {/* Payment Selection Modal Triggered on Submit */}

                {/* Action Buttons */}
                <div className="d-flex justify-content-between mt-4">
                    <button type="button" className="btn btn-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <div>
                        <button type="button" className="btn btn-outline-secondary me-2" onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            disabled={loading}
                            onClick={handleSubmit} // Opens modal
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </form>

            {/* Modal removed - navigating to page instead */}

            {/* Terms Modal */}
            {showTermsModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Terms and Conditions</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowTermsModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                                    {termsContent}
                                </pre>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowTermsModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        updateFormData({ termsAccepted: true });
                                        setShowTermsModal(false);
                                    }}
                                >
                                    Accept Terms
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TermsAndPaymentStep;
