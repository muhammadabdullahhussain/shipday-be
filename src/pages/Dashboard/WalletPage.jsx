import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Badge, Modal, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInterceptor';
import '../../styles/ui/WalletPage.css';

const WalletPage = () => {
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTopUp, setShowTopUp] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [processing, setProcessing] = useState(false);

    const email = localStorage.getItem('email');

    const fetchUserAndWallet = async () => {
        try {
            if (!email) {
                setLoading(false);
                return;
            }

            // 1. First fetch user details to get _id
            const userRes = await axiosInstance.get(`/user?email=${email}`);
            const userData = userRes.data.user;
            setUser(userData);

            if (userData?._id) {
                // 2. Fetch wallet using _id
                const walletRes = await axiosInstance.get(`/wallets/${userData._id}`);
                setWallet(walletRes.data);
            }
        } catch (error) {
            console.error('Error in wallet sync:', error);
            toast.error('Failed to synchronize wallet nodes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAndWallet();
    }, [email]);

    const handleTopUp = async (e) => {
        e.preventDefault();
        const amount = parseFloat(topUpAmount);
        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        setProcessing(true);
        try {
            // Initiate PayFast payment for Top-up
            // We use a dummy shipment structure or a dedicated topup endpoint if it exists
            // For now, let's assume we can initiate a payment via a generic payment endpoint
            // or just use PayFast directly via the initiatePayFastPayment logic

            // We'll call a dedicated top-up endpoint (which I'll add if not exists)
            const response = await axiosInstance.post('/payments/topup', {
                userId: user?._id,
                amount: amount
            });

            if (response.data.redirectUrl) {
                // Set pending payment in session to allow the success page to show the confirmation
                const mockPaymentId = `TOPUP-${user?._id}-${Date.now()}`;
                sessionStorage.setItem('pendingPayment', mockPaymentId);
                sessionStorage.setItem('pendingAmount', amount.toString());
                window.location.href = response.data.redirectUrl;
            } else {
                toast.error('Failed to generate payment link');
            }
        } catch (error) {
            console.error('Top-up error:', error);
            toast.error('Failed to initiate top-up');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="warning" />
            </div>
        );
    }

    return (
        <div className="wallet-container p-4">
            <div className="row g-4 mb-4">
                <div className="col-lg-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold m-0 h3">E-Wallet Management</h2>
                        <Button
                            variant="warning"
                            className="rounded-3 px-4 py-2 fw-bold text-dark d-flex align-items-center gap-2 shadow-sm"
                            onClick={() => setShowTopUp(true)}
                        >
                            <i className="bi bi-plus-circle-fill"></i> Add Funds
                        </Button>
                    </div>
                </div>

                {/* Balance Card */}
                <div className="col-lg-4">
                    <Card className="balance-card border-0 rounded-4 overflow-hidden position-relative shadow-lg text-white">
                        <div className="card-overlay"></div>
                        <Card.Body className="p-4 position-relative z-1">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <span className="text-white-50 text-uppercase tracking-widest small fw-bold">Current Balance</span>
                                <div className="rounded-circle bg-white bg-opacity-10 p-2">
                                    <i className="bi bi-wallet2 fs-4"></i>
                                </div>
                            </div>
                            <h1 className="display-4 fw-black mb-1">R{(wallet?.balance || 0).toFixed(2)}</h1>
                            <p className="small text-white-50">Currency: ZAR (South African Rand)</p>

                            <div className="mt-4 pt-3 border-top border-white border-opacity-10">
                                <div className="d-flex align-items-center gap-2 x-small text-white-50 fw-bold">
                                    <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                                    VERIFIED ACCOUNT
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Quick Info Cards */}
                <div className="col-lg-8">
                    <div className="row g-4 h-100">
                        <div className="col-md-6 h-100">
                            <Card className="h-100 border-0 rounded-4 shadow-sm bg-white p-2">
                                <Card.Body className="d-flex align-items-center">
                                    <div className="rounded-4 bg-primary bg-opacity-10 p-4 me-4">
                                        <i className="bi bi-arrow-up-right text-primary fs-3"></i>
                                    </div>
                                    <div>
                                        <span className="text-secondary small fw-bold text-uppercase d-block mb-1">Total Credited</span>
                                        <h3 className="fw-bold m-0 text-dark">R{wallet?.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0).toFixed(2)}</h3>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-6 h-100">
                            <Card className="h-100 border-0 rounded-4 shadow-sm bg-white p-2">
                                <Card.Body className="d-flex align-items-center">
                                    <div className="rounded-4 bg-danger bg-opacity-10 p-4 me-4">
                                        <i className="bi bi-arrow-down-left text-danger fs-3"></i>
                                    </div>
                                    <div>
                                        <span className="text-secondary small fw-bold text-uppercase d-block mb-1">Total Spent</span>
                                        <h3 className="fw-bold m-0 text-dark">R{wallet?.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0).toFixed(2)}</h3>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <Card className="border-0 rounded-4 shadow-sm bg-white">
                <Card.Header className="bg-white border-0 p-4 d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold m-0 text-dark">Recent Activity</h5>
                    <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill small fw-bold text-uppercase opacity-75">Transactions: {wallet?.transactions?.length || 0}</Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="m-0 text-nowrap align-middle table-custom-padding">
                            <thead className="bg-light bg-opacity-50">
                                <tr>
                                    <th className="px-4 py-3 x-small-text text-muted fw-black tracking-widest uppercase border-0">DESCRIPTION</th>
                                    <th className="px-4 py-3 x-small-text text-muted fw-black tracking-widest uppercase border-0 text-center">DATE</th>
                                    <th className="px-4 py-3 x-small-text text-muted fw-black tracking-widest uppercase border-0 text-center">TYPE</th>
                                    <th className="px-4 py-3 x-small-text text-muted fw-black tracking-widest uppercase border-0 text-end">AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wallet?.transactions.length > 0 ? (
                                    wallet.transactions.slice().reverse().map((tx, idx) => (
                                        <tr key={idx} className="border-bottom border-light">
                                            <td className="px-4 py-4">
                                                <div className="d-flex align-items-center">
                                                    <div className={`rounded-circle p-2 me-3 d-flex align-items-center justify-content-center bg-${tx.type === 'credit' ? 'success' : 'danger'} bg-opacity-10`} style={{ width: '40px', height: '40px' }}>
                                                        <i className={`bi bi-${tx.type === 'credit' ? 'shield-plus' : 'shield-minus'} text-${tx.type === 'credit' ? 'success' : 'danger'}`}></i>
                                                    </div>
                                                    <span className="fw-bold text-dark small">{tx.description || 'System Managed'}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="text-secondary small fw-medium">{new Date(tx.date).toLocaleDateString()}</span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <Badge bg={tx.type === 'credit' ? 'success' : 'danger'} className="text-uppercase small fw-bold px-3 py-2 rounded-pill" style={{ fontSize: '0.6rem' }}>
                                                    {tx.type}
                                                </Badge>
                                            </td>
                                            <td className={`px-4 py-4 text-end fw-black ${tx.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                                                {tx.type === 'credit' ? '+' : '-'} R{tx.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5 text-muted small fw-medium opacity-50">No transaction records found in nodes.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            {/* Top Up Modal */}
            <Modal show={showTopUp} onHide={() => setShowTopUp(false)} centered contentClassName="rounded-4 border-0 shadow-lg">
                <Modal.Header closeButton className="border-0 p-4">
                    <Modal.Title className="fw-black h4 text-dark letter-spacing-tight">Deposit Funds to Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4 pt-0">
                    <p className="text-secondary small mb-4 fw-medium">Add balance to your ShipDay wallet for faster checkouts and automated logistics.</p>
                    <Form onSubmit={handleTopUp}>
                        <Form.Group className="mb-4">
                            <Form.Label className="x-small fw-black text-muted tracking-widest uppercase mb-2">AMOUNT (ZAR)</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="e.g. 500.00"
                                className="form-control-lg rounded-3 py-3 px-4 border-light shadow-sm fw-bold"
                                value={topUpAmount}
                                onChange={(e) => setTopUpAmount(e.target.value)}
                            />
                            <div className="d-flex gap-2 mt-3">
                                {[100, 500, 1000].map(amt => (
                                    <Button
                                        key={amt}
                                        variant="light"
                                        className="rounded-3 px-3 py-2 small fw-bold text-secondary border-0"
                                        onClick={() => setTopUpAmount(amt.toString())}
                                    >
                                        R{amt}
                                    </Button>
                                ))}
                            </div>
                        </Form.Group>
                        <Button
                            variant="warning"
                            type="submit"
                            className="w-100 py-3 rounded-3 fw-black text-dark tracking-widest border-0 shadow-sm position-relative overflow-hidden btn-topup"
                            disabled={processing}
                        >
                            {processing ? <Spinner size="sm" /> : 'SECURE DEPOSIT'}
                            <div className="btn-scanner"></div>
                        </Button>
                    </Form>
                    <div className="text-center mt-4 pt-2 border-top border-light">
                        <div className="d-flex align-items-center justify-content-center gap-2 x-small text-muted fw-bold">
                            <i className="bi bi-shield-lock-fill text-success"></i>
                            ENCRYPTED VIA PAYFAST NODES
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default WalletPage;
