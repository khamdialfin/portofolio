import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Hero.css';

const Hero = () => {
  const { portfolio } = usePortfolio();
  const hero = portfolio?.hero || {
    name: "Khamdi Alfin Mualif",
    subtitle: "Full Stack Web Developer",
    tagline: "Membangun solusi digital dengan kode yang bersih dan teknologi modern.",
    badges: ["Laravel", "PHP", "CSS3", "HTML5"]
  };

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.7
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 1.2
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="hero" className="hero">
      {/* Animated Background Elements */}
      <motion.div
        className="floating-shapes"
        animate={{
          rotate: 360,
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </motion.div>

      <motion.div
        className="hero-content"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="hero-title" variants={titleVariants}>
          <span className="gradient-text">{hero.name}</span>
        </motion.h1>
        
        <motion.h2 className="hero-subtitle" variants={subtitleVariants}>
          {hero.subtitle}
        </motion.h2>
        
        <motion.p className="hero-tagline" variants={taglineVariants}>
          {hero.tagline}
        </motion.p>
        
        <motion.div className="hero-buttons" variants={buttonVariants}>
          <Button 
            variant="primary" 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Project
          </Button>
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kontak Saya
          </Button>
        </motion.div>

        {/* Animated Tech Badges */}
        <motion.div 
          className="tech-badges"
          animate={floatingAnimation}
        >
          {(hero.badges || ['Laravel', 'PHP', 'CSS3', 'HTML5']).map((badge, idx) => (
            <span key={idx} className="tech-badge">{badge}</span>
          ))}
        </motion.div>
        
        <motion.div 
          className="scroll-indicator" 
          variants={scrollIndicatorVariants}
          animate={{
            y: [0, 10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <span>Scroll down</span>
          <div className="mouse">
            <motion.div 
              className="mouse-wheel"
              animate={{
                y: [0, 20, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;