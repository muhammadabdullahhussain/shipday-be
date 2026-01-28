import React from 'react';
import { Container } from 'react-bootstrap';

const Terms = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            <section className="py-5 bg-light border-bottom">
                <Container className="py-5">
                    <h1 className="display-4 fw-black text-dark mb-3">Terms & <span className="text-yellow">Conditions</span></h1>
                    <p className="lead text-muted">Last updated: December 2024</p>
                </Container>
            </section>

            <Container className="py-5" style={{ maxWidth: '900px' }}>
                <div className="prose text-muted">
                    <p className="mb-5 fst-italic">Last updated: 18 January 2026</p>

                    <h5 className="fw-bold text-dark mb-3">1. Definitions</h5>
                    <p className="mb-4">
                        *“Shipday” refers to the delivery management platform and related services.<br />
                        *“User” refers to any individual or business using Shipday.<br />
                        *“Merchant” refers to a business using Shipday to manage deliveries.<br />
                        *“Courier” refers to a third-party delivery driver or service.<br />
                        *“Customer” refers to the end recipient of a delivery.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">2. Scope of Services</h5>
                    <p className="mb-4">Shipday provides a technology platform that facilitates delivery management, order tracking, and courier coordination. Shipday does not operate as a courier company unless explicitly stated and is not responsible for the physical transportation of goods.</p>

                    <h5 className="fw-bold text-dark mb-3">3. User Responsibilities</h5>
                    <p className="mb-4">
                        Users agree to:<br />
                        * Provide accurate and complete order, address, and contact information.<br />
                        * Ensure parcels are properly packed, sealed, and labeled.<br />
                        * Comply with all applicable laws and courier requirements.<br />
                        * Ensure that shipped items are legal and not prohibited or restricted.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">4. Prohibited and Restricted Items</h5>
                    <p className="mb-4">
                        Users may not ship items including but not limited to:<br />
                        * Hazardous, flammable, or explosive materials<br />
                        * Illegal goods<br />
                        * Perishable items without prior approval<br />
                        * Items prohibited by local, national, or international law<br />
                        Shipday reserves the right to cancel or refuse orders involving prohibited items.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">5. Pickup and Delivery</h5>
                    <p className="mb-4">
                        * All parcels must be ready for pickup at the scheduled time.<br />
                        * Delays caused by incorrect information, inaccessible locations, or unprepared parcels are the User’s responsibility.<br />
                        * Delivery times are estimates and not guaranteed.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">6. Fees and Payments</h5>
                    <p className="mb-4">
                        * Users agree to pay all applicable service, delivery, and platform fees.<br />
                        * Additional charges may apply for incorrect weight, size, address changes, or failed delivery attempts.<br />
                        * Fees are non-refundable once a delivery is dispatched, except where required by law.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">7. Cancellations and Modifications</h5>
                    <p className="mb-4">
                        * Orders may only be canceled or modified before courier dispatch.<br />
                        * Once a courier is assigned or en route, cancellation may not be possible and charges may apply.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">8. Liability and Insurance</h5>
                    <p className="mb-4">
                        * Shipday is not liable for loss, damage, or delay of goods during transit.<br />
                        * Liability, if any, is limited to the extent required by applicable law.<br />
                        * Users are responsible for obtaining additional insurance for high-value items.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">9. Claims and Disputes</h5>
                    <p className="mb-4">
                        * Claims for lost or damaged items must be reported within the time frame specified by the courier.<br />
                        * Supporting documentation, including photos and proof of value, may be required.<br />
                        * Claims are subject to courier terms and conditions.
                    </p>

                    <h5 className="fw-bold text-dark mb-3">10. Third-Party Services</h5>
                    <p className="mb-4">Shipday may integrate with third-party couriers, payment processors, or mapping services. Shipday is not responsible for the actions, errors, or omissions of third parties.</p>

                    <h5 className="fw-bold text-dark mb-3">11. Data Protection and Privacy</h5>
                    <p className="mb-4">Shipday collects and processes personal data in accordance with its Privacy Policy. By using Shipday, you consent to such processing.</p>

                    <h5 className="fw-bold text-dark mb-3">12. Suspension or Termination</h5>
                    <p className="mb-4">Shipday reserves the right to suspend or terminate access for violations of these Terms, misuse of the platform, or illegal activity.</p>

                    <h5 className="fw-bold text-dark mb-3">13. Limitation of Liability</h5>
                    <p className="mb-4">To the maximum extent permitted by law, Shipday shall not be liable for indirect, incidental, or consequential damages, including loss of profits or business.</p>

                    <h5 className="fw-bold text-dark mb-3">14. Governing Law</h5>
                    <p className="mb-4">These Terms shall be governed by and construed in accordance with the laws of the applicable jurisdiction where Shipday operates.</p>

                    <h5 className="fw-bold text-dark mb-3">15. Changes to Terms</h5>
                    <p className="mb-4">Shipday reserves the right to update or modify these Terms at any time. Continued use of the service constitutes acceptance of the updated Terms.</p>

                    <h5 className="fw-bold text-dark mb-3">16. Contact Information</h5>
                    <p className="mb-4">
                        For questions regarding these Terms, please contact:<br />
                        **Email: support@shipday.co.za<br />
                        **Business Name: Shipday Pty Ltd
                    </p>
                    <p className="fw-bold text-dark mt-5">Shipday is Independent Courier Company</p>
                </div>
            </Container>
        </div>
    );
};

export default Terms;
