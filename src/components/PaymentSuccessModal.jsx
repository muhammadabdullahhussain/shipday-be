import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Confetti from 'react-confetti';

const PaymentSuccessModal = ({ show, onClose, paymentData }) => {
    return (
        <>
            {show && <Confetti numberOfPieces={300} recycle={false} />}

            <Modal
                show={show}
                onHide={onClose}
                centered
                size="lg"
                backdrop="static"
            >
                <Modal.Body className="text-center p-5">
                    {/* Success Icon with Animation */}
                    <div className="mb-4">
                        <div
                            className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: '120px',
                                height: '120px',
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                animation: 'successPulse 1s ease-out'
                            }}
                        >
                            <i className="bi bi-check2-circle text-white" style={{ fontSize: '70px' }}></i>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="fw-bold mb-2" style={{ color: '#11998e', fontSize: '32px' }}>
                        Payment Successful! 🎊
                    </h1>
                    <p className="text-muted mb-4" style={{ fontSize: '18px' }}>
                        Your payment has been processed successfully
                    </p>

                    {/* Payment Details Card */}
                    <div
                        className="p-4 rounded mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
                            border: '2px solid #11998e'
                        }}
                    >
                        <div className="row text-start">
                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block mb-1">Transaction ID</small>
                                <strong style={{ color: '#11998e', fontSize: '16px', fontFamily: 'monospace' }}>
                                    {paymentData?.transactionId || 'TXN-XXXX-XXXX'}
                                </strong>
                            </div>
                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block mb-1">Payment Method</small>
                                <strong>PayFast Gateway</strong>
                            </div>
                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block mb-1">Date & Time</small>
                                <strong>{new Date().toLocaleString()}</strong>
                            </div>
                            <div className="col-md-6 mb-3">
                                <small className="text-muted d-block mb-1">Status</small>
                                <span className="badge bg-success px-3 py-2">
                                    <i className="bi bi-check-circle me-1"></i>
                                    Completed
                                </span>
                            </div>
                            <div className="col-12 mt-2">
                                <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ background: 'white' }}>
                                    <div>
                                        <small className="text-muted d-block">Amount Paid</small>
                                        <h3 className="mb-0 fw-bold" style={{ color: '#11998e' }}>
                                            R{paymentData?.amount?.toFixed(2) || '0.00'}
                                        </h3>
                                    </div>
                                    <i className="bi bi-cash-coin" style={{ fontSize: '40px', color: '#11998e' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipment Info */}
                    {paymentData?.shipmentId && (
                        <div className="alert alert-success mb-4">
                            <i className="bi bi-box-seam me-2"></i>
                            <strong>Shipment ID:</strong> {paymentData.shipmentId}
                            <br />
                            <small>Your shipment is now being processed and will be dispatched soon.</small>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                        <Button
                            variant="outline-success"
                            onClick={() => window.print()}
                            className="px-4"
                        >
                            <i className="bi bi-download me-2"></i>
                            Download Receipt
                        </Button>
                        <Button
                            variant="success"
                            onClick={onClose}
                            className="px-4"
                            style={{
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                border: 'none'
                            }}
                        >
                            <i className="bi bi-house me-2"></i>
                            Back to Dashboard
                        </Button>
                    </div>

                    {/* Email Notification */}
                    <p className="text-muted mt-4 mb-0" style={{ fontSize: '14px' }}>
                        <i className="bi bi-envelope me-1"></i>
                        A confirmation email has been sent to your registered email address
                    </p>
                </Modal.Body>
            </Modal>

            <style>{`
        @keyframes successPulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
            <style>{`
                .modal-backdrop.show {
                    backdrop-filter: blur(8px);
                    background-color: rgba(15, 23, 42, 0.6) !important;
                }
            `}</style>
        </>
    );
};

export default PaymentSuccessModal;
