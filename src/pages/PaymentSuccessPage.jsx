import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInterceptor';
import '../styles/ui/PaymentSuccess.css';
import Button from '../components/ui/Button';
import logo from "../assets/shipday_logo.jpg";
import rightSideImage from "../assets/bg.png";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const syncingInProgress = React.useRef(false);

    // Prioritize state (from internal navigation) over URL params
    const stateAmount = location.state?.amount;
    const stateMethod = location.state?.method;
    const statePaymentId = location.state?.paymentId;

    const paymentId = statePaymentId || searchParams.get('payment_id');
    const amountFromUrl = searchParams.get('amount_gross') || searchParams.get('amount');
    const methodFromUrl = searchParams.get('method');

    const pendingPaymentId = sessionStorage.getItem('pendingPayment');
    const pendingAmount = sessionStorage.getItem('pendingAmount');

    const amount = stateAmount || amountFromUrl || pendingAmount;
    const method = stateMethod || methodFromUrl || (pendingPaymentId?.startsWith('TOPUP-') ? 'wallet top-up' : 'online');

    const isCod = method === 'cod' || method === 'ewallet';
    const isValidSession = !!pendingPaymentId;

    useEffect(() => {
        if (!isCod && !isValidSession) {
            navigate('/dashboard');
        } else if (isValidSession) {
            // Keep pendingPayment for a moment for the sync effect to use it
            // We'll clear it when navigating away
        }
    }, [isCod, isValidSession, navigate]);

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sandbox Auto-Sync Logic: Since PayFast cannot send IPN to localhost
    useEffect(() => {
        const syncSandbox = async () => {
            const mPaymentId = searchParams.get('m_payment_id') || pendingPaymentId;
            const amt = searchParams.get('amount_gross') || pendingAmount;

            if (mPaymentId && amt && !syncingInProgress.current) {
                syncingInProgress.current = true;
                try {
                    
                    await axiosInstance.post('/payments/confirm-sandbox', {
                        mPaymentId: mPaymentId,
                        amount: amt
                    });
                    

                    // Now safely clear session storage
                    sessionStorage.removeItem('pendingPayment');
                    sessionStorage.removeItem('pendingAmount');
                    sessionStorage.setItem('lastSyncId', mPaymentId); // Prevent double sync
                } catch (err) {
                    console.warn('Sandbox sync failed:', err.message);
                    syncingInProgress.current = false; // Allow retry on failure
                }
            }
        };

        const lastSync = sessionStorage.getItem('lastSyncId');
        const currentId = searchParams.get('m_payment_id') || pendingPaymentId;

        if (currentId && lastSync !== currentId && !syncingInProgress.current) {
            syncSandbox();
        }
    }, [searchParams, pendingPaymentId, pendingAmount]);

    if (!isCod && !isValidSession) return null;

    return (
        <div className="payment-outcome-page min-vh-100 d-flex align-items-center justify-content-center p-4">
            {/* Ambient Background Elements */}
            <div className="mesh-gradient"></div>
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>

            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={400}
                gravity={0.1}
                colors={['#fabb05', '#ffffff', '#94a3b8']}
            />

            <div className="outcome-container">
                {/* Success Hub */}
                <div className="success-hub p-5 text-center">
                    <div className="success-icon-wrapper mb-4">
                        <div className="pulse-ring"></div>
                        <div className="main-icon">
                            <i className="bi bi-check-all"></i>
                        </div>
                    </div>

                    <h1 className="outcome-title mb-2">Transaction <span className="text-yellow">Successful</span></h1>
                    <p className="outcome-subtitle mb-5">Your shipment nodes are now fully synchronized and operational.</p>

                    {/* Premium Receipt */}
                    <div className="premium-receipt mb-5">
                        <div className="receipt-row">
                            <span className="label">AMOUNT PROCESSED</span>
                            <span className="value text-white highlight">R{amount || '0.00'}</span>
                        </div>
                        <div className="receipt-divider"></div>
                        <div className="receipt-row">
                            <span className="label">PAYMENT METHOD</span>
                            <span className="value">{method?.toUpperCase() || (isCod ? 'CASH ON DELIVERY' : 'ONLINE')}</span>
                        </div>
                        <div className="receipt-row">
                            <span className="label">REFERENCE NO.</span>
                            <span className="value font-mono">{paymentId || pendingPaymentId || 'SHP-AUTO-LOCAL'}</span>
                        </div>
                    </div>

                    <div className="outcome-actions">
                        <button onClick={() => navigate('/dashboard/shipments')} className="action-btn-primary mb-3">
                            <span className="btn-text">TRACK SHIPMENT</span>
                            <div className="btn-glow"></div>
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="action-btn-secondary">
                            RETURN TO TERMINAL
                        </button>
                    </div>

                    <div className="mt-5 pt-4 border-top border-white border-opacity-10">
                        <p className="x-small-text opacity-50 mb-0">SHIPDAY SECURE PAYMENT NODE © 2026</p>
                    </div>
                </div>
            </div>

            <style>{`
                .payment-outcome-page {
                    background-color: #020617;
                    color: #f8fafc;
                    font-family: 'Inter', sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                /* Background Effects */
                .mesh-gradient {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 20%, rgba(250, 187, 5, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, rgba(15, 23, 42, 1) 0%, transparent 50%);
                    z-index: -1;
                }

                .floating-shape {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    z-index: -1;
                    opacity: 0.15;
                    animation: float 20s infinite alternate ease-in-out;
                }

                .shape-1 {
                    width: 500px; height: 500px;
                    background: #fabb05;
                    top: -100px; right: -100px;
                }

                .shape-2 {
                    width: 400px; height: 400px;
                    background: #1e293b;
                    bottom: -50px; left: -50px;
                    animation-delay: -10s;
                }

                @keyframes float {
                    from { transform: translate(0, 0) rotate(0deg); }
                    to { transform: translate(50px, 50px) rotate(30deg); }
                }

                /* Container */
                .outcome-container {
                    width: 100%;
                    max-width: 540px;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 32px;
                    box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.5);
                    z-index: 5;
                    animation: appear 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes appear {
                    from { opacity: 0; transform: scale(0.9) translateY(30px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                /* Icon */
                .success-icon-wrapper {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                }

                .pulse-ring {
                    position: absolute;
                    width: 100%; height: 100%;
                    border-radius: 50%;
                    background: rgba(250, 187, 5, 0.2);
                    animation: pulse 2s infinite;
                }

                .main-icon {
                    position: relative;
                    width: 100%; height: 100%;
                    background: #fabb05;
                    border-radius: 50%;
                    display: flex;
                    align-items: center; justify-content: center;
                    font-size: 3.5rem;
                    color: #0f172a;
                    box-shadow: 0 0 30px rgba(250, 187, 5, 0.4);
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.8); opacity: 0; }
                }

                .outcome-title { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 2.2rem; }
                .text-yellow { color: #fabb05; }
                .outcome-subtitle { color: #94a3b8; font-weight: 500; font-size: 0.95rem; }

                /* Receipt */
                .premium-receipt {
                    background: rgba(15, 23, 42, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    padding: 24px;
                }

                .receipt-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                }

                .label { font-size: 0.7rem; font-weight: 800; letter-spacing: 2px; color: #64748b; }
                .value { font-size: 0.9rem; font-weight: 700; color: #f1f5f9; }
                .highlight { font-size: 1.4rem; color: #fabb05 !important; }
                .font-mono { font-family: 'Courier New', Courier, monospace; letter-spacing: 1px; }

                .receipt-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    margin: 15px 0;
                }

                /* Actions */
                .action-btn-primary {
                    width: 100%;
                    padding: 18px;
                    border: none;
                    border-radius: 16px;
                    background: #fabb05;
                    color: #0f172a;
                    font-weight: 900;
                    letter-spacing: 3px;
                    position: relative;
                    overflow: hidden;
                    transition: 0.3s;
                    box-shadow: 0 10px 20px rgba(250, 187, 5, 0.2);
                }

                .btn-glow {
                    position: absolute;
                    top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: 0.5s;
                }

                .action-btn-primary:hover .btn-glow { left: 100%; }
                .action-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(250, 187, 5, 0.3); }

                .action-btn-secondary {
                    width: 100%;
                    padding: 15px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    color: #94a3b8;
                    font-weight: 800;
                    letter-spacing: 2px;
                    font-size: 0.8rem;
                    transition: 0.3s;
                }

                .action-btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #ffffff;
                    border-color: rgba(255, 255, 255, 0.3);
                }

                .x-small-text { font-size: 0.65rem; font-weight: 800; letter-spacing: 2px; }
            `}</style>
        </div>
    );
};

export default PaymentSuccessPage;
