import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInterceptor";

const AddNewCustomerModal = ({ show, handleClose, onCustomerAdded }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        companyName: "",
        phone: "",
        address: {
            complexOrBusinessHub: "",
            city: "",
            province: "",
            postalCode: "",
            country: "South Africa"
        }
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested address fields
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.password) {
            toast.error("Name, Email and Password are required");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post("/admin/customers/create", formData);
            if (response.status === 201) {
                toast.success("Customer created successfully!");
                if (onCustomerAdded) onCustomerAdded(response.data.customer);
                handleClose();
                setFormData({
                    fullName: "",
                    email: "",
                    password: "",
                    companyName: "",
                    phone: "",
                    address: {
                        complexOrBusinessHub: "",
                        city: "",
                        province: "",
                        postalCode: "",
                        country: "South Africa"
                    }
                });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create customer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">Add New Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Full Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Company Ltd."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Email Address *</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Password *</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create password"
                                        required
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        type="button"
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+27 12 345 6789"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Address Section */}
                    <div className="border-top pt-3 mt-3">
                        <h6 className="fw-bold mb-3">Address Information</h6>

                        <Row className="mb-3">
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label>Complex or Business Hub</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address.complexOrBusinessHub"
                                        value={formData.address.complexOrBusinessHub}
                                        onChange={handleChange}
                                        placeholder="Building name, complex, or business hub"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address.city"
                                        value={formData.address.city}
                                        onChange={handleChange}
                                        placeholder="Johannesburg"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Province</Form.Label>
                                    <Form.Select
                                        name="address.province"
                                        value={formData.address.province}
                                        onChange={handleChange}
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
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address.postalCode"
                                        value={formData.address.postalCode}
                                        onChange={handleChange}
                                        placeholder="2000"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address.country"
                                        value={formData.address.country}
                                        onChange={handleChange}
                                        placeholder="South Africa"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="light" onClick={handleClose} disabled={loading}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Customer"}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewCustomerModal;
