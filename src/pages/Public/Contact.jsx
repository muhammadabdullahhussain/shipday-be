import React from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import warehouseImg from '../../assets/contact_warehouse.jpg';
import truckImg from '../../assets/contact_truck_semi.jpg';
import pickupImg from '../../assets/contact_truck_pickup.jpg';

const Contact = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            {/* 1. HEAVY BRAND HEADER */}
            <div className="bg-dark text-white py-5 position-relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', minHeight: '350px', display: 'flex', alignItems: 'center' }}>

                {/* Decorative Branded Patterns */}
                <div className="position-absolute top-0 end-0 w-50 h-100 bg-yellow opacity-10"
                    style={{ clipPath: 'polygon(100% 0, 20% 0, 100% 100%)', zIndex: 0 }}></div>
                <div className="position-absolute bottom-0 start-0 w-25 h-75 bg-white opacity-5"
                    style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)', zIndex: 0 }}></div>

                <Container className="text-center py-5 fade-in-down position-relative z-1">
                    <Badge bg="warning" className="text-dark mb-3 px-4 py-2 fw-black tracking-widest shadow-lg pulse-badge">
                        READY TO HELP
                    </Badge>
                    <h1 className="fw-black display-2 mb-3 text-white" style={{ letterSpacing: '-3px' }}>
                        Contact <span className="text-yellow glow-text">Us</span>
                    </h1>
                    <p className="lead text-white-50 mx-auto max-width-700 fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>
                        Global logistics precision with local South African care.
                    </p>
                </Container>
            </div>

            {/* 2. PREMIUM INFO CARDS */}
            <Container className="position-relative z-2" style={{ marginTop: '-80px' }}>
                <Row className="g-4 justify-content-center">
                    {[
                        {
                            title: 'Support Network',
                            icon: 'bi-chat-right-quote-fill',
                            desc: 'Have questions? Our mission-critical support team is active 24/7 to assist with your operational needs.',
                            accent: '#fabb05'
                        },
                        {
                            title: 'Strategic Location',
                            icon: 'bi-geo-alt-fill',
                            desc: '37 Main Road, Eastleigh, Edenvale 1609. South Africa\'s central logistics node.',
                            accent: '#0f172a'
                        },
                        {
                            title: 'Direct Hotline',
                            icon: 'bi-telephone-outbound-fill',
                            desc: 'Contact our headquarters directly for urgent shipments and enterprise solutions.',
                            value: '010 001 4421',
                            accent: '#fabb05'
                        }
                    ].map((info, idx) => (
                        <Col lg={4} md={6} key={idx} className="fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <Card className="border-0 shadow-2xl rounded-5 p-4 h-100 transition-all hover-lift bg-white border-top border-5"
                                style={{ borderColor: info.accent }}>
                                <Card.Body className="d-flex flex-column align-items-center text-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-4 shadow-glow-sm"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            backgroundColor: info.accent === '#fabb05' ? 'rgba(250, 187, 5, 0.1)' : 'rgba(15, 23, 42, 0.05)',
                                            border: `1px solid ${info.accent === '#fabb05' ? 'rgba(250, 187, 5, 0.2)' : 'rgba(15, 23, 42, 0.1)'}`
                                        }}>
                                        <i className={`bi ${info.icon} fs-2`} style={{ color: info.accent === '#fabb05' ? '#e5ab04' : '#0f172a' }}></i>
                                    </div>
                                    <h4 className="fw-black text-dark mb-3 tracking-tighter">{info.title}</h4>
                                    <p className="text-muted small mb-4 lh-lg fw-medium">
                                        {info.desc}
                                    </p>
                                    {info.value && (
                                        <div className="mt-auto">
                                            <span className="fw-black text-dark fs-4 tracking-tighter d-block">{info.value}</span>
                                            <Badge bg="warning" className="text-dark rounded-pill px-3 py-1 fw-bold mt-2">AVAILABILITY: 24/7</Badge>
                                        </div>
                                    )}
                                    {!info.value && <div className="mt-auto"><Button variant="link" className="text-yellow fw-black text-decoration-none p-0 group">View on Map <i className="bi bi-arrow-right-short transition-all group-hover:ms-1"></i></Button></div>}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* 3. PREMIUM CONTACT FORM & INTELLIGENCE MAP */}
            <section className="py-5 my-5">
                <Container className="py-5">
                    <Row className="g-5">
                        <Col lg={6} className="fade-in-up">
                            <div className="pe-lg-5">
                                <Badge bg="warning" className="text-dark mb-3 px-3 py-2 fw-black">GET IN TOUCH</Badge>
                                <h2 className="display-4 fw-black text-dark mb-4 lh-1">Send us an <br /><span className="text-yellow">intelligence request.</span></h2>
                                <p className="text-muted lead mb-5">
                                    Our dedicated regional experts are ready to architect your logistics solution. Fill out the form below.
                                </p>

                                <Card className="border-0 shadow-2xl rounded-4 overflow-hidden bg-white border border-light">
                                    <div className="bg-dark py-3 px-4 d-flex align-items-center justify-content-between border-bottom border-yellow border-2">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px', animation: 'pulse-green 2s infinite' }}></div>
                                            <span className="fw-black text-white tracking-widest x-small opacity-75">DATA UPLOAD SECURE</span>
                                        </div>
                                        <span className="text-yellow fw-black x-small tracking-tighter opacity-50">NODE_ID: SS_H_01</span>
                                    </div>
                                    <Card.Body className="p-4 p-md-5">
                                        <Form className="precision-form">
                                            <Row className="g-4">
                                                {/* ENQUIRY TYPE */}
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">INTELLIGENCE CATEGORY</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-cpu precision-icon"></i>
                                                            <Form.Select className="precision-input custom-select-precision">
                                                                <option>GENERAL INTELLIGENCE</option>
                                                                <option>SHIPMENT STATUS UPDATE</option>
                                                                <option>ENTERPRISE RATES REQUEST</option>
                                                                <option>TECHNICAL OPERATIONAL SUPPORT</option>
                                                            </Form.Select>
                                                            <i className="bi bi-chevron-down precision-chevron"></i>
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* NAME */}
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">REGIONAL CONTACT NAME</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-person-badge precision-icon"></i>
                                                            <Form.Control className="precision-input" placeholder="ENTER FULL LEGAL NAME" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* EMAIL & PHONE */}
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">SECURE EMAIL</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-shield-check precision-icon"></i>
                                                            <Form.Control className="precision-input" placeholder="EMAIL@DOMAIN.COM" type="email" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">CONTACT NUMBER</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-phone precision-icon"></i>
                                                            <Form.Control className="precision-input" placeholder="+27 (000) 000-0000" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* MESSAGE */}
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">OPERATIONAL REQUIREMENTS</Form.Label>
                                                        <div className="precision-input-wrapper align-items-start">
                                                            <i className="bi bi-terminal precision-icon mt-3"></i>
                                                            <Form.Control as="textarea" rows={4} className="precision-input py-3" placeholder="BRIEF YOUR REQUIREMENTS HERE..." style={{ resize: 'none' }} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* BUTTON */}
                                                <Col md={12} className="pt-2">
                                                    <Button className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden group">
                                                        <span className="position-relative z-1 fw-black tracking-widest text-uppercase">Dispatch Signal</span>
                                                        <div className="precision-btn-scanner"></div>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>

                        <Col lg={6} className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="h-100 rounded-5 overflow-hidden shadow-2xl border border-light position-relative min-vh-50">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.697072528771!2d28.15183497595604!3d-26.17410297708575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e951234567890ab%3A0xcdef1234567890ab!2s37%20Main%20Rd%2C%20Eastleigh%2C%20Edenvale%2C%201609%2C%20South%20Africa!5e0!3m2!1sen!2smy!4v1703600000000!5m2!1sen!2smy"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Shipday Location"
                                ></iframe>

                                <Card className="position-absolute bottom-0 start-0 m-4 p-4 border-0 shadow-2xl rounded-4 bg-dark text-white d-none d-md-block border-start border-yellow border-5 shadow-glow-sm" style={{ maxWidth: '300px' }}>
                                    <h6 className="fw-black mb-2 text-yellow tracking-widest small">HEADQUARTERS NODE</h6>
                                    <p className="small mb-0 opacity-75 fw-bold">37 Main Road, Eastleigh<br />Edenvale 1609, Gauteng</p>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 4. NETWORK BRANCHES */}
            <BranchesSection />

            <style>{`
                h1, h2, h3, h4, .fw-black, .display-4, .display-2 { font-family: 'Outfit', sans-serif !important; }
                body, p, span, .text-muted { font-family: 'Inter', sans-serif; }

                .fw-black { font-weight: 900 !important; }
                .tracking-widest { letter-spacing: 0.25em; }
                .tracking-wider { letter-spacing: 0.12em; }
                .tracking-tighter { letter-spacing: -1.5px; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45) !important; }
                .shadow-glow-sm { box-shadow: 0 0 20px rgba(250, 187, 5, 0.2); }
                .glow-text { text-shadow: 0 0 25px rgba(250, 187, 5, 0.5); }
                .x-small { font-size: 0.72rem !important; }

                /* Sleek Industrial Precision Design */
                .precision-label {
                    font-weight: 900;
                    font-size: 0.75rem;
                    letter-spacing: 0.15em;
                    color: #94a3b8;
                    margin-bottom: 0.75rem;
                    display: block;
                    text-transform: uppercase;
                }

                .precision-input-wrapper {
                    display: flex;
                    align-items: center;
                    background: transparent;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 0 1.25rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .precision-input-wrapper:focus-within {
                    border-color: #fabb05;
                    box-shadow: 0 4px 20px rgba(250, 187, 5, 0.08);
                }

                .precision-input-wrapper::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    width: 0;
                    height: 2px;
                    background: #fabb05;
                    transition: all 0.4s ease;
                    transform: translateX(-50%);
                }

                .precision-input-wrapper:focus-within::after {
                    width: 100%;
                }

                .precision-icon {
                    font-size: 1.1rem;
                    color: #94a3b8;
                    opacity: 0.6;
                    margin-right: 1rem;
                }

                .precision-input {
                    border: none !important;
                    background: transparent !important;
                    padding: 1.1rem 0 !important;
                    font-weight: 600 !important;
                    color: #1e293b !important;
                    font-size: 0.95rem !important;
                    width: 100%;
                }

                .precision-input:focus {
                    box-shadow: none !important;
                    outline: none !important;
                }

                .precision-input::placeholder {
                    color: #cbd5e1;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                }

                .custom-select-precision {
                    appearance: none !important;
                    cursor: pointer;
                }

                .precision-chevron {
                    position: absolute;
                    right: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                    pointer-events: none;
                    font-size: 0.8rem;
                }

                .precision-btn {
                    background: #0f172a !important;
                    color: #fabb05 !important;
                    border: none !important;
                    padding-top: 1.25rem !important;
                    padding-bottom: 1.25rem !important;
                    transition: all 0.4s ease !important;
                }

                .precision-btn:hover {
                    background: #000 !important;
                    color: #fff !important;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.2) !important;
                }

                .precision-btn-scanner {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(250, 187, 5, 0.05), transparent);
                    animation: scan 3s infinite;
                }

                @keyframes scan {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                @keyframes pulse-green {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }

                .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .hover-lift:hover { transform: translateY(-10px); }

                .text-yellow { color: #fabb05 !important; }
            `}</style>
        </div>
    );
};

const BranchesSection = () => {
    const branches = [
        {
            name: "Headquarters",
            location: "Edenvale, Gauteng",
            address: "37 Main Road, Eastleigh, Edenvale 1609",
            image: warehouseImg,
            type: "Main Office",
            accent: "#fabb05"
        },
        {
            name: "Logistics Hub",
            location: "Johannesburg",
            address: "88 Logistics Road, Kempton Park, Gauteng, 1619",
            image: truckImg,
            type: "Distribution Center",
            accent: "#0f172a"
        },
        {
            name: "City Express",
            location: "Cape Town",
            address: "Unit 5, City Park, Foreshore, Cape Town, 8001",
            image: pickupImg,
            type: "Retail Outlet",
            accent: "#0f172a"
        }
    ];

    return (
        <section className="py-5 bg-light bg-opacity-30 border-top mt-5">
            <Container className="py-5">
                <div className="text-center mb-5 fade-in-up">
                    <Badge bg="warning" className="text-dark mb-2 px-3 py-2 fw-black">OUR NETWORK</Badge>
                    <h2 className="display-5 fw-black text-dark">Strategic Infrastructure</h2>
                </div>

                <Row className="g-4">
                    {branches.map((branch, idx) => (
                        <Col lg={4} md={6} key={idx} className="fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <Card className="border-0 shadow-2xl rounded-5 overflow-hidden h-100 hover-lift group border-bottom border-5"
                                style={{ borderColor: branch.accent }}>
                                <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                                    <div className="w-100 h-100 bg-image-cover transition-transform duration-700 hover-scale"
                                        style={{ backgroundImage: `url(${branch.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <div className="position-absolute top-0 start-0 m-3 px-3 py-1 bg-dark text-white rounded-pill fw-black small shadow-lg">
                                        {branch.type}
                                    </div>
                                </div>
                                <Card.Body className="p-4 bg-white">
                                    <h4 className="fw-black text-dark mb-1">{branch.name}</h4>
                                    <p className="text-yellow fw-black small text-uppercase mb-3 tracking-wider">{branch.location}</p>
                                    <div className="d-flex align-items-start gap-3 mb-4">
                                        <i className="bi bi-geo-alt-fill text-dark fs-5 mt-1"></i>
                                        <p className="mb-0 text-muted fw-bold small lh-base">{branch.address}</p>
                                    </div>
                                    <Button variant="outline-dark" className="w-100 rounded-pill py-2 fw-black border-2 transition-all hover-bg-yellow">
                                        OPERATION DETAILS
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <style>{`
                .hover-scale { transition: transform 0.8s ease; }
                .group:hover .hover-scale { transform: scale(1.1); }
                .hover-bg-yellow:hover { background-color: #fabb05; border-color: #fabb05; color: #0f172a; }
                .bg-image-cover { background-size: cover; background-position: center; }
            `}</style>
        </section>
    );
};

export default Contact;
