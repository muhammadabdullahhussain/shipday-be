import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInterceptor';
import OrderConfirmationModal from '../components/OrderConfirmationModal';

const PaymentSelectionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { shipmentData, totalAmount, isPublic } = location.state || {};

    const [selectedMethod, setSelectedMethod] = useState('');
    const [processing, setProcessing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmedShipment, setConfirmedShipment] = useState(null);

    // Redirect if no data (e.g. direct access)
    useEffect(() => {
        if (!shipmentData) {
            navigate('/dashboard/shipments');
        }
    }, [shipmentData, navigate]);

    const allPaymentMethods = [
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
            name: 'PayFast (Card / Instant EFT)',
            description: 'Secure Online Payment',
            icon: '💳',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: '#4facfe'
        }
    ];

    // Filter methods: If public, show ONLY PayFast. If dashboard, show ALL.
    const paymentMethods = isPublic
        ? allPaymentMethods.filter(m => m.id === 'payfast')
        : allPaymentMethods;

    const handleConfirm = async () => {
        if (!selectedMethod) {
            toast.error('Please select a payment method');
            return;
        }

        const formattedPayload = {
            ...shipmentData,
            senderName: shipmentData.senderDetails?.fullName || 'N/A',
            senderPhone: shipmentData.senderDetails?.mobile || '0000000000',
            receiverName: shipmentData.deliveryDetails?.receiverName || 'N/A',
            receiverPhone: shipmentData.deliveryDetails?.mobile || '0000000000',
            start: shipmentData.collectionDetails?.address?.city || 'Unknown',
            end: shipmentData.deliveryDetails?.address?.city || 'Unknown',
            parcelWeight: shipmentData.parcelDetails?.dimensions?.weight || 1,
            packageType: shipmentData.parcelDetails?.parcelType || 'parcel',
            cost: totalAmount || 0,
            eta: new Date(new Date().setDate(new Date().getDate() + 3)),
            payment: {
                method: selectedMethod,
                amount: totalAmount,
                status: 'pending'
            }
        };

        if (selectedMethod === 'cod') {
            setProcessing(true);
            try {
                formattedPayload.payment.method = 'cod';
                const shipmentResponse = await axiosInstance.post('/shipments', formattedPayload);

                setConfirmedShipment({
                    shipmentId: shipmentResponse.data.shipment.shipmentId,
                    from: formattedPayload.start,
                    to: formattedPayload.end,
                    amount: totalAmount
                });

                setShowConfirmation(true);
            } catch (error) {
                console.error('COD error:', error);
                toast.error(error.response?.data?.message || 'Failed to create order.');
            } finally {
                setProcessing(false);
            }
        } else if (selectedMethod === 'payfast' || selectedMethod === 'ewallet') {
            setProcessing(true);
            try {
                const shipmentResponse = await axiosInstance.post('/shipments', formattedPayload);
                const shipmentId = shipmentResponse.data.shipment._id;

                const paymentResponse = await axiosInstance.post('/payments/payfast', {
                    shipmentId: shipmentId
                });

                if (paymentResponse.data.redirectUrl) {
                    window.location.href = paymentResponse.data.redirectUrl;
                } else {
                    toast.error('Payment gateway URL not available');
                    setProcessing(false);
                }
            } catch (error) {
                console.error('PayFast error:', error);
                toast.error(error.response?.data?.message || 'Failed to initiate payment.');
                setProcessing(false);
            }
        }
    };

    const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

    if (!shipmentData) return null;

    return (
        <div className="min-vh-100 d-flex flex-column flex-lg-row bg-light overflow-hidden">
            {/* Left Panel - Summary */}
            <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center p-5 text-white position-relative"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    zIndex: 1
                }}
            >
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', blur: '50px' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.15)', blur: '50px' }}></div>

                <div className="text-center position-relative z-2">
                    <div className="mb-4">
                        <div className="bg-white bg-opacity-10 p-3 rounded-circle d-inline-block">
                            <i className="bi bi-wallet2 fs-1"></i>
                        </div>
                    </div>
                    <h6 className="text-uppercase tracking-wider opacity-75 mb-3" style={{ letterSpacing: '2px' }}>Total Amount To Pay</h6>
                    <h1 className="display-3 fw-bold mb-4">R{totalAmount?.toFixed(2) || '0.00'}</h1>

                    <div className="card bg-white bg-opacity-5 border-0 rounded-3 p-3 text-start w-100 mb-4" style={{ backdropFilter: 'blur(10px)' }}>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="opacity-75">Service</span>
                            <span className="fw-bold">{shipmentData.parcelDetails?.serviceType}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="opacity-75">Parcel Type</span>
                            <span className="fw-bold text-capitalize">{shipmentData.parcelDetails?.parcelType}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="opacity-75">Items</span>
                            <span className="fw-bold">{shipmentData.collectionDetails?.numberOfItems || 1}</span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center opacity-75 small">
                        <i className="bi bi-lock-fill me-2"></i>
                        Secure 256-bit SSL Encrypted Payment
                    </div>
                </div>
            </div>

            {/* Right Panel - Selection */}
            <div className="col-lg-8 p-4 p-md-5 d-flex flex-column bg-white">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="fw-bold text-dark m-0">Select Payment Method</h2>
                    <Button variant="outline-secondary" onClick={() => navigate(-1)} className="rounded-pill px-4">
                        Cancel
                    </Button>
                </div>

                <div className="row g-4 mb-auto">
                    {paymentMethods.map((method) => {
                        const isSelected = selectedMethod === method.id;
                        return (
                            <div key={method.id} className="col-md-6">
                                <div
                                    onClick={() => setSelectedMethod(method.id)}
                                    className="h-100 p-4 rounded-4 transition-all position-relative overflow-hidden cursor-pointer"
                                    style={{
                                        border: isSelected ? 'none' : '2px solid #f1f5f9',
                                        background: isSelected ? method.gradient : '#fff',
                                        color: isSelected ? 'white' : '#1e293b',
                                        cursor: 'pointer',
                                        transform: isSelected ? 'translateY(-5px)' : 'none',
                                        boxShadow: isSelected ? `0 20px 25px -5px ${method.color}50` : 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div className="d-flex align-items-center mb-3">
                                        <div className={`rounded-circle d-flex align-items-center justify-content-center p-3 me-3 ${isSelected ? 'bg-white bg-opacity-25' : 'bg-light'}`}
                                            style={{ width: '60px', height: '60px', fontSize: '24px' }}
                                        >
                                            {method.icon}
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">{method.name}</h5>
                                            <small className={isSelected ? 'opacity-75' : 'text-muted'}>{method.description}</small>
                                        </div>
                                    </div>

                                    {isSelected && (
                                        <div className="position-absolute top-0 end-0 p-3">
                                            <i className="bi bi-check-circle-fill fs-4"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-5 pt-4 border-top">
                    <Button
                        onClick={handleConfirm}
                        disabled={processing || !selectedMethod}
                        size="lg"
                        className="w-100 rounded-3 py-3 fw-bold fs-5 shadow-sm border-0"
                        style={{
                            background: selectedMethod ? selectedMethodData?.gradient : '#cbd5e1',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {processing ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Processing Secure Payment...
                            </>
                        ) : (
                            <>
                                {selectedMethod === 'cod' ? 'Confirm Order' : `Pay R${totalAmount?.toFixed(2)}`}
                                <i className="bi bi-arrow-right ms-2"></i>
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <OrderConfirmationModal
                show={showConfirmation}
                onClose={() => {
                    setShowConfirmation(false);
                    navigate('/dashboard/shipments');
                }}
                shipmentData={confirmedShipment}
            />
            {/* Styles for global usage */}
            <style>{`
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
            <style>{`
                .modal-backdrop.show {
                    backdrop-filter: blur(8px);
                    background-color: rgba(15, 23, 42, 0.6) !important;
                }
            `}</style>
        </div>
    );
};

export default PaymentSelectionPage;
