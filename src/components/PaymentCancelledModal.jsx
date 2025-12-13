import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PaymentCancelledModal = ({ show, onClose, onRetry, errorMessage }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="lg"
            backdrop="static"
        >
            <Modal.Body className="text-center p-5">
                {/* Error Icon with Animation */}
                <div className="mb-4">
                    <div
                        className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                            animation: 'shake 0.5s ease-out'
                        }}
                    >
                        <i className="bi bi-x-circle text-white" style={{ fontSize: '70px' }}></i>
                    </div>
                </div>

                {/* Error Message */}
                <h2 className="fw-bold mb-2" style={{ color: '#ff6b6b' }}>
                    Payment Cancelled
                </h2>
                <p className="text-muted mb-4" style={{ fontSize: '16px' }}>
                    {errorMessage || 'Your payment was not completed. Please try again.'}
                </p>

                {/* Info Card */}
                <div
                    className="p-4 rounded mb-4 text-start"
                    style={{
                        background: 'linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)',
                        border: '2px solid #ff6b6b'
                    }}
                >
                    <h6 className="fw-bold mb-3" style={{ color: '#ff6b6b' }}>
                        <i className="bi bi-info-circle me-2"></i>
                        What happened?
                    </h6>
                    <ul className="mb-0" style={{ fontSize: '14px' }}>
                        <li className="mb-2">Payment was cancelled by you</li>
                        <li className="mb-2">Payment gateway session expired</li>
                        <li className="mb-2">Insufficient funds or payment declined</li>
                        <li>Network connectivity issues</li>
                    </ul>
                </div>

                {/* Helpful Tips */}
                <div className="alert alert-warning mb-4">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Tip:</strong> Make sure you have sufficient funds and a stable internet connection before retrying.
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Button
                        variant="outline-secondary"
                        onClick={onClose}
                        className="px-4"
                    >
                        <i className="bi bi-x me-2"></i>
                        Cancel Order
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onRetry}
                        className="px-4"
                        style={{
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                            border: 'none'
                        }}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Try Again
                    </Button>
                </div>

                {/* Support Contact */}
                <div className="mt-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
                    <p className="mb-1" style={{ fontSize: '14px' }}>
                        <strong>Need help?</strong>
                    </p>
                    <p className="mb-0 text-muted" style={{ fontSize: '13px' }}>
                        <i className="bi bi-telephone me-1"></i> +27 123 456 789
                        <span className="mx-2">|</span>
                        <i className="bi bi-envelope me-1"></i> support@swiftship.com
                    </p>
                </div>
            </Modal.Body>

            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
      `}</style>
        </Modal>
    );
};

export default PaymentCancelledModal;
