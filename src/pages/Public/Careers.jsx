import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const Careers = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            <section className="py-5 bg-light position-relative">
                <Container className="py-5 text-center">
                    <Badge bg="dark" className="text-warning mb-3 px-3 py-2 fw-black tracking-widest">JOIN THE FLEET</Badge>
                    <h1 className="display-3 fw-black text-dark mb-4">Careers & <span className="text-yellow">Partnerships.</span></h1>
                    <p className="lead text-muted mx-auto max-width-800">
                        At Shipday South Africa, we are constantly looking to grow our network of talented professionals and trusted partners. Whether you are an individual seeking a rewarding career in logistics or a courier company interested in strategic partnerships, we welcome your application.
                    </p>
                </Container>
            </section>

            <Container className="py-5">
                <Row className="g-5">
                    <Col lg={6}>
                        <div className="pe-lg-4">
                            <h2 className="fw-black text-dark mb-4">Career Opportunities</h2>
                            <p className="text-muted mb-4">
                                We offer dynamic roles across courier operations, logistics management, customer service, and administrative support. Join a team committed to innovation, efficiency, and excellence in delivery services.
                            </p>
                            <h2 className="fw-black text-dark mb-4 mt-5">Partnership Opportunities</h2>
                            <p className="text-muted mb-4">
                                Shipday South Africa partners with courier companies experiencing parcel overflow and smaller operators looking to expand their reach. Through collaboration, we help our partners optimize delivery capacity and provide nationwide coverage.
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Card className="border-0 shadow-lg rounded-4 p-4 bg-dark text-white">
                            <Card.Body>
                                <h3 className="fw-bold mb-4">Apply Today</h3>
                                <p className="text-white-50 mb-4">
                                    If you are passionate about logistics and want to contribute to a growing, forward-thinking company, please send your career application or partnership inquiry to:
                                </p>
                                <div className="d-flex align-items-center p-3 rounded-3 mb-4" style={{ backgroundColor: 'rgba(250, 187, 5, 0.1)', border: '1px solid rgba(250, 187, 5, 0.2)' }}>
                                    <i className="bi bi-envelope-at fs-3 text-yellow me-3"></i>
                                    <div>
                                        <div className="small text-white-50">Send your inquiry to:</div>
                                        <a href="mailto:business@shipday.co.za" className="fw-bold text-yellow text-decoration-none fs-5">business@shipday.co.za</a>
                                    </div>
                                </div>
                                <p className="small text-white-50">
                                    We look forward to exploring opportunities with you and building a stronger delivery network across South Africa.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Careers;
