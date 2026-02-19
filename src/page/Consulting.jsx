import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";
import {
  CalendarToday,
  WatchLater,
  WhatsApp,
  Close,
  CheckCircle,
  Favorite,
  Star,
  ArrowForward,
  Groups,
  EmojiEvents,
  Lightbulb,
  TrendingUp,
  Chat,
  WorkspacePremium,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Box,
  Divider,
  Button,
  Grid,
  Typography,
} from "@mui/material";

// ─── STATIC DATA ───────────────────────────────────────
const BENEFITS = [
  { icon: <Lightbulb sx={{ fontSize: 26 }} />, title: "Strategi Tepat Sasaran", desc: "Dapatkan arahan konkret yang disesuaikan dengan kondisi nyata bisnis Anda." },
  { icon: <TrendingUp sx={{ fontSize: 26 }} />, title: "Percepat Pertumbuhan", desc: "Hindari trial & error. Mentor kami bantu Anda temukan jalur terpendek menuju sukses." },
  { icon: <Chat sx={{ fontSize: 26 }} />, title: "Diskusi Langsung", desc: "Sesi 1-on-1 via WhatsApp. Tanyakan apa saja seputar bisnis Anda tanpa batas." },
  { icon: <WorkspacePremium sx={{ fontSize: 26 }} />, title: "Mentor Berpengalaman", desc: "Semua mentor kami adalah praktisi bisnis dengan rekam jejak yang sudah terbukti." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Pilih Mentor", desc: "Lihat profil dan keahlian mentor, pilih yang paling sesuai dengan kebutuhan bisnis Anda." },
  { step: "02", title: "Jadwalkan via WhatsApp", desc: "Klik tombol dan kirim pesan ke tim kami untuk menentukan waktu konsultasi." },
  { step: "03", title: "Sesi Konsultasi", desc: "Diskusi langsung dengan mentor selama sesi berlangsung, bebas tanya apa saja." },
  { step: "04", title: "Action Plan", desc: "Dapatkan rencana tindakan konkret yang bisa langsung diimplementasikan." },
];

const TOPICS = [
  "Strategi pemasaran digital", "Manajemen keuangan UMKM", "Branding & positioning",
  "Scaling up bisnis", "E-commerce & marketplace", "Operasional & SDM",
  "Pitching ke investor", "Legalitas usaha",
];

// ─── COMPONENT ─────────────────────────────────────────
const Consulting = ({ currentPath }) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    axios.get(endpoint.getMentor)
      .then((res) => setMentors(res.data.data))
      .catch((err) => console.error("Error fetching mentor data", err));
  }, []);

  const handleWhatsApp = (mentor) => {
    const msg = `Halo min, saya ingin berkonsultasi dengan mentor ${mentor.name}. Bisa bantu jadwalkan?`;
    window.open(`https://wa.me/6285281252199?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const DAY_LABELS = {
    monday: "Sen", tuesday: "Sel", wednesday: "Rab",
    thursday: "Kam", friday: "Jum", saturday: "Sab", sunday: "Min",
  };
  const dayLabel = (d) => d ? (DAY_LABELS[d.toLowerCase()] || d) : d;

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .syne { font-family: 'Syne', sans-serif; }

        .mentor-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          border: 1px solid rgba(214,19,85,0.07);
          transition: all 0.28s ease;
          cursor: pointer;
        }
        .mentor-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 20px 50px rgba(214,19,85,0.16) !important;
        }
        .mentor-img { transition: transform 0.4s ease; }
        .mentor-card:hover .mentor-img { transform: scale(1.04); }

        .benefit-card {
          background: white; border-radius: 16px; padding: 28px;
          border: 1px solid rgba(0,0,0,0.06);
          transition: all 0.22s ease;
          height: 100%;
        }
        .benefit-card:hover { background: #fff0f4; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(214,19,85,0.1); }

        .step-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px; padding: 28px;
          backdrop-filter: blur(8px);
          transition: all 0.22s ease;
        }
        .step-card:hover { background: rgba(255,255,255,0.12); transform: translateY(-4px); }

        .topic-chip {
          display: inline-block;
          background: white;
          border: 1px solid rgba(214,19,85,0.18);
          color: #d61355;
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 0.83rem;
          font-weight: 600;
          margin: 4px;
          transition: all 0.18s;
          cursor: default;
        }
        .topic-chip:hover { background: #d61355; color: white; transform: scale(1.04); }

        .charity-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          padding: 40px;
          text-align: center;
        }

        .pulse-heart { animation: heartbeat 1.5s ease-in-out infinite; }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }

        .floating-badge { animation: float 3.5s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <Navbar currentPath={currentPath} />

      {/* ─── HERO ─── */}
      <div style={{
        background: "linear-gradient(135deg, #8b0535 0%, #d61355 50%, #ff6b6b 100%)",
        color: "white", textAlign: "center",
        padding: "96px 16px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        {[
          { w: 400, t: -140, r: -100, op: 0.06 },
          { w: 250, b: -80, l: -60, op: 0.05 },
          { w: 180, t: "35%", l: "8%", op: 0.04 },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            width: c.w, height: c.w,
            top: c.t, bottom: c.b, left: c.l, right: c.r,
            background: "white", opacity: c.op, pointerEvents: "none",
          }} />
        ))}

        {/* Floating stat */}
        <div className="floating-badge" style={{
          position: "absolute", top: 100, right: 60,
          background: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.22)", borderRadius: 16,
          padding: "14px 20px", display: "none",
          // show on md+
        }}>
          <div style={{ fontSize: "0.68rem", opacity: 0.75, fontWeight: 700 }}>Sudah membantu</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 900, lineHeight: 1.1 }}>200+</div>
          <div style={{ fontSize: "0.68rem", opacity: 0.7 }}>pelaku UMKM</div>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 40, padding: "6px 18px", marginBottom: 24,
            fontSize: "0.82rem", fontWeight: 700,
          }}>
            🎯 Konsultasi 1-on-1 dengan Praktisi Bisnis
          </div>

          <h1 className="syne" style={{
            fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
            fontWeight: 800, lineHeight: 1.12,
            marginBottom: 20, letterSpacing: "-0.02em",
          }}>
            Bangun Bisnis Lebih Cepat<br />
            Bersama Mentor Ahli
          </h1>

          <p style={{ fontSize: "1.05rem", opacity: 0.9, lineHeight: 1.85, marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
            Terhubung langsung dengan mentor berpengalaman. Dapatkan strategi nyata,
            bukan teori — untuk bisnis Anda yang lebih maju.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/6285281252199"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #25D366, #1ebe52)",
                color: "white", fontWeight: 800,
                padding: "14px 32px", borderRadius: 12,
                fontSize: "1rem", textDecoration: "none",
                boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
              }}
            >
              <WhatsApp style={{ fontSize: 20 }} />
              Konsultasi via WhatsApp
            </a>
            <a
              href="#mentor-list"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                color: "white", fontWeight: 700,
                padding: "14px 28px", borderRadius: 12,
                fontSize: "1rem", textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              Lihat Mentor
              <ArrowForward style={{ fontSize: 18 }} />
            </a>
          </div>

          {/* Trust row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 36, flexWrap: "wrap" }}>
            {["✅ Gratis Konsultasi Awal", "✅ Mentor Berpengalaman", "✅ Hasil Nyata & Terukur"].map((t) => (
              <span key={t} style={{ fontSize: "0.82rem", opacity: 0.82 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── BENEFITS ─── */}
      <div style={{ background: "white", padding: "80px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              display: "inline-block", background: "#fff0f4", color: "#d61355",
              fontWeight: 700, borderRadius: 40, padding: "5px 18px",
              fontSize: "0.82rem", marginBottom: 14,
            }}>Mengapa Konsultasi dengan Kami?</span>
            <h2 className="syne" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em", margin: 0 }}>
              Satu Sesi Bisa Mengubah Arah Bisnis Anda
            </h2>
            <p style={{ color: "#6b7280", marginTop: 10, maxWidth: 440, margin: "10px auto 0", lineHeight: 1.8, fontSize: "0.93rem" }}>
              Jangan habiskan waktu dan modal pada strategi yang salah arah
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
            {BENEFITS.map((b) => (
              <div className="benefit-card" key={b.title}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, marginBottom: 16,
                  background: "#fff0f4", color: "#d61355",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {b.icon}
                </div>
                <div style={{ fontWeight: 800, color: "#1a1a2e", fontSize: "1rem", marginBottom: 8 }}>{b.title}</div>
                <div style={{ color: "#6b7280", fontSize: "0.86rem", lineHeight: 1.75 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1535 100%)", padding: "80px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              display: "inline-block", background: "rgba(214,19,85,0.25)", color: "#ff9ab2",
              fontWeight: 700, borderRadius: 40, padding: "5px 18px",
              fontSize: "0.82rem", marginBottom: 14,
            }}>Cara Kerja</span>
            <h2 className="syne" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "white", letterSpacing: "-0.02em", margin: 0 }}>
              4 Langkah Mudah Mulai Konsultasi
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {HOW_IT_WORKS.map((s, i) => (
              <div className="step-card" key={i}>
                <div style={{
                  fontFamily: "Syne, sans-serif", fontSize: "2.4rem", fontWeight: 900,
                  color: "rgba(214,19,85,0.35)", lineHeight: 1, marginBottom: 12,
                }}>{s.step}</div>
                <div style={{ fontWeight: 800, color: "white", fontSize: "1rem", marginBottom: 8 }}>{s.title}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.75 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TOPICS ─── */}
      <div style={{ background: "#f9f9f9", padding: "72px 16px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <span style={{
            display: "inline-block", background: "#fff0f4", color: "#d61355",
            fontWeight: 700, borderRadius: 40, padding: "5px 18px",
            fontSize: "0.82rem", marginBottom: 14,
          }}>Topik Konsultasi</span>
          <h2 className="syne" style={{ fontSize: "clamp(1.8rem, 4vw, 2.3rem)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Apa yang Bisa Anda Tanyakan?
          </h2>
          <p style={{ color: "#6b7280", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Mentor kami siap mendiskusikan berbagai aspek bisnis Anda
          </p>
          <div>
            {TOPICS.map((t) => (
              <span className="topic-chip" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MENTOR LIST ─── */}
      <div id="mentor-list" style={{ padding: "80px 16px", background: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{
              display: "inline-block", background: "#fff0f4", color: "#d61355",
              fontWeight: 700, borderRadius: 40, padding: "5px 18px",
              fontSize: "0.82rem", marginBottom: 14,
            }}>Tim Mentor</span>
            <h2 className="syne" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.02em", margin: 0 }}>
              Kenali Mentor Kami
            </h2>
            <p style={{ color: "#6b7280", marginTop: 10, fontSize: "0.92rem", lineHeight: 1.8 }}>
              Klik kartu mentor untuk melihat profil lengkap
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="mentor-card"
                onClick={() => setSelectedMentor(mentor)}
              >
                {/* Image */}
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img
                    className="mentor-img"
                    src={mentor.thumbnail}
                    alt={mentor.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                  }} />
                  <div style={{
                    position: "absolute", bottom: 14, left: 16,
                  }}>
                    <div style={{ color: "white", fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.2 }}>{mentor.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", marginTop: 2 }}>{mentor.position}</div>
                  </div>
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: "rgba(214,19,85,0.9)", color: "white",
                    borderRadius: 20, padding: "3px 10px", fontSize: "0.7rem", fontWeight: 700,
                  }}>
                    Lihat Profil
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "18px 20px 20px" }}>
                  <div style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4b5563", fontSize: "0.83rem" }}>
                      <CalendarToday style={{ fontSize: 15, color: "#d61355" }} />
                      <span>{dayLabel(mentor.day_start_available)} – {dayLabel(mentor.day_end_available)}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4b5563", fontSize: "0.83rem" }}>
                      <WatchLater style={{ fontSize: 15, color: "#d61355" }} />
                      <span>{mentor.opening_hour} – {mentor.closing_hour}</span>
                    </div>
                  </div>

                  {mentor.expertise && (
                    <div style={{ marginBottom: 14 }}>
                      {(Array.isArray(mentor.expertise) ? mentor.expertise : [mentor.expertise]).slice(0, 2).map((e, i) => (
                        <span key={i} style={{
                          display: "inline-block", background: "#fff0f4", color: "#d61355",
                          borderRadius: 20, padding: "3px 10px", fontSize: "0.73rem",
                          fontWeight: 600, marginRight: 6, marginBottom: 4,
                        }}>{e}</span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); handleWhatsApp(mentor); }}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                      color: "white", fontWeight: 700, border: "none",
                      borderRadius: 10, padding: "11px 0", fontSize: "0.88rem",
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 8,
                      transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #b50f47, #e85555)"}
                    onMouseOut={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #d61355, #ff6b6b)"}
                  >
                    <WhatsApp style={{ fontSize: 18 }} />
                    Jadwalkan Konsultasi
                  </button>
                </div>
              </div>
            ))}
          </div>

          {mentors.length === 0 && (
            <div style={{ textAlign: "center", color: "#9ca3af", padding: "60px 0" }}>
              <Groups style={{ fontSize: 56, marginBottom: 12 }} />
              <p>Memuat data mentor...</p>
            </div>
          )}
        </div>
      </div>

      {/* ─── CHARITY ─── */}
      <div style={{
        background: "linear-gradient(135deg, #8b0535 0%, #d61355 55%, #ff6b6b 100%)",
        padding: "80px 16px",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="charity-card">
            <div className="pulse-heart" style={{ marginBottom: 16 }}>
              <Favorite style={{ fontSize: 48, color: "#ff6b9d" }} />
            </div>
            <h2 className="syne" style={{
              color: "white", fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 800, marginBottom: 14, letterSpacing: "-0.02em",
            }}>
              Konsultasi = Amal Nyata
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.02rem", lineHeight: 1.85, marginBottom: 10, maxWidth: 540, margin: "0 auto 10px" }}>
              Seluruh hasil dari sesi konsultasi bulan ini akan didonasikan untuk
              membantu saudara-saudara kita di <strong>Palestina</strong> dan masyarakat
              Indonesia yang membutuhkan.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", marginBottom: 32 }}>
              Bisnis Anda tumbuh — sekaligus berbagi kebaikan untuk sesama.
            </p>

            {/* Impact numbers */}
            <div style={{
              display: "flex", justifyContent: "center", gap: 40,
              marginBottom: 36, flexWrap: "wrap",
            }}>
              {[
                { val: "100%", label: "Donasi Tersalurkan" },
                { val: "Transparan", label: "Laporan Terbuka" },
                { val: "Nyata", label: "Dampak Langsung" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "1.6rem", color: "white", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="https://forms.gle/v8t9tGLxRTo9mwiU9"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "white", color: "#d61355",
                fontWeight: 800, padding: "14px 36px", borderRadius: 12,
                fontSize: "1rem", textDecoration: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "all 0.2s",
              }}
            >
              <EmojiEvents style={{ fontSize: 20 }} />
              Mentoring & Donasi Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* ─── MENTOR DETAIL MODAL ─── */}
      <Dialog
        open={!!selectedMentor}
        onClose={() => setSelectedMentor(null)}
        maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        {selectedMentor && (
          <>
            <Box sx={{ position: "relative" }}>
              <Box sx={{ height: 260, overflow: "hidden" }}>
                <img
                  src={selectedMentor.thumbnail}
                  alt={selectedMentor.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
              </Box>
              <Box sx={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)",
              }} />
              <IconButton
                onClick={() => setSelectedMentor(null)}
                sx={{
                  position: "absolute", top: 12, right: 12,
                  background: "rgba(0,0,0,0.45)", color: "white",
                  "&:hover": { background: "rgba(0,0,0,0.65)" },
                }}
              >
                <Close />
              </IconButton>
              <Box sx={{ position: "absolute", bottom: 16, left: 20 }}>
                <Typography fontWeight={900} color="white" fontSize="1.4rem" lineHeight={1.2}
                  sx={{ fontFamily: "Syne, sans-serif" }}>
                  {selectedMentor.name}
                </Typography>
                <Typography color="rgba(255,255,255,0.8)" fontSize="0.85rem" mt={0.5}>
                  {selectedMentor.position}
                </Typography>
              </Box>
            </Box>

            <DialogContent sx={{ p: 3.5 }}>
              {selectedMentor.bio && (
                <Typography color="#4b5563" lineHeight={1.85} fontSize="0.9rem" mb={2.5}>
                  {selectedMentor.bio}
                </Typography>
              )}

              {selectedMentor.expertise && (
                <Box mb={2.5}>
                  <Typography fontWeight={800} color="#1a1a2e" fontSize="0.88rem" mb={1}>
                    Keahlian
                  </Typography>
                  <Box>
                    {(Array.isArray(selectedMentor.expertise) ? selectedMentor.expertise : [selectedMentor.expertise]).map((e, i) => (
                      <Chip key={i} label={e} size="small" sx={{
                        mr: 0.8, mb: 0.8, background: "#fff0f4",
                        color: "#d61355", fontWeight: 700, fontSize: "0.78rem",
                      }} />
                    ))}
                  </Box>
                </Box>
              )}

              <Divider sx={{ my: 2.5 }} />

              <Typography fontWeight={800} color="#1a1a2e" fontSize="0.88rem" mb={1.5}>
                Jadwal Tersedia
              </Typography>
              <Box display="flex" gap={3} mb={3} flexWrap="wrap">
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarToday sx={{ fontSize: 16, color: "#d61355" }} />
                  <Typography fontSize="0.88rem" color="#374151">
                    {selectedMentor.day_start_available} – {selectedMentor.day_end_available}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <WatchLater sx={{ fontSize: 16, color: "#d61355" }} />
                  <Typography fontSize="0.88rem" color="#374151">
                    {selectedMentor.opening_hour} – {selectedMentor.closing_hour}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ background: "#f0fdf4", borderRadius: 2.5, p: 2, mb: 3, display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <CheckCircle sx={{ color: "#16a34a", fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                <Typography fontSize="0.82rem" color="#15803d" lineHeight={1.7}>
                  Konsultasi dilakukan via WhatsApp. Setelah klik tombol di bawah, tim kami akan
                  membantu menjadwalkan sesi Anda dengan mentor ini.
                </Typography>
              </Box>

              <Button
                fullWidth variant="contained" size="large"
                startIcon={<WhatsApp />}
                onClick={() => { handleWhatsApp(selectedMentor); setSelectedMentor(null); }}
                sx={{
                  background: "linear-gradient(135deg, #25D366, #1ebe52)",
                  color: "white", fontWeight: 800, borderRadius: 2.5,
                  py: 1.5, boxShadow: "none", fontSize: "0.95rem",
                  "&:hover": { background: "linear-gradient(135deg, #1db954, #159a3f)" },
                }}
              >
                Jadwalkan Konsultasi dengan {selectedMentor.name.split(" ")[0]}
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Consulting;