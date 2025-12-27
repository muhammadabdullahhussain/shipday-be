import React, { useState } from 'react';
import { Container, Button, Row, Col, Card, Carousel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import carousel images
import carouselImg1 from '../../assets/shipday_hero_warehouse_new.jpg';
import carouselImg2 from '../../assets/shipday_hero_van_workers.jpg';
import carouselImg3 from '../../assets/shipday_hero_van_scooter.jpg';
import carouselImg4 from '../../assets/shipday_hero_fleet_highway.jpg';
import carouselImg5 from '../../assets/shipday_hero_customer_new.jpg';

// Import secondary section images
import statsBg from '../../assets/shipday_warehouse_banner.jpg';
import ctaBg from '../../assets/shipday_truck_cta.jpg';

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const carouselSlides = [
        {
            image: carouselImg1,
            badge: 'SMART LOGISTICS',
            title: 'Efficient Warehousing.',
            subtitle: 'State-of-the-art facilities handling thousands of parcels with ShipDay precision',
            cta: 'Start Shipping',
            link: '/register',
            bgStyles: { backgroundSize: 'cover', backgroundPosition: 'center center' }
        },
        {
            image: carouselImg2,
            badge: 'PROFESSIONAL TEAM',
            title: 'Your Experts in Motion.',
            subtitle: 'Dedicated professionals ensuring your cargo reaches its destination safely',
            cta: 'Explore Services',
            link: '/services',
            bgStyles: { backgroundSize: 'cover', backgroundPosition: 'center center' }
        },
        {
            image: carouselImg3,
            badge: 'URBAN DELIVERY',
            title: 'Fast & Secure Courier.',
            subtitle: 'Navigating city streets with speed and care for rapid door-to-door delivery',
            cta: 'Book Now',
            link: '/services',
            bgStyles: { backgroundSize: 'cover', backgroundPosition: 'center center' }
        },
        {
            image: carouselImg4,
            badge: 'NATIONWIDE FLEET',
            title: 'Reliable Logistics network.',
            subtitle: 'Connecting cities across South Africa with our modern and reliable delivery fleet',
            cta: 'Get Quote',
            link: '/contact',
            bgStyles: { backgroundSize: 'cover', backgroundPosition: 'center center' }
        },
        {
            image: carouselImg5,
            badge: 'CUSTOMER FIRST',
            title: 'Delivering Smiles Daily.',
            subtitle: 'The ShipDay promise of excellence delivered straight to your doorstep',
            cta: 'Join Now',
            link: '/register',
            bgStyles: { backgroundSize: 'cover', backgroundPosition: 'center center' }
        }
    ];

    return (
        <div className="font-sans bg-white">
            {/* 1. ENHANCED HERO CAROUSEL SECTION */}
            <section className="position-relative overflow-hidden">
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={5000}
                    pause="hover"
                    indicators={true}
                    controls={true}
                    fade
                >
                    {carouselSlides.map((slide, idx) => (
                        <Carousel.Item key={idx}>
                            <div className="position-relative" style={{ minHeight: '90vh' }}>
                                {/* Background Image with Parallax Effect */}
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100 carousel-bg"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                        backgroundSize: slide.bgStyles?.backgroundSize || 'cover',
                                        backgroundPosition: slide.bgStyles?.backgroundPosition || 'center center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundColor: '#0f172a', // Dark fallback background
                                        backgroundAttachment: 'scroll',
                                        filter: 'brightness(0.4)'
                                    }}
                                ></div>

                                {/* Dynamic Gradient Overlay */}
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100"
                                    style={{
                                        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.7) 50%, rgba(250, 187, 5, 0.1) 100%)`
                                    }}
                                ></div>


                                {/* Content */}
                                <Container className="position-relative h-100 d-flex align-items-center" style={{ minHeight: '90vh', zIndex: 10 }}>
                                    <Row className="w-100 align-items-center">
                                        <Col lg={7} xl={6}>
                                            <div className="text-white">
                                                {/* Animated Badge */}
                                                <div className="slide-in-left" style={{ animationDelay: '0.2s' }}>
                                                    <Badge bg="warning" className="text-dark mb-4 px-4 py-3 fw-bold tracking-wider shadow-lg pulse-badge"
                                                        style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
                                                        <i className="bi bi-lightning-charge-fill me-2"></i>
                                                        {slide.badge}
                                                    </Badge>
                                                </div>

                                                {/* Animated Title */}
                                                <div className="slide-in-left" style={{ animationDelay: '0.4s' }}>
                                                    <h1 className="display-1 fw-bold mb-4 lh-1 hero-title" style={{ letterSpacing: '-3px' }}>
                                                        {slide.title.split(' ').map((word, i) => {
                                                            const isHighlight = ['Warehousing.', 'Motion.', 'Courier.', 'network.', 'Daily.'].includes(word);
                                                            return (
                                                                <span key={i} className={isHighlight ? 'text-yellow glow-text' : ''}>
                                                                    {word}{' '}
                                                                </span>
                                                            );
                                                        })}
                                                    </h1>
                                                </div>

                                                {/* Animated Subtitle */}
                                                <div className="slide-in-left" style={{ animationDelay: '0.6s' }}>
                                                    <p className="lead text-white mb-5 fs-3 fw-light" style={{ maxWidth: '650px', lineHeight: '1.8', opacity: 0.9 }}>
                                                        {slide.subtitle}
                                                    </p>
                                                </div>

                                                {/* Animated Buttons */}
                                                <div className="slide-in-left d-flex flex-wrap gap-3 mb-5" style={{ animationDelay: '0.8s' }}>
                                                    <Button as={Link} to={slide.link}
                                                        className="btn-yellow rounded-pill px-5 py-4 fw-bold hover-lift shadow-lg border-0 btn-glow"
                                                        style={{ fontSize: '1.15rem' }}>
                                                        <i className="bi bi-box-seam me-2"></i>
                                                        {slide.cta}
                                                    </Button>
                                                    <Button as={Link} to="/tracking"
                                                        variant="outline-light"
                                                        className="rounded-pill px-5 py-4 fw-bold hover-lift border-2 btn-outline-glow"
                                                        style={{ fontSize: '1.15rem' }}>
                                                        <i className="bi bi-search me-2"></i>
                                                        Track Parcel
                                                    </Button>
                                                </div>

                                                {/* Trust Indicators */}
                                                <div className="slide-in-left d-flex flex-wrap gap-4 pt-4 border-top border-light border-opacity-25" style={{ animationDelay: '1s' }}>
                                                    {[
                                                        { text: 'No Hidden Fees', icon: 'bi-check-circle-fill' },
                                                        { text: 'Real-time Tracking', icon: 'bi-geo-alt-fill' },
                                                        { text: 'Insured Delivery', icon: 'bi-shield-fill-check' }
                                                    ].map((item, i) => (
                                                        <div key={i} className="d-flex align-items-center text-white fw-medium">
                                                            <div className="rounded-circle bg-yellow d-flex align-items-center justify-content-center me-2"
                                                                style={{ width: '32px', height: '32px' }}>
                                                                <i className={`bi ${item.icon} text-dark`} style={{ fontSize: '0.9rem' }}></i>
                                                            </div>
                                                            <span style={{ fontSize: '0.95rem' }}>{item.text}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </Col>

                                        {/* Floating Stats Card */}
                                        <Col lg={5} xl={6} className="d-none d-lg-block">
                                            <div className="slide-in-right" style={{ animationDelay: '0.6s' }}>
                                                <Card className="border-0 shadow-2xl rounded-5 overflow-hidden glass-card-enhanced floating-card"
                                                    style={{ backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.1)' }}>
                                                    <div className="position-absolute top-0 start-0 w-100"
                                                        style={{ height: '6px', background: 'linear-gradient(90deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                                    <Card.Body className="p-5">
                                                        <div className="text-center mb-4">
                                                            <div className="rounded-circle bg-yellow d-inline-flex align-items-center justify-content-center mb-3 pulse-icon"
                                                                style={{ width: '90px', height: '90px' }}>
                                                                <i className="bi bi-award-fill fs-1 text-dark"></i>
                                                            </div>
                                                            <h4 className="fw-bold text-white mb-2">Trusted Excellence</h4>
                                                            <p className="text-white-50 small mb-0">South Africa's Premier Delivery Network</p>
                                                        </div>
                                                        <Row className="g-3">
                                                            {[
                                                                { num: '10k+', label: 'Deliveries' },
                                                                { num: '99.9%', label: 'On-Time' },
                                                                { num: '50+', label: 'Cities' },
                                                                { num: '2k+', label: 'Clients' }
                                                            ].map((stat, i) => (
                                                                <Col xs={6} key={i}>
                                                                    <div className="text-center p-3 rounded-4 stat-card"
                                                                        style={{ background: 'rgba(250, 187, 5, 0.1)', border: '1px solid rgba(250, 187, 5, 0.2)' }}>
                                                                        <div className="h3 fw-bold text-yellow mb-1">{stat.num}</div>
                                                                        <small className="text-white-50 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                                                                            {stat.label}
                                                                        </small>
                                                                    </div>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>

                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </section>

            {/* 2. ENHANCED STATS/TRUST SECTION */}
            <section className="position-relative py-5 overflow-hidden bg-dark border-top border-bottom border-light border-opacity-10"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <Container className="position-relative z-1 py-4">
                    <Row className="g-0 text-center">
                        {[
                            { number: '10,000+', label: 'Deliveries Completed', icon: 'bi-box-seam', sub: 'Safe & Secure' },
                            { number: '2,000+', label: 'Happy Clients', icon: 'bi-people', sub: 'Direct Feedback' },
                            { number: '50+', label: 'Cities Covered', icon: 'bi-geo-alt', sub: 'Coastal to Inland' },
                            { number: '99.9%', label: 'On-Time Delivery', icon: 'bi-clock-history', sub: 'Reliability first' }
                        ].map((stat, i) => (
                            <Col md={6} lg={3} key={i} className="border-end border-light border-opacity-10 py-4 px-4 fade-in-up"
                                style={{ animationDelay: `${i * 0.1}s`, borderRight: i === 3 ? 'none' : '' }}>
                                <div className="p-2 transition-all hover-lift">
                                    <div className="mb-3 d-inline-block p-3 rounded-circle" style={{ background: 'rgba(250, 187, 5, 0.1)' }}>
                                        <i className={`bi ${stat.icon} fs-2 text-yellow shadow-glow`}></i>
                                    </div>
                                    <div className="display-4 fw-black text-white mb-1" style={{ letterSpacing: '-2px' }}>{stat.number}</div>
                                    <div className="text-yellow fw-bold text-uppercase small mb-2" style={{ letterSpacing: '2px' }}>
                                        {stat.label}
                                    </div>
                                    <p className="text-white-50 small mb-0">{stat.sub}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>



            {/* 4. HOW IT WORKS SECTION - VERTICAL STEPPER REDESIGN */}
            <section className="py-5 bg-white">
                <Container className="py-5">
                    <Row className="align-items-center g-5">
                        <Col lg={5}>
                            <Badge bg="warning" className="text-dark mb-4 px-3 py-2 fw-bold tracking-wider">
                                SIMPLE PROCESS
                            </Badge>
                            <h2 className="display-4 fw-bold text-dark mb-4">Four steps to <span className="text-yellow">logistics mastery.</span></h2>
                            <p className="text-muted lead mb-5">
                                We've streamlined our operations so you can focus on your business. Experience the easiest shipping process in South Africa.
                            </p>
                            <Button as={Link} to="/register" className="btn-yellow px-5 py-3 rounded-pill fw-bold">
                                Get Started Now
                            </Button>
                        </Col>
                        <Col lg={7}>
                            <div className="position-relative ps-4 ps-md-5">
                                {/* Vertical Line */}
                                <div className="position-absolute h-100 bg-yellow opacity-25"
                                    style={{ width: '4px', left: '0', top: '0' }}></div>

                                {[
                                    { num: '01', title: 'Smart Booking', desc: 'Securely book your delivery via our advanced digital portal in under 60 seconds.', icon: 'bi-laptop' },
                                    { num: '02', title: 'Rapid Collection', desc: 'Our professional courier arrives at your doorstep for a seamless handover.', icon: 'bi-box-seam' },
                                    { num: '03', title: 'Global-grade Shipping', desc: 'Your parcel moves through our optimized hub-and-spoke network with full GPS tracking.', icon: 'bi-geo-alt' },
                                    { num: '04', title: 'Successful Delivery', desc: 'Secure hand-off with digital proof of delivery and instant notification.', icon: 'bi-check-circle' }
                                ].map((step, i) => (
                                    <div key={i} className="mb-5 position-relative">
                                        {/* Step Number Badge */}
                                        <div className="position-absolute rounded-circle bg-yellow d-flex align-items-center justify-content-center fw-bold text-dark shadow-sm"
                                            style={{ width: '40px', height: '40px', left: '-22px', top: '0', zIndex: 10, border: '4px solid white' }}>
                                            {step.num}
                                        </div>
                                        <div className="ps-4">
                                            <div className="d-flex align-items-center mb-2">
                                                <i className={`bi ${step.icon} text-yellow me-3 fs-4`}></i>
                                                <h4 className="fw-bold mb-0">{step.title}</h4>
                                            </div>
                                            <p className="text-muted mb-0">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 5. SERVICES OVERVIEW - ENHANCED CARDS */}
            <section className="py-5 bg-dark" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <Badge bg="warning" className="text-dark mb-3 px-3 py-2 fw-bold tracking-wider">
                            OUR SERVICES
                        </Badge>
                        <h2 className="display-4 fw-bold text-white mb-3">Tailored solutions for <span className="text-yellow">enterprise growth.</span></h2>
                        <p className="text-white-50 lead max-width-700 mx-auto">
                            From mission-critical B2B logistics to rapid door-to-door delivery, we power your success.
                        </p>
                    </div>

                    <Row className="g-4">
                        {[
                            {
                                title: 'B2B Logistics',
                                icon: 'bi-building-fill-gear',
                                desc: 'Reliable business-to-business delivery solutions for high-volume consistent operations.',
                                color: '#fabb05'
                            },
                            {
                                title: 'Premium Door-to-Door',
                                icon: 'bi-house-heart-fill',
                                desc: 'End-to-end parcel collection and white-glove delivery with real-time tracking.',
                                color: '#ffffff'
                            },
                            {
                                title: 'E-commerce Fulfillment',
                                icon: 'bi-basket3-fill',
                                desc: 'Specialized last-mile solutions for online retailers with scale and speed.',
                                color: '#fabb05'
                            }
                        ].map((service, i) => (
                            <Col lg={4} key={i} className="fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                                <Card className="border-0 shadow-lg rounded-4 h-100 bg-white bg-opacity-10 backdrop-blur hover-lift overflow-hidden text-white"
                                    style={{ backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Card.Body className="p-5">
                                        <div className="rounded-4 d-inline-flex align-items-center justify-content-center mb-4 shadow-lg pulse-icon"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                background: service.color === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(250, 187, 5, 0.1)',
                                                border: `1px solid ${service.color}33`
                                            }}>
                                            <i className={`bi ${service.icon} fs-2`} style={{ color: service.color }}></i>
                                        </div>
                                        <h4 className="fw-bold mb-3">{service.title}</h4>
                                        <p className="text-white-50 mb-4 lh-lg">{service.desc}</p>
                                        <Button as={Link} to="/services" variant="link" className="text-yellow fw-bold text-decoration-none p-0">
                                            Deep Dive <i className="bi bi-arrow-right ms-2 transition-all"></i>
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-5">
                        <Button as={Link} to="/services" className="btn-yellow rounded-pill px-5 py-3 fw-bold shadow-sm">
                            <i className="bi bi-grid-3x3-gap me-2"></i>
                            View All Services
                        </Button>
                    </div>
                </Container>
            </section>

            {/* 3. SPLIT FEATURES SECTION - MOVED AFTER SERVICES */}
            <section className="py-0 bg-white overflow-hidden">
                <Row className="g-0">
                    <Col lg={6} className="position-relative d-none d-lg-block">
                        <div className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                backgroundImage: `url(${statsBg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
                            }}>
                            <div className="w-100 h-100" style={{ background: 'rgba(15, 23, 42, 0.4)' }}></div>
                        </div>
                        <div className="position-absolute bottom-0 start-0 p-5 text-white z-2" style={{ maxWidth: '400px' }}>
                            <div className="bg-yellow text-dark d-inline-block px-3 py-1 fw-bold rounded mb-3 small">EST. 2024</div>
                            <h3 className="display-6 fw-bold mb-3">Our Operations Center</h3>
                            <p className="opacity-75">Witness the power behind ShipDay's 24/7 logistics network across South Africa.</p>
                        </div>
                    </Col>
                    <Col lg={6} className="py-5 px-4 px-md-5 bg-light">
                        <div className="py-5 max-width-700">
                            <Badge bg="warning" className="text-dark mb-4 px-3 py-2 fw-bold tracking-wider">
                                WHY SHIP WITH US
                            </Badge>
                            <h2 className="display-4 fw-bold text-dark mb-4 lh-1">Excellence in every <span className="text-yellow">delivery mile.</span></h2>
                            <p className="text-muted lead mb-5">
                                We combine state-of-the-art technology with an extensive physical infrastructure to create South Africa's most reliable courier solution.
                            </p>

                            <Row className="g-4">
                                {[
                                    {
                                        title: 'Intelligent Routing',
                                        icon: 'bi-cpu-fill',
                                        desc: 'AI-driven route optimization that saves time and reduces carbon footprint.',
                                    },
                                    {
                                        title: 'Real-time Transparency',
                                        icon: 'bi-eye-fill',
                                        desc: 'See exactly where your parcel is with second-by-second GPS tracking.',
                                    },
                                    {
                                        title: 'Secure Handling',
                                        icon: 'bi-shield-check',
                                        desc: 'Premium packaging and careful handling for every single parcel.',
                                    },
                                    {
                                        title: 'Bespoke Solutions',
                                        icon: 'bi-gear-wide-connected',
                                        desc: 'Customized logistics for businesses of all sizes, from SMEs to Enterprises.',
                                    }
                                ].map((feat, i) => (
                                    <Col md={6} key={i}>
                                        <div className="p-4 bg-white rounded-4 shadow-sm border-start border-4 border-yellow h-100 transition-all hover-lift">
                                            <div className="mb-3 text-yellow">
                                                <i className={`bi ${feat.icon} fs-3`}></i>
                                            </div>
                                            <h5 className="fw-bold mb-2">{feat.title}</h5>
                                            <p className="text-muted small mb-0 lh-base">{feat.desc}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </section>

            {/* 6. TESTIMONIALS SECTION */}
            <section className="py-5 bg-white">
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <Badge bg="light" className="text-dark border mb-3 px-3 py-2 fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '1.5px' }}>
                            TESTIMONIALS
                        </Badge>
                        <h2 className="display-4 fw-bold text-dark mb-3">What our <span className="text-yellow">customers say</span></h2>
                    </div>

                    <Row className="g-4">
                        {[
                            {
                                name: 'Sarah Johnson',
                                role: 'Online Retailer, Cape Town',
                                rating: 5,
                                text: 'ShipDay transformed how we manage our e-commerce deliveries. It\'s fast, reliable, and the dashboard is a dream. Our customers love the real-time tracking!'
                            },
                            {
                                name: 'Michael Chen',
                                role: 'Business Owner, Johannesburg',
                                rating: 5,
                                text: 'The B2B delivery service is exceptional. We\'ve reduced our logistics costs by 30% while improving delivery times. Highly recommended!'
                            },
                            {
                                name: 'Priya Naidoo',
                                role: 'Entrepreneur, Durban',
                                rating: 5,
                                text: 'Professional, efficient, and always on time. ShipDay has become an integral part of our business operations. The customer support is outstanding!'
                            }
                        ].map((testimonial, i) => (
                            <Col lg={4} key={i} className="fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                                <Card className="border-0 rounded-4 shadow-sm h-100 hover-lift bg-white overflow-hidden">
                                    <div className="position-absolute top-0 start-0 w-100"
                                        style={{ height: '5px', background: 'linear-gradient(90deg, #fabb05 0%, #f59e0b 100%)' }}></div>
                                    <Card.Body className="p-5">
                                        <div className="mb-3">
                                            {[...Array(testimonial.rating)].map((_, idx) => (
                                                <i key={idx} className="bi bi-star-fill text-yellow me-1"></i>
                                            ))}
                                        </div>
                                        <p className="text-dark mb-4 lh-lg fst-italic">"{testimonial.text}"</p>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle bg-yellow d-flex align-items-center justify-content-center me-3"
                                                style={{ width: '50px', height: '50px' }}>
                                                <span className="fw-bold text-dark">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark">{testimonial.name}</div>
                                                <small className="text-muted">{testimonial.role}</small>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* 7. CTA SECTION - HEAVY REDESIGN */}
            <section className="position-relative py-0 overflow-hidden" style={{ minHeight: '600px' }}>
                {/* Parallax Background */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `url(${ctaBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        filter: 'brightness(0.3)'
                    }}></div>

                {/* Heavy Gradient Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.4) 100%)' }}></div>

                <Container className="position-relative z-1 h-100 d-flex align-items-center py-5" style={{ minHeight: '600px' }}>
                    <Row className="justify-content-center text-center">
                        <Col lg={9}>
                            <Badge bg="warning" className="text-dark mb-4 px-4 py-2 fw-bold tracking-widest shadow-lg pulse-badge">
                                <i className="bi bi-rocket-takeoff-fill me-2"></i>
                                ELEVATE YOUR LOGISTICS
                            </Badge>
                            <h2 className="display-2 fw-black text-white mb-4 lh-1" style={{ letterSpacing: '-2px' }}>
                                Ready to experience <span className="text-yellow">next-gen shipping?</span>
                            </h2>
                            <p className="lead text-white-50 mb-5 fs-4" style={{ lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
                                Join 5,000+ businesses that rely on ShipDay for their mission-critical deliveries across South Africa.
                            </p>
                            <div className="d-flex flex-wrap justify-content-center gap-4">
                                <Button as={Link} to="/register"
                                    className="btn-yellow rounded-pill px-5 py-4 fw-black hover-lift shadow-2xl border-0 overflow-hidden position-relative"
                                    style={{ fontSize: '1.2rem' }}>
                                    <span className="position-relative z-1">Create Free Account</span>
                                    <div className="btn-shine"></div>
                                </Button>
                                <Button as={Link} to="/contact"
                                    variant="outline-light"
                                    className="rounded-pill px-5 py-4 fw-bold hover-lift border-2 glass-hover"
                                    style={{ fontSize: '1.2rem' }}>
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    Talk to an Expert
                                </Button>
                            </div>

                            {/* Stats in CTA */}
                            <Row className="mt-5 g-4 justify-content-center opacity-75">
                                {[
                                    { text: 'No Signup Fee' },
                                    { text: 'Instant Quote' },
                                    { text: 'Full API Access' },
                                    { text: '24/7 Support' }
                                ].map((item, i) => (
                                    <Col xs={6} md={3} key={i}>
                                        <div className="text-white small fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
                                            <i className="bi bi-check2 text-yellow me-2"></i>
                                            {item.text}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>

            <style>{`
                :root {
                    --brand-yellow: #fabb05;
                    --brand-black: #0f172a;
                }

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

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(250, 187, 5, 0.5); }
                    50% { box-shadow: 0 0 40px rgba(250, 187, 5, 0.8); }
                }

                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .slide-in-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                    opacity: 0;
                }

                .slide-in-right {
                    animation: slideInRight 0.8s ease-out forwards;
                    opacity: 0;
                }

                .floating-card {
                    animation: float 6s ease-in-out infinite;
                }

                .pulse-badge {
                    animation: pulse 2s ease-in-out infinite;
                }

                .pulse-icon {
                    animation: pulse 3s ease-in-out infinite;
                }

                .btn-glow:hover {
                    animation: glow 1.5s ease-in-out infinite;
                }

                .glow-text {
                    text-shadow: 0 0 30px rgba(250, 187, 5, 0.6);
                }

                .hero-title {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                }

                .fw-black { font-weight: 900 !important; }

                .shadow-2xl {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
                }

                .glass-hover {
                    transition: all 0.3s ease;
                }
                .glass-hover:hover {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                }

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

                .shadow-glow {
                    text-shadow: 0 0 15px rgba(250, 187, 5, 0.5);
                }

                /* Floating Shapes */
                .floating-shape {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.1;
                }

                .shape-1 {
                    width: 300px;
                    height: 300px;
                    background: linear-gradient(135deg, #fabb05 0%, #f59e0b 100%);
                    top: 10%;
                    right: 10%;
                    animation: float 8s ease-in-out infinite;
                }

                .shape-2 {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(135deg, #ffffff 0%, #fabb05 100%);
                    bottom: 20%;
                    left: 5%;
                    animation: float 10s ease-in-out infinite reverse;
                }

                .shape-3 {
                    width: 150px;
                    height: 150px;
                    background: linear-gradient(135deg, #fabb05 0%, #ffffff 100%);
                    top: 50%;
                    left: 50%;
                    animation: float 12s ease-in-out infinite;
                }

                /* Parallax Effect - Disabled to fix zoom issues */
                .carousel-bg {
                    transition: transform 0.3s ease-out;
                }

                .stat-card {
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-5px);
                    background: rgba(250, 187, 5, 0.2) !important;
                }

                .glass-card-enhanced {
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                }

                .hover-lift {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .hover-lift:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
                }

                .shadow-hover {
                    transition: all 0.3s ease;
                }
                .shadow-hover:hover {
                    box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important;
                }

                .max-width-700 { max-width: 700px; }
                .max-width-800 { max-width: 800px; }

                .bg-yellow { background-color: var(--brand-yellow) !important; }
                .text-yellow { color: var(--brand-yellow) !important; }
                
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

                .btn-outline-glow {
                    transition: all 0.3s ease;
                }
                .btn-outline-glow:hover {
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                }

                .tracking-wider { letter-spacing: 0.1em; }
                .tracking-widest { letter-spacing: 0.25em; }
                .lh-1 { line-height: 1.1; }
                .lh-lg { line-height: 1.8; }

                /* Carousel Custom Styles */
                .carousel-control-prev,
                .carousel-control-next {
                    width: 5%;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                .carousel-control-prev:hover,
                .carousel-control-next:hover {
                    opacity: 1;
                }
                .carousel-indicators [data-bs-target] {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: var(--brand-yellow);
                    transition: all 0.3s ease;
                }
                .carousel-indicators [data-bs-target]:hover {
                    transform: scale(1.2);
                }
                .backdrop-blur {
                    backdrop-filter: blur(10px);
                }
            `}</style>
        </div>
    );
};

export default Home;
