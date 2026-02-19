import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Design Tokens (matching your CSS vars) ───────────────────────────────────
// --primary:        #d61355
// --themeRed:       #f54748
// --themeBlack:     #2e2e2e
// --themeRedHover:  #d32f2f

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary:       #d61355;
    --themeRed:      #f54748;
    --themeBlack:    #2e2e2e;
    --themeRedHover: #d32f2f;
    --bg:            #0f0f0f;
    --surface:       #181818;
    --border:        rgba(255,255,255,0.07);
    --text:          #f0f0f0;
    --muted:         rgba(240,240,240,0.45);
    --subtle:        rgba(240,240,240,0.08);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 10px; }

  /* ── Noise grain overlay ── */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 999; opacity: 1;
  }

  /* ── Typography ── */
  .font-display { font-family: 'Syne', sans-serif; }

  /* ── Nav ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    transition: background .3s, border-color .3s;
  }
  .nav.stuck {
    background: rgba(15,15,15,0.9);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    color: var(--text);
    text-decoration: none;
    display: flex; align-items: center; gap: 8px;
  }
  .logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--themeRed);
    display: inline-block;
    animation: logoPulse 2.5s ease-in-out infinite;
  }
  @keyframes logoPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(245,71,72,0.5); }
    50% { box-shadow: 0 0 0 6px rgba(245,71,72,0); }
  }
  .nav-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 100px;
    background: rgba(245,71,72,0.1);
    border: 1px solid rgba(245,71,72,0.25);
    color: var(--themeRed);
    display: flex; align-items: center; gap: 6px;
  }
  .badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--themeRed);
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* ── Hero ── */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 140px 24px 100px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
  }
  .hero-glow {
    position: absolute;
    top: 30%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 400px;
    background: radial-gradient(ellipse, rgba(214,19,85,0.12) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(40px);
  }
  .hero-label {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(240,240,240,0.5);
    margin-bottom: 28px;
  }
  .hero-label-line {
    width: 28px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary));
  }
  .hero-label-line.right {
    background: linear-gradient(90deg, var(--primary), transparent);
  }
  .hero-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.6rem, 6vw, 5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.035em;
    color: var(--text);
    max-width: 820px;
    margin-bottom: 24px;
  }
  .hero-headline .accent {
    color: var(--themeRed);
    position: relative;
    display: inline-block;
  }
  .hero-headline .accent::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--themeRed));
    border-radius: 1px;
    transform: scaleX(0);
    animation: underlineGrow 0.8s 1s ease forwards;
  }
  @keyframes underlineGrow { to { transform: scaleX(1); } }
  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.7;
    color: var(--muted);
    max-width: 520px;
    margin: 0 auto 44px;
    font-weight: 400;
  }
  .hero-ctas {
    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 60px;
  }
  .btn-primary {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9375rem; font-weight: 600;
    padding: 14px 30px;
    border-radius: 8px;
    border: none; cursor: pointer;
    background: var(--primary);
    color: #fff;
    transition: background .2s, transform .15s, box-shadow .2s;
    box-shadow: 0 4px 20px rgba(214,19,85,0.3);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover {
    background: var(--themeRedHover);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(214,19,85,0.4);
  }
  .btn-primary:disabled {
    background: rgba(214,19,85,0.25);
    color: rgba(255,255,255,0.4);
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  .btn-ghost {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9375rem; font-weight: 500;
    padding: 13px 30px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: border-color .2s, color .2s, background .2s;
    display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none;
  }
  .btn-ghost:hover {
    border-color: rgba(255,255,255,0.2);
    color: var(--text);
    background: var(--subtle);
  }
  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    opacity: 0.3;
    animation: scrollBob 2s ease-in-out infinite;
  }
  @keyframes scrollBob { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
  .scroll-line { width: 1px; height: 40px; background: linear-gradient(180deg, transparent, rgba(255,255,255,0.4)); }
  .scroll-label { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); }

  /* ── Section base ── */
  section { padding: 100px 24px; }
  .inner { max-width: 1120px; margin: 0 auto; }
  .sec-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--themeRed);
    margin-bottom: 20px;
  }
  .sec-label::before {
    content: '';
    width: 20px; height: 1px;
    background: var(--themeRed);
  }
  .sec-h {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--text);
    margin-bottom: 16px;
  }
  .sec-sub {
    font-size: 1.0625rem;
    color: var(--muted);
    line-height: 1.7;
    max-width: 560px;
    font-weight: 400;
  }
  .divider {
    width: 100%; height: 1px;
    background: var(--border);
    margin: 0;
  }

  /* ── Problem ── */
  .problem-section { background: var(--surface); }
  .problem-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .problem-cards { display: flex; flex-direction: column; gap: 2px; }
  .prob-card {
    padding: 24px 28px;
    border: 1px solid var(--border);
    border-radius: 12px;
    display: flex; gap: 18px; align-items: flex-start;
    background: rgba(255,255,255,0.02);
    transition: border-color .2s, background .2s;
    margin-bottom: 12px;
    cursor: default;
  }
  .prob-card:hover {
    border-color: rgba(214,19,85,0.25);
    background: rgba(214,19,85,0.04);
  }
  .prob-number {
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem; font-weight: 700;
    color: var(--primary);
    letter-spacing: 0.1em;
    flex-shrink: 0;
    margin-top: 3px;
    opacity: 0.7;
  }
  .prob-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem; font-weight: 700;
    color: var(--text);
    margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  .prob-desc {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.6;
  }

  /* ── Solution ── */
  .solution-section { background: var(--bg); }
  .solution-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  .solution-pills { display: flex; flex-direction: column; gap: 14px; }
  .sol-pill {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 20px 22px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--subtle);
    transition: border-color .2s;
  }
  .sol-pill:hover { border-color: rgba(245,71,72,0.2); }
  .sol-icon {
    width: 36px; height: 36px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
    background: rgba(214,19,85,0.1);
    border: 1px solid rgba(214,19,85,0.2);
  }
  .sol-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem; font-weight: 700;
    color: var(--text); margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  .sol-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.55; }

  /* ── MVP Features ── */
  .features-section { background: var(--surface); }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 52px;
  }
  .feat-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px 28px;
    background: rgba(255,255,255,0.02);
    position: relative;
    overflow: hidden;
    transition: border-color .25s, transform .25s;
  }
  .feat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), var(--themeRed));
    transform: scaleX(0);
    transition: transform .3s ease;
    transform-origin: left;
  }
  .feat-card:hover { border-color: rgba(214,19,85,0.2); transform: translateY(-4px); }
  .feat-card:hover::before { transform: scaleX(1); }
  .feat-tag {
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 100px;
    background: rgba(214,19,85,0.1);
    border: 1px solid rgba(214,19,85,0.2);
    color: var(--themeRed);
    display: inline-block;
    margin-bottom: 20px;
  }
  .feat-icon {
    font-size: 1.6rem; margin-bottom: 14px;
    display: block;
  }
  .feat-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem; font-weight: 700;
    color: var(--text);
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .feat-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.65; }

  /* ── Market ── */
  .market-section { background: var(--bg); }
  .market-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 52px;
  }
  .market-card {
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 36px 28px;
    background: var(--subtle);
    text-align: center;
    transition: border-color .2s, background .2s;
  }
  .market-card:hover { border-color: rgba(214,19,85,0.2); background: rgba(214,19,85,0.04); }
  .market-num {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 10px;
  }
  .market-num span { color: var(--themeRed); }
  .market-label {
    font-size: 0.85rem;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ── Roadmap ── */
  .roadmap-section { background: var(--surface); }
  .roadmap-track {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-top: 56px;
    position: relative;
  }
  .roadmap-track::before {
    content: '';
    position: absolute;
    top: 28px; left: calc(16.67% + 28px); right: calc(16.67% + 28px);
    height: 1px;
    background: linear-gradient(90deg, var(--primary), rgba(245,71,72,0.2));
  }
  .road-item {
    padding: 0 24px;
    position: relative;
  }
  .road-item:first-child { padding-left: 0; }
  .road-item:last-child { padding-right: 0; }
  .road-dot-wrap { display: flex; align-items: center; margin-bottom: 24px; }
  .road-dot {
    width: 56px; height: 56px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    border: 1px solid var(--border);
    background: var(--subtle);
    position: relative; z-index: 1;
    transition: border-color .2s, background .2s;
  }
  .road-item.active .road-dot {
    background: rgba(214,19,85,0.12);
    border-color: rgba(214,19,85,0.35);
    box-shadow: 0 0 20px rgba(214,19,85,0.15);
  }
  .road-phase {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--primary);
    margin-bottom: 8px;
  }
  .road-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem; font-weight: 700;
    color: var(--text);
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  .road-items-list { display: flex; flex-direction: column; gap: 6px; }
  .road-li {
    font-size: 0.8rem;
    color: var(--muted);
    display: flex; align-items: center; gap: 8px;
  }
  .road-li::before {
    content: '';
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--primary);
    flex-shrink: 0;
    opacity: 0.5;
  }
  .road-item.active .road-li { color: rgba(240,240,240,0.65); }
  .road-item.active .road-li::before { opacity: 1; }
  .road-status {
    display: inline-block;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 3px 8px; border-radius: 100px;
    margin-bottom: 12px;
  }
  .status-building { background: rgba(214,19,85,0.15); color: var(--themeRed); border: 1px solid rgba(214,19,85,0.3); }
  .status-next { background: rgba(255,255,255,0.05); color: var(--muted); border: 1px solid var(--border); }
  .status-future { background: rgba(255,255,255,0.03); color: rgba(240,240,240,0.2); border: 1px solid rgba(255,255,255,0.04); }

  /* ── Trust ── */
  .trust-section { background: var(--bg); padding: 80px 24px; }
  .trust-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-top: 52px;
  }
  .trust-item {
    padding: 40px 36px;
    background: var(--bg);
    transition: background .2s;
  }
  .trust-item:hover { background: var(--subtle); }
  .trust-icon { font-size: 1.4rem; margin-bottom: 16px; display: block; }
  .trust-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem; font-weight: 700;
    color: var(--text); margin-bottom: 8px;
    letter-spacing: -0.01em;
  }
  .trust-desc { font-size: 0.82rem; color: var(--muted); line-height: 1.6; }

  /* ── Final CTA ── */
  .cta-section {
    background: var(--surface);
    padding: 120px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .cta-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 400px;
    background: radial-gradient(ellipse, rgba(214,19,85,0.09) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-h {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    color: var(--text);
    margin-bottom: 20px;
    line-height: 1.1;
  }
  .cta-sub {
    font-size: 1rem;
    color: var(--muted);
    max-width: 440px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }

  /* ── Email form ── */
  .email-form {
    display: flex; gap: 10px; justify-content: center;
    flex-wrap: wrap; max-width: 480px; margin: 0 auto;
  }
  .email-input {
    flex: 1; min-width: 240px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 13px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9375rem;
    color: var(--text);
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .email-input:focus {
    border-color: rgba(214,19,85,0.4);
    box-shadow: 0 0 0 3px rgba(214,19,85,0.1);
  }
  .email-input::placeholder { color: rgba(240,240,240,0.25); }
  .form-note { font-size: 0.75rem; color: rgba(240,240,240,0.25); margin-top: 14px; }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 32px; left: 50%;
    transform: translateX(-50%);
    background: var(--surface);
    border: 1px solid rgba(214,19,85,0.3);
    border-radius: 10px;
    padding: 14px 24px;
    font-size: 0.875rem;
    color: var(--text);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    z-index: 1000;
    white-space: nowrap;
    display: flex; align-items: center; gap: 10px;
  }
  .toast-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--themeRed); flex-shrink: 0; }

  /* ── Footer ── */
  footer {
    background: var(--bg);
    border-top: 1px solid var(--border);
    padding: 36px 48px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 16px;
  }
  .footer-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1rem; font-weight: 800;
    color: var(--text);
    letter-spacing: -0.02em;
  }
  .footer-note { font-size: 0.78rem; color: rgba(240,240,240,0.22); }
  .footer-right { font-size: 0.78rem; color: rgba(240,240,240,0.22); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    nav { padding: 16px 20px; }
    .problem-grid, .solution-grid { grid-template-columns: 1fr; gap: 40px; }
    .features-grid, .market-grid { grid-template-columns: 1fr; }
    .roadmap-track { grid-template-columns: 1fr; }
    .roadmap-track::before { display: none; }
    .road-item { padding: 0 0 32px; border-bottom: 1px solid var(--border); }
    .road-item:last-child { border-bottom: none; padding-bottom: 0; }
    .trust-grid { grid-template-columns: 1fr; }
    section { padding: 72px 20px; }
    footer { padding: 28px 20px; flex-direction: column; text-align: center; }
  }
`;

// ─── Animation Wrapper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROBLEMS = [
  { title: "Mentoring is gatekept", desc: "Quality business mentors are expensive and inaccessible to most UMKM owners. Guidance is reserved for those who can afford it." },
  { title: "Information is fragmented", desc: "Business knowledge is scattered across YouTube, WhatsApp groups, and informal networks — with no trusted, structured source." },
  { title: "Decision-making happens in a vacuum", desc: "Most UMKM operators have no structured framework for decisions. They rely on gut feel, with no data or external perspective." },
];

const SOLUTIONS = [
  { icon: "💬", title: "AI-first, chat-native experience", desc: "An intelligent business chatbot that responds like a real mentor — available at any hour, at a fraction of the cost." },
  { icon: "🇮🇩", title: "Built for the Indonesian context", desc: "Trained on local UMKM cases, regulations, and market dynamics. Not generic advice — contextually grounded guidance." },
  { icon: "📐", title: "Structured decision support", desc: "Guided frameworks for pricing, growth, cashflow, and strategy — helping founders think clearly under pressure." },
  { icon: "📈", title: "Designed to scale responsibly", desc: "We start focused on one core value: better decisions. We expand only when the foundation is proven." },
];

const FEATURES = [
  { icon: "🤖", title: "AI Business Mentor", desc: "A conversational AI trained to ask the right questions, surface relevant frameworks, and guide entrepreneurs toward better decisions.", tag: "Initial Release" },
  { icon: "📚", title: "AI Course Companion", desc: "Business education delivered through guided dialogue — not passive video. Learn by doing, with an AI that adapts to your context.", tag: "Initial Release" },
  { icon: "🧭", title: "Guided Decision Helper", desc: "Structured prompts for common UMKM challenges: pricing, hiring, expansion, cashflow. Clarity when it matters most.", tag: "Initial Release" },
];

const MARKET = [
  { num: "66", unit: "Juta+", label: "UMKM aktif di Indonesia — salah satu ekosistem terbesar di dunia" },
  { num: "<5", unit: "%", label: "UMKM yang memiliki akses ke mentoring bisnis yang terstruktur dan terjangkau" },
  { num: "Rp14T", unit: "+", label: "Estimasi nilai pasar edukasi bisnis digital Indonesia yang terus tumbuh" },
];

const ROADMAP = [
  {
    phase: "Phase 1", icon: "💬", title: "AI Mentoring & Education",
    status: "building", statusLabel: "Building Now",
    items: ["AI Business Mentor Chatbot", "Course Companion", "Decision Helper", "Indonesian UMKM context"],
  },
  {
    phase: "Phase 2", icon: "🛠", title: "AI Decision Tools",
    status: "next", statusLabel: "Next",
    items: ["Business health diagnostics", "Scenario planning tools", "Financial guidance module", "Personalized action plans"],
  },
  {
    phase: "Phase 3", icon: "🔭", title: "Advanced Intelligence",
    status: "future", statusLabel: "Future",
    items: ["Predictive business analytics", "Ecosystem integrations", "Multi-modal inputs", "Partner network access"],
  },
];

const TRUST = [
  { icon: "🏗️", title: "Built for Indonesian UMKM", desc: "Every decision — from language to product scope — is made with the realities of Indonesian small business owners in mind." },
  { icon: "🎯", title: "Starting focused, scaling responsibly", desc: "We are not building everything at once. Phase 1 is one product, solving one clear problem, proven before we expand." },
  { icon: "🧠", title: "Designed with real problems in mind", desc: "This product emerged from direct observation of the gaps in Indonesian business mentoring — not from a trend report." },
  { icon: "🤝", title: "In discussion with early partners", desc: "We are actively engaging with accelerators and ecosystem players in Indonesia to validate and shape the product roadmap." },
  { icon: "📋", title: "Honest about our stage", desc: "We are pre-launch. This page is for transparency — to show potential investors and partners what we are building and why." },
  { icon: "⚡", title: "Execution-first philosophy", desc: "Small team. Clear scope. Measurable milestones. We believe in shipping a focused MVP before scaling vision into complexity." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ComingSoonPage() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(false);
  const [visionOpen, setVisionOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) return;
    setSubmitted(true);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <>
      <style>{FONTS + CSS}</style>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div className="toast"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            <span className="toast-dot" />
            You're on the list. We'll be in touch.
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV */}
      <nav className={scrolled ? "stuck" : ""}>
        <a href="#" className="nav-logo font-display">
          <span className="logo-dot" />
          KonsulAI
        </a>
        <div className="nav-badge">
          <span className="badge-dot" />
          Coming Soon
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>

          <div className="hero-label">
            <span className="hero-label-line" />
            AI Business Mentor · Indonesia
            <span className="hero-label-line right" />
          </div>

          <h1 className="hero-headline font-display">
            The Business Mentor<br />
            Every UMKM <span className="accent">Deserves</span>
          </h1>

          <p className="hero-sub">
            We are building an AI-powered business mentoring platform for Indonesian UMKM and startups — making expert guidance accessible, affordable, and always available.
          </p>

          <div className="hero-ctas">
            <button
              className="btn-primary"
              onClick={() => document.getElementById("cta-section").scrollIntoView({ behavior: "smooth" })}
            >
              Request Early Access
            </button>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById("vision").scrollIntoView({ behavior: "smooth" })}
            >
              View Product Vision ↓
            </button>
          </div>

          {/* Key signals row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
            style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            {[
              "Pre-Launch Stage",
              "66M+ UMKM Addressable Market",
              "Focused MVP Approach"
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "rgba(240,240,240,0.35)", letterSpacing: "0.04em" }}>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--primary)", display: "inline-block", opacity: 0.6 }} />
                {t}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span className="scroll-label">Scroll</span>
        </div>
      </section>

      <div className="divider" />

      {/* ══ PROBLEM ══ */}
      <section className="problem-section" id="vision">
        <div className="inner">
          <div className="problem-grid">
            <Reveal>
              <div>
                <div className="sec-label">The Problem</div>
                <h2 className="sec-h">Most UMKM grow without guidance</h2>
                <p className="sec-sub">
                  Indonesia has one of the most vibrant small business ecosystems in the world. Yet the majority of its entrepreneurs navigate critical decisions alone — without mentors, frameworks, or structured support.
                </p>
                <div style={{ marginTop: 28, padding: "16px 20px", borderRadius: 10, border: "1px solid rgba(214,19,85,0.15)", background: "rgba(214,19,85,0.05)" }}>
                  <p style={{ fontSize: "0.85rem", color: "rgba(240,240,240,0.55)", lineHeight: 1.65, fontStyle: "italic" }}>
                    "Quality business mentoring has always been available — just not to everyone. We're here to change that."
                  </p>
                </div>
              </div>
            </Reveal>
            <div className="problem-cards">
              {PROBLEMS.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="prob-card">
                    <span className="prob-number">0{i + 1}</span>
                    <div>
                      <div className="prob-title">{p.title}</div>
                      <div className="prob-desc">{p.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══ SOLUTION ══ */}
      <section className="solution-section">
        <div className="inner">
          <div className="solution-grid">
            <div className="solution-pills">
              {SOLUTIONS.map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="sol-pill">
                    <div className="sol-icon">{s.icon}</div>
                    <div>
                      <div className="sol-title">{s.title}</div>
                      <div className="sol-desc">{s.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15}>
              <div>
                <div className="sec-label">Our Solution</div>
                <h2 className="sec-h">AI mentoring, built for the Indonesian context</h2>
                <p className="sec-sub">
                  KonsulAI starts as a focused AI chatbot — trained on real UMKM business cases and designed to provide structured, actionable guidance. Not generic advice. Not information overload. Just clarity, when it's needed most.
                </p>
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                  {["No expensive consultants", "Available 24/7, any device", "Contextualised for Indonesia", "Scalable to millions of users"].map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.875rem", color: "rgba(240,240,240,0.55)" }}>
                      <span style={{ width: 16, height: 16, borderRadius: 4, background: "rgba(214,19,85,0.15)", border: "1px solid rgba(214,19,85,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: "var(--themeRed)", flexShrink: 0 }}>✓</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══ MVP FEATURES ══ */}
      <section className="features-section">
        <div className="inner">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 4 }}>
              <div>
                <div className="sec-label">Phase 1 · What We're Building</div>
                <h2 className="sec-h">A focused, honest MVP</h2>
                <p className="sec-sub" style={{ marginTop: 12 }}>Three features. One clear purpose. We are not building everything — we are building the right thing first.</p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", background: "rgba(214,19,85,0.1)", border: "1px solid rgba(214,19,85,0.2)", color: "var(--themeRed)" }}>
                  Initial Release
                </span>
              </div>
            </div>
          </Reveal>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="feat-card">
                  <span className="feat-tag">{f.tag}</span>
                  <span className="feat-icon">{f.icon}</span>
                  <div className="feat-title font-display">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══ MARKET ══ */}
      <section className="market-section">
        <div className="inner">
          <Reveal>
            <div style={{ maxWidth: 600 }}>
              <div className="sec-label">Why This Matters</div>
              <h2 className="sec-h">A massive opportunity hiding in plain sight</h2>
              <p className="sec-sub">Indonesia's UMKM sector is one of the most underserved markets in the world for structured business education. The scale of the problem creates the scale of the opportunity.</p>
            </div>
          </Reveal>
          <div className="market-grid">
            {MARKET.map((m, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="market-card">
                  <div className="market-num font-display">{m.num}<span>{m.unit}</span></div>
                  <div className="market-label">{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p style={{ marginTop: 24, fontSize: "0.75rem", color: "rgba(240,240,240,0.2)", textAlign: "center" }}>
              Market figures are directional and based on publicly available data from BPS and industry reports.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* ══ ROADMAP ══ */}
      <section className="roadmap-section">
        <div className="inner">
          <Reveal>
            <div style={{ maxWidth: 560 }}>
              <div className="sec-label">Roadmap</div>
              <h2 className="sec-h">Direction, not promises</h2>
              <p className="sec-sub">We share our roadmap to show focus and intentionality — not to overpromise. Phases unlock when the previous one is validated.</p>
            </div>
          </Reveal>
          <div className="roadmap-track">
            {ROADMAP.map((r, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className={`road-item ${r.status === "building" ? "active" : ""}`}>
                  <div className="road-dot-wrap">
                    <div className="road-dot">{r.icon}</div>
                  </div>
                  <span className={`road-status status-${r.status}`}>{r.statusLabel}</span>
                  <div className="road-phase">{r.phase}</div>
                  <div className="road-title font-display">{r.title}</div>
                  <div className="road-items-list">
                    {r.items.map((item, j) => (
                      <div className="road-li" key={j}>{item}</div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══ TRUST ══ */}
      <section className="trust-section">
        <div className="inner">
          <Reveal>
            <div style={{ maxWidth: 560 }}>
              <div className="sec-label">Why Trust Us</div>
              <h2 className="sec-h">Signals, not claims</h2>
              <p className="sec-sub">We don't ask you to take our word for it. Here is how we think and how we operate.</p>
            </div>
          </Reveal>
          <div className="trust-grid">
            {TRUST.map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="trust-item">
                  <span className="trust-icon">{t.icon}</span>
                  <div className="trust-title font-display">{t.title}</div>
                  <div className="trust-desc">{t.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ══ FINAL CTA ══ */}
      <section className="cta-section" id="cta-section">
        <div className="cta-glow" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="sec-label" style={{ justifyContent: "center" }}>Join the Early Access List</div>
            <h2 className="cta-h font-display">
              Be part of the<br />
              <span style={{ color: "var(--themeRed)" }}>first wave</span>
            </h2>
            <p className="cta-sub">
              We're building this carefully. Early access members will shape the product and get priority access when we launch.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            {!submitted ? (
              <>
                <div className="email-form">
                  <input
                    className="email-input"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={handleKey}
                  />
                  <button className="btn-primary" onClick={handleSubmit}>
                    Join Waitlist →
                  </button>
                </div>
                <p className="form-note">No spam. No commitments. Just updates when we're ready.</p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 28px", borderRadius: 10, border: "1px solid rgba(214,19,85,0.25)", background: "rgba(214,19,85,0.08)", fontSize: "0.9375rem", color: "var(--text)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--themeRed)" }} />
                You're on the list. We'll be in touch.
              </motion.div>
            )}
          </Reveal>

          {/* Investor signal */}
          <Reveal delay={0.25}>
            <div style={{ marginTop: 72, paddingTop: 48, borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,240,240,0.2)" }}>
                Interested in partnering or investing?
              </p>
              <a
                href="mailto:hello@konsulai.id"
                style={{ fontSize: "0.875rem", color: "var(--themeRed)", textDecoration: "none", borderBottom: "1px solid rgba(214,19,85,0.3)", paddingBottom: 2, transition: "border-color .2s" }}
                onMouseEnter={e => e.target.style.borderColor = "var(--themeRed)"}
                onMouseLeave={e => e.target.style.borderColor = "rgba(214,19,85,0.3)"}
              >
                hello@konsulai.id
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-logo font-display">KonsulAI</div>
        <div className="footer-note">AI Business Mentor for Indonesian UMKM · Pre-Launch 2025</div>
        <div className="footer-right">🇮🇩 Built for Indonesia</div>
      </footer>
    </>
  );
}