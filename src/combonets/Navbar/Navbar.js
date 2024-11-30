import React, { useState } from 'react';
import './navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="#home">Analyzer</a>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Checklist">Checklist</Link></li>
          <li><a href="#analysis-section">Analysis</a></li>
          <li><a href="#Overall-Status">Overall</a></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
