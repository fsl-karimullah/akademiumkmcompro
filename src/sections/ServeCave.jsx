import React from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const IklanSection = () => {
  return (
    <div className="w-full py-20 px-6 md:px-20 bg-white relative overflow-hidden border-t border-gray-200">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-[#C8922A] opacity-10 rounded-full -z-10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#2D4A2D] opacity-10 rounded-full -z-10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8922A] opacity-5 rounded-full -z-10 blur-3xl" />

      {/* Card */}
      <div
        className="relative rounded-3xl border border-[#e8d9b8] px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1C1209 0%, #2a1c0e 60%, #2D4A2D 100%)",
          boxShadow: "0 24px 64px rgba(28,18,9,0.25), 0 0 0 1px rgba(200,146,42,0.2)",
        }}
      >
        {/* Batik dot texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%23C8922A'/%3E%3Ccircle cx='50' cy='10' r='1.5' fill='%23C8922A'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%23C8922A'/%3E%3Ccircle cx='10' cy='50' r='1' fill='%23C8922A'/%3E%3Ccircle cx='50' cy='50' r='1' fill='%23C8922A'/%3E%3Cpath d='M0 20 Q15 10 30 20 Q45 30 60 20' stroke='%23C8922A' stroke-width='.5' fill='none'/%3E%3Cpath d='M0 40 Q15 30 30 40 Q45 50 60 40' stroke='%23C8922A' stroke-width='.5' fill='none'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Glowing orb behind logo */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,146,42,0.15) 0%, transparent 70%)" }}
        />

        {/* Pulsing star icon top-right */}
        <AutoAwesomeIcon
          className="absolute top-5 right-5 animate-pulse"
          style={{ color: "#C8922A", fontSize: "2rem", opacity: 0.7 }}
        />

        {/* ── Text Content ── */}
        <div className="relative z-10 text-center md:text-left space-y-6 max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(200,146,42,0.15)", borderColor: "rgba(200,146,42,0.35)", color: "#E8B14A" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B14A] animate-pulse inline-block" />
            AI Business Consultant · Khusus UMKM Indonesia
          </div>

          <h2
            className="text-3xl md:text-4xl font-black leading-snug"
            style={{ fontFamily: "'Georgia', serif", color: "#F5EDD8", letterSpacing: "-0.02em" }}
          >
            Konsultasi Bisnis Lebih Cepat <br />
            dengan{" "}
            <span style={{ color: "#C8922A", fontStyle: "italic" }}>
              KonsulAI®
            </span>
          </h2>

          <ul className="space-y-2.5 text-sm md:text-base" style={{ color: "rgba(245,237,216,0.75)" }}>
            <li>⚡ Mentor AI instan — jawaban strategi dalam hitungan detik</li>
            <li>🎯 4 mode konsultasi: Mentor, Strategi, Keuangan & Growth</li>
            <li>🗺️ Dilatih dengan konteks pasar & regulasi Indonesia</li>
            <li>🔒 Gratis 14 hari — tanpa kartu kredit, tanpa risiko</li>
          </ul>

          {/* Social proof */}
          <div className="flex items-center gap-3 justify-center md:justify-start pt-1">
            <div className="flex">
              {[["#8B3A1A","R"],["#2D4A2D","D"],["#C8922A","B"],["#4A3060","S"]].map(([bg, l], i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white -mr-2"
                  style={{ background: bg, borderColor: "#1C1209" }}
                >
                  {l}
                </div>
              ))}
            </div>
            <span className="text-xs" style={{ color: "rgba(245,237,216,0.5)" }}>
              Dipercaya <strong style={{ color: "rgba(245,237,216,0.85)" }}>12.000+ UMKM</strong> Indonesia
            </span>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="/ai-consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold rounded-full transition-all"
              style={{
                background: "linear-gradient(135deg, #C8922A, #E8B14A)",
                color: "#1C1209",
                padding: "14px 32px",
                fontSize: "0.9375rem",
                boxShadow: "0 6px 24px rgba(200,146,42,0.4)",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(200,146,42,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(200,146,42,0.4)"; }}
            >
              🚀 Coba KonsulAI Gratis Sekarang
            </a>
          </div>
        </div>

        {/* ── Right Visual ── */}
        <div className="relative z-10 flex-shrink-0 flex flex-col items-center gap-4">
          {/* AI Chat bubble mockup */}
          <div
            className="w-[200px] md:w-[240px] rounded-2xl p-4 space-y-3"
            style={{
              background: "rgba(245,237,216,0.07)",
              border: "1px solid rgba(245,237,216,0.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 pb-3" style={{ borderBottom: "1px solid rgba(245,237,216,0.1)" }}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#C8922A,#E8B14A)" }}
              >
                🤖
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "#F5EDD8" }}>KonsulAI</div>
                <div className="text-[10px]" style={{ color: "rgba(245,237,216,0.45)" }}>● Online sekarang</div>
              </div>
            </div>

            {/* Chat bubbles */}
            <div
              className="text-xs rounded-xl px-3 py-2 leading-relaxed"
              style={{ background: "rgba(245,237,216,0.1)", color: "rgba(245,237,216,0.8)", borderRadius: "4px 12px 12px 12px" }}
            >
              Apa tantangan bisnis Anda hari ini?
            </div>
            <div
              className="text-xs rounded-xl px-3 py-2 leading-relaxed ml-4 font-medium"
              style={{ background: "linear-gradient(135deg,#C8922A,#E8B14A)", color: "#1C1209", borderRadius: "12px 4px 12px 12px" }}
            >
              Pricing produk saya terlalu rendah
            </div>
            <div
              className="text-xs rounded-xl px-3 py-2 leading-relaxed"
              style={{ background: "rgba(245,237,216,0.1)", color: "rgba(245,237,216,0.8)", borderRadius: "4px 12px 12px 12px" }}
            >
              Mari gunakan Value-Based Pricing! Berapa HPP per unit Anda?
            </div>

            {/* Typing dots */}
            <div className="flex gap-1 px-3 py-2" style={{ background: "rgba(245,237,216,0.07)", borderRadius: "4px 12px 12px 12px", width: "fit-content" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{
                    background: "rgba(200,146,42,0.6)",
                    animation: `bounce 1.4s ${d}s infinite ease-in-out`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mode badges */}
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[220px]">
            {["🎓 Mentor","♟️ Strategi","📊 Finance","🚀 Growth"].map(m => (
              <span
                key={m}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(200,146,42,0.15)", border: "1px solid rgba(200,146,42,0.25)", color: "#E8B14A" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IklanSection;