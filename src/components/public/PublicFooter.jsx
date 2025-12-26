import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/shipday_logo.jpg';

const PublicFooter = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <footer className="pt-5 pb-4 font-sans text-white border-top border-dark" style={{ backgroundColor: '#000000' }}>
            <Container>
                <Row className="gy-5 gx-lg-5">
                    {/* Brand Column */}
                    <Col lg={4} md={6}>
                        <div className="bg-white rounded-3 p-2 d-inline-block mb-4">
                            <img
                                src={logo}
                                alt="ShipDay"
                                height="40"
                                style={{ mixBlendMode: 'multiply' }}
                            />
                        </div>
                        <p className="text-white-50 small mb-4" style={{ lineHeight: '1.8', maxWidth: '85%' }}>
                            ShipDay is South Africa's leading tech-enabled logistics provider.
                            We move your world with speed, precision, and care.
                        </p>
                        <div className="d-flex gap-2">
                            {['bi-facebook', 'bi-twitter-x', 'bi-linkedin', 'bi-instagram'].map((icon, i) => (
                                <a key={i} href="#" className="btn btn-outline-light rounded-circle btn-sm d-flex align-items-center justify-content-center border-secondary hover-bg-purple text-secondary" style={{ width: '36px', height: '36px' }}>
                                    <i className={`bi ${icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6} xs={6}>
                        <h6 className="fw-bold text-white mb-4">Company</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <Link to="/" className={`d-inline-block text-decoration-none transition-all ${isActive('/') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={`d-inline-block text-decoration-none transition-all ${isActive('/about') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={`d-inline-block text-decoration-none transition-all ${isActive('/services') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className={`d-inline-block text-decoration-none transition-all ${isActive('/careers') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Resources */}
                    <Col lg={2} md={6} xs={6}>
                        <h6 className="fw-bold text-white mb-4">Support</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <Link to="/tracking" className={`d-inline-block text-decoration-none transition-all ${isActive('/tracking') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    Track Parcel
                                </Link>
                            </li>
                            <li>
                                <Link to="/faqs" className={`d-inline-block text-decoration-none transition-all ${isActive('/faqs') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={`d-inline-block text-decoration-none transition-all ${isActive('/contact') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className={`d-inline-block text-decoration-none transition-all ${isActive('/terms') ? 'bg-purple text-white rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white'}`}>
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={4} md={6}>
                        <h6 className="fw-bold text-white mb-4">Stay Updated</h6>
                        <p className="small text-white-50 mb-3">Subscribe to get the latest logistics news and delivery updates.</p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter your email"
                                className="bg-dark border-secondary text-white placeholder-secondary focus-ring-0"
                                style={{ borderRadius: '8px 0 0 8px', borderColor: '#333' }}
                            />
                            <Button className="fw-bold btn-purple border-0" style={{ borderRadius: '0 8px 8px 0' }}>
                                Subscribe
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <div className="border-top border-secondary border-opacity-25 mt-5 pt-4">
                    <Row className="align-items-center">
                        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                            <small className="text-white-50">
                                &copy; {new Date().getFullYear()} ShipDay Logistics (Pty) Ltd. All rights reserved.
                            </small>
                        </Col>
                        <Col md={6} className="text-center text-md-end">
                            <div className="d-flex gap-3 justify-content-center justify-content-md-end text-white-50 small">
                                <Link to="#" className="text-decoration-none text-white-50 hover-text-white">Privacy Policy</Link>
                                <Link to="#" className="text-decoration-none text-white-50 hover-text-white">Security</Link>
                                <Link to="#" className="text-decoration-none text-white-50 hover-text-white">Sitemap</Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <style>{`
                .hover-text-white:hover { color: #fff !important; padding-left: 5px; }
                .hover-bg-purple:hover { background-color: var(--primary-purple) !important; border-color: var(--primary-purple) !important; color: white !important; }
                .placeholder-secondary::placeholder { color: #6c757d; }
                .bg-purple { background-color: var(--primary-purple) !important; }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </footer>
    );
};

export default PublicFooter;
