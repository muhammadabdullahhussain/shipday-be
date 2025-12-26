import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';

const TrackingPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [result, setResult] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        // Simulation
        if (trackingId) {
            setResult({
                status: 'In Transit',
                location: 'Johannesburg Hub',
                date: 'Just now',
                history: [
                    { status: 'Picked Up', location: 'Sender Premises', date: 'Yesterday 14:00', done: true },
                    { status: 'Arrived at Hub', location: 'Johannesburg', date: 'Yesterday 18:30', done: true },
                    { status: 'In Transit', location: 'En route to Cape Town', date: 'Today 06:00', done: true },
                    { status: 'Out for Delivery', location: 'Cape Town', date: 'Pending', done: false },
                ]
            });
        }
    };

    return (
        <div className="font-sans bg-white min-vh-100 pt-5">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5 mb-3">Track Shipment</h1>
                    <p className="text-muted lead">Enter your waybill number to track in real-time.</p>
                </div>

                {/* Modern Pill Search Input - Purple Button */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-6">
                        <Card className="border-0 shadow-lg rounded-pill p-1 bg-white">
                            <Form onSubmit={handleTrack} className="d-flex">
                                <Form.Control
                                    className="border-0 bg-transparent ps-4 py-3 fw-medium shadow-none"
                                    placeholder="Enter Waybill Number..."
                                    value={trackingId}
                                    onChange={e => setTrackingId(e.target.value)}
                                    style={{ fontSize: '1.1rem' }}
                                />
                                <Button type="submit" className="btn-purple rounded-pill px-5 fw-bold m-1">
                                    Search
                                </Button>
                            </Form>
                        </Card>
                    </div>
                </div>

                {/* Results - Purple Timeline */}
                {result && (
                    <div className="row justify-content-center fade-in-up">
                        <div className="col-lg-8">
                            <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                                <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
                                    <div>
                                        <h4 className="fw-bold mb-1">Order #{trackingId}</h4>
                                        <span className="badge bg-purple bg-opacity-10 text-purple rounded-pill px-3">Active Incident</span>
                                    </div>
                                    <div className="text-end">
                                        <small className="text-muted d-block uppercase fw-bold" style={{ fontSize: '0.75rem' }}>ESTIMATED DELIVERY</small>
                                        <span className="fw-bold">Tomorrow</span>
                                    </div>
                                </div>

                                <div className="position-relative">
                                    <div className="position-absolute top-0 bottom-0 start-0 border-start ms-2 h-100 border-2" style={{ borderColor: '#f3f4f6' }}></div>

                                    {result.history.map((step, idx) => (
                                        <div key={idx} className="position-relative ps-5 pb-5 last-no-pb">
                                            <div className={`position-absolute top-0 start-0 rounded-circle border border-4 border-white shadow-sm d-flex align-items-center justify-content-center
                                                ${step.done ? 'bg-purple text-white' : 'bg-light text-muted'}`}
                                                style={{ width: '24px', height: '24px', left: '5px', zIndex: 2 }}>
                                            </div>
                                            <div>
                                                <h6 className={`fw-bold mb-1 ${step.done ? 'text-dark' : 'text-muted'}`}>{step.status}</h6>
                                                <small className="text-muted">{step.location} • {step.date}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </Container>

            <style>{`
                .last-no-pb:last-child { padding-bottom: 0 !important; }
            `}</style>
        </div>
    );
};

export default TrackingPage;
