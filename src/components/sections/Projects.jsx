// components/sections/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { projects } from '../../data/projects';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const techTagVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="project-card">
        <div className="project-image">
          <motion.img 
            src={project.image} 
            alt={project.title}
            variants={imageVariants}
            animate={isHovered ? "hover" : "initial"}
          />
          <motion.div 
            className="project-overlay"
            variants={overlayVariants}
            animate={isHovered ? "visible" : "hidden"}
          >
            <motion.button 
              className="view-demo-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              View Demo
            </motion.button>
          </motion.div>
        </div>
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <motion.div 
            className="project-tech"
            layout
          >
            <AnimatePresence>
              {project.tech.map((tech, techIndex) => (
                <motion.span 
                  key={techIndex} 
                  className="tech-tag"
                  variants={techTagVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ delay: techIndex * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.div 
            className="project-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>GitHub</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Live Demo</span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ↗
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const filters = [];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="Beberapa karya saya baru-baru ini"
        />
        
        <motion.div 
          className="projects-filters"
          variants={filterVariants}
          initial="hidden"
          animate="visible"
        >
          {filters.map((filterItem) => (
            <motion.button
              key={filterItem}
              className={`filter-btn ${filter === filterItem ? 'active' : ''}`}
              onClick={() => setFilter(filterItem)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {filterItem.charAt(0).toUpperCase() + filterItem.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          layout
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;