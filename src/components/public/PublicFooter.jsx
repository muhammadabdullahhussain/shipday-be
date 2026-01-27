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
                            ShipDay is South Africa's leading tech-enabled courier provider.
                            We move your world with speed, precision, and care.
                        </p>
                        <div className="d-flex gap-3">
                            {['bi-facebook', 'bi-twitter-x', 'bi-linkedin', 'bi-instagram'].map((icon, i) => {
                                const links = [
                                    'https://facebook.com/shipday',
                                    'https://twitter.com/shipday',
                                    'https://linkedin.com/company/shipday',
                                    'https://instagram.com/shipday'
                                ];
                                return (
                                    <a
                                        key={i}
                                        href={links[i]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon-link d-flex align-items-center justify-content-center rounded-circle border border-yellow border-opacity-25 text-yellow"
                                        style={{ width: '40px', height: '40px', textDecoration: 'none', transition: 'all 0.3s ease' }}
                                    >
                                        <i className={`bi ${icon} fs-5`}></i>
                                    </a>
                                );
                            })}
                        </div>
                    </Col>

                    {/* Quick Links */}
                    <Col lg={2} md={6} xs={6}>
                        <h6 className="fw-bold text-white mb-4">Company</h6>
                        <ul className="list-unstyled d-flex flex-column gap-2 small">
                            <li>
                                <Link to="/" className={`d-inline-block text-decoration-none transition-all ${isActive('/') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={`d-inline-block text-decoration-none transition-all ${isActive('/about') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={`d-inline-block text-decoration-none transition-all ${isActive('/services') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className={`d-inline-block text-decoration-none transition-all ${isActive('/careers') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
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
                                <Link to="/tracking" className={`d-inline-block text-decoration-none transition-all ${isActive('/tracking') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    Track Parcel
                                </Link>
                            </li>
                            <li>
                                <Link to="/faqs" className={`d-inline-block text-decoration-none transition-all ${isActive('/faqs') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={`d-inline-block text-decoration-none transition-all ${isActive('/contact') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className={`d-inline-block text-decoration-none transition-all ${isActive('/terms') ? 'bg-yellow text-black rounded-pill px-3 py-1 shadow-sm' : 'text-white-50 hover-text-white hover-text-yellow'}`}>
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Newsletter */}
                    <Col lg={4} md={6}>
                        <h6 className="fw-bold text-white mb-4">Stay Updated</h6>
                        <p className="small text-white-50 mb-3">Subscribe to get the latest courier news and delivery updates.</p>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter your email"
                                className="bg-dark border-secondary text-white placeholder-secondary shadow-none"
                                style={{ borderRadius: '8px 0 0 8px', borderColor: '#333' }}
                            />
                            <Button className="fw-bold btn-yellow border-0" style={{ borderRadius: '0 8px 8px 0' }}>
                                Subscribe
                            </Button>
                        </InputGroup>
                        <div className="text-white-50 small">
                            <i className="bi bi-envelope-fill text-yellow me-2"></i>
                            <a href="mailto:support@shipday.co.za" className="text-white-50 text-decoration-none hover-text-white">support@shipday.co.za</a>
                        </div>
                    </Col>
                </Row>

                <div className="border-top border-secondary border-opacity-25 mt-5 pt-4">
                    <Row className="align-items-center">
                        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
                            <small className="text-white-50">
                                &copy; 2026 ShipDay Logistics (Pty) Ltd. All rights reserved.
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
                .hover-text-yellow:hover { color: var(--brand-yellow) !important; }
                .hover-bg-yellow:hover { background-color: var(--brand-yellow) !important; border-color: var(--brand-yellow) !important; color: black !important; }
                .social-icon-link:hover { 
                    background-color: var(--brand-yellow); 
                    color: black !important; 
                    border-color: var(--brand-yellow) !important;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(250, 187, 5, 0.3);
                }
                .border-yellow { border-color: var(--brand-yellow) !important; }
                .placeholder-secondary::placeholder { color: #666; }
                .bg-yellow { background-color: var(--brand-yellow) !important; }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </footer >
    );
};

export default PublicFooter;
