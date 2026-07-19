import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import { endpoint } from "../endpoint/api";

function getInitials(name) {
  if (!name) return "P";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w?.[0] || "")
    .join("")
    .toUpperCase();
}

function formatWhatsApp(number) {
  if (!number) return null;
  const cleaned = String(number).replace(/\D/g, "");
  if (!cleaned) return null;
  if (cleaned.startsWith("0")) return "62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return cleaned;
  return "62" + cleaned;
}

const PartnersPage = ({ currentPath }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(endpoint.getPartners);
        setPartners(response.data.data || []);
      } catch (err) {
        setError("Gagal memuat data partner. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const filteredPartners = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter((p) => {
      const name = String(p.company_name || "").toLowerCase();
      const sector = String(p.business_sector || "").toLowerCase();
      const code = String(p.code || "").toLowerCase();
      return name.includes(q) || sector.includes(q) || code.includes(q);
    });
  }, [partners, query]);

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar currentPath={currentPath} />

      <section className="px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-rose-50 text-[var(--themeRed)] text-xs font-extrabold px-4 py-2 rounded-full border border-rose-100 mb-4 uppercase tracking-wider">
              🤝 Ecosystem
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Our Ecosystem <span className="text-[var(--themeRed)]">Partners</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Jelajahi seluruh partner yang tergabung dalam ekosistem kami, dan hubungi langsung via WhatsApp.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-8">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
              <span className="text-gray-400">🔎</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari partner (nama, sektor, kode)..."
                className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div key={idx} className="h-[240px] rounded-2xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-56">
              <p className="text-lg font-semibold text-red-500">{error}</p>
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="flex justify-center items-center h-56">
              <p className="text-gray-500 text-base">Kami Sedang Menyiapkan Partner.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPartners.map((partner) => {
                const waNumber = formatWhatsApp(partner.pic_whatsapp);
                const waMessage = encodeURIComponent(
                  `Halo saya member dari akademi UMKM dengan kode "${partner.code}" saya ingin bertanya lebih detail tentang "${partner.company_name}" di "${partner.business_sector}".`
                );
                const waLink = waNumber ? `https://wa.me/${waNumber}?text=${waMessage}` : null;

                return (
                  <div
                    key={partner.id || partner.code}
                    className="group relative bg-white rounded-2xl border border-rose-100/80 shadow-md hover:shadow-2xl hover:shadow-rose-200/40 transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Top accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-[var(--themeRed)] via-rose-400 to-orange-300" />

                    <div className="p-5 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[var(--themeRed)] to-rose-400 text-white flex items-center justify-center font-extrabold text-base tracking-wide shadow-md shrink-0">
                          {getInitials(partner.company_name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-gray-900 font-extrabold text-[15px] leading-snug line-clamp-2 flex-1">
                              {partner.company_name}
                            </h3>
                            {partner.code && (
                              <span className="shrink-0 font-mono text-[10px] font-bold text-[var(--themeRed)] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full tracking-widest mt-0.5">
                                {partner.code}
                              </span>
                            )}
                          </div>
                          {partner.business_sector && (
                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">
                              <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              {partner.business_sector}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expandable detail */}
                      <details className="mt-4 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3">
                        <summary className="cursor-pointer text-sm font-semibold text-gray-600 select-none flex items-center justify-between">
                          <span>Detail Partner</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="mt-3 grid gap-2 text-sm text-gray-600">
                          {partner.address && (
                            <div className="flex gap-2 items-start">
                              <span className="text-gray-400 mt-0.5">📍</span>
                              <span className="min-w-0 break-words">{partner.address}</span>
                            </div>
                          )}
                          {partner.pic_name && (
                            <div className="flex gap-2 items-start">
                              <span className="text-gray-400 mt-0.5">👤</span>
                              <span className="min-w-0 break-words">{partner.pic_name}</span>
                            </div>
                          )}
                          {partner.pic_email && (
                            <a className="flex gap-2 items-start hover:underline text-blue-600" href={`mailto:${partner.pic_email}`}>
                              <span className="text-gray-400 mt-0.5">✉️</span>
                              <span className="min-w-0 break-words">{partner.pic_email}</span>
                            </a>
                          )}
                          {partner.company_email && (
                            <a className="flex gap-2 items-start hover:underline text-blue-600" href={`mailto:${partner.company_email}`}>
                              <span className="text-gray-400 mt-0.5">🏢</span>
                              <span className="min-w-0 break-words">{partner.company_email}</span>
                            </a>
                          )}
                          {partner.website && (
                            <a className="flex gap-2 items-start hover:underline text-blue-600" href={partner.website} target="_blank" rel="noreferrer">
                              <span className="text-gray-400 mt-0.5">🌐</span>
                              <span className="min-w-0 break-words">{String(partner.website).replace(/^https?:\/\//, "")}</span>
                            </a>
                          )}
                        </div>
                      </details>

                      {/* WhatsApp CTA */}
                      <div className="mt-4">
                        {waLink ? (
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-green-200/50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Hubungi via WhatsApp
                          </a>
                        ) : (
                          <button
                            disabled
                            className="w-full py-2.5 bg-gray-50 text-gray-400 text-sm font-semibold rounded-xl cursor-not-allowed border border-gray-100"
                          >
                            Tidak ada kontak
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="p-4 mt-auto">
        <Footer />
      </section>
    </main>
  );
};

PartnersPage.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default PartnersPage;

