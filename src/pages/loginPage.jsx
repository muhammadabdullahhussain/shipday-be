import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import "../styles/ui/auth.css";

import logo from "../assets/shipday_logo.jpg";
import googleIcon from "../assets/google-color-icon.svg";
import rightSideImage from "../assets/bg.png";
import usernameIcon from "../assets/usericon.png";
import passwordIcon from "../assets/lockicon.png";
import eyeShowIcon from "../assets/eyeopen.png";
import eyeHideIcon from "../assets/eyeopen.png"; // Or a different icon for hide

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosInstance from "../utils/axiosInterceptor";
import { auth, provider, signInWithPopup } from "../utils/firebase";

//  Import CryptoJS for secure password storage
import CryptoJS from "crypto-js";

// Secret key for encryption
const SECRET_KEY = "my_secret_key_123!";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    // Load saved credentials on mount
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        const encryptedPassword = localStorage.getItem("rememberedPassword");

        if (savedEmail) setEmail(savedEmail);
        if (encryptedPassword) {
            const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
            const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            setPassword(decryptedPassword);
        }

        if (savedEmail && encryptedPassword) setRememberMe(true);
    }, []);

    // Save or remove credentials based on rememberMe
    const saveCredentials = () => {
        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            const encryptedPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
            localStorage.setItem("rememberedPassword", encryptedPassword);
        } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
        }
    };

    // Handle Email/Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axiosInstance.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", email);
            saveCredentials();
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Handle Google Login
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const { data } = await axiosInstance.post("/auth/google-login", {
                email: user.email,
                fullName: user.displayName,
                image: user.photoURL,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("email", user.email);
            saveCredentials();
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Google login failed");
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
                        <div className="bg-success rounded-circle pulse-green" style={{ width: '10px', height: '10px' }}></div>
                        <span className="fw-black text-dark tracking-widest x-small">NODE CONNECTION: ACTIVE</span>
                    </div>
                    <p className="text-dark opacity-50 small mb-0 fw-bold tracking-tight">GLOBAL LOGISTICS INTELLIGENCE SYNC</p>
                </div>

                <div className="position-absolute bottom-0 start-0 m-5 z-2">
                    <h1 className="display-4 fw-black text-white mb-0" style={{ letterSpacing: '-2px' }}>
                        PRECISION <span className="text-yellow">DELIVERED.</span>
                    </h1>
                    <p className="text-white-50 fw-bold tracking-widest small mt-2">SHIPDAY OPERATIONAL TERMINAL v2.0</p>
                </div>

                {/* Decorative Grid */}
                <div className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, #fabb05 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            </div>

            {/* 2. FORM SIDE (40%) */}
            <div className="login-form-section d-flex align-items-center justify-content-center p-4 p-md-5 w-40">
                <div className="w-100" style={{ maxWidth: '420px' }}>
                    <div className="mb-5">
                        <span className="text-yellow fw-black x-small tracking-widest mb-2 d-block">SECURE SYSTEM ACCESS</span>
                        <h2 className="fw-black text-dark display-6 mb-3" style={{ letterSpacing: '-1.5px' }}>Authentication Node</h2>
                        <p className="text-muted small fw-medium">Enter credentials to synchronize with the ShipDay network.</p>
                    </div>

                    <form onSubmit={handleLogin} className="precision-form">
                        {/* EMAIL */}
                        <div className="mb-4">
                            <label className="precision-label">SECURE IDENTITY (EMAIL)</label>
                            <div className="precision-input-wrapper">
                                <i className="bi bi-shield-lock precision-icon"></i>
                                <input
                                    type="email"
                                    placeholder="ENTER SYSTEM IDENTIFIER"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="precision-input"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-4">
                            <label className="precision-label">ACCESS PIN (PASSWORD)</label>
                            <div className="precision-input-wrapper">
                                <i className="bi bi-key precision-icon"></i>
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

                        <div className="d-flex align-items-center justify-content-between mb-5">
                            <div className="d-flex align-items-center gap-2">
                                <div className={`precision-toggle ${rememberMe ? 'active' : ''}`} onClick={() => setRememberMe(!rememberMe)}>
                                    <div className="precision-toggle-knob"></div>
                                </div>
                                <span className="x-small fw-black text-dark tracking-wider pointer" onClick={() => setRememberMe(!rememberMe)}>REMEMBER NODE</span>
                            </div>
                            <Link to="/forgetpass" className="text-yellow fw-black x-small text-decoration-none tracking-widest hover-underline">
                                RECOVER ACCESS
                            </Link>
                        </div>

                        <button type="submit" disabled={loading} className="precision-btn w-100 py-3 rounded-2 shadow-lg position-relative overflow-hidden mb-4">
                            <span className="position-relative z-1 fw-black tracking-widest text-uppercase">
                                {loading ? "SYNCHRONIZING..." : "INITIATE SESSION"}
                            </span>
                            <div className="precision-btn-scanner"></div>
                        </button>

                        <div className="text-center mb-4">
                            <span className="x-small fw-black text-muted tracking-widest d-block mb-4">OR USE EXTERNAL AUTHENTICATOR</span>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="google-precision-btn w-100 d-flex align-items-center justify-content-center gap-3 py-3"
                            >
                                <img src={googleIcon} alt="Google" style={{ width: '18px' }} />
                                <span className="fw-black x-small tracking-widest text-dark">CONTINUE WITH GOOGLE</span>
                            </button>
                        </div>

                        <div className="text-center pt-3 border-top border-light mt-5">
                            <p className="x-small fw-black text-muted mb-0 tracking-wider">
                                NEW SYSTEM USER? <Link to="/register" className="text-yellow text-decoration-none ms-2">PROVISION ACCOUNT</Link>
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

                /* Toggle Switch */
                .precision-toggle {
                    width: 38px;
                    height: 20px;
                    background: #e2e8f0;
                    border-radius: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .precision-toggle.active {
                    background: #fabb05;
                }

                .precision-toggle-knob {
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    width: 16px;
                    height: 16px;
                    background: #fff;
                    border-radius: 50%;
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                .precision-toggle.active .precision-toggle-knob {
                    left: 20px;
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

                @keyframes pulse-green {
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

export default LoginPage;
