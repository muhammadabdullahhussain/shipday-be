import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/shipday_logo.jpg';
import { LogIn, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';

const PublicNavbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Simple Auth Check
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Ship with Shipday', path: '/send-parcel' },
        { name: 'Services', path: '/services' },
        { name: 'Tracking', path: '/tracking' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <Navbar
            expand="lg"
            fixed="top"
            expanded={expanded}
            onToggle={(isExpanded) => setExpanded(isExpanded)}
            className={`navbar-premium transition-all duration-500 ${scrolled ? 'navbar-compact' : ''}`}
        >
            <Container className="navbar-container-unified">
                {/* Brand Section */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 py-0 brand-wrapper-link">
                    <div className="brand-logo-hex">
                        <img src={logo} alt="ShipDay" className="logo-main" />
                    </div>
                    <div className="brand-info d-none d-md-flex">
                        <span className="brand-title">SHIPDAY</span>
                        <div className="brand-badge">
                            <ShieldCheck size={10} className="text-yellow" />
                            <span>PREMIUM COURIER</span>
                        </div>
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="public-navbar-nav"
                    className="menu-toggle-premium border-0 shadow-none"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? <X size={24} /> : <Menu size={24} />}
                </Navbar.Toggle>

                <Navbar.Collapse id="public-navbar-nav" className="justify-content-between">
                    {/* Navigation Items */}
                    <Nav className="mx-auto nav-links-premium">
                        {navLinks.map((link, index) => (
                            <Nav.Link
                                key={link.path}
                                as={Link}
                                to={link.path}
                                onClick={() => setExpanded(false)}
                                className={`nav-item-premium ${isActive(link.path) ? 'active' : ''}`}
                                style={{ '--delay': `${index * 0.12}s` }}
                            >
                                <span className="nav-text-underlined">{link.name}</span>
                            </Nav.Link>
                        ))}
                    </Nav>

                    {/* Action Group */}
                    <div className="nav-actions-premium d-flex align-items-center gap-2 gap-lg-4">
                        {isLoggedIn ? (
                            <>
                                <Button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('user');
                                        setIsLoggedIn(false);
                                        window.location.reload();
                                    }}
                                    className="btn-link-premium border-0 shadow-none d-flex align-items-center gap-2"
                                >
                                    <span className="fw-bold">Logout</span>
                                </Button>
                                <Button
                                    as={Link}
                                    to="/dashboard"
                                    className="btn-primary-premium border-0 d-flex align-items-center gap-2"
                                >
                                    <span className="fw-bold">My Dashboard</span>
                                    <ArrowRight size={18} className="arrow-icon" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    as={Link}
                                    to="/login"
                                    className="btn-link-premium border-0 shadow-none d-flex align-items-center gap-2"
                                >
                                    <LogIn size={18} />
                                    <span className="fw-bold">Login</span>
                                </Button>
                                <Button
                                    as={Link}
                                    to="/register"
                                    className="btn-primary-premium border-0 d-flex align-items-center gap-2"
                                >
                                    <span className="fw-bold">Get Started</span>
                                    <ArrowRight size={18} className="arrow-icon" />
                                </Button>
                            </>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>

            <style>{`
                :root {
                    --brand-yellow: #fabb05;
                    --brand-dark: #121212;
                    --brand-light: #ffffff;
                    --nav-height: 100px;
                    --nav-height-sm: 75px;
                }

                .navbar-premium {
                    height: var(--nav-height);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1050;
                    background: transparent;
                }

                .navbar-compact {
                    height: var(--nav-height-sm);
                }

                .navbar-container-unified {
                    background: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 100px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                    margin-top: 20px;
                    animation: shelfDrop 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                }

                @keyframes shelfDrop {
                    from { transform: translateY(-50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .navbar-compact .navbar-container-unified {
                    margin-top: 0;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                }

                /* Brand & Logo */
                .brand-wrapper-link {
                    text-decoration: none !important;
                }

                .brand-logo-hex {
                    background: white;
                    padding: 8px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 1px solid rgba(0,0,0,0.03);
                }

                .brand-wrapper-link:hover .brand-logo-hex {
                    transform: scale(1.1) rotate(-5deg);
                    box-shadow: 0 8px 20px rgba(250, 187, 5, 0.2);
                }

                .logo-main {
                    height: 32px;
                    width: auto;
                    object-fit: contain;
                }

                .brand-info {
                    display: flex;
                    flex-direction: column;
                    line-height: 1;
                }

                .brand-title {
                    font-size: 1.25rem;
                    font-weight: 950;
                    color: var(--brand-dark);
                    letter-spacing: 0.5px;
                }

                .brand-badge {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.6rem;
                    font-weight: 800;
                    color: #666;
                    letter-spacing: 1.5px;
                    margin-top: 4px;
                }

                .text-yellow { color: var(--brand-yellow); }

                /* Nav Links */
                .nav-links-premium {
                    display: flex;
                    gap: 0.25rem;
                }

                .nav-item-premium {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: #444 !important;
                    padding: 0.6rem 1.5rem !important;
                    border-radius: 100px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    opacity: 0;
                    animation: premiumReveal 0.6s ease forwards;
                    animation-delay: var(--delay);
                    position: relative;
                    overflow: hidden;
                }

                @keyframes premiumReveal {
                    from { transform: translateY(15px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .nav-item-premium:hover {
                    color: var(--brand-dark) !important;
                    background: rgba(0, 0, 0, 0.05);
                    transform: translateY(-2px);
                }

                .nav-item-premium:active {
                    transform: translateY(0) scale(0.95);
                }

                .nav-text-underlined {
                    position: relative;
                }

                .nav-text-underlined::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--brand-yellow);
                    transition: width 0.3s ease;
                }

                .nav-item-premium:hover .nav-text-underlined::after {
                    width: 100%;
                }

                .nav-item-premium.active {
                    color: var(--brand-dark) !important;
                    background: var(--brand-yellow);
                    box-shadow: 0 4px 15px rgba(250, 187, 5, 0.4);
                }

                .nav-item-premium.active .nav-text-underlined::after {
                    display: none;
                }

                /* Actions */
                .nav-actions-premium {
                    display: flex;
                }

                .btn-link-premium {
                    background: transparent;
                    color: var(--brand-dark) !important;
                    font-weight: 800;
                    font-size: 0.9rem;
                    padding: 0.6rem 1.25rem !important;
                    transition: all 0.3s ease;
                }

                .btn-link-premium:hover {
                    opacity: 0.7;
                    transform: translateY(-1px);
                }

                .btn-primary-premium {
                    background: var(--brand-dark) !important;
                    color: white !important;
                    padding: 0.75rem 1.75rem !important;
                    border-radius: 100px !important;
                    font-size: 0.9rem;
                    box-shadow: 0 10px 20px -5px rgba(0,0,0,0.25);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
                    position: relative;
                    overflow: hidden;
                }

                .btn-primary-premium::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: 0.5s;
                }

                .btn-primary-premium:hover::before {
                    left: 100%;
                }

                .btn-primary-premium:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 15px 30px -5px rgba(250, 187, 5, 0.3);
                    background: #000 !important;
                }

                .btn-primary-premium:hover .arrow-icon {
                    transform: translateX(4px);
                }

                .arrow-icon { transition: transform 0.3s ease; }

                /* Mobile Toggle */
                .menu-toggle-premium {
                    padding: 0.5rem;
                    border-radius: 12px;
                    color: var(--brand-dark);
                }

                @media (max-width: 991.98px) {
                    .navbar-premium { height: auto; padding: 10px 0; }
                    .navbar-container-unified { 
                        border-radius: 24px; 
                        margin-top: 5px;
                        padding: 0.75rem 1.25rem;
                    }
                    .navbar-collapse {
                        margin-top: 1rem;
                        padding-top: 1rem;
                        border-top: 1px solid rgba(0,0,0,0.05);
                    }
                    .nav-links-premium {
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 2rem !important;
                    }
                    .nav-item-premium {
                        width: 100%;
                        text-align: center;
                    }
                    .nav-actions-premium {
                        flex-direction: column;
                        width: 100%;
                        gap: 1rem !important;
                    }
                    .btn-link-premium, .btn-primary-premium {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </Navbar>
    );
};

export default PublicNavbar;
