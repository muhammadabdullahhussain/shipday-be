import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui/auth.css";

import logo from "../assets/shipday_logo.jpg";
import rightSideImage from "../assets/bg.png"; // Consistent background

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInterceptor";

const ForgetPassPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecovery = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your registered email identifier.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/verification/request", {
        email,
        source: "forgot"
      });

      // Show success toast and navigate
      toast.success("Recovery protocol initiated. Check your inbox.", {
        onClose: () => {
          navigate("/verification", { state: { email, source: "forgot" } });
        },
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "User node not found or system error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-precision-page min-vh-100 d-flex overflow-hidden bg-white">
      {/* 1. VISUAL SIDE (60%) */}
      <div className="login-visual-section d-none d-lg-flex position-relative overflow-hidden w-60">
        <div className="visual-image-layer" style={{ backgroundImage: `url(${rightSideImage})` }}></div>
        <div className="visual-overlay-layer"></div>

        {/* Technical Branding Elements */}
        <div className="position-absolute top-0 start-0 m-5 z-2 p-4 border-start border-yellow border-4 bg-white bg-opacity-90 backdrop-blur-lg rounded-3 shadow-2xl">
          <img src={logo} alt="Logo" style={{ width: '160px', marginBottom: '1.25rem', display: 'block', mixBlendMode: 'multiply' }} />
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="bg-danger rounded-circle pulse-red" style={{ width: '10px', height: '10px' }}></div>
            <span className="fw-black text-dark tracking-widest x-small">STATUS: RECOVERY MODE</span>
          </div>
          <p className="text-dark opacity-50 small mb-0 fw-bold tracking-tight">IDENTITY VERIFICATION REQUIRED</p>
        </div>

        <div className="position-absolute bottom-0 start-0 m-5 z-2">
          <h1 className="display-4 fw-black text-white mb-0" style={{ letterSpacing: '-2px' }}>
            RESTORE <span className="text-yellow">ACCESS.</span>
          </h1>
          <p className="text-white-50 fw-bold tracking-widest small mt-2">SECURE ACCOUNT RECOVERY PROTOCOL</p>
        </div>

        {/* Decorative Grid */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fabb05 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* 2. FORM SIDE (40%) */}
      <div className="login-form-section d-flex align-items-center justify-content-center p-4 p-md-5 w-40">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="mb-5">
            <span className="text-yellow fw-black x-small tracking-widest mb-2 d-block">FORGOT CREDENTIALS?</span>
            <h2 className="fw-black text-dark display-6 mb-3" style={{ letterSpacing: '-1.5px' }}>Reset Password</h2>
            <p className="text-muted small fw-medium">Enter your registered email identifier to receive a verification code.</p>
          </div>

          <form onSubmit={handleRecovery} className="precision-form">
            {/* EMAIL */}
            <div className="mb-5">
              <label className="precision-label">REGISTERED IDENTITY (EMAIL)</label>
              <div className="precision-input-wrapper">
                <i className="bi bi-shield-exclamation precision-icon"></i>
                <input
                  type="email"
                  placeholder="ENTER RECOVERY EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="precision-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden mb-4">
              <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                {loading ? "VERIFYING..." : "SEND RECOVERY CODE"}
              </span>
              <div className="precision-btn-scanner"></div>
            </button>

            <div className="text-center pt-3 border-top border-light mt-5">
              <p className="x-small fw-black text-muted mb-0 tracking-wider">
                REMEMBERED YOUR LOGINS? <Link to="/login" className="text-yellow text-decoration-none ms-2">ABORT RECOVERY</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} />

      <style>{`
                .login-precision-page { font-family: 'Inter', sans-serif; }
                .w-60 { width: 60%; }
                .w-40 { width: 40%; }
                .x-small { font-size: 0.72rem !important; }
                .fw-black { font-weight: 900 !important; }
                .tracking-widest { letter-spacing: 0.25em; }
                .tracking-wider { letter-spacing: 0.12em; }
                .backdrop-blur-md { backdrop-filter: blur(12px); }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45) !important; }

                h1, h2, h3, .precision-btn {
                    font-family: 'Outfit', sans-serif !important;
                }

                .login-visual-section {
                    min-height: 100vh;
                    background: #0f172a;
                }

                .visual-image-layer {
                    position: absolute;
                    top: 0;
                    start: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    filter: brightness(0.4) grayscale(100%) contrast(1.1);
                }

                .visual-overlay-layer {
                    position: absolute;
                    top: 0;
                    start: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 100%);
                    z-index: 1;
                }

                .precision-label {
                    font-weight: 800;
                    font-size: 0.68rem;
                    letter-spacing: 0.2em;
                    color: #94a3b8;
                    margin-bottom: 0.85rem;
                    display: block;
                    text-transform: uppercase;
                }

                .precision-input-wrapper {
                    display: flex;
                    align-items: center;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 0 1.25rem;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .precision-input-wrapper:focus-within {
                    border-color: #fabb05;
                    background: #fff;
                    box-shadow: 0 4px 25px rgba(250, 187, 5, 0.1);
                }

                .precision-input-wrapper::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 50%;
                    width: 0;
                    height: 2.5px;
                    background: #fabb05;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateX(-50%);
                }

                .precision-input-wrapper:focus-within::after {
                    width: 100%;
                }

                .precision-icon {
                    font-size: 1rem;
                    color: #94a3b8;
                    opacity: 0.7;
                    margin-right: 1.1rem;
                }

                .precision-input {
                    border: none !important;
                    background: transparent !important;
                    padding: 1.15rem 0 !important;
                    font-weight: 600 !important;
                    color: #0f172a !important;
                    font-size: 0.92rem !important;
                    width: 100%;
                    letter-spacing: 0.01em;
                }

                .precision-input:focus {
                    outline: none !important;
                }

                .precision-btn {
                    background: #0f172a !important;
                    color: #fabb05 !important;
                    border: none !important;
                    transition: all 0.4s ease !important;
                    border-radius: 10px !important;
                    font-weight: 800 !important;
                }

                .precision-btn:hover {
                    background: #000 !important;
                    color: #fff !important;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
                }

                .precision-btn-scanner {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(250, 187, 5, 0.1), transparent);
                    animation: scan 3s infinite;
                }

                @keyframes scan {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }

                @keyframes pulse-red {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }

                @media (max-width: 991px) {
                    .w-40 { width: 100%; }
                    .w-60 { display: none !important; }
                }
             `}</style>
    </div>
  );
};

export default ForgetPassPage;
