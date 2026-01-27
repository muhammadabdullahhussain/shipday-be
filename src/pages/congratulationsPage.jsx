import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import "../styles/ui/auth.css";

import logo from "../assets/logo1.png";
import rightSideImage from "../assets/bg6.png";

const CongratulationsPage = () => {
  const navigate = useNavigate();

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
            <div className="bg-success rounded-circle pulse-green" style={{ width: '10px', height: '10px' }}></div>
            <span className="fw-black text-dark tracking-widest x-small">STATUS: ACCOUNT ACTIVE</span>
          </div>
          <p className="text-dark opacity-50 small mb-0 fw-bold tracking-tight">NODE PROVISIONING COMPLETE</p>
        </div>

        <div className="position-absolute bottom-0 start-0 m-5 z-2">
          <h1 className="display-4 fw-black text-white mb-0" style={{ letterSpacing: '-2px' }}>
            WELCOME <span className="text-yellow">ABOARD.</span>
          </h1>
          <p className="text-white-50 fw-bold tracking-widest small mt-2">ACCESS GRANTED TO SHIPDAY NETWORK</p>
        </div>

        {/* Decorative Grid */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fabb05 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* 2. FORM SIDE (40%) */}
      <div className="login-form-section d-flex align-items-center justify-content-center p-4 p-md-5 w-40 text-center">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="mb-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mb-4" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
            </div>
            <span className="text-yellow fw-black x-small tracking-widest mb-2 d-block">SUCCESS PROTOCOL</span>
            <h2 className="fw-black text-dark display-6 mb-3" style={{ letterSpacing: '-1.5px' }}>Congratulations!</h2>
            <p className="text-muted small fw-medium">Your security credentials have been verified and your node is now fully synchronized with our network.</p>
          </div>

          <div className="precision-form">
            <button
              onClick={() => navigate("/login")}
              className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden mb-4"
            >
              <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                ENTER TERMINAL
              </span>
              <div className="precision-btn-scanner"></div>
            </button>

            <p className="x-small fw-black text-muted mb-0 tracking-wider">
              REDIRECTING TO LOGIN IN ... <span className="text-dark">SECURE CONNECTION</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .login-precision-page { font-family: 'Inter', sans-serif; }
        .w-60 { width: 60%; }
        .w-40 { width: 40%; }
        .x-small { font-size: 0.72rem !important; }
        .fw-black { font-weight: 900 !important; }
        .tracking-widest { letter-spacing: 0.25em; }
        .tracking-wider { letter-spacing: 0.12em; }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45) !important; }

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
        @keyframes pulse-green { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }

        @media (max-width: 991px) {
          .w-40 { width: 100%; }
          .w-60 { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default CongratulationsPage;
