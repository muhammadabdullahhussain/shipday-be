import React, { useState, useEffect } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import CreateShipmentFormRedesigned from '../../components/CreateShipmentFormRedesigned';
import { useNavigate } from 'react-router-dom';

export default function SendParcel() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleShipmentSubmit = (data) => {

        // The redirection happens inside TermsAndPaymentStep.jsx
    };

    return (
        <div className="font-sans bg-light min-vh-100 position-relative overflow-hidden">
            {/* Background Decoration */}
            <div className="position-absolute top-0 start-0 w-100 h-50 bg-dark" style={{ borderBottomRightRadius: '100px', borderBottomLeftRadius: '0px' }}>
                <div className="position-absolute w-100 h-100 opacity-20"
                    style={{ background: 'radial-gradient(circle at 10% 20%, #fabb05 0%, transparent 20%)' }}></div>
            </div>

            <div className={`main-content-reveal position-relative z-1 ${isLoaded ? 'active' : ''}`}>
                <Container className="py-5">
                    {/* Header Section */}
                    <div className="text-center mb-5 pt-4">
                        <Badge bg="warning" className="text-dark mb-3 px-3 py-2 fw-black tracking-widest shadow-lg">
                            <i className="bi bi-box-seam-fill me-2"></i>
                            PRICING
                        </Badge>
                        <h1 className="display-3 fw-black text-white mb-2">
                            Ship <span className="text-yellow">Anything,</span> Anywhere.
                        </h1>
                        <p className="lead text-white-50 mx-auto" style={{ maxWidth: '600px' }}>
                            Get an instant price estimate and book your delivery in under 60 seconds with our smart portal.
                        </p>
                    </div>

                    {/* Main Form Card */}
                    <Card className="border-0 shadow-2xl rounded-5 overflow-hidden fade-in-up glass-card-container"
                        style={{ animationDelay: '0.2s', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)' }}>
                        <Card.Body className="p-0">
                            {/* Uses the existing logic but wrapped in premium container */}
                            <CreateShipmentFormRedesigned
                                onSubmit={handleShipmentSubmit}
                                onCancel={() => navigate('/')}
                                loading={loading}
                                isPublic={true}
                            />
                        </Card.Body>
                    </Card>

                    {/* Trust Signals Footer */}
                    <div className="d-flex justify-content-center gap-4 mt-5 text-muted small opacity-75">
                        <div className="d-flex align-items-center"><i className="bi bi-lock-fill me-2"></i> SSL Encrypted</div>
                        <div className="d-flex align-items-center"><i className="bi bi-shield-check-fill me-2"></i> Insured</div>
                        <div className="d-flex align-items-center"><i className="bi bi-credit-card-fill me-2"></i> Secure Payment</div>
                    </div>
                </Container>
            </div>

            <style>{`
                .main-content-reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; }
                .main-content-reveal.active { opacity: 1; transform: translateY(0); }
                .fw-black { font-weight: 900; }
                .tracking-widest { letter-spacing: 0.2em; }
                .text-yellow { color: #fabb05; }
                .bg-yellow { background-color: #fabb05; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
                
                /* Custom scrollbar for the form if needed */
                .glass-card-container::-webkit-scrollbar {
                    width: 8px;
                }
                .glass-card-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                .glass-card-container::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
