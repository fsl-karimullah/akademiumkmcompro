import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── REPLACE THIS WITH YOUR GEMINI API KEY ───────────────────────────────────
const GEMINI_API_KEY = "AIzaSyAgzcFarXRudhJ52GRISD-5iUXlO4qQTGU";
const GEMINI_MODEL   = "gemini-3-pro-preview";
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Anda adalah KonsulAI, asisten konsultasi bisnis AI yang ahli untuk pelaku UMKM Indonesia. 
Anda memiliki keahlian mendalam di: strategi bisnis, keuangan UMKM, pemasaran digital, operasional, pricing, dan pertumbuhan usaha kecil menengah di Indonesia.
Respond dalam Bahasa Indonesia yang hangat, profesional, dan praktis. Berikan saran yang konkret dan actionable.
Gunakan framework bisnis yang relevan jika sesuai (SWOT, Canvas, Cost-Plus Pricing, dll).
Jawaban maksimal 3-4 paragraf, fokus pada nilai praktis. Gunakan emoji secukupnya untuk membuat percakapan lebih hidup.`;

// ─── Styles ───────────────────────────────────────────────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');`;

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --teak:  #1C1209; --cream: #F5EDD8; --gold:  #C8922A;
  --amber: #E8B14A; --moss:  #2D4A2D; --rust:  #8B3A1A;
  --sand:  #D9C4A0; --paper: #FAF5E9;
}
html { scroll-behavior: smooth; }
body { font-family:'DM Sans',sans-serif; background:var(--paper); color:var(--teak); overflow-x:hidden; }

.batik-bg { position:relative; overflow:hidden; }
.batik-bg::before {
  content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%23C8922A' opacity='.1'/%3E%3Ccircle cx='50' cy='10' r='1.5' fill='%23C8922A' opacity='.1'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%23C8922A' opacity='.07'/%3E%3Ccircle cx='10' cy='50' r='1' fill='%23C8922A' opacity='.1'/%3E%3Ccircle cx='50' cy='50' r='1' fill='%23C8922A' opacity='.1'/%3E%3Cpath d='M0 20 Q15 10 30 20 Q45 30 60 20' stroke='%23C8922A' stroke-width='.4' fill='none' opacity='.07'/%3E%3Cpath d='M0 40 Q15 30 30 40 Q45 50 60 40' stroke='%23C8922A' stroke-width='.4' fill='none' opacity='.07'/%3E%3C/svg%3E");
}
.batik-bg>*{position:relative;z-index:1;}

nav {
  position:fixed; top:0; left:0; right:0;
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 48px; z-index:200; transition:background .3s,box-shadow .3s;
}
nav.scrolled { background:rgba(245,237,216,.92); backdrop-filter:blur(12px); box-shadow:0 1px 0 rgba(200,146,42,.2); }
.nav-logo { font-family:'Playfair Display',serif; font-weight:700; font-size:1.3rem; color:var(--teak); text-decoration:none; letter-spacing:-.02em; }
.nav-logo span { color:var(--gold); }
.nav-links { display:flex; gap:28px; align-items:center; }
.nav-links a { font-size:.875rem; font-weight:500; color:var(--teak); text-decoration:none; opacity:.7; transition:opacity .2s; }
.nav-links a:hover { opacity:1; }
.btn-nav { background:var(--teak); color:var(--cream); padding:10px 22px; border-radius:100px; font-weight:600; cursor:pointer; border:none; font-family:'DM Sans',sans-serif; font-size:.875rem; transition:background .2s; }
.btn-nav:hover { background:var(--gold); }

.btn-primary {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--gold); color:var(--teak);
  font-family:'DM Sans',sans-serif; font-size:.9375rem; font-weight:600;
  padding:15px 32px; border-radius:100px; border:none; cursor:pointer; text-decoration:none;
  transition:background .2s,transform .15s,box-shadow .2s;
  box-shadow:0 4px 20px rgba(200,146,42,.35);
}
.btn-primary:hover { background:var(--amber); transform:translateY(-2px); box-shadow:0 8px 28px rgba(200,146,42,.45); }
.btn-secondary {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:var(--teak);
  font-family:'DM Sans',sans-serif; font-size:.9375rem; font-weight:500;
  padding:14px 32px; border-radius:100px; border:1.5px solid rgba(28,18,9,.25); cursor:pointer; text-decoration:none;
  transition:border-color .2s,background .2s,transform .15s;
}
.btn-secondary:hover { border-color:var(--gold); background:rgba(200,146,42,.06); transform:translateY(-2px); }

.hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; padding-top:100px; background:var(--cream); }
.hero-left { padding:80px 48px 80px 60px; display:flex; flex-direction:column; justify-content:center; }
.hero-right { background:var(--teak); display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; min-height:600px; }
.hero-eyebrow {
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(200,146,42,.15); border:1px solid rgba(200,146,42,.3);
  color:var(--gold); font-size:.8125rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase;
  padding:6px 14px; border-radius:100px; margin-bottom:28px; width:fit-content;
}
.eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)} }
.hero-headline { font-family:'Playfair Display',serif; font-size:clamp(2.8rem,5vw,4.2rem); font-weight:900; line-height:1.06; letter-spacing:-.03em; color:var(--teak); margin-bottom:24px; }
.hero-headline em { font-style:italic; color:var(--gold); }
.hero-sub { font-size:1.0625rem; line-height:1.7; color:rgba(28,18,9,.62); max-width:440px; margin-bottom:40px; }
.hero-cta { display:flex; gap:14px; flex-wrap:wrap; }
.hero-proof { margin-top:52px; display:flex; align-items:center; gap:16px; }
.avatars { display:flex; }
.avatar { width:34px; height:34px; border-radius:50%; border:2px solid var(--cream); margin-right:-10px; font-family:'Playfair Display',serif; font-size:.7rem; font-weight:700; display:flex; align-items:center; justify-content:center; color:var(--cream); }
.proof-text { font-size:.85rem; color:rgba(28,18,9,.55); line-height:1.45; }
.proof-text strong { color:var(--teak); font-weight:600; }
.hero-deco { position:absolute; inset:0; background-image:radial-gradient(ellipse at 20% 50%,rgba(200,146,42,.12) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(45,74,45,.15) 0%,transparent 50%); }
.mini-chat { position:relative; width:340px; background:rgba(245,237,216,.06); border:1px solid rgba(245,237,216,.12); border-radius:20px; padding:20px; }
.mini-chat-hdr { display:flex; align-items:center; gap:10px; padding-bottom:14px; border-bottom:1px solid rgba(245,237,216,.1); margin-bottom:16px; }
.mini-ai-avatar { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,var(--gold),var(--amber)); display:flex; align-items:center; justify-content:center; font-size:1rem; }
.mini-ai-name { font-size:.8rem; font-weight:600; color:var(--cream); }
.mini-ai-status { font-size:.7rem; color:rgba(245,237,216,.5); }
.mini-msg { display:flex; gap:8px; margin-bottom:12px; }
.mini-msg.user { flex-direction:row-reverse; }
.mini-bubble { max-width:200px; padding:10px 14px; border-radius:14px; font-size:.78rem; line-height:1.5; }
.mini-bubble.bot { background:rgba(245,237,216,.1); color:rgba(245,237,216,.85); border-radius:4px 14px 14px 14px; }
.mini-bubble.user { background:linear-gradient(135deg,var(--gold),var(--amber)); color:var(--teak); border-radius:14px 4px 14px 14px; font-weight:500; }
.mini-typing { display:flex; gap:4px; align-items:center; padding:10px 14px; background:rgba(245,237,216,.1); border-radius:4px 14px 14px 14px; width:fit-content; }
.mini-typing span { width:5px; height:5px; border-radius:50%; background:rgba(245,237,216,.4); animation:typing 1.4s infinite ease-in-out; }
.mini-typing span:nth-child(2){animation-delay:.2s} .mini-typing span:nth-child(3){animation-delay:.4s}
@keyframes typing { 0%,80%,100%{transform:scale(1);opacity:.4} 40%{transform:scale(1.3);opacity:1} }

.sec-tag { font-size:.75rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.sec-h { font-family:'Playfair Display',serif; font-size:clamp(2rem,3.5vw,3rem); font-weight:900; line-height:1.1; letter-spacing:-.025em; color:var(--teak); }
.sec-h em { font-style:italic; color:var(--gold); }
.sec-sub { font-size:1.0625rem; color:rgba(28,18,9,.55); line-height:1.7; max-width:520px; margin-top:14px; }

.prob-sec { background:var(--teak); padding:100px 60px; }
.prob-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; max-width:1200px; margin:0 auto; }
.prob-sec .sec-h { color:var(--cream); } .prob-sec .sec-sub { color:rgba(245,237,216,.55); } .prob-sec .sec-tag { color:var(--amber); }
.prob-cards { display:flex; flex-direction:column; gap:16px; }
.prob-card { background:rgba(245,237,216,.06); border:1px solid rgba(245,237,216,.1); border-radius:16px; padding:22px 24px; display:flex; gap:16px; align-items:flex-start; transition:background .2s,border-color .2s; }
.prob-card:hover { background:rgba(245,237,216,.1); border-color:rgba(200,146,42,.3); }
.prob-icon { width:42px; height:42px; flex-shrink:0; background:rgba(200,146,42,.15); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
.prob-title { font-family:'Playfair Display',serif; font-size:1rem; font-weight:700; color:var(--cream); margin-bottom:4px; }
.prob-desc { font-size:.85rem; color:rgba(245,237,216,.5); line-height:1.55; }

.stats-sec { background:linear-gradient(135deg,var(--moss) 0%,#1a3320 100%); padding:80px 60px; position:relative; overflow:hidden; }
.stats-inner { max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1fr 2px 1fr 2px 1fr 2px 1fr; position:relative; z-index:1; }
.stat-div { background:rgba(245,237,216,.12); margin:20px 0; }
.stat-item { text-align:center; padding:20px 40px; }
.stat-num { font-family:'Playfair Display',serif; font-size:clamp(2.5rem,4vw,3.5rem); font-weight:900; color:var(--amber); line-height:1; margin-bottom:8px; }
.stat-lbl { font-size:.875rem; color:rgba(245,237,216,.6); line-height:1.4; }

.feat-sec { background:var(--paper); padding:100px 60px; }
.feat-hdr { max-width:1200px; margin:0 auto 64px; display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:end; }
.feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1200px; margin:0 auto; }
.feat-card { background:var(--cream); border-radius:20px; padding:36px 30px; border:1px solid rgba(200,146,42,.15); transition:transform .25s,box-shadow .25s,border-color .25s; position:relative; overflow:hidden; }
.feat-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--gold),var(--amber)); transform:scaleX(0); transition:transform .25s; transform-origin:left; }
.feat-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(28,18,9,.1); border-color:rgba(200,146,42,.35); }
.feat-card:hover::after { transform:scaleX(1); }
.feat-num { font-family:'Playfair Display',serif; font-size:3rem; font-weight:900; color:rgba(200,146,42,.15); line-height:1; margin-bottom:16px; }
.feat-icon { width:48px; height:48px; background:linear-gradient(135deg,rgba(200,146,42,.15),rgba(200,146,42,.05)); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; margin-bottom:18px; }
.feat-title { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:700; color:var(--teak); margin-bottom:10px; line-height:1.3; }
.feat-desc { font-size:.875rem; color:rgba(28,18,9,.55); line-height:1.65; }
.feat-badge { display:inline-block; margin-top:10px; font-size:.7rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; padding:4px 10px; border-radius:100px; }
.badge-live { background:rgba(45,74,45,.12); color:var(--moss); border:1px solid rgba(45,74,45,.2); }
.badge-soon { background:rgba(200,146,42,.1); color:var(--gold); border:1px solid rgba(200,146,42,.2); }

.testi-sec { background:var(--cream); padding:100px 60px; }
.testi-inner { max-width:1200px; margin:0 auto; }
.testi-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px; margin-top:56px; }
.testi-card { background:var(--paper); border-radius:20px; padding:32px; border:1px solid rgba(200,146,42,.12); transition:transform .2s,box-shadow .2s; }
.testi-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(28,18,9,.08); }
.testi-card.featured { background:var(--teak); border-color:var(--gold); }
.quote-mark { font-family:'Playfair Display',serif; font-size:4rem; line-height:.6; color:var(--gold); opacity:.4; margin-bottom:16px; display:block; }
.testi-txt { font-size:.9375rem; line-height:1.7; color:rgba(28,18,9,.7); margin-bottom:24px; font-style:italic; }
.testi-card.featured .testi-txt { color:rgba(245,237,216,.8); }
.testi-author { display:flex; align-items:center; gap:12px; }
.author-av { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-weight:700; font-size:.9rem; color:var(--cream); }
.author-name { font-size:.875rem; font-weight:600; color:var(--teak); }
.testi-card.featured .author-name { color:var(--cream); }
.author-biz { font-size:.78rem; color:rgba(28,18,9,.45); }
.testi-card.featured .author-biz { color:rgba(245,237,216,.45); }
.stars { color:var(--gold); font-size:.85rem; margin-bottom:12px; letter-spacing:2px; }

.cta-sec { background:var(--cream); padding:0 60px 100px; }
.cta-inner { max-width:1200px; margin:0 auto; background:var(--teak); border-radius:28px; padding:80px; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; position:relative; overflow:hidden; }
.cta-inner::before { content:''; position:absolute; right:-80px; top:-80px; width:360px; height:360px; border-radius:50%; background:radial-gradient(circle,rgba(200,146,42,.15) 0%,transparent 70%); pointer-events:none; }
.cta-h { font-family:'Playfair Display',serif; font-size:clamp(2rem,3.5vw,2.75rem); font-weight:900; line-height:1.1; letter-spacing:-.025em; color:var(--cream); margin-bottom:16px; }
.cta-h em { color:var(--gold); font-style:italic; }
.cta-sub2 { font-size:1rem; color:rgba(245,237,216,.55); line-height:1.65; margin-bottom:36px; }
.cta-form { background:rgba(245,237,216,.05); border:1px solid rgba(245,237,216,.1); border-radius:20px; padding:32px; position:relative; z-index:1; }
.cta-lbl { font-size:.8rem; font-weight:600; color:rgba(245,237,216,.6); letter-spacing:.06em; text-transform:uppercase; display:block; margin-bottom:8px; }
.cta-inp { width:100%; background:rgba(245,237,216,.08); border:1px solid rgba(245,237,216,.15); border-radius:12px; padding:13px 16px; color:var(--cream); font-family:'DM Sans',sans-serif; font-size:.9375rem; outline:none; margin-bottom:14px; transition:border-color .2s; }
.cta-inp:focus { border-color:var(--gold); }
.cta-inp::placeholder { color:rgba(245,237,216,.3); }
.cta-disc { font-size:.75rem; color:rgba(245,237,216,.3); margin-top:12px; line-height:1.5; }

footer { background:var(--teak); padding:60px 60px 32px; border-top:1px solid rgba(245,237,216,.08); }
.footer-inner { max-width:1200px; margin:0 auto; }
.footer-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:48px; padding-bottom:48px; border-bottom:1px solid rgba(245,237,216,.08); }
.footer-logo { font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; color:var(--cream); margin-bottom:10px; }
.footer-logo span { color:var(--gold); }
.footer-tagline { font-size:.85rem; color:rgba(245,237,216,.4); max-width:240px; line-height:1.55; }
.footer-links { display:flex; gap:60px; }
.footer-col-ttl { font-size:.75rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(245,237,216,.4); margin-bottom:16px; }
.footer-col a { display:block; font-size:.875rem; color:rgba(245,237,216,.6); text-decoration:none; margin-bottom:10px; transition:color .2s; }
.footer-col a:hover { color:var(--amber); }
.footer-bot { display:flex; justify-content:space-between; align-items:center; }
.footer-copy { font-size:.8rem; color:rgba(245,237,216,.3); }
.footer-badge { display:inline-flex; align-items:center; gap:6px; background:rgba(200,146,42,.12); border:1px solid rgba(200,146,42,.2); border-radius:100px; padding:6px 12px; font-size:.75rem; color:var(--amber); font-weight:500; }

/* ══ CHAT MODAL ══ */
.modal-overlay {
  position:fixed; inset:0; z-index:1000;
  background:rgba(28,18,9,.72); backdrop-filter:blur(8px);
  display:flex; align-items:center; justify-content:center; padding:20px;
}
.modal-shell {
  width:100%; max-width:1060px; height:90vh; max-height:740px;
  background:var(--paper); border-radius:28px; overflow:hidden;
  display:grid; grid-template-columns:280px 1fr;
  box-shadow:0 40px 100px rgba(28,18,9,.4), 0 0 0 1px rgba(200,146,42,.15);
}
.chat-sidebar { background:var(--teak); display:flex; flex-direction:column; border-right:1px solid rgba(245,237,216,.08); overflow:hidden; }
.sidebar-hdr { padding:24px 20px 16px; border-bottom:1px solid rgba(245,237,216,.08); flex-shrink:0; }
.sidebar-logo { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:var(--cream); }
.sidebar-logo span { color:var(--gold); }
.sidebar-sub { font-size:.72rem; color:rgba(245,237,216,.4); margin-top:2px; }

.biz-profile { margin:14px; background:rgba(245,237,216,.06); border:1px solid rgba(200,146,42,.2); border-radius:14px; padding:14px; flex-shrink:0; }
.biz-profile-ttl { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(245,237,216,.4); margin-bottom:10px; }
.biz-select { width:100%; background:rgba(245,237,216,.08); border:1px solid rgba(245,237,216,.12); border-radius:8px; padding:8px 10px; color:var(--cream); font-family:'DM Sans',sans-serif; font-size:.8rem; outline:none; margin-bottom:8px; cursor:pointer; }
.biz-select option { background:var(--teak); color:var(--cream); }
.biz-tag-row { display:flex; flex-wrap:wrap; gap:5px; }
.biz-tag { font-size:.68rem; padding:3px 8px; border-radius:100px; background:rgba(200,146,42,.12); color:var(--amber); border:1px solid rgba(200,146,42,.2); }

.mode-sec { padding:0 14px 10px; flex-shrink:0; }
.mode-ttl { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(245,237,216,.4); margin-bottom:8px; }
.mode-btns { display:flex; flex-direction:column; gap:4px; }
.mode-btn { display:flex; align-items:center; gap:8px; padding:9px 12px; border-radius:10px; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.8rem; font-weight:500; transition:background .2s,color .2s; text-align:left; }
.mode-btn.active { background:rgba(200,146,42,.18); color:var(--amber); }
.mode-btn:not(.active) { background:transparent; color:rgba(245,237,216,.5); }
.mode-btn:not(.active):hover { background:rgba(245,237,216,.06); color:rgba(245,237,216,.8); }

.quick-sec { padding:0 14px; flex:1; overflow-y:auto; min-height:0; }
.quick-sec::-webkit-scrollbar{width:3px} .quick-sec::-webkit-scrollbar-track{background:transparent} .quick-sec::-webkit-scrollbar-thumb{background:rgba(245,237,216,.15);border-radius:10px}
.quick-ttl { font-size:.68rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; color:rgba(245,237,216,.4); margin-bottom:8px; margin-top:12px; }
.quick-btn { display:block; width:100%; text-align:left; padding:9px 12px; border-radius:10px; background:transparent; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.78rem; color:rgba(245,237,216,.6); line-height:1.4; transition:background .15s,color .15s; margin-bottom:4px; }
.quick-btn:hover { background:rgba(245,237,216,.08); color:rgba(245,237,216,.9); }

.sidebar-foot { padding:14px; border-top:1px solid rgba(245,237,216,.08); flex-shrink:0; }
.session-info { font-size:.72rem; color:rgba(245,237,216,.3); line-height:1.6; }
.clear-btn { margin-top:8px; width:100%; padding:8px; border-radius:8px; background:rgba(139,58,26,.2); border:1px solid rgba(139,58,26,.3); color:rgba(245,237,216,.5); font-family:'DM Sans',sans-serif; font-size:.75rem; cursor:pointer; transition:background .2s,color .2s; }
.clear-btn:hover { background:rgba(139,58,26,.35); color:var(--cream); }

.chat-main { display:flex; flex-direction:column; background:var(--paper); min-height:0; }
.chat-topbar { padding:14px 20px; border-bottom:1px solid rgba(200,146,42,.12); display:flex; align-items:center; justify-content:space-between; background:var(--cream); flex-shrink:0; }
.chat-topbar-left { display:flex; align-items:center; gap:12px; }
.ai-avatar-lg { width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,var(--gold),var(--amber)); display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
.chat-name-lg { font-family:'Playfair Display',serif; font-weight:700; font-size:1rem; color:var(--teak); }
.chat-mode-badge { font-size:.7rem; color:rgba(28,18,9,.5); margin-top:1px; }
.topbar-actions { display:flex; gap:6px; align-items:center; }
.top-btn { padding:6px 13px; border-radius:100px; border:1px solid rgba(200,146,42,.2); background:transparent; font-family:'DM Sans',sans-serif; font-size:.72rem; font-weight:500; color:rgba(28,18,9,.6); cursor:pointer; transition:background .2s,border-color .2s,color .2s; white-space:nowrap; }
.top-btn:hover { background:rgba(200,146,42,.1); border-color:var(--gold); color:var(--teak); }
.close-btn { width:32px; height:32px; border-radius:50%; border:1px solid rgba(200,146,42,.2); background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:.9rem; color:rgba(28,18,9,.5); transition:background .2s,color .2s; }
.close-btn:hover { background:rgba(139,58,26,.1); color:var(--rust); }

.messages-wrap { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:14px; min-height:0; }
.messages-wrap::-webkit-scrollbar{width:4px} .messages-wrap::-webkit-scrollbar-track{background:transparent} .messages-wrap::-webkit-scrollbar-thumb{background:rgba(200,146,42,.2);border-radius:10px}

.msg-row { display:flex; gap:10px; max-width:84%; }
.msg-row.user { flex-direction:row-reverse; margin-left:auto; }
.msg-avatar { width:32px; height:32px; border-radius:9px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:.85rem; }
.msg-avatar.ai { background:linear-gradient(135deg,var(--gold),var(--amber)); }
.msg-avatar.user { background:var(--teak); color:var(--cream); font-family:'Playfair Display',serif; font-weight:700; font-size:.8rem; }
.msg-bubble { padding:12px 16px; border-radius:16px; font-size:.875rem; line-height:1.65; }
.msg-bubble.ai { background:var(--cream); color:var(--teak); border:1px solid rgba(200,146,42,.15); border-radius:4px 16px 16px 16px; }
.msg-bubble.user { background:var(--teak); color:var(--cream); border-radius:16px 4px 16px 16px; }
.msg-bubble.error { background:#FEF2F2; color:#991B1B; border:1px solid #FCA5A5; border-radius:4px 16px 16px 16px; }
.msg-time { font-size:.68rem; color:rgba(28,18,9,.35); margin-top:4px; }
.msg-row.user .msg-time { text-align:right; }

.analysis-card { background:rgba(200,146,42,.06); border:1px solid rgba(200,146,42,.2); border-radius:12px; padding:14px; margin-top:10px; }
.analysis-card-ttl { font-weight:600; color:var(--gold); margin-bottom:8px; font-size:.8rem; letter-spacing:.04em; }
.analysis-row { display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(200,146,42,.08); }
.analysis-row:last-child { border-bottom:none; }
.analysis-key { font-size:.8rem; color:rgba(28,18,9,.55); }
.analysis-val { font-size:.8rem; font-weight:600; color:var(--teak); }

.typing-ind { display:flex; gap:4px; align-items:center; padding:10px 14px; }
.typing-ind span { width:6px; height:6px; border-radius:50%; background:var(--gold); opacity:.4; animation:typing 1.4s infinite ease-in-out; }
.typing-ind span:nth-child(2){animation-delay:.2s} .typing-ind span:nth-child(3){animation-delay:.4s}

.chat-input-area { padding:14px 20px; border-top:1px solid rgba(200,146,42,.12); background:var(--cream); flex-shrink:0; }
.input-row { display:flex; gap:10px; align-items:flex-end; }
.chat-textarea { flex:1; background:var(--paper); border:1.5px solid rgba(200,146,42,.2); border-radius:16px; padding:12px 16px; font-family:'DM Sans',sans-serif; font-size:.9rem; color:var(--teak); resize:none; outline:none; min-height:46px; max-height:120px; transition:border-color .2s,box-shadow .2s; line-height:1.5; }
.chat-textarea:focus { border-color:var(--gold); box-shadow:0 0 0 3px rgba(200,146,42,.12); }
.chat-textarea::placeholder { color:rgba(28,18,9,.35); }
.send-btn { width:44px; height:44px; border-radius:14px; border:none; background:var(--gold); color:var(--teak); font-size:1.1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .2s,transform .15s; flex-shrink:0; }
.send-btn:hover:not(:disabled) { background:var(--amber); transform:translateY(-1px); }
.send-btn:disabled { background:rgba(200,146,42,.3); cursor:not-allowed; }
.input-hints { display:flex; gap:6px; margin-top:8px; flex-wrap:wrap; }
.input-hint { font-size:.72rem; padding:4px 10px; border-radius:100px; background:rgba(200,146,42,.1); border:1px solid rgba(200,146,42,.2); color:rgba(28,18,9,.6); cursor:pointer; transition:background .15s,color .15s; white-space:nowrap; }
.input-hint:hover { background:rgba(200,146,42,.2); color:var(--teak); }

.summary-overlay { position:absolute; inset:0; background:rgba(250,245,233,.96); backdrop-filter:blur(6px); z-index:10; display:flex; align-items:center; justify-content:center; }
.summary-box { padding:40px; max-width:460px; width:100%; }
.summary-ttl { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:900; color:var(--teak); margin-bottom:4px; }
.summary-sub { font-size:.85rem; color:rgba(28,18,9,.5); margin-bottom:20px; }
.summary-item { background:var(--cream); border:1px solid rgba(200,146,42,.2); border-radius:12px; padding:14px 16px; margin-bottom:10px; }
.summary-item-ttl { font-weight:600; font-size:.85rem; color:var(--teak); margin-bottom:4px; }
.summary-item-txt { font-size:.8rem; color:rgba(28,18,9,.6); line-height:1.5; }

@media(max-width:900px){
  .hero{grid-template-columns:1fr} .hero-right{min-height:350px}
  .prob-grid,.feat-hdr,.feat-grid,.stats-inner,.testi-grid,.cta-inner{grid-template-columns:1fr}
  .stat-div{display:none}
  nav{padding:16px 24px}
  .prob-sec,.feat-sec,.stats-sec,.testi-sec,.cta-sec,footer{padding-left:24px;padding-right:24px}
  .hero-left{padding:60px 24px}
  .footer-top{flex-direction:column;gap:40px}
  .footer-links{flex-direction:column;gap:32px}
  .modal-shell{grid-template-columns:1fr;max-height:95vh}
  .chat-sidebar{display:none}
}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const BIZ_PROFILES = {
  kuliner:     { label: "🍜 Kuliner & F&B",    tags: ["Pricing Makanan","Margin HPP","Ekspansi Cabang","Stok"] },
  fashion:     { label: "👗 Fashion & Tekstil", tags: ["Branding","Dropship","Seasonal Stock","Sizing"] },
  manufaktur:  { label: "🏭 Manufaktur",        tags: ["Efisiensi Produksi","B2B Sales","Supply Chain","ROI"] },
  digital:     { label: "💻 Bisnis Digital",    tags: ["Growth Hacking","CAC/LTV","Monetisasi","SEO"] },
  retail:      { label: "🛒 Retail & Toko",     tags: ["Manajemen SKU","Pricing","Loyalitas","Cashflow"] },
};

const MODES = [
  { id: "mentor",   icon: "🎓", label: "Mentor Mode"      },
  { id: "strategy", icon: "♟️", label: "Strategy Analysis" },
  { id: "finance",  icon: "📊", label: "Finance Check"    },
  { id: "growth",   icon: "🚀", label: "Growth Planner"   },
];

const QUICK_PROMPTS = {
  mentor:   ["Bagaimana cara meningkatkan omzet 30% dalam 3 bulan?","Strategi retensi pelanggan terbaik untuk UMKM?","Kapan waktu tepat untuk ekspansi bisnis?"],
  strategy: ["Bantu saya analisis SWOT bisnis kuliner saya","Bagaimana menghadapi kompetitor baru di pasar?","Strategi diferensiasi produk yang efektif?"],
  finance:  ["Bagaimana cara menghitung BEP bisnis saya?","Tips mengelola cashflow UMKM yang sehat?","Kapan sebaiknya mengajukan kredit usaha?"],
  growth:   ["Bagaimana memulai ekspansi ke marketplace?","Strategi digital marketing dengan budget minimal?","Cara membangun tim yang solid untuk scale-up?"],
};

const HINTS = {
  mentor:   ["💡 Minta contoh konkret","📋 Buat action plan","🎯 Ukuran sukses"],
  strategy: ["📈 Analisis kompetitor","🗺️ Peta peluang","⚡ Quick wins"],
  finance:  ["🧮 Hitung HPP","📉 Kurangi biaya","💰 Proyeksi revenue"],
  growth:   ["📣 Rencana marketing","🤝 Partnership","📱 Konten viral"],
};

const WELCOME = {
  mentor:   "Halo! Saya KonsulAI siap jadi mentor bisnis Anda 🎓 Ceritakan situasi bisnis Anda saat ini, dan saya akan bantu dengan panduan yang actionable.",
  strategy: "Mode Strategy Analysis aktif ♟️ Saya akan bantu Anda berpikir strategis — dari analisis kompetitor hingga positioning. Bisnis apa yang ingin kita bahas?",
  finance:  "Mode Finance Check siap 📊 Saya bisa bantu analisis cashflow, pricing, margin, BEP, dan kesehatan keuangan UMKM Anda. Mulai dari mana?",
  growth:   "Mode Growth Planner aktif 🚀 Mari kita rancang strategi pertumbuhan bisnis Anda. Ceritakan target Anda dan kondisi saat ini!",
};

const PROBLEMS = [
  { icon: "⏳", title: "Mentoring Terlalu Lambat",   desc: "Konsultan tradisional mahal dan sulit diakses — meninggalkan sebagian besar UMKM tanpa panduan di saat kritis." },
  { icon: "🧩", title: "Keputusan Terlalu Kompleks", desc: "Strategi, keuangan, operasional — terlalu banyak variabel. Kebanyakan pemilik usaha memutuskan hanya berdasarkan insting." },
  { icon: "📚", title: "Pengetahuan Tersebar",       desc: "Edukasi bisnis yang relevan untuk UMKM Indonesia tersebar di berbagai tempat tanpa ada yang mengintegrasikannya." },
];

const FEATURES = [
  { icon: "⚡", num: "01", title: "Mentoring AI Instan",      desc: "Panduan strategis dalam detik, 24/7. Tidak perlu antri. Jawaban langsung dan actionable untuk bisnis Anda.", badge: "live" },
  { icon: "🎯", num: "02", title: "Framework Keputusan",      desc: "Coaching terstruktur untuk keuangan, operasional, dan pertumbuhan. Berpikir jernih dengan AI sebagai sparring partner.", badge: "live" },
  { icon: "📈", num: "03", title: "Growth Playbooks",         desc: "Strategi pertumbuhan yang dikurasi untuk UMKM — pricing, akuisisi pelanggan, kanal digital, dan lebih banyak.", badge: "live" },
  { icon: "🗺️", num: "04", title: "Konteks Lokal Indonesia",  desc: "Dilatih dengan data UMKM Indonesia — bukan saran SaaS generik. Regulasi, pasar, dan dinamika lokal yang nyata.", badge: "live" },
  { icon: "📊", num: "05", title: "Analisis Keuangan Cepat",  desc: "Hitung BEP, margin, dan proyeksi cashflow langsung dalam percakapan. Laporan keuangan sederhana otomatis.", badge: "soon" },
  { icon: "🤝", num: "06", title: "Jaringan Mentor Manusia",  desc: "Eskalasi ke mentor berpengalaman saat dibutuhkan. Hybrid AI + human mentoring untuk isu yang paling kompleks.", badge: "soon" },
];

const STATS = [
  { num: "12K+",  lbl: "UMKM menggunakan platform" },
  { num: "94%",   lbl: "pengguna melaporkan keputusan lebih cepat" },
  { num: "3.2×",  lbl: "rata-rata pertumbuhan revenue tahun pertama" },
  { num: "< 3s",  lbl: "rata-rata waktu respons AI" },
];

const TESTIMONIALS = [
  { text: "Sebelumnya saya bingung harus mulai dari mana. Chatbot ini langsung kasih strategi yang bisa dijalankan hari itu juga.", author: "Rizky A.", biz: "Kuliner, Surabaya", color: "#8B3A1A" },
  { text: "It felt like having a McKinsey consultant in my pocket — but one who actually understands the Indonesian market and how small businesses here really operate.", author: "Dewi S.", biz: "Fashion UMKM, Bandung", color: "#2D4A2D", featured: true },
  { text: "Saya pakai untuk bikin rencana ekspansi. Hasilnya lebih terstruktur dari yang saya bayangkan sebelumnya.", author: "Budi H.", biz: "Manufaktur, Semarang", color: "#C8922A" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const timeNow = () => new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: .65, delay, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
}

// ─── Mini Chat (hero) ─────────────────────────────────────────────────────────
function MiniChat() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setS(p => p < 3 ? p + 1 : p), s === 0 ? 700 : 1500);
    return () => clearTimeout(t);
  }, [s]);
  return (
    <div className="mini-chat">
      <div className="mini-chat-hdr">
        <div className="mini-ai-avatar">🤖</div>
        <div><div className="mini-ai-name">KonsulAI</div><div className="mini-ai-status">● Online sekarang</div></div>
      </div>
      {s >= 0 && <motion.div className="mini-msg" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className="mini-bubble bot">Halo! Apa tantangan bisnis Anda hari ini?</div></motion.div>}
      {s >= 1 && <motion.div className="mini-msg user" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className="mini-bubble user">Harga produk saya terlalu rendah</div></motion.div>}
      {s >= 2 && <motion.div className="mini-msg" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className="mini-bubble bot">Mari pakai Value-Based Pricing! Berapa HPP per unit Anda?</div></motion.div>}
      {s < 3 && <motion.div className="mini-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}><div className="mini-typing"><span /><span /><span /></div></motion.div>}
    </div>
  );
}

// ─── Chat Modal ───────────────────────────────────────────────────────────────
function ChatModal({ onClose }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("mentor");
  const [biz, setBiz] = useState("kuliner");
  const [showSummary, setShowSummary] = useState(false);
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    setMsgs([{ role: "ai", text: WELCOME[mode], time: timeNow(), id: Date.now() }]);
    setCount(0);
  }, [mode]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = useCallback(async (text) => {
    const t = (text || input).trim();
    if (!t || loading) return;
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";

    const userMsg = { role: "user", text: t, time: timeNow(), id: Date.now() };
    setMsgs(p => [...p, userMsg]);
    setCount(c => c + 1);
    setLoading(true);

    const history = msgs.map(m => ({ role: m.role === "ai" ? "model" : "user", parts: [{ text: m.text }] }));
    history.push({ role: "user", parts: [{ text: t }] });

    const ctx = `[Mode: ${MODES.find(m => m.id === mode)?.label}] [Profil: ${BIZ_PROFILES[biz]?.label}]`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT + "\n\n" + ctx }] },
            contents: history,
            generationConfig: { temperature: 0.8, maxOutputTokens: 800, topP: 0.95 }
          })
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, tidak ada respons. Coba lagi.";
      const showAnalysis = mode === "finance" && count >= 1 && Math.random() > .5;
      setMsgs(p => [...p, {
        role: "ai", text: aiText, time: timeNow(), id: Date.now(),
        analysis: showAnalysis ? { "Margin Estimasi": "32–45%", "BEP Bulanan": "~Rp 18jt", "Risiko Cashflow": "Sedang", "Rekomendasi": "Naikkan harga 15%" } : null
      }]);
    } catch (err) {
      setMsgs(p => [...p, { role: "ai", text: `⚠️ ${err.message}\n\nPastikan API key Gemini sudah diganti di baris GEMINI_API_KEY.`, time: timeNow(), id: Date.now(), isError: true }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, msgs, mode, biz, count]);

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };
  const handleInput = (e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; };

  const copyChat = () => {
    const txt = msgs.map(m => `${m.role === "ai" ? "KonsulAI" : "Saya"} [${m.time}]: ${m.text}`).join("\n\n");
    navigator.clipboard.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const summary = msgs.filter(m => m.role === "ai" && m.text.length > 60).slice(-4).map((m, i) => ({
    title: `Poin Kunci ${i + 1}`, text: m.text.slice(0, 130) + (m.text.length > 130 ? "…" : "")
  }));

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div className="modal-shell"
        initial={{ opacity: 0, scale: .93, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95, y: 20 }}
        transition={{ duration: .4, ease: [.22, 1, .36, 1] }}>

        {/* ── SIDEBAR ── */}
        <div className="chat-sidebar">
          <div className="sidebar-hdr">
            <div className="sidebar-logo">Konsul<span>AI</span></div>
            <div className="sidebar-sub">AI Business Consultant</div>
          </div>

          <div className="biz-profile">
            <div className="biz-profile-ttl">📁 Profil Bisnis Anda</div>
            <select className="biz-select" value={biz} onChange={e => setBiz(e.target.value)}>
              {Object.entries(BIZ_PROFILES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <div className="biz-tag-row">
              {BIZ_PROFILES[biz]?.tags.map(t => <span className="biz-tag" key={t}>{t}</span>)}
            </div>
          </div>

          <div className="mode-sec">
            <div className="mode-ttl">Mode Konsultasi</div>
            <div className="mode-btns">
              {MODES.map(m => (
                <button key={m.id} className={`mode-btn ${mode === m.id ? "active" : ""}`} onClick={() => setMode(m.id)}>
                  <span>{m.icon}</span>{m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="quick-sec">
            <div className="quick-ttl">💬 Pertanyaan Cepat</div>
            {(QUICK_PROMPTS[mode] || []).map((q, i) => (
              <button key={i} className="quick-btn" onClick={() => send(q)}>"{q}"</button>
            ))}
          </div>

          <div className="sidebar-foot">
            <div className="session-info">
              💬 {count} pesan dalam sesi ini<br />
              🔒 Data tidak disimpan<br />
              ⚡ Powered by Gemini AI
            </div>
            <button className="clear-btn" onClick={() => { setMsgs([{ role: "ai", text: WELCOME[mode], time: timeNow(), id: Date.now() }]); setCount(0); }}>
              🗑 Hapus Percakapan
            </button>
          </div>
        </div>

        {/* ── MAIN CHAT ── */}
        <div className="chat-main" style={{ position: "relative" }}>
          <div className="chat-topbar">
            <div className="chat-topbar-left">
              <div className="ai-avatar-lg">🤖</div>
              <div>
                <div className="chat-name-lg">KonsulAI Assistant</div>
                <div className="chat-mode-badge">{MODES.find(m => m.id === mode)?.icon} {MODES.find(m => m.id === mode)?.label} · {BIZ_PROFILES[biz]?.label}</div>
              </div>
            </div>
            <div className="topbar-actions">
              <button className="top-btn" onClick={() => setShowSummary(true)}>📋 Ringkasan</button>
              <button className="top-btn" onClick={copyChat}>{copied ? "✓ Disalin!" : "📋 Salin"}</button>
              <button className="close-btn" onClick={onClose}>✕</button>
            </div>
          </div>

          <div className="messages-wrap">
            <AnimatePresence initial={false}>
              {msgs.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>
                  <div className={`msg-row ${msg.role}`}>
                    <div className={`msg-avatar ${msg.role}`}>{msg.role === "ai" ? "🤖" : "A"}</div>
                    <div style={{ minWidth: 0 }}>
                      <div className={`msg-bubble ${msg.role} ${msg.isError ? "error" : ""}`} style={{ whiteSpace: "pre-wrap" }}>
                        {msg.text}
                        {msg.analysis && (
                          <div className="analysis-card">
                            <div className="analysis-card-ttl">📊 Analisis Cepat KonsulAI</div>
                            {Object.entries(msg.analysis).map(([k, v]) => (
                              <div className="analysis-row" key={k}>
                                <span className="analysis-key">{k}</span>
                                <span className="analysis-val">{v}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="msg-time">{msg.time}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div className="msg-row ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="msg-avatar ai">🤖</div>
                <div className="msg-bubble ai" style={{ padding: "8px 14px" }}>
                  <div className="typing-ind"><span /><span /><span /></div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <div className="input-row">
              <textarea
                ref={taRef}
                className="chat-textarea"
                placeholder="Tanyakan seputar strategi, keuangan, atau pertumbuhan bisnis Anda..."
                value={input}
                onChange={handleInput}
                onKeyDown={handleKey}
                rows={1}
              />
              <button className="send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
                {loading ? "⏳" : "↑"}
              </button>
            </div>
            <div className="input-hints">
              {(HINTS[mode] || []).map((h, i) => (
                <button key={i} className="input-hint"
                  onClick={() => { setInput(p => p ? p + " " + h : h); taRef.current?.focus(); }}>
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Summary overlay */}
          <AnimatePresence>
            {showSummary && (
              <motion.div className="summary-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="summary-box">
                  <div className="summary-ttl">📋 Ringkasan Sesi</div>
                  <div className="summary-sub">{count} pesan · {MODES.find(m => m.id === mode)?.label} · {BIZ_PROFILES[biz]?.label}</div>
                  {summary.length > 0 ? summary.map((s, i) => (
                    <div className="summary-item" key={i}>
                      <div className="summary-item-ttl">{s.title}</div>
                      <div className="summary-item-txt">{s.text}</div>
                    </div>
                  )) : (
                    <div className="summary-item">
                      <div className="summary-item-ttl">Belum ada percakapan</div>
                      <div className="summary-item-txt">Mulai konsultasi untuk mendapatkan ringkasan sesi Anda.</div>
                    </div>
                  )}
                  <button className="btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }} onClick={() => setShowSummary(false)}>
                    ← Kembali ke Chat
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{FONTS + CSS}</style>
      <AnimatePresence>{chatOpen && <ChatModal onClose={() => setChatOpen(false)} />}</AnimatePresence>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">Konsul<span>AI</span></a>
        <div className="nav-links">
          <a href="#">Fitur</a>
          <a href="#">Harga</a>
          <a href="#">Tentang</a>
          <button className="btn-nav" onClick={() => setChatOpen(true)}>Coba Gratis</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero batik-bg">
        <div className="hero-left">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
            <div className="hero-eyebrow"><span className="eyebrow-dot" /> AI Consulting untuk UMKM Indonesia</div>
            <h1 className="hero-headline">Bisnis yang lebih <em>cerdas</em> dimulai dari sini</h1>
            <p className="hero-sub">Mentor bisnis berbasis AI yang memahami konteks Indonesia. Dapatkan strategi, keputusan, dan panduan pertumbuhan — kapan saja, dalam hitungan detik.</p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => setChatOpen(true)}>Mulai Konsultasi Gratis →</button>
              <button className="btn-secondary" onClick={() => setChatOpen(true)}>Lihat Demo</button>
            </div>
            <div className="hero-proof">
              <div className="avatars">
                {[["#8B3A1A","R"],["#2D4A2D","D"],["#C8922A","B"],["#4A3060","S"]].map(([bg,l],i) => (
                  <div className="avatar" key={i} style={{ background: bg }}>{l}</div>
                ))}
              </div>
              <div className="proof-text">Dipercaya <strong>12.000+ pelaku UMKM</strong><br />dari Sabang sampai Merauke</div>
            </div>
          </motion.div>
        </div>
        <div className="hero-right">
          <div className="hero-deco" />
          <motion.div initial={{ opacity: 0, scale: .92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .3, ease: [.22, 1, .36, 1] }}>
            <MiniChat />
          </motion.div>
        </div>
      </div>

      {/* PROBLEM */}
      <div className="prob-sec batik-bg">
        <div className="prob-grid">
          <FadeUp>
            <div className="sec-tag">Masalah yang Kami Selesaikan</div>
            <h2 className="sec-h">Kenapa UMKM sulit <em>berkembang?</em></h2>
            <p className="sec-sub">Tiga hambatan terbesar yang menghalangi pertumbuhan bisnis kecil menengah Indonesia.</p>
          </FadeUp>
          <div className="prob-cards">
            {PROBLEMS.map((p, i) => (
              <FadeUp key={i} delay={i * .12}>
                <div className="prob-card">
                  <div className="prob-icon">{p.icon}</div>
                  <div><div className="prob-title">{p.title}</div><div className="prob-desc">{p.desc}</div></div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-sec">
        <div className="stats-inner">
          {STATS.map((s, i) => (
            <>
              <FadeUp key={i} delay={i * .1}><div className="stat-item"><div className="stat-num">{s.num}</div><div className="stat-lbl">{s.lbl}</div></div></FadeUp>
              {i < STATS.length - 1 && <div className="stat-div" key={`d${i}`} />}
            </>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="feat-sec">
        <div className="feat-hdr">
          <FadeUp>
            <div className="sec-tag">Fitur Unggulan</div>
            <h2 className="sec-h">Semua yang Anda butuhkan untuk <em>berkembang</em></h2>
          </FadeUp>
          <FadeUp delay={.1}><p className="sec-sub">Dari mentoring instan hingga playbook pertumbuhan — dirancang khusus untuk realita bisnis Indonesia.</p></FadeUp>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f, i) => (
            <FadeUp key={i} delay={i * .08}>
              <div className="feat-card">
                <div className="feat-num">{f.num}</div>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
                <span className={`feat-badge badge-${f.badge}`}>{f.badge === "live" ? "✓ Live" : "🔜 Segera"}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testi-sec">
        <div className="testi-inner">
          <FadeUp>
            <div className="sec-tag">Apa Kata Mereka</div>
            <h2 className="sec-h">Pelaku UMKM yang sudah <em>merasakan</em></h2>
          </FadeUp>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={i} delay={i * .1}>
                <div className={`testi-card ${t.featured ? "featured" : ""}`}>
                  <div className="stars">★★★★★</div>
                  <span className="quote-mark">"</span>
                  <p className="testi-txt">{t.text}</p>
                  <div className="testi-author">
                    <div className="author-av" style={{ background: t.color }}>{t.author[0]}</div>
                    <div><div className="author-name">{t.author}</div><div className="author-biz">{t.biz}</div></div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-sec">
        <div className="cta-inner">
          <FadeUp>
            <div>
              <div style={{ fontSize:".75rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:12 }}>Mulai Hari Ini</div>
              <h2 className="cta-h">Siap konsultasi dengan <em>AI Anda?</em></h2>
              <p className="cta-sub2">Bergabung dengan 12.000+ pengusaha UMKM yang sudah menggunakan KonsulAI untuk mengambil keputusan lebih cepat dan tumbuh lebih cerdas.</p>
              <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={() => setChatOpen(true)}>Coba Demo Sekarang →</button>
                <a href="#" className="btn-secondary" style={{ color:"rgba(245,237,216,.7)",borderColor:"rgba(245,237,216,.2)" }}>Lihat Paket Harga</a>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={.15}>
            <div className="cta-form">
              <label className="cta-lbl">Nama Bisnis Anda</label>
              <input className="cta-inp" placeholder="Toko Maju Jaya" />
              <label className="cta-lbl">Email Anda</label>
              <input className="cta-inp" placeholder="anda@bisnis.com" />
              <label className="cta-lbl">Sektor Bisnis</label>
              <input className="cta-inp" placeholder="Kuliner / Fashion / Manufaktur..." />
              <button className="btn-primary" style={{ width:"100%",justifyContent:"center",marginTop:4 }} onClick={() => setChatOpen(true)}>
                Mulai Konsultasi Gratis
              </button>
              <p className="cta-disc">✓ Gratis 14 hari &nbsp;·&nbsp; ✓ Tanpa kartu kredit &nbsp;·&nbsp; ✓ Batalkan kapan saja</p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">Konsul<span>AI</span></div>
              <div className="footer-tagline">AI Consulting untuk pelaku UMKM Indonesia yang ingin tumbuh lebih cerdas.</div>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <div className="footer-col-ttl">Produk</div>
                <a href="#">Fitur</a><a href="#">Harga</a><a href="#">Demo</a><a href="#">API</a>
              </div>
              <div className="footer-col">
                <div className="footer-col-ttl">Perusahaan</div>
                <a href="#">Tentang</a><a href="#">Blog</a><a href="#">Karir</a><a href="#">Kontak</a>
              </div>
              <div className="footer-col">
                <div className="footer-col-ttl">Legal</div>
                <a href="#">Privasi</a><a href="#">Syarat</a><a href="#">Cookies</a>
              </div>
            </div>
          </div>
          <div className="footer-bot">
            <div className="footer-copy">© 2025 KonsulAI. Dibuat dengan ❤ untuk UMKM Indonesia.</div>
            <div className="footer-badge">🇮🇩 Made for Indonesia</div>
          </div>
        </div>
      </footer>
    </>
  );
}