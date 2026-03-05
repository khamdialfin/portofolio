// components/sections/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Import icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo/Name Section */}
          <motion.div className="footer-logo" variants={itemVariants}>
            <h2>Khalfin</h2>
            <p>Web Developer</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-links" variants={itemVariants}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-contact" variants={itemVariants}>
            <h3>Contact</h3>
            <ul>
              <li>
                <FaEnvelope className="footer-icon" />
                <span>khalfinpml@gmail.com</span>
              </li>
              <li>
                <span>📍 Indonesia</span>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div className="footer-social" variants={itemVariants}>
            <h3>Follow Me</h3>
            <div className="social-icons">
              <motion.a 
                href="https://github.com/khamdialfin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <FaGithub />
              </motion.a>
              
              <motion.a 
                href="https://www.linkedin.com/in/khamdi-alfin-mualif-Al0812" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
              
              <motion.a 
                href="https://www.instagram.com/khalfindev?igsh=MWJqcGV4cXoycGNhdA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Instagram"
              >
                <FaInstagram />
              </motion.a>
              
              <motion.a 
                href="mailto:khalfinpml@gmail.com" 
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email"
              >
                <FaEnvelope />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="footer-bottom"
          variants={itemVariants}
        >
          <p className="copyright">
            © {currentYear} Khalfin. All rights reserved.
          </p>
          <motion.p 
            className="made-with"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Salam Vibe Coding
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;