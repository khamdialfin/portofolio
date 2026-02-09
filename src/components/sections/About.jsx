// components/sections/About.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import './About.css';

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
        <SectionTitle title="About Me" subtitle="My journey in software development" />
        
        <div className="about-content">
          <motion.div 
            className="about-text"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p className="about-paragraph" variants={textVariants}>
              I'm a Software Engineering (RPL) student passionate about creating 
              impactful digital solutions. My journey began with curiosity about 
              how websites work, and it has evolved into a dedicated pursuit of 
              software development excellence.
            </motion.p>
            <motion.p className="about-paragraph" variants={textVariants}>
              Currently focusing on modern web technologies, I enjoy solving 
              real-world problems through code. I believe in writing clean, 
              maintainable software that not only works but also provides 
              excellent user experiences.
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
            <motion.div 
              className="profile-placeholder"
              animate={{
                rotate: [0, 5, -5, 0],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="profile-content"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <span className="profile-initial">K</span>
                <motion.div 
                  className="profile-glow"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                ></motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;