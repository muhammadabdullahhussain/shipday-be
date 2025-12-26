import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import CreateShipmentFormRedesigned from '../../components/CreateShipmentFormRedesigned';
import { useNavigate } from 'react-router-dom';

const SendParcel = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // This form component handles its own submission logic up to the payment step.
    // The payment step navigates to /payment/select with the data.
    // We just need to provide empty mocks if the component expects a direct submit handler for other cases,
    // though in this new flow, the form navigates away before calling this.
    const handleShipmentSubmit = (data) => {
        console.log("Public Shipment Data (Pre-Payment):", data);
        // The redirection happens inside TermsAndPaymentStep.jsx
    };

    return (
        <div className="py-5 bg-light min-vh-100">
            <Container>
                <div className="text-center mb-5 fade-in-down">
                    <h1 className="display-4 fw-bold text-dark">Send a Parcel</h1>
                    <p className="lead text-muted">Fast, reliable, and secure delivery to your doorstep.</p>
                </div>

                <Card className="border-0 shadow-lg rounded-4 overflow-hidden fade-in-up">
                    <Card.Body className="p-0">
                        {/* Passes isPublic={true} to trigger restricted payment options later */}
                        <CreateShipmentFormRedesigned
                            onSubmit={handleShipmentSubmit}
                            onCancel={() => navigate('/')}
                            loading={loading}
                            isPublic={true}
                        />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default SendParcel;
