import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
            toast.error('Please accept the terms and conditions to proceed');
            return;
        }

        const shipmentData = {
            senderDetails: {
                customerId: formData.senderCustomerId,
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
    Terms and Conditions – Shipday
 
    Last updated: 18 January 2026
 
    These Terms and Conditions (“Terms”) govern the use of Shipday services, including order management, delivery coordination, tracking, and related courier services. By using Shipday, you agree to be bound by these Terms.
 
    1. Definitions
    “Shipday” refers to the delivery management platform and related services.
    “User” refers to any individual or business using Shipday.
    “Merchant” refers to a business using Shipday to manage deliveries.
    “Courier” refers to a third-party delivery driver or service.
    “Customer” refers to the end recipient of a delivery.
 
    2. Scope of Services
    Shipday provides a technology platform that facilitates delivery management, order tracking, and courier coordination. Shipday does not operate as a courier company unless explicitly stated and is not responsible for the physical transportation of goods.
 
    3. User Responsibilities
    Users agree to:
    - Provide accurate and complete order, address, and contact information.
    - Ensure parcels are properly packed, sealed, and labeled.
    - Comply with all applicable laws and courier requirements.
    - Ensure that shipped items are legal and not prohibited or restricted.
 
    4. Prohibited and Restricted Items 
    Users may not ship items including but not limited to:
    - Hazardous, flammable, or explosive materials
    - Illegal goods
    - Perishable items without prior approval
    - Items prohibited by local, national, or international law
    Shipday reserves the right to cancel or refuse orders involving prohibited items.
 
    5. Pickup and Delivery
    - All parcels must be ready for pickup at the scheduled time.
    - Delays caused by incorrect information, inaccessible locations, or unprepared parcels are the User’s responsibility.
    - Delivery times are estimates and not guaranteed.
 
    6. Fees and Payments
    - Users agree to pay all applicable service, delivery, and platform fees.
    - Additional charges may apply for incorrect weight, size, address changes, or failed delivery attempts.
    - Fees are non-refundable once a delivery is dispatched, except where required by law.
 
    7. Cancellations and Modifications
    - Orders may only be canceled or modified before courier dispatch.
    - Once a courier is assigned or en route, cancellation may not be possible and charges may apply.
 
    8. Liability and Insurance
    - Shipday is not liable for loss, damage, or delay of goods during transit.
    - Liability, if any, is limited to the extent required by applicable law.
    - Users are responsible for obtaining additional insurance for high-value items.
 
    9. Claims and Disputes
    - Claims for lost or damaged items must be reported within the time frame specified by the courier.
    - Supporting documentation, including photos and proof of value, may be required.
    - Claims are subject to courier terms and conditions.
 
    10. Third-Party Services
    Shipday may integrate with third-party couriers, payment processors, or mapping services. Shipday is not responsible for the actions, errors, or omissions of third parties.

    11. Data Protection and Privacy
    Shipday collects and processes personal data in accordance with its Privacy Policy. By using Shipday, you consent to such processing.
 
    12. Suspension or Termination
    Shipday reserves the right to suspend or terminate access for violations of these Terms, misuse of the platform, or illegal activity.
 
    13. Limitation of Liability
    To the maximum extent permitted by law, Shipday shall not be liable for indirect, incidental, or consequential damages, including loss of profits or business.
 
    14. Governing Law
    These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction where Shipday operates.
 
    15. Changes to Terms
    Shipday reserves the right to update or modify these Terms at any time. Continued use of the service constitutes acceptance of the updated Terms.
 
    16. Contact Information
    For questions regarding these Terms, please contact:
    Email: support@shipday.co.za
    Business Name: Shipday Pty Ltd
 
    Shipday is Independent Courier Company
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
                            <div className="col-6 text-end"><h5 className="text-dark mb-0">R{formData.calculatedPrice.toFixed(2)}</h5></div>
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
                                className="btn btn-link p-0 text-decoration-none text-dark fw-bold"
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
                    <button type="button" className="btn btn-outline-secondary" onClick={previousStep}>
                        ← Back
                    </button>
                    <div>
                        <button type="button" className="btn btn-outline-danger me-2" onClick={onCancel}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-brand-black"
                            disabled={loading}
                            onClick={() => {
                                // Verify terms
                                if (!formData.termsAccepted) {
                                    toast.error('Please accept the terms and conditions');
                                    return;
                                }

                                // Structure the data to match the public/selection page expectations
                                const payload = {
                                    senderDetails: {
                                        customerId: formData.senderCustomerId,
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
                                        method: '', // Will be selected on selection page
                                        amount: formData.calculatedPrice
                                    }
                                };

                                // Navigate to selection page for BOTH guest and admin flows
                                // as requested by user to allow method selection
                                navigate('/payment/select', {
                                    state: {
                                        shipmentData: payload,
                                        totalAmount: formData.calculatedPrice,
                                        isPublic: !!isPublic
                                    }
                                });
                            }}
                        >
                            Proceed to Payment <i className="bi bi-credit-card ms-2 text-yellow"></i>
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
                                    className="btn btn-brand-black"
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
