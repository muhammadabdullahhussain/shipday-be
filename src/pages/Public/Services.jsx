import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            title: 'B2B Delivery Services',
            icon: 'bi-building-fill-gear',
            price: 'Custom Quote',
            desc: 'Reliable B2B delivery solutions designed to support businesses with consistent, scheduled, and on-demand deliveries.',
            features: ['Scheduled deliveries', 'Bulk order handling', 'Business accounts', 'Real-time tracking'],
            tag: 'BUSINESS',
            gradient: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)',
            accentColor: '#fabb05',
            fullDesc: 'We provide reliable B2B delivery solutions designed to support businesses with consistent, scheduled, and on-demand deliveries. Our service helps companies move stock, documents, and bulk orders efficiently between suppliers, warehouses, and retail locations, ensuring timely fulfillment and smooth business operations.'
        },
        {
            title: 'Door-to-Door Delivery',
            icon: 'bi-house-door-fill',
            price: 'From R45',
            desc: 'Convenient, end-to-end parcel collection and delivery from sender to recipient with real-time tracking.',
            features: ['End-to-end service', 'Real-time tracking', 'Proof of delivery', 'SMS updates'],
            tag: 'POPULAR',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
            accentColor: '#fabb05',
            fullDesc: 'Our door-to-door delivery service offers convenient, end-to-end parcel collection and delivery from the sender\'s location directly to the recipient\'s door. We handle the entire process with care, speed, and real-time tracking, giving customers peace of mind from pickup to final delivery.'
        },
        {
            title: 'Logistics Services',
            icon: 'bi-truck-front-fill',
            price: 'Custom Quote',
            desc: 'Comprehensive logistics covering transportation, route optimization, and last-mile delivery.',
            features: ['Route optimization', 'Last-mile delivery', 'Cost reduction', 'Regional coverage'],
            tag: 'ENTERPRISE',
            gradient: 'linear-gradient(135deg, #fabb05 0%, #d97706 100%)',
            accentColor: '#d97706',
            fullDesc: 'We offer comprehensive logistics services that cover transportation, route optimization, and last-mile delivery. Our solutions are tailored to meet business and individual needs, helping clients reduce delivery costs, improve efficiency, and ensure dependable movement of goods across local and regional networks.'
        },
        {
            title: 'E-commerce Services',
            icon: 'bi-cart-check-fill',
            price: 'From R35',
            desc: 'Specialized delivery solutions for online retailers with high-volume order fulfillment.',
            features: ['High-volume handling', 'API integration', 'Returns management', 'Same-day options'],
            tag: 'FAST',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            accentColor: '#fabb05'
        },
        {
            title: 'Retail Hub Services',
            icon: 'bi-shop-window',
            price: 'From R25',
            desc: 'Convenient drop-off and collection at participating retail partners with assisted booking service.',
            features: ['Retail partner network', 'Assisted booking', 'Flexible collection', 'Accessible locations'],
            tag: 'CONVENIENT',
            gradient: 'linear-gradient(135deg, #fabb05 0%, #eab308 100%)',
            accentColor: '#eab308',
            fullDesc: 'Our retail hub service allows customers to conveniently drop off or collect parcels at participating retail partners. The retailer handles the booking on the customer\'s behalf, making the process simple, accessible, and ideal for customers who prefer assisted shipping and flexible collection points.'
        },
        {
            title: 'Branch Services',
            icon: 'bi-building-check',
            price: 'From R30',
            desc: 'Multiple drop-off and collection options through DCs, kiosks, and district branches.',
            features: ['Distribution centres', 'Kiosk network', 'District branches', 'Reduced delivery times'],
            tag: 'NETWORK',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
            accentColor: '#fabb05',
            fullDesc: 'Our branch services provide multiple drop-off and collection options through our distribution centres (DCs), kiosks, and district branches. Customers can send or collect parcels at a nearby branch, ensuring convenience, reduced delivery times, and efficient parcel handling across our network.'
        },
        {
            title: 'Warehouse & Fulfillment',
            icon: 'bi-boxes',
            price: 'Custom Quote',
            desc: 'Complete warehousing and order fulfillment solutions for growing e-commerce businesses.',
            features: ['Inventory management', 'Pick & pack', 'Order processing', '24/7 security'],
            tag: 'SCALABLE',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
            accentColor: '#fabb05'
        },
        {
            title: 'Third-Party Partnership',
            icon: 'bi-people-fill',
            price: 'Custom Quote',
            desc: 'We collaborate with corporate and emerging couriers to expand delivery coverage and service capacity.',
            features: ['System integration', 'Operational standards', 'Service scaling', 'Reliable solutions'],
            tag: 'PARTNERSHIP',
            gradient: 'linear-gradient(135deg, #fabb05 0%, #eab308 100%)',
            accentColor: '#eab308',
            fullDesc: 'We collaborate with established corporate couriers and emerging courier businesses to expand delivery coverage and service capacity. Through these partnerships, we integrate systems, share operational standards, and support developing couriers while ensuring reliable, consistent, and scalable delivery solutions for our clients.'
        },
        {
            title: 'Last Mile Delivery',
            icon: 'bi-geo-alt-fill',
            price: 'From R35',
            desc: 'Fast and reliable final-stage delivery from warehouses directly to the customer or receiver.',
            features: ['Warehouse to doorstep', 'Fast & reliable', 'Flexible volume', 'Efficient routes'],
            tag: 'EXPERT',
            gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            accentColor: '#fabb05',
            fullDesc: 'Last Mile Delivery means final stage in getting a product from a warehouse, distribution center, or store directly to the customer or receiver. It’s the crucial last stretch that ensures goods reach their destination efficiently and on time. In South Africa, we’ve mastered last-mile delivery.'
        },
    ];

    const steps = [
        { num: '01', title: 'Book Online', desc: 'Get a quote and schedule your collection in seconds via our portal.', icon: 'bi-calendar-check' },
        { num: '02', title: 'We Collect', desc: 'Our courier arrives at your door to pick up your securely packed parcel.', icon: 'bi-box-seam' },
        { num: '03', title: 'We Ship', desc: 'Your parcel travels via our optimized network with live tracking.', icon: 'bi-truck' },
        { num: '04', title: 'Delivered', desc: 'Safe delivery to the destination with digital proof of delivery.', icon: 'bi-check-circle' },
    ];

    return (
        <div className="font-sans bg-white min-vh-100">
            {/* 1. PREMIUM HERO SECTION */}
            <section className="position-relative text-white overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                    minHeight: '85vh'
                }}>
                {/* Animated Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
                    <div className="position-absolute rounded-circle bg-yellow blur-effect"
                        style={{ width: '400px', height: '400px', top: '10%', left: '5%', filter: 'blur(100px)' }}></div>
                    <div className="position-absolute rounded-circle bg-white blur-effect"
                        style={{ width: '300px', height: '300px', bottom: '10%', right: '10%', filter: 'blur(80px)' }}></div>
                </div>

                {/* Diagonal Yellow Accent */}
                <div className="position-absolute top-0 end-0 h-100"
                    style={{
                        width: '45%',
                        background: 'linear-gradient(135deg, rgba(250, 187, 5, 0.15) 0%, transparent 100%)',
                        clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'
                    }}></div>

                <Container className="position-relative z-1 py-5 d-flex align-items-center" style={{ minHeight: '85vh' }}>
                    <Row className="align-items-center w-100">
                        <Col lg={7} className="fade-in-up">
                            <Badge bg="warning" className="text-dark mb-4 px-4 py-2 fw-bold tracking-wider shadow-sm"
                                style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
                                <i className="bi bi-lightning-charge-fill me-2"></i>
                                COMPREHENSIVE LOGISTICS
                            </Badge>
                            <h1 className="display-2 fw-bold mb-4 lh-1" style={{ letterSpacing: '-2px' }}>
                                Complete delivery <br />
                                solutions <span className="text-yellow">for every <br />business need.</span>
                            </h1>
                            <p className="lead text-white-50 mb-5 fs-5" style={{ maxWidth: '600px', lineHeight: '1.8' }}>
                                From B2B logistics to door-to-door delivery, e-commerce fulfillment to warehouse management—
                                <span className="text-white fw-semibold"> ShipDay provides the complete infrastructure</span> to power your business growth.
                            </p>
                            <div className="d-flex flex-wrap gap-3 mb-4">
                                <Button as={Link} to="/send-parcel"
                                    className="btn-yellow rounded-pill px-5 py-3 fw-bold hover-lift shadow-lg border-0"
                                    style={{ fontSize: '1.05rem' }}>
                                    <i className="bi bi-box-seam me-2"></i>
                                    Send a Parcel
                                </Button>
                                <Button as={Link} to="/contact"
                                    variant="outline-light"
                                    className="rounded-pill px-5 py-3 fw-bold hover-lift border-2"
                                    style={{ fontSize: '1.05rem' }}>
                                    <i className="bi bi-chat-dots me-2"></i>
                                    Get a Quote
                                </Button>
                            </div>

                            {/* Trust Indicators */}
                            <Row className="g-4 mt-4">
                                <Col xs={6} md={3}>
                                    <div className="text-center text-md-start">
                                        <div className="h2 fw-bold text-yellow mb-0">10k+</div>
                                        <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Deliveries</small>
                                    </div>
                                </Col>
                                <Col xs={6} md={3}>
                                    <div className="text-center text-md-start">
                                        <div className="h2 fw-bold text-yellow mb-0">99.9%</div>
                                        <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>On-Time</small>
                                    </div>
                                </Col>
                                <Col xs={6} md={3}>
                                    <div className="text-center text-md-start">
                                        <div className="h2 fw-bold text-yellow mb-0">50+</div>
                                        <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Cities</small>
                                    </div>
                                </Col>
                                <Col xs={6} md={3}>
                                    <div className="text-center text-md-start">
                                        <div className="h2 fw-bold text-yellow mb-0">2k+</div>
                                        <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>Clients</small>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                {/* Bottom Wave Divider */}
                <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '100px', overflow: 'hidden' }}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                            fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* 2. SERVICES GRID - PREMIUM CARDS */}
            <section className="py-5 bg-light position-relative">
                <Container className="py-5">
                    <div className="text-center mb-5 fade-in-up">
                        <Badge bg="light" className="text-dark border mb-3 px-3 py-2 fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>
                            OUR EXPERTISE
                        </Badge>
                        <h2 className="display-4 fw-bold text-dark mb-3">Tailored shipping for <span className="text-yellow">every need</span></h2>
                        <p className="lead text-muted max-width-700 mx-auto">
                            Comprehensive delivery solutions designed to scale with your business
                        </p>
                    </div>

                    <Row className="g-4">
                        {services.map((svc, idx) => (
                            <Col lg={4} md={6} key={idx} className="fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <Card className="h-100 border-0 rounded-4 shadow-hover bg-white overflow-hidden service-card position-relative">
                                    {/* Gradient Top Border */}
                                    <div className="position-absolute top-0 start-0 w-100"
                                        style={{ height: '5px', background: svc.gradient }}></div>

                                    <Card.Body className="p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div className="rounded-3 p-3 d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '70px',
                                                    height: '70px',
                                                    background: svc.gradient,
                                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                                }}>
                                                <i className={`bi ${svc.icon} fs-2 text-white`}></i>
                                            </div>
                                            {svc.tag && (
                                                <Badge bg="light" text="dark" className="border px-3 py-2 fw-bold" style={{ fontSize: '0.65rem' }}>
                                                    {svc.tag}
                                                </Badge>
                                            )}
                                        </div>

                                        <h4 className="fw-bold text-dark mb-3 h5">{svc.title}</h4>
                                        <p className="text-muted mb-4" style={{ minHeight: '65px', lineHeight: '1.8', fontSize: '0.9rem' }}>{svc.desc}</p>

                                        <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: '#f8fafc' }}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <small className="text-muted fw-semibold text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Pricing</small>
                                                <span className="h5 fw-bold mb-0" style={{ color: svc.accentColor || '#fabb05' }}>{svc.price}</span>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <small className="text-muted fw-semibold text-uppercase d-block mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Key Features</small>
                                            {svc.features.map((feat, fidx) => (
                                                <div key={fidx} className="mb-2 d-flex align-items-start">
                                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                                        style={{ width: '20px', height: '20px', backgroundColor: svc.accentColor || '#fabb05' }}>
                                                        <i className="bi bi-check text-white" style={{ fontSize: '0.7rem', fontWeight: 'bold' }}></i>
                                                    </div>
                                                    <span className="text-dark" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{feat}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button as={Link} to="/send-parcel"
                                            className="btn-yellow rounded-pill w-100 fw-bold py-3 mt-auto border-0 shadow-sm"
                                            style={{ fontSize: '0.9rem' }}>
                                            Get Started <i className="bi bi-arrow-right ms-2"></i>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 3. DETAILED SERVICES - MODERN LAYOUT */}
            <section className="py-5 bg-white">
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <Badge bg="light" className="text-dark border mb-3 px-3 py-2 fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>
                            CORE SERVICES
                        </Badge>
                        <h2 className="display-4 fw-bold text-dark mb-3">Powering your <span className="text-yellow">delivery needs</span></h2>
                        <p className="lead text-muted max-width-700 mx-auto">
                            Explore our comprehensive range of delivery and logistics solutions
                        </p>
                    </div>

                    {/* B2B Delivery Services */}
                    <Row className="align-items-center mb-5 pb-5">
                        <Col lg={6} className="mb-4 mb-lg-0 fade-in-left">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 rounded-4 opacity-20"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)',
                                        transform: 'rotate(-3deg) scale(1.02)',
                                        zIndex: 0
                                    }}></div>
                                <Card className="border-0 rounded-4 shadow-lg position-relative overflow-hidden" style={{ zIndex: 1 }}>
                                    <div className="position-absolute top-0 start-0 w-100"
                                        style={{ height: '6px', background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                    <Card.Body className="p-5 bg-dark text-white">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-3 p-3 me-3"
                                                style={{ background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}>
                                                <i className="bi bi-building-fill-gear fs-2 text-white"></i>
                                            </div>
                                            <div>
                                                <Badge bg="warning" className="text-dark mb-2 fw-bold">BUSINESS</Badge>
                                                <h3 className="fw-bold mb-0 h4">B2B Delivery Services</h3>
                                            </div>
                                        </div>
                                        <p className="mb-0 text-white-50 lh-lg">
                                            We provide reliable B2B delivery solutions designed to support businesses with consistent,
                                            scheduled, and on-demand deliveries. Our service helps companies move stock, documents, and
                                            bulk orders efficiently between suppliers, warehouses, and retail locations, ensuring timely
                                            fulfillment and smooth business operations.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col lg={6} className="fade-in-right">
                            <div className="ps-lg-4">
                                <h4 className="fw-bold text-dark mb-4 h5">Perfect for:</h4>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Suppliers & Manufacturers</strong>
                                            <p className="text-muted small mb-0 mt-1">Regular stock movements between facilities</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Wholesalers</strong>
                                            <p className="text-muted small mb-0 mt-1">Bulk order distribution to retail partners</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Corporate Offices</strong>
                                            <p className="text-muted small mb-0 mt-1">Document and equipment transfers</p>
                                        </div>
                                    </div>
                                </div>
                                <Button as={Link} to="/contact" className="btn-yellow rounded-pill px-4 py-3 fw-bold shadow-sm">
                                    <i className="bi bi-chat-square-quote me-2"></i>
                                    Request B2B Quote
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Door-to-Door Delivery */}
                    <Row className="align-items-center mb-5 pb-5 flex-lg-row-reverse">
                        <Col lg={6} className="mb-4 mb-lg-0 fade-in-right">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 rounded-4 opacity-20"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                                        transform: 'rotate(3deg) scale(1.02)',
                                        zIndex: 0
                                    }}></div>
                                <Card className="border-0 rounded-4 shadow-lg position-relative overflow-hidden" style={{ zIndex: 1 }}>
                                    <div className="position-absolute top-0 start-0 w-100"
                                        style={{ height: '6px', background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                    <Card.Body className="p-5 bg-dark text-white">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-3 p-3 me-3"
                                                style={{ background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}>
                                                <i className="bi bi-house-door-fill fs-2 text-white"></i>
                                            </div>
                                            <div>
                                                <Badge bg="warning" className="text-dark mb-2 fw-bold">POPULAR</Badge>
                                                <h3 className="fw-bold mb-0 h4">Door-to-Door Delivery</h3>
                                            </div>
                                        </div>
                                        <p className="mb-0 text-white-50 lh-lg">
                                            Our door-to-door delivery service offers convenient, end-to-end parcel collection and delivery
                                            from the sender's location directly to the recipient's door. We handle the entire process with
                                            care, speed, and real-time tracking, giving customers peace of mind from pickup to final delivery.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col lg={6} className="fade-in-left">
                            <div className="pe-lg-4">
                                <h4 className="fw-bold text-dark mb-4 h5">Key Features:</h4>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Complete End-to-End Service</strong>
                                            <p className="text-muted small mb-0 mt-1">From collection to delivery</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Real-Time Tracking</strong>
                                            <p className="text-muted small mb-0 mt-1">Know exactly where your parcel is</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Proof of Delivery</strong>
                                            <p className="text-muted small mb-0 mt-1">Digital signatures and photo confirmation</p>
                                        </div>
                                    </div>
                                </div>
                                <Button as={Link} to="/send-parcel" className="btn-yellow rounded-pill px-4 py-3 fw-bold shadow-sm">
                                    <i className="bi bi-box-seam me-2"></i>
                                    Send a Parcel Now
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Last Mile Delivery */}
                    <Row className="align-items-center mb-5 pb-5 flex-lg-row-reverse">
                        <Col lg={6} className="mb-4 mb-lg-0 fade-in-right">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 rounded-4 opacity-20"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                                        transform: 'rotate(3deg) scale(1.02)',
                                        zIndex: 0
                                    }}></div>
                                <Card className="border-0 rounded-4 shadow-lg position-relative overflow-hidden" style={{ zIndex: 1 }}>
                                    <div className="position-absolute top-0 start-0 w-100"
                                        style={{ height: '6px', background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                    <Card.Body className="p-5 bg-dark text-white">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-3 p-3 me-3"
                                                style={{ background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}>
                                                <i className="bi bi-geo-alt-fill fs-2 text-white"></i>
                                            </div>
                                            <div>
                                                <Badge bg="warning" className="text-dark mb-2 fw-bold">EXPERT</Badge>
                                                <h3 className="fw-bold mb-0 h4">Last Mile Delivery</h3>
                                            </div>
                                        </div>
                                        <p className="mb-0 text-white-50 lh-lg">
                                            Last Mile Delivery means final stage in getting a product from a warehouse, distribution center, or store directly to the customer or receiver. It’s the crucial last stretch that ensures goods reach their destination efficiently and on time.
                                            <br /><br />
                                            In South Africa, we’ve mastered last-mile delivery. Whether handling 1 parcel or 3,000+ a month, we pick up from your clients and deliver to their customers—fast, reliable, and stress-free.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col lg={6} className="fade-in-left">
                            <div className="pe-lg-4">
                                <h4 className="fw-bold text-dark mb-4 h5">Last Mile Excellence:</h4>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Warehouse to Doorstep</strong>
                                            <p className="text-muted small mb-0 mt-1">Direct delivery from distribution centers</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Scalable Volume</strong>
                                            <p className="text-muted small mb-0 mt-1">From single parcels to 3,000+ monthly orders</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Speed & Reliability</strong>
                                            <p className="text-muted small mb-0 mt-1">Ensuring on-time arrival for every delivery</p>
                                        </div>
                                    </div>
                                </div>
                                <Button as={Link} to="/send-parcel" className="btn-yellow rounded-pill px-4 py-3 fw-bold shadow-sm">
                                    <i className="bi bi-box-seam me-2"></i>
                                    Start Delivering
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Third-Party Partnership */}
                    <Row className="align-items-center">
                        <Col lg={6} className="mb-4 mb-lg-0 fade-in-left">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 rounded-4 opacity-20"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)',
                                        transform: 'rotate(-3deg) scale(1.02)',
                                        zIndex: 0
                                    }}></div>
                                <Card className="border-0 rounded-4 shadow-lg position-relative overflow-hidden" style={{ zIndex: 1 }}>
                                    <div className="position-absolute top-0 start-0 w-100"
                                        style={{ height: '6px', background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                    <Card.Body className="p-5 bg-dark text-white">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-3 p-3 me-3"
                                                style={{ background: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)' }}>
                                                <i className="bi bi-people-fill fs-2 text-white"></i>
                                            </div>
                                            <div>
                                                <Badge bg="warning" className="text-dark mb-2 fw-bold">PARTNERSHIP</Badge>
                                                <h3 className="fw-bold mb-0 h4">Third-Party Partnership</h3>
                                            </div>
                                        </div>
                                        <p className="mb-0 text-white-50 lh-lg">
                                            We collaborate with established corporate couriers and emerging courier businesses to expand delivery coverage and service capacity. Through these partnerships, we integrate systems, share operational standards, and support developing couriers while ensuring reliable, consistent, and scalable delivery solutions for our clients.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col lg={6} className="fade-in-right">
                            <div className="ps-lg-4">
                                <h4 className="fw-bold text-dark mb-4 h5">Partnership Benefits:</h4>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Enhanced Coverage</strong>
                                            <p className="text-muted small mb-0 mt-1">Expanding reaches via collaborative networks</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">System Integration</strong>
                                            <p className="text-muted small mb-0 mt-1">Seamless data and operational flow</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                    <div className="d-flex align-items-start">
                                        <i className="bi bi-check-circle-fill text-yellow me-3 mt-1 fs-5"></i>
                                        <div>
                                            <strong className="text-dark">Quality Standards</strong>
                                            <p className="text-muted small mb-0 mt-1">Sharing operational excellence</p>
                                        </div>
                                    </div>
                                </div>
                                <Button as={Link} to="/contact" className="btn-yellow rounded-pill px-4 py-3 fw-bold shadow-sm">
                                    <i className="bi bi-hand-thumbs-up me-2"></i>
                                    Partner With Us
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 4. PROCESS SECTION - MODERN TIMELINE */}
            <section className="py-5 position-relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <Badge bg="light" className="text-dark border mb-3 px-3 py-2 fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>
                            HOW IT WORKS
                        </Badge>
                        <h2 className="display-4 fw-bold text-dark mb-3">Shipping made <span className="text-yellow">simple</span></h2>
                        <p className="lead text-muted max-width-700 mx-auto">
                            Four easy steps to get your parcels delivered anywhere in South Africa
                        </p>
                    </div>

                    <Row className="g-4 position-relative">
                        {/* Connection Line */}
                        <div className="position-absolute top-50 start-0 w-100 d-none d-md-block"
                            style={{ height: '2px', background: 'linear-gradient(90deg, #fabb05 0%, #fabb05 100%)', zIndex: 0, transform: 'translateY(-50%)' }}></div>

                        {steps.map((step, i) => (
                            <Col md={6} lg={3} key={i} className="fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                                <Card className="border-0 rounded-4 shadow-sm h-100 hover-lift bg-white position-relative" style={{ zIndex: 1 }}>
                                    <Card.Body className="p-4 text-center">
                                        <div className="rounded-circle bg-yellow d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                                            style={{ width: '80px', height: '80px' }}>
                                            <i className={`bi ${step.icon} fs-1 text-dark`}></i>
                                        </div>
                                        <div className="display-6 fw-bold text-yellow opacity-25 mb-2" style={{ fontSize: '2.5rem' }}>{step.num}</div>
                                        <h5 className="fw-bold text-dark mb-3">{step.title}</h5>
                                        <p className="text-muted small mb-0 lh-lg">{step.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Testimonial */}
                    <Row className="mt-5 pt-5">
                        <Col lg={8} className="mx-auto">
                            <Card className="border-0 rounded-4 shadow-lg overflow-hidden">
                                <div className="position-absolute top-0 start-0 w-100"
                                    style={{ height: '5px', background: 'linear-gradient(90deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                <Card.Body className="p-5 bg-white">
                                    <div className="text-center mb-4">
                                        <i className="bi bi-quote fs-1 text-yellow opacity-50"></i>
                                    </div>
                                    <p className="fst-italic text-dark mb-4 fs-5 text-center lh-lg">
                                        "ShipDay transformed how we manage our e-commerce deliveries. It's fast, reliable, and the dashboard is a dream.
                                        Our customers love the real-time tracking!"
                                    </p>
                                    <div className="text-center">
                                        <div className="fw-bold text-dark">Sarah Johnson</div>
                                        <small className="text-muted">Online Retailer, Cape Town</small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 5. CTA SECTION - PREMIUM SPLIT LAYOUT */}
            <section className="py-5 position-relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    minHeight: '500px'
                }}>
                {/* Animated Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
                    <div className="position-absolute rounded-circle bg-yellow blur-effect"
                        style={{ width: '400px', height: '400px', top: '10%', right: '5%', filter: 'blur(100px)' }}></div>
                    <div className="position-absolute rounded-circle bg-white blur-effect"
                        style={{ width: '300px', height: '300px', bottom: '10%', left: '10%', filter: 'blur(80px)' }}></div>
                </div>

                {/* Diagonal Yellow Accent */}
                <div className="position-absolute top-0 start-0 h-100"
                    style={{
                        width: '50%',
                        background: 'linear-gradient(135deg, rgba(250, 187, 5, 0.1) 0%, transparent 100%)',
                        clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)'
                    }}></div>

                <Container className="position-relative z-1 py-5">
                    <Row className="align-items-center">
                        {/* Left Side - Value Proposition */}
                        <Col lg={7} className="mb-4 mb-lg-0 fade-in-left">
                            <Badge bg="warning" className="text-dark mb-4 px-4 py-2 fw-bold tracking-wider shadow-sm"
                                style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>
                                <i className="bi bi-rocket-takeoff-fill me-2"></i>
                                GROW WITH SHIPDAY
                            </Badge>
                            <h2 className="display-3 fw-bold text-white mb-4 lh-1" style={{ letterSpacing: '-1px' }}>
                                Ready to move your business <span className="text-yellow">forward?</span>
                            </h2>
                            <p className="lead text-white-50 mb-5 fs-5" style={{ maxWidth: '600px', lineHeight: '1.8' }}>
                                Join thousands of South African businesses who trust ShipDay for their logistics needs.
                                <span className="text-white fw-semibold d-block mt-2">
                                    Sign up today and get <span className="text-yellow">R100 off</span> your first shipment.
                                </span>
                            </p>
                            <div className="d-flex flex-wrap gap-3 mb-4">
                                <Button as={Link} to="/register"
                                    className="btn-yellow rounded-pill px-5 py-3 fw-bold hover-lift shadow-lg border-0"
                                    style={{ fontSize: '1.05rem' }}>
                                    <i className="bi bi-person-plus me-2"></i>
                                    Create Free Account
                                </Button>
                                <Button as={Link} to="/contact"
                                    variant="outline-light"
                                    className="rounded-pill px-5 py-3 fw-bold hover-lift border-2"
                                    style={{ fontSize: '1.05rem' }}>
                                    <i className="bi bi-headset me-2"></i>
                                    Talk to Us
                                </Button>
                            </div>
                        </Col>

                        {/* Right Side - Trust & Statistics Card */}
                        <Col lg={5} className="fade-in-right">
                            <Card className="border-0 rounded-4 shadow-lg overflow-hidden bg-white">
                                <div className="position-absolute top-0 start-0 w-100"
                                    style={{ height: '5px', background: 'linear-gradient(90deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                <Card.Body className="p-5">
                                    <div className="text-center mb-4">
                                        <div className="rounded-circle bg-yellow d-inline-flex align-items-center justify-content-center mb-3"
                                            style={{ width: '80px', height: '80px' }}>
                                            <i className="bi bi-award-fill fs-1 text-dark"></i>
                                        </div>
                                        <h4 className="fw-bold text-dark mb-2">Trusted by Thousands</h4>
                                        <p className="text-muted small mb-0">South Africa's fastest-growing delivery platform</p>
                                    </div>

                                    <Row className="g-3 mt-3">
                                        <Col xs={6}>
                                            <div className="text-center p-3 bg-light rounded-3">
                                                <div className="h3 fw-bold text-yellow mb-1">10k+</div>
                                                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                                    Deliveries
                                                </small>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="text-center p-3 bg-light rounded-3">
                                                <div className="h3 fw-bold text-yellow mb-1">99.9%</div>
                                                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                                    On-Time
                                                </small>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="text-center p-3 bg-light rounded-3">
                                                <div className="h3 fw-bold text-yellow mb-1">50+</div>
                                                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                                    Cities
                                                </small>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="text-center p-3 bg-light rounded-3">
                                                <div className="h3 fw-bold text-yellow mb-1">2k+</div>
                                                <small className="text-muted text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                                    Clients
                                                </small>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className="mt-4 p-3 bg-light rounded-3 border-start border-4 border-warning">
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-shield-fill-check text-yellow me-3 fs-4"></i>
                                            <div>
                                                <strong className="text-dark d-block mb-1">100% Secure</strong>
                                                <small className="text-muted">Your data and parcels are protected with enterprise-grade security</small>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .fade-in-left {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }

                .fade-in-right {
                    animation: fadeInRight 0.8s ease-out forwards;
                }

                .max-width-700 { max-width: 700px; }
                
                .hover-lift { 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .hover-lift:hover { 
                    transform: translateY(-8px); 
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
                }

                .hover-scale {
                    transition: transform 0.3s ease;
                }
                .hover-scale:hover { 
                    transform: scale(1.05);
                }

                .shadow-hover {
                    transition: all 0.3s ease;
                }
                .shadow-hover:hover {
                    box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important;
                }
                
                .service-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .service-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
                }

                .hover-bg-yellow:hover { 
                    background-color: var(--brand-yellow) !important;
                    border-color: var(--brand-yellow) !important;
                    color: var(--brand-black) !important;
                }
                
                .bg-yellow { background-color: var(--brand-yellow); }
                .text-yellow { color: var(--brand-yellow); }
                .border-yellow { border-color: var(--brand-yellow) !important; }
                
                .btn-yellow { 
                    background-color: var(--brand-yellow); 
                    color: var(--brand-black); 
                    border: none;
                    transition: all 0.3s ease;
                }
                .btn-yellow:hover {
                    background-color: #e5ab04;
                    color: black;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(250, 187, 5, 0.3);
                }

                .tracking-wider { letter-spacing: 0.1em; }
                .lh-1 { line-height: 1.1; }
                .lh-lg { line-height: 1.8; }
            `}</style>
        </div>
    );
};

export default Services;
