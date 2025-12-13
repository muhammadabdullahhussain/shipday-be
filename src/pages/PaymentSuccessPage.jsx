import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import '../styles/ui/PaymentSuccess.css';
import Button from '../components/ui/Button';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const paymentId = searchParams.get('payment_id'); // PayFast transaction ID likely
    const amount = searchParams.get('amount_gross') || searchParams.get('amount');
    const method = searchParams.get('method');

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isCod = method === 'cod' || method === 'ewallet';

    return (

        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{
            background: 'linear-gradient(135deg, #f0f4ff 0%, #eef2f5 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={300}
                    colors={['#10B981', '#34D399', '#6EE7B7', '#FBBF24']}
                />
            </div>

            <div className="card shadow-lg border-0 rounded-4" style={{
                width: '100%',
                maxWidth: '500px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                margin: '20px'
            }}>
                <div className="card-body p-5 text-center">
                    {/* Icon */}
                    <div className="mb-4">
                        <div className="mx-auto d-flex align-items-center justify-content-center rounded-circle" style={{
                            width: '90px',
                            height: '90px',
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            color: 'white',
                            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                        }}>
                            <i className="bi bi-check-lg" style={{ fontSize: '48px' }}></i>
                        </div>
                    </div>

                    <h2 className="fw-bold mb-2" style={{ color: '#065F46' }}>
                        {isCod ? 'Order Confirmed' : 'Payment Successful'}
                    </h2>
                    <p className="text-muted mb-4">
                        {isCod
                            ? 'Your order has been placed successfully.'
                            : 'Thank you! Your transaction has been completed.'}
                    </p>

                    {/* Details Card */}
                    <div className="bg-light rounded-3 p-4 mb-4 text-start border border-light">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-secondary small">Status</span>
                            <span className="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded-pill">
                                {isCod ? 'Placed' : 'Paid'}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-secondary small">Date</span>
                            <span className="fw-medium text-dark">{new Date().toLocaleDateString()}</span>
                        </div>
                        {(paymentId || isCod) && (
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary small">Reference</span>
                                <span className="fw-medium text-dark font-monospace">{paymentId || 'Pending'}</span>
                            </div>
                        )}
                        {amount && (
                            <div className="d-flex justify-content-between pt-3 mt-2 border-top">
                                <span className="fw-bold text-dark">Total Amount</span>
                                <span className="fw-bold text-success fs-5">R{amount}</span>
                            </div>
                        )}
                    </div>

                    <div className="d-grid gap-3">
                        <Button
                            onClick={() => navigate('/dashboard/shipments')}
                            variant="primary"
                            className="btn-lg rounded-3 fw-bold border-0"
                            style={{
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                            }}
                        >
                            View Shipments
                        </Button>
                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="outline-secondary"
                            className="btn-lg rounded-3 fw-medium"
                            style={{ border: '2px solid #e5e7eb', color: '#6b7280' }}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
