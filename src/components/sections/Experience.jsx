// components/sections/Experience.jsx
import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import { usePortfolio } from '../../contexts/PortfolioContext';
import './Experience.css';

const fallbackExperiences = [
  {
    id: 1,
    title: "Siswa SMK Jurusan RPL",
    company: "SMK N 1 SLAWI",
    period: "2023 - Present",
    description: "Belajar tentang dasar pemrograman, database, dan pemrograman berbasis web hingga dapat menguasai framework Laravel."
  },
  {
    id: 2,
    title: "Mengikuti Lomba LKS Web Technology",
    company: "Kab. Tegal",
    period: "2026",
    description: "Pengalaman dan tantangan baru dipercaya oleh sekolah mengikuti lomba LKS Web Technology."
  },
  {
    id: 3,
    title: "Praktik Kerja Lapangan",
    company: "Yuhlez Software House",
    period: "2025 - Present",
    description: "Berkolaborasi dan berkontribusi membuat website untuk real project client di YUHLEZ SOFTWARE HOUSE sebagai Backend Developer."
  }
];

const fallbackCertifications = [
  { id: 'cert-1', title: "SERTIFIKAT KOMPETENSI LSP P3 JUNIOR WEB DEVELOPER", status: "Completed" }
];

const Experience = () => {
  const { portfolio } = usePortfolio();
  const experiences = portfolio?.experience && portfolio.experience.length > 0 
    ? portfolio.experience 
    : fallbackExperiences;

  const rawCerts = portfolio?.certifications && portfolio.certifications.length > 0 
    ? portfolio.certifications 
    : fallbackCertifications;

  const certifications = rawCerts.map((cert, idx) => {
    if (typeof cert === 'string') {
      return { id: idx, title: cert, status: 'Completed' };
    }
    return cert;
  });

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionTitle 
          title="Experience & Certifications" 
          subtitle="Perjalanan belajar dan pencapaian saya"
        />
        
        <div className="experience-content">
          <div className="timeline">
            <h3 className="section-subtitle">Timeline Pengalaman</h3>
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
            <h3 className="section-subtitle">Sertifikasi & Prestasi</h3>
            <div className="certs-grid">
              {certifications.map((cert, index) => (
                <div key={cert.id || index} className="cert-card">
                  <div className="cert-icon">🏆</div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <span className="cert-status">{cert.status || 'Completed'}</span>
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