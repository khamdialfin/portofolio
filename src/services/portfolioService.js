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
  if (img.startsWith('/assets-fallback/')) {
    return img.replace('/assets-fallback/', '/uploads/profile/');
  }
  if (img.startsWith('/uploads')) {
    // Di environment production atau jika REACT_APP_API_URL tidak di-set khusus,
    // gunakan relative path agar gambar diload langsung dari public/ host (seperti Vercel)
    if (process.env.NODE_ENV === 'production' || !process.env.REACT_APP_API_URL) {
      return img;
    }
    return `${API_BASE}${img}`;
  }
  return img;
};

// Fallback data when server is not yet running
export const DEFAULT_PORTFOLIO = {
  hero: {
    name: "Khamdi Alfin Mualif",
    subtitle: "Technology Enthusiast ",
    tagline: "Membangun Technology untuk manfaat dunia",
    badges: ["Laravel", "PHP", "JavaScript", "React", "CSS3", "HTML5"]
  },
  about: {
    paragraph1: "Saya adalah mahasiswa D4 Mekatronika di Politeknik Elektronika Negeri Surabaya (PENS) dengan latar belakang Rekayasa Perangkat Lunak (RPL). Ketertarikan saya terhadap teknologi berawal dari pemrograman dan pengembangan aplikasi, yang mendorong saya untuk terus belajar membangun solusi digital melalui kode dan pemecahan masalah.\r\n\r\nSaya memiliki pengalaman dalam pengembangan web dan basis data, serta pengalaman praktik kerja lapangan di industri perangkat lunak. Pengalaman tersebut membentuk kedisiplinan, kemampuan beradaptasi, dan kebiasaan belajar secara mandiri. Saya juga tertarik mengeksplorasi bagaimana perangkat lunak dapat terintegrasi dengan perangkat keras untuk menciptakan teknologi yang lebih cerdas dan bermanfaat.",
    paragraph2: "Saat ini, saya berfokus memperluas kemampuan dari pengembangan perangkat lunak menuju pemrograman C/C++, Python, embedded systems, robotika, dan otomasi. Ke depannya, saya ingin berkontribusi dalam pengembangan teknologi yang mengintegrasikan software, sistem kendali, dan perangkat keras untuk menyelesaikan permasalahan nyata serta memberikan manfaat bagi masyarakat.",
    highlights: [
      { number: "50+", text: "Projects Completed" },
      { number: "3+", text: "Years Experience" },
      { number: "100%", text: "Passion for Coding" }
    ],
    profileImage: "/uploads/profile/passfoto.jpg"
  },
  skills: {
    programming: [
      { id: "skill-1", name: "HTML5", level: 90 },
      { id: "skill-2", name: "CSS3", level: 85 },
      { id: "skill-3", name: "JavaScript", level: 75 },
      { id: "skill-4", name: "PHP", level: 85 },
      { id: "skill-1792263971015", name: "C++ ", level: 75 },
      { id: "skill-1792263988244", name: "Phyton", level: 70 }
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
      { id: "skill-12", name: "Figma", level: 80 },
      { id: "skill-1792264028063", name: "Antigravity", level: 90 }
    ]
  },
  projects: [
    {
      id: "proj-1792265744225",
      title: "Arshaka Bakery",
      description: "Website toko roti dengan fitur informasi toko, contact, lokasi, fitur pencarian produk, pilih dan order produk via whatsapp",
      image: "/uploads/projects/project-1792265744174-83984397.png",
      tech: ["Google Sites"],
      github: "",
      demo: "https://www.arshakabakery.my.id"
    },
    {
      id: "proj-1792264933836",
      title: "Aplikasi Ecommerce Bookshop",
      description: "Aplikasi Ecommerce bookshop aplikasi pembelian buku khusunya buku novel secara online, dengan fitur keranjang produk, checkout produk, dashboar admin untuk mengelola pesanan dan informasi pesanan.",
      image: "/uploads/projects/project-1792264981071-852195803.png",
      tech: ["Laravel", "Bootstrap", "Mysql", "Javascript"],
      github: "https://github.com/khamdialfin/shop",
      demo: ""
    },
    {
      id: "proj-1",
      title: "HadirIN",
      description: "Aplikasi berbasis web untuk absensi siswa menggunakan scan QR dengan konfigurasi API whatsapp gateaway untuk notifikasi pada orang tua, dengan fitur tambahan kas kelas pada bendahara.",
      image: "/uploads/projects/absen.png",
      tech: ["Laravel", "Bootstrap", "Github", "MySQL"],
      github: "https://github.com/khamdialfin/absen",
      demo: "https://demo.com"
    },
    {
      id: "proj-2",
      title: "POS (POINT OF SALES)",
      description: "Website Point of Sale (POS) yang dirancang untuk mempercepat transaksi ritel dan F&B. Dilengkapi dengan manajemen inventaris real-time, dasbor pelaporan penjualan. Sistem ini membantu UMKM mengelola operasional dengan lebih akurat dan efisien.",
      image: "/uploads/projects/pos.png",
      tech: ["Laravel", "Bootstrap", "Javascript", "MySQL"],
      github: "https://github.com/khamdialfin/pos",
      demo: "https://demo.com"
    },
    {
      id: "proj-3",
      title: "Landing Page Santri Bumi",
      description: "Membuat landing program kerja pesantren mujtamamadani yang bernama santri bumi, ini adalah pembuatan landing page real project atas dasar permintaan client, dengan tampilan yang menarik dan juga responsive design.",
      image: "/uploads/projects/santribumi.png",
      tech: ["HTML", "Bootstrap", "CSS3"],
      github: "https://github.com/khamdialfin/santriBumi",
      demo: "https://santribumi.mujtamamadani.ac.id/index.html"
    },
    {
      id: "proj-4",
      title: "Javascript Kalkulator",
      description: "Membuat kalkulator dengan javascript yang sederhana, dengan background yang mencolok dan animasi-animasi yang menarik.",
      image: "/uploads/projects/kalkulator.png",
      tech: ["HTML", "CSS3", "Javascript"],
      github: "https://github.com/khamdialfin/kalkulator-javascript",
      demo: "https://khamdialfin.github.io/kalkulator-javascript/"
    },
    {
      id: "proj-5",
      title: "Course Mujtamamadani",
      description: "Sebuah website kursus pondok pesantren mujtamamadani, dengan fitur design yang menarik dan juga responsive design.",
      image: "/uploads/projects/course.png",
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
      id: "exp-1792264379288",
      title: "Magang Backend Developer",
      company: "CV. Yuhlezz Software House",
      period: "2025-2026",
      description: "Pengalaman menjadi Backend Developer pada sebuah software house mengajarkan saya untuk langsung ke dalam project real industri dan kerja sama tim antar divisi dalam pengembangan sistem"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "SERTIFIKAT KOMPETENSI LSP P3 JUNIOR WEB DEVELOPER",
      issuer: "BNSP / LSP P3",
      status: "Completed"
    },
    {
      id: "cert-1792264415229",
      title: "Sertifikat Magang Yuhlez Software House",
      status: "Completed"
    }
  ],
  resume: {
    filename: "CV_Khamdi_Alfin.pdf",
    url: "/uploads/resume/CV_Khamdi_Alfin.pdf",
    size: "240 KB",
    lastUpdated: "2026-10-18"
  }
};

export const fetchPortfolioData = async () => {
  // 1. Coba fetch ke Backend API jika backend aktif
  try {
    const res = await fetch(`${API_BASE}/api/portfolio`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    // Backend tidak aktif (misal di Vercel publik), lanjut ke static file
  }

  // 2. Coba fetch static public/data/portfolio.json (berjalan di Vercel tanpa backend)
  try {
    const staticRes = await fetch('/data/portfolio.json');
    if (staticRes.ok) {
      const staticData = await staticRes.json();
      return staticData;
    }
  } catch (staticErr) {
    console.warn('Gagal memuat static portfolio.json:', staticErr);
  }

  // 3. Fallback terakhir ke memory DEFAULT_PORTFOLIO
  return DEFAULT_PORTFOLIO;
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
