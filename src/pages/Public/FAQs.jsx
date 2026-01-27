import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQs = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            <section className="py-5 bg-dark text-white">
                <Container className="py-5 text-center">
                    <h1 className="display-4 fw-black mb-3">Frequently Asked <span className="text-yellow">Questions</span></h1>
                    <p className="lead text-white-50">Support center and common queries</p>
                </Container>
            </section>

            <Container className="py-5" style={{ maxWidth: '800px' }}>
                <Accordion defaultActiveKey="0" className="shadow-lg rounded-3 overflow-hidden">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>How do I track my parcel?</Accordion.Header>
                        <Accordion.Body>
                            You can track your parcel by entering your unique waybill number (e.g., SD-2024-XXXX) on our homepage or tracking page. Real-time updates are available 24/7.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>What are your delivery times?</Accordion.Header>
                        <Accordion.Body>
                            Standard delivery takes 1-3 business days depending on the destination. Express delivery guarantees next-day delivery for major metropolitan areas.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Do you offer insurance?</Accordion.Header>
                        <Accordion.Body>
                            Yes, all shipments include basic liability cover. Additional comprehensive insurance can be added during the booking process for high-value items.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>How do I open a business account?</Accordion.Header>
                        <Accordion.Body>
                            Contact our sales team via the Contact page or email support@shipday.co.za to discuss enterprise solutions and volume discounts.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </div>
    );
};

export default FAQs;
