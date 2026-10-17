const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Paths
const DATA_FILE = path.join(__dirname, 'data', 'portfolio.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const PROJECTS_UPLOAD_DIR = path.join(UPLOADS_DIR, 'projects');
const PROFILE_UPLOAD_DIR = path.join(UPLOADS_DIR, 'profile');
const RESUME_UPLOAD_DIR = path.join(UPLOADS_DIR, 'resume');

// Ensure directories exist
[UPLOADS_DIR, PROJECTS_UPLOAD_DIR, PROFILE_UPLOAD_DIR, RESUME_UPLOAD_DIR, path.dirname(DATA_FILE)].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Auto-seed existing images from src/assets/images if available
const SRC_IMAGES_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');
if (fs.existsSync(SRC_IMAGES_DIR)) {
  try {
    const files = fs.readdirSync(SRC_IMAGES_DIR);
    files.forEach(file => {
      const srcPath = path.join(SRC_IMAGES_DIR, file);
      if (fs.statSync(srcPath).isFile()) {
        if (file === 'passfoto.jpg') {
          const dest = path.join(PROFILE_UPLOAD_DIR, file);
          if (!fs.existsSync(dest)) fs.copyFileSync(srcPath, dest);
        } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
          const dest = path.join(PROJECTS_UPLOAD_DIR, file);
          if (!fs.existsSync(dest)) fs.copyFileSync(srcPath, dest);
        }
      }
    });
  } catch (err) {
    console.error('Notice: Could not copy initial images:', err.message);
  }
}

// Create sample placeholder resume if none exists
const sampleResumePath = path.join(RESUME_UPLOAD_DIR, 'CV_Khamdi_Alfin.pdf');
if (!fs.existsSync(sampleResumePath)) {
  try {
    fs.writeFileSync(sampleResumePath, '%PDF-1.4\n1 0 obj\n<< /Title (Curriculum Vitae - Khamdi Alfin Mualif) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');
  } catch (err) {
    console.error('Notice: could not create sample resume:', err.message);
  }
}

// Serve uploaded static files
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper: read portfolio data
function getPortfolioData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return null;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading portfolio.json:', err);
    return null;
  }
}

// Helper: save portfolio data safely (atomic write)
function savePortfolioData(data) {
  try {
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempFile, DATA_FILE);
    return true;
  } catch (err) {
    console.error('Error saving portfolio.json:', err);
    return false;
  }
}

// Multer Storage Configurations
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PROJECTS_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'project-' + uniqueSuffix + ext);
  }
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PROFILE_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, RESUME_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, 'resume-' + Date.now() + '-' + safeName);
  }
});

const uploadProject = multer({
  storage: projectStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const uploadProfile = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB
});

// ================= ROUTES ================= //

// 1. Get full portfolio data
app.get('/api/portfolio', (req, res) => {
  const data = getPortfolioData();
  if (!data) {
    return res.status(500).json({ error: 'Database portfolio tidak ditemukan atau gagal dibaca' });
  }
  // Remove password from response
  const sanitized = { ...data };
  if (sanitized.settings) {
    sanitized.settings = { ...sanitized.settings, adminPassword: undefined };
  }
  res.json(sanitized);
});

// 2. Auth: Admin login
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const data = getPortfolioData();
  const currentPassword = (data && data.settings && data.settings.adminPassword) || 'admin123';

  if (password === currentPassword) {
    // Return simple session token
    const token = 'auth_token_' + Buffer.from(`admin:${Date.now()}`).toString('base64');
    return res.json({ success: true, token, message: 'Login berhasil' });
  } else {
    return res.status(401).json({ success: false, message: 'Password salah. Default: admin123' });
  }
});

// 3. Update Hero Section
app.put('/api/hero', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const { name, subtitle, tagline, badges } = req.body;
  data.hero = {
    name: name || data.hero.name,
    subtitle: subtitle || data.hero.subtitle,
    tagline: tagline || data.hero.tagline,
    badges: Array.isArray(badges) ? badges : data.hero.badges
  };

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Hero berhasil diperbarui', hero: data.hero });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan perubahan hero' });
  }
});

// 4. Update About Section (with optional photo upload)
app.put('/api/about', uploadProfile.single('profileImage'), (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const { paragraph1, paragraph2, highlights } = req.body;

  if (paragraph1 !== undefined) data.about.paragraph1 = paragraph1;
  if (paragraph2 !== undefined) data.about.paragraph2 = paragraph2;

  if (highlights) {
    try {
      data.about.highlights = typeof highlights === 'string' ? JSON.parse(highlights) : highlights;
    } catch (e) {
      console.warn('Could not parse highlights:', e);
    }
  }

  // Handle uploaded photo
  if (req.file) {
    data.about.profileImage = `/uploads/profile/${req.file.filename}`;
  }

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'About me berhasil diperbarui', about: data.about });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan perubahan about' });
  }
});

// 5. Projects API: Get, Add, Edit, Delete
app.get('/api/projects', (req, res) => {
  const data = getPortfolioData();
  res.json(data ? data.projects : []);
});

// Add new project
app.post('/api/projects', uploadProject.single('image'), (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const { title, description, tech, github, demo } = req.body;

  let parsedTech = [];
  if (tech) {
    if (typeof tech === 'string') {
      try {
        parsedTech = JSON.parse(tech);
      } catch (e) {
        parsedTech = tech.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(tech)) {
      parsedTech = tech;
    }
  }

  let imageUrl = '/uploads/projects/pos.png';
  if (req.file) {
    imageUrl = `/uploads/projects/${req.file.filename}`;
  } else if (req.body.imageUrl) {
    imageUrl = req.body.imageUrl;
  }

  const newProject = {
    id: 'proj-' + Date.now(),
    title: title || 'Untitled Project',
    description: description || '',
    image: imageUrl,
    tech: parsedTech.length > 0 ? parsedTech : ['Web Development'],
    github: github || '',
    demo: demo || ''
  };

  data.projects.unshift(newProject);

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Project berhasil ditambahkan', project: newProject });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan project baru' });
  }
});

// Edit project
app.put('/api/projects/:id', uploadProject.single('image'), (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const projectId = req.params.id;
  const projectIndex = data.projects.findIndex(p => String(p.id) === String(projectId));

  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project tidak ditemukan' });
  }

  const { title, description, tech, github, demo } = req.body;
  const currentProject = data.projects[projectIndex];

  if (title !== undefined) currentProject.title = title;
  if (description !== undefined) currentProject.description = description;
  if (github !== undefined) currentProject.github = github;
  if (demo !== undefined) currentProject.demo = demo;

  if (tech !== undefined) {
    if (typeof tech === 'string') {
      try {
        currentProject.tech = JSON.parse(tech);
      } catch (e) {
        currentProject.tech = tech.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else if (Array.isArray(tech)) {
      currentProject.tech = tech;
    }
  }

  if (req.file) {
    currentProject.image = `/uploads/projects/${req.file.filename}`;
  } else if (req.body.imageUrl) {
    currentProject.image = req.body.imageUrl;
  }

  data.projects[projectIndex] = currentProject;

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Project berhasil diperbarui', project: currentProject });
  } else {
    res.status(500).json({ error: 'Gagal memperbarui project' });
  }
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const projectId = req.params.id;
  const beforeLen = data.projects.length;
  data.projects = data.projects.filter(p => String(p.id) !== String(projectId));

  if (data.projects.length === beforeLen) {
    return res.status(404).json({ error: 'Project tidak ditemukan' });
  }

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Project berhasil dihapus' });
  } else {
    res.status(500).json({ error: 'Gagal menghapus project' });
  }
});

// 6. Skills API: Get, Update Category, Add, Delete
app.get('/api/skills', (req, res) => {
  const data = getPortfolioData();
  res.json(data ? data.skills : {});
});

// Replace all skills
app.put('/api/skills', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  if (req.body.skills) {
    data.skills = req.body.skills;
  }

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Skills berhasil diperbarui', skills: data.skills });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan skills' });
  }
});

// Add skill to a category
app.post('/api/skills/:category', (req, res) => {
  const { category } = req.params;
  const { name, level } = req.body;

  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  if (!data.skills[category]) {
    data.skills[category] = [];
  }

  const newSkill = {
    id: 'skill-' + Date.now(),
    name: name || 'New Skill',
    level: Number(level) || 80
  };

  data.skills[category].push(newSkill);

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Skill berhasil ditambahkan', skill: newSkill, skills: data.skills });
  } else {
    res.status(500).json({ error: 'Gagal menambahkan skill' });
  }
});

// Update single skill
app.put('/api/skills/:category/:id', (req, res) => {
  const { category, id } = req.params;
  const { name, level } = req.body;

  const data = getPortfolioData();
  if (!data || !data.skills[category]) return res.status(404).json({ error: 'Kategori tidak ditemukan' });

  const skill = data.skills[category].find(s => String(s.id) === String(id));
  if (!skill) return res.status(404).json({ error: 'Skill tidak ditemukan' });

  if (name !== undefined) skill.name = name;
  if (level !== undefined) skill.level = Number(level);

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Skill berhasil diperbarui', skill, skills: data.skills });
  } else {
    res.status(500).json({ error: 'Gagal memperbarui skill' });
  }
});

// Delete skill
app.delete('/api/skills/:category/:id', (req, res) => {
  const { category, id } = req.params;
  const data = getPortfolioData();
  if (!data || !data.skills[category]) return res.status(404).json({ error: 'Kategori tidak ditemukan' });

  data.skills[category] = data.skills[category].filter(s => String(s.id) !== String(id));

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Skill berhasil dihapus', skills: data.skills });
  } else {
    res.status(500).json({ error: 'Gagal menghapus skill' });
  }
});

// 7. Experience & Certifications API
app.get('/api/experience', (req, res) => {
  const data = getPortfolioData();
  res.json({
    experience: data ? data.experience : [],
    certifications: data ? data.certifications : []
  });
});

app.put('/api/experience', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const { experience, certifications } = req.body;
  if (experience) data.experience = experience;
  if (certifications) data.certifications = certifications;

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Pengalaman & Sertifikasi berhasil diperbarui', experience: data.experience, certifications: data.certifications });
  } else {
    res.status(500).json({ error: 'Gagal memperbarui pengalaman' });
  }
});

// Add experience item
app.post('/api/experience/item', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const { title, company, period, description } = req.body;
  const newItem = {
    id: 'exp-' + Date.now(),
    title: title || 'Posisi/Pengalaman',
    company: company || '',
    period: period || '2024 - Sekarang',
    description: description || ''
  };

  data.experience.push(newItem);

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Pengalaman berhasil ditambahkan', item: newItem });
  } else {
    res.status(500).json({ error: 'Gagal menambahkan pengalaman' });
  }
});

// Delete experience item
app.delete('/api/experience/item/:id', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  data.experience = data.experience.filter(e => String(e.id) !== String(req.params.id));

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Pengalaman berhasil dihapus' });
  } else {
    res.status(500).json({ error: 'Gagal menghapus pengalaman' });
  }
});

// Add certification
app.post('/api/experience/cert', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const { title, issuer, status } = req.body;
  const newCert = {
    id: 'cert-' + Date.now(),
    title: title || 'Sertifikat Baru',
    issuer: issuer || 'BNSP / Lembaga Sertifikasi',
    status: status || 'Completed'
  };

  data.certifications.push(newCert);

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Sertifikat berhasil ditambahkan', cert: newCert });
  } else {
    res.status(500).json({ error: 'Gagal menambahkan sertifikat' });
  }
});

// Delete certification
app.delete('/api/experience/cert/:id', (req, res) => {
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  data.certifications = data.certifications.filter(c => String(c.id) !== String(req.params.id) && String(c.title) !== String(req.params.id));

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Sertifikat berhasil dihapus' });
  } else {
    res.status(500).json({ error: 'Gagal menghapus sertifikat' });
  }
});

// 8. Resume Upload & Download API
app.post('/api/resume', uploadResume.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File resume tidak ditemukan' });
  }

  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const sizeKb = Math.round(req.file.size / 1024) + ' KB';
  const newResume = {
    filename: req.file.originalname,
    storedFilename: req.file.filename,
    url: `/uploads/resume/${req.file.filename}`,
    size: sizeKb,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  data.resume = newResume;

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Resume berhasil diupload', resume: newResume });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan data resume' });
  }
});

app.get('/api/resume/download', (req, res) => {
  const data = getPortfolioData();
  if (!data || !data.resume || !data.resume.url) {
    return res.status(404).send('File resume belum diunggah');
  }

  const filename = data.resume.storedFilename || path.basename(data.resume.url);
  const filePath = path.join(RESUME_UPLOAD_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, data.resume.filename || 'Resume_Khamdi_Alfin.pdf');
  } else {
    // If not found in uploaded folder, look for any sample in RESUME_UPLOAD_DIR
    const files = fs.readdirSync(RESUME_UPLOAD_DIR);
    if (files.length > 0) {
      res.download(path.join(RESUME_UPLOAD_DIR, files[0]), 'Resume_Khamdi_Alfin.pdf');
    } else {
      res.status(404).send('File resume tidak ditemukan di server.');
    }
  }
});

// Change admin password
app.put('/api/auth/password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const data = getPortfolioData();
  if (!data) return res.status(500).json({ error: 'Data not found' });

  const activePw = (data.settings && data.settings.adminPassword) || 'admin123';
  if (currentPassword !== activePw) {
    return res.status(401).json({ error: 'Password lama salah' });
  }

  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Password baru minimal 4 karakter' });
  }

  data.settings = data.settings || {};
  data.settings.adminPassword = newPassword;

  if (savePortfolioData(data)) {
    res.json({ success: true, message: 'Password admin berhasil diubah' });
  } else {
    res.status(500).json({ error: 'Gagal menyimpan password baru' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Portfolio Backend API running at http://localhost:${PORT}`);
  console.log(`Uploaded files available at http://localhost:${PORT}/uploads`);
});
