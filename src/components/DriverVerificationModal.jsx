import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

const DriverVerificationModal = ({ show, onClose, driver, onAccept, onReject }) => {
    if (!driver) return null;

    const handleAccept = () => {
        if (onAccept) {
            onAccept(driver);
        }
        onClose();
    };

    const handleReject = () => {
        if (onReject) {
            onReject(driver);
        }
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Driver Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="driver-verification-details">
                    <h5 className="mb-3">Driver Information</h5>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <p><strong>Name:</strong> {driver.username || 'N/A'}</p>
                            <p><strong>Email:</strong> {driver.email || 'N/A'}</p>
                            <p><strong>Phone:</strong> {driver.phone || 'N/A'}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Vehicle Type:</strong> {driver.vehicleType || 'N/A'}</p>
                            <p><strong>Vehicle Number:</strong> {driver.vehicleNumber || 'N/A'}</p>
                            <p>
                                <strong>Status:</strong>{' '}
                                <Badge bg={driver.status === 'approved' ? 'success' : 'warning'}>
                                    {driver.status || 'pending'}
                                </Badge>
                            </p>
                        </div>
                    </div>

                    <div className="alert alert-info">
                        <strong>Verification Action:</strong> Review the driver's information carefully before approving or rejecting.
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleReject}>
                    Reject
                </Button>
                <Button variant="success" onClick={handleAccept}>
                    Approve
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DriverVerificationModal;
