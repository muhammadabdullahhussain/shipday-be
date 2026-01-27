import React from 'react';
import { Container } from 'react-bootstrap';

const Terms = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            <section className="py-5 bg-light border-bottom">
                <Container className="py-5">
                    <h1 className="display-4 fw-black text-dark mb-3">Terms & <span className="text-yellow">Conditions</span></h1>
                    <p className="lead text-muted">Last updated: December 2024</p>
                </Container>
            </section>

            <Container className="py-5" style={{ maxWidth: '900px' }}>
                <div className="prose">
                    <h3 className="fw-bold mb-3">1. Acceptance of Terms</h3>
                    <p className="mb-4">By engaging ShipDay for courier services, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>

                    <h3 className="fw-bold mb-3">2. Service Description</h3>
                    <p className="mb-4">ShipDay provides logistics and courier solutions. Timelines are estimates unless explicitly guaranteed by a specific service tier.</p>

                    <h3 className="fw-bold mb-3">3. Liability & Insurance</h3>
                    <p className="mb-4">Our liability for lost or damaged goods is limited to standard coverage unless additional insurance is purchased. Indirect or consequential loss is excluded.</p>

                    <h3 className="fw-bold mb-3">4. Prohibited Items</h3>
                    <p className="mb-4">We do not transport illegal goods, hazardous materials, or items restricted by South African law.</p>

                    <h3 className="fw-bold mb-3">5. Payment</h3>
                    <p className="mb-4">All services must be paid for in accordance with the rates provided at the time of booking. Late payments may incur interest.</p>
                </div>
            </Container>
        </div>
    );
};

export default Terms;
