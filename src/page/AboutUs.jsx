import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const stats = [
  { value: "100+", label: "UMKM Terdampak" },
  { value: "3+", label: "Tahun Pengalaman" },
  { value: "10+", label: "Mitra Strategis" },
  { value: "3", label: "Kota Operasional" },
];

const values = [
  {
    icon: "🤝",
    title: "Kolaborasi",
    desc: "Kami percaya bahwa pertumbuhan terbaik lahir dari kerja sama yang tulus antara pelaku usaha, mitra, dan komunitas.",
  },
  {
    icon: "💡",
    title: "Inovasi",
    desc: "Kami terus mencari pendekatan baru yang relevan dan berdampak nyata bagi ekosistem UMKM Indonesia.",
  },
  {
    icon: "🎯",
    title: "Dampak Nyata",
    desc: "Setiap langkah yang kami ambil diarahkan untuk menciptakan perubahan yang bisa dirasakan langsung oleh pelaku usaha.",
  },
  {
    icon: "🔒",
    title: "Integritas",
    desc: "Kepercayaan adalah fondasi kami. Kami menjaga standar etika dan transparansi dalam setiap hubungan bisnis.",
  },
];

const team = {
  founder: {
    name: "Amir Faisal Karimullah",
    role: "Founder & CEO",
    img: "/teams/faisal.jpg",
  },
  cofounders: [
    {
      name: "Arby Pratama",
      role: "Co-Founder & Chief Business Development Officer",
      img: "/teams/arby.jpg",
    },
    {
      name: "Arba'in Prasetyo",
      role: "Co-Founder & Chief Marketing Officer",
      img: "/teams/arbain.jpg",
    },
  ],
  core: [
    { name: "Syahreza Yusuf", role: "Digital Strategist", img: "/teams/REZA.png" },
    { name: "Rizky Septiana Adjie", role: "Legal Officer", img: "/teams/RizkySeptianaAdjie.png" },
    { name: "Dewi Sri Tunjungsari", role: "Business Development & Partnership", img: "/teams/dewi.png" },
  ],
  interns: [
    { name: "Puspita Putri", role: "Head of Administration Intern", img: "/teams/putri.jpg" },
    { name: "Rizki Lestari", role: "Graphic Designer Intern", img: "/teams/tari.jpg" },
    { name: "Muhromin", role: "Fullstack Developer Intern", img: "/teams/muhromin.jpeg" },
    { name: "Sabrina Putri Michellia", role: "Partnership & Secretary Intern", img: "/teams/sabrina.jpeg" },
  ],
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const AboutUs = ({ currentPath }) => {
  return (
    <div
      className="w-full min-h-screen text-gray-900"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAF9F6" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .about-root { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Cormorant Garamond', Georgia, serif; }

        .hero-bg {
          background: linear-gradient(135deg, #0f1c2e 0%, #1a3a5c 60%, #0d2035 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(ellipse at 20% 50%, rgba(99,179,237,0.08) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(246,173,85,0.06) 0%, transparent 50%);
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to top, #FAF9F6, transparent);
        }

        .stat-card {
          border: 1px solid rgba(15,28,46,0.12);
          background: white;
          border-radius: 2px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(15,28,46,0.1); }

        .value-card {
          padding: 2rem;
          border-left: 3px solid #C9A84C;
          background: white;
          margin-bottom: 1rem;
          transition: background 0.2s;
        }
        .value-card:hover { background: #f0ede6; }

        .team-photo {
          object-fit: cover;
          border-radius: 4px;
          transition: filter 0.3s, transform 0.3s;
          filter: grayscale(20%);
        }
        .team-photo:hover { filter: grayscale(0%); transform: scale(1.03); }

        .divider-line {
          width: 60px;
          height: 2px;
          background: #C9A84C;
          margin: 0.75rem auto;
        }

        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #C9A84C;
          font-weight: 500;
        }

        .milestone-item {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(15,28,46,0.08);
        }
        .milestone-year {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #C9A84C;
          min-width: 60px;
        }

        .cta-section {
          background: #0f1c2e;
          color: white;
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '"';
          position: absolute;
          font-family: 'Cormorant Garamond', serif;
          font-size: 30rem;
          color: rgba(255,255,255,0.02);
          top: -8rem;
          left: -2rem;
          line-height: 1;
          pointer-events: none;
        }
      `}</style>

      <div className="about-root">
        <Navbar currentPath={currentPath} />

        {/* ─── HERO ─── */}
        <section className="hero-bg relative w-full flex items-center justify-center" style={{ minHeight: "72vh" }}>
          <motion.div
            className="relative z-10 text-center px-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="section-label mb-6" style={{ color: "#C9A84C" }}>Tentang Kami</p>
            <h1
              className="display-font text-white"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 600, lineHeight: 1.1 }}
            >
              Membangun Jembatan<br />
              <em>Pertumbuhan UMKM</em><br />
              Indonesia
            </h1>
            <p
              className="text-gray-300 mt-6 max-w-2xl mx-auto"
              style={{ fontSize: "1.1rem", lineHeight: 1.8, fontWeight: 300 }}
            >
              Kami hadir untuk memberikan dukungan nyata, ekosistem yang kuat,
              dan akses yang lebih adil bagi seluruh pelaku usaha di Indonesia.
            </p>
          </motion.div>
        </section>

        {/* ─── STATS ─── */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((s) => (
              <motion.div key={s.label} className="stat-card" variants={fadeUp}>
                <div
                  className="display-font"
                  style={{ fontSize: "2.8rem", fontWeight: 700, color: "#0f1c2e" }}
                >
                  {s.value}
                </div>
                <div className="divider-line" style={{ margin: "0.5rem auto" }}></div>
                <p style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── MISI & VISI ─── */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <p className="section-label mb-3">Visi</p>
              <h2 className="display-font" style={{ fontSize: "2.2rem", fontWeight: 600, lineHeight: 1.2, color: "#0f1c2e" }}>
                Menjadi ekosistem terpercaya bagi pertumbuhan UMKM di Indonesia.
              </h2>
            </div>
            <div>
              <p className="section-label mb-3">Misi</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  "Menyediakan akses terhadap sumber daya, jaringan, dan peluang bisnis yang selama ini sulit dijangkau UMKM.",
                  "Membangun komunitas pelaku usaha yang saling mendukung, berbagi, dan tumbuh bersama.",
                  "Mengintegrasikan teknologi dan strategi bisnis untuk mempercepat perkembangan UMKM Indonesia.",
                  "Menjaga kepercayaan melalui praktik bisnis yang transparan dan berintegritas.",
                ].map((m, i) => (
                  <li key={i} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ color: "#C9A84C", fontWeight: 700, minWidth: "1.4rem" }}>0{i + 1}</span>
                    <span style={{ color: "#374151", lineHeight: 1.7, fontSize: "0.95rem" }}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* ─── NILAI-NILAI ─── */}
        <section style={{ background: "#0f1c2e" }} className="py-20 mt-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <p className="section-label mb-3">Nilai Kami</p>
              <h2
                className="display-font text-white"
                style={{ fontSize: "2.5rem", fontWeight: 600 }}
              >
                Prinsip yang Menggerakkan Kami
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-4"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {values.map((v) => (
                <motion.div key={v.title} className="value-card" variants={fadeUp}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{v.icon}</div>
                  <h3 className="display-font" style={{ fontSize: "1.4rem", fontWeight: 600, color: "#0f1c2e", marginBottom: "0.5rem" }}>
                    {v.title}
                  </h3>
                  <p style={{ color: "#4b5563", lineHeight: 1.7, fontSize: "0.93rem" }}>{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PERJALANAN ─── */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-label mb-3">Perjalanan</p>
            <h2 className="display-font" style={{ fontSize: "2.5rem", fontWeight: 600, color: "#0f1c2e" }}>
              Tonggak Penting Kami
            </h2>
          </motion.div>

          <div>
            {[
              {
                year: "2021",
                title: "Lahirnya Sebuah Gagasan",
                desc: "Muncul kesadaran akan kebutuhan nyata para pelaku UMKM Indonesia akan ekosistem dukungan yang terintegrasi—dari sisi strategi, jaringan, hingga legalitas.",
              },
              {
                year: "2022",
                title: "Membangun Fondasi",
                desc: "Tim inti terbentuk. Penandatanganan MoU pertama menjadi tonggak awal komitmen kami terhadap kolaborasi yang serius dan berorientasi dampak.",
              },
              {
                year: "2023",
                title: "Ekspansi & Kemitraan",
                desc: "Kami mulai menjalin kemitraan strategis dengan berbagai institusi dan komunitas bisnis, memperluas jangkauan program ke lebih banyak pelaku UMKM.",
              },
              {
                year: "2024",
                title: "Penguatan Sistem & Produk",
                desc: "Fokus pada pengembangan produk yang terstruktur, penataan legalitas, dan peningkatan kapasitas tim untuk memberikan layanan yang lebih profesional dan berdampak.",
              },
            ].map((m, i) => (
              <motion.div
                key={m.year}
                className="milestone-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="milestone-year">{m.year}</div>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: "1.05rem", color: "#0f1c2e", marginBottom: "0.4rem" }}>
                    {m.title}
                  </h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.92rem" }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── TIM ─── */}
        <section style={{ background: "#f3f0ea" }} className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="section-label mb-3">Tim Kami</p>
              <h2 className="display-font" style={{ fontSize: "2.5rem", fontWeight: 600, color: "#0f1c2e" }}>
                Orang-Orang di Balik Misi Ini
              </h2>
              <p style={{ color: "#6b7280", marginTop: "0.75rem", fontStyle: "italic" }}>
                "Bersama, kita lebih kuat"
              </p>
            </motion.div>

            {/* Founder */}
            <div className="flex flex-col items-center mb-16">
              <img
                src={team.founder.img}
                alt={team.founder.name}
                className="team-photo"
                style={{ width: 160, height: 160, borderRadius: "50%" }}
              />
              <h3 className="display-font mt-4" style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0f1c2e" }}>
                {team.founder.name}
              </h3>
              <p style={{ color: "#C9A84C", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {team.founder.role}
              </p>
            </div>

            {/* Co-founders */}
            <div className="divider-line" style={{ margin: "0 auto 3rem" }}></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {team.cofounders.map((p) => (
                <div key={p.name} className="flex flex-col items-center text-center">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="team-photo"
                    style={{ width: 130, height: 130, borderRadius: "50%" }}
                  />
                  <h3 className="display-font mt-4" style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f1c2e" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.82rem", maxWidth: 200 }}>{p.role}</p>
                </div>
              ))}
            </div>

            {/* Core team */}
            <div className="divider-line" style={{ margin: "0 auto 3rem" }}></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {team.core.map((p) => (
                <div key={p.name} className="flex flex-col items-center text-center">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="team-photo"
                    style={{ width: 110, height: 110, borderRadius: "50%" }}
                  />
                  <h3 style={{ marginTop: "1rem", fontWeight: 600, fontSize: "1rem", color: "#0f1c2e" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{p.role}</p>
                </div>
              ))}
            </div>

            {/* Interns */}
            <div className="divider-line" style={{ margin: "0 auto 3rem" }}></div>
            <p className="section-label text-center mb-8">Tim Intern</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {team.interns.map((p) => (
                <div key={p.name} className="flex flex-col items-center text-center">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="team-photo"
                    style={{ width: 90, height: 90, borderRadius: "50%" }}
                  />
                  <h3 style={{ marginTop: "0.75rem", fontWeight: 600, fontSize: "0.88rem", color: "#0f1c2e" }}>
                    {p.name}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA / CLOSING ─── */}
        <section className="cta-section">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <p className="section-label mb-6" style={{ color: "#C9A84C" }}>Bergabunglah Bersama Kami</p>
            <p
              className="display-font text-white"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, lineHeight: 1.5, fontStyle: "italic" }}
            >
              "Kami tidak hanya membangun bisnis — kami membangun harapan, peluang,
              dan masa depan yang lebih baik bagi setiap pelaku usaha Indonesia
              yang berani bermimpi."
            </p>
            <div className="divider-line" style={{ margin: "2rem auto" }}></div>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
              Jadilah bagian dari ekosistem yang terus tumbuh bersama Anda.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;