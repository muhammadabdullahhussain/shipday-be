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
    const [user, setUser] = useState(null);
    const email = localStorage.getItem('email');

    // Redirect if no data (e.g. direct access)
    useEffect(() => {
        if (!shipmentData) {
            navigate('/dashboard/shipments');
        }
    }, [shipmentData, navigate]);

    // Fetch user details for ewallet payment if in dashboard
    // Fetch user details for ewallet payment if in dashboard
    useEffect(() => {
        const fetchUser = async () => {
            if (!isPublic) {
                if (shipmentData?.senderDetails?.customerId) {
                    try {
                        const res = await axiosInstance.get(`/user/${shipmentData.senderDetails.customerId}`);
                        setUser(res.data.user);
                    } catch (e) {
                        console.error('Failed to fetch customer for wallet:', e);
                    }
                } else if (email) {
                    try {
                        const res = await axiosInstance.get(`/user?email=${email}`);
                        setUser(res.data.user);
                    } catch (e) {
                        console.error('Failed to fetch user:', e);
                    }
                }
            }
        };
        fetchUser();
    }, [isPublic, email, shipmentData]);

    const allPaymentMethods = [
        {
            id: 'cod',
            name: 'Cash on Delivery',
            description: 'Pay securely when you receive your parcel',
            icon: 'bi-cash-stack',
            color: '#fabb05' // Brand Yellow
        },
        {
            id: 'ewallet',
            name: 'eWallet',
            description: 'Digital wallet payment',
            icon: 'bi-wallet2',
            color: '#fabb05'
        },
        {
            id: 'payfast',
            name: 'PayFast (Card / Instant EFT)',
            description: 'Secure Online Payment via Credit Card or EFT',
            icon: 'bi-credit-card-2-front',
            color: '#fabb05'
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
        } else if (selectedMethod === 'payfast') {
            setProcessing(true);
            try {
                const shipmentResponse = await axiosInstance.post('/shipments', formattedPayload);
                const shipmentId = shipmentResponse.data.shipment._id;

                const paymentResponse = await axiosInstance.post('/payments/payfast', {
                    shipmentId: shipmentId
                });

                if (paymentResponse.data.redirectUrl) {
                    sessionStorage.setItem('pendingPayment', shipmentId);
                    sessionStorage.setItem('pendingAmount', totalAmount.toString());
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
        } else if (selectedMethod === 'ewallet') {
            setProcessing(true);
            try {
                // 1. Create Shipment
                const shipmentResponse = await axiosInstance.post('/shipments', formattedPayload);
                const shipmentId = shipmentResponse.data.shipment._id;

                // 2. Process Wallet Payment
                let finalUserId = user?._id;

                // Fallback: If user state isn't populated yet, try to fetch it now
                if (!finalUserId && email) {
                    const userRes = await axiosInstance.get(`/user?email=${email}`);
                    finalUserId = userRes.data.user?._id;
                }

                if (!finalUserId) {
                    throw new Error('User profile not found. Please log in again.');
                }

                const walletResponse = await axiosInstance.post('/payments/wallet', {
                    shipmentId: shipmentId,
                    userId: finalUserId
                });

                if (walletResponse.status === 200) {
                    sessionStorage.setItem('pendingPayment', shipmentId);
                    navigate('/payment/success', {
                        state: {
                            amount: totalAmount,
                            method: 'ewallet',
                            paymentId: walletResponse.data.transactionId
                        }
                    });
                    toast.success('Payment successful via E-Wallet');
                }
            } catch (error) {
                console.error('Wallet payment error:', error);
                toast.error(error.response?.data?.message || 'Wallet payment failed.');
            } finally {
                setProcessing(false);
            }
        }
    };

    if (!shipmentData) return null;

    return (
        <div className="min-vh-100 d-flex flex-column flex-lg-row bg-white overflow-hidden font-sans">
            {/* Left Panel - Premium Summary */}
            <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center p-5 text-white position-relative"
                style={{
                    background: '#0f172a', // Brand Dark
                    zIndex: 1
                }}
            >
                {/* Abstract Background Shapes */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', opacity: 0.1 }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: '#fabb05', filter: 'blur(80px)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: '#ffffff', filter: 'blur(80px)' }}></div>
                </div>

                <div className="w-100 max-width-500 position-relative z-2">
                    <div className="mb-5 text-center">
                        <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle mb-4 shadow-lg border border-secondary border-opacity-25"
                            style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)' }}>
                            <i className="bi bi-bag-check-fill fs-1 text-yellow"></i>
                        </div>
                        <h6 className="text-uppercase tracking-widest text-secondary mb-2" style={{ fontSize: '0.75rem', letterSpacing: '3px' }}>Total Payable</h6>
                        <h1 className="display-3 fw-bold text-white mb-0">R{totalAmount?.toFixed(2) || '0.00'}</h1>
                    </div>

                    {/* Summary Card - Fixed Visibility */}
                    <div className="rounded-4 p-4 mb-4 backdrop-blur shadow-lg border border-white border-opacity-10"
                        style={{ background: 'rgba(255,255,255,0.08)' }} // Dark glass background
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-white border-opacity-10">
                            <div className="d-flex align-items-center">
                                <div className="rounded-circle bg-yellow d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                    <i className="bi bi-box-seam text-dark font-small"></i>
                                </div>
                                <div className="text-start">
                                    <span className="d-block text-white-50 text-uppercase small" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Service Type</span>
                                    <span className="fw-bold fs-5 text-capitalize text-white">{shipmentData.parcelDetails?.serviceType}</span>
                                </div>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-6 text-start">
                                <span className="d-block text-white-50 text-uppercase small mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Parcel</span>
                                <span className="fw-bold text-capitalize d-block text-white">{shipmentData.parcelDetails?.parcelType.replace('-', ' ')}</span>
                            </div>
                            <div className="col-6 text-start">
                                <span className="d-block text-white-50 text-uppercase small mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Items</span>
                                <span className="fw-bold d-block text-white">{shipmentData.collectionDetails?.numberOfItems || 1}</span>
                            </div>
                            <div className="col-12 pt-3 mt-1 border-top border-white border-opacity-10 text-start">
                                <span className="d-block text-white-50 text-uppercase small mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>Route</span>
                                <div className="d-flex align-items-center text-white">
                                    <span className="fw-medium text-truncate" style={{ maxWidth: '40%' }}>{shipmentData.collectionDetails?.address?.city}</span>
                                    <i className="bi bi-arrow-right mx-2 text-yellow"></i>
                                    <span className="fw-medium text-truncate" style={{ maxWidth: '40%' }}>{shipmentData.deliveryDetails?.address?.city}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center text-white-50 small rounded-pill py-2 px-3 border border-white border-opacity-10 mx-auto"
                        style={{ width: 'fit-content', background: 'rgba(255,255,255,0.05)' }}>
                        <i className="bi bi-shield-lock-fill text-yellow me-2"></i>
                        Encrypted 256-bit SSL Payment
                    </div>
                </div>
            </div>

            {/* Right Panel - Selection */}
            <div className="col-lg-7 p-5 d-flex flex-column bg-white">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Secure Checkout</h2>
                        <p className="text-muted m-0">Choose how you'd like to pay</p>
                    </div>
                    <Button variant="link" onClick={() => navigate(-1)} className="text-decoration-none text-muted fw-bold d-flex align-items-center px-0 hover-opacity-75">
                        <i className="bi bi-arrow-left me-2"></i> Back
                    </Button>
                </div>

                <div className="row g-4 mb-auto">
                    {paymentMethods.map((method) => {
                        const isSelected = selectedMethod === method.id;
                        return (
                            <div key={method.id} className="col-12">
                                <div
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`p-4 rounded-4 position-relative cursor-pointer transition-all ${isSelected ? 'active-method-card' : 'method-card'}`}
                                    style={{
                                        border: isSelected ? '2px solid #fabb05' : '1px solid #f1f5f9',
                                        background: '#fff',
                                        boxShadow: isSelected ? '0 10px 30px rgba(250, 187, 5, 0.15)' : 'none',
                                        transform: isSelected ? 'translateY(-2px)' : 'none',
                                    }}
                                >
                                    <div className="d-flex align-items-center">
                                        <div className={`rounded-circle d-flex align-items-center justify-content-center p-3 me-4 transition-all`}
                                            style={{
                                                width: '64px', height: '64px', fontSize: '24px',
                                                background: isSelected ? '#fabb05' : '#f8fafc',
                                                color: isSelected ? '#1e293b' : '#64748b' // Darker slate gray instead of blue-gray
                                            }}
                                        >
                                            <i className={`bi ${method.icon}`}></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h5 className="fw-bold mb-0" style={{ color: isSelected ? '#0f172a' : '#334155' }}>
                                                    {method.name}
                                                </h5>
                                                {/* Premium Checkmark */}
                                                {isSelected && (
                                                    <div className="d-flex align-items-center justify-content-center bg-yellow rounded-circle text-dark" style={{ width: '24px', height: '24px' }}>
                                                        <i className="bi bi-check-lg small fw-bold"></i>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="mb-0 small" style={{ color: '#64748b' }}>{method.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-5 pt-4 border-top border-light">
                    <Button
                        onClick={handleConfirm}
                        disabled={processing || !selectedMethod}
                        size="lg"
                        className="w-100 rounded-pill py-3 fw-bold fs-5 shadow-lg border-0 d-flex align-items-center justify-content-center btn-hover-lift position-relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(45deg, #fabb05, #eab308)',
                            color: '#0f172a',
                            opacity: (processing || !selectedMethod) ? 0.7 : 1,
                        }}
                    >
                        {processing ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Processing Payment...
                            </>
                        ) : (
                            <>
                                {selectedMethod === 'cod' ? 'Confirm Order' : `Pay R${totalAmount?.toFixed(2)}`}
                                <i className="bi bi-shield-lock-fill ms-3 opacity-50"></i>
                            </>
                        )}
                    </Button>

                    {/* Redesigned Security Badge */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="d-inline-flex align-items-center justify-content-center px-4 py-2 bg-light rounded-pill border border-light-subtle">
                            <i className="bi bi-lock-fill text-success me-2"></i>
                            <span className="text-muted small fw-medium text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                Payments are 100% Secure & Encrypted
                            </span>
                        </div>
                    </div>
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

            <style>{`
                .cursor-pointer { cursor: pointer; }
                .transition-all { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .text-yellow { color: #fabb05 !important; }
                .bg-yellow { background-color: #fabb05 !important; }
                .backdrop-blur { backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }

                .method-card:hover {
                    border-color: #cbd5e1 !important;
                    background: #f8fafc !important;
                    transform: translateY(-2px);
                }

                .btn-hover-lift {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .btn-hover-lift:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(250, 187, 5, 0.4) !important;
                }
                .hover-opacity-75:hover { opacity: 0.75; }
            `}</style>
        </div>
    );
};

export default PaymentSelectionPage;
