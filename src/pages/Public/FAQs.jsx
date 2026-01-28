import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQs = () => {
    return (
        <div className="font-sans bg-white min-vh-100 pb-5">
            <section className="py-5 bg-dark text-white">
                <Container className="py-5 text-center">
                    <h1 className="display-4 fw-black mb-3">Frequently Asked <span className="text-yellow">Questions</span></h1>
                    <p className="lead text-white-50">Support center and common queries</p>
                </Container>
            </section>

            <Container className="py-5" style={{ maxWidth: '800px' }}>
                <Accordion defaultActiveKey="0" className="shadow-lg rounded-3 overflow-hidden">
                    {[
                        { q: "How do I prepare my parcel for courier collection?", a: "Ensure your item is securely packaged in a sturdy box, properly sealed, and clearly labeled with the delivery and return address. The parcel must be ready before the courier arrives." },
                        { q: "What items are prohibited from being sent?", a: "Prohibited items typically include hazardous materials, illegal goods, explosives, flammable items, and perishables. Some couriers also restrict batteries, liquids, or fragile items. Please check before booking." },
                        { q: "What happens if my parcel is not ready at pickup time?", a: "If the parcel is not ready or accessible, the courier may skip the collection or reschedule it, which could result in additional charges or delays." },
                        { q: "How should I label my parcel?", a: "Place the shipping label flat on the top of the parcel. Ensure the barcode is clear and not covered by tape or damaged. Remove any old labels or barcodes." },
                        { q: "What if my parcel weighs or measures more than declared?", a: "Incorrect weight or dimensions may result in additional charges, delivery delays, or the parcel being returned. Always measure and weigh your parcel accurately before booking." },
                        { q: "Do I need to be present during pickup?", a: "Not always. If no signature is required, you may leave the parcel in a safe, agreed pickup location. However, some services require a handover or signature." },
                        { q: "Can I track my shipment?", a: "Yes. Once your parcel is collected, you will receive a tracking number that allows you to monitor the delivery status online." },
                        { q: "What should I do if my parcel is delayed?", a: "Use your tracking number to check the latest updates. If the delay continues, contact customer support with your tracking details for assistance." },
                        { q: "Is my parcel insured?", a: "Basic liability coverage is usually included, but it may be limited. Additional insurance can often be purchased for high-value items." },
                        { q: "What happens if my parcel is damaged or lost?", a: "If damage or loss occurs, report it as soon as possible with photos and supporting documents. Claims are subject to the courier’s terms and conditions." },
                        { q: "Can I change the delivery address after dispatch?", a: "Address changes may be possible but are not guaranteed and may incur additional fees, depending on the courier and shipment status." },
                        { q: "Do you deliver internationally?", a: "Not yet, international delivery is not available. If you have further questions, please contact our customer support team for assistance. Contact 010 001 4421" }
                    ].map((faq, i) => (
                        <Accordion.Item eventKey={i.toString()} key={i}>
                            <Accordion.Header className="fw-bold">{i + 1}. {faq.q}</Accordion.Header>
                            <Accordion.Body className="text-muted">
                                {faq.a}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <div className="text-center mt-5 p-4 bg-light rounded-4 border">
                    <p className="mb-2">If you have further questions, please contact our customer support team for assistance.</p>
                    <h4 className="fw-black text-dark">Contact 010 001 4421</h4>
                </div>
            </Container>
        </div>
    );
};

export default FAQs;
