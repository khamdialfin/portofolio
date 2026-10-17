// src/services/portfolioService.js
// Client service for interacting with the backend API with offline fallback

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getApiBaseUrl = () => API_BASE;

export const formatImageUrl = (img) => {
  if (!img) return '';
  if (typeof img !== 'string') return img;
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
    return img;
  }
  if (img.startsWith('/uploads')) {
    return `${API_BASE}${img}`;
  }
  return img;
};

// Fallback data when server is not yet running
export const DEFAULT_PORTFOLIO = {
  hero: {
    name: "Khamdi Alfin Mualif",
    subtitle: "Full Stack Web Developer",
    tagline: "Membangun solusi digital dengan kode yang bersih dan teknologi modern.",
    badges: ["Laravel", "PHP", "JavaScript", "React", "CSS3", "HTML5"]
  },
  about: {
    paragraph1: "Saya adalah siswa SMK jurusan Rekayasa Perangkat Lunak (RPL) yang memiliki ketertarikan besar dalam dunia pengembangan web. Ketertarikan saya dimulai dari rasa ingin tahu tentang bagaimana sebuah website bekerja, hingga akhirnya berkembang menjadi perjalanan belajar yang serius dalam membangun solusi digital melalui pemrograman. Saya terus mengasah kemampuan dengan mempelajari berbagai teknologi web modern dan menerapkannya dalam berbagai proyek pengembangan.",
    paragraph2: "Saat ini saya berfokus pada pengembangan website menggunakan teknologi modern seperti HTML, CSS, JavaScript, dan php serta framework pendukung seperti Bootstrap, codeigniter, hingga Laravel. Saya menikmati proses memecahkan masalah nyata melalui kode dan selalu berusaha menulis kode yang bersih, terstruktur, serta mudah dikembangkan. Melalui portofolio ini, saya ingin menunjukkan kemampuan teknis, proyek yang telah saya kerjakan, serta semangat saya untuk terus berkembang sebagai web developer.",
    highlights: [
      { number: "50+", text: "Projects Completed" },
      { number: "2+", text: "Years Experience" },
      { number: "100%", text: "Passion for Coding" }
    ],
    profileImage: ""
  },
  skills: {
    programming: [
      { id: "skill-1", name: "HTML5", level: 90 },
      { id: "skill-2", name: "CSS3", level: 85 },
      { id: "skill-3", name: "JavaScript", level: 75 },
      { id: "skill-4", name: "PHP", level: 85 }
    ],
    frameworks: [
      { id: "skill-5", name: "Laravel", level: 90 },
      { id: "skill-6", name: "Bootstrap", level: 85 },
      { id: "skill-7", name: "Codeigniter", level: 80 },
      { id: "skill-8", name: "React", level: 75 }
    ],
    tools: [
      { id: "skill-9", name: "Git & GitHub", level: 90 },
      { id: "skill-10", name: "VS Code", level: 90 },
      { id: "skill-11", name: "Laragon / XAMPP", level: 90 },
      { id: "skill-12", name: "Figma", level: 80 }
    ]
  },
  projects: [
    {
      id: "proj-1",
      title: "HadirIN",
      description: "Aplikasi berbasis web untuk absensi siswa menggunakan scan QR dengan konfigurasi API whatsapp gateaway untuk notifikasi pada orang tua, dengan fitur tambahan kas kelas pada bendahara.",
      image: `${API_BASE}/uploads/projects/absen.png`,
      tech: ["Laravel", "Bootstrap", "Github", "MySQL"],
      github: "https://github.com/khamdialfin/absen",
      demo: "https://demo.com"
    },
    {
      id: "proj-2",
      title: "POS (POINT OF SALES)",
      description: "Website Point of Sale (POS) yang dirancang untuk mempercepat transaksi ritel dan F&B. Dilengkapi dengan manajemen inventaris real-time, dasbor pelaporan penjualan. Sistem ini membantu UMKM mengelola operasional dengan lebih akurat dan efisien.",
      image: `${API_BASE}/uploads/projects/pos.png`,
      tech: ["Laravel", "Bootstrap", "Javascript", "MySQL"],
      github: "https://github.com/khamdialfin/pos",
      demo: "https://demo.com"
    },
    {
      id: "proj-3",
      title: "Landing Page Santri Bumi",
      description: "Membuat landing program kerja pesantren mujtamamadani yang bernama santri bumi, ini adalah pembuatan landing page real project atas dasar permintaan client, dengan tampilan yang menarik dan juga responsive design.",
      image: `${API_BASE}/uploads/projects/santribumi.png`,
      tech: ["HTML", "Bootstrap", "CSS3"],
      github: "https://github.com/khamdialfin/santriBumi",
      demo: "https://santribumi.mujtamamadani.ac.id/index.html"
    },
    {
      id: "proj-4",
      title: "Javascript Kalkulator",
      description: "Membuat kalkulator dengan javascript yang sederhana, dengan background yang mencolok dan animasi-animasi yang menarik.",
      image: `${API_BASE}/uploads/projects/kalkulator.png`,
      tech: ["HTML", "CSS3", "Javascript"],
      github: "https://github.com/khamdialfin/kalkulator-javascript",
      demo: "https://khamdialfin.github.io/kalkulator-javascript/"
    },
    {
      id: "proj-5",
      title: "Course Mujtamamadani",
      description: "Sebuah website kursus pondok pesantren mujtamamadani, dengan fitur design yang menarik dan juga responsive design.",
      image: `${API_BASE}/uploads/projects/course.png`,
      tech: ["HTML", "CSS3", "Bootstrap", "Javascript"],
      github: "",
      demo: "https://course.mujtamamadani.ac.id"
    }
  ],
  experience: [
    {
      id: "exp-1",
      title: "Siswa SMK Jurusan RPL",
      company: "SMK N 1 SLAWI",
      period: "2023 - Present",
      description: "Belajar tentang dasar pemrograman, database, dan pemrograman berbasis web hingga dapat menguasai framework Laravel."
    },
    {
      id: "exp-2",
      title: "Mengikuti Lomba LKS Web Technology",
      company: "Kab. Tegal",
      period: "2026",
      description: "Pengalaman dan tantangan baru dipercaya oleh sekolah mengikuti lomba LKS Web Technology."
    },
    {
      id: "exp-3",
      title: "Praktik Kerja Lapangan",
      company: "Yuhlez Software House",
      period: "2025 - Present",
      description: "Berkolaborasi dan berkontribusi membuat website untuk real project client di YUHLEZ SOFTWARE HOUSE sebagai Backend Developer."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "SERTIFIKAT KOMPETENSI LSP P3 JUNIOR WEB DEVELOPER",
      issuer: "BNSP / LSP P3",
      status: "Completed"
    }
  ],
  resume: {
    filename: "CV_Khamdi_Alfin.pdf",
    url: `${API_BASE}/api/resume/download`,
    size: "240 KB",
    lastUpdated: "2026-10-18"
  }
};

export const fetchPortfolioData = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio`);
    if (!res.ok) throw new Error('API portfolio response not ok');
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Backend API not responding, using local fallback:', err.message);
    return DEFAULT_PORTFOLIO;
  }
};

export const loginAdmin = async (password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  return res.json();
};

export const updateAboutSection = async (formData) => {
  const res = await fetch(`${API_BASE}/api/about`, {
    method: 'PUT',
    body: formData // multipart
  });
  if (!res.ok) throw new Error('Gagal memperbarui About');
  return res.json();
};

export const updateHeroSection = async (data) => {
  const res = await fetch(`${API_BASE}/api/hero`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Gagal memperbarui Hero');
  return res.json();
};

export const addProjectApi = async (formData) => {
  const res = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    body: formData // multipart
  });
  if (!res.ok) throw new Error('Gagal menambahkan project');
  return res.json();
};

export const updateProjectApi = async (id, formData) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}`, {
    method: 'PUT',
    body: formData // multipart
  });
  if (!res.ok) throw new Error('Gagal memperbarui project');
  return res.json();
};

export const deleteProjectApi = async (id) => {
  const res = await fetch(`${API_BASE}/api/projects/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Gagal menghapus project');
  return res.json();
};

export const updateSkillsApi = async (skills) => {
  const res = await fetch(`${API_BASE}/api/skills`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skills })
  });
  if (!res.ok) throw new Error('Gagal menyimpan skills');
  return res.json();
};

export const updateExperienceApi = async (experience, certifications) => {
  const res = await fetch(`${API_BASE}/api/experience`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ experience, certifications })
  });
  if (!res.ok) throw new Error('Gagal memperbarui pengalaman');
  return res.json();
};

export const uploadResumeApi = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const res = await fetch(`${API_BASE}/api/resume`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Gagal mengupload resume');
  return res.json();
};
