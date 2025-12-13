import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Confetti from 'react-confetti';

const OrderConfirmationModal = ({ show, onClose, shipmentData }) => {
    return (
        <>
            {show && <Confetti numberOfPieces={200} recycle={false} />}

            <Modal
                show={show}
                onHide={onClose}
                centered
                size="lg"
                backdrop="static"
            >
                <Modal.Body className="text-center p-5">
                    {/* Print Header */}
                    <div className="d-none d-print-block text-center mb-5">
                        <h2 className="fw-bold mb-1" style={{ color: '#1e293b' }}>SwiftShip Logistics</h2>
                        <p className="text-muted small">Official Transaction Receipt</p>
                        <div style={{ borderBottom: '2px dashed #cbd5e1', margin: '20px 0' }}></div>
                    </div>

                    {/* Success Icon (Hide on print) */}
                    <div className="mb-4 d-print-none">
                        <div
                            className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                                width: '100px',
                                height: '100px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                animation: 'scaleIn 0.5s ease-out'
                            }}
                        >
                            <i className="bi bi-check-lg text-white" style={{ fontSize: '60px' }}></i>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h2 className="fw-bold mb-3 d-print-none" style={{ color: '#667eea' }}>
                        Order Confirmed! 🎉
                    </h2>
                    <p className="text-muted mb-4 d-print-none" style={{ fontSize: '16px' }}>
                        Your shipment has been successfully created and is ready for processing.
                    </p>

                    {/* Shipment Details Card */}
                    <div
                        className="p-4 rounded-3 mb-4 text-start receipt-card"
                        style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                            <span className="text-secondary">Shipment ID</span>
                            <span className="fw-bold text-primary font-monospace">
                                {shipmentData?.shipmentId || 'Generating...'}
                            </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary">From</span>
                            <span className="fw-medium text-dark text-end">{shipmentData?.from || 'N/A'}</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary">To</span>
                            <span className="fw-medium text-dark text-end">{shipmentData?.to || 'N/A'}</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-secondary">Date</span>
                            <span className="fw-medium text-dark text-end">{new Date().toLocaleDateString()}</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                            <span className="fw-bold text-dark">Total Amount</span>
                            <span className="fw-bold fs-4 text-success">
                                R{shipmentData?.amount?.toFixed(2) || '0.00'}
                            </span>
                        </div>
                    </div>

                    {/* Print Footer */}
                    <div className="d-none d-print-block text-center mt-5">
                        <p className="small text-muted mb-1">Thank you for choosing SwiftShip</p>
                        <p className="small text-muted">www.swiftship.com</p>
                    </div>

                    {/* Info Message */}
                    <div className="alert alert-info mb-4 d-print-none">
                        <i className="bi bi-info-circle me-2"></i>
                        Please have the exact amount ready when the driver arrives for delivery.
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-3 justify-content-center d-print-none">
                        <Button
                            variant="outline-primary"
                            onClick={onClose}
                            className="px-4"
                        >
                            <i className="bi bi-house me-2"></i>
                            Back to Dashboard
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => window.print()}
                            className="px-4"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none'
                            }}
                        >
                            <i className="bi bi-printer me-2"></i>
                            Print Receipt
                        </Button>
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
                    backdrop-filter: blur(8px);
                    background-color: rgba(15, 23, 42, 0.6) !important;
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
                        border: none !important;
                        box-shadow: none !important;
                    }

                    /* Hide specific elements */
                    .modal-backdrop, .btn-close, canvas {
                        display: none !important;
                    }

                    /* Ensure text is black for printing */
                    * {
                        color: black !important;
                    }
                    
                    /* Styling the Receipt Card for Print */
                    .receipt-card {
                        border: 2px solid #000 !important;
                        background: #fff !important;
                    }
                }
            `}</style>
        </>
    );
};

export default OrderConfirmationModal;
