import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "../styles/ui/auth.css";

import logo from "../assets/shipday_logo.jpg";
import passwordIcon from "../assets/lockicon.png";
import eyeShowIcon from "../assets/eyeopen.png";
import eyeHideIcon from "../assets/eyeopen.png"; // Replace with actual closed eye icon
import rightSideImage from "../assets/bg5.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInterceptor";


const NewPassPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { email } = location.state || {};

  const isStrongPassword = (pwd) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pwd);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please restart the reset process.", {
        onClose: () => navigate("/forgetpass"),
        autoClose: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error("Password does not meet the security criteria.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/auth/reset-password", {
        email,
        newPassword: password,
      });

      toast.success("Security credentials updated successfully!", {
        onClose: () => navigate("/congratulations"),
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
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
            <div className="bg-info rounded-circle pulse-blue" style={{ width: '10px', height: '10px' }}></div>
            <span className="fw-black text-dark tracking-widest x-small">STATUS: SECURITY UPDATE</span>
          </div>
          <p className="text-dark opacity-50 small mb-0 fw-bold tracking-tight">ENCRYPTION KEY RE-PROVISIONING</p>
        </div>

        <div className="position-absolute bottom-0 start-0 m-5 z-2">
          <h1 className="display-4 fw-black text-white mb-0" style={{ letterSpacing: '-2px' }}>
            SECURE <span className="text-yellow">NODE.</span>
          </h1>
          <p className="text-white-50 fw-bold tracking-widest small mt-2">RE-ESTABLISHING SYSTEM PRIVILEGES</p>
        </div>

        {/* Decorative Grid */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fabb05 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* 2. FORM SIDE (40%) */}
      <div className="login-form-section d-flex align-items-center justify-content-center p-4 p-md-5 w-40">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="mb-5">
            <span className="text-yellow fw-black x-small tracking-widest mb-2 d-block">CREDENTIAL RE-ENTRY</span>
            <h2 className="fw-black text-dark display-6 mb-3" style={{ letterSpacing: '-1.5px' }}>New Password</h2>
            <p className="text-muted small fw-medium">Configure your new secure access credentials for the ShipDay network.</p>
          </div>

          <form onSubmit={handleSave} className="precision-form">
            {/* NEW PASSWORD */}
            <div className="mb-4">
              <label className="precision-label">SET NEW ACCESS PIN</label>
              <div className="precision-input-wrapper">
                <i className="bi bi-shield-lock precision-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="precision-input"
                  disabled={loading}
                />
                <i
                  className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} precision-eye-toggle`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mb-4">
              <label className="precision-label">CONFIRM ACCESS PIN</label>
              <div className="precision-input-wrapper">
                <i className="bi bi-shield-check precision-icon"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="precision-input"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="mb-5 ps-2">
                <div className="d-flex gap-1 mb-2">
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: password.length >= 8 ? '#fabb05' : '#e2e8f0' }}></div>
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: /[A-Z]/.test(password) ? '#fabb05' : '#e2e8f0' }}></div>
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: /[0-9]/.test(password) ? '#fabb05' : '#e2e8f0' }}></div>
                  <div className={`flex-grow-1 rounded-pill`} style={{ height: '3px', background: /[\W_]/.test(password) ? '#fabb05' : '#e2e8f0' }}></div>
                </div>
                {!isStrongPassword(password) && <span className="x-small text-danger fw-bold">PIN requirements not met</span>}
              </div>
            )}

            <button type="submit" disabled={loading} className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden mb-4">
              <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                {loading ? "COMMITTING..." : "SAVE CREDENTIALS"}
              </span>
              <div className="precision-btn-scanner"></div>
            </button>

            <div className="text-center mt-5">
              <Link to="/login" className="x-small fw-black text-muted text-decoration-none tracking-widest hover-underline">
                CANCEL OPERATION
              </Link>
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
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45) !important; }
        .pointer { cursor: pointer; }

        h1, h2, h3, .precision-btn { font-family: 'Outfit', sans-serif !important; }

        .login-visual-section { min-height: 100vh; background: #0f172a; }
        .visual-image-layer {
          position: absolute; top: 0; start: 0; width: 100%; height: 100%;
          background-size: cover; background-position: center;
          filter: brightness(0.4) grayscale(100%) contrast(1.1);
        }
        .visual-overlay-layer {
          position: absolute; top: 0; start: 0; width: 100%; height: 100%;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 100%);
          z-index: 1;
        }

        .precision-label {
          font-weight: 800; font-size: 0.68rem; letter-spacing: 0.2em;
          color: #94a3b8; margin-bottom: 0.85rem; display: block; text-transform: uppercase;
        }

        .precision-input-wrapper {
          display: flex; align-items: center; background: #f8fafc;
          border: 1px solid #e2e8f0; border-radius: 10px; padding: 0 1.25rem;
          transition: all 0.3s ease; position: relative;
        }

        .precision-input-wrapper:focus-within {
          border-color: #fabb05; background: #fff;
          box-shadow: 0 4px 25px rgba(250, 187, 5, 0.1);
        }

        .precision-input-wrapper::after {
          content: ''; position: absolute; bottom: -1px; left: 50%;
          width: 0; height: 2.5px; background: #fabb05;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); transform: translateX(-50%);
        }

        .precision-input-wrapper:focus-within::after { width: 100%; }

        .precision-icon { font-size: 1rem; color: #94a3b8; opacity: 0.7; margin-right: 1.1rem; }
        .precision-input {
          border: none !important; background: transparent !important;
          padding: 1.15rem 0 !important; font-weight: 600 !important;
          color: #0f172a !important; font-size: 0.92rem !important; width: 100%;
        }
        .precision-input:focus { outline: none !important; }

        .precision-eye-toggle { color: #94a3b8; cursor: pointer; font-size: 1.1rem; }

        .precision-btn {
          background: #0f172a !important; color: #fabb05 !important; border: none !important;
          transition: all 0.4s ease !important; border-radius: 10px !important; font-weight: 800 !important;
        }
        .precision-btn:hover {
          background: #000 !important; color: #fff !important; transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3) !important;
        }

        .precision-btn-scanner {
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(250, 187, 5, 0.1), transparent);
          animation: scan 3s infinite;
        }

        @keyframes scan { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes pulse-blue { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }

        .hover-underline:hover { text-decoration: underline !important; }

        @media (max-width: 991px) {
          .w-40 { width: 100%; }
          .w-60 { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default NewPassPage;
