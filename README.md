# Developer Portfolio (Dynamic Fullstack with Admin CMS)

Portofolio web modern dan dinamis untuk **Khamdi Alfin Mualif** dengan backend REST API (Express.js) dan dashboard pengelolaan konten terintegrasi (Admin Panel).

---

## 🚀 Cara Menjalankan

### 1. Menjalankan Frontend & Backend Sekaligus (Rekomendasi)
```bash
npm run dev
```
Perintah ini akan menjalankan:
- **Backend API Server**: `http://localhost:5000`
- **Frontend React Web**: `http://localhost:3000`

### 2. Menjalankan Secara Terpisah (Opsional)
* **Jalankan Backend Server saja:**
  ```bash
  npm run server
  ```
* **Jalankan Frontend React saja:**
  ```bash
  npm start
  ```

---

## ⚙️ Fitur Admin Panel (CMS)

Anda dapat mengelola seluruh konten portofolio langsung dari website:
1. Buka website di browser: `http://localhost:3000`
2. Klik tombol **`⚙️ Admin Panel`** di pojok kanan Navbar.
3. Masukkan password admin default: **`admin123`**
4. Kelola konten:
   - 💼 **Proyek (Projects)**: Upload screenshot project baru, edit judul/deskripsi/tech stack, link GitHub & Live Demo, atau hapus project.
   - 👤 **About Me & Hero**: Edit nama, role subtitle, tagline, paragraf bio 1 & 2, highlight counters (jumlah project, tahun pengalaman, dll), serta upload foto profil baru.
   - ⚡ **Keahlian (Skills)**: Tambah skill baru di kategori *Programming*, *Frameworks*, atau *Tools* dengan slider persentase tingkat kemampuan (0–100%).
   - 🏆 **Pengalaman & Sertifikat**: Tambah timeline pengalaman baru (posisi, nama instansi/sekolah, periode, deskripsi) dan sertifikat prestasi.
   - 📄 **Resume / CV**: Unggah file resume baru (PDF / DOCX) dengan tombol tes unduh langsung.

---

## 📂 Struktur Proyek

```
portofolioweb/
├── server/
│   ├── index.js                  # Express.js REST API & Multer Storage
│   ├── data/
│   │   └── portfolio.json        # Database JSON terstruktur (Auto-saved)
│   └── uploads/                  # Folder file upload (disajikan via HTTP)
│       ├── projects/             # Gambar screenshot project
│       ├── profile/              # Foto profil (passfoto)
│       └── resume/               # File resume / CV PDF
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminModal.jsx    # Dashboard Admin CMS dengan autentikasi
│   │   │   └── AdminModal.css    # Styling Glassmorphism modern
│   │   ├── sections/             # Section Hero, About, Skills, Projects, Experience, Contact
│   │   └── Navbar.jsx            # Navigasi dengan tombol CV & Admin Panel
│   ├── contexts/
│   │   └── PortfolioContext.jsx  # State management global dinamis
│   └── services/
│       └── portfolioService.js   # Client HTTP API dengan offline fallback
└── package.json
```

---

## 📡 API Endpoints

| Metode | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `GET` | `/api/portfolio` | Mengambil seluruh data portofolio |
| `POST` | `/api/auth/login` | Login admin dengan password |
| `PUT` | `/api/hero` | Memperbarui nama, role, dan tagline hero |
| `PUT` | `/api/about` | Memperbarui bio paragraf & upload foto profil |
| `GET` | `/api/projects` | Mengambil daftar seluruh proyek |
| `POST` | `/api/projects` | Menambahkan proyek baru beserta upload gambar |
| `PUT` | `/api/projects/:id` | Mengedit proyek yang ada |
| `DELETE` | `/api/projects/:id` | Menghapus proyek |
| `PUT` | `/api/skills` | Memperbarui daftar skill keahlian |
| `POST` | `/api/skills/:category` | Menambah skill ke kategori tertentu |
| `DELETE` | `/api/skills/:category/:id` | Menghapus skill |
| `PUT` | `/api/experience` | Memperbarui timeline & sertifikasi |
| `POST` | `/api/resume` | Mengunggah file CV / resume baru |
| `GET` | `/api/resume/download` | Mengunduh file CV / resume aktif |
| `GET` | `/uploads/*` | Akses langsung ke file gambar & dokumen yang diunggah |
