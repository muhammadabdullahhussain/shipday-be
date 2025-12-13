import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInterceptor';
import { Badge, Table, Spinner } from 'react-bootstrap';

const Deliveries = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, in-transit, delivered, pending

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
        const statusMap = {
            'pending': 'warning',
            'in-transit': 'info',
            'delivered': 'success',
            'cancelled': 'danger'
        };
        return statusMap[status] || 'secondary';
    };

    return (
        <div className="deliveries-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">Deliveries</h4>
                <div className="btn-group">
                    <button
                        className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`btn ${filter === 'in-transit' ? 'btn-info' : 'btn-outline-info'}`}
                        onClick={() => setFilter('in-transit')}
                    >
                        In Transit
                    </button>
                    <button
                        className={`btn ${filter === 'delivered' ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => setFilter('delivered')}
                    >
                        Delivered
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
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
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.length > 0 ? (
                                deliveries.map((delivery) => (
                                    <tr key={delivery._id}>
                                        <td className="text-primary fw-bold">{delivery.shipmentId}</td>
                                        <td>{delivery.customerName || delivery.senderName || 'N/A'}</td>
                                        <td>{delivery.collectionAddress?.city || 'N/A'}</td>
                                        <td>{delivery.deliveryAddress?.city || 'N/A'}</td>
                                        <td>
                                            <Badge bg={getStatusBadge(delivery.status)}>
                                                {delivery.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            {delivery.deliveryDate
                                                ? new Date(delivery.deliveryDate).toLocaleDateString()
                                                : 'N/A'}
                                        </td>
                                        <td>{delivery.assignedDriver?.name || 'Unassigned'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        No deliveries found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default Deliveries;
