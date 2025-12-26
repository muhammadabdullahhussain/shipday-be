import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Services = () => {
    // Pastel colors for dashboard match
    const services = [
        { title: 'Same Day', icon: 'bi-lightning-fill', price: 'R85', desc: 'Urgent delivery within 24h', bg: '#ffEdd5', color: '#ea580c' },
        { title: 'Overnight', icon: 'bi-moon-fill', price: 'R65', desc: 'Next business day by 10am', bg: '#f3e8ff', color: '#7c3aed' },
        { title: 'Economy', icon: 'bi-truck', price: 'R45', desc: 'Standard road freight (48-72h)', bg: '#dbeafe', color: '#2563eb' },
        { title: 'Warehousing', icon: 'bi-building-fill', price: 'Custom', desc: 'Secure storage & fulfillment', bg: '#fee2e2', color: '#dc2626' },
        { title: 'Global', icon: 'bi-airplane-fill', price: 'Custom', desc: 'International shipping', bg: '#dcfce7', color: '#16a34a' },
        { title: 'Freight', icon: 'bi-box-seam-fill', price: 'Custom', desc: 'Bulk & heavy cargo', bg: '#ffr1fa', color: '#db2777' },
    ];

    return (
        <div className="font-sans bg-white min-vh-100 pt-5">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 mb-3">Our Services</h1>
                    <p className="text-muted lead" style={{ fontSize: '1.1rem' }}>
                        Flexible logistics solutions tailored to your needs.
                    </p>
                </div>

                <Row className="g-4">
                    {services.map((svc, idx) => (
                        <Col lg={4} md={6} key={idx} className="fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <Card className="h-100 border-0 rounded-4 shadow-sm hover-shadow bg-white transition-all p-2">
                                <Card.Body className="p-4 d-flex flex-column align-items-center text-center">
                                    <div className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                                        style={{ width: '64px', height: '64px', backgroundColor: svc.bg }}>
                                        <i className={`bi ${svc.icon} fs-3`} style={{ color: svc.color }}></i>
                                    </div>
                                    <h4 className="fw-bold mb-2 h5">{svc.title}</h4>
                                    <p className="text-muted small mb-3">{svc.desc}</p>
                                    <h5 className="fw-bold text-dark mb-4">{svc.price}</h5>

                                    <Button as={Link} to="/register" variant="outline-dark" className="rounded-pill px-4 w-100 mt-auto fw-bold hover-purple" style={{ fontSize: '0.9rem', borderColor: '#e5e7eb' }}>
                                        Select Service
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Services;
