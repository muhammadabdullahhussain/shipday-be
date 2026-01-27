import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import bgHero from '../../assets/shipday_tracking_hero.png';
import GuideModal from '../../components/public/GuideModal';

const TrackingPage = () => {
    const [searchParams] = useSearchParams();
    const urlId = searchParams.get('id');
    const [trackingId, setTrackingId] = useState(urlId || '');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showGuideModal, setShowGuideModal] = useState(false);

    // Auto load if ID exists
    useEffect(() => {
        if (urlId) {
            handleTrack({ preventDefault: () => { } });
        }
    }, [urlId]);

    const handleTrack = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const idToTrack = trackingId || urlId;

        if (!idToTrack) {
            toast.error("Please enter a tracking number");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/shipments/track/${idToTrack}`);
            setResult(response.data.shipment);
            toast.success("Shipment data synchronized");
        } catch (error) {
            console.error("Tracking error:", error);
            const message = error.response?.data?.message || "Shipment not found or server error";
            toast.error(message);
            setResult(null);
        } finally {
            setLoading(false);
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
                    <Row className="justify-content-center text-center">
                        <Col lg={10} xl={8} className="fade-in-up">
                            <Badge bg="warning" className="text-dark mb-4 px-4 py-2 fw-black tracking-widest shadow-lg pulse-badge">
                                <i className="bi bi-shield-lock-fill me-2"></i>
                                MILITARY-GRADE TRACKING
                            </Badge>
                            <h1 className="display-2 fw-black mb-4 text-white lh-1" style={{ letterSpacing: '-3px' }}>
                                Precision in every <br />
                                <span className="text-yellow glow-text">transit mile.</span>
                            </h1>
                            <p className="lead mb-5 text-white-50 fw-bold text-uppercase tracking-wider mx-auto" style={{ fontSize: '0.9rem', maxWidth: '600px' }}>
                                Enter your waybill to unlock real-time intelligence:
                            </p>

                            <Card className="border-0 shadow-2xl rounded-pill p-1 glass-card-enhanced mb-5 overflow-hidden mx-auto"
                                style={{ maxWidth: '650px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)' }}>
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
                                    <Button type="submit" disabled={loading} className="btn-yellow rounded-pill px-5 fw-black m-1 h-auto py-3 border-0 transition-all hover-lift position-relative overflow-hidden btn-glow">
                                        <span className="position-relative z-1">{loading ? 'SCANNING...' : 'TRACK NOW'}</span>
                                        <div className="btn-shine"></div>
                                    </Button>
                                </Form>
                            </Card>

                            <div className="d-flex flex-wrap justify-content-center gap-5 pt-4 border-top border-light border-opacity-10">
                                {[
                                    { label: 'SLA COMPLIANCE', value: '100%', icon: 'bi-check-all' },
                                    { label: 'GLOBAL NETWORK', value: '24/7', icon: 'bi-broadcast-pin' },
                                    { label: 'GPS ACCURACY', value: '0.5m', icon: 'bi-crosshair' }
                                ].map((stat, i) => (
                                    <div key={i} className="d-flex align-items-center">
                                        <div className="rounded-circle bg-yellow bg-opacity-10 p-2 me-3 border border-yellow border-opacity-25">
                                            <i className={`bi ${stat.icon} text-yellow`}></i>
                                        </div>
                                        <div className="text-start">
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
                            <Button
                                className="btn-yellow rounded-pill px-5 py-4 fw-black hover-lift transition-all btn-glow shadow-2xl"
                                onClick={() => setShowGuideModal(true)}
                            >
                                <i className="bi bi-file-earmark-pdf-fill me-2"></i> DOWNLOAD GUIDE
                            </Button>
                            <Button variant="outline-light" className="rounded-pill px-5 py-4 fw-bold glass-hover border-2 border-white border-opacity-25 shadow-lg" as="a" href="tel:0100014421">
                                ORDER MATERIALS (010 001 4421)
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
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center px-4 py-5"
                    style={{
                        backgroundColor: 'rgba(2, 4, 8, 0.85)', // Cinematic dark overlay
                        zIndex: 2000,
                        backdropFilter: 'blur(12px)',
                    }}>
                    <Container style={{ maxWidth: '1000px' }} className="fade-in-up">
                        <Card className="border-0 shadow-2xl rounded-5 overflow-hidden"
                            style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <Card.Body className="p-0">
                                <Row className="g-0">
                                    {/* LEFT: STATUS DASHBOARD */}
                                    <Col lg={5} className="p-5 position-relative overflow-hidden d-flex flex-column text-white"
                                        style={{
                                            background: 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)',
                                            borderRight: '1px solid rgba(255,255,255,0.05)'
                                        }}>

                                        {/* Background Pattern */}
                                        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5"
                                            style={{
                                                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                                                backgroundSize: '24px 24px'
                                            }}></div>

                                        {/* Content */}
                                        <div className="position-relative z-1 h-100 d-flex flex-column">
                                            <div className="d-flex align-items-center gap-3 mb-5">
                                                <div className="rounded-4 d-flex align-items-center justify-content-center bg-yellow text-dark fw-bold shadow-lg"
                                                    style={{ width: '48px', height: '48px' }}>
                                                    <i className="bi bi-box-seam-fill fs-5"></i>
                                                </div>
                                                <div>
                                                    <small className="text-white-50 fw-bold tracking-widest text-uppercase d-block" style={{ fontSize: '0.65rem' }}>WAYBILL ID</small>
                                                    <div className="fw-black text-white h3 mb-0 tracking-tight">{result.trackingNumber}</div>
                                                </div>
                                            </div>

                                            <div className="mb-auto">
                                                <div className="p-4 rounded-4 bg-black bg-opacity-20 border border-white border-opacity-5 mb-4">
                                                    <div className="d-flex justify-content-between align-items-end mb-4">
                                                        <div>
                                                            <small className="text-yellow fw-bold tracking-widest text-uppercase d-block mb-1" style={{ fontSize: '0.6rem' }}>ORIGIN</small>
                                                            <span className="fw-bold fs-5 text-white">{result.history[0]?.location || 'Origin Station'}</span>
                                                        </div>
                                                        <div className="text-white-50 mb-1"><i className="bi bi-arrow-right fs-5"></i></div>
                                                        <div className="text-end">
                                                            <small className="text-yellow fw-bold tracking-widest text-uppercase d-block mb-1" style={{ fontSize: '0.6rem' }}>DESTINATION</small>
                                                            <span className="fw-bold fs-5 text-white">{result.history[result.history.length - 1]?.location || 'In Transit'}</span>
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="position-relative pt-2">
                                                        <div className="d-flex justify-content-between text-white-50 x-small fw-bold mb-2">
                                                            <span>Progress</span>
                                                            <span>{result.status === 'Delivered' ? '100%' : 'In Transit'}</span>
                                                        </div>
                                                        <div className="h-2 w-100 bg-white bg-opacity-10 rounded-pill overflow-hidden" style={{ height: '6px' }}>
                                                            <div className="h-100 bg-yellow position-relative" style={{ width: result.status === 'Delivered' ? '100%' : '65%' }}>
                                                                <div className="position-absolute top-0 end-0 h-100 w-100 bg-white opacity-25" style={{ animation: 'shimmer 2s infinite linear', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Row className="g-3">
                                                    <Col xs={6}>
                                                        <div className="p-3 rounded-4 bg-black bg-opacity-20 border border-white border-opacity-5 text-center">
                                                            <i className="bi bi-calendar-event text-white-50 mb-2 d-block"></i>
                                                            <small className="text-white-50 d-block text-uppercase fw-bold mb-0" style={{ fontSize: '0.6rem' }}>Est. Arrival</small>
                                                            <span className="fw-bold text-white small">End of Day</span>
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="p-3 rounded-4 bg-black bg-opacity-20 border border-white border-opacity-5 text-center">
                                                            <i className="bi bi-box text-white-50 mb-2 d-block"></i>
                                                            <small className="text-white-50 d-block text-uppercase fw-bold mb-0" style={{ fontSize: '0.6rem' }}>Weight</small>
                                                            <span className="fw-bold text-white small">2.5 KG</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="mt-4 pt-4 border-top border-white border-opacity-10">
                                                <div className="d-flex align-items-center gap-3 text-white-50 x-small">
                                                    <div className="spinner-grow spinner-grow-sm text-success" role="status"></div>
                                                    <span className="tracking-widest fw-bold text-uppercase">Live Satellite Link Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    {/* RIGHT: TIMELINE */}
                                    <Col lg={7} className="bg-white position-relative">
                                        <button className="btn-close position-absolute top-0 end-0 m-4 z-3 p-2 bg-light rounded-circle" onClick={() => setResult(null)}></button>

                                        <div className="p-5 h-100 d-flex flex-column">
                                            <h4 className="fw-black text-dark mb-5 tracking-tight px-2">Shipment Journey</h4>

                                            <div className="position-relative ps-2 flex-grow-1 overflow-auto" style={{ maxHeight: '500px' }}>
                                                {/* Vertical Line */}
                                                <div className="position-absolute h-100 bg-light opacity-50"
                                                    style={{ width: '2px', left: '23px', top: '10px', height: 'calc(100% - 20px)' }}></div>

                                                {result.history.map((step, idx) => (
                                                    <div key={idx} className="d-flex position-relative mb-5 last-no-mb group">
                                                        {/* Node */}
                                                        <div className={`
                                                            z-2 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 transition-all border
                                                            ${step.done ? 'bg-dark text-yellow shadow-lg scale-105 border-dark' : 'bg-white text-muted border-light-subtle'}
                                                        `} style={{ width: '48px', height: '48px' }}>
                                                            <i className={`bi ${step.icon} fs-5`}></i>
                                                        </div>

                                                        {/* Text */}
                                                        <div className="ms-4 pt-1 w-100">
                                                            <div className="d-flex justify-content-between align-items-start">
                                                                <div>
                                                                    <h6 className={`fw-black mb-1 text-uppercase tracking-wide ${step.done ? 'text-dark' : 'text-muted'}`}>
                                                                        {step.status}
                                                                    </h6>
                                                                    <p className="mb-0 text-muted small fw-medium">{step.location}</p>
                                                                </div>
                                                                <div className="text-end">
                                                                    <span className={`badge rounded-pill ${step.done ? 'bg-light text-dark border' : 'text-light-50'} fw-bold px-3 py-2 x-small`}>
                                                                        {step.done ? (new Date(step.date).toLocaleDateString()) : 'Pending'}
                                                                    </span>
                                                                    {step.done && <div className="text-muted x-small mt-1 fw-bold">{new Date(step.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 pt-4 border-top">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="nav-link text-muted x-small fw-bold text-uppercase p-0">
                                                        <i className="bi bi-shield-check me-2"></i> Verified Route
                                                    </div>
                                                    <Button variant="link" className="text-dark fw-black text-decoration-none p-0 d-flex align-items-center gap-2 hover-opacity"
                                                        onClick={() => handleTrack({ preventDefault: () => { } })}>
                                                        REFRESH DATA <i className="bi bi-arrow-repeat"></i>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            )}

            <GuideModal
                show={showGuideModal}
                onHide={() => setShowGuideModal(false)}
            />

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
        </div >
    );
};

export default TrackingPage;
