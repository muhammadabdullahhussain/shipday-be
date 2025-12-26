import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Contact = () => {
    return (
        <div className="font-sans bg-light min-vh-100">
            {/* Header */}
            <div className="bg-white py-5 border-bottom">
                <Container className="text-center py-4">
                    <h1 className="fw-bold mb-2">Contact Us</h1>
                    <p className="text-muted">We’re here to help with any questions or support.</p>
                </Container>
            </div>

            <Container className="py-5">
                <Row className="g-5 justify-content-center">
                    {/* Contact Info Side */}
                    <Col lg={4} className="fade-in-up">
                        <div className="d-flex flex-column gap-4">
                            <Card className="border-0 shadow-sm rounded-4 p-3 hover-shadow transition-all bg-white">
                                <Card.Body className="d-flex align-items-center">
                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div>
                                        <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Head Office</small>
                                        <p className="mb-0 fw-bold text-dark">123 Logistics Park, JHB</p>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 shadow-sm rounded-4 p-3 hover-shadow transition-all bg-white">
                                <Card.Body className="d-flex align-items-center">
                                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                        <i className="bi bi-whatsapp"></i>
                                    </div>
                                    <div>
                                        <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>WhatsApp Support</small>
                                        <p className="mb-0 fw-bold text-dark">065 555 3333</p>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 shadow-sm rounded-4 p-3 hover-shadow transition-all bg-white">
                                <Card.Body className="d-flex align-items-center">
                                    <div className="bg-warning bg-opacity-10 text-dark rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: '#fef3c7' }}>
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>
                                    <div>
                                        <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Email Us</small>
                                        <p className="mb-0 fw-bold text-dark">support@shipday.co.za</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    {/* Form Side */}
                    <Col lg={7} className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Card className="border-0 shadow-sm rounded-4 bg-white h-100">
                            <Card.Body className="p-5">
                                <h4 className="fw-bold mb-4">Send a message</h4>
                                <Form>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Control className="bg-light border-0 rounded-3 px-3 py-3" placeholder="Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Control type="email" className="bg-light border-0 rounded-3 px-3 py-3" placeholder="Email" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Control className="bg-light border-0 rounded-3 px-3 py-3" placeholder="Subject" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Control as="textarea" rows={5} className="bg-light border-0 rounded-3 px-3 py-3" placeholder="How can we help?" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Button variant="dark" size="lg" className="rounded-pill px-5 py-3 fw-bold w-100">
                                                Send Message
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Contact;
