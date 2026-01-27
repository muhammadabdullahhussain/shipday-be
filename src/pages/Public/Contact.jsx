import React from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import warehouseImg from '../../assets/contact_warehouse.jpg';
import truckImg from '../../assets/contact_truck_semi.jpg';
import pickupImg from '../../assets/contact_truck_pickup.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'GENERAL INTELLIGENCE',
        message: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    subject: 'GENERAL INTELLIGENCE',
                    message: '',
                    phone: ''
                });
            }
        } catch (error) {
            console.error("Contact error:", error);
            toast.error(error.response?.data?.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            {/* 1. CINEMATIC HERO HEADER - LUXURY REDESIGN */}
            <section className="contact-hero-section position-relative overflow-hidden">
                {/* Animated Mesh Gradient Background */}
                <div className="contact-hero-bg">
                    <div className="contact-gradient-mesh contact-gradient-mesh-1"></div>
                    <div className="contact-gradient-mesh contact-gradient-mesh-2"></div>
                    <div className="contact-gradient-mesh contact-gradient-mesh-3"></div>
                </div>

                {/* Geometric Floating Shapes */}
                <div className="contact-geometric-shapes">
                    <div className="contact-shape contact-shape-circle-1"></div>
                    <div className="contact-shape contact-shape-circle-2"></div>
                    <div className="contact-shape contact-shape-square"></div>
                    <div className="contact-shape contact-shape-triangle"></div>
                </div>

                {/* Diagonal Split Design */}
                <div className="contact-diagonal-split">
                    <svg className="contact-diagonal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="0,0 100,0 100,100 30,100" className="contact-diagonal-polygon" />
                    </svg>
                </div>

                {/* Particle Effect */}
                <div className="contact-particles-container">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="contact-particle" style={{
                            '--particle-delay': `${i * 0.3}s`,
                            '--particle-x': `${Math.random() * 100}%`,
                            '--particle-y': `${Math.random() * 100}%`
                        }}></div>
                    ))}
                </div>

                {/* Content */}
                <Container className="contact-hero-content position-relative">
                    <div className="text-center">
                        {/* Animated Badge */}
                        <div className="contact-badge-wrapper">
                            <div className="contact-badge-glow"></div>
                            <Badge className="contact-hero-badge">
                                <div className="contact-badge-icon">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <span>READY TO HELP</span>
                                <div className="contact-badge-pulse"></div>
                            </Badge>
                        </div>

                        {/* Main Title with Gradient */}
                        <h1 className="contact-hero-title">
                            <span className="contact-title-line contact-title-line-1">
                                <span className="contact-title-word">Contact</span>
                            </span>
                            <span className="contact-title-line contact-title-line-2">
                                <span className="contact-title-word contact-title-gradient">Us</span>
                            </span>
                            {/* Decorative Elements */}
                            <div className="contact-title-decoration contact-title-decoration-left"></div>
                            <div className="contact-title-decoration contact-title-decoration-right"></div>
                        </h1>

                        {/* Subtitle with Typing Effect */}
                        <div className="contact-subtitle-wrapper">
                            <p className="contact-hero-subtitle">
                                <span className="contact-subtitle-icon">
                                    <i className="bi bi-globe-americas"></i>
                                </span>
                                Global Courier precision with local South African care.
                            </p>
                            <div className="contact-subtitle-underline"></div>
                        </div>

                        {/* Quick Stats */}
                        <div className="contact-quick-stats">
                            <div className="contact-stat-item">
                                <div className="contact-stat-icon">
                                    <i className="bi bi-clock-history"></i>
                                </div>
                                <div className="contact-stat-value">24/7</div>
                                <div className="contact-stat-label">Available</div>
                            </div>
                            <div className="contact-stat-divider"></div>
                            <div className="contact-stat-item">
                                <div className="contact-stat-icon">
                                    <i className="bi bi-lightning-charge-fill"></i>
                                </div>
                                <div className="contact-stat-value">&lt;2min</div>
                                <div className="contact-stat-label">Response</div>
                            </div>
                            <div className="contact-stat-divider"></div>
                            <div className="contact-stat-item">
                                <div className="contact-stat-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <div className="contact-stat-value">100%</div>
                                <div className="contact-stat-label">Secure</div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Bottom Wave */}
                <div className="contact-hero-wave">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0 C300,80 600,80 900,40 L900,120 L0,120 Z" className="contact-wave-path"></path>
                    </svg>
                </div>

                <style>{`
                    /* Hero Section */
                    .contact-hero-section {
                        min-height: 600px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        background: linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0f172a 100%);
                    }

                    /* Animated Mesh Gradient */
                    .contact-hero-bg {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }

                    .contact-gradient-mesh {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(80px);
                        opacity: 0.3;
                        animation: contactMeshFloat 20s ease-in-out infinite;
                    }

                    .contact-gradient-mesh-1 {
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, #fabb05 0%, transparent 70%);
                        top: -20%;
                        right: -10%;
                        animation-delay: 0s;
                    }

                    .contact-gradient-mesh-2 {
                        width: 500px;
                        height: 500px;
                        background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
                        bottom: -15%;
                        left: -10%;
                        animation-delay: 5s;
                    }

                    .contact-gradient-mesh-3 {
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, #fabb05 0%, transparent 70%);
                        top: 40%;
                        left: 40%;
                        animation-delay: 10s;
                    }

                    @keyframes contactMeshFloat {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        33% { transform: translate(50px, -50px) scale(1.1); }
                        66% { transform: translate(-30px, 30px) scale(0.9); }
                    }

                    /* Geometric Shapes */
                    .contact-geometric-shapes {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                    }

                    .contact-shape {
                        position: absolute;
                        opacity: 0.05;
                    }

                    .contact-shape-circle-1 {
                        width: 300px;
                        height: 300px;
                        border: 3px solid #fabb05;
                        border-radius: 50%;
                        top: 10%;
                        right: 15%;
                        animation: contactShapeRotate 30s linear infinite;
                    }

                    .contact-shape-circle-2 {
                        width: 200px;
                        height: 200px;
                        border: 2px solid #fabb05;
                        border-radius: 50%;
                        bottom: 20%;
                        left: 10%;
                        animation: contactShapeRotate 25s linear infinite reverse;
                    }

                    .contact-shape-square {
                        width: 150px;
                        height: 150px;
                        border: 2px solid rgba(250, 187, 5, 0.3);
                        top: 50%;
                        left: 20%;
                        animation: contactShapeFloat 15s ease-in-out infinite;
                    }

                    .contact-shape-triangle {
                        width: 0;
                        height: 0;
                        border-left: 100px solid transparent;
                        border-right: 100px solid transparent;
                        border-bottom: 173px solid rgba(250, 187, 5, 0.1);
                        bottom: 15%;
                        right: 25%;
                        animation: contactShapeFloat 20s ease-in-out infinite;
                    }

                    @keyframes contactShapeRotate {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    @keyframes contactShapeFloat {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-30px); }
                    }

                    /* Diagonal Split */
                    .contact-diagonal-split {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 50%;
                        height: 100%;
                        pointer-events: none;
                    }

                    .contact-diagonal-svg {
                        width: 100%;
                        height: 100%;
                    }

                    .contact-diagonal-polygon {
                        fill: rgba(250, 187, 5, 0.08);
                        animation: contactDiagonalPulse 8s ease-in-out infinite;
                    }

                    @keyframes contactDiagonalPulse {
                        0%, 100% { opacity: 0.08; }
                        50% { opacity: 0.15; }
                    }

                    /* Particles */
                    .contact-particles-container {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                    }

                    .contact-particle {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: #fabb05;
                        border-radius: 50%;
                        left: var(--particle-x);
                        top: var(--particle-y);
                        animation: contactParticleFloat 8s ease-in-out infinite;
                        animation-delay: var(--particle-delay);
                        opacity: 0;
                    }

                    @keyframes contactParticleFloat {
                        0%, 100% { transform: translateY(0) scale(0); opacity: 0; }
                        10% { opacity: 0.8; }
                        50% { transform: translateY(-100px) scale(1); opacity: 1; }
                        90% { opacity: 0.8; }
                    }

                    /* Content */
                    .contact-hero-content {
                        padding: 100px 0;
                        z-index: 10;
                    }

                    /* Badge */
                    .contact-badge-wrapper {
                        position: relative;
                        display: inline-block;
                        margin-bottom: 32px;
                        animation: contactBadgeReveal 1s ease-out;
                    }

                    @keyframes contactBadgeReveal {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .contact-badge-glow {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 200px;
                        height: 200px;
                        background: radial-gradient(circle, rgba(250, 187, 5, 0.3) 0%, transparent 70%);
                        filter: blur(30px);
                        animation: contactBadgeGlowPulse 3s ease-in-out infinite;
                    }

                    @keyframes contactBadgeGlowPulse {
                        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
                    }

                    .contact-hero-badge {
                        position: relative;
                        background: rgba(250, 187, 5, 0.15) !important;
                        backdrop-filter: blur(20px);
                        border: 2px solid rgba(250, 187, 5, 0.3);
                        color: #fabb05 !important;
                        padding: 12px 28px;
                        font-size: 0.8rem;
                        font-weight: 900;
                        letter-spacing: 3px;
                        border-radius: 50px;
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        box-shadow: 0 8px 32px rgba(250, 187, 5, 0.2);
                    }

                    .contact-badge-icon {
                        width: 24px;
                        height: 24px;
                        background: #fabb05;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #0f172a;
                        font-size: 0.9rem;
                        animation: contactBadgeIconSpin 3s linear infinite;
                    }

                    @keyframes contactBadgeIconSpin {
                        0%, 80%, 100% { transform: rotate(0deg); }
                        85%, 95% { transform: rotate(360deg); }
                    }

                    .contact-badge-pulse {
                        position: absolute;
                        top: -4px;
                        right: -4px;
                        width: 12px;
                        height: 12px;
                        background: #22c55e;
                        border-radius: 50%;
                        border: 2px solid #0f172a;
                        animation: contactPulse 2s ease-in-out infinite;
                    }

                    @keyframes contactPulse {
                        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                        50% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
                    }

                    /* Title */
                    .contact-hero-title {
                        position: relative;
                        font-size: clamp(3rem, 8vw, 6rem);
                        font-weight: 900;
                        line-height: 1.1;
                        letter-spacing: -3px;
                        margin-bottom: 32px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .contact-title-line {
                        display: block;
                        overflow: hidden;
                    }

                    .contact-title-word {
                        display: inline-block;
                        color: white;
                        animation: contactTitleReveal 1s ease-out both;
                    }

                    .contact-title-line-1 .contact-title-word {
                        animation-delay: 0.2s;
                    }

                    .contact-title-line-2 .contact-title-word {
                        animation-delay: 0.4s;
                    }

                    @keyframes contactTitleReveal {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }

                    .contact-title-gradient {
                        background: linear-gradient(135deg, #fabb05 0%, #f59e0b 50%, #fabb05 100%);
                        background-size: 200% 200%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: contactGradientShift 5s ease infinite;
                        text-shadow: 0 0 80px rgba(250, 187, 5, 0.5);
                    }

                    @keyframes contactGradientShift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }

                    .contact-title-decoration {
                        position: absolute;
                        width: 100px;
                        height: 4px;
                        background: linear-gradient(90deg, transparent, #fabb05, transparent);
                        top: 50%;
                    }

                    .contact-title-decoration-left {
                        left: -120px;
                        animation: contactDecoSlideIn 1s ease-out 0.6s both;
                    }

                    .contact-title-decoration-right {
                        right: -120px;
                        animation: contactDecoSlideIn 1s ease-out 0.6s both reverse;
                    }

                    @keyframes contactDecoSlideIn {
                        from { transform: translateX(-50px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }

                    /* Subtitle */
                    .contact-subtitle-wrapper {
                        position: relative;
                        margin-bottom: 48px;
                        animation: contactSubtitleReveal 1s ease-out 0.8s both;
                    }

                    @keyframes contactSubtitleReveal {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .contact-hero-subtitle {
                        color: rgba(255, 255, 255, 0.7);
                        font-size: 1.1rem;
                        font-weight: 600;
                        letter-spacing: 1px;
                        margin: 0 auto 16px;
                        max-width: 700px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                    }

                    .contact-subtitle-icon {
                        width: 32px;
                        height: 32px;
                        background: rgba(250, 187, 5, 0.1);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fabb05;
                        font-size: 1rem;
                    }

                    .contact-subtitle-underline {
                        width: 0;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #fabb05, transparent);
                        margin: 0 auto;
                        animation: contactUnderlineExpand 1.5s ease-out 1s both;
                    }

                    @keyframes contactUnderlineExpand {
                        to { width: 300px; }
                    }

                    /* Quick Stats */
                    .contact-quick-stats {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 32px;
                        flex-wrap: wrap;
                        animation: contactStatsReveal 1s ease-out 1.2s both;
                    }

                    @keyframes contactStatsReveal {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .contact-stat-item {
                        text-align: center;
                        padding: 20px 24px;
                        background: rgba(255, 255, 255, 0.05);
                        backdrop-filter: blur(10px);
                        border-radius: 16px;
                        border: 1px solid rgba(250, 187, 5, 0.2);
                        transition: all 0.4s ease;
                    }

                    .contact-stat-item:hover {
                        background: rgba(250, 187, 5, 0.1);
                        transform: translateY(-5px);
                        box-shadow: 0 10px 30px rgba(250, 187, 5, 0.2);
                    }

                    .contact-stat-icon {
                        width: 48px;
                        height: 48px;
                        background: linear-gradient(135deg, #fabb05, #f59e0b);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 12px;
                        color: #0f172a;
                        font-size: 1.5rem;
                        box-shadow: 0 8px 20px rgba(250, 187, 5, 0.3);
                    }

                    .contact-stat-value {
                        font-size: 1.75rem;
                        font-weight: 900;
                        color: white;
                        margin-bottom: 4px;
                        letter-spacing: -1px;
                    }

                    .contact-stat-label {
                        font-size: 0.75rem;
                        font-weight: 700;
                        color: rgba(255, 255, 255, 0.6);
                        text-transform: uppercase;
                        letter-spacing: 2px;
                    }

                    .contact-stat-divider {
                        width: 1px;
                        height: 60px;
                        background: linear-gradient(180deg, transparent, rgba(250, 187, 5, 0.3), transparent);
                    }

                    /* Bottom Wave */
                    .contact-hero-wave {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 120px;
                        overflow: hidden;
                    }

                    .contact-hero-wave svg {
                        width: 100%;
                        height: 100%;
                    }

                    .contact-wave-path {
                        fill: white;
                        animation: contactWaveMove 10s ease-in-out infinite;
                    }

                    @keyframes contactWaveMove {
                        0%, 100% { d: path("M0,0 C300,80 600,80 900,40 L900,120 L0,120 Z"); }
                        50% { d: path("M0,40 C300,0 600,100 900,60 L900,120 L0,120 Z"); }
                    }

                    /* Responsive */
                    @media (max-width: 991px) {
                        .contact-hero-section {
                            min-height: 500px;
                        }

                        .contact-hero-content {
                            padding: 80px 0;
                        }

                        .contact-title-decoration {
                            display: none;
                        }

                        .contact-quick-stats {
                            gap: 16px;
                        }

                        .contact-stat-divider {
                            display: none;
                        }
                    }

                    @media (max-width: 575px) {
                        .contact-hero-section {
                            min-height: 450px;
                        }

                        .contact-hero-content {
                            padding: 60px 0;
                        }

                        .contact-hero-badge {
                            padding: 10px 20px;
                            font-size: 0.7rem;
                        }

                        .contact-hero-subtitle {
                            font-size: 0.95rem;
                            flex-direction: column;
                        }

                        .contact-stat-item {
                            padding: 16px 20px;
                        }
                    }
                `}</style>
            </section>

            {/* 2. PREMIUM INFO CARDS - LUXURY REDESIGN */}
            <section className="premium-info-section position-relative">
                {/* Animated Particles Background */}
                <div className="premium-particles">
                    <div className="premium-particle premium-particle-1"></div>
                    <div className="premium-particle premium-particle-2"></div>
                    <div className="premium-particle premium-particle-3"></div>
                    <div className="premium-particle premium-particle-4"></div>
                </div>

                <Container className="position-relative z-3" style={{ marginTop: '-80px' }}>
                    <Row className="g-4 justify-content-center">
                        {[
                            {
                                title: 'Support Network',
                                icon: 'bi-headset',
                                iconBg: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)',
                                desc: 'Have questions? Our mission-critical support team is active 24/7 to assist with your operational needs.',
                                accent: '#fabb05',
                                badge: 'LIVE SUPPORT',
                                action: 'Start Chat',
                                actionIcon: 'bi-chat-dots-fill'
                            },
                            {
                                title: 'Strategic Location',
                                icon: 'bi-geo-alt-fill',
                                iconBg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                desc: '37 Main Road, Eastleigh, Edenvale 1609. South Africa\'s central logistics node.',
                                accent: '#0f172a',
                                badge: 'HEADQUARTERS',
                                action: 'View on Map',
                                actionIcon: 'bi-map-fill'
                            },
                            {
                                title: 'Direct Hotline',
                                icon: 'bi-telephone-fill',
                                iconBg: 'linear-gradient(135deg, #fabb05 0%, #f59e0b 100%)',
                                desc: 'Contact our headquarters directly for urgent shipments and enterprise solutions.',
                                value: '010 001 4421',
                                accent: '#fabb05',
                                badge: '24/7 AVAILABLE',
                                action: 'Call Now',
                                actionIcon: 'bi-phone-vibrate-fill'
                            }
                        ].map((info, idx) => (
                            <Col lg={4} md={6} key={idx} className="premium-card-col">
                                <div className="premium-info-card-wrapper" style={{ '--card-delay': `${idx * 0.15}s` }}>
                                    {/* Glassmorphism Card */}
                                    <div className="premium-info-card" style={{ '--accent-color': info.accent }}>
                                        {/* Animated Border Gradient */}
                                        <div className="premium-card-border"></div>

                                        {/* Glow Effect */}
                                        <div className="premium-card-glow" style={{ '--glow-color': info.accent }}></div>

                                        {/* Top Badge */}
                                        <div className="premium-card-badge">
                                            <div className="premium-badge-pulse"></div>
                                            <span>{info.badge}</span>
                                        </div>

                                        {/* Icon Section */}
                                        <div className="premium-icon-container">
                                            <div className="premium-icon-wrapper" style={{ background: info.iconBg }}>
                                                <i className={`bi ${info.icon} premium-icon`}></i>
                                                {/* Rotating Ring */}
                                                <div className="premium-icon-ring"></div>
                                                <div className="premium-icon-ring premium-icon-ring-2"></div>
                                            </div>
                                            {/* Icon Particles */}
                                            <div className="premium-icon-particles">
                                                <div className="premium-icon-particle"></div>
                                                <div className="premium-icon-particle"></div>
                                                <div className="premium-icon-particle"></div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="premium-card-content">
                                            <h4 className="premium-card-title">{info.title}</h4>
                                            <p className="premium-card-desc">{info.desc}</p>

                                            {/* Value Display (for hotline) */}
                                            {info.value && (
                                                <div className="premium-value-section">
                                                    <div className="premium-value-wrapper">
                                                        <i className="bi bi-telephone-forward-fill premium-value-icon"></i>
                                                        <span className="premium-value-number">{info.value}</span>
                                                    </div>
                                                    <div className="premium-availability-badge">
                                                        <div className="premium-status-dot"></div>
                                                        <span>Available Now</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Action Button */}
                                            <button className="premium-action-btn">
                                                <span className="premium-btn-text">{info.action}</span>
                                                <i className={`bi ${info.actionIcon} premium-btn-icon`}></i>
                                                <div className="premium-btn-ripple"></div>
                                            </button>
                                        </div>

                                        {/* Hover Shine Effect */}
                                        <div className="premium-card-shine"></div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>

                <style>{`
                    /* Section Styling */
                    .premium-info-section {
                        padding: 60px 0;
                        overflow: hidden;
                    }

                    /* Animated Particles */
                    .premium-particles {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        overflow: hidden;
                    }

                    .premium-particle {
                        position: absolute;
                        border-radius: 50%;
                        opacity: 0.05;
                        animation: premiumParticleFloat 20s ease-in-out infinite;
                    }

                    .premium-particle-1 {
                        width: 300px;
                        height: 300px;
                        background: linear-gradient(135deg, #fabb05, #f59e0b);
                        top: -10%;
                        left: 10%;
                        animation-delay: 0s;
                    }

                    .premium-particle-2 {
                        width: 200px;
                        height: 200px;
                        background: linear-gradient(135deg, #0f172a, #1e293b);
                        top: 20%;
                        right: 15%;
                        animation-delay: 5s;
                    }

                    .premium-particle-3 {
                        width: 150px;
                        height: 150px;
                        background: linear-gradient(135deg, #fabb05, #0f172a);
                        bottom: 10%;
                        left: 20%;
                        animation-delay: 10s;
                    }

                    .premium-particle-4 {
                        width: 250px;
                        height: 250px;
                        background: linear-gradient(135deg, #f59e0b, #fabb05);
                        bottom: -5%;
                        right: 10%;
                        animation-delay: 15s;
                    }

                    @keyframes premiumParticleFloat {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        25% { transform: translate(30px, -30px) scale(1.1); }
                        50% { transform: translate(-20px, 20px) scale(0.9); }
                        75% { transform: translate(20px, 30px) scale(1.05); }
                    }

                    /* Card Column Animation */
                    .premium-card-col {
                        animation: premiumCardReveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
                        animation-delay: var(--card-delay);
                    }

                    @keyframes premiumCardReveal {
                        from {
                            opacity: 0;
                            transform: translateY(60px) scale(0.9);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }

                    /* Card Wrapper */
                    .premium-info-card-wrapper {
                        perspective: 1500px;
                        height: 100%;
                    }

                    /* Glassmorphism Card */
                    .premium-info-card {
                        position: relative;
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        border-radius: 28px;
                        padding: 40px 32px;
                        height: 100%;
                        overflow: hidden;
                        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1),
                                    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
                    }

                    .premium-info-card:hover {
                        transform: translateY(-16px) rotateX(5deg);
                        box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15),
                                    0 0 0 1px rgba(255, 255, 255, 0.8) inset;
                    }

                    /* Animated Border */
                    .premium-card-border {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        border-radius: 28px;
                        padding: 2px;
                        background: linear-gradient(135deg, var(--accent-color), transparent, var(--accent-color));
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        -webkit-mask-composite: xor;
                        mask-composite: exclude;
                        opacity: 0;
                        transition: opacity 0.4s ease;
                        animation: premiumBorderRotate 3s linear infinite;
                    }

                    .premium-info-card:hover .premium-card-border {
                        opacity: 1;
                    }

                    @keyframes premiumBorderRotate {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    /* Glow Effect */
                    .premium-card-glow {
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, var(--glow-color) 0%, transparent 70%);
                        opacity: 0;
                        transition: opacity 0.6s ease;
                        pointer-events: none;
                    }

                    .premium-info-card:hover .premium-card-glow {
                        opacity: 0.15;
                    }

                    /* Top Badge */
                    .premium-card-badge {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        background: rgba(250, 187, 5, 0.1);
                        backdrop-filter: blur(10px);
                        padding: 6px 14px;
                        border-radius: 50px;
                        font-size: 0.65rem;
                        font-weight: 900;
                        color: #f59e0b;
                        letter-spacing: 1.5px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        border: 1px solid rgba(250, 187, 5, 0.2);
                    }

                    .premium-badge-pulse {
                        width: 6px;
                        height: 6px;
                        background: #fabb05;
                        border-radius: 50%;
                        animation: premiumPulse 2s ease-in-out infinite;
                    }

                    @keyframes premiumPulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.4); opacity: 0.6; }
                    }

                    /* Icon Container */
                    .premium-icon-container {
                        position: relative;
                        display: flex;
                        justify-content: center;
                        margin-bottom: 32px;
                    }

                    .premium-icon-wrapper {
                        position: relative;
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
                        transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                        z-index: 2;
                    }

                    .premium-info-card:hover .premium-icon-wrapper {
                        transform: scale(1.15) rotate(360deg);
                        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                    }

                    .premium-icon {
                        font-size: 2.5rem;
                        color: white;
                        position: relative;
                        z-index: 2;
                    }

                    /* Rotating Rings */
                    .premium-icon-ring {
                        position: absolute;
                        top: -10px;
                        left: -10px;
                        right: -10px;
                        bottom: -10px;
                        border: 2px solid rgba(250, 187, 5, 0.3);
                        border-radius: 50%;
                        animation: premiumRingRotate 4s linear infinite;
                    }

                    .premium-icon-ring-2 {
                        animation-duration: 6s;
                        animation-direction: reverse;
                        border-color: rgba(250, 187, 5, 0.2);
                    }

                    @keyframes premiumRingRotate {
                        0% { transform: rotate(0deg) scale(1); opacity: 1; }
                        50% { transform: rotate(180deg) scale(1.1); opacity: 0.5; }
                        100% { transform: rotate(360deg) scale(1); opacity: 1; }
                    }

                    /* Icon Particles */
                    .premium-icon-particles {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 120px;
                        height: 120px;
                        pointer-events: none;
                    }

                    .premium-icon-particle {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: #fabb05;
                        border-radius: 50%;
                        opacity: 0;
                    }

                    .premium-info-card:hover .premium-icon-particle {
                        animation: premiumParticleExplode 1.5s ease-out;
                    }

                    .premium-icon-particle:nth-child(1) { animation-delay: 0s; }
                    .premium-icon-particle:nth-child(2) { animation-delay: 0.2s; }
                    .premium-icon-particle:nth-child(3) { animation-delay: 0.4s; }

                    @keyframes premiumParticleExplode {
                        0% { transform: translate(0, 0) scale(0); opacity: 1; }
                        100% { transform: translate(var(--x, 50px), var(--y, -50px)) scale(1); opacity: 0; }
                    }

                    .premium-icon-particle:nth-child(1) { --x: 60px; --y: -60px; }
                    .premium-icon-particle:nth-child(2) { --x: -60px; --y: -60px; }
                    .premium-icon-particle:nth-child(3) { --x: 0px; --y: -80px; }

                    /* Content */
                    .premium-card-content {
                        text-align: center;
                    }

                    .premium-card-title {
                        font-size: 1.5rem;
                        font-weight: 900;
                        color: #0f172a;
                        margin-bottom: 16px;
                        letter-spacing: -0.5px;
                        transition: color 0.3s ease;
                    }

                    .premium-info-card:hover .premium-card-title {
                        color: #fabb05;
                    }

                    .premium-card-desc {
                        color: #64748b;
                        font-size: 0.95rem;
                        line-height: 1.7;
                        margin-bottom: 24px;
                        font-weight: 500;
                    }

                    /* Value Section */
                    .premium-value-section {
                        margin: 24px 0;
                        padding: 20px;
                        background: linear-gradient(135deg, rgba(250, 187, 5, 0.05), rgba(250, 187, 5, 0.1));
                        border-radius: 16px;
                        border: 1px solid rgba(250, 187, 5, 0.2);
                    }

                    .premium-value-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        margin-bottom: 12px;
                    }

                    .premium-value-icon {
                        font-size: 1.5rem;
                        color: #fabb05;
                        animation: premiumPhoneRing 2s ease-in-out infinite;
                    }

                    @keyframes premiumPhoneRing {
                        0%, 100% { transform: rotate(0deg); }
                        10%, 30% { transform: rotate(-15deg); }
                        20%, 40% { transform: rotate(15deg); }
                    }

                    .premium-value-number {
                        font-size: 1.75rem;
                        font-weight: 900;
                        color: #0f172a;
                        letter-spacing: 1px;
                    }

                    .premium-availability-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: rgba(34, 197, 94, 0.1);
                        padding: 6px 16px;
                        border-radius: 50px;
                        font-size: 0.75rem;
                        font-weight: 800;
                        color: #22c55e;
                        letter-spacing: 1px;
                    }

                    .premium-status-dot {
                        width: 8px;
                        height: 8px;
                        background: #22c55e;
                        border-radius: 50%;
                        animation: premiumPulse 2s ease-in-out infinite;
                    }

                    /* Action Button */
                    .premium-action-btn {
                        position: relative;
                        width: 100%;
                        background: #0f172a;
                        color: white;
                        border: none;
                        padding: 16px 24px;
                        border-radius: 50px;
                        font-weight: 900;
                        font-size: 0.95rem;
                        letter-spacing: 1px;
                        overflow: hidden;
                        cursor: pointer;
                        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 12px;
                        margin-top: 24px;
                    }

                    .premium-action-btn:hover {
                        background: #fabb05;
                        color: #0f172a;
                        transform: translateY(-3px);
                        box-shadow: 0 15px 35px rgba(250, 187, 5, 0.4);
                    }

                    .premium-btn-icon {
                        font-size: 1.25rem;
                        transition: transform 0.4s ease;
                    }

                    .premium-action-btn:hover .premium-btn-icon {
                        transform: translateX(5px) scale(1.1);
                    }

                    .premium-btn-ripple {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: translate(-50%, -50%);
                        transition: width 0.6s ease, height 0.6s ease;
                    }

                    .premium-action-btn:hover .premium-btn-ripple {
                        width: 300px;
                        height: 300px;
                    }

                    /* Shine Effect */
                    .premium-card-shine {
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
                        transform: translateX(-100%);
                        transition: transform 0.8s ease;
                        pointer-events: none;
                    }

                    .premium-info-card:hover .premium-card-shine {
                        transform: translateX(100%);
                    }

                    /* Responsive */
                    @media (max-width: 991px) {
                        .premium-info-card {
                            padding: 32px 24px;
                        }

                        .premium-icon-wrapper {
                            width: 80px;
                            height: 80px;
                        }

                        .premium-icon {
                            font-size: 2rem;
                        }

                        .premium-card-title {
                            font-size: 1.3rem;
                        }
                    }

                    @media (max-width: 575px) {
                        .premium-info-section {
                            padding: 40px 0;
                        }

                        .premium-info-card {
                            padding: 28px 20px;
                        }

                        .premium-value-number {
                            font-size: 1.5rem;
                        }
                    }
                `}</style>
            </section>

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
                                        <Form className="precision-form" onSubmit={handleSubmit}>
                                            <Row className="g-4">
                                                {/* ENQUIRY TYPE */}
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">INTELLIGENCE CATEGORY</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-cpu precision-icon"></i>
                                                            <Form.Select
                                                                name="subject"
                                                                value={formData.subject}
                                                                onChange={handleChange}
                                                                className="precision-input custom-select-precision"
                                                            >
                                                                <option value="GENERAL INTELLIGENCE">GENERAL INTELLIGENCE</option>
                                                                <option value="SHIPMENT STATUS UPDATE">SHIPMENT STATUS UPDATE</option>
                                                                <option value="ENTERPRISE RATES REQUEST">ENTERPRISE RATES REQUEST</option>
                                                                <option value="TECHNICAL OPERATIONAL SUPPORT">TECHNICAL OPERATIONAL SUPPORT</option>
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
                                                            <Form.Control
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                                required
                                                                className="precision-input"
                                                                placeholder="ENTER FULL LEGAL NAME"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* EMAIL & PHONE */}
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">SECURE EMAIL</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-shield-check precision-icon"></i>
                                                            <Form.Control
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                required
                                                                className="precision-input"
                                                                placeholder="EMAIL@DOMAIN.COM"
                                                                type="email"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">CONTACT NUMBER</Form.Label>
                                                        <div className="precision-input-wrapper">
                                                            <i className="bi bi-phone precision-icon"></i>
                                                            <Form.Control
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                className="precision-input"
                                                                placeholder="+27 (000) 000-0000"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* MESSAGE */}
                                                <Col md={12}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="precision-label">OPERATIONAL REQUIREMENTS</Form.Label>
                                                        <div className="precision-input-wrapper align-items-start">
                                                            <i className="bi bi-terminal precision-icon mt-3"></i>
                                                            <Form.Control
                                                                as="textarea"
                                                                name="message"
                                                                value={formData.message}
                                                                onChange={handleChange}
                                                                required
                                                                rows={4}
                                                                className="precision-input py-3"
                                                                placeholder="BRIEF YOUR REQUIREMENTS HERE..."
                                                                style={{ resize: 'none' }}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                {/* BUTTON */}
                                                <Col md={12} className="pt-2">
                                                    <Button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden group"
                                                    >
                                                        <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                                                            {loading ? 'Transmitting...' : 'Dispatch Signal'}
                                                        </span>
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
        <section className="infrastructure-premium-section position-relative overflow-hidden py-5">
            {/* Animated Background Gradient */}
            <div className="position-absolute top-0 start-0 w-100 h-100 infrastructure-bg-gradient"></div>

            {/* Floating Geometric Shapes */}
            <div className="infrastructure-shape infrastructure-shape-1"></div>
            <div className="infrastructure-shape infrastructure-shape-2"></div>
            <div className="infrastructure-shape infrastructure-shape-3"></div>

            <Container className="position-relative z-2 py-5">
                {/* Premium Header */}
                <div className="text-center mb-5 infrastructure-header">
                    <div className="d-inline-flex align-items-center gap-2 mb-3 infrastructure-badge-wrapper">
                        <div className="infrastructure-pulse-dot"></div>
                        <Badge className="infrastructure-badge px-4 py-2 fw-black tracking-widest">
                            <i className="bi bi-building-fill-gear me-2"></i>
                            OUR NETWORK
                        </Badge>
                        <div className="infrastructure-pulse-dot"></div>
                    </div>
                    <h2 className="display-3 fw-black text-dark mb-3 infrastructure-title">
                        Strategic <span className="infrastructure-title-gradient">Infrastructure</span>
                    </h2>
                    <p className="lead text-muted mx-auto infrastructure-subtitle" style={{ maxWidth: '700px' }}>
                        Powering South Africa's most advanced courier network with state-of-the-art facilities
                    </p>
                </div>

                {/* Premium Cards Grid */}
                <Row className="g-4 justify-content-center">
                    {branches.map((branch, idx) => (
                        <Col lg={4} md={6} key={idx} className="infrastructure-card-col">
                            <div className="infrastructure-card-wrapper" style={{ '--delay': `${idx * 0.15}s` }}>
                                {/* 3D Card Container */}
                                <div className="infrastructure-card">
                                    {/* Gradient Border Effect */}
                                    <div className="infrastructure-card-border" style={{ '--accent': branch.accent }}></div>

                                    {/* Image Section with Parallax */}
                                    <div className="infrastructure-card-image-wrapper">
                                        <div className="infrastructure-card-image"
                                            style={{ backgroundImage: `url(${branch.image})` }}>
                                            {/* Gradient Overlay */}
                                            <div className="infrastructure-card-overlay"></div>

                                            {/* Type Badge */}
                                            <div className="infrastructure-type-badge">
                                                <i className="bi bi-patch-check-fill me-2"></i>
                                                {branch.type}
                                            </div>

                                            {/* Animated Icon */}
                                            <div className="infrastructure-icon-wrapper">
                                                <i className={`bi ${branch.type === 'Main Office' ? 'bi-building-fill' :
                                                    branch.type === 'Distribution Center' ? 'bi-boxes' :
                                                        'bi-shop-window'
                                                    } infrastructure-icon`}></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="infrastructure-card-content">
                                        {/* Title & Location */}
                                        <div className="infrastructure-card-header mb-3">
                                            <h4 className="fw-black text-dark mb-2 infrastructure-card-title">
                                                {branch.name}
                                            </h4>
                                            <div className="infrastructure-location-badge">
                                                <i className="bi bi-geo-alt-fill me-2"></i>
                                                {branch.location}
                                            </div>
                                        </div>

                                        {/* Address with Icon */}
                                        <div className="infrastructure-address-section mb-4">
                                            <div className="infrastructure-address-icon">
                                                <i className="bi bi-pin-map-fill"></i>
                                            </div>
                                            <p className="infrastructure-address-text mb-0">
                                                {branch.address}
                                            </p>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="infrastructure-stats-row mb-4">
                                            <div className="infrastructure-stat-item">
                                                <i className="bi bi-clock-fill text-yellow"></i>
                                                <span>24/7</span>
                                            </div>
                                            <div className="infrastructure-stat-item">
                                                <i className="bi bi-shield-check text-yellow"></i>
                                                <span>Secure</span>
                                            </div>
                                            <div className="infrastructure-stat-item">
                                                <i className="bi bi-lightning-charge-fill text-yellow"></i>
                                                <span>Active</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="infrastructure-action-btn w-100">
                                            <span className="infrastructure-btn-text">View Operations</span>
                                            <i className="bi bi-arrow-right-circle infrastructure-btn-icon"></i>
                                            <div className="infrastructure-btn-shine"></div>
                                        </button>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="infrastructure-card-glow" style={{ '--accent': branch.accent }}></div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* Bottom CTA - Ultra Premium Expansion Announcement */}
                <div className="infrastructure-expansion-section">
                    {/* Animated Background Layers */}
                    <div className="expansion-bg-gradient"></div>
                    <div className="expansion-grid-pattern"></div>
                    <div className="expansion-floating-particles">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="expansion-particle"
                                style={{
                                    '--particle-delay': `${i * 0.3}s`,
                                    '--particle-x': `${Math.random() * 100}%`,
                                    '--particle-duration': `${15 + Math.random() * 10}s`
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Content Container */}
                    <div className="expansion-content-wrapper">
                        {/* Animated Badge with Holographic Effect */}
                        <div className="expansion-badge-container">
                            <div className="expansion-badge">
                                <div className="expansion-badge-pulse"></div>
                                <div className="expansion-badge-glow"></div>
                                <div className="expansion-badge-shimmer"></div>
                                <i className="bi bi-rocket-takeoff-fill expansion-badge-icon"></i>
                                <span>EXPANSION 2026</span>
                                <div className="expansion-badge-sparkles">
                                    <i className="bi bi-stars"></i>
                                </div>
                            </div>
                        </div>

                        {/* Main Announcement with 3D Effect */}
                        <div className="expansion-announcement">
                            <h3 className="expansion-title">
                                <span className="expansion-title-line">Growing Our</span>
                                <span className="expansion-title-highlight">
                                    Network Nationwide
                                    <svg className="expansion-title-underline" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0,6 Q75,0 150,6 T300,6" stroke="url(#gradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#fabb05" stopOpacity="0" />
                                                <stop offset="50%" stopColor="#fabb05" stopOpacity="1" />
                                                <stop offset="100%" stopColor="#fabb05" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </h3>
                            <p className="expansion-subtitle">
                                Expanding to <span className="expansion-number" data-target="15">0</span><span className="expansion-plus">+</span> strategic locations across South Africa
                            </p>
                        </div>

                        {/* Interactive 3D Progress Card */}
                        <div className="expansion-progress-container">
                            <div className="expansion-progress-glow-bg"></div>

                            <div className="expansion-progress-header">
                                <div className="expansion-progress-label">
                                    <div className="expansion-label-icon-wrapper">
                                        <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <span>Current: <strong>3</strong> Locations</span>
                                </div>
                                <div className="expansion-progress-label expansion-progress-target">
                                    <div className="expansion-label-icon-wrapper expansion-target-icon">
                                        <i className="bi bi-flag-fill"></i>
                                    </div>
                                    <span>Target: <strong>15+</strong> Locations</span>
                                </div>
                            </div>

                            <div className="expansion-progress-bar-wrapper">
                                <div className="expansion-progress-bar">
                                    <div className="expansion-progress-fill">
                                        <div className="expansion-progress-shine"></div>
                                    </div>
                                    <div className="expansion-progress-glow"></div>
                                    <div className="expansion-progress-marker" style={{ left: '20%' }}>
                                        <div className="expansion-marker-dot"></div>
                                        <div className="expansion-marker-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="expansion-progress-stats">
                                <div className="expansion-stat">
                                    <div className="expansion-stat-icon">
                                        <i className="bi bi-graph-up-arrow"></i>
                                    </div>
                                    <div className="expansion-stat-value">5x</div>
                                    <div className="expansion-stat-label">Growth</div>
                                    <div className="expansion-stat-glow"></div>
                                </div>
                                <div className="expansion-stat">
                                    <div className="expansion-stat-icon">
                                        <i className="bi bi-globe2"></i>
                                    </div>
                                    <div className="expansion-stat-value">80%</div>
                                    <div className="expansion-stat-label">Coverage</div>
                                    <div className="expansion-stat-glow"></div>
                                </div>
                                <div className="expansion-stat">
                                    <div className="expansion-stat-icon">
                                        <i className="bi bi-calendar-event"></i>
                                    </div>
                                    <div className="expansion-stat-value">2026</div>
                                    <div className="expansion-stat-label">Timeline</div>
                                    <div className="expansion-stat-glow"></div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive South Africa Map Visualization */}
                        <div className="expansion-map-container">
                            <div className="expansion-map-title">
                                <i className="bi bi-pin-map-fill"></i>
                                <span>Strategic Coverage Across South Africa</span>
                            </div>
                            <div className="expansion-map-visual">
                                {/* Existing Locations */}
                                {['Johannesburg', 'Cape Town', 'Durban'].map((city, i) => (
                                    <div
                                        key={city}
                                        className="expansion-location-marker expansion-location-active"
                                        style={{ '--marker-delay': `${i * 0.15}s` }}
                                    >
                                        <div className="expansion-marker-pulse-ring"></div>
                                        <div className="expansion-marker-dot">
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </div>
                                        <div className="expansion-marker-label">{city}</div>
                                    </div>
                                ))}

                                {/* Future Locations */}
                                {['Pretoria', 'Port Elizabeth', 'Bloemfontein', 'East London', 'Polokwane', 'Nelspruit'].map((city, i) => (
                                    <div
                                        key={city}
                                        className="expansion-location-marker expansion-location-future"
                                        style={{ '--marker-delay': `${(i + 3) * 0.15}s` }}
                                    >
                                        <div className="expansion-marker-pulse-ring"></div>
                                        <div className="expansion-marker-dot">
                                            <i className="bi bi-geo-alt"></i>
                                        </div>
                                        <div className="expansion-marker-label">{city}</div>
                                    </div>
                                ))}

                                {/* Connection Lines */}
                                <svg className="expansion-connection-lines" viewBox="0 0 600 300">
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#fabb05" stopOpacity="0.1" />
                                            <stop offset="50%" stopColor="#fabb05" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#fabb05" stopOpacity="0.1" />
                                        </linearGradient>
                                    </defs>
                                    {[...Array(8)].map((_, i) => (
                                        <line
                                            key={i}
                                            x1={Math.random() * 600}
                                            y1={Math.random() * 300}
                                            x2={Math.random() * 600}
                                            y2={Math.random() * 300}
                                            stroke="url(#lineGradient)"
                                            strokeWidth="1"
                                            strokeDasharray="5,5"
                                            className="expansion-connection-line"
                                            style={{ '--line-delay': `${i * 0.2}s` }}
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Premium CTA Button with Advanced Effects */}
                        <Button className="expansion-cta-button">
                            <span className="expansion-btn-content">
                                <i className="bi bi-map expansion-btn-icon"></i>
                                <span className="expansion-btn-text">Explore Full Network Map</span>
                                <i className="bi bi-arrow-right expansion-btn-arrow"></i>
                            </span>
                            <div className="expansion-btn-shine"></div>
                            <div className="expansion-btn-glow-pulse"></div>
                            <div className="expansion-btn-particles">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="expansion-btn-particle"></div>
                                ))}
                            </div>
                            <div className="expansion-btn-ripple"></div>
                        </Button>
                    </div>

                    <style>{`
                        /* Expansion Section */
                        .infrastructure-expansion-section {
                            position: relative;
                            margin-top: 80px;
                            padding: 60px 0;
                            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                            border-radius: 32px;
                            overflow: hidden;
                        }

                        /* Background Elements */
                        .expansion-bg-gradient {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: radial-gradient(circle at 30% 50%, rgba(250, 187, 5, 0.15) 0%, transparent 50%),
                                        radial-gradient(circle at 70% 50%, rgba(250, 187, 5, 0.1) 0%, transparent 50%);
                            animation: expansionGradientPulse 8s ease-in-out infinite;
                        }

                        @keyframes expansionGradientPulse {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.6; }
                        }

                        .expansion-grid-pattern {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-image: 
                                linear-gradient(rgba(250, 187, 5, 0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(250, 187, 5, 0.03) 1px, transparent 1px);
                            background-size: 50px 50px;
                            opacity: 0.5;
                            animation: expansionGridMove 20s linear infinite;
                        }

                        @keyframes expansionGridMove {
                            0% { transform: translate(0, 0); }
                            100% { transform: translate(50px, 50px); }
                        }

                        /* Floating Particles System */
                        .expansion-floating-particles {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                            pointer-events: none;
                        }

                        .expansion-particle {
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            background: radial-gradient(circle, #fabb05, transparent);
                            border-radius: 50%;
                            left: var(--particle-x);
                            bottom: -10px;
                            opacity: 0;
                            animation: expansionParticleFloat var(--particle-duration) ease-in infinite;
                            animation-delay: var(--particle-delay);
                        }

                        @keyframes expansionParticleFloat {
                            0% { 
                                transform: translateY(0) translateX(0) scale(0);
                                opacity: 0;
                            }
                            10% {
                                opacity: 1;
                            }
                            90% {
                                opacity: 1;
                            }
                            100% { 
                                transform: translateY(-100vh) translateX(calc(var(--particle-x) * 0.2)) scale(1);
                                opacity: 0;
                            }
                        }

                        /* Content */
                        .expansion-content-wrapper {
                            position: relative;
                            z-index: 2;
                            text-align: center;
                        }

                        /* Badge */
                        .expansion-badge-container {
                            margin-bottom: 32px;
                            animation: expansionBadgeReveal 1s ease-out;
                        }

                        @keyframes expansionBadgeReveal {
                            from { opacity: 0; transform: translateY(-20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        .expansion-badge {
                            position: relative;
                            display: inline-flex;
                            align-items: center;
                            gap: 12px;
                            background: rgba(250, 187, 5, 0.15);
                            backdrop-filter: blur(30px);
                            border: 2px solid rgba(250, 187, 5, 0.4);
                            padding: 14px 32px;
                            border-radius: 50px;
                            color: #fabb05;
                            font-weight: 900;
                            font-size: 0.8rem;
                            letter-spacing: 3px;
                            box-shadow: 
                                0 10px 40px rgba(250, 187, 5, 0.3),
                                inset 0 1px 0 rgba(255, 255, 255, 0.2);
                            transition: all 0.4s ease;
                        }

                        .expansion-badge:hover {
                            transform: scale(1.05);
                            box-shadow: 0 15px 50px rgba(250, 187, 5, 0.5);
                        }

                        .expansion-badge-pulse {
                            position: absolute;
                            top: -5px;
                            left: -5px;
                            right: -5px;
                            bottom: -5px;
                            border-radius: 50px;
                            border: 3px solid #fabb05;
                            animation: expansionPulse 2.5s ease-in-out infinite;
                        }

                        @keyframes expansionPulse {
                            0%, 100% { transform: scale(1); opacity: 0.8; }
                            50% { transform: scale(1.08); opacity: 0; }
                        }

                        .expansion-badge-glow {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 120%;
                            height: 120%;
                            background: radial-gradient(circle, rgba(250, 187, 5, 0.3), transparent 70%);
                            filter: blur(20px);
                            animation: expansionGlowPulse 3s ease-in-out infinite;
                        }

                        @keyframes expansionGlowPulse {
                            0%, 100% { opacity: 0.5; }
                            50% { opacity: 1; }
                        }

                        .expansion-badge-shimmer {
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                            animation: expansionShimmer 3s ease-in-out infinite;
                        }

                        @keyframes expansionShimmer {
                            0% { left: -100%; }
                            50%, 100% { left: 100%; }
                        }

                        .expansion-badge-icon {
                            position: relative;
                            z-index: 2;
                            font-size: 1.1rem;
                            animation: expansionRocketFloat 4s ease-in-out infinite;
                            filter: drop-shadow(0 0 8px rgba(250, 187, 5, 0.8));
                        }

                        @keyframes expansionRocketFloat {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            25% { transform: translateY(-6px) rotate(-12deg); }
                            75% { transform: translateY(-3px) rotate(8deg); }
                        }

                        .expansion-badge-sparkles {
                            position: relative;
                            z-index: 2;
                            animation: expansionSparkle 2s ease-in-out infinite;
                        }

                        @keyframes expansionSparkle {
                            0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
                            50% { opacity: 0.6; transform: scale(1.2) rotate(180deg); }
                        }

                        /* Announcement */
                        .expansion-announcement {
                            margin-bottom: 48px;
                            animation: expansionAnnouncementReveal 1s ease-out 0.2s both;
                        }

                        @keyframes expansionAnnouncementReveal {
                            from { opacity: 0; transform: translateY(30px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        .expansion-title {
                            font-size: clamp(2rem, 5vw, 3.5rem);
                            font-weight: 900;
                            line-height: 1.2;
                            margin-bottom: 16px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }

                        .expansion-title-line {
                            color: white;
                            display: block;
                        }

                        .expansion-title-highlight {
                            background: linear-gradient(135deg, #fabb05 0%, #f59e0b 50%, #fabb05 100%);
                            background-size: 200% 200%;
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            background-clip: text;
                            display: block;
                            position: relative;
                            animation: expansionGradientShift 5s ease infinite;
                            filter: drop-shadow(0 0 30px rgba(250, 187, 5, 0.6));
                        }

                        @keyframes expansionGradientShift {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }

                        .expansion-title-underline {
                            position: absolute;
                            bottom: -12px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 80%;
                            max-width: 300px;
                            height: 12px;
                            animation: expansionUnderlineDraw 1.5s ease-out 0.8s both;
                        }

                        @keyframes expansionUnderlineDraw {
                            from { stroke-dasharray: 300; stroke-dashoffset: 300; }
                            to { stroke-dasharray: 300; stroke-dashoffset: 0; }
                        }

                        .expansion-subtitle {
                            color: rgba(255, 255, 255, 0.8);
                            font-size: 1.2rem;
                            font-weight: 600;
                            margin: 0;
                            animation: expansionSubtitleFade 1s ease-out 0.6s both;
                        }

                        @keyframes expansionSubtitleFade {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }

                        .expansion-number {
                            display: inline-block;
                            color: #fabb05;
                            font-weight: 900;
                            font-size: 1.4em;
                            text-shadow: 0 0 30px rgba(250, 187, 5, 0.8);
                            animation: expansionCounterUp 2s ease-out 1s both;
                        }

                        @keyframes expansionCounterUp {
                            from { transform: scale(0.5); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }

                        .expansion-plus {
                            color: #fabb05;
                            font-weight: 900;
                            animation: expansionPlusPulse 1.5s ease-in-out infinite;
                        }

                        @keyframes expansionPlusPulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.2); }
                        }

                        /* 3D Interactive Progress Card */
                        .expansion-progress-container {
                            position: relative;
                            max-width: 750px;
                            margin: 0 auto 60px;
                            padding: 40px;
                            background: rgba(255, 255, 255, 0.08);
                            backdrop-filter: blur(20px);
                            border-radius: 28px;
                            border: 1px solid rgba(250, 187, 5, 0.3);
                            box-shadow: 
                                0 20px 60px rgba(0, 0, 0, 0.4),
                                inset 0 1px 0 rgba(255, 255, 255, 0.1);
                            animation: expansionProgressReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both;
                            transition: transform 0.4s ease, box-shadow 0.4s ease;
                        }

                        .expansion-progress-container:hover {
                            transform: translateY(-8px) rotateX(2deg);
                            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
                        }

                        @keyframes expansionProgressReveal {
                            from { opacity: 0; transform: scale(0.85) translateY(30px); }
                            to { opacity: 1; transform: scale(1) translateY(0); }
                        }

                        .expansion-progress-glow-bg {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 110%;
                            height: 110%;
                            background: radial-gradient(circle, rgba(250, 187, 5, 0.2), transparent 70%);
                            filter: blur(40px);
                            opacity: 0.6;
                        }

                        .expansion-progress-header {
                            position: relative;
                            z-index: 2;
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 20px;
                            flex-wrap: wrap;
                            gap: 16px;
                        }

                        .expansion-progress-label {
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            color: rgba(255, 255, 255, 0.7);
                            font-size: 0.95rem;
                            font-weight: 700;
                            transition: all 0.3s ease;
                        }

                        .expansion-progress-label:hover {
                            color: rgba(255, 255, 255, 1);
                            transform: translateX(5px);
                        }

                        .expansion-label-icon-wrapper {
                            width: 32px;
                            height: 32px;
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                        }

                        .expansion-label-icon-wrapper:hover {
                            background: rgba(255, 255, 255, 0.2);
                            transform: rotate(360deg);
                        }

                        .expansion-target-icon {
                            background: rgba(250, 187, 5, 0.2);
                        }

                        .expansion-target-icon:hover {
                            background: rgba(250, 187, 5, 0.3);
                        }

                        .expansion-progress-target {
                            color: #fabb05;
                        }

                        .expansion-progress-bar-wrapper {
                            position: relative;
                            z-index: 2;
                            margin-bottom: 28px;
                        }

                        .expansion-progress-bar {
                            position: relative;
                            height: 14px;
                            background: rgba(255, 255, 255, 0.1);
                            border-radius: 50px;
                            overflow: visible;
                            box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
                        }

                        .expansion-progress-fill {
                            position: relative;
                            height: 100%;
                            width: 20%;
                            background: linear-gradient(90deg, #fabb05 0%, #f59e0b 50%, #fabb05 100%);
                            background-size: 200% 100%;
                            border-radius: 50px;
                            animation: 
                                expansionProgressFill 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both,
                                expansionProgressShine 3s ease-in-out infinite;
                            box-shadow: 0 0 20px rgba(250, 187, 5, 0.6);
                        }

                        @keyframes expansionProgressFill {
                            from { width: 0%; }
                            to { width: 20%; }
                        }

                        @keyframes expansionProgressShine {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }

                        .expansion-progress-shine {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                            animation: expansionProgressShineSweep 2s ease-in-out infinite;
                        }

                        @keyframes expansionProgressShineSweep {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(200%); }
                        }

                        .expansion-progress-glow {
                            position: absolute;
                            top: -5px;
                            left: 0;
                            height: calc(100% + 10px);
                            width: 20%;
                            background: radial-gradient(ellipse, rgba(250, 187, 5, 0.6), transparent 70%);
                            filter: blur(15px);
                            animation: expansionProgressGlowPulse 2s ease-in-out infinite;
                        }

                        @keyframes expansionProgressGlowPulse {
                            0%, 100% { opacity: 0.6; }
                            50% { opacity: 1; }
                        }

                        .expansion-progress-marker {
                            position: absolute;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            width: 24px;
                            height: 24px;
                            z-index: 10;
                        }

                        .expansion-marker-dot {
                            width: 100%;
                            height: 100%;
                            background: #fabb05;
                            border: 3px solid white;
                            border-radius: 50%;
                            box-shadow: 
                                0 0 0 4px rgba(250, 187, 5, 0.3),
                                0 4px 12px rgba(0, 0, 0, 0.4);
                            animation: expansionMarkerBounce 2s ease-in-out infinite;
                        }

                        @keyframes expansionMarkerBounce {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.2); }
                        }

                        .expansion-marker-pulse {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100%;
                            height: 100%;
                            border: 2px solid #fabb05;
                            border-radius: 50%;
                            animation: expansionMarkerPulseRing 2s ease-out infinite;
                        }

                        @keyframes expansionMarkerPulseRing {
                            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                            100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
                        }

                        .expansion-progress-stats {
                            position: relative;
                            z-index: 2;
                            display: flex;
                            justify-content: space-around;
                            gap: 28px;
                            flex-wrap: wrap;
                        }

                        .expansion-stat {
                            position: relative;
                            text-align: center;
                            padding: 20px;
                            border-radius: 16px;
                            background: rgba(255, 255, 255, 0.05);
                            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                            cursor: pointer;
                        }

                        .expansion-stat:hover {
                            background: rgba(255, 255, 255, 0.1);
                            transform: translateY(-8px) scale(1.05);
                        }

                        .expansion-stat-icon {
                            font-size: 1.8rem;
                            color: #fabb05;
                            margin-bottom: 8px;
                            animation: expansionStatIconFloat 3s ease-in-out infinite;
                        }

                        @keyframes expansionStatIconFloat {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-8px); }
                        }

                        .expansion-stat:hover .expansion-stat-icon {
                            animation: expansionStatIconSpin 0.6s ease-in-out;
                        }

                        @keyframes expansionStatIconSpin {
                            from { transform: rotate(0deg) scale(1); }
                            to { transform: rotate(360deg) scale(1.2); }
                        }

                        .expansion-stat-value {
                            font-size: 2.2rem;
                            font-weight: 900;
                            color: #fabb05;
                            margin-bottom: 6px;
                            text-shadow: 0 0 25px rgba(250, 187, 5, 0.5);
                            animation: expansionStatValuePulse 2s ease-in-out infinite;
                        }

                        @keyframes expansionStatValuePulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                        }

                        .expansion-stat-label {
                            font-size: 0.8rem;
                            font-weight: 700;
                            color: rgba(255, 255, 255, 0.6);
                            text-transform: uppercase;
                            letter-spacing: 2px;
                        }

                        .expansion-stat-glow {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 120%;
                            height: 120%;
                            background: radial-gradient(circle, rgba(250, 187, 5, 0.3), transparent 60%);
                            filter: blur(20px);
                            opacity: 0;
                            transition: opacity 0.4s ease;
                        }

                        .expansion-stat:hover .expansion-stat-glow {
                            opacity: 1;
                        }

                        /* Location Pins */
                        .expansion-locations {
                            display: flex;
                            justify-content: center;
                            gap: 24px;
                            margin-bottom: 48px;
                            flex-wrap: wrap;
                            animation: expansionLocationsReveal 1s ease-out 0.6s both;
                        }

                        @keyframes expansionLocationsReveal {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }

                        .expansion-location-pin {
                            width: 40px;
                            height: 40px;
                            background: rgba(250, 187, 5, 0.1);
                            border: 2px solid rgba(250, 187, 5, 0.3);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fabb05;
                            font-size: 1.2rem;
                            animation: expansionPinDrop 0.6s ease-out both;
                            animation-delay: var(--pin-delay);
                        }

                        @keyframes expansionPinDrop {
                            0% { transform: translateY(-100px) scale(0); opacity: 0; }
                            50% { transform: translateY(10px) scale(1.1); }
                            100% { transform: translateY(0) scale(1); opacity: 1; }
                        }

                        .expansion-location-pin:hover {
                            background: rgba(250, 187, 5, 0.2);
                            transform: scale(1.2);
                            box-shadow: 0 8px 20px rgba(250, 187, 5, 0.3);
                        }

                        /* Interactive Map Visualization */
                        .expansion-map-container {
                            max-width: 900px;
                            margin: 0 auto 60px;
                            padding: 40px;
                            background: rgba(255, 255, 255, 0.05);
                            backdrop-filter: blur(15px);
                            border-radius: 28px;
                            border: 1px solid rgba(250, 187, 5, 0.2);
                            animation: expansionMapReveal 1.2s ease-out 0.7s both;
                        }

                        @keyframes expansionMapReveal {
                            from { opacity: 0; transform: translateY(40px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        .expansion-map-title {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 12px;
                            color: #fabb05;
                            font-size: 1.1rem;
                            font-weight: 800;
                            margin-bottom: 32px;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                        }

                        .expansion-map-title i {
                            font-size: 1.5rem;
                            animation: expansionMapIconPulse 2s ease-in-out infinite;
                        }

                        @keyframes expansionMapIconPulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.15); }
                        }

                        .expansion-map-visual {
                            position: relative;
                            min-height: 300px;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                            align-items: center;
                            gap: 20px;
                            padding: 20px;
                        }

                        .expansion-connection-lines {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            opacity: 0.4;
                        }

                        .expansion-connection-line {
                            animation: expansionLineDash 3s linear infinite;
                            animation-delay: var(--line-delay);
                        }

                        @keyframes expansionLineDash {
                            0% { stroke-dashoffset: 0; }
                            100% { stroke-dashoffset: 20; }
                        }

                        .expansion-location-marker {
                            position: relative;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 8px;
                            animation: expansionMarkerDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                            animation-delay: var(--marker-delay);
                            cursor: pointer;
                            transition: transform 0.3s ease;
                        }

                        .expansion-location-marker:hover {
                            transform: scale(1.15);
                            z-index: 10;
                        }

                        @keyframes expansionMarkerDrop {
                            0% { transform: translateY(-150px) scale(0); opacity: 0; }
                            60% { transform: translateY(10px) scale(1.15); }
                            100% { transform: translateY(0) scale(1); opacity: 1; }
                        }

                        .expansion-marker-pulse-ring {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 60px;
                            height: 60px;
                            border: 2px solid #fabb05;
                            border-radius: 50%;
                            animation: expansionMarkerRingPulse 2s ease-out infinite;
                        }

                        @keyframes expansionMarkerRingPulse {
                            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
                            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                        }

                        .expansion-marker-dot {
                            width: 50px;
                            height: 50px;
                            background: rgba(250, 187, 5, 0.2);
                            border: 3px solid #fabb05;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fabb05;
                            font-size: 1.5rem;
                            box-shadow: 
                                0 0 20px rgba(250, 187, 5, 0.5),
                                inset 0 0 10px rgba(250, 187, 5, 0.3);
                            transition: all 0.3s ease;
                        }

                        .expansion-location-marker:hover .expansion-marker-dot {
                            background: rgba(250, 187, 5, 0.4);
                            box-shadow: 0 0 30px rgba(250, 187, 5, 0.8);
                            transform: scale(1.1);
                        }

                        .expansion-location-active .expansion-marker-dot {
                            background: rgba(250, 187, 5, 0.3);
                            animation: expansionActiveMarkerPulse 2s ease-in-out infinite;
                        }

                        @keyframes expansionActiveMarkerPulse {
                            0%, 100% { box-shadow: 0 0 20px rgba(250, 187, 5, 0.5); }
                            50% { box-shadow: 0 0 40px rgba(250, 187, 5, 1); }
                        }

                        .expansion-location-future .expansion-marker-dot {
                            background: rgba(255, 255, 255, 0.1);
                            border-color: rgba(250, 187, 5, 0.5);
                            color: rgba(250, 187, 5, 0.7);
                        }

                        .expansion-marker-label {
                            font-size: 0.85rem;
                            font-weight: 700;
                            color: rgba(255, 255, 255, 0.8);
                            text-align: center;
                            padding: 6px 12px;
                            background: rgba(0, 0, 0, 0.5);
                            backdrop-filter: blur(10px);
                            border-radius: 8px;
                            white-space: nowrap;
                            opacity: 0;
                            transform: translateY(10px);
                            transition: all 0.3s ease;
                        }

                        .expansion-location-marker:hover .expansion-marker-label {
                            opacity: 1;
                            transform: translateY(0);
                        }

                        /* Ultra Premium CTA Button */
                        .expansion-cta-button {
                            position: relative;
                            background: linear-gradient(135deg, #fabb05 0%, #f59e0b 50%, #fabb05 100%);
                            background-size: 200% 200%;
                            color: #0f172a;
                            border: none;
                            padding: 20px 56px;
                            border-radius: 50px;
                            font-weight: 900;
                            font-size: 1.15rem;
                            letter-spacing: 1.5px;
                            overflow: hidden;
                            box-shadow: 
                                0 20px 50px rgba(250, 187, 5, 0.5),
                                inset 0 1px 0 rgba(255, 255, 255, 0.3);
                            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                            animation: 
                                expansionButtonReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both,
                                expansionButtonGradient 5s ease infinite;
                            cursor: pointer;
                        }

                        @keyframes expansionButtonReveal {
                            from { opacity: 0; transform: translateY(40px) scale(0.9); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }

                        @keyframes expansionButtonGradient {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }

                        .expansion-cta-button:hover {
                            transform: translateY(-8px) scale(1.08);
                            box-shadow: 0 30px 70px rgba(250, 187, 5, 0.7);
                        }

                        .expansion-btn-content {
                            position: relative;
                            z-index: 3;
                            display: flex;
                            align-items: center;
                            gap: 14px;
                        }

                        .expansion-btn-icon {
                            font-size: 1.4rem;
                            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                        }

                        .expansion-btn-arrow {
                            font-size: 1.4rem;
                            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                        }

                        .expansion-cta-button:hover .expansion-btn-arrow {
                            transform: translateX(10px);
                        }

                        .expansion-cta-button:hover .expansion-btn-icon {
                            transform: scale(1.3) rotate(15deg);
                        }

                        .expansion-btn-shine {
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
                            transition: left 0.8s ease;
                            z-index: 2;
                        }

                        .expansion-cta-button:hover .expansion-btn-shine {
                            left: 100%;
                        }

                        .expansion-btn-glow-pulse {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100%;
                            height: 100%;
                            background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
                            filter: blur(20px);
                            opacity: 0;
                            transition: opacity 0.5s ease;
                            z-index: 1;
                        }

                        .expansion-cta-button:hover .expansion-btn-glow-pulse {
                            opacity: 1;
                            animation: expansionBtnGlowPulse 1.5s ease-in-out infinite;
                        }

                        @keyframes expansionBtnGlowPulse {
                            0%, 100% { transform: translate(-50%, -50%) scale(1); }
                            50% { transform: translate(-50%, -50%) scale(1.2); }
                        }

                        .expansion-btn-particles {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: 1;
                        }

                        .expansion-btn-particle {
                            position: absolute;
                            width: 5px;
                            height: 5px;
                            background: white;
                            border-radius: 50%;
                            opacity: 0;
                            top: 50%;
                            left: 50%;
                        }

                        .expansion-cta-button:hover .expansion-btn-particle {
                            animation: expansionBtnParticleExplode 1.2s ease-out;
                        }

                        .expansion-btn-particle:nth-child(1) { animation-delay: 0s; }
                        .expansion-btn-particle:nth-child(2) { animation-delay: 0.05s; }
                        .expansion-btn-particle:nth-child(3) { animation-delay: 0.1s; }
                        .expansion-btn-particle:nth-child(4) { animation-delay: 0.15s; }
                        .expansion-btn-particle:nth-child(5) { animation-delay: 0.2s; }
                        .expansion-btn-particle:nth-child(6) { animation-delay: 0.25s; }

                        @keyframes expansionBtnParticleExplode {
                            0% { 
                                transform: translate(0, 0) scale(0);
                                opacity: 1;
                            }
                            100% { 
                                transform: translate(calc(var(--random-x, 1) * 60px), calc(var(--random-y, 1) * 60px)) scale(1);
                                opacity: 0;
                            }
                        }

                        .expansion-btn-particle:nth-child(1) { --random-x: 1; --random-y: -1; }
                        .expansion-btn-particle:nth-child(2) { --random-x: -1; --random-y: -1; }
                        .expansion-btn-particle:nth-child(3) { --random-x: 1; --random-y: 1; }
                        .expansion-btn-particle:nth-child(4) { --random-x: -1; --random-y: 1; }
                        .expansion-btn-particle:nth-child(5) { --random-x: 0; --random-y: -1.5; }
                        .expansion-btn-particle:nth-child(6) { --random-x: 0; --random-y: 1.5; }

                        .expansion-btn-ripple {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100%;
                            height: 100%;
                            border: 2px solid rgba(255, 255, 255, 0.5);
                            border-radius: 50px;
                            opacity: 0;
                            z-index: 1;
                        }

                        .expansion-cta-button:active .expansion-btn-ripple {
                            animation: expansionBtnRipple 0.6s ease-out;
                        }

                        @keyframes expansionBtnRipple {
                            0% { 
                                transform: translate(-50%, -50%) scale(1);
                                opacity: 1;
                            }
                            100% { 
                                transform: translate(-50%, -50%) scale(1.3);
                                opacity: 0;
                            }
                        }

                        /* CTA Button */
                        .expansion-cta-button {
                            position: relative;
                            background: linear-gradient(135deg, #fabb05 0%, #f59e0b 100%);
                            color: #0f172a;
                            border: none;
                            padding: 18px 48px;
                            border-radius: 50px;
                            font-weight: 900;
                            font-size: 1.1rem;
                            letter-spacing: 1px;
                            overflow: hidden;
                            box-shadow: 0 15px 40px rgba(250, 187, 5, 0.4);
                            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                            animation: expansionButtonReveal 1s ease-out 0.8s both;
                        }

                        @keyframes expansionButtonReveal {
                            from { opacity: 0; transform: translateY(30px); }
                            to { opacity: 1; transform: translateY(0); }
                        }

                        .expansion-cta-button:hover {
                            transform: translateY(-5px) scale(1.05);
                            box-shadow: 0 20px 50px rgba(250, 187, 5, 0.5);
                        }

                        .expansion-btn-content {
                            position: relative;
                            z-index: 2;
                            display: flex;
                            align-items: center;
                            gap: 12px;
                        }

                        .expansion-btn-icon {
                            font-size: 1.3rem;
                            transition: transform 0.4s ease;
                        }

                        .expansion-btn-arrow {
                            font-size: 1.3rem;
                            transition: transform 0.4s ease;
                        }

                        .expansion-cta-button:hover .expansion-btn-arrow {
                            transform: translateX(8px);
                        }

                        .expansion-cta-button:hover .expansion-btn-icon {
                            transform: scale(1.2) rotate(10deg);
                        }

                        .expansion-btn-shine {
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                            transition: left 0.6s ease;
                        }

                        .expansion-cta-button:hover .expansion-btn-shine {
                            left: 100%;
                        }

                        .expansion-btn-particles {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                        }

                        .expansion-btn-particle {
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            background: white;
                            border-radius: 50%;
                            opacity: 0;
                        }

                        .expansion-cta-button:hover .expansion-btn-particle {
                            animation: expansionParticleExplode 1s ease-out;
                        }

                        .expansion-btn-particle:nth-child(1) { 
                            animation-delay: 0s;
                            --particle-x: 50px;
                            --particle-y: -50px;
                        }
                        .expansion-btn-particle:nth-child(2) { 
                            animation-delay: 0.1s;
                            --particle-x: -50px;
                            --particle-y: -50px;
                        }
                        .expansion-btn-particle:nth-child(3) { 
                            animation-delay: 0.2s;
                            --particle-x: 0px;
                            --particle-y: -70px;
                        }

                        @keyframes expansionParticleExplode {
                            0% { transform: translate(0, 0) scale(0); opacity: 1; }
                            100% { transform: translate(var(--particle-x), var(--particle-y)) scale(1); opacity: 0; }
                        }

                        /* Responsive Design */
                        @media (max-width: 991px) {
                            .infrastructure-expansion-section {
                                margin-top: 60px;
                                padding: 60px 20px;
                                border-radius: 32px;
                            }

                            .expansion-progress-container,
                            .expansion-map-container {
                                padding: 30px 20px;
                            }

                            .expansion-title {
                                font-size: 2.2rem;
                            }

                            .expansion-map-visual {
                                min-height: 250px;
                            }
                        }

                        @media (max-width: 575px) {
                            .infrastructure-expansion-section {
                                padding: 40px 15px;
                                border-radius: 24px;
                            }

                            .expansion-badge {
                                padding: 12px 24px;
                                font-size: 0.7rem;
                                gap: 10px;
                            }

                            .expansion-title {
                                font-size: 1.8rem;
                            }

                            .expansion-subtitle {
                                font-size: 1rem;
                            }

                            .expansion-progress-container,
                            .expansion-map-container {
                                padding: 24px 16px;
                            }

                            .expansion-progress-header {
                                flex-direction: column;
                                align-items: flex-start;
                            }

                            .expansion-progress-stats {
                                gap: 16px;
                            }

                            .expansion-stat {
                                padding: 16px;
                                flex: 1 1 calc(50% - 8px);
                                min-width: 120px;
                            }

                            .expansion-stat-value {
                                font-size: 1.8rem;
                            }

                            .expansion-map-visual {
                                min-height: 200px;
                                gap: 15px;
                            }

                            .expansion-marker-dot {
                                width: 40px;
                                height: 40px;
                                font-size: 1.2rem;
                            }

                            .expansion-cta-button {
                                padding: 16px 40px;
                                font-size: 1rem;
                            }
                        }
                    `}</style>
                </div>
            </Container>

            <style>{`
                /* Section Background */
                .infrastructure-premium-section {
                    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 50%, #ffffff 100%);
                    min-height: 100vh;
                }

                .infrastructure-bg-gradient {
                    background: radial-gradient(circle at 20% 50%, rgba(250, 187, 5, 0.05) 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, rgba(15, 23, 42, 0.03) 0%, transparent 50%);
                    animation: infrastructureGradientShift 15s ease infinite;
                }

                @keyframes infrastructureGradientShift {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                /* Floating Shapes */
                .infrastructure-shape {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.03;
                    pointer-events: none;
                }

                .infrastructure-shape-1 {
                    width: 400px;
                    height: 400px;
                    background: linear-gradient(135deg, #fabb05, #f59e0b);
                    top: 10%;
                    right: -5%;
                    animation: infrastructureFloat 20s ease-in-out infinite;
                }

                .infrastructure-shape-2 {
                    width: 300px;
                    height: 300px;
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    bottom: 15%;
                    left: -5%;
                    animation: infrastructureFloat 25s ease-in-out infinite reverse;
                }

                .infrastructure-shape-3 {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(135deg, #fabb05, #0f172a);
                    top: 50%;
                    left: 50%;
                    animation: infrastructureFloat 30s ease-in-out infinite;
                }

                @keyframes infrastructureFloat {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(30px, -30px) rotate(120deg); }
                    66% { transform: translate(-20px, 20px) rotate(240deg); }
                }

                /* Header Animations */
                .infrastructure-header {
                    animation: infrastructureFadeInUp 0.8s ease-out;
                }

                @keyframes infrastructureFadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .infrastructure-badge-wrapper {
                    animation: infrastructureBadgeFloat 3s ease-in-out infinite;
                }

                @keyframes infrastructureBadgeFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }

                .infrastructure-pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: #fabb05;
                    border-radius: 50%;
                    animation: infrastructurePulse 2s ease-in-out infinite;
                }

                @keyframes infrastructurePulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                }

                .infrastructure-badge {
                    background: linear-gradient(135deg, #fabb05 0%, #f59e0b 100%) !important;
                    color: #0f172a !important;
                    border: none;
                    box-shadow: 0 4px 15px rgba(250, 187, 5, 0.3);
                    letter-spacing: 2px;
                    font-size: 0.75rem;
                }

                .infrastructure-title {
                    letter-spacing: -2px;
                    line-height: 1.1;
                }

                .infrastructure-title-gradient {
                    background: linear-gradient(135deg, #fabb05 0%, #f59e0b 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .infrastructure-subtitle {
                    animation: infrastructureFadeIn 1s ease-out 0.3s both;
                }

                @keyframes infrastructureFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Card Wrapper */
                .infrastructure-card-col {
                    animation: infrastructureCardReveal 0.8s ease-out both;
                    animation-delay: var(--delay);
                }

                @keyframes infrastructureCardReveal {
                    from { opacity: 0; transform: translateY(50px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .infrastructure-card-wrapper {
                    perspective: 1000px;
                    height: 100%;
                }

                /* Premium 3D Card */
                .infrastructure-card {
                    position: relative;
                    background: white;
                    border-radius: 24px;
                    overflow: hidden;
                    height: 100%;
                    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
                }

                .infrastructure-card:hover {
                    transform: translateY(-12px) rotateX(2deg);
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
                }

                /* Gradient Border */
                .infrastructure-card-border {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--accent), transparent);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .infrastructure-card:hover .infrastructure-card-border {
                    opacity: 1;
                }

                /* Image Section */
                .infrastructure-card-image-wrapper {
                    position: relative;
                    height: 280px;
                    overflow: hidden;
                }

                .infrastructure-card-image {
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
                }

                .infrastructure-card:hover .infrastructure-card-image {
                    transform: scale(1.1) rotate(2deg);
                }

                .infrastructure-card-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.7) 100%);
                    transition: opacity 0.4s ease;
                }

                .infrastructure-card:hover .infrastructure-card-overlay {
                    opacity: 0.5;
                }

                /* Type Badge */
                .infrastructure-type-badge {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 8px 16px;
                    border-radius: 50px;
                    font-size: 0.75rem;
                    font-weight: 900;
                    color: #0f172a;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    letter-spacing: 1px;
                    z-index: 2;
                }

                /* Animated Icon */
                .infrastructure-icon-wrapper {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: rgba(250, 187, 5, 0.9);
                    backdrop-filter: blur(10px);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 25px rgba(250, 187, 5, 0.4);
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                    z-index: 2;
                }

                .infrastructure-card:hover .infrastructure-icon-wrapper {
                    transform: scale(1.2) rotate(360deg);
                    box-shadow: 0 12px 35px rgba(250, 187, 5, 0.6);
                }

                .infrastructure-icon {
                    font-size: 1.75rem;
                    color: #0f172a;
                }

                /* Content Section */
                .infrastructure-card-content {
                    padding: 24px;
                }

                .infrastructure-card-title {
                    font-size: 1.5rem;
                    letter-spacing: -0.5px;
                    transition: color 0.3s ease;
                }

                .infrastructure-card:hover .infrastructure-card-title {
                    color: #fabb05;
                }

                .infrastructure-location-badge {
                    display: inline-flex;
                    align-items: center;
                    background: linear-gradient(135deg, rgba(250, 187, 5, 0.1), rgba(250, 187, 5, 0.05));
                    color: #f59e0b;
                    padding: 6px 12px;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }

                /* Address Section */
                .infrastructure-address-section {
                    display: flex;
                    gap: 12px;
                    padding: 16px;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.02), rgba(15, 23, 42, 0.05));
                    border-radius: 12px;
                    border-left: 3px solid #fabb05;
                }

                .infrastructure-address-icon {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    background: #fabb05;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #0f172a;
                    font-size: 1rem;
                }

                .infrastructure-address-text {
                    color: #64748b;
                    font-size: 0.9rem;
                    font-weight: 600;
                    line-height: 1.6;
                }

                /* Stats Row */
                .infrastructure-stats-row {
                    display: flex;
                    justify-content: space-around;
                    padding: 16px;
                    background: linear-gradient(135deg, rgba(250, 187, 5, 0.05), transparent);
                    border-radius: 12px;
                }

                .infrastructure-stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .infrastructure-stat-item i {
                    font-size: 1.25rem;
                }

                /* Action Button */
                .infrastructure-action-btn {
                    position: relative;
                    background: #0f172a;
                    color: white;
                    border: none;
                    padding: 14px 24px;
                    border-radius: 50px;
                    font-weight: 900;
                    font-size: 0.9rem;
                    letter-spacing: 1px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .infrastructure-action-btn:hover {
                    background: #fabb05;
                    color: #0f172a;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(250, 187, 5, 0.4);
                }

                .infrastructure-btn-icon {
                    font-size: 1.25rem;
                    transition: transform 0.4s ease;
                }

                .infrastructure-action-btn:hover .infrastructure-btn-icon {
                    transform: translateX(5px);
                }

                .infrastructure-btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s ease;
                }

                .infrastructure-action-btn:hover .infrastructure-btn-shine {
                    left: 100%;
                }

                /* Card Glow Effect */
                .infrastructure-card-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.6s ease;
                    pointer-events: none;
                }

                .infrastructure-card:hover .infrastructure-card-glow {
                    opacity: 0.1;
                }

                /* Bottom CTA */
                .infrastructure-cta-btn {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: white;
                    border: none;
                    border-radius: 50px;
                    font-size: 1rem;
                    letter-spacing: 1px;
                    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3);
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }

                .infrastructure-cta-btn:hover {
                    background: linear-gradient(135deg, #fabb05 0%, #f59e0b 100%);
                    color: #0f172a;
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(250, 187, 5, 0.4);
                }

                /* Responsive Design */
                @media (max-width: 991px) {
                    .infrastructure-title {
                        font-size: 2.5rem;
                    }
                    
                    .infrastructure-card-image-wrapper {
                        height: 220px;
                    }
                }

                @media (max-width: 575px) {
                    .infrastructure-title {
                        font-size: 2rem;
                        letter-spacing: -1px;
                    }

                    .infrastructure-card-image-wrapper {
                        height: 200px;
                    }

                    .infrastructure-stats-row {
                        flex-direction: column;
                        gap: 12px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;
