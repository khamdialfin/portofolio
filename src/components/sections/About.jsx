// components/sections/About.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import './About.css';

// Import foto dari assets folder
// Pastikan nama file sesuai dengan yang Anda simpan
import fotoKhamdi from '../../assets/images/passfoto.jpg';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

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

  const highlights = [
    { number: "50+", text: "Projects Completed" },
    { number: "2+", text: "Years Experience" },
    { number: "100%", text: "Passion for Coding" }
  ];

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
              Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang memiliki ketertarikan besar dalam dunia pengembangan web.
              Ketertarikan saya dimulai dari rasa ingin tahu tentang bagaimana sebuah website bekerja, hingga akhirnya berkembang menjadi
              perjalanan belajar yang serius dalam membangun solusi digital melalui pemrograman. Saya terus mengasah kemampuan dengan mempelajari
              berbagai teknologi web modern dan menerapkannya dalam berbagai proyek pengembangan.
            </motion.p>
            <motion.p className="about-paragraph" variants={textVariants}>
              Saat ini saya berfokus pada pengembangan website menggunakan teknologi modern seperti HTML, CSS, JavaScript, dan php serta framework pendukung seperti Bootstrap, codeigniter, hingga Laravel.
              Saya menikmati proses memecahkan masalah nyata melalui kode dan selalu berusaha menulis kode yang bersih, terstruktur, serta mudah dikembangkan. Melalui portofolio ini, 
              saya ingin menunjukkan kemampuan teknis, proyek yang telah saya kerjakan, serta semangat saya untuk terus berkembang sebagai web developer.
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
                src={fotoKhamdi} 
                alt="Khamdi Alfin - Web Developer"
                className="profile-photo"
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