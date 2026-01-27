import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Confetti from 'react-confetti';

const OrderConfirmationModal = ({ show, onClose, shipmentData }) => {
    return (
        <>
            {show && <Confetti numberOfPieces={200} recycle={false} colors={['#fabb05', '#fbbf24', '#0f172a']} />}

            <Modal
                show={show}
                onHide={onClose}
                centered
                size="lg"
                backdrop="static"
                contentClassName="border-0 rounded-4 shadow-lg overflow-hidden"
            >
                <Modal.Body className="text-center p-0">
                    <div className="d-flex flex-column flex-lg-row">
                        {/* Left Side (Visual) - Hide on print */}
                        <div className="col-lg-5 p-5 text-white d-flex flex-column justify-content-center align-items-center position-relative d-print-none"
                            style={{ background: '#0f172a' }}
                        >
                            <div className="mb-4 position-relative z-2">
                                <div
                                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        background: '#fabb05',
                                        color: '#0f172a',
                                        animation: 'scaleIn 0.5s ease-out',
                                        boxShadow: '0 0 40px rgba(250, 187, 5, 0.3)'
                                    }}
                                >
                                    <i className="bi bi-check-lg" style={{ fontSize: '50px' }}></i>
                                </div>
                            </div>
                            <h3 className="fw-bold mb-2">Order Confirmed!</h3>
                            <p className="text-white-50 mb-0">Your shipment has been successfully created.</p>

                            {/* Abstract Decorative Circles */}
                            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
                            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(250,187,5,0.05)' }}></div>
                        </div>

                        {/* Right Side (Details) */}
                        <div className="col-lg-7 p-5 bg-white text-start">
                            {/* Print Header */}
                            <div className="d-none d-print-block text-center mb-5">
                                <h2 className="fw-bold mb-1" style={{ color: '#0f172a' }}>ShipDay Logistics</h2>
                                <p className="text-muted small">Official Transaction Receipt</p>
                                <div style={{ borderBottom: '2px dashed #cbd5e1', margin: '20px 0' }}></div>
                            </div>

                            <h5 className="fw-bold text-dark mb-4 fa-2x d-print-none">Shipment Details</h5>

                            <div
                                className="p-4 rounded-3 mb-4 receipt-card"
                                style={{
                                    background: '#f8fafc',
                                    border: '1px dashed #cbd5e1',
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary border-opacity-10">
                                    <span className="text-secondary small text-uppercase">Tracking ID</span>
                                    <span className="fw-bold text-dark font-monospace">
                                        {shipmentData?.shipmentId || 'Generating...'}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-secondary small">From</span>
                                    <span className="fw-medium text-dark text-truncate" style={{ maxWidth: '150px' }}>{shipmentData?.from || 'N/A'}</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-secondary small">To</span>
                                    <span className="fw-medium text-dark text-truncate" style={{ maxWidth: '150px' }}>{shipmentData?.to || 'N/A'}</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2 pt-2 border-top border-secondary border-opacity-10 mt-2">
                                    <span className="text-secondary small">Total Amount</span>
                                    <span className="fw-bold text-success fs-5">R{shipmentData?.amount?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>

                            {/* Info Message */}
                            <div className="alert alert-light border-0 bg-light-subtle mb-4 d-flex align-items-start d-print-none">
                                <i className="bi bi-info-circle-fill text-secondary me-2 mt-1"></i>
                                <small className="text-muted">Currently, please pay the driver or at the counter upon collection/delivery.</small>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-grid gap-2 d-print-none">
                                <Button
                                    variant="dark"
                                    onClick={() => window.print()}
                                    className="rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center"
                                    style={{ background: '#0f172a', border: 'none' }}
                                >
                                    <i className="bi bi-printer me-2"></i> Print Receipt
                                </Button>
                                <Button
                                    variant="link"
                                    onClick={onClose}
                                    className="text-decoration-none text-muted fw-bold"
                                >
                                    Done
                                </Button>
                            </div>

                            {/* Print Footer */}
                            <div className="d-none d-print-block text-center mt-5">
                                <p className="small text-muted mb-1">Thank you for choosing ShipDay</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
            <style>{`
                .modal-backdrop.show {
                    backdrop-filter: blur(5px);
                    background-color: rgba(15, 23, 42, 0.8) !important;
                }

                @media print {
                    /* Hide everything in the body */
                    body > * {
                        display: none !important;
                    }

                    /* But keep the modal visible and positioned to take over the page */
                    .modal {
                        display: block !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                        z-index: 9999 !important;
                        background: white !important;
                    }

                    .modal-dialog {
                        margin: 0 !important;
                        padding: 20px !important;
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    
                    .modal-content {
                        box-shadow: none !important;
                        border: none !important;
                    }

                    /* Hide specific elements */
                    .modal-backdrop, .btn-close, canvas {
                        display: none !important;
                    }
                    
                     /* Force Background Colors for Chrome */
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;

                    /* Ensure text is black for printing */
                    * {
                        color: black !important;
                    }
                    
                    /* Styling the Receipt Card for Print */
                    .receipt-card {
                        border: 2px dashed #000 !important;
                        background: #fff !important;
                    }
                }
            `}</style>
        </>
    );
};

export default OrderConfirmationModal;
