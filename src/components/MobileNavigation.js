'use client';
import { useState } from 'react';
import '../app/globals.css'
import React from 'react'
import Image from "next/image";


export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="mobile-nav">
        {/* Logo Section */}
        <div className="mobile-logo">
          <div className="logo-icon">
            <img src='/images/_Logo.png' alt='Levroun Enterprises Logo'/>
          </div>
          <div className="logo-text">
            <h1>Levroun</h1>
            <span>Enterprises</span>
          </div>
        </div>

        {/* Hamburger Button */}
        <button 
          className="hamburger-btn"
          onClick={toggleNav}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        {/* Menu Content */}
        <div className="mobile-menu">
          <div className="menu-header">
            <div className="menu-logo">
              <div className="logo-icon">
            <img src='/images/_Logo.png' alt='Levroun Enterprises Logo'/>
              </div>
              <div className="logo-text">
                <h2>Levroun</h2>
                <span>Enterprises</span>
              </div>
            </div>
            <button 
              className="close-btn"
              onClick={closeNav}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="nav-links">
            {/* <li>
              <a href="/" onClick={closeNav}>
                <span className="link-icon">🏠</span>
                Home
              </a>
            </li> */}
            <li>
              <a href="#about_section" onClick={closeNav}>
                <span className="link-icon">👥</span>
                About
              </a>
            </li>
            <li>
              <a href="#services_section" onClick={closeNav}>
                <span className="link-icon">⚙️</span>
                Services
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeNav}>
                <span className="link-icon">📞</span>
                Contact
              </a>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="menu-cta">
            
            <a href="https://topmate.io/levroun/?utm_source=topmate&utm_medium=popup&utm_campaign=Page_Ready" target="_blank" rel="noopener noreferrer">
          <button  className="cta-button" onClick={closeNav}>
            Book a Call
          </button>
        </a>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://www.facebook.com/LevrounEnterprises" className="social-icon facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/LevrounEnterprises" className="social-icon twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/levroun-enterprises" className="social-icon linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/levroun.one" className="social-icon instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Backdrop */}
        <div className="backdrop" onClick={closeNav}></div>
      </div>
    </>
  );
}