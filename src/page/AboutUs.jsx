import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

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

const allMembers = [
  { name: "Amir Faisal Karimullah", role: "Founder & CEO",                              tier: "Founder",    img: "/teams/faisal.jpg" },
  { name: "Arby Pratama",           role: "Co-Founder & Chief Business Development",     tier: "Co-Founder", img: "/teams/arby.jpg" },
  { name: "Arba'in Prasetyo",       role: "Co-Founder & Chief Marketing Officer",        tier: "Co-Founder", img: "/teams/arbain.jpg" },
  { name: "Rizky Septiana Adjie",   role: "Legal Officer",                               tier: "Tim Inti",   img: "/teams/RizkySeptianaAdjie.png" },
  { name: "Dewi Sri Tunjungsari",   role: "Business Development & Partnership",          tier: "Tim Inti",   img: "/teams/dewi.png" },
  { name: "Puspita Putri",          role: "Head of Administration Intern",               tier: "Tim Intern", img: "/teams/putri.jpg" },
  { name: "Rizki Lestari",          role: "Graphic Designer Intern",                     tier: "Tim Intern", img: "/teams/tari.jpg" },
  { name: "Muhromin",               role: "Fullstack Developer Intern",                  tier: "Tim Intern", img: "/teams/muhromin.jpeg" },
];

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
    <div className="w-full min-h-screen text-gray-900 about-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .about-page, .about-page * { box-sizing: border-box; }
        .about-root { font-family: 'DM Sans', sans-serif; background: #FAF9F6; }
        .display-font { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Hero ── */
        .hero-bg {
          background: linear-gradient(135deg, #0f1c2e 0%, #1a3a5c 60%, #0d2035 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(99,179,237,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(246,173,85,0.06) 0%, transparent 50%);
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to top, #FAF9F6, transparent);
        }

        /* ── Stats & values ── */
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

        /* ══════════════════════════
           TEAM CARD — cinematic
        ══════════════════════════ */
        .team-card {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          background: #0d1624;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        /* photo */
        .team-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition:
            transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94),
            filter   0.65s ease;
          filter: grayscale(20%) brightness(0.88);
          will-change: transform, filter;
        }
        .team-card:hover .team-card__img {
          transform: scale(1.09);
          filter: grayscale(0%) brightness(0.55);
        }

        /* always-visible tier badge */
        .team-card__badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 10;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0f1c2e;
          background: #C9A84C;
          padding: 4px 11px;
          border-radius: 100px;
        }

        /* slide-up overlay */
        .team-card__overlay {
          position: absolute;
          inset: auto 0 0 0;
          z-index: 5;
          padding: 2.25rem 1.6rem 1.8rem;
          background: linear-gradient(
            to top,
            rgba(8,14,26,0.97) 0%,
            rgba(8,14,26,0.80) 55%,
            transparent 100%
          );
          transform: translateY(100%);
          transition: transform 0.46s cubic-bezier(0.25,0.46,0.45,0.94);
          will-change: transform;
        }
        .team-card:hover .team-card__overlay {
          transform: translateY(0);
        }

        /* gold line that stretches wider on hover */
        .team-card__line {
          width: 34px;
          height: 2px;
          background: #C9A84C;
          border-radius: 2px;
          margin-bottom: 0.7rem;
          transition: width 0.38s 0.12s ease;
        }
        .team-card:hover .team-card__line { width: 56px; }

        .team-card__name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 0.3rem;
        }
        .team-card__role {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        /* ══════════════════════════
           SWIPER overrides
        ══════════════════════════ */
        .team-swiper {
          width: 100% !important;
          padding: 1.5rem 0 4rem !important;
          overflow: visible !important;
        }
        /* dim non-active slides */
        .team-swiper .swiper-slide {
          opacity: 0.5;
          transform: scale(0.87);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .team-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
        .team-swiper .swiper-slide-prev,
        .team-swiper .swiper-slide-next {
          opacity: 0.75;
          transform: scale(0.93);
        }

        /* pill pagination */
        .team-swiper .swiper-pagination-bullet {
          background: #C9A84C;
          opacity: 0.3;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .team-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 28px;
          border-radius: 4px;
        }

        /* nav buttons */
        .team-swiper .swiper-button-prev,
        .team-swiper .swiper-button-next {
          color: #C9A84C;
          background: rgba(12,21,32,0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.22);
          top: 42%;
          transition: background 0.2s, border-color 0.2s;
        }
        .team-swiper .swiper-button-prev:hover,
        .team-swiper .swiper-button-next:hover {
          background: rgba(201,168,76,0.18);
          border-color: rgba(201,168,76,0.55);
        }
        .team-swiper .swiper-button-prev::after,
        .team-swiper .swiper-button-next::after {
          font-size: 13px;
          font-weight: 900;
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
            <p className="text-gray-300 mt-6 max-w-2xl mx-auto" style={{ fontSize: "1.1rem", lineHeight: 1.8, fontWeight: 300 }}>
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
                <div className="display-font" style={{ fontSize: "2.8rem", fontWeight: 700, color: "#0f1c2e" }}>
                  {s.value}
                </div>
                <div className="divider-line" style={{ margin: "0.5rem auto" }} />
                <p style={{ fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── VISI & MISI ─── */}
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
              <h2 className="display-font text-white" style={{ fontSize: "2.5rem", fontWeight: 600 }}>
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
              { year: "2021", title: "Lahirnya Sebuah Gagasan",     desc: "Muncul kesadaran akan kebutuhan nyata para pelaku UMKM Indonesia akan ekosistem dukungan yang terintegrasi—dari sisi strategi, jaringan, hingga legalitas." },
              { year: "2022", title: "Membangun Fondasi",           desc: "Tim inti terbentuk. Penandatanganan MoU pertama menjadi tonggak awal komitmen kami terhadap kolaborasi yang serius dan berorientasi dampak." },
              { year: "2023", title: "Ekspansi & Kemitraan",        desc: "Kami mulai menjalin kemitraan strategis dengan berbagai institusi dan komunitas bisnis, memperluas jangkauan program ke lebih banyak pelaku UMKM." },
              { year: "2024", title: "Penguatan Sistem & Produk",   desc: "Fokus pada pengembangan produk yang terstruktur, penataan legalitas, dan peningkatan kapasitas tim untuk memberikan layanan yang lebih profesional dan berdampak." },
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
                  <h3 style={{ fontWeight: 600, fontSize: "1.05rem", color: "#0f1c2e", marginBottom: "0.4rem" }}>{m.title}</h3>
                  <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: "0.92rem" }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── TIM — Cinematic Coverflow Carousel ─── */}
        <section style={{ background: "#0b1420" }} className="py-24 relative overflow-hidden">
          {/* Ambient glow blob behind carousel */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw", height: "60vh",
            maxWidth: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <p className="section-label mb-3">Tim Kami</p>
              <h2
                className="display-font text-white"
                style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, lineHeight: 1.15 }}
              >
                Orang-Orang di Balik Misi Ini
              </h2>
              <p style={{ color: "rgba(255,255,255,0.38)", marginTop: "0.65rem", fontStyle: "italic", fontSize: "0.9rem" }}>
                Hover pada foto untuk mengenal mereka lebih dekat
              </p>
            </motion.div>
          </div>

          {/* Full-width Swiper */}
          <Swiper
            modules={[Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 6,
              stretch: 0,
              depth: 140,
              modifier: 1.6,
              slideShadows: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            className="team-swiper"
            style={{ paddingLeft: "6vw", paddingRight: "6vw" }}
          >
            {allMembers.map((p, i) => (
              <SwiperSlide
                key={p.name + i}
                style={{ width: "260px", maxWidth: "72vw" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="team-card"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="team-card__img"
                  />
                  <span className="team-card__badge">{p.tier}</span>
                  <div className="team-card__overlay">
                    <div className="team-card__line" />
                    <div className="team-card__name">{p.name}</div>
                    <div className="team-card__role">{p.role}</div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* ─── COMPANY IDENTITY ─── */}
        <section className="max-w-5xl mx-auto px-6 py-20 border-t">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <p className="section-label mb-3">Identitas Perusahaan</p>
              <h2 className="display-font" style={{ fontSize: "2.5rem", fontWeight: 600, color: "#0f1c2e" }}>
                PT. Tri Sinergi Digital
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Akademi UMKM Digital adalah platform yang dikelola oleh <strong>PT. Tri Sinergi Digital</strong>. 
                Kami berkomitmen untuk mendukung ekosistem UMKM melalui inovasi teknologi dan pendampingan bisnis yang berkelanjutan.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="font-bold text-[#0f1c2e] mb-2">Office 1 (Jakarta)</h3>
                <p className="text-gray-600">
                  Wisma Keiai Lantai 14 Unit 1410, Jalan Jenderal Sudirman Nomor Kav.3, Jakarta, Indonesia
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[#0f1c2e] mb-2">Office 2 (Bandung)</h3>
                <p className="text-gray-600">
                  Bandung Creative Hub Lantai 5, Jl. Laswi No.7, Kacapiring, Kec. Batununggal, Kota Bandung, Jawa Barat 40271
                </p>
              </div>
            </div>
          </motion.div>
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
            <div className="divider-line" style={{ margin: "2rem auto" }} />
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