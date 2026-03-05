// components/sections/Experience.jsx
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Siswa SMK Jurusan RPL",
      company: "SMK N 1 SLAWI",
      period: "2023 - Present",
      description: "Belajar tentang dasar pemrograman, database, dan pemrograman berbasis web hingga dapat mengusai framework laravel"
    },
    {
      id: 2,
      title: "Mengikuti Lomba LKS Web Technology",
      company: "Kab. Tegal",
      period: "2026",
      description: "Pengalaman dan tantangan baru di percaya oleh sekolah mengikuti lomba lks web technology"
    },
    {
      id: 3,
      title: "Praktik Kerja Lapangan",
      company: "Yuhlez Software House",
      period: "2025 - Present",
      description: "Berkolaborasi dan kontribusi membuat website untuk real project untuk client di YUHLEZ SOFTWARE HOUSE sebagai Back end Developer"
    }
  ];

  const certifications = [
    "SERTIFIKAT KOMPETENSI LSP P3 JUNIOR WEB DEVELOPER",
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionTitle 
          title="Experience & Certifications" 
          subtitle="Perjalanan belajar dan pencapain saya"
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