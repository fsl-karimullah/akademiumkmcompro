import React, { useEffect, useState, useRef } from "react";
import { Avatar } from "@mui/material";
import {
  School, AccessTime, WorkspacePremium, Group, Code, Chat, MenuBook,
  ArrowForward, CheckCircle, StarRate, TrendingUp, Bolt, EmojiEvents,
} from "@mui/icons-material";
import Slider from "react-slick";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { endpoint } from "../../endpoint/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { div } from "framer-motion/client";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const FONT_LINK = document.createElement("link");
FONT_LINK.rel = "stylesheet";
FONT_LINK.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,700&display=swap";
if (!document.querySelector('link[href*="Plus+Jakarta"]')) document.head.appendChild(FONT_LINK);

const CSS = `
  :root {
    --primary: #d61355;
    --themeRed: #f54748;
    --themeRedHover: #d32f2f;
    --themeBlack: #2e2e2e;
    --dark: #0d0d0d;
    --dark2: #161616;
    --cream: #fdf8f5;
    --border: rgba(255,255,255,0.08);
  }
  .lpc-wrap * { box-sizing: border-box; }
  .lpc-wrap {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #fff;
    color: var(--themeBlack);
    overflow-x: hidden;
  }
  .display-font { font-family: 'Fraunces', serif; }

  /* ── Hero ── */
  .hero-section {
    min-height: 100vh;
    background: var(--dark);
    position: relative;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 140px 24px 100px;
    overflow: hidden;
  }
  .hero-bg-img {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600');
    background-size: cover; background-position: center;
    opacity: 0.08;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%);
  }
  .hero-glow {
    position: absolute; top: 40%; left: 50%;
    transform: translate(-50%,-50%);
    width: 700px; height: 500px;
    background: radial-gradient(ellipse, rgba(214,19,85,0.18) 0%, transparent 65%);
    pointer-events: none; filter: blur(30px);
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(214,19,85,0.12);
    border: 1px solid rgba(214,19,85,0.3);
    border-radius: 100px;
    padding: 7px 18px;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #ff6b7a;
    margin-bottom: 28px;
  }
  .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--themeRed); animation:dot-pulse 2s infinite; }
  @keyframes dot-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }
  .hero-h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 900;
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: #fff;
    margin-bottom: 24px;
    max-width: 900px;
  }
  .hero-h1 .red { color: var(--themeRed); font-style: italic; }
  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255,255,255,0.55);
    max-width: 560px;
    margin: 0 auto 14px;
    line-height: 1.7;
    font-weight: 400;
  }
  .hero-note {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.35);
    max-width: 500px;
    margin: 0 auto 44px;
    line-height: 1.65;
  }
  .hero-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 64px; }
  .btn-hero-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: linear-gradient(135deg, var(--primary), var(--themeRed));
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem; font-weight: 700;
    padding: 16px 34px; border-radius: 100px; border: none; cursor: pointer;
    text-decoration: none;
    box-shadow: 0 8px 32px rgba(214,19,85,0.4);
    transition: transform .2s, box-shadow .2s;
  }
  .btn-hero-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 14px 40px rgba(214,19,85,0.5); }
  .btn-hero-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent;
    color: rgba(255,255,255,0.6);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    padding: 15px 28px; border-radius: 100px;
    border: 1px solid rgba(255,255,255,0.15); cursor: pointer; text-decoration: none;
    transition: border-color .2s, color .2s, background .2s;
  }
  .btn-hero-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; background: rgba(255,255,255,0.05); }

  /* Hero stat pills */
  .hero-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .stat-pill {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 10px 20px;
  }
  .stat-pill-num { font-family:'Fraunces',serif; font-size:1.2rem; font-weight:700; color:#fff; line-height:1; }
  .stat-pill-lbl { font-size:0.75rem; color:rgba(255,255,255,0.4); line-height:1.3; }
  .stat-pill-icon { font-size:1.1rem; }

  /* Scroll hint */
  .scroll-hint {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    animation: scrollBob 2s ease-in-out infinite;
  }
  @keyframes scrollBob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
  .scroll-line { width:1px; height:36px; background:linear-gradient(180deg,transparent,rgba(255,255,255,0.3)); }
  .scroll-lbl { font-size:0.65rem; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,0.25); }

  /* ── Section wrapper ── */
  .lpc-section { padding: 100px 24px; }
  .lpc-section.bg-cream { background: var(--cream); }
  .lpc-section.bg-light { background: #f8f9fb; }
  .lpc-section.bg-dark { background: var(--dark); color: #fff; }
  .lpc-section.bg-red { background: var(--primary); color: #fff; }
  .inner { max-width: 1160px; margin: 0 auto; }
  .inner-md { max-width: 860px; margin: 0 auto; }
  .inner-sm { max-width: 680px; margin: 0 auto; }

  /* Section header */
  .sec-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--primary); margin-bottom: 16px;
  }
  .sec-eyebrow::before { content:''; width:18px; height:2px; background:var(--primary); border-radius:1px; }
  .sec-h2 {
    font-family: 'Fraunces', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900; line-height: 1.1;
    letter-spacing: -0.025em;
    margin-bottom: 16px;
  }
  .sec-sub { font-size:1.0625rem; color:rgba(46,46,46,0.6); line-height:1.7; max-width:580px; }
  .sec-sub.center { text-align:center; margin:0 auto; }
  .center-hdr { text-align: center; }

  /* ── WHY SECTION ── */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 56px;
  }
  .benefit-card {
    background: #fff;
    border-radius: 20px;
    padding: 36px 28px;
    border: 1px solid #f0e8e8;
    position: relative; overflow: hidden;
    transition: transform .3s, box-shadow .3s, border-color .3s;
    cursor: default;
  }
  .benefit-card::after {
    content: '';
    position: absolute; bottom:0; left:0; right:0; height:3px;
    background: linear-gradient(90deg, var(--primary), var(--themeRed));
    transform: scaleX(0); transition: transform .3s; transform-origin: left;
  }
  .benefit-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(214,19,85,0.1); border-color: rgba(214,19,85,0.2); }
  .benefit-card:hover::after { transform: scaleX(1); }
  .benefit-icon-wrap {
    width: 56px; height: 56px; border-radius: 14px;
    background: rgba(214,19,85,0.08);
    border: 1px solid rgba(214,19,85,0.15);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
  }
  .benefit-num {
    font-family:'Fraunces',serif;
    font-size: 3.5rem; font-weight: 900;
    color: rgba(214,19,85,0.07);
    line-height: 1; position: absolute;
    top: 16px; right: 20px;
    letter-spacing: -0.05em;
  }
  .benefit-title {
    font-family:'Fraunces',serif;
    font-size: 1.15rem; font-weight: 700;
    color: var(--themeBlack);
    margin-bottom: 10px; letter-spacing: -0.01em; line-height: 1.3;
  }
  .benefit-desc { font-size: 0.875rem; color: rgba(46,46,46,0.58); line-height: 1.65; }

  /* ── PROOF STRIP ── */
  .proof-strip {
    background: var(--dark2);
    padding: 48px 24px;
    overflow: hidden;
  }
  .proof-inner { max-width: 1160px; margin: 0 auto; display: flex; gap: 20px; align-items: stretch; flex-wrap: wrap; justify-content: center; }
  .proof-item {
    flex: 1; min-width: 220px; max-width: 260px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 28px 24px;
    text-align: center;
    transition: background .2s;
  }
  .proof-item:hover { background: rgba(214,19,85,0.08); border-color: rgba(214,19,85,0.2); }
  .proof-num {
    font-family:'Fraunces',serif;
    font-size: 2.5rem; font-weight: 900;
    color: #fff; line-height: 1; margin-bottom: 8px;
  }
  .proof-num span { color: var(--themeRed); }
  .proof-lbl { font-size: 0.82rem; color: rgba(255,255,255,0.45); line-height: 1.5; }

  /* ── MATERI ── */
  .materi-grid { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 52px; }
  .materi-pill {
    display: flex; align-items: center; gap: 10px;
    background: #fff;
    border: 1.5px solid #f0e0e5;
    border-radius: 16px;
    padding: 18px 28px;
    transition: border-color .2s, background .2s, transform .2s;
    cursor: default;
  }
  .materi-pill:hover { border-color: var(--primary); background: rgba(214,19,85,0.03); transform: translateY(-3px); }
  .materi-pill-icon { font-size:1.3rem; }
  .materi-pill-name { font-family:'Fraunces',serif; font-size:1.05rem; font-weight:700; color:var(--themeBlack); }
  .materi-pill-tag { font-size:0.68rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:3px 8px; border-radius:100px; background:rgba(214,19,85,0.1); color:var(--primary); }

  /* ── JOURNEY ── */
  .journey-steps { display:flex; flex-direction:column; gap:0; margin-top:52px; }
  .journey-step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 24px;
    padding-bottom: 40px;
    position: relative;
  }
  .journey-step:last-child { padding-bottom: 0; }
  .step-left { display:flex; flex-direction:column; align-items:center; }
  .step-dot {
    width:48px; height:48px; border-radius:14px;
    background: linear-gradient(135deg, var(--primary), var(--themeRed));
    display:flex; align-items:center; justify-content:center;
    font-family:'Fraunces',serif; font-size:1.1rem; font-weight:900;
    color:#fff; flex-shrink:0;
    box-shadow: 0 6px 20px rgba(214,19,85,0.3);
  }
  .step-line { flex:1; width:2px; background:linear-gradient(180deg,rgba(214,19,85,0.4),rgba(214,19,85,0.05)); margin-top:8px; }
  .step-body { padding-top:10px; }
  .step-title { font-family:'Fraunces',serif; font-size:1.2rem; font-weight:800; color:var(--themeBlack); margin-bottom:8px; letter-spacing:-0.01em; }
  .step-desc { font-size:.875rem; color:rgba(46,46,46,.6); line-height:1.65; }

  /* ── TESTIMONIAL ── */
  .testi-card {
    background:#fff; border-radius:20px; padding:32px;
    border:1px solid #efefef;
    transition: transform .2s, box-shadow .2s;
  }
  .testi-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.08); }
  .testi-stars { display:flex; gap:2px; margin-bottom:16px; }
  .testi-text { font-size:.9375rem; line-height:1.7; color:rgba(46,46,46,.75); font-style:italic; margin-bottom:20px; }
  .testi-author { display:flex; align-items:center; gap:12px; }
  .testi-av { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-weight:900; font-size:.95rem; color:#fff; flex-shrink:0; }
  .testi-name { font-size:.875rem; font-weight:700; color:var(--themeBlack); }
  .testi-role { font-size:.75rem; color:rgba(46,46,46,.45); }
  .testi-quote { font-size:3.5rem; line-height:.6; color:var(--primary); opacity:.2; margin-bottom:10px; font-family:'Fraunces',serif; display:block; }

  /* ── MENTOR ── */
  .mentor-card {
    text-align:center; padding:32px 20px;
    background:#fff; border-radius:20px; border:1px solid #f0f0f0;
    margin:8px; transition:transform .2s,box-shadow .2s;
  }
  .mentor-card:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(0,0,0,.1); }
  .mentor-av {
    width:90px; height:90px; border-radius:50%;
    margin:0 auto 16px;
    border:3px solid var(--primary);
    box-shadow:0 4px 16px rgba(214,19,85,.2);
  }
  .mentor-name { font-family:'Fraunces',serif; font-size:1rem; font-weight:800; color:var(--themeBlack); margin-bottom:4px; }
  .mentor-pos { font-size:.78rem; color:rgba(46,46,46,.5); }
  .mentor-tag { display:inline-block; margin-top:10px; font-size:.65rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:3px 10px; border-radius:100px; background:rgba(214,19,85,.1); color:var(--primary); border:1px solid rgba(214,19,85,.2); }

  /* ── FINAL CTA ── */
  .cta-section {
    background: var(--dark);
    padding: 120px 24px;
    text-align: center;
    position: relative; overflow: hidden;
  }
  .cta-glow {
    position:absolute; top:50%; left:50%;
    transform:translate(-50%,-50%);
    width:800px; height:500px;
    background:radial-gradient(ellipse,rgba(214,19,85,.15) 0%,transparent 65%);
    pointer-events:none; filter:blur(40px);
  }
  .cta-red-band {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(245,71,72,.12); border:1px solid rgba(245,71,72,.25);
    border-radius:100px; padding:6px 16px;
    font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
    color:var(--themeRed); margin-bottom:24px;
  }
  .cta-h {
    font-family:'Fraunces',serif;
    font-size:clamp(2.2rem,5vw,4rem);
    font-weight:900; line-height:1.08; letter-spacing:-.035em;
    color:#fff; margin-bottom:20px;
  }
  .cta-h em { font-style:italic; color:var(--themeRed); }
  .cta-sub { font-size:1.0625rem; color:rgba(255,255,255,.5); line-height:1.7; max-width:480px; margin:0 auto 44px; }
  .btn-cta-primary {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,var(--primary),var(--themeRed));
    color:#fff; font-family:'Plus Jakarta Sans',sans-serif;
    font-size:1.05rem; font-weight:700;
    padding:18px 40px; border-radius:100px; border:none; cursor:pointer;
    text-decoration:none;
    box-shadow:0 10px 36px rgba(214,19,85,.45);
    transition:transform .2s,box-shadow .2s;
  }
  .btn-cta-primary:hover { transform:translateY(-3px) scale(1.03); box-shadow:0 16px 44px rgba(214,19,85,.55); }
  .btn-cta-ghost {
    display:inline-flex; align-items:center; gap:8px;
    background:transparent; color:rgba(255,255,255,.5);
    font-family:'Plus Jakarta Sans',sans-serif; font-size:.95rem; font-weight:500;
    padding:17px 28px; border-radius:100px;
    border:1px solid rgba(255,255,255,.12); cursor:pointer; text-decoration:none;
    transition:border-color .2s,color .2s;
  }
  .btn-cta-ghost:hover { border-color:rgba(255,255,255,.3); color:#fff; }
  .cta-guarantees { display:flex; gap:24px; justify-content:center; flex-wrap:wrap; margin-top:40px; }
  .guarantee-item { display:flex; align-items:center; gap:8px; font-size:.82rem; color:rgba(255,255,255,.3); }
  .guarantee-item svg { color:rgba(214,19,85,.7) !important; font-size:1rem !important; }

  /* ── WA Float ── */
  .wa-float {
    position:fixed; bottom:24px; right:24px; z-index:1000;
    width:60px; height:60px; border-radius:50%;
    background:#25D366;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 6px 20px rgba(37,211,102,.35);
    text-decoration:none;
    animation:waBob 2s ease-in-out infinite;
  }
  @keyframes waBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  .wa-float:hover { transform:scale(1.1); animation:none; }

  /* ── General CTA button (mid-page) ── */
  .btn-red {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--primary); color:#fff;
    font-family:'Plus Jakarta Sans',sans-serif; font-size:1rem; font-weight:700;
    padding:15px 32px; border-radius:100px; border:none; cursor:pointer; text-decoration:none;
    box-shadow:0 6px 24px rgba(214,19,85,.3);
    transition:transform .2s,box-shadow .2s,background .2s;
  }
  .btn-red:hover { background:var(--themeRedHover); transform:translateY(-2px); box-shadow:0 10px 30px rgba(214,19,85,.4); }

  /* ── Responsive ── */
  @media(max-width:768px){
    .benefits-grid { grid-template-columns:1fr; }
    .lpc-section { padding:72px 20px; }
    .hero-stats { flex-direction:column; align-items:center; }
    .proof-inner { gap:12px; }
  }
  @media(max-width:1024px){
    .benefits-grid { grid-template-columns: repeat(2,1fr); }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const materi = [
  { icon: "🤝", name: "Mahir Affiliator",     tag: "Populer" },
  { icon: "🌐", name: "Mahir Website",         tag: "Trending" },
  { icon: "📣", name: "Online Marketing",      tag: "In Demand" },
  { icon: "✨", name: "Personal Branding",     tag: "Hot" },
  { icon: "📱", name: "Digital Marketing",     tag: "Populer" },
  { icon: "🎥", name: "Content Creation",      tag: "Baru" },
  { icon: "💰", name: "Financial Literacy",    tag: "Baru" },
];

const benefitItems = [
  { icon: <School sx={{ fontSize:26, color:"var(--primary)" }} />, title: "Belajar Praktis", desc: "Langsung praktik lewat project nyata, bukan teori doang. Kamu bakal punya portofolio sebelum lulus kelas.", num: "01" },
  { icon: <AccessTime sx={{ fontSize:26, color:"var(--primary)" }} />, title: "Akses Selamanya", desc: "Belajar kapan aja, sesuai mood dan waktu kamu. Tidak ada deadline, tidak ada tekanan jadwal.", num: "02" },
  { icon: <WorkspacePremium sx={{ fontSize:26, color:"var(--primary)" }} />, title: "Sertifikat Resmi", desc: "Sertifikat yang bisa kamu pajang di LinkedIn atau CV sebagai bukti nyata kemampuanmu.", num: "03" },
  { icon: <Group sx={{ fontSize:26, color:"var(--primary)" }} />, title: "Supportive Community", desc: "Temukan teman satu perjuangan, belajar bareng, dan saling support untuk tumbuh bersama.", num: "04" },
  { icon: <Code sx={{ fontSize:26, color:"var(--primary)" }} />, title: "Mentor Berpengalaman", desc: "Langsung dibimbing mentor yang pernah berada di posisimu dan sudah membuktikan hasilnya.", num: "05" },
  { icon: <Chat sx={{ fontSize:26, color:"var(--primary)" }} />, title: "Mentoring 1 on 1", desc: "Sesi eksklusif langsung bersama mentor, fokus pada masalah dan tujuan spesifik milikmu.", num: "06" },
];

const journeySteps = [
  { step: "01", title: "Daftar & Pilih Materi", desc: "Proses pendaftaran mudah dan cepat. Pilih materi yang sesuai dengan tujuan kariermu — dari digital marketing hingga personal branding." },
  { step: "02", title: "Belajar dengan Mentor Expert", desc: "Akses modul video, bahan bacaan, dan live session langsung bersama mentor yang sudah terbukti di bidangnya." },
  { step: "03", title: "Praktik & Bangun Portofolio", desc: "Setiap materi dirancang untuk langsung bisa dipraktikkan. Kamu akan punya project nyata sebagai bukti kemampuan." },
  { step: "04", title: "Dapat Sertifikat & Berkembang", desc: "Selesaikan kelas, raih sertifikat resmi, dan bergabung dengan komunitas alumni yang terus berkembang bersama." },
];

const testimonials = [
  { text: "Dulu aku nggak tau harus mulai dari mana. Setelah ikut kelas digital marketing di sini, dalam 3 bulan aku udah bisa dapet klien pertama.", name: "Ayu Rahmawati", role: "Freelance Digital Marketer", color: "#d61355", initial: "A" },
  { text: "Kelas personal branding-nya beneran mengubah cara aku presentasiin diri. LinkedIn-ku sekarang aktif dan recruiter udah mulai DM.", name: "Bagas Pratama", role: "Fresh Graduate, Hired in 2 months", color: "#2D4A2D", initial: "B" },
  { text: "Yang paling beda adalah mentornya beneran care. Bukan cuma ngasih materi, tapi beneran mastiin aku paham dan bisa maju.", name: "Clarissa Dewi", role: "Content Creator, 50K followers", color: "#8B3A1A", initial: "C" },
];

const proofStats = [
  { num: "12K", suffix: "+", label: "Alumni aktif dari seluruh Indonesia" },
  { num: "95", suffix: "%", label: "Puas setelah mengikuti program kami" },
  { num: "200", suffix: "+", label: "Mentor berpengalaman di bidangnya" },
  { num: "50", suffix: "+", label: "Materi & kelas tersedia" },
];

const mentorSettings = {
  dots: true, infinite: true, speed: 500,
  slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640,  settings: { slidesToShow: 1 } },
  ],
};

// ─── Animation helper ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
const LandingPageCourse = ({ currentPath }) => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    axios.get(endpoint.getMentor)
      .then(r => setMentors(r.data.data))
      .catch(e => console.error("Error fetching mentor data", e));
  }, []);

  return (
    <div><Navbar currentPath={currentPath} />
    <div className="lpc-wrap">
      <style>{CSS}</style>
      

      {/* ══ HERO ══ */}
      <section className="hero-section">
        <div className="hero-bg-img" />
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
            <div className="hero-badge"><span className="badge-dot" />Program Belajar untuk Generasi 20-an</div>
          </motion.div>

          <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1, ease: [.22, 1, .36, 1] }}>
            Bingung Hidup<br />di Usia <span className="red">20-an?</span>
          </motion.h1>

          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }}>
            Masih belum tahu arah karier? Skill belum cukup? Tapi tekanan makin besar?
            Tenang — <strong style={{ color: "rgba(255,255,255,0.8)" }}>kamu nggak sendirian. ✨</strong>
          </motion.p>
          <motion.p className="hero-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4, duration: .6 }}>
            Di sini kamu bisa belajar langsung dari mentor berpengalaman, bangun portofolio,
            dapetin sertifikat, dan pelan-pelan raih tujuanmu.
          </motion.p>

          <motion.div className="hero-cta-row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .6 }}>
            <button className="btn-hero-primary" onClick={() => navigate("/landing")}>
              Klik dan buat langkah pertamamu <ArrowForward sx={{ fontSize: 18 }} />
            </button>
            <button className="btn-hero-ghost" onClick={() => document.getElementById("why").scrollIntoView({ behavior: "smooth" })}>
              Kenapa harus di sini? ↓
            </button>
          </motion.div>

          <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7, duration: .6 }}>
            {proofStats.map((s, i) => (
              <div className="stat-pill" key={i}>
                <div>
                  <div className="stat-pill-num">{s.num}<span style={{ color: "var(--themeRed)" }}>{s.suffix}</span></div>
                  <div className="stat-pill-lbl">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-lbl">Scroll untuk lihat kenapa kamu harus mulai dari sini</span>
        </div>
      </section>

      {/* ══ PROOF STRIP ══ */}
      <div className="proof-strip">
        <div className="proof-inner">
          {proofStats.map((s, i) => (
            <Reveal key={i} delay={i * .08}>
              <div className="proof-item">
                <div className="proof-num">{s.num}<span>{s.suffix}</span></div>
                <div className="proof-lbl">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="lpc-section" id="why">
        <div className="inner">
          <Reveal>
            <div className="center-hdr" style={{ marginBottom: 8 }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Keunggulan Kami</div>
              <h2 className="sec-h" style={{ textAlign: "center" }}>Kenapa Harus Belajar di Sini?</h2>
              <p className="sec-sub center">
                Usia 20-an adalah masa penuh tantangan dan eksplorasi. Kami hadir bukan hanya untuk bantu kamu memilih <strong style={{ color: "var(--primary)" }}>"Karier"</strong>, tapi juga menemukan <strong style={{ color: "var(--primary)" }}>"Jati Diri"</strong>. Bersama kami, kamu bisa jadi versi terbaik dirimu.
              </p>
            </div>
          </Reveal>

          <div className="benefits-grid">
            {benefitItems.map((item, i) => (
              <Reveal key={i} delay={i * .08}>
                <div className="benefit-card">
                  <span className="benefit-num">{item.num}</span>
                  <div className="benefit-icon-wrap">{item.icon}</div>
                  <div className="benefit-title">{item.title}</div>
                  <div className="benefit-desc">{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={.2}>
            <div style={{ textAlign: "center", marginTop: 52 }}>
              <Link to="/landing" className="btn-red">
                <School sx={{ color: "#fff", fontSize: 20 }} />
                Mulai Perjalanan Belajarmu Sekarang
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MATERI ══ */}
      <section className="lpc-section bg-light">
        <div className="inner">
          <Reveal>
            <div className="center-hdr" style={{ marginBottom: 8 }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Kurikulum</div>
              <h2 className="sec-h" style={{ textAlign: "center" }}>Materi Populer yang Bisa Kamu Pelajari</h2>
              <p className="sec-sub center">Kurikulum yang relevan & langsung bisa dipraktikkan. Disusun bareng praktisi industri yang aktif di bidangnya.</p>
            </div>
          </Reveal>

          <div className="materi-grid">
            {materi.map((item, i) => (
              <Reveal key={i} delay={i * .07}>
                <div className="materi-pill">
                  <span className="materi-pill-icon">{item.icon}</span>
                  <span className="materi-pill-name">{item.name}</span>
                  <span className="materi-pill-tag">{item.tag}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={.2}>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <Link to="/landing" className="btn-red">
                <MenuBook sx={{ color: "#fff", fontSize: 20 }} />
                Jelajahi Semua Materi
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="lpc-section">
        <div className="inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <Reveal>
            <div>
              <div className="sec-eyebrow">Cara Kerja</div>
              <h2 className="sec-h">4 Langkah Menuju Versi Terbaikmu</h2>
              <p className="sec-sub">Proses yang sederhana, jelas, dan terbukti membantu ribuan anak muda Indonesia menemukan arah karier mereka.</p>
            </div>
          </Reveal>
          <div className="journey-steps">
            {journeySteps.map((s, i) => (
              <Reveal key={i} delay={i * .1}>
                <div className="journey-step">
                  <div className="step-left">
                    <div className="step-dot">{s.step}</div>
                    {i < journeySteps.length - 1 && <div className="step-line" />}
                  </div>
                  <div className="step-body">
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="lpc-section bg-cream">
        <div className="inner">
          <Reveal>
            <div className="center-hdr" style={{ marginBottom: 52 }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Cerita Alumni</div>
              <h2 className="sec-h" style={{ textAlign: "center" }}>Mereka Sudah Buktikan Sendiri</h2>
              <p className="sec-sub center">Bukan janji — ini cerita nyata dari alumni yang sudah merasakan perubahan.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * .1}>
                <div className="testi-card">
                  <span className="testi-quote">"</span>
                  <div className="testi-stars">
                    {[...Array(5)].map((_, j) => <StarRate key={j} sx={{ color: "#f5a623", fontSize: 16 }} />)}
                  </div>
                  <p className="testi-text">"{t.text}"</p>
                  <div className="testi-author">
                    <div className="testi-av" style={{ background: t.color }}>{t.initial}</div>
                    <div>
                      <div className="testi-name">{t.name}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MENTOR ══ */}
      <section className="lpc-section bg-light">
        <div className="inner-md">
          <Reveal>
            <div className="center-hdr" style={{ marginBottom: 48 }}>
              <div className="sec-eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>Tim Mentor</div>
              <h2 className="sec-h" style={{ textAlign: "center" }}>Kenalan Sama Mentor-Mentor Keren Kita</h2>
              <p className="sec-sub center">Belajar dari para praktisi yang sudah membuktikan hasil di dunia nyata — bukan hanya teori.</p>
            </div>
          </Reveal>

          {mentors.length > 0 ? (
            <Slider {...mentorSettings} arrows={false}>
              {mentors.map((mentor) => (
                <div key={mentor.id}>
                  <div className="mentor-card">
                    <Avatar src={mentor.thumbnail} alt={mentor.name} className="mentor-av" sx={{ width: 90, height: 90, margin: "0 auto 16px", border: "3px solid var(--primary)", boxShadow: "0 4px 16px rgba(214,19,85,0.2)" }} />
                    <div className="mentor-name">{mentor.name}</div>
                    <div className="mentor-pos">{mentor.position}</div>
                    <span className="mentor-tag">Expert</span>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p style={{ textAlign: "center", color: "rgba(46,46,46,0.4)", padding: "40px 0" }}>Memuat data mentor...</p>
          )}
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="cta-red-band"><Bolt sx={{ fontSize: 14 }} />Sekarang atau Tidak Sama Sekali</div>
            <h2 className="cta-h">Yuk, Mulai Investasi<br />untuk <em>Masa Depan Kamu</em></h2>
            <p className="cta-sub">Kalau bukan sekarang, kapan lagi? Satu langkah kecil hari ini bisa jadi perubahan besar untuk masa depanmu.</p>
          </Reveal>
          <Reveal delay={.15}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/landing" className="btn-cta-primary">
                Masih nunggu keajaiban? Mulai Take Action! <ArrowForward sx={{ fontSize: 18 }} />
              </Link>
              <button className="btn-cta-ghost" onClick={() => window.open("https://wa.me/6285281252199")}>
                Tanya dulu via WhatsApp
              </button>
            </div>
            <div className="cta-guarantees">
              {["Bisa mulai kapan saja", "Akses selamanya", "Komunitas aktif", "Mentor responsif"].map((g, i) => (
                <div className="guarantee-item" key={i}>
                  <CheckCircle sx={{ fontSize: 16 }} />
                  {g}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ WA FLOAT ══ */}
      <motion.a
        href="https://wa.me/6285281252199"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        whileHover={{ scale: 1.12 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Chat on WhatsApp" style={{ width: 30, height: 30 }} />
      </motion.a>
    </div>
    </div>
  );
};

export default LandingPageCourse;