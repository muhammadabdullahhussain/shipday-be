import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import companyBg from '../../assets/shipday_hero_warehouse_new.jpg'; // Reusing a high-quality asset

const About = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const stats = [
        { label: 'Founded', value: '2024' },
        { label: 'Team', value: '120+' },
        { label: 'Hubs', value: '15' },
        { label: 'Growth', value: '300%' }
    ];

    return (
        <div className="font-sans bg-white min-vh-100 theme-transition">
            <div className={`main-content-reveal ${isLoaded ? 'active' : ''}`}>

                {/* 1. CINEMATIC HERO SECTION */}
                <section className="position-relative d-flex align-items-center overflow-hidden" style={{ minHeight: '80vh', background: '#0f172a' }}>
                    {/* Background Elements */}
                    <div className="position-absolute w-100 h-100">
                        <div className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                background: `radial-gradient(circle at 70% 30%, rgba(250, 187, 5, 0.15) 0%, transparent 60%)`
                            }}></div>
                        <div className="position-absolute bottom-0 start-0 w-100 h-100"
                            style={{ background: 'linear-gradient(to top, #0f172a 10%, transparent 100%)' }}></div>

                        {/* Animated Grid */}
                        <div className="grid-overlay opacity-10"></div>
                    </div>

                    <Container className="position-relative z-2 text-center text-lg-start">
                        <Row className="align-items-center">
                            <Col lg={7}>
                                <div className="fade-in-up">
                                    <Badge bg="warning" className="text-dark mb-4 px-3 py-2 fw-black tracking-widest shadow-glow">
                                        EST. 2024
                                    </Badge>
                                    <h1 className="display-1 fw-black text-white mb-4 lh-1" style={{ letterSpacing: '-3px' }}>
                                        Redefining <br />
                                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #fabb05 0%, #ffffff 100%)' }}>
                                            African Courier.
                                        </span>
                                    </h1>
                                    <p className="lead text-white-50 mb-5 max-width-600 block-reveal">
                                        ShipDay is more than a courier service. We are the digital bridge connecting businesses to their future, built on a foundation of technology, speed, and absolute reliability.
                                    </p>
                                    <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                                        <Button as={Link} to="/contact" className="btn-yellow rounded-pill px-5 py-3 fw-bold hover-lift shadow-lg">
                                            Partner With Us
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={5} className="d-none d-lg-block">
                                <div className="position-relative fade-in-left" style={{ animationDelay: '0.3s' }}>
                                    <div className="image-stack-1 rounded-5 overflow-hidden shadow-2xl rotate-3 hover-rotate-0 transition-all">
                                        <img src={companyBg} alt="ShipDay Operations" className="img-fluid" style={{ filter: 'grayscale(100%) contrast(1.2)' }} />
                                    </div>
                                    <div className="position-absolute top-0 end-0 bg-yellow rounded-circle p-4 shadow-lg floating-badge d-flex align-items-center justify-content-center"
                                        style={{ width: '120px', height: '120px', marginTop: '-40px', marginRight: '-40px' }}>
                                        <div className="text-center text-dark lh-1">
                                            <div className="fw-black fs-2">#1</div>
                                            <div className="small fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Choice</div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* 2. LIVE STATS STRIP */}
                <div className="bg-yellow py-5 position-relative z-3 mt-n5 mx-4 rounded-4 shadow-2xl">
                    <Container>
                        <Row className="text-center divide-x-dark">
                            {stats.map((stat, i) => (
                                <Col key={i} xs={6} md={3} className="py-2">
                                    <div className="display-4 fw-black text-dark mb-0 tracking-tighter counter-anim">
                                        {stat.value}
                                    </div>
                                    <div className="text-uppercase fw-bold text-dark opacity-75 small tracking-widest">
                                        {stat.label}
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>

                {/* 3. MISSION & VISION SPLIT */}
                <section className="py-5 bg-white">
                    <Container className="py-5">
                        <Row className="g-5 align-items-center">
                            <Col lg={6} className="order-2 order-lg-1">
                                <div className="pe-lg-5">
                                    <h2 className="display-3 fw-black text-dark mb-4 fade-in-up">Our Mission</h2>
                                    <p className="lead text-muted mb-4 text-justify">
                                        To empower South African commerce with a courier network that is as reliable as it is advanced. We believe in speed, transparency, and the power of connection.
                                    </p>
                                    <p className="text-muted mb-5">
                                        Founded in 2024, ShipDay emerged from a simple need: a courier service that understands the pulse of the local market while operating with global standards. We are building the infrastructure for the next generation of African commerce.
                                    </p>

                                    <div className="p-4 bg-light rounded-4 border-start border-4 border-warning shadow-sm">
                                        <h5 className="fw-bold text-dark mb-3">The ShipDay Standard</h5>
                                        <ul className="list-unstyled mb-0 d-grid gap-3">
                                            {[
                                                "24/7 Operational Hubs",
                                                "Real-time Satellite Tracking",
                                                "99.9% Delivery Success Rate",
                                                "Dedicated Enterprise Support"
                                            ].map((item, i) => (
                                                <li key={i} className="d-flex align-items-center">
                                                    <i className="bi bi-check-circle-fill text-yellow me-3 fs-5"></i>
                                                    <span className="fw-medium text-dark">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6} className="order-1 order-lg-2">
                                <div className="position-relative ps-lg-5 text-center">
                                    <h1 className="display-1 fw-black text-light opacity-25 position-absolute top-50 start-50 translate-middle pointer-events-none"
                                        style={{ fontSize: '15rem', zIndex: 0 }}>
                                        SD
                                    </h1>
                                    <div className="position-relative z-1">
                                        <Card className="border-0 shadow-2xl rounded-5 overflow-hidden bg-dark text-white p-5 text-start hover-scale transition-all">
                                            <i className="bi bi-quote display-1 text-yellow opacity-50 mb-3"></i>
                                            <h3 className="fw-bold lh-base mb-4">
                                                "We don't just deliver packages. We deliver promises, deadlines, and the future of your business."
                                            </h3>
                                            <div className="d-flex align-items-center mt-auto">
                                                <div className="rounded-circle bg-yellow me-3" style={{ width: '50px', height: '50px' }}></div>
                                                <div>
                                                    <div className="fw-bold">Muhammad Abdullah</div>
                                                    <div className="text-white-50 small">Founder & CEO</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* 4. CORE VALUES - GLASS CARDS */}
                <section className="py-5 bg-dark position-relative overflow-hidden">
                    <div className="position-absolute top-0 end-0 w-50 h-100 bg-gradient-to-l from-yellow-opacity to-transparent"></div>
                    <Container className="py-5 position-relative z-1">
                        <div className="text-center mb-5">
                            <Badge bg="light" className="text-dark mb-3 px-3 py-2 fw-bold tracking-widest">DNA</Badge>
                            <h2 className="display-3 fw-black text-white mb-4">Core <span className="text-yellow">Values</span></h2>
                        </div>
                        <Row className="g-4">
                            {[
                                { title: 'Speed', icon: 'bi-lightning-charge', desc: 'We move fast so your business moves faster.' },
                                { title: 'Integrity', icon: 'bi-shield-check', desc: 'Transparency in every mile, honesty in every interaction.' },
                                { title: 'Innovation', icon: 'bi-cpu', desc: 'Merging physical courier services with digital intelligence.' },
                                { title: 'Customer Obsession', icon: 'bi-heart', desc: 'Your success is the only metric that matters.' }
                            ].map((val, i) => (
                                <Col md={6} lg={3} key={i}>
                                    <Card className="h-100 border-0 bg-white bg-opacity-10 backdrop-blur rounded-4 hover-lift transition-all p-2">
                                        <Card.Body className="text-center text-white p-4">
                                            <div className="rounded-circle bg-yellow d-inline-flex align-items-center justify-content-center mb-4 shadow-glow"
                                                style={{ width: '70px', height: '70px' }}>
                                                <i className={`bi ${val.icon} fs-2 text-dark`}></i>
                                            </div>
                                            <h4 className="fw-bold mb-3">{val.title}</h4>
                                            <p className="text-white-50 small mb-0">{val.desc}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                {/* 5. CTA SECTION */}
                <section className="py-5 bg-white">
                    <Container className="py-5 text-center">
                        <div className="max-width-800 mx-auto">
                            <h2 className="display-4 fw-black text-dark mb-4">Ready to move?</h2>
                            <p className="lead text-muted mb-5">
                                Join the courier revolution. Experience the ShipDay difference today.
                            </p>
                            <Button as={Link} to="/register" className="btn-yellow rounded-pill px-5 py-3 fw-bold shadow-lg hover-scale">
                                Create an Account <i className="bi bi-arrow-right ms-2"></i>
                            </Button>
                        </div>
                    </Container>
                </section>
            </div>

            <style>{`
                .theme-transition { transition: opacity 0.5s ease; }
                .main-content-reveal { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; }
                .main-content-reveal.active { opacity: 1; transform: translateY(0); }
                
                .fw-black { font-weight: 900; }
                .tracking-widest { letter-spacing: 0.2em; }
                .tracking-tighter { letter-spacing: -0.05em; }
                .text-justify { text-align: justify; }
                
                .grid-overlay {
                    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                    width: 100%;
                    height: 100%;
                }
                
                .btn-yellow {
                    background: #fabb05;
                    color: #0f172a;
                    border: none;
                    transition: all 0.3s ease;
                }
                .btn-yellow:hover {
                    background: #e5ab04;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(250, 187, 5, 0.4);
                }
                
                .hover-lift:hover { transform: translateY(-10px); }
                .hover-scale:hover { transform: scale(1.05); }
                .hover-rotate-0:hover { transform: rotate(0deg) !important; }
                .rotate-3 { transform: rotate(3deg); }
                
                .shadow-glow { box-shadow: 0 0 30px rgba(250, 187, 5, 0.3); }
                .backdrop-blur { backdrop-filter: blur(10px); }
                
                .floating-badge { animation: float 6s ease-in-out infinite; }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
            `}</style>
        </div>
    );
};

export default About;
