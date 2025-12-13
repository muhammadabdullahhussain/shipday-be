import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ui/PaymentSuccess.css';
import Button from '../components/ui/Button';

const PaymentCancelPage = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{
            background: 'linear-gradient(135deg, #fff1f2 0%, #fff5f5 100%)',
            position: 'relative'
        }}>
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
                            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                            color: 'white',
                            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)'
                        }}>
                            <i className="bi bi-x-lg" style={{ fontSize: '40px' }}></i>
                        </div>
                    </div>

                    <h2 className="fw-bold mb-2" style={{ color: '#991B1B' }}>
                        Payment Cancelled
                    </h2>
                    <p className="text-muted mb-4">
                        The payment process was cancelled or failed. Your shipment has been saved as a draft.
                    </p>

                    <div className="d-grid gap-3">
                        <Button
                            onClick={() => navigate('/dashboard/shipments')}
                            variant="primary"
                            className="btn-lg rounded-3 fw-bold border-0"
                            style={{
                                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                            }}
                        >
                            Try Again
                        </Button>
                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="outline-secondary"
                            className="btn-lg rounded-3 fw-medium"
                            style={{ border: '2px solid #e5e7eb', color: '#6b7280' }}
                        >
                            Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelPage;
