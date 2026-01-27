import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInterceptor';
import { Badge, Table, Spinner, Dropdown } from 'react-bootstrap';
import AssignShipmentModal from "../../components/AssignShipmentModal";
import { isAdmin, isManager, isAdminStaff } from "../../utils/authHelper";

const Deliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState('all');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const canAssign = isAdmin() || isManager() || isAdminStaff();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRows = deliveries.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(deliveries.length / itemsPerPage);

    const STATUS_OPTIONS = [
        "Pending Collect", "Inhouse", "Collected", "In-transit",
        "Returning to Sender", "Inter hub", "Inter region",
        "Out For delivery", "Failed Delivery", "Delivered"
    ];

    useEffect(() => {
        fetchDeliveries();
    }, [filter]);

    const fetchDeliveries = async () => {
        setLoading(true);
        try {
            const endpoint = filter === 'all' ? '/shipments' : `/shipments?status=${filter}`;
            const { data } = await axiosInstance.get(endpoint);
            setDeliveries(data.shipments || data);
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const lower = status?.toLowerCase() || '';
        if (lower.includes('pending')) return 'warning';
        if (lower.includes('delivered')) return 'success';
        if (lower.includes('failed') || lower.includes('return')) return 'danger';
        return 'info';
    };

    const handleAssign = (delivery) => {
        setSelectedShipment(delivery);
        setShowAssignModal(true);
    };

    const handleDriverAssignment = async () => {
        setShowAssignModal(false);
        fetchDeliveries();
    };

    return (
        <div className="deliveries-container container-fluid h-100" style={{ minHeight: '80vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">Deliveries</h4>
                <div className="d-flex gap-2">
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                            Filter: {filter === 'all' ? 'All Statuses' : filter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Dropdown.Item onClick={() => setFilter('all')}>All Statuses</Dropdown.Item>
                            <Dropdown.Divider />
                            {STATUS_OPTIONS.map(status => (
                                <Dropdown.Item key={status} onClick={() => setFilter(status)}>
                                    {status}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead className="table-light">
                                <tr>
                                    <th>Shipment ID</th>
                                    <th>Customer</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Status</th>
                                    <th>Delivery Date</th>
                                    <th>Driver</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRows.length > 0 ? (
                                    currentRows.map((delivery) => (
                                        <tr key={delivery._id}>
                                            <td className="text-primary fw-bold" style={{ cursor: 'pointer' }} title="Click to copy ID" onClick={() => {
                                                navigator.clipboard.writeText(delivery.shipmentId);
                                                alert(`Copied: ${delivery.shipmentId}`);
                                            }}>
                                                {delivery.shipmentId} <i className="bi bi-copy ms-1" style={{ fontSize: '0.8rem', opacity: 0.6 }}></i>
                                            </td>
                                            <td>
                                                {delivery.senderDetails?.fullName || delivery.senderName || 'N/A'}
                                            </td>
                                            <td>
                                                {delivery.collectionDetails?.address?.city || delivery.start || 'N/A'}
                                            </td>
                                            <td>
                                                {delivery.deliveryDetails?.address?.city || delivery.end || 'N/A'}
                                            </td>
                                            <td>
                                                <Badge bg={getStatusBadge(delivery.status)}>
                                                    {delivery.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                {(delivery.deliveredAt || delivery.eta)
                                                    ? new Date(delivery.deliveredAt || delivery.eta).toLocaleDateString()
                                                    : 'N/A'}
                                            </td>
                                            <td>{delivery.driverName || 'Unassigned'}</td>
                                            <td>
                                                {canAssign ? (
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleAssign(delivery)}
                                                    >
                                                        {delivery.driverName && delivery.driverName !== 'Unassigned' ? 'Reassign' : 'Assign Agent'}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="btn btn-sm btn-outline-info"
                                                        onClick={() => window.open(`/tracking?id=${delivery.trackingNumber || delivery.shipmentId}`, '_blank')}
                                                    >
                                                        Track
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted">
                                            No deliveries found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-3">
                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                            &lt; Back
                                        </button>
                                    </li>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                            Next &gt;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )}
                </>
            )}


            <AssignShipmentModal
                show={showAssignModal}
                onClose={() => setShowAssignModal(false)}
                shipment={selectedShipment}
                onAssign={handleDriverAssignment}
            />
        </div>
    );
};

export default Deliveries;
