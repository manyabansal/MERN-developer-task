import React from "react";
import "./css/navbar.css";
import navLogo from "./images/navlogo.png";

function Navbar() {
  return (
    <div className="nav">
      <img className="navLogo" src={navLogo} alt="Navbar Logo" />
    </div>
  );
}

export default Navbar;
