import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import "../styles/ui/auth.css";

import logo from "../assets/logo.png";
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

// ✅ Import CryptoJS for secure password storage
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

  // ✅ Load saved credentials on mount
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

  // ✅ Save or remove credentials based on rememberMe
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

  // ✅ Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      saveCredentials(); // Save credentials if rememberMe is checked

      navigate("/dashboard");
    } catch (err) {
      console.error('Login Error:', err);
      console.error('Response:', err.response);
      console.error('Status:', err.response?.status);
      console.error('Data:', err.response?.data);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const { data } = await axiosInstance.post("/api/auth/google-login", {
        email: user.email,
        fullName: user.displayName,
        image: user.photoURL,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", user.email);

      saveCredentials(); // Save credentials if rememberMe is checked

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container container">
      <div className="auth-form-container">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h2 className="auth-title">Welcome Back! 👋🏻</h2>
        <p className="auth-subtitle">
          We're glad to see you again. Log in to access your account and explore our latest features.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <img src={usernameIcon} alt="Email" className="auth-icon" />
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="auth-input-group">
            <img src={passwordIcon} alt="Password" className="auth-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <img
              src={showPassword ? eyeHideIcon : eyeShowIcon}
              alt={showPassword ? "Hide Password" : "Show Password"}
              className="auth-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="auth-remember-forgot">
            <label className="auth-toggle-switch">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="auth-toggle-slider"></span>
              <span className="auth-toggle-label">Remember me</span>
            </label>
            <Link to="/forgetpass" className="auth-forgot-link">
              Forgot Password?
            </Link>
          </div>

          <Button disabled={loading} className="auth-button" type="submit">
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <div className="auth-divider">Or continue with</div>

          <button
            className="auth-google-button"
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="auth-google-icon-wrapper">
              <img src={googleIcon} alt="Google" className="auth-google-icon" />
            </span>
            Continue With Google
          </button>

          <div className="auth-signup-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>

      <img src={rightSideImage} alt="Transportation" className="auth-right-image" />

      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default LoginPage;
