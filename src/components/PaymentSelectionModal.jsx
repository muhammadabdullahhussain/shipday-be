import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInterceptor';
import OrderConfirmationModal from './OrderConfirmationModal';

const PaymentSelectionModal = ({
    show,
    onClose,
    loading,
    totalAmount,
    onMethodSelect,
    onSubmit,
    shipmentData
}) => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [processing, setProcessing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmedShipment, setConfirmedShipment] = useState(null);

    const paymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            description: 'Pay when you receive',
            icon: '💵',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#667eea'
        },
        {
            id: 'ewallet',
            name: 'eWallet',
            description: 'Digital wallet payment',
            icon: '📱',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: '#f5576c'
        },
        {
            id: 'payfast',
            name: 'PayFast',
            description: 'Card payment gateway',
            icon: '💳',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: '#4facfe'
        }
    ];

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
        onMethodSelect(method);
    };

    const handleConfirm = async () => {
        if (!selectedMethod) {
            toast.error('Please select a payment method');
            return;
        }

        // Prepare payload with legacy fields mapped for backend validation
        const formattedPayload = {
            ...shipmentData,
            // Map legacy fields explicitly to satisfy backend validation
            senderName: shipmentData.senderDetails?.fullName || 'N/A',
            senderPhone: shipmentData.senderDetails?.mobile || '0000000000',
            receiverName: shipmentData.deliveryDetails?.receiverName || 'N/A',
            receiverPhone: shipmentData.deliveryDetails?.mobile || '0000000000',
            start: shipmentData.collectionDetails?.address?.city || 'Unknown',
            end: shipmentData.deliveryDetails?.address?.city || 'Unknown',
            parcelWeight: shipmentData.parcelDetails?.dimensions?.weight || 1,
            packageType: shipmentData.parcelDetails?.parcelType || 'parcel',
            cost: totalAmount || 0,
            eta: new Date(new Date().setDate(new Date().getDate() + 3)), // Default 3 days ETA
            payment: {
                method: selectedMethod,
                amount: totalAmount,
                status: 'pending'
            }
        };

        if (selectedMethod === 'cod') {
            setProcessing(true);
            try {
                // Ensure payment method is correctly set for COD
                formattedPayload.payment.method = 'cod';

                console.log('COD Payment - Sending payload:', JSON.stringify(formattedPayload, null, 2));
                const shipmentResponse = await axiosInstance.post('/shipments', formattedPayload);

                setConfirmedShipment({
                    shipmentId: shipmentResponse.data.shipment.shipmentId,
                    from: formattedPayload.start,
                    to: formattedPayload.end,
                    amount: totalAmount
                });

                onClose();
                setShowConfirmation(true);
            } catch (error) {
                console.error('COD order error:', error);
                console.error('Error response:', error.response?.data);
                toast.error(error.response?.data?.message || 'Failed to create order. Please try again.');
            } finally {
                setProcessing(false);
            }
        }
        else if (selectedMethod === 'payfast' || selectedMethod === 'ewallet') {
            setProcessing(true);
            try {
                console.log('PayFast/eWallet - Sending data:', JSON.stringify(formattedPayload, null, 2));
                const shipmentResponse = await axiosInstance.post('/shipments', formattedPayload);
                const shipmentId = shipmentResponse.data.shipment._id;
                const publicShipmentId = shipmentResponse.data.shipment.shipmentId;

                const paymentResponse = await axiosInstance.post('/payments/payfast', {
                    shipmentId: shipmentId,
                    amount: totalAmount,
                    item_name: `Shipment ${publicShipmentId}`,
                    item_description: `Delivery from ${formattedPayload.start} to ${formattedPayload.end}`
                });

                if (paymentResponse.data.redirectUrl) {
                    window.location.href = paymentResponse.data.redirectUrl;
                } else {
                    toast.error('Payment gateway URL not available');
                    setProcessing(false);
                }
            } catch (error) {
                console.error('Payment error:', error);
                console.error('Error response:', error.response?.data);
                toast.error(error.response?.data?.message || 'Failed to initiate payment. Please try again.');
                setProcessing(false);
            }
        }
    };

    const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                centered
                size="lg"
                backdrop="static"
                contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
            >
                <div className="row g-0">
                    {/* Left Side - Summary Panel (Desktop) / Top (Mobile) */}
                    <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center p-4 text-white"
                        style={{
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative Circles */}
                        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
                        <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>

                        <div className="text-center position-relative z-1">
                            <h6 className="text-uppercase tracking-wider opacity-75 mb-2" style={{ letterSpacing: '1px', fontSize: '12px' }}>Total Amount</h6>
                            <h2 className="display-4 fw-bold mb-3">R{totalAmount?.toFixed(2) || '0.00'}</h2>
                            <div className="badge bg-white bg-opacity-10 px-3 py-2 rounded-pill fw-normal">
                                <i className="bi bi-shield-check me-2"></i>
                                Secure Payment
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Selection Panel */}
                    <div className="col-lg-8 bg-white p-4 p-md-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold mb-0 text-dark">Select Payment Method</h4>
                            <button onClick={onClose} className="btn-close shadow-none"></button>
                        </div>

                        <div className="row g-3 mb-4">
                            {paymentMethods.map((method) => {
                                const isSelected = selectedMethod === method.id;
                                return (
                                    <div key={method.id} className="col-md-6 col-12">
                                        <div
                                            onClick={() => handleMethodChange(method.id)}
                                            className={`p-3 p-md-4 rounded-4 h-100 d-flex flex-column justify-content-center text-center cursor-pointer transition-all position-relative overflow-hidden`}
                                            style={{
                                                border: isSelected ? 'none' : '1px solid #e2e8f0',
                                                background: isSelected ? method.gradient : '#f8fafc',
                                                color: isSelected ? 'white' : '#475569',
                                                cursor: 'pointer',
                                                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: isSelected ? `0 10px 25px -5px ${method.color}60` : 'none'
                                            }}
                                        >
                                            <div className="mb-3" style={{ fontSize: '32px' }}>{method.icon}</div>
                                            <h6 className="fw-bold mb-1">{method.name}</h6>
                                            <small style={{ opacity: 0.8, fontSize: '12px' }}>{method.description}</small>

                                            {isSelected && (
                                                <div className="position-absolute top-0 end-0 p-2">
                                                    <i className="bi bi-check-circle-fill text-white"></i>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {selectedMethod && (
                            <div className="d-flex align-items-start p-3 rounded-3 mb-4" style={{
                                background: `${selectedMethodData?.color}10`,
                                borderLeft: `4px solid ${selectedMethodData?.color}`
                            }}>
                                <i className="bi bi-info-circle-fill me-2 fs-5" style={{ color: selectedMethodData?.color }}></i>
                                <div>
                                    <small className="d-block fw-bold text-dark">Note:</small>
                                    <small className="text-muted">
                                        {selectedMethod === 'cod' && 'Please have the exact cash amount ready upon delivery.'}
                                        {selectedMethod === 'ewallet' && 'You will be redirected to our secure payment partner (PayFast).'}
                                        {selectedMethod === 'payfast' && 'You will be redirected to PayFast to complete your card payment.'}
                                    </small>
                                </div>
                            </div>
                        )}

                        <div className="d-grid">
                            <Button
                                onClick={handleConfirm}
                                disabled={processing || !selectedMethod}
                                size="lg"
                                className="rounded-3 py-3 fw-bold border-0"
                                style={{
                                    background: selectedMethod ? selectedMethodData?.gradient : '#cbd5e1',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {processing ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        {selectedMethod === 'cod' ? 'Confirm Order' : 'Proceed to Payment'}
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <OrderConfirmationModal
                show={showConfirmation}
                onClose={() => {
                    setShowConfirmation(false);
                    window.location.reload();
                }}
                shipmentData={confirmedShipment}
            />
            <style>{`
                .modal-backdrop.show {
                    backdrop-filter: blur(8px);
                    background-color: rgba(15, 23, 42, 0.6) !important;
                }
                .modal-content {
                    border: none;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </>
    );
};

export default PaymentSelectionModal;
