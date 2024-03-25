import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import "./Navba.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="hamburger" onClick={toggleHamburger}>
          {/* Hamburger Icon */}
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/getrecommendation" className="navbar-item">Get Recommendation</Link>
        <Link to="/logout" className="navbar-item">Logout</Link>
      </div>
      <hr/>
    </nav>
  );
};

export default Navbar;
