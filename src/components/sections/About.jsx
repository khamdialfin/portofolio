// components/sections/About.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { formatImageUrl, getApiBaseUrl } from '../../services/portfolioService';
import fotoKhamdi from '../../assets/images/passfoto.jpg';
import './About.css';

const About = () => {
  const { portfolio } = usePortfolio();
  const about = portfolio?.about || {};
  const resumeUrl = `${getApiBaseUrl()}/api/resume/download`;

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    }
  };

  const highlights = about.highlights && about.highlights.length > 0 ? about.highlights : [
    { number: "50+", text: "Projects Completed" },
    { number: "2+", text: "Years Experience" },
    { number: "100%", text: "Passion for Coding" }
  ];

  const profileImgSrc = about.profileImage ? formatImageUrl(about.profileImage) : fotoKhamdi;

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <SectionTitle title="About Me" subtitle="Perjalanan Saya Di Web Development" />
        
        <div className="about-content">
          <motion.div 
            className="about-text"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p className="about-paragraph" variants={textVariants}>
              {about.paragraph1 || "Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang memiliki ketertarikan besar dalam dunia pengembangan web."}
            </motion.p>
            <motion.p className="about-paragraph" variants={textVariants}>
              {about.paragraph2 || "Saat ini saya berfokus pada pengembangan website menggunakan teknologi modern seperti HTML, CSS, JavaScript, dan PHP serta framework pendukung seperti Bootstrap, CodeIgniter, hingga Laravel."}
            </motion.p>
            
            <motion.div 
              className="about-highlights"
              variants={textVariants}
            >
              {highlights.map((highlight, index) => (
                <motion.div 
                  key={index} 
                  className="highlight"
                  variants={highlightVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="highlight-number">{highlight.number}</span>
                  <span className="highlight-text">{highlight.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div style={{ marginTop: '24px' }}>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-download-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--primary, #00d2ff)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: 'rgba(0, 210, 255, 0.08)',
                  border: '1px solid rgba(0, 210, 255, 0.3)'
                }}
              >
                <span>📥 Unduh CV Lengkap (PDF)</span>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="about-image"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{ y }}
          >
            {/* Container foto dengan efek hover dan glow */}
            <motion.div 
              className="profile-photo-container"
              whileHover={{ scale: 1.05 }}
              animate={{
                rotate: [0, 2, -2, 0],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            >
              {/* Foto profil */}
              <img 
                src={profileImgSrc} 
                alt="Khamdi Alfin - Web Developer"
                className="profile-photo"
                onError={(e) => {
                  e.currentTarget.src = fotoKhamdi;
                }}
              />
              
              {/* Overlay gradient yang muncul saat hover */}
              <motion.div 
                className="photo-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Khamdi Alfin
                </motion.span>
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Web Developer
                </motion.span>
              </motion.div>
              
              {/* Efek glow di belakang foto */}
              <motion.div 
                className="profile-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;