// Create: src/components/Footer.js
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Main Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section company-info">
            <div className="footer-logo">
              <div className="footer-logo-icon">
            <img src='/images/_Logo.png' alt='Levroun Enterprises Logo'/>
              </div>
              <div className="footer-logo-text">
                <h3>Levroun</h3>
                <span>Enterprises</span>
              </div>
            </div>
            <p className="company-description">
              We build secure, scalable digital platforms that empower startups 
              and businesses with clean code and rock-solid infrastructure.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/LevrounEnterprises" className="social-link facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/LevrounEnterprises" className="social-link twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/company/levroun-enterprises" className="social-link linkedin">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/levroun.one" className="social-link instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about_section">About Us</a></li>
              <li><a href="#services_section">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#services_section">Web Development</a></li>
              <li><a href="#services_section">App Development</a></li>
              <li><a href="#services_section">Graphic Designing</a></li>
              <li><a href="#services_section">E-Commerce Solutions</a></li>
              <li><a href="#services_section">Custom Applications</a></li>
              <li><a href="#service">SEO/Digital Marketing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Get in Touch</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <p>contact@levroun.tech</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <p>+91 8939806110</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <p>India</p>
                  <p>Serving clients worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>

     
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 Levroun Enterprises. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              {/* <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/sitemap">Sitemap</a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}