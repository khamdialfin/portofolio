// components/sections/Experience.jsx
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Software Engineering Student",
      company: "University / School Name",
      period: "2022 - Present",
      description: "Learning software development principles, algorithms, and modern web technologies."
    },
    {
      id: 2,
      title: "Frontend Developer Intern",
      company: "Tech Company",
      period: "2023 (3 months)",
      description: "Developed responsive web interfaces and collaborated with design teams."
    },
    {
      id: 3,
      title: "Freelance Web Developer",
      company: "Self-employed",
      period: "2021 - Present",
      description: "Built websites for small businesses and personal projects using modern stacks."
    }
  ];

  const certifications = [
    "React Fundamentals Certification",
    "Web Development Bootcamp",
    "JavaScript Algorithms Certification",
    "Responsive Web Design"
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionTitle 
          title="Experience & Certifications" 
          subtitle="My learning journey and achievements"
        />
        
        <div className="experience-content">
          <div className="timeline">
            <h3 className="section-subtitle">Timeline</h3>
            {experiences.map(exp => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{exp.title}</h4>
                  <div className="timeline-meta">
                    <span className="timeline-company">{exp.company}</span>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="certifications">
            <h3 className="section-subtitle">Certifications</h3>
            <div className="certs-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-card">
                  <div className="cert-icon">🏆</div>
                  <h4 className="cert-title">{cert}</h4>
                  <span className="cert-status">Completed</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;