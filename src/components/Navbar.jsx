// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../contexts/PortfolioContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const { setIsAdminOpen } = usePortfolio();

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="nav-content container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('hero')}
          style={{ cursor: 'pointer' }}
        >
          Khalfindev
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className="nav-link"
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
          
          <motion.button
            className="nav-link admin-nav-btn"
            onClick={() => setIsAdminOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            title="Buka Admin Panel untuk upload project & edit data"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.15), rgba(58, 123, 213, 0.25))',
              border: '1px solid rgba(0, 210, 255, 0.4)',
              borderRadius: '20px',
              padding: '6px 14px',
              color: '#00d2ff',
              fontWeight: '600',
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            <span>⚙️ Admin Panel</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <motion.div
            animate={mobileMenuOpen ? "open" : "closed"}
            variants={{
              closed: { rotate: 0 },
              open: { rotate: 180 }
            }}
            transition={{ duration: 0.3 }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </motion.div>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className="mobile-nav-link"
                  onClick={() => scrollToSection(item.id)}
                  variants={mobileItemVariants}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                className="mobile-nav-link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                variants={mobileItemVariants}
                style={{
                  color: '#00d2ff',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '10px'
                }}
              >
                <span>⚙️ Admin Panel (Edit & Upload)</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;