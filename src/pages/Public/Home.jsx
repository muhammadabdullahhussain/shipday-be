import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="font-sans bg-white pb-5">
            {/* Hero Section */}
            <section className="position-relative py-5 d-flex align-items-center" style={{ minHeight: '85vh' }}>
                {/* Background Decoration */}
                <div className="position-absolute top-0 end-0 h-100 w-25 bg-light d-none d-lg-block" style={{ borderBottomLeftRadius: '100px' }}></div>

                <Container className="position-relative z-2">
                    <Row className="align-items-center g-5">
                        {/* Left: Text Content */}
                        <Col lg={6} className="fade-in-up">
                            <h1 className="display-3 fw-bold mb-4 ls-tight text-dark" style={{ lineHeight: '1.2' }}>
                                Logistics made <br />
                                <span className="text-purple text-decoration-underline" style={{ textDecorationColor: '#d8b4fe' }}>simple today.</span>
                            </h1>
                            <p className="lead text-muted mb-5 pe-lg-5" style={{ fontSize: '1.2rem', fontWeight: '400' }}>
                                ShipDay provides the fastest, most reliable delivery network in South Africa.
                                Send locally or nationally with just a few clicks.
                            </p>

                            <div className="d-flex gap-3">
                                <Button as={Link} to="/register" className="btn-purple px-5 py-3 rounded-pill fw-bold shadow-lg" size="lg">
                                    Start Shipping
                                </Button>
                                <Button as={Link} to="/tracking" variant="link" size="lg" className="px-4 py-3 fw-bold text-dark text-decoration-none">
                                    Track Parcel <i className="bi bi-arrow-right ms-2 text-purple"></i>
                                </Button>
                            </div>

                            <div className="mt-5 d-flex align-items-center gap-4 text-muted small">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i> No Hidden Fees
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i> Real-time Tracking
                                </div>
                            </div>
                        </Col>

                        {/* Right: Mockup Card (Purple/Dashboard Style) */}
                        <Col lg={6} className="fade-in-up ps-lg-5" style={{ animationDelay: '0.2s' }}>
                            <div className="position-relative">
                                {/* Main Card */}
                                <Card className="border-0 shadow-lg p-3 bg-white fade-in-up" style={{ borderRadius: '24px', maxWidth: '550px', transform: 'rotate(-2deg)' }}>
                                    <Card.Body className="p-4">
                                        {/* Header Row */}
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div className="d-flex align-items-center">
                                                {/* Icon Box - Soft Blue like Dashboard */}
                                                <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                                    style={{ width: '56px', height: '56px', backgroundColor: '#dbeafe' }}>
                                                    <i className="bi bi-box-seam-fill fs-3 text-primary"></i>
                                                </div>
                                                {/* Text Info */}
                                                <div>
                                                    <h5 className="fw-bold mb-1 text-dark">Order #SH-2938</h5>
                                                    <small className="text-muted">In Transit • 2 mins ago</small>
                                                </div>
                                            </div>

                                            {/* Active Badge */}
                                            <span className="badge rounded-pill px-3 py-2 fw-medium"
                                                style={{ backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.85rem' }}>
                                                Active
                                            </span>
                                        </div>

                                        {/* Progress Bar Row */}
                                        <div className="d-flex justify-content-between align-items-end mb-2">
                                            <span className="text-dark fw-medium small">Johannesburg</span>
                                            <span className="text-muted small">Cape Town</span>
                                        </div>

                                        {/* Custom Progress Bar - Purple Brand */}
                                        <div className="progress rounded-pill mb-0" style={{ height: '8px', backgroundColor: '#f3f4f6' }}>
                                            <div className="progress-bar rounded-pill bg-purple" role="progressbar"
                                                style={{ width: '60%' }}></div>
                                        </div>
                                    </Card.Body>
                                </Card>

                                {/* Background Decorative Elements */}
                                <div className="position-absolute bg-purple rounded-circle"
                                    style={{ width: '200px', height: '200px', top: '-50px', right: '-50px', zIndex: -1, opacity: 0.1 }}></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Staggered Grid - Pastel Dashboard Style */}
            <section className="py-5 bg-light" style={{ backgroundColor: '#f8f9fa' }}>
                <Container>
                    <div className="text-center mb-5">
                        <small className="text-uppercase fw-bold text-muted ls-tight">Why Choose ShipDay</small>
                        <h2 className="fw-bold mt-2">Delivering excellence.</h2>
                    </div>

                    <Row className="g-4 align-items-stretch">
                        <Col md={4} className="fade-in-up">
                            <div className="p-4 bg-white rounded-4 h-100 hover-shadow transition-all border-0 shadow-sm">
                                <div className="rounded-3 d-inline-flex p-3 mb-4" style={{ backgroundColor: '#ffEdd5' }}>
                                    <i className="bi bi-lightning-charge-fill fs-3" style={{ color: '#ea580c' }}></i>
                                </div>
                                <h4 className="fw-bold h5">Lightning Fast</h4>
                                <p className="text-muted small mb-0">Same-day delivery options available for urgent parcels in metro areas.</p>
                            </div>
                        </Col>
                        <Col md={4} className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="p-4 bg-white shadow-sm rounded-4 h-100 hover-shadow transition-all border-0">
                                <div className="rounded-3 d-inline-flex p-3 mb-4" style={{ backgroundColor: '#dbeafe' }}>
                                    <i className="bi bi-shield-lock-fill fs-3" style={{ color: '#2563eb' }}></i>
                                </div>
                                <h4 className="fw-bold h5">Secure & Insured</h4>
                                <p className="text-muted small mb-0">Every shipment includes basic insurance coverage for your peace of mind.</p>
                            </div>
                        </Col>
                        <Col md={4} className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="p-4 bg-white rounded-4 h-100 hover-shadow transition-all border-0 shadow-sm">
                                <div className="rounded-3 d-inline-flex p-3 mb-4" style={{ backgroundColor: '#dcfce7' }}>
                                    <i className="bi bi-globe fs-3" style={{ color: '#16a34a' }}></i>
                                </div>
                                <h4 className="fw-bold h5">National Reach</h4>
                                <p className="text-muted small mb-0">From Cape Town to Musina, we cover every corner of South Africa.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
