// src/components/admin/AdminModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../contexts/PortfolioContext';
import {
  loginAdmin,
  updateAboutSection,
  updateHeroSection,
  addProjectApi,
  updateProjectApi,
  deleteProjectApi,
  updateSkillsApi,
  updateExperienceApi,
  uploadResumeApi,
  formatImageUrl,
  getApiBaseUrl
} from '../../services/portfolioService';
import './AdminModal.css';

const AdminModal = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    login,
    logout,
    portfolio,
    refreshPortfolio
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('projects');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [alertMsg, setAlertMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [heroForm, setHeroForm] = useState({ name: '', subtitle: '', tagline: '' });
  const [aboutForm, setAboutForm] = useState({
    paragraph1: '',
    paragraph2: '',
    h1Num: '50+',
    h1Text: 'Projects Completed',
    h2Num: '2+',
    h2Text: 'Years Experience',
    h3Num: '100%',
    h3Text: 'Passion for Coding'
  });
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');

  // Project state
  const [projectForm, setProjectForm] = useState({
    id: null,
    title: '',
    description: '',
    tech: '',
    github: '',
    demo: ''
  });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState('');
  const [isEditingProject, setIsEditingProject] = useState(false);

  // Skill state
  const [skillCategory, setSkillCategory] = useState('programming');
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(85);

  // Experience state
  const [expForm, setExpForm] = useState({
    title: '',
    company: '',
    period: '',
    description: ''
  });
  const [certTitle, setCertTitle] = useState('');

  // Resume state
  const [resumeFile, setResumeFile] = useState(null);

  // Populate data when portfolio is available
  useEffect(() => {
    if (portfolio) {
      if (portfolio.hero) {
        setHeroForm({
          name: portfolio.hero.name || '',
          subtitle: portfolio.hero.subtitle || '',
          tagline: portfolio.hero.tagline || ''
        });
      }
      if (portfolio.about) {
        const h = portfolio.about.highlights || [];
        setAboutForm({
          paragraph1: portfolio.about.paragraph1 || '',
          paragraph2: portfolio.about.paragraph2 || '',
          h1Num: h[0]?.number || '50+',
          h1Text: h[0]?.text || 'Projects Completed',
          h2Num: h[1]?.number || '2+',
          h2Text: h[1]?.text || 'Years Experience',
          h3Num: h[2]?.number || '100%',
          h3Text: h[2]?.text || 'Passion for Coding'
        });
        if (portfolio.about.profileImage) {
          setProfilePhotoPreview(formatImageUrl(portfolio.about.profileImage));
        }
      }
    }
  }, [portfolio]);

  const notify = (type, message) => {
    setAlertMsg({ type, message });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await loginAdmin(passwordInput);
      if (res.success && res.token) {
        login(res.token);
        setPasswordInput('');
        notify('success', 'Berhasil masuk ke Dashboard Admin');
      } else {
        setLoginError(res.message || 'Password salah');
      }
    } catch (err) {
      // Local fallback auth if server offline
      if (passwordInput === 'admin123') {
        login('local_admin_token');
        setPasswordInput('');
        notify('success', 'Mode Lokal: Berhasil masuk ke Dashboard');
      } else {
        setLoginError('Password salah (Default: admin123)');
      }
    }
  };

  // 1. Save Hero & About
  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Save hero
      await updateHeroSection(heroForm);

      // Save about
      const formData = new FormData();
      formData.append('paragraph1', aboutForm.paragraph1);
      formData.append('paragraph2', aboutForm.paragraph2);
      const highlights = [
        { number: aboutForm.h1Num, text: aboutForm.h1Text },
        { number: aboutForm.h2Num, text: aboutForm.h2Text },
        { number: aboutForm.h3Num, text: aboutForm.h3Text }
      ];
      formData.append('highlights', JSON.stringify(highlights));
      if (profilePhotoFile) {
        formData.append('profileImage', profilePhotoFile);
      }

      await updateAboutSection(formData);
      await refreshPortfolio();
      notify('success', 'Informasi About Me & Hero berhasil diperbarui!');
    } catch (err) {
      notify('error', 'Gagal memperbarui About Me: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // 2. Project actions
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      return notify('error', 'Judul project tidak boleh kosong');
    }
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', projectForm.title);
      formData.append('description', projectForm.description);
      formData.append('tech', projectForm.tech);
      formData.append('github', projectForm.github);
      formData.append('demo', projectForm.demo);
      if (projectImageFile) {
        formData.append('image', projectImageFile);
      }

      if (isEditingProject && projectForm.id) {
        await updateProjectApi(projectForm.id, formData);
        notify('success', 'Project berhasil diperbarui!');
      } else {
        await addProjectApi(formData);
        notify('success', 'Project baru berhasil ditambahkan!');
      }

      // Reset form
      setProjectForm({ id: null, title: '', description: '', tech: '', github: '', demo: '' });
      setProjectImageFile(null);
      setProjectImagePreview('');
      setIsEditingProject(false);
      await refreshPortfolio();
    } catch (err) {
      notify('error', 'Gagal menyimpan project: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProjectClick = (p) => {
    setIsEditingProject(true);
    setProjectForm({
      id: p.id,
      title: p.title || '',
      description: p.description || '',
      tech: Array.isArray(p.tech) ? p.tech.join(', ') : (p.tech || ''),
      github: p.github || '',
      demo: p.demo || ''
    });
    setProjectImagePreview(formatImageUrl(p.image));
    setProjectImageFile(null);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Yakin ingin menghapus project ini?')) return;
    try {
      await deleteProjectApi(id);
      await refreshPortfolio();
      notify('success', 'Project berhasil dihapus');
    } catch (err) {
      notify('error', 'Gagal menghapus project: ' + err.message);
    }
  };

  // 3. Skill actions
  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return notify('error', 'Nama skill harus diisi');
    setSaving(true);

    try {
      const currentSkills = { ...(portfolio?.skills || {}) };
      if (!currentSkills[skillCategory]) currentSkills[skillCategory] = [];
      
      currentSkills[skillCategory].push({
        id: 'skill-' + Date.now(),
        name: skillName,
        level: Number(skillLevel)
      });

      await updateSkillsApi(currentSkills);
      await refreshPortfolio();
      setSkillName('');
      setSkillLevel(85);
      notify('success', `Skill "${skillName}" berhasil ditambahkan ke ${skillCategory}`);
    } catch (err) {
      notify('error', 'Gagal menambahkan skill: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (cat, id) => {
    try {
      const currentSkills = { ...(portfolio?.skills || {}) };
      if (currentSkills[cat]) {
        currentSkills[cat] = currentSkills[cat].filter(s => s.id !== id);
        await updateSkillsApi(currentSkills);
        await refreshPortfolio();
        notify('success', 'Skill berhasil dihapus');
      }
    } catch (err) {
      notify('error', 'Gagal menghapus skill');
    }
  };

  // 4. Experience & Certifications
  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!expForm.title.trim()) return notify('error', 'Judul timeline harus diisi');
    setSaving(true);

    try {
      const currentExp = [...(portfolio?.experience || [])];
      currentExp.push({
        id: 'exp-' + Date.now(),
        title: expForm.title,
        company: expForm.company,
        period: expForm.period,
        description: expForm.description
      });

      await updateExperienceApi(currentExp, portfolio?.certifications || []);
      await refreshPortfolio();
      setExpForm({ title: '', company: '', period: '', description: '' });
      notify('success', 'Timeline pengalaman berhasil ditambahkan');
    } catch (err) {
      notify('error', 'Gagal menambahkan pengalaman: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      const currentExp = (portfolio?.experience || []).filter(e => e.id !== id);
      await updateExperienceApi(currentExp, portfolio?.certifications || []);
      await refreshPortfolio();
      notify('success', 'Pengalaman berhasil dihapus');
    } catch (err) {
      notify('error', 'Gagal menghapus pengalaman');
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!certTitle.trim()) return notify('error', 'Nama sertifikasi harus diisi');
    setSaving(true);

    try {
      const currentCerts = [...(portfolio?.certifications || [])];
      currentCerts.push({
        id: 'cert-' + Date.now(),
        title: certTitle,
        status: 'Completed'
      });

      await updateExperienceApi(portfolio?.experience || [], currentCerts);
      await refreshPortfolio();
      setCertTitle('');
      notify('success', 'Sertifikat berhasil ditambahkan');
    } catch (err) {
      notify('error', 'Gagal menambahkan sertifikat');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCert = async (certId) => {
    try {
      const currentCerts = (portfolio?.certifications || []).filter(c => 
        (typeof c === 'string' ? c !== certId : c.id !== certId && c.title !== certId)
      );
      await updateExperienceApi(portfolio?.experience || [], currentCerts);
      await refreshPortfolio();
      notify('success', 'Sertifikat berhasil dihapus');
    } catch (err) {
      notify('error', 'Gagal menghapus sertifikat');
    }
  };

  // 5. Resume upload
  const handleUploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return notify('error', 'Pilih file resume terlebih dahulu');
    setSaving(true);

    try {
      const res = await uploadResumeApi(resumeFile);
      await refreshPortfolio();
      setResumeFile(null);
      notify('success', `Resume "${res.resume?.filename || resumeFile.name}" berhasil diunggah!`);
    } catch (err) {
      notify('error', 'Gagal mengupload resume: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="admin-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsAdminOpen(false);
        }}
      >
        <motion.div
          className="admin-modal-card"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="admin-header">
            <div className="admin-header-title">
              <span>⚡ Portofolio CMS</span>
              <span className="admin-badge">Admin Panel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="btn-cancel"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Keluar
                </button>
              )}
              <button
                className="admin-close-btn"
                onClick={() => setIsAdminOpen(false)}
                title="Tutup (ESC)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Alert Notification */}
          {alertMsg && (
            <div style={{ padding: '12px 24px 0 24px' }}>
              <div className={`admin-alert ${alertMsg.type}`}>
                <span>{alertMsg.message}</span>
                <button
                  onClick={() => setAlertMsg(null)}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Modal Content */}
          {!isAuthenticated ? (
            /* Login Screen */
            <div className="admin-body">
              <div className="admin-login-box">
                <div className="admin-login-icon">🔒</div>
                <h3 style={{ marginBottom: '8px', color: '#ffffff' }}>Login Admin Panel</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Masukkan password untuk mengelola proyek, bio, skills, dan resume Anda.
                </p>

                {loginError && (
                  <div className="admin-alert error" style={{ padding: '8px', marginBottom: '16px' }}>
                    {loginError}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Password admin (default: admin123)"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>
                  <button type="submit" className="btn-save" style={{ width: '100%' }}>
                    Masuk ke Dashboard
                  </button>
                </form>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', color: '#64748b' }}>
                  Default password: <code style={{ color: '#00d2ff' }}>admin123</code>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard Suite */
            <>
              {/* Navigation Tabs */}
              <div className="admin-tabs">
                <button
                  className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  💼 Proyek ({portfolio?.projects?.length || 0})
                </button>
                <button
                  className={`admin-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  👤 About & Hero
                </button>
                <button
                  className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('skills')}
                >
                  ⚡ Keahlian (Skills)
                </button>
                <button
                  className={`admin-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                  onClick={() => setActiveTab('experience')}
                >
                  🏆 Pengalaman & Sertifikat
                </button>
                <button
                  className={`admin-tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resume')}
                >
                  📄 Resume / CV
                </button>
              </div>

              <div className="admin-body">
                {/* TAB 1: PROJECTS */}
                {activeTab === 'projects' && (
                  <div>
                    <h3 style={{ color: '#00d2ff', marginBottom: '16px' }}>
                      {isEditingProject ? '✏️ Edit Project' : '➕ Upload & Tambah Project Baru'}
                    </h3>

                    {/* Project Form */}
                    <form onSubmit={handleSaveProject} style={{ marginBottom: '32px' }}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Nama / Judul Project *</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: Aplikasi POS Restoran"
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Teknologi Digunakan (Pisahkan Koma)</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: Laravel, Bootstrap, MySQL, React"
                            value={projectForm.tech}
                            onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Deskripsi Project *</label>
                        <textarea
                          className="form-textarea"
                          rows="3"
                          placeholder="Jelaskan fitur utama, peran Anda, atau keunggulan aplikasi..."
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Link GitHub Repository (Opsional)</label>
                          <input
                            type="url"
                            className="form-input"
                            placeholder="https://github.com/username/project"
                            value={projectForm.github}
                            onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label>Link Live Demo / Website (Opsional)</label>
                          <input
                            type="url"
                            className="form-input"
                            placeholder="https://demo-project.com"
                            value={projectForm.demo}
                            onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Image Upload Box */}
                      <div className="form-group">
                        <label>Upload Gambar Screenshot Project</label>
                        <label className="file-upload-box">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setProjectImageFile(file);
                                setProjectImagePreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {projectImagePreview ? (
                            <div>
                              <img
                                src={projectImagePreview}
                                alt="Preview"
                                style={{ maxHeight: '140px', borderRadius: '8px', marginBottom: '8px' }}
                              />
                              <p style={{ color: '#00d2ff', fontSize: '0.85rem' }}>Klik untuk mengganti gambar</p>
                            </div>
                          ) : (
                            <div>
                              <span style={{ fontSize: '2rem' }}>🖼️</span>
                              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '6px' }}>
                                Klik atau geser file gambar ke sini (PNG, JPG, WebP)
                              </p>
                            </div>
                          )}
                        </label>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className="btn-save" disabled={saving}>
                          {saving ? 'Menyimpan...' : (isEditingProject ? 'Simpan Perubahan Project' : 'Upload & Publikasikan Project')}
                        </button>
                        {isEditingProject && (
                          <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => {
                              setIsEditingProject(false);
                              setProjectForm({ id: null, title: '', description: '', tech: '', github: '', demo: '' });
                              setProjectImageFile(null);
                              setProjectImagePreview('');
                            }}
                          >
                            Batal Edit
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Existing Projects List */}
                    <h4 style={{ color: '#ffffff', marginBottom: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                      Daftar Project Saat Ini ({portfolio?.projects?.length || 0})
                    </h4>
                    <div>
                      {(portfolio?.projects || []).map((p) => (
                        <div key={p.id} className="admin-item-card">
                          <img
                            src={formatImageUrl(p.image)}
                            alt={p.title}
                            className="item-thumb"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div className="item-info">
                            <div className="item-title">{p.title}</div>
                            <div className="item-sub">
                              {Array.isArray(p.tech) ? p.tech.join(' • ') : p.tech}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              className="btn-edit-small"
                              onClick={() => handleEditProjectClick(p)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn-delete-small"
                              onClick={() => handleDeleteProject(p.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: ABOUT & HERO */}
                {activeTab === 'about' && (
                  <form onSubmit={handleSaveAbout}>
                    <h3 style={{ color: '#00d2ff', marginBottom: '16px' }}>👤 Edit Profil & Deskripsi About Me</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input
                          type="text"
                          className="form-input"
                          value={heroForm.name}
                          onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Profesi / Role (Subtitle)</label>
                        <input
                          type="text"
                          className="form-input"
                          value={heroForm.subtitle}
                          onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Tagline / Motto Singkat</label>
                      <input
                        type="text"
                        className="form-input"
                        value={heroForm.tagline}
                        onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Deskripsi Paragraf 1 (Latar Belakang / Minat)</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        value={aboutForm.paragraph1}
                        onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Deskripsi Paragraf 2 (Fokus Teknologi & Tujuan)</label>
                      <textarea
                        className="form-textarea"
                        rows="3"
                        value={aboutForm.paragraph2}
                        onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
                        required
                      />
                    </div>

                    {/* Highlights Counters */}
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px' }}>
                      Highlight Statistik (3 Kolom Angka)
                    </label>
                    <div className="form-row" style={{ marginBottom: '20px' }}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="50+"
                          value={aboutForm.h1Num}
                          onChange={(e) => setAboutForm({ ...aboutForm, h1Num: e.target.value })}
                        />
                        <input
                          type="text"
                          className="form-input"
                          style={{ marginTop: '6px' }}
                          placeholder="Projects Completed"
                          value={aboutForm.h1Text}
                          onChange={(e) => setAboutForm({ ...aboutForm, h1Text: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="2+"
                          value={aboutForm.h2Num}
                          onChange={(e) => setAboutForm({ ...aboutForm, h2Num: e.target.value })}
                        />
                        <input
                          type="text"
                          className="form-input"
                          style={{ marginTop: '6px' }}
                          placeholder="Years Experience"
                          value={aboutForm.h2Text}
                          onChange={(e) => setAboutForm({ ...aboutForm, h2Text: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-input"
                          placeholder="100%"
                          value={aboutForm.h3Num}
                          onChange={(e) => setAboutForm({ ...aboutForm, h3Num: e.target.value })}
                        />
                        <input
                          type="text"
                          className="form-input"
                          style={{ marginTop: '6px' }}
                          placeholder="Passion for Coding"
                          value={aboutForm.h3Text}
                          onChange={(e) => setAboutForm({ ...aboutForm, h3Text: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="form-group">
                      <label>Upload Foto Profil Baru (Passfoto)</label>
                      <label className="file-upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setProfilePhotoFile(file);
                              setProfilePhotoPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                        {profilePhotoPreview ? (
                          <div>
                            <img
                              src={profilePhotoPreview}
                              alt="Profil"
                              style={{ width: '90px', height: '110px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                            />
                            <p style={{ color: '#00d2ff', fontSize: '0.85rem' }}>Klik untuk memilih foto lain</p>
                          </div>
                        ) : (
                          <div>
                            <span style={{ fontSize: '2rem' }}>📷</span>
                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '6px' }}>
                              Klik untuk mengunggah foto profil baru
                            </p>
                          </div>
                        )}
                      </label>
                    </div>

                    <button type="submit" className="btn-save" disabled={saving}>
                      {saving ? 'Menyimpan...' : 'Simpan Perubahan Profil & About Me'}
                    </button>
                  </form>
                )}

                {/* TAB 3: SKILLS */}
                {activeTab === 'skills' && (
                  <div>
                    <h3 style={{ color: '#00d2ff', marginBottom: '16px' }}>⚡ Kelola Keahlian (My Skills)</h3>

                    {/* Add Skill Form */}
                    <form onSubmit={handleAddSkill} style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '10px', marginBottom: '24px' }}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Kategori</label>
                          <select
                            className="form-select"
                            value={skillCategory}
                            onChange={(e) => setSkillCategory(e.target.value)}
                          >
                            <option value="programming">Programming (Bahasa Pemrograman)</option>
                            <option value="frameworks">Frameworks & Libraries</option>
                            <option value="tools">Tools & Platforms</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Nama Skill</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: Tailwind CSS, Docker, Python"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Tingkat Kemampuan: {skillLevel}%</label>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            step="5"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                            style={{ width: '100%', marginTop: '10px' }}
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn-save" disabled={saving}>
                        {saving ? 'Menambahkan...' : 'Tambah Skill Baru'}
                      </button>
                    </form>

                    {/* List by category */}
                    {['programming', 'frameworks', 'tools'].map((cat) => {
                      const list = portfolio?.skills?.[cat] || [];
                      const catTitle = cat === 'programming' ? 'Programming' : cat === 'frameworks' ? 'Frameworks & Libraries' : 'Tools & Platforms';

                      return (
                        <div key={cat} style={{ marginBottom: '20px' }}>
                          <h4 style={{ color: '#38bdf8', marginBottom: '10px' }}>{catTitle} ({list.length})</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
                            {list.map((s) => (
                              <div
                                key={s.id}
                                style={{
                                  background: 'rgba(15, 23, 42, 0.6)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  borderRadius: '8px',
                                  padding: '10px 14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}
                              >
                                <div>
                                  <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.9rem' }}>{s.name}</div>
                                  <div style={{ color: '#00d2ff', fontSize: '0.8rem' }}>{s.level}%</div>
                                </div>
                                <button
                                  type="button"
                                  className="btn-delete-small"
                                  onClick={() => handleDeleteSkill(cat, s.id)}
                                >
                                  Hapus
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TAB 4: EXPERIENCE & CERTS */}
                {activeTab === 'experience' && (
                  <div>
                    <h3 style={{ color: '#00d2ff', marginBottom: '16px' }}>🏆 Pengalaman & Sertifikasi</h3>

                    {/* Add Experience Form */}
                    <form onSubmit={handleAddExperience} style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '10px', marginBottom: '24px' }}>
                      <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>➕ Tambah Timeline Pengalaman</h4>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Judul / Posisi / Peran *</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: Magang Fullstack Developer"
                            value={expForm.title}
                            onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Nama Instansi / Perusahaan / Sekolah *</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: PT Teknologi Indonesia"
                            value={expForm.company}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Periode Waktu *</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Contoh: 2024 - Sekarang"
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Deskripsi Pengalaman</label>
                        <textarea
                          className="form-textarea"
                          rows="2"
                          placeholder="Jelaskan kontribusi atau pembelajaran selama kegiatan..."
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn-save" disabled={saving}>
                        {saving ? 'Menyimpan...' : 'Tambah Pengalaman'}
                      </button>
                    </form>

                    {/* Timeline List */}
                    <div style={{ marginBottom: '30px' }}>
                      <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>Daftar Timeline</h4>
                      {(portfolio?.experience || []).map((exp) => (
                        <div key={exp.id} className="admin-item-card">
                          <div className="item-info">
                            <div className="item-title">{exp.title}</div>
                            <div className="item-sub">
                              {exp.company} • <span style={{ color: '#00d2ff' }}>{exp.period}</span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginTop: '4px' }}>
                              {exp.description}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="btn-delete-small"
                            onClick={() => handleDeleteExperience(exp.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Certification */}
                    <form onSubmit={handleAddCert} style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '10px' }}>
                      <h4 style={{ color: '#ffffff', marginBottom: '12px' }}>🎖️ Tambah Sertifikasi</h4>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Nama Sertifikasi, misal: Sertifikat BNSP Junior Web Developer"
                          value={certTitle}
                          onChange={(e) => setCertTitle(e.target.value)}
                          required
                        />
                        <button type="submit" className="btn-save" style={{ whiteSpace: 'nowrap' }} disabled={saving}>
                          Tambah Sertifikat
                        </button>
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        {(portfolio?.certifications || []).map((cert, index) => {
                          const title = typeof cert === 'string' ? cert : cert.title;
                          const id = typeof cert === 'string' ? cert : (cert.id || index);
                          return (
                            <div key={id} className="admin-item-card" style={{ padding: '10px 14px' }}>
                              <span style={{ fontSize: '0.88rem', color: '#ffffff' }}>🏆 {title}</span>
                              <button
                                type="button"
                                className="btn-delete-small"
                                onClick={() => handleDeleteCert(id)}
                              >
                                Hapus
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </form>
                  </div>
                )}

                {/* TAB 5: RESUME / CV */}
                {activeTab === 'resume' && (
                  <div>
                    <h3 style={{ color: '#00d2ff', marginBottom: '16px' }}>📄 Upload & Kelola Resume (CV)</h3>

                    {/* Current Resume Info Card */}
                    <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(0,210,255,0.3)', borderRadius: '10px', padding: '18px', marginBottom: '24px' }}>
                      <h4 style={{ color: '#ffffff', marginBottom: '8px' }}>Status Resume Aktif</h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '4px' }}>
                        <strong>Nama File:</strong> {portfolio?.resume?.filename || 'Resume_Khamdi_Alfin.pdf'}
                      </p>
                      <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '4px' }}>
                        <strong>Ukuran:</strong> {portfolio?.resume?.size || 'Tersedia'}
                      </p>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '16px' }}>
                        <strong>Terakhir Diperbarui:</strong> {portfolio?.resume?.lastUpdated || 'Hari ini'}
                      </p>
                      <a
                        href={`${getApiBaseUrl()}/api/resume/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-save"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                      >
                        <span>📥 Download / Tes File Resume Saat Ini</span>
                      </a>
                    </div>

                    {/* Upload New Resume */}
                    <form onSubmit={handleUploadResume}>
                      <div className="form-group">
                        <label>Pilih File Resume Baru (Format PDF atau DOCX)</label>
                        <label className="file-upload-box">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResumeFile(e.target.files[0])}
                          />
                          {resumeFile ? (
                            <div>
                              <span style={{ fontSize: '2.5rem' }}>📄</span>
                              <div style={{ color: '#4ade80', fontWeight: 'bold', marginTop: '6px' }}>
                                {resumeFile.name}
                              </div>
                              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                                ({Math.round(resumeFile.size / 1024)} KB) - Siap diupload
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span style={{ fontSize: '2.5rem' }}>📤</span>
                              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginTop: '8px' }}>
                                Klik untuk memilih file Resume PDF baru dari komputer Anda
                              </p>
                              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                (Maksimal ukuran: 15MB)
                              </span>
                            </div>
                          )}
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn-save"
                        disabled={!resumeFile || saving}
                        style={{ width: '100%' }}
                      >
                        {saving ? 'Mengunggah file resume...' : 'Unggah & Perbarui File Resume'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminModal;
