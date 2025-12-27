import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/shipday_logo.jpg';

const PublicNavbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <Navbar
            expand="lg"
            fixed="top"
            className={`transition-all py-3 bg-white border-bottom ${scrolled ? 'shadow-sm' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out', borderColor: '#e5e7eb' }}
        >
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="p-0">
                    <div className="glass-ribbon-container position-relative d-flex align-items-center"
                        style={{
                            height: '75px',
                            padding: '0 40px 0 20px',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                        {/* Glass Ribbon Background */}
                        <div className="position-absolute top-50 start-0 translate-middle-y w-100 backdrop-blur-md rounded-pill"
                            style={{
                                height: '70%',
                                background: 'rgba(255, 255, 255, 0.7)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                zIndex: 1,
                                transition: 'all 0.4s ease'
                            }}></div>

                        {/* Interactive Sparkle Aura */}
                        <div className="position-absolute top-50 start-50 translate-middle rounded-circle opacity-0 transition-all duration-500"
                            style={{
                                width: '150px',
                                height: '150px',
                                background: 'radial-gradient(circle, rgba(250, 187, 5, 0.2) 0%, transparent 70%)',
                                zIndex: 0
                            }}></div>

                        <div className="position-relative d-flex align-items-center gap-3" style={{ zIndex: 2 }}>
                            <img
                                src={logo}
                                alt="ShipDay"
                                style={{
                                    height: '42px',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    mixBlendMode: 'multiply',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))'
                                }}
                            />
                            <div className="d-flex flex-column pt-1">
                                <span className="fw-black text-dark lh-1" style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>SHIPDAY</span>
                                <div className="d-flex align-items-center gap-1 mt-1">
                                    <span className="text-muted fw-bold" style={{ fontSize: '0.55rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Premium Logistics</span>
                                    <span className="dot-pulse-yellow rounded-circle" style={{ width: '4px', height: '4px', background: '#fabb05' }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="public-navbar-nav" className="border-0 shadow-none focus-ring-0" />

                <Navbar.Collapse id="public-navbar-nav">
                    <Nav className="mx-auto mb-2 mb-lg-0 fw-medium p-1 bg-light rounded-pill border">
                        <Nav.Link as={Link} to="/" className={`px-4 py-2 rounded-pill ${isActive('/') ? 'bg-yellow text-black shadow-sm' : 'text-dark opacity-75 hover-text-yellow'}`}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/send-parcel" className={`px-4 py-2 rounded-pill ${isActive('/send-parcel') ? 'bg-yellow text-black shadow-sm' : 'text-dark opacity-75 hover-text-yellow'}`}>Send Parcel</Nav.Link>
                        <Nav.Link as={Link} to="/services" className={`px-4 py-2 rounded-pill ${isActive('/services') ? 'bg-yellow text-black shadow-sm' : 'text-dark opacity-75 hover-text-yellow'}`}>Services</Nav.Link>
                        <Nav.Link as={Link} to="/tracking" className={`px-4 py-2 rounded-pill ${isActive('/tracking') ? 'bg-yellow text-black shadow-sm' : 'text-dark opacity-75 hover-text-yellow'}`}>Tracking</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className={`px-4 py-2 rounded-pill ${isActive('/contact') ? 'bg-yellow text-black shadow-sm' : 'text-dark opacity-75 hover-text-yellow'}`}>Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex gap-3">
                        <Button as={Link} to="/login" variant="outline-dark" className="rounded-pill px-4 border-2 fw-bold" style={{ fontSize: '0.9rem' }}>
                            Login
                        </Button>
                        <Button as={Link} to="/register" className="btn-yellow rounded-pill px-4 fw-bold shadow-sm" style={{ fontSize: '0.9rem' }}>
                            Get Started
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
            <style>{`
                .glass-ribbon-container:hover {
                    padding-left: 30px !important;
                    padding-right: 50px !important;
                }
                .glass-ribbon-container:hover > div:first-child {
                    background: rgba(255, 255, 255, 0.9) !important;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.08) !important;
                    height: 85% !important;
                }
                .glass-ribbon-container:hover > div:nth-child(2) {
                    opacity: 1 !important;
                    transform: translate(-50%, -50%) scale(1.2) !important;
                }
                
                @keyframes dot-pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(2); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .dot-pulse-yellow { animation: dot-pulse 2s infinite ease-in-out; }

                .fw-black { font-weight: 900 !important; }
                .hover-text-yellow:hover { color: var(--brand-yellow) !important; opacity: 1 !important; }
                .bg-yellow { background-color: var(--brand-yellow) !important; }
                .focus-ring-0:focus { box-shadow: none !important; }
            `}</style>
        </Navbar>
    );
};

export default PublicNavbar;
