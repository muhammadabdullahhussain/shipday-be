import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bgHero from '../../assets/shipday_tracking_hero.png';

const TrackingPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        if (trackingId) {
            setResult({
                status: 'In Transit',
                location: 'Johannesburg Distribution Hub',
                date: 'Updated 2 mins ago',
                waybill: trackingId.toUpperCase(),
                history: [
                    { status: 'Sender Despatched', location: 'Commercial District, Sandton', date: 'Dec 26, 14:00', done: true, icon: 'bi-box-arrow-up' },
                    { status: 'In Hub Sorting', location: 'Johannesburg Main Facility', date: 'Dec 26, 18:30', done: true, icon: 'bi-building-down' },
                    { status: 'En Route', location: 'National Highway N1 - Southbound', date: 'Dec 27, 06:00', done: true, icon: 'bi-truck' },
                    { status: 'Local Distribution', location: 'Cape Town Logistics Center', date: 'Expected today', done: false, icon: 'bi-geo-alt' },
                    { status: 'Final Delivery', location: 'Destination Address', date: 'Pending', done: false, icon: 'bi-house-check' },
                ]
            });
        }
    };

    return (
        <div className="font-sans bg-white min-vh-100 overflow-hidden">
            {/* 1. HEAVY HERO SECTION */}
            <section className="position-relative d-flex align-items-center text-white overflow-hidden py-5"
                style={{
                    minHeight: '85vh',
                }}>
                {/* Background Image with Fixed Effect */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(${bgHero})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        filter: 'brightness(0.35)'
                    }}></div>

                {/* Heavy Gradient Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95) 30%, rgba(15, 23, 42, 0.4) 100%)' }}></div>

                <Container className="position-relative z-1 py-5">
                    <Row className="align-items-center">
                        <Col lg={7} className="fade-in-up">
                            <Badge bg="warning" className="text-dark mb-4 px-4 py-2 fw-black tracking-widest shadow-lg pulse-badge">
                                <i className="bi bi-shield-lock-fill me-2"></i>
                                MILITARY-GRADE TRACKING
                            </Badge>
                            <h1 className="display-2 fw-black mb-4 text-white lh-1" style={{ letterSpacing: '-3px' }}>
                                Precision in every <br />
                                <span className="text-yellow glow-text">transit mile.</span>
                            </h1>
                            <p className="lead mb-5 text-white-50 fw-bold text-uppercase tracking-wider" style={{ fontSize: '0.9rem' }}>
                                Enter your waybill to unlock real-time intelligence:
                            </p>

                            <Card className="border-0 shadow-2xl rounded-pill p-1 glass-card-enhanced mb-5 overflow-hidden"
                                style={{ maxWidth: '600px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <Form onSubmit={handleTrack} className="d-flex align-items-center">
                                    <div className="ps-4 text-yellow opacity-75">
                                        <i className="bi bi-qr-code-scan fs-4"></i>
                                    </div>
                                    <Form.Control
                                        className="border-0 bg-transparent ps-3 py-4 fw-bold shadow-none text-white placeholder-light"
                                        placeholder="SD-XXXX-XXXX"
                                        value={trackingId}
                                        onChange={e => setTrackingId(e.target.value)}
                                        style={{ fontSize: '1.2rem' }}
                                    />
                                    <Button type="submit" className="btn-yellow rounded-pill px-5 fw-black m-1 h-auto py-3 border-0 transition-all hover-lift position-relative overflow-hidden btn-glow">
                                        <span className="position-relative z-1">TRACK NOW</span>
                                        <div className="btn-shine"></div>
                                    </Button>
                                </Form>
                            </Card>

                            <div className="d-flex flex-wrap gap-5 pt-4 border-top border-light border-opacity-10">
                                {[
                                    { label: 'SLA COMPLIANCE', value: '100%', icon: 'bi-check-all' },
                                    { label: 'GLOBAL NETWORK', value: '24/7', icon: 'bi-broadcast-pin' },
                                    { label: 'GPS ACCURACY', value: '0.5m', icon: 'bi-crosshair' }
                                ].map((stat, i) => (
                                    <div key={i} className="d-flex align-items-center">
                                        <div className="rounded-circle bg-yellow bg-opacity-10 p-2 me-3 border border-yellow border-opacity-25">
                                            <i className={`bi ${stat.icon} text-yellow`}></i>
                                        </div>
                                        <div>
                                            <div className="h4 fw-black mb-0 text-white">{stat.value}</div>
                                            <div className="text-white-50 fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 2. ELITE NETWORK SPIRIT */}
            <section className="py-5 bg-white">
                <Container className="py-5">
                    <Row className="align-items-center g-5">
                        <Col lg={6} className="fade-in-up">
                            <div className="position-relative">
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-yellow opacity-10 rounded-5 rotate-3" style={{ zIndex: -1 }}></div>
                                <div className="p-5 bg-dark rounded-5 shadow-2xl floating-card overflow-hidden position-relative">
                                    <div className="position-absolute top-0 end-0 p-4 opacity-10 text-white">
                                        <i className="bi bi-shield-fill-check display-1"></i>
                                    </div>
                                    <Badge bg="warning" className="text-dark mb-4 fw-black">GLOBAL STANDARDS</Badge>
                                    <h3 className="display-6 fw-black text-white mb-4">World-class delivery, <br /><span className="text-yellow">local soul.</span></h3>
                                    <p className="text-white-50 lead mb-5">
                                        We unify South Africa's vibrant energy with international logistical precision. From urban hubs to the furthest horizons, ShipDay simplifies the complex.
                                    </p>
                                    <Button as={Link} to="/services" variant="outline-light" className="rounded-pill px-4 py-2 fw-bold border-2 glass-hover">
                                        Explore Network <i className="bi bi-arrow-up-right-circle ms-2"></i>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="ps-lg-5">
                            <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <small className="text-yellow fw-black text-uppercase tracking-widest mb-3 d-block">THE SHIPDAY PROMISE</small>
                                <h2 className="display-4 fw-black text-dark mb-4 lh-1">The bridge between <span className="text-yellow">you and yours.</span></h2>
                                <p className="text-muted lead mb-5">
                                    Your parcels aren't just boxes; they're commitments. We provide the most resilient bridge for your goods, monitored by military-grade GPS systems.
                                </p>
                                <Row className="g-4">
                                    {[
                                        { title: 'Local Expertise', desc: 'Masters of the South African landscape.' },
                                        { title: 'National Scale', desc: 'Seamlessly connecting all major provinces.' },
                                        { title: 'International Grade', desc: 'Technology that meets global benchmarks.' }
                                    ].map((box, i) => (
                                        <Col md={12} key={i}>
                                            <div className="d-flex align-items-center p-3 rounded-4 bg-light hover-lift transition-all border-start border-4 border-yellow">
                                                <i className="bi bi-circle-fill text-yellow me-3" style={{ fontSize: '0.5rem' }}></i>
                                                <div>
                                                    <span className="fw-black text-dark d-block">{box.title}</span>
                                                    <small className="text-muted">{box.desc}</small>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 3. PACKAGING EXCELLENCE */}
            <section className="py-5 bg-dark border-top border-bottom border-light border-opacity-10 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <Container className="py-5 position-relative">
                    <div className="position-absolute top-50 start-50 translate-middle opacity-5" style={{ zIndex: 0 }}>
                        <i className="bi bi-box-seam display-1" style={{ fontSize: '20rem' }}></i>
                    </div>
                    <div className="text-center position-relative z-1 fade-in-up">
                        <Badge bg="warning" className="text-dark mb-4 px-4 py-2 fw-black tracking-widest">GUARDED SHIPMENT</Badge>
                        <h2 className="display-4 fw-black text-white mb-4">Pack it right, <span className="text-yellow">rest easy.</span></h2>
                        <p className="text-white-50 lead mb-5 mx-auto max-width-800">
                            Our proprietary guidelines ensure your cargo withstands any journey. We provide the tools, you provide the trust.
                            100% damage-free delivery starts with a perfect wrap.
                        </p>
                        <div className="d-flex flex-wrap justify-content-center gap-4">
                            <Button className="btn-yellow rounded-pill px-5 py-4 fw-black hover-lift transition-all btn-glow shadow-2xl">
                                <i className="bi bi-file-earmark-pdf-fill me-2"></i> DOWNLOAD GUIDE
                            </Button>
                            <Button variant="outline-light" className="rounded-pill px-5 py-4 fw-bold glass-hover border-2 border-white border-opacity-25 shadow-lg">
                                ORDER MATERIALS
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* 4. COVERAGE & INFRASTRUCTURE - PREMIUM REDESIGN */}
            <section className="py-5 position-relative overflow-hidden" 
                style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' }}>
                
                {/* Subtle Geometric Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5" style={{ zIndex: 0, pointerEvents: 'none' }}>
                    <div className="position-absolute" style={{ top: '10%', left: '5%', width: '300px', height: '300px', border: '2px solid #0f172a', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
                    <div className="position-absolute" style={{ bottom: '10%', right: '5%', width: '400px', height: '400px', border: '2px solid #fabb05', borderRadius: '50% 50% 20% 80% / 25% 80% 20% 75%' }}></div>
                </div>

                <Container className="py-5 position-relative z-1">
                    <div className="text-center mb-5 fade-in-up">
                        <Badge bg="warning" className="text-dark mb-3 px-3 py-2 fw-black tracking-widest shadow-sm">PHYSICAL INFRASTRUCTURE</Badge>
                        <h2 className="display-4 fw-black text-dark mb-3">
                            Nationwide bridges <span className="text-yellow">at every scale.</span>
                        </h2>
                        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                            Our assets are the backbone of South Africa's most resilient delivery network, engineered for absolute reliability.
                        </p>
                    </div>

                    <Row className="g-4">
                        {[
                            { 
                                title: 'ELITE DIRECT', 
                                icon: 'bi-truck-flatbed', 
                                desc: 'Dedicated B2B and retail solutions with priority handling.', 
                                btn: 'Direct Service',
                                color: '#fabb05'
                            },
                            { 
                                title: 'SMART LOCKER', 
                                icon: 'bi-safe-fill', 
                                desc: '24/7 contactless pickup through our secure national network.', 
                                btn: 'Find Locker',
                                color: '#0f172a'
                            },
                            { 
                                title: 'KIOSK HUBS', 
                                icon: 'bi-shop', 
                                desc: 'High-visibility drop-off points in every major commercial district.', 
                                btn: 'Locate Hub',
                                color: '#fabb05'
                            },
                            { 
                                title: 'HEAVY FLEET', 
                                icon: 'bi-speedometer2', 
                                desc: 'High-velocity line-haul transit for heavy and bulk shipments.', 
                                btn: 'Fleet Tracking',
                                color: '#0f172a'
                            }
                        ].map((serv, i) => (
                            <Col lg={3} md={6} key={i} className="fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                <Card className="border-0 rounded-5 h-100 overflow-hidden shadow-2xl hover-lift transition-all bg-white group border-top border-4" 
                                    style={{ borderColor: serv.color === '#fabb05' ? '#fabb05' : '#0f172a' }}>
                                    <Card.Body className="p-4 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                                                style={{ 
                                                    width: '60px', 
                                                    height: '60px', 
                                                    backgroundColor: serv.color === '#fabb05' ? 'rgba(250, 187, 5, 0.1)' : 'rgba(15, 23, 42, 0.05)',
                                                    border: serv.color === '#fabb05' ? '1px solid rgba(250, 187, 5, 0.2)' : '1px solid rgba(15, 23, 42, 0.1)'
                                                }}>
                                                <i className={`bi ${serv.icon} fs-3`} style={{ color: serv.color === '#fabb05' ? '#e5ab04' : '#0f172a' }}></i>
                                            </div>
                                            <div className="ms-3 h-100 d-flex flex-column justify-content-center">
                                                <Badge bg="light" className="text-dark border p-1 px-2 mb-1" style={{ fontSize: '0.6rem' }}>ACTIVE</Badge>
                                            </div>
                                        </div>
                                        
                                        <h5 className="fw-black text-dark mb-3 tracking-tighter" style={{ fontSize: '1.25rem' }}>{serv.title}</h5>
                                        <p className="text-muted small mb-4 lh-base" style={{ fontSize: '0.9rem' }}>{serv.desc}</p>
                                        
                                        <Button className="w-100 rounded-pill py-2 fw-black mt-auto border-0 shadow-sm transition-all position-relative overflow-hidden"
                                            style={{ 
                                                backgroundColor: serv.color === '#fabb05' ? '#fabb05' : '#0f172a',
                                                color: serv.color === '#fabb05' ? '#0f172a' : '#fff'
                                            }}>
                                            <span className="position-relative z-1">{serv.btn}</span>
                                            {serv.color === '#fabb05' && <div className="btn-shine"></div>}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* MODERN TRACKING OVERLAY */}
            {result && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center px-3 py-5"
                    style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        zIndex: 2000,
                        backdropFilter: 'blur(10px)',
                        overflowY: 'auto',
                        alignItems: 'start'
                    }}>
                    <Container style={{ maxWidth: '950px' }}>
                        <Card className="border-0 shadow-2xl rounded-5 overflow-hidden bg-white fade-in-up my-auto">
                            <div className="p-4 p-md-5 position-relative">
                                <button className="btn-close position-absolute top-0 end-0 m-4 shadow-none border-0 bg-yellow rounded-circle p-3 z-3"
                                    onClick={() => setResult(null)}></button>

                                <Row className="align-items-center mb-5 g-4">
                                    <Col md={7}>
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="p-3 bg-yellow rounded-4">
                                                <i className="bi bi-box-seam-fill fs-3 text-dark"></i>
                                            </div>
                                            <div>
                                                <h3 className="fw-black mb-0 text-dark">WAYBILL {result.waybill}</h3>
                                                <Badge bg="warning" className="text-dark rounded-pill px-3 py-1 fw-bold tracking-widest mt-1">
                                                    LIVE FEED: IN TRANSIT
                                                </Badge>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={5} className="text-md-end">
                                        <div className="bg-light p-4 rounded-5 border border-dark border-opacity-10">
                                            <small className="text-muted d-block text-uppercase fw-black mb-1 tracking-widest" style={{ fontSize: '0.6rem' }}>INTELLIGENCE NODE</small>
                                            <span className="fw-black text-dark fs-5">{result.location}</span>
                                            <p className="text-yellow fw-bold small mb-0 mt-2"><i className="bi bi-check2-circle"></i> {result.date}</p>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="position-relative ps-4 ps-md-5">
                                    <div className="position-absolute h-100 bg-light-dark opacity-10" style={{ width: '4px', left: '26px', top: '0', background: '#0f172a' }}></div>
                                    {result.history.map((step, idx) => (
                                        <div key={idx} className="position-relative ps-5 pb-5 last-no-pb">
                                            <div
                                                className={`position-absolute top-0 rounded-circle shadow-lg d-flex align-items-center justify-content-center pulse-icon
                                                ${step.done ? 'bg-yellow text-dark' : 'bg-light text-muted border'}`}
                                                style={{ width: '44px', height: '44px', left: '-22px', zIndex: 10, border: step.done ? '4px solid white' : '4px solid #f8f9fa' }}
                                            >
                                                <i className={`bi ${step.icon} fs-5`}></i>
                                            </div>
                                            <Row className="align-items-center">
                                                <Col xs={12} md={5}>
                                                    <h5 className={`fw-black mb-1 ${step.done ? 'text-dark' : 'text-muted opacity-50'}`}>{step.status}</h5>
                                                    <small className="text-yellow fw-black tracking-wider text-uppercase" style={{ fontSize: '0.7rem' }}>{step.date}</small>
                                                </Col>
                                                <Col xs={12} md={7}>
                                                    <p className={`mb-0 fw-bold ${step.done ? 'text-muted' : 'text-light opacity-25'}`} style={{ fontSize: '0.9rem' }}>
                                                        <i className="bi bi-geo-alt-fill me-2 text-yellow"></i> {step.location}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-dark p-4 d-flex justify-content-between align-items-center border-top border-light border-opacity-10">
                                <div className="text-white-50 small fw-bold"><i className="bi bi-info-circle me-2"></i> Powered by ShipDay OS v2.0</div>
                                <Button className="btn-yellow px-5 py-3 fw-black rounded-pill shadow-2xl border-0 overflow-hidden position-relative btn-glow"
                                    onClick={() => handleTrack({ preventDefault: () => { } })}>
                                    <span className="position-relative z-1">REFRESH LIVE DATA</span>
                                    <div className="btn-shine"></div>
                                </Button>
                            </div>
                        </Card>
                    </Container>
                </div>
            )}

            <style>{`
                .fw-black { font-weight: 900 !important; }
                .tracking-widest { letter-spacing: 0.2em; }
                .tracking-wider { letter-spacing: 0.1em; }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important; }
                .shadow-glow { text-shadow: 0 0 15px rgba(250, 187, 5, 0.5); }
                .glow-text { text-shadow: 0 0 30px rgba(250, 187, 5, 0.6); }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }

                .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
                .pulse-badge { animation: pulse 2s ease-in-out infinite; }
                .pulse-icon { animation: pulse 3s ease-in-out infinite; }
                .floating-card { animation: float 6s ease-in-out infinite; }
                
                .btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-25deg);
                    animation: shine 3s infinite;
                }

                .btn-glow:hover {
                    box-shadow: 0 0 30px rgba(250, 187, 5, 0.7);
                }

                .glass-card-enhanced {
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                }

                .glass-hover {
                    transition: all 0.3s ease;
                }
                .glass-hover:hover {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                }

                .hover-lift { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .hover-lift:hover { transform: translateY(-8px); }

                .btn-yellow {
                    background-color: #fabb05;
                    color: #0f172a;
                    border: none;
                }
                .btn-yellow:hover {
                    background-color: #e5ab04;
                    color: #000;
                    transform: translateY(-2px);
                }

                .text-yellow { color: #fabb05 !important; }
                .rotate-3 { transform: rotate(3deg); }
                .last-no-pb:last-child { padding-bottom: 0 !important; }

                .placeholder-light::placeholder {
                    color: rgba(255,255,255,0.5);
                }
            `}</style>
        </div>
    );
};

export default TrackingPage;
