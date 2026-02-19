import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Logo from "./Logo";

// ─── FLAT list for mobile (all items visible, no grouping) ───
const allMenuItems = [
  { name: "Beranda",        path: "/",               icon: "🏠" },
  { name: "Go Digital",     path: "/bantu-branding",  icon: "🌐" },
  { name: "Konsultasi",     path: "/konsultasi",      icon: "💬" },
  { name: "Produk Digital", path: "/produk-digital",  icon: "📦" },
  { name: "Kursus",         path: "/courses",         icon: "🎓" },
  { name: "Event",          path: "/event",           icon: "📅" },
  { name: "UMKM Showcase",  path: "/umkm-showcase",   icon: "🏪" },
  { name: "Artikel",        path: "/allnews",         icon: "📰" },
  { name: "Tentang Kami",   path: "/about",           icon: "ℹ️" },
];

// ─── GROUPED for desktop mega menu ───────────────────────
const menuGroups = [
  { label: "Beranda", path: "/", single: true },
  {
    label: "Layanan", icon: "🛠️",
    children: [
      { name: "Go Digital",     path: "/bantu-branding", desc: "Buat website & branding bisnis Anda", icon: "🌐" },
      { name: "Konsultasi",     path: "/konsultasi",     desc: "Sesi 1-on-1 dengan mentor bisnis",    icon: "💬" },
      { name: "Produk Digital", path: "/produk-digital", desc: "Produk digital siap pakai",           icon: "📦" },
      { name: "Kursus",         path: "/courses",        desc: "Belajar bisnis dari ahlinya",         icon: "🎓" },
    ],
  },
  {
    label: "Komunitas", icon: "🤝",
    children: [
      { name: "Event",         path: "/event",         desc: "Workshop, seminar & networking",     icon: "📅" },
      { name: "UMKM Showcase", path: "/umkm-showcase", desc: "Direktori bisnis digital Indonesia", icon: "🏪" },
      { name: "Artikel",       path: "/allnews",       desc: "Tips & insight bisnis terkini",      icon: "📰" },
    ],
  },
  { label: "Tentang Kami", path: "/about", single: true },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [activeGroup,     setActiveGroup]      = useState(null);
  const [profileOpen,     setProfileOpen]      = useState(false);
  const [scrolled,        setScrolled]         = useState(false);
  const [isAuthenticated, setIsAuthenticated]  = useState(false);
  const [userName,        setUserName]         = useState("");
  const [isMobile,        setIsMobile]         = useState(false);

  const profileRef   = useRef(null);
  const megaRef      = useRef(null);
  const hoverTimeout = useRef(null);

  // ─── Init ───────────────────────────────────────────────
  useEffect(() => {
    // Check viewport
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Auth
    setIsAuthenticated(!!localStorage.getItem("userToken"));
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);

    // Scroll
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Outside click closes dropdowns
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (megaRef.current   && !megaRef.current.contains(e.target))     setActiveGroup(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on navigation
  useEffect(() => {
    setMobileOpen(false);
    setActiveGroup(null);
    setProfileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile panel open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label) => {
    clearTimeout(hoverTimeout.current);
    setActiveGroup(label);
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setActiveGroup(null), 150);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setProfileOpen(false);
    navigate("/");
  };

  const isGroupActive = (group) =>
    group.single
      ? location.pathname === group.path
      : group.children?.some((c) => location.pathname === c.path);

  // ─── MOBILE PANEL via portal (renders into document.body, bypasses sticky stacking context) ───
  const MobilePortal = mobileOpen
    ? createPortal(
        <>
          {/* Dim overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.45)",
              zIndex: 9998,
              backdropFilter: "blur(3px)",
              animation: "navFadeIn 0.2s ease",
            }}
          />

          {/* Slide-in drawer */}
          <div
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: 300,
              background: "white",
              zIndex: 9999,
              display: "flex", flexDirection: "column",
              boxShadow: "-8px 0 48px rgba(0,0,0,0.16)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              animation: "navSlideIn 0.25s ease",
              overflowY: "auto",
            }}
          >
            {/* Panel header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "18px 20px", borderBottom: "1px solid #f3f4f6", flexShrink: 0,
            }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a2e" }}>Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: 8, border: "none", background: "none",
                  borderRadius: 10, cursor: "pointer", color: "#6b7280",
                  display: "flex", alignItems: "center",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ─── FLAT MENU ITEMS (no grouping on mobile) ─── */}
            <div style={{ padding: "10px 12px", flex: 1 }}>
              {allMenuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "11px 14px", borderRadius: 10, margin: "2px 0",
                      fontSize: "0.9rem", fontWeight: 600,
                      color: active ? "#d61355" : "#374151",
                      background: active ? "#fff0f4" : "transparent",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: "1.15rem", width: 26, textAlign: "center", flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* ─── MOBILE AUTH ─── */}
            <div style={{ padding: "14px 14px 32px", borderTop: "1px solid #f3f4f6", flexShrink: 0 }}>
              {isAuthenticated ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 14px", background: "#f9fafb",
                      borderRadius: 12, textDecoration: "none",
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                      color: "white", fontWeight: 800, fontSize: "1rem",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {userName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>{userName || "Pengguna"}</div>
                      <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Lihat Profil →</div>
                    </div>
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    style={{
                      width: "100%", padding: 12, borderRadius: 10,
                      border: "1px solid #fee2e2", background: "#fff5f5",
                      color: "#dc2626", fontWeight: 700, fontSize: "0.88rem",
                      cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    🚪 Keluar
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button
                    onClick={() => { navigate("/login"); setMobileOpen(false); }}
                    style={{
                      width: "100%", padding: 12, borderRadius: 10,
                      border: "1.5px solid #e5e7eb", background: "white",
                      color: "#374151", fontWeight: 700, fontSize: "0.9rem",
                      cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => { navigate("/register"); setMobileOpen(false); }}
                    style={{
                      width: "100%", padding: 12, borderRadius: 10,
                      background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                      color: "white", fontWeight: 700, fontSize: "0.9rem",
                      border: "none", cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(214,19,85,0.25)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Daftar Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes navFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes navSlideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
        @keyframes megaIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <header style={{
        position: "sticky", top: 0, zIndex: 999,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.3s",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", height: 64,
          padding: "0 24px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo />
            {!isMobile && (
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#d61355" }}>
                Akademi UMKM
              </span>
            )}
          </Link>

          {/* ─── DESKTOP NAV ─── */}
          {!isMobile && (
            <nav
              ref={megaRef}
              style={{ display: "flex", alignItems: "center", gap: 2 }}
              onMouseLeave={handleMouseLeave}
            >
              {menuGroups.map((group) =>
                group.single ? (
                  <Link
                    key={group.label}
                    to={group.path}
                    style={{
                      display: "flex", alignItems: "center",
                      padding: "8px 14px", borderRadius: 10,
                      fontSize: "0.875rem", fontWeight: 600,
                      color: location.pathname === group.path ? "#d61355" : "#4b5563",
                      background: location.pathname === group.path ? "#fff0f4" : "transparent",
                      textDecoration: "none", whiteSpace: "nowrap",
                      transition: "all 0.18s",
                    }}
                  >
                    {group.label}
                  </Link>
                ) : (
                  <div key={group.label} style={{ position: "relative" }}
                    onMouseEnter={() => handleMouseEnter(group.label)}
                  >
                    <button style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "8px 14px", borderRadius: 10,
                      fontSize: "0.875rem", fontWeight: 600,
                      color: isGroupActive(group) || activeGroup === group.label ? "#d61355" : "#4b5563",
                      background: isGroupActive(group) || activeGroup === group.label ? "#fff0f4" : "transparent",
                      cursor: "pointer", border: "none", whiteSpace: "nowrap",
                      transition: "all 0.18s",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      {group.label}
                      <span style={{
                        fontSize: "0.55rem", opacity: 0.6,
                        display: "inline-block",
                        transform: activeGroup === group.label ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}>▼</span>
                    </button>

                    {activeGroup === group.label && (
                      <div
                        style={{
                          position: "absolute", top: "calc(100% + 8px)", left: "50%",
                          transform: "translateX(-50%)",
                          background: "white",
                          borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                          padding: 12, minWidth: 480,
                          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4,
                          zIndex: 200, animation: "megaIn 0.18s ease",
                        }}
                        onMouseEnter={() => handleMouseEnter(group.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {group.children.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setActiveGroup(null)}
                            style={{
                              display: "flex", gap: 12, alignItems: "flex-start",
                              padding: "12px 14px", borderRadius: 10,
                              textDecoration: "none",
                              transition: "background 0.15s",
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "#fff0f4"}
                            onMouseOut={(e)  => e.currentTarget.style.background = "transparent"}
                          >
                            <div style={{
                              width: 38, height: 38, borderRadius: 10,
                              background: "#fff0f4", display: "flex",
                              alignItems: "center", justifyContent: "center",
                              fontSize: "1.1rem", flexShrink: 0,
                            }}>
                              {item.icon}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: "0.875rem" }}>
                                {item.name}
                              </div>
                              <div style={{ color: "#9ca3af", fontSize: "0.77rem", marginTop: 2, lineHeight: 1.4 }}>
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </nav>
          )}

          {/* ─── DESKTOP AUTH ─── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {isAuthenticated ? (
                <div style={{ position: "relative" }} ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "6px 10px 6px 6px", borderRadius: 10,
                      border: "1.5px solid rgba(0,0,0,0.08)", background: "none",
                      cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                      color: "white", fontWeight: 800, fontSize: "0.85rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {userName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#374151" }}>
                      {userName || "Akun"}
                    </span>
                    <span style={{
                      fontSize: "0.55rem", color: "#9ca3af",
                      transform: profileOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s", display: "inline-block",
                    }}>▼</span>
                  </button>

                  {profileOpen && (
                    <div style={{
                      position: "absolute", right: 0, top: "calc(100% + 8px)",
                      width: 200, background: "white",
                      border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                      padding: 6, zIndex: 300,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid #f3f4f6", marginBottom: 4 }}>
                        <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#1a1a2e" }}>{userName}</div>
                        <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>Member Aktif</div>
                      </div>
                      {[
                        { label: "👤 Profil Saya", to: "/profile" },
                        { label: "🎓 Kursus Saya", to: "/course" },
                      ].map((item) => (
                        <Link key={item.to} to={item.to}
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "10px 12px", borderRadius: 9, fontSize: "0.85rem",
                            fontWeight: 600, color: "#374151", textDecoration: "none",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = "#f9fafb"}
                          onMouseOut={(e)  => e.currentTarget.style.background = "transparent"}
                        >
                          {item.label}
                        </Link>
                      ))}
                      <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "6px 0" }} />
                      <button
                        onClick={handleLogout}
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "10px 12px", borderRadius: 9, fontSize: "0.85rem",
                          fontWeight: 600, color: "#dc2626", border: "none",
                          background: "none", width: "100%", cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "#fff5f5"}
                        onMouseOut={(e)  => e.currentTarget.style.background = "transparent"}
                      >
                        🚪 Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      padding: "7px 18px", borderRadius: 9, fontSize: "0.85rem",
                      fontWeight: 700, color: "#4b5563", border: "none",
                      background: "none", cursor: "pointer",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    style={{
                      padding: "8px 18px", borderRadius: 9, fontSize: "0.85rem",
                      fontWeight: 700, color: "white",
                      background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                      border: "none", cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(214,19,85,0.3)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Daftar
                  </button>
                </>
              )}
            </div>
          )}

          {/* ─── MOBILE: Daftar shortcut + Hamburger ─── */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/register")}
                  style={{
                    padding: "7px 16px", borderRadius: 9, fontSize: "0.82rem",
                    fontWeight: 700, color: "white",
                    background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Daftar
                </button>
              )}
              {isAuthenticated && (
                <div
                  onClick={() => navigate("/profile")}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                    color: "white", fontWeight: 800, fontSize: "0.95rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {userName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Buka menu"
                style={{
                  padding: 8, border: "none", background: "none",
                  borderRadius: 10, cursor: "pointer", color: "#4b5563",
                  display: "flex", alignItems: "center",
                }}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile panel rendered into document.body via portal */}
      {MobilePortal}
    </>
  );
};

export default Navbar;
