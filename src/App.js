// App.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioProvider } from './contexts/PortfolioContext';
import AnimatedBackground from './components/ui/AnimatedBackground';
import Navbar from './components/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Skills from './components/sections/Skills.jsx';
import Projects from './components/sections/Projects.jsx';
import Experience from './components/sections/Experience.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/sections/Footer.jsx';
import AdminModal from './components/admin/AdminModal.jsx';
import './App.css';

function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <PortfolioProvider>
      <AnimatePresence>
        <div className="app">
          <Navbar />
          <AnimatedBackground />
          <AdminModal />
          <motion.main
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={sectionVariants}>
              <Hero />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <About />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <Skills />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <Projects />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <Experience />
            </motion.div>
            <motion.div variants={sectionVariants}>
              <Contact />
            </motion.div>
          </motion.main>
          <Footer />
        </div>
      </AnimatePresence>
    </PortfolioProvider>
  );
}

export default App;