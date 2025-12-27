import React from "react";
import logo from "../assets/shipday_logo.jpg";
import "../styles/ui/logo.css";



const Logo = () => {
  return (
    <div className="logo-wrapper">
      <div className="logo-container">
        <img src={logo} alt="ShipDay" className="logo" />
        <h2 className="brand-name">ShipDay</h2>
      </div>
    </div>
  );
};

export default Logo;
