import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import "../styles/ui/auth.css";

import logo from "../assets/shipday_logo.jpg";
import rightSideImage from "../assets/bg4.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInterceptor";


const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email, password, source = "register" } = location.state || {};

  useEffect(() => {
    if (!email || (source === "register" && !password)) {
      toast.error(
        source === "register"
          ? "Missing registration info. Please register again."
          : "Missing email info. Please enter your email again.",
        {
          onClose: () => {
            navigate(source === "register" ? "/register" : "/forgetpass");
          },
          autoClose: 3000,
        }
      );
    }
  }, [email, password, source, navigate]);

  const [code, setCode] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleBoxChange = (e, index) => {
    const val = e.target.value.toUpperCase();
    if (/^[A-Z0-9]?$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      if (val && index < 4) {
        const nextInput = document.getElementById(`code-box-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];

      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        const prevInput = document.getElementById(`code-box-${index - 1}`);
        if (prevInput) prevInput.focus();
        newCode[index - 1] = "";
        setCode(newCode);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const fullCode = code.join("");
    if (fullCode.length !== 5) {
      toast.error("Please enter the full 5-character verification code.");
      return;
    }

    setLoading(true);
    try {
      if (source === "register") {
        const { data } = await axiosInstance.post("/auth/register", {
          email,
          password,
          code: fullCode,
        });

        if (data.message === "User already exists") {
          toast.info("User already exists. Redirecting to login.", {
            onClose: () => navigate("/login"),
            autoClose: 3000,
          });
        } else {
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", email);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
            }
            toast.success("Registration successful! Securing system access...", {
              onClose: () => navigate("/dashboard"),
              autoClose: 2000,
            });
          } else {
            toast.success("Registration successful! Please log in.", {
              onClose: () => navigate("/login"),
              autoClose: 3000,
            });
          }
        }
      } else if (source === "forgot") {
        const { data } = await axiosInstance.post("/verification/verify-code", {
          email,
          code: fullCode,
        });

        toast.success("Code verified! Please set your new password.", {
          onClose: () => navigate("/newpass", { state: { email } }),
          autoClose: 3000,
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Verification failed.";
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
            <div className="bg-warning rounded-circle pulse-yellow" style={{ width: '10px', height: '10px' }}></div>
            <span className="fw-black text-dark tracking-widest x-small">STATUS: PENDING VERIFICATION</span>
          </div>
          <p className="text-dark opacity-50 small mb-0 fw-bold tracking-tight">SECURITY CHALLENGE PROTOCOL v1.2</p>
        </div>

        <div className="position-absolute bottom-0 start-0 m-5 z-2">
          <h1 className="display-4 fw-black text-white mb-0" style={{ letterSpacing: '-2px' }}>
            VERIFY <span className="text-yellow">IDENTITY.</span>
          </h1>
          <p className="text-white-50 fw-bold tracking-widest small mt-2">SECURE END-TO-END AUTHENTICATION</p>
        </div>

        {/* Decorative Grid */}
        <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fabb05 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      {/* 2. FORM SIDE (40%) */}
      <div className="login-form-section d-flex align-items-center justify-content-center p-4 p-md-5 w-40">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="mb-5">
            <span className="text-yellow fw-black x-small tracking-widest mb-2 d-block">CHALLENGE-RESPONSE</span>
            <h2 className="fw-black text-dark display-6 mb-3" style={{ letterSpacing: '-1.5px' }}>Enter Code</h2>
            <p className="text-muted small fw-medium">
              We have dispatched a unique security token to
              <span className="text-dark fw-bold d-block mt-1">{email || 'your email'}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="precision-form">
            <div className="mb-5">
              <label className="precision-label">5-CHARACTER SYSTEM CODE</label>
              <div className="d-flex justify-content-between gap-2">
                {code.map((char, idx) => (
                  <div key={idx} className="precision-input-wrapper text-center px-0 overflow-hidden" style={{ width: '18%' }}>
                    <input
                      id={`code-box-${idx}`}
                      type="text"
                      maxLength={1}
                      value={char}
                      onChange={(e) => handleBoxChange(e, idx)}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      className="precision-input text-center p-0"
                      style={{ fontSize: '1.5rem', height: '60px' }}
                      autoFocus={idx === 0}
                      disabled={loading}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden mb-5">
              <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                {loading ? "VERIFYING..." : "VALIDATE ACCESS"}
              </span>
              <div className="precision-btn-scanner"></div>
            </button>

            <div className="text-center pt-5 border-top border-light">
              <p className="x-small fw-black text-muted mb-2 tracking-wider">DID NOT RECEIVE CODE?</p>
              <button
                type="button"
                className="btn btn-link text-yellow text-decoration-none x-small fw-black tracking-widest p-0"
                onClick={() => toast.info("New code generation initiated...")}
              >
                REQUEST NEW TOKEN
              </button>
            </div>

            <div className="text-center mt-4">
              <Link to="/login" className="x-small fw-black text-muted text-decoration-none tracking-widest hover-underline">
                RETURN TO TERMINAL
              </Link>
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
          margin-bottom: 1rem;
          display: block;
          text-transform: uppercase;
        }

        .precision-input-wrapper {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0;
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

        .precision-input {
          border: none !important;
          background: transparent !important;
          padding: 0 !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          width: 100%;
        }

        .precision-input:focus {
          outline: none !important;
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

        @keyframes pulse-yellow {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        .hover-underline:hover {
          text-decoration: underline !important;
        }

        @media (max-width: 991px) {
          .w-40 { width: 100%; }
          .w-60 { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default VerificationPage;
