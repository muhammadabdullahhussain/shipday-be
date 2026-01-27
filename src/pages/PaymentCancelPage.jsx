import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/shipday_logo.jpg";
import rightSideImage from "../assets/bg.png";

const PaymentCancelPage = () => {
    const navigate = useNavigate();

    const pendingPaymentId = sessionStorage.getItem('pendingPayment');
    const isValidSession = !!pendingPaymentId;

    useEffect(() => {
        if (!isValidSession) {
            navigate('/dashboard');
        }
    }, [isValidSession, navigate]);

    if (!isValidSession) return null;

    return (
        <div className="payment-outcome-page min-vh-100 d-flex align-items-center justify-content-center p-4">
            {/* Ambient Background Elements (Red Theme) */}
            <div className="mesh-gradient-red"></div>
            <div className="floating-shape shape-red-1"></div>
            <div className="floating-shape shape-red-2"></div>

            <div className="outcome-container border-red">
                {/* Alert Hub */}
                <div className="alert-hub p-5 text-center">
                    <div className="alert-icon-wrapper mb-4">
                        <div className="pulse-ring-red"></div>
                        <div className="main-icon-red">
                            <i className="bi bi-shield-x"></i>
                        </div>
                    </div>

                    <h1 className="outcome-title mb-2">Process <span className="text-red">Voided</span></h1>
                    <p className="outcome-subtitle mb-5">The secure transaction handshake was interrupted. No charges applied.</p>

                    {/* Recovery Guide */}
                    <div className="recovery-card mb-5 text-start">
                        <h6 className="recovery-header mb-3">RECOVERY PROTOCOL</h6>
                        <div className="recovery-item">
                            <i className="bi bi-info-circle-fill text-red me-3"></i>
                            <span>Check card authorization limits</span>
                        </div>
                        <div className="recovery-item">
                            <i className="bi bi-shield-lock-fill text-red me-3"></i>
                            <span>Verify 3D Secure / OTP response</span>
                        </div>
                    </div>

                    <div className="outcome-actions">
                        <button onClick={() => navigate('/payment/select')} className="action-btn-red mb-3">
                            <span className="btn-text">RE-INITIATE PAYMENT</span>
                            <div className="btn-glow-red"></div>
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="action-btn-secondary">
                            RETURN TO DASHBOARD
                        </button>
                    </div>

                    <div className="mt-5 pt-4 border-top border-white border-opacity-10">
                        <p className="x-small-text opacity-50 mb-0 uppercase">DIAGNOSTIC REF: {pendingPaymentId || 'UNSET'}</p>
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
                .mesh-gradient-red {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: 
                        radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, rgba(15, 23, 42, 1) 0%, transparent 50%);
                    z-index: -1;
                }

                .floating-shape {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    z-index: -1;
                    opacity: 0.1;
                    animation: float 20s infinite alternate ease-in-out;
                }

                .shape-red-1 {
                    width: 500px; height: 500px;
                    background: #ef4444;
                    top: -100px; left: -100px;
                }

                .shape-red-2 {
                    width: 400px; height: 400px;
                    background: #1e293b;
                    bottom: -50px; right: -50px;
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

                .border-red { border-color: rgba(239, 68, 68, 0.2); }

                @keyframes appear {
                    from { opacity: 0; transform: scale(0.9) translateY(30px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                /* Icon */
                .alert-icon-wrapper {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                }

                .pulse-ring-red {
                    position: absolute;
                    width: 100%; height: 100%;
                    border-radius: 50%;
                    background: rgba(239, 68, 68, 0.2);
                    animation: pulse 2s infinite;
                }

                .main-icon-red {
                    position: relative;
                    width: 100%; height: 100%;
                    background: #ef4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center; justify-content: center;
                    font-size: 3rem;
                    color: white;
                    box-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.8); opacity: 0; }
                }

                .outcome-title { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 2.2rem; }
                .text-red { color: #ef4444; }
                .outcome-subtitle { color: #94a3b8; font-weight: 500; font-size: 0.95rem; }

                /* Recovery Card */
                .recovery-card {
                    background: rgba(239, 68, 68, 0.05);
                    border: 1px solid rgba(239, 68, 68, 0.1);
                    border-radius: 20px;
                    padding: 24px;
                }

                .recovery-header { font-size: 0.7rem; font-weight: 900; letter-spacing: 2px; color: #ef4444; }
                .recovery-item { display: flex; align-items: center; font-size: 0.85rem; font-weight: 600; color: #cbd5e1; margin-bottom: 12px; }
                .recovery-item:last-child { margin-bottom: 0; }

                /* Actions */
                .action-btn-red {
                    width: 100%;
                    padding: 18px;
                    border: none;
                    border-radius: 16px;
                    background: #ef4444;
                    color: white;
                    font-weight: 900;
                    letter-spacing: 2px;
                    position: relative;
                    overflow: hidden;
                    transition: 0.3s;
                    box-shadow: 0 10px 20px rgba(239, 68, 68, 0.2);
                }

                .btn-glow-red {
                    position: absolute;
                    top: 0; left: -100%; width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: 0.5s;
                }

                .action-btn-red:hover .btn-glow-red { left: 100%; }
                .action-btn-red:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(239, 68, 68, 0.3); }

                .action-btn-secondary {
                    width: 100%;
                    padding: 15px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    color: #94a3b8;
                    font-weight: 800;
                    letter-spacing: 1px;
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

export default PaymentCancelPage;
