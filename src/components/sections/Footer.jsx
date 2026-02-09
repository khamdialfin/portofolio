// components/sections/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-logo">Khalfin.</h3>
            <p className="footer-tagline">
              Building the future, one line of code at a time
            </p>
          </div>
          
          <div className="footer-links">
            <div className="links-column">
              <h4>Quick Links</h4>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            
            <div className="links-column">
              <h4>Connect</h4>
              <a href="https://github.com/khalfin" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="mailto:khalfin@student.example.com">Email</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Khalfin. All rights reserved.
          </p>
          <div className="social-icons">
            <a href="https://github.com" className="social-icon" aria-label="GitHub">🐙</a>
            <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn">💼</a>
            <a href="https://twitter.com" className="social-icon" aria-label="Twitter">🐦</a>
            <a href="mailto:email@example.com" className="social-icon" aria-label="Email">📧</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;