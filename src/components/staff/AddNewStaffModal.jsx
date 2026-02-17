import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ui/transaction.css";
import axiosInstance from "../../utils/axiosInterceptor";

const AddNewStaffModal = ({ onClose, onStaffAdded }) => {
  const [formData, setFormData] = useState({
    profilePicture: "",
    fullName: "",
    contactInfo: "",
    role: "Driver",
    shift: "Morning",
    email: "",
    baseLocation: "New York Warehouse",
    warehouseName: "", // selected from dropdown
    latitude: null, // New field
    longitude: null, // New field,
    locationAddress: "" // To display fetched address or coords
  });

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false); // For GPS button
  const [validationErrors, setValidationErrors] = useState({});
  const [warehouseOptions, setWarehouseOptions] = useState([]);

  useEffect(() => {
    // Fetch warehouses to populate dropdown
    axiosInstance
      .get("/warehouse/all")
      .then((res) => {
        const data = res.data;
        setWarehouseOptions(data);
        if (data.length > 0 && !formData.warehouseName) {
          setFormData((prev) => ({ ...prev, warehouseName: data[0].name }));
        }
      })
      .catch((err) => console.error("Failed to load warehouses", err));
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
          baseLocation: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, // Display coords in input
          locationAddress: "GPS Location Fetched"
        }));
        setLocationLoading(false);
        toast.success("Location fetched successfully!");
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to retrieve location. Please allow location access.");
        setLocationLoading(false);
      }
    );
  };


  /* Removed useEffect for validation on every keystroke to prevent premature error messages */

  const capitalizeName = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {};
    if (!formData.email || !formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.contactInfo) {
      errors.contactInfo = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.contactInfo)) {
      errors.contactInfo = "Phone number must be 10–15 digits";
    }

    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required";
    }
    if (formData.role !== "Driver" && !formData.warehouseName.trim()) {
      errors.warehouseName = "Warehouse name is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear error for this field when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }

    if (name === "profilePicture" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    } else if (name === "contactInfo") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, contactInfo: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);
    const capitalizedFullName = capitalizeName(formData.fullName);

    const payload = {
      ...formData,
      fullName: capitalizedFullName,
    };

    if (formData.role !== "Driver") {
      payload.baseLocation = formData.warehouseName;
    }

    try {
      const response = await axiosInstance.post("/staff/add", payload);
      toast.success("Staff added successfully!");
      setFormData({
        profilePicture: "",
        fullName: "",
        contactInfo: "",
        role: "Driver",
        shift: "Morning",
        email: "",
        baseLocation: "New York Warehouse",
        warehouseName: "",
      });
      onStaffAdded(response.data.staff);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Failed to add staff. Please check your connection and try again.";
      toast.error(errorMsg);
      console.error("Add staff error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Modal show onHide={onClose} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Add New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3">
          <Form>
            <Row className="mb-3">
              <Col md={12} className="mb-3">
                <Form.Label className="small fw-bold text-muted">Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted">Contact Info</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactInfo"
                    placeholder="9876543210"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.contactInfo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.contactInfo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted">Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option>Driver</option>
                    <option>Warehouse Manager</option>
                    <option>Delivery Coordinator</option>
                    <option>Security</option>
                    <option>Inventory Coordinator</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold text-muted">Shift</Form.Label>
                  <Form.Select
                    name="shift"
                    value={formData.shift}
                    onChange={handleChange}
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Night</option>
                    <option>Rotational</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-muted">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!validationErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {formData.role === "Driver" ? (
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Base Location (GPS)</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    name="baseLocation"
                    placeholder="Click button to get GPS coordinates"
                    value={formData.baseLocation}
                    onChange={handleChange}
                    readOnly={!!formData.latitude}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={handleGetLocation}
                    disabled={locationLoading}
                    style={{ minWidth: "140px" }}
                  >
                    {locationLoading ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <>
                        <i className="bi bi-geo-alt-fill me-1"></i> Get GPS
                      </>
                    )}
                  </Button>
                  {formData.latitude && (
                    <Button
                      variant="outline-danger"
                      onClick={() => setFormData(prev => ({ ...prev, baseLocation: "", latitude: null, longitude: null }))}
                      title="Clear Location"
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  )}
                </div>
                {formData.latitude && (
                  <small className="text-success mt-1 d-block">
                    <i className="bi bi-check-circle-fill me-1"></i>
                    Location captured: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                  </small>
                )}
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">Warehouse Name</Form.Label>
                <Form.Select
                  name="warehouseName"
                  value={formData.warehouseName}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.warehouseName}
                >
                  {warehouseOptions.length > 0 ? (
                    warehouseOptions.map((wh) => (
                      <option key={wh._id} value={wh.name}>
                        {wh.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No warehouses found</option>
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {validationErrors.warehouseName}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="light" onClick={onClose} disabled={loading} className="rounded-3">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-3 px-4 shadow-sm"
          >
            {loading ? "Saving..." : "Save Staff"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewStaffModal;
