import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup, Nav, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInterceptor";

const EditCustomerModal = ({ show, handleClose, customer, onUpdate }) => {
    const [activeTab, setActiveTab] = useState("info");
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        status: "Active",
        address: {
            street: "",
            complexOrBusinessHub: "",
            city: "",
            province: "",
            postalCode: "",
            country: "South Africa"
        }
    });
    const [walletAdjustment, setWalletAdjustment] = useState({
        amount: "",
        description: "Admin adjustment"
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (customer) {
            setFormData({
                fullName: customer.name || "",
                email: customer.email || "",
                companyName: customer.company || "",
                phone: customer.contact || "",
                status: customer.status || "Active",
                address: {
                    street: customer.structuredAddress?.street || "",
                    complexOrBusinessHub: customer.structuredAddress?.complexOrBusinessHub || "",
                    city: customer.structuredAddress?.city || "",
                    province: customer.structuredAddress?.province || "",
                    postalCode: customer.structuredAddress?.postalCode || "",
                    country: customer.structuredAddress?.country || "South Africa"
                }
            });
        }
    }, [customer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [field]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleWalletChange = (e) => {
        const { name, value } = e.target;
        setWalletAdjustment({ ...walletAdjustment, [name]: value });
    };

    const handleBasicUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update Basic Info (We can use a dedicated route if available, or status route)
            // For now, let's assume we update status and info together or separately
            await axiosInstance.patch("/admin/customers/status", {
                userId: customer.mongodbId,
                status: formData.status,
                fullName: formData.fullName,
                email: formData.email,
                companyName: formData.companyName,
                address: formData.address,
                phone: formData.phone,
            });

            toast.success("Customer updated successfully!");
            if (onUpdate) onUpdate();
            handleClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update customer");
        } finally {
            setLoading(false);
        }
    };

    const handleWalletUpdate = async (e) => {
        e.preventDefault();
        const amount = parseFloat(walletAdjustment.amount);
        if (isNaN(amount) || amount === 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.patch("/admin/customers/wallet", {
                userId: customer.mongodbId,
                amount,
                description: walletAdjustment.description
            });
            toast.success("Wallet adjusted successfully!");
            setWalletAdjustment({ amount: "", description: "Admin adjustment" });
            if (onUpdate) onUpdate();
            handleClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to adjust wallet");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="premium-modal">
            <div className="premium-modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                <h4 className="fw-bold text-dark m-0 d-flex align-items-center gap-3">
                    <div className="bg-primary-subtle p-2 rounded-3">
                        <i className="bi bi-person-gear text-primary"></i>
                    </div>
                    Edit Customer Account
                </h4>
                <button
                    onClick={handleClose}
                    className="btn btn-light rounded-circle p-2 border-0 shadow-none bg-transparent"
                    style={{ width: "36px", height: "36px" }}
                >
                    <i className="bi bi-x-lg text-muted"></i>
                </button>
            </div>

            <Modal.Body className="p-4 pt-4">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <div className="modern-btn-group mb-4">
                        <button
                            className={`btn ${activeTab === 'info' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
                            onClick={() => setActiveTab('info')}
                        >
                            <i className="bi bi-info-circle me-2"></i> Account Info
                        </button>
                        <button
                            className={`btn ${activeTab === 'wallet' ? 'bg-white shadow-sm text-primary' : 'text-muted'}`}
                            onClick={() => setActiveTab('wallet')}
                        >
                            <i className="bi bi-wallet2 me-2"></i> Wallet & Funds
                        </button>
                    </div>

                    <Tab.Content>
                        <Tab.Pane eventKey="info">
                            <Form onSubmit={handleBasicUpdate}>
                                <div className="premium-form-card">
                                    <h6 className="fw-bold mb-4 text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-card-text text-primary"></i>
                                        Basic Information
                                    </h6>
                                    <Row className="g-4">
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Full Name</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter name"
                                                    />
                                                    <i className="bi bi-person premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Account Status</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Select
                                                        name="status"
                                                        value={formData.status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Disabled">Disabled</option>
                                                    </Form.Select>
                                                    <i className="bi bi-toggle-on premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Email Address</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        placeholder="email@example.com"
                                                    />
                                                    <i className="bi bi-envelope premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Phone Number</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        placeholder="+27 12 345 6789"
                                                    />
                                                    <i className="bi bi-telephone premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Company Name</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="companyName"
                                                        value={formData.companyName}
                                                        onChange={handleInputChange}
                                                        placeholder="Optional"
                                                    />
                                                    <i className="bi bi-building premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    {/* Address Section */}
                                    <h6 className="fw-bold mb-4 mt-5 text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-geo-alt text-primary"></i>
                                        Address Information
                                    </h6>
                                    <Row className="g-4">
                                        <Col md={12}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Physical Address *</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="address.street"
                                                        value={formData.address.street}
                                                        onChange={handleInputChange}
                                                        placeholder="Street and Number"
                                                        required
                                                    />
                                                    <i className="bi bi-geo premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Complex or Business Hub</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="address.complexOrBusinessHub"
                                                        value={formData.address.complexOrBusinessHub}
                                                        onChange={handleInputChange}
                                                        placeholder="Optional"
                                                    />
                                                    <i className="bi bi-building premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">City</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="address.city"
                                                        value={formData.address.city}
                                                        onChange={handleInputChange}
                                                        placeholder="Johannesburg"
                                                    />
                                                    <i className="bi bi-map premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Province</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Select
                                                        name="address.province"
                                                        value={formData.address.province}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select Province</option>
                                                        <option value="Gauteng">Gauteng</option>
                                                        <option value="Western Cape">Western Cape</option>
                                                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                                        <option value="Eastern Cape">Eastern Cape</option>
                                                        <option value="Free State">Free State</option>
                                                        <option value="Limpopo">Limpopo</option>
                                                        <option value="Mpumalanga">Mpumalanga</option>
                                                        <option value="Northern Cape">Northern Cape</option>
                                                        <option value="North West">North West</option>
                                                    </Form.Select>
                                                    <i className="bi bi-geo-alt premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Postal Code</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="address.postalCode"
                                                        value={formData.address.postalCode}
                                                        onChange={handleInputChange}
                                                        placeholder="2000"
                                                    />
                                                    <i className="bi bi-mailbox premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Country</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        name="address.country"
                                                        value={formData.address.country}
                                                        onChange={handleInputChange}
                                                        placeholder="South Africa"
                                                    />
                                                    <i className="bi bi-globe premium-input-icon"></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="d-flex justify-content-end gap-3 mt-4 pt-2">
                                    <Button variant="light" onClick={handleClose} className="rounded-pill px-4 fw-600">Cancel</Button>
                                    <Button variant="primary" type="submit" disabled={loading} className="rounded-pill px-5 shadow-sm fw-600">
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </Form>
                        </Tab.Pane>

                        <Tab.Pane eventKey="wallet">
                            <div className="wallet-hero-card">
                                <span className="balance-label">Current Balance</span>
                                <div className="balance-amount">{customer?.walletBalance || "R0.00"}</div>
                            </div>

                            <Form onSubmit={handleWalletUpdate}>
                                <div className="premium-form-card">
                                    <h6 className="fw-bold mb-4 text-dark d-flex align-items-center gap-2">
                                        <i className="bi bi-plus-slash-minus text-primary"></i>
                                        Balance Adjustment
                                    </h6>
                                    <Row className="g-4">
                                        <Col md={12}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Adjustment Amount</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="number"
                                                        step="0.01"
                                                        name="amount"
                                                        value={walletAdjustment.amount}
                                                        onChange={handleWalletChange}
                                                        placeholder="0.00"
                                                        style={{ paddingLeft: "3rem" }}
                                                    />
                                                    <span className="position-absolute start-0 top-50 translate-middle-y ps-3 fw-bold text-muted">R</span>
                                                    <i className="bi bi-currency-exchange premium-input-icon"></i>
                                                </div>
                                                <Form.Text className="text-muted small mt-2 d-block">
                                                    <i className="bi bi-info-circle me-1"></i> Use positive for credit (+), negative for debit (-).
                                                </Form.Text>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group className="premium-input-group">
                                                <Form.Label className="small fw-bold text-muted mb-2">Reason / Description</Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        name="description"
                                                        value={walletAdjustment.description}
                                                        onChange={handleWalletChange}
                                                        placeholder="Why is this adjustment being made?"
                                                    />
                                                    <i className="bi bi-chat-left-text premium-input-icon" style={{ top: "1.5rem" }}></i>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>

                                <div className="d-flex justify-content-end gap-3 mt-4 pt-2">
                                    <Button variant="light" onClick={handleClose} className="rounded-pill px-4 fw-600">Cancel</Button>
                                    <Button variant="success" type="submit" disabled={loading} className="rounded-pill px-5 shadow-sm fw-600">
                                        {loading ? "Processing..." : "Update Balance"}
                                    </Button>
                                </div>
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    );
};

export default EditCustomerModal;
