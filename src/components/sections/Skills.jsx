import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { skills as fallbackSkills } from '../../data/skills';
import './Skills.css';

const SkillBar = ({ name, level }) => {
  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="skill-item"
      variants={itemVariants}
      whileHover={{ x: 10 }}
    >
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <motion.span 
          className="skill-level"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="skill-bar">
        <motion.div 
          className="skill-progress" 
          variants={progressVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ background: `linear-gradient(90deg, var(--primary), var(--secondary))` }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { portfolio } = usePortfolio();
  const currentSkills = portfolio?.skills || fallbackSkills;
  const programming = currentSkills.programming || [];
  const frameworks = currentSkills.frameworks || [];
  const tools = currentSkills.tools || [];

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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="skills" className="skills">
      <div className="container">
        <SectionTitle 
          title="Technical Skills" 
          subtitle="Teknologi dan keahlian yang saya kuasai"
        />
        
        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="skill-category"
            variants={categoryVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <h3 className="category-title">Programming</h3>
            <div className="skills-list">
              {programming.map((skill, index) => (
                <SkillBar key={skill.id || index} {...skill} />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="skill-category"
            variants={categoryVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <h3 className="category-title">Frameworks & Libraries</h3>
            <div className="skills-list">
              {frameworks.map((skill, index) => (
                <SkillBar key={skill.id || index} {...skill} />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="skill-category"
            variants={categoryVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <h3 className="category-title">Tools & Platforms</h3>
            <div className="skills-list">
              {tools.map((skill, index) => (
                <SkillBar key={skill.id || index} {...skill} />
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <div className="skills-icons">
          <motion.div 
            className="icon-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;