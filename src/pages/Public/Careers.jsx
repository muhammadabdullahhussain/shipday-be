import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

const Careers = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            <section className="py-5 bg-light position-relative">
                <Container className="py-5 text-center">
                    <Badge bg="dark" className="text-warning mb-3 px-3 py-2 fw-black tracking-widest">JOIN THE FLEET</Badge>
                    <h1 className="display-3 fw-black text-dark mb-4">Build the future of <span className="text-yellow">delivery.</span></h1>
                    <p className="lead text-muted mx-auto max-width-800">
                        We're always looking for driven individuals to join our growing team of logistics experts, developers, and fleet commanders.
                    </p>
                </Container>
            </section>

            <Container className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold mb-3">Open Positions</h2>
                    <p className="text-muted">Find your role in our mission.</p>
                </div>

                <Row className="g-4 justify-content-center">
                    {[
                        { title: 'Fleet Manager', loc: 'Johannesburg', type: 'Full-time' },
                        { title: 'Logistics Coordinator', loc: 'Cape Town', type: 'Full-time' },
                        { title: 'Backend Developer', loc: 'Remote', type: 'Contract' }
                    ].map((job, i) => (
                        <Col md={10} key={i}>
                            <Card className="border-0 shadow-sm rounded-4 hover-lift transition-all">
                                <Card.Body className="p-4 d-md-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 className="fw-bold text-dark mb-1">{job.title}</h4>
                                        <div className="d-flex gap-3 text-muted small">
                                            <span><i className="bi bi-geo-alt-fill text-yellow me-1"></i> {job.loc}</span>
                                            <span><i className="bi bi-clock-fill text-yellow me-1"></i> {job.type}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline-dark" className="rounded-pill px-4 mt-3 mt-md-0 fw-bold">Apply Now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Careers;
