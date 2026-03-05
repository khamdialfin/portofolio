// data/projects.js
import absenImage from '../assets/images/absen.png';
import dashboardImage from '../assets/images/pos.png'; 
import santribumi from '../assets/images/santribumi.png'; 
import kalkulator from '../assets/images/kalkulator.png'; 
import course from '../assets/images/course.png'; 

export const projects = [
  {
    id: 1,
    title: "HadirIN",
    description: "Aplikasi berbasis web untuk absensi siswa menggunakan scan QR dengan konfigurasi API whatsapp gateaway untuk notifikasi pada orang tua, dengan fitur tambahan kas kelas pada bendahara",
    image: absenImage,
    tech: ["Laravel", "Bootstrap", "Github"],
    github: "https://github.com/khamdialfin/absen",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "POS (POINT OF SALES)",
    description: "Website Point of Sale (POS) yang dirancang untuk mempercepat transaksi ritel dan F&B. Dilengkapi dengan manajemen inventaris real-time, dasbor pelaporan penjualan. Sistem ini membantu UMKM mengelola operasional dengan lebih akurat dan efisien",
    image: dashboardImage,
    tech: ["Laravel", "Bootstrap", "Javascript"],
    github: "https://github.com/khamdialfin/pos",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Landing Page Santri Bumi",
    description: "Membuat landing program kerja pesantren mujtamamadani yang bernama santri bumi, ini adalah pembuatan landing page real project atas dasar permintaan client, dengan tampilan yang menarik dan juga responsive design",
    image: santribumi,
    tech: ["HTML", "Bootstrap", "CSS3"],
    github: "https://github.com/khamdialfin/santriBumi",
    demo: "https://santribumi.mujtamamadani.ac.id/index.html",
  },
  {
    id: 4,
    title: "Javasript Kalkulator",
    description: "Membuat kalkulator dengan javascript yang sederhana, dengan background yang mencolok dan animasi-animasi yang menarik",
    image: kalkulator,
    tech: ["HTML", "CSS3", "Javascript"],
    github: "https://github.com/khamdialfin/kalkulator-javascript",
    demo: "https://khamdialfin.github.io/kalkulator-javascript/",
  },
  {
    id: 5,
    title: "Course Mujtamamadani",
    description: "Sebuah website kursus pondok pesantren mujtamamadani, dengan fitur design yang menarik dan juga responsive design",
    image: course,
    tech: ["HTML", "CSS3", "Bootstrap", "Javascript"],
    github: "",
    demo: "https://course.mujtamamadani.ac.id",
  },
];