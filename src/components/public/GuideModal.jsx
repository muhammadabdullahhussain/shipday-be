import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const GuideModal = ({ show, onHide }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            contentClassName="border-0 rounded-4 overflow-hidden shadow-2xl"
        >
            <div className="position-relative">
                {/* Header Decoration */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-5"
                    style={{
                        backgroundImage: 'radial-gradient(#fabb05 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        zIndex: 0
                    }}
                ></div>

                <Modal.Header
                    closeButton
                    className="border-0 p-4 position-relative z-1"
                    style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
                >
                    <Modal.Title className="text-white fw-black d-flex align-items-center">
                        <div className="bg-yellow rounded-3 p-2 me-3 shadow-glow">
                            <i className="bi bi-journal-check text-dark fs-4"></i>
                        </div>
                        SHIPDAY SHIPPING GUIDE
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-5 text-center position-relative z-1 bg-white">
                    <div className="mb-4">
                        <i className="bi bi-clock-history display-1 text-yellow opacity-75"></i>
                    </div>

                    <h2 className="fw-black text-dark mb-3">Refining Excellence</h2>
                    <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '500px' }}>
                        Our courier specialists are currently updating the ShipDay Shipping Guide to include the latest international standards and South African regulations.
                    </p>

                    <div className="p-4 rounded-4 bg-light border-start border-4 border-yellow mb-5 text-start">
                        <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-stars text-yellow me-2"></i>
                            <span className="fw-bold text-dark">What's coming in v2.0:</span>
                        </div>
                        <ul className="list-unstyled mb-0 text-muted small">
                            <li className="mb-2">• Optimized Volumetric Weight masterclass</li>
                            <li className="mb-2">• Fragile cargo handling with military-grade GPS</li>
                            <li className="mb-2">• Regional hub crossing protocols (Gauteng, KZN, Western Cape)</li>
                        </ul>
                    </div>

                    <div className="d-grid">
                        <Button
                            variant="dark"
                            className="rounded-pill py-3 fw-bold transition-all hover-lift"
                            onClick={onHide}
                        >
                            Got it, thanks!
                        </Button>
                    </div>
                </Modal.Body>

                <div className="bg-light p-3 text-center border-top">
                    <small className="text-muted fw-bold tracking-widest text-uppercase" style={{ fontSize: '0.65rem' }}>
                        Professional Logistics Infrastructure • 2026
                    </small>
                </div>
            </div>

            <style jsx="true">{`
                .fw-black { font-weight: 900 !important; }
                .text-yellow { color: #fabb05 !important; }
                .bg-yellow { background-color: #fabb05 !important; }
                .shadow-glow { box-shadow: 0 0 15px rgba(250, 187, 5, 0.4); }
                .hover-lift:hover { transform: translateY(-3px); }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </Modal>
    );
};

export default GuideModal;
