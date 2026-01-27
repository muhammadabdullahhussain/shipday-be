import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ui/auth.css";

import logo from "../assets/shipday_logo.jpg";
import googleIcon from "../assets/google-color-icon.svg";
import rightSideImage from "../assets/bg.png"; // Using the same consistent background

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInterceptor";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStrongPassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error("Password too weak. Ensure it matches the security criteria.");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the public offer.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/verification/request", {
        email,
        source: "register",
      });

      if (data.message === "User already exists") {
        toast.info("User already exists. Please log in instead.", {
          onClose: () => navigate("/login"),
          autoClose: 3000,
        });
        return;
      }

      toast.success("Verification code sent to your email!", {
        onClose: () =>
          navigate("/verification", {
            state: { email, password, source: "register" },
          }),
        autoClose: 3000,
      });
    } catch (error) {
      const msg = error.response?.data?.message || "Error sending verification code";
      toast.error(msg);
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
            <div className="bg-primary rounded-circle pulse-blue" style={{ width: '10px', height: '10px' }}></div>
            <span className="fw-black text-dark tracking-widest x-small">STATUS: ONBOARDING</span>
          </div>
          <p className="text-dark opacity-50 small mb-0 fw-bold tracking-tight">NEW NODE PROVISIONING</p>
        </div>

        <div className="position-absolute bottom-0 start-0 m-5 z-2">
          <h1 className="display-4 fw-black text-white mb-0" style={{ letterSpacing: '-2px' }}>
            JOIN THE <span className="text-yellow">NETWORK.</span>
          </h1>
          <p className="text-white-50 fw-bold tracking-widest small mt-2">SECURE LOGISTICS INFRASTRUCTURE</p>
        </div>

        {/* Decorative Grid */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fabb05 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* 2. FORM SIDE (40%) */}
      <div className="login-form-section d-flex align-items-center justify-content-center p-4 p-md-5 w-40">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="mb-4">
            <span className="text-yellow fw-black x-small tracking-widest mb-2 d-block">NEW USER REGISTRATION</span>
            <h2 className="fw-black text-dark display-6 mb-3" style={{ letterSpacing: '-1.5px' }}>Create Account</h2>
            <p className="text-muted small fw-medium">Sign up now to gain access to member-only discounts and personalized recommendations.</p>
          </div>

          <form onSubmit={handleRegister} className="precision-form">
            {/* EMAIL */}
            <div className="mb-4">
              <label className="precision-label">IDENTITY (EMAIL)</label>
              <div className="precision-input-wrapper">
                <i className="bi bi-envelope precision-icon"></i>
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="precision-input"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="precision-label">SECURE PASSWORD</label>
              <div className="precision-input-wrapper">
                <i className="bi bi-shield-lock precision-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="precision-input"
                />
                <i
                  className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} precision-eye-toggle`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mb-4 ps-2">
                <div className="d-flex gap-1 mb-2">
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: password.length >= 8 ? '#fabb05' : '#e2e8f0' }}></div>
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: /[A-Z]/.test(password) ? '#fabb05' : '#e2e8f0' }}></div>
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: /[0-9]/.test(password) ? '#fabb05' : '#e2e8f0' }}></div>
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: /[\W_]/.test(password) ? '#fabb05' : '#e2e8f0' }}></div>
                </div>
                {!isStrongPassword(password) && <span className="x-small text-danger fw-bold">Password weak</span>}
              </div>
            )}

            {/* Checkbox */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-3">
                <div className={`precision-checkbox ${agreed ? 'active' : ''}`} onClick={() => setAgreed(!agreed)}>
                  {agreed && <i className="bi bi-check text-white small"></i>}
                </div>
                <span className="x-small fw-bold text-muted cursor-pointer" onClick={() => setAgreed(!agreed)}>
                  I agree to the <span className="text-dark">Public Offer</span> & Services
                </span>
              </div>
            </div>

            <button type="submit" disabled={loading} className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden mb-4">
              <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                {loading ? "PROCESSING..." : "REGISTER ACCOUNT"}
              </span>
              <div className="precision-btn-scanner"></div>
            </button>

            <div className="text-center mb-4">
              <span className="x-small fw-black text-muted tracking-widest d-block mb-4">OR CONTINUE WITH</span>
              <button
                type="button"
                disabled={loading}
                className="google-precision-btn w-100 d-flex align-items-center justify-content-center gap-3 py-3"
              >
                <img src={googleIcon} alt="Google" style={{ width: '18px' }} />
                <span className="fw-black x-small tracking-widest text-dark">GOOGLE ACCOUNT</span>
              </button>
            </div>

            <div className="text-center pt-3 border-top border-light mt-5">
              <p className="x-small fw-black text-muted mb-0 tracking-wider">
                ALREADY REGISTERED? <Link to="/login" className="text-yellow text-decoration-none ms-2">ACCESS TERMINAL</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={4000} />

      <style>{`
                .login-precision-page {
                    font-family: 'Inter', sans-serif;
                }

                .w-60 { width: 60%; }
                .w-40 { width: 40%; }
                .x-small { font-size: 0.72rem !important; }
                .fw-black { font-weight: 900 !important; }
                .tracking-widest { letter-spacing: 0.25em; }
                .tracking-wider { letter-spacing: 0.12em; }
                .backdrop-blur-md { backdrop-filter: blur(12px); }
                .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45) !important; }
                .pointer { cursor: pointer; }

                h1, h2, h3, .precision-btn {
                    font-family: 'Outfit', sans-serif !important;
                }

                /* Side Layouts */
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

                /* Precision UI Components */
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

                .precision-eye-toggle {
                    color: #94a3b8;
                    cursor: pointer;
                    font-size: 1.1rem;
                    transition: color 0.3s;
                }

                .precision-eye-toggle:hover {
                    color: #0f172a;
                }

                /* Custom Checkbox */
                .precision-checkbox {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #e2e8f0;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .precision-checkbox.active {
                    background: #fabb05;
                    border-color: #fabb05;
                }

                /* Buttons */
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

                .google-precision-btn {
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    font-family: 'Outfit', sans-serif !important;
                }

                .google-precision-btn:hover {
                    background: #f8fafc;
                    border-color: #cbd5e1;
                    transform: translateY(-1px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.05);
                }

                @keyframes pulse-blue {
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

export default RegisterPage;
