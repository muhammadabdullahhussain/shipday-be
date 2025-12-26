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
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="ShipDay"
                        height="60"
                        className="me-2"
                        style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="public-navbar-nav" className="border-0 shadow-none focus-ring-0" />

                <Navbar.Collapse id="public-navbar-nav">
                    <Nav className="mx-auto mb-2 mb-lg-0 fw-medium p-1 bg-light rounded-pill border">
                        <Nav.Link as={Link} to="/" className={`px-4 py-2 rounded-pill ${isActive('/') ? 'bg-purple text-white shadow-sm' : 'text-dark opacity-75 hover-text-purple'}`}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/send-parcel" className={`px-4 py-2 rounded-pill ${isActive('/send-parcel') ? 'bg-purple text-white shadow-sm' : 'text-dark opacity-75 hover-text-purple'}`}>Send Parcel</Nav.Link>
                        <Nav.Link as={Link} to="/services" className={`px-4 py-2 rounded-pill ${isActive('/services') ? 'bg-purple text-white shadow-sm' : 'text-dark opacity-75 hover-text-purple'}`}>Services</Nav.Link>
                        <Nav.Link as={Link} to="/tracking" className={`px-4 py-2 rounded-pill ${isActive('/tracking') ? 'bg-purple text-white shadow-sm' : 'text-dark opacity-75 hover-text-purple'}`}>Tracking</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className={`px-4 py-2 rounded-pill ${isActive('/contact') ? 'bg-purple text-white shadow-sm' : 'text-dark opacity-75 hover-text-purple'}`}>Contact</Nav.Link>
                    </Nav>
                    <div className="d-flex gap-3">
                        <Button as={Link} to="/login" variant="outline-dark" className="rounded-pill px-4 border-2 fw-bold" style={{ fontSize: '0.9rem' }}>
                            Login
                        </Button>
                        <Button as={Link} to="/register" className="btn-purple rounded-pill px-4 fw-bold shadow-sm" style={{ fontSize: '0.9rem' }}>
                            Get Started
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
            <style>{`
                .hover-text-purple:hover { color: var(--primary-purple) !important; opacity: 1 !important; }
                .bg-purple { background-color: var(--primary-purple) !important; }
                .focus-ring-0:focus { box-shadow: none !important; }
            `}</style>
        </Navbar>
    );
};

export default PublicNavbar;
