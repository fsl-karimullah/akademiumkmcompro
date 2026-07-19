import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { endpoint } from "../endpoint/api";
import "swiper/css";
import "swiper/css/pagination";

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatWhatsApp(number) {
  if (!number) return null;
  const cleaned = number.replace(/\D/g, "");
  if (cleaned.startsWith("0")) return "62" + cleaned.slice(1);
  if (cleaned.startsWith("62")) return cleaned;
  return "62" + cleaned;
}

const IconWhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PartnerCard = ({ partner }) => {
  const waNumber = formatWhatsApp(partner.pic_whatsapp);
  const waMessage = encodeURIComponent(
    `Halo saya member dari akademi UMKM dengan kode "${partner.code}" saya ingin bertanya lebih detail tentang "${partner.company_name}" di "${partner.business_sector}".`
  );
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${waMessage}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-rose-100/80 shadow-md hover:shadow-2xl hover:shadow-rose-200/50 transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Subtle top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--themeRed)] via-rose-400 to-orange-300" />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-[var(--themeRed)] to-rose-400 text-white flex items-center justify-center font-extrabold text-base tracking-wide shadow-md">
              {getInitials(partner.company_name)}
            </div>
          </div>

          {/* Name + code */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-gray-900 font-extrabold text-[15px] leading-snug line-clamp-2 flex-1">
                {partner.company_name}
              </h3>
              <span className="shrink-0 font-mono text-[10px] font-bold text-[var(--themeRed)] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full tracking-widest mt-0.5">
                {partner.code}
              </span>
            </div>

            {/* Sector chip */}
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

        {/* Divider */}
        <div className="mt-4 border-t border-gray-100" />

        {/* CTA */}
        <div className="mt-4">
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-green-200/50"
            >
              <IconWhatsApp />
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
    </motion.div>
  );
};

PartnerCard.propTypes = {
  partner: PropTypes.shape({
    code: PropTypes.string,
    company_name: PropTypes.string,
    business_sector: PropTypes.string,
    pic_whatsapp: PropTypes.string,
    social_media: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};

// ── Partners Section ──────────────────────────────────────────────────────────

const Partners = ({ currentPath }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(endpoint.getPartners);
        setPartners(response.data.data || []);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Gagal memuat data mitra. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (currentPath !== "/") return null;

  const topPartners = partners.slice(0, 10);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-white via-rose-50 to-white shadow-[0_16px_60px_rgba(214,19,85,0.10)]">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-red-200/30 blur-3xl" />

      <div className="relative p-7 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 bg-white/70 text-[var(--themeRed)] text-xs font-extrabold px-4 py-2 rounded-full border border-rose-100 mb-4 uppercase tracking-wider">
            🤝 Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Our Ecosystem <span className="text-[var(--themeRed)]">Partners</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Temukan partner terbaik sesuai kebutuhan bisnismu. Klik WhatsApp untuk terhubung langsung.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[148px] rounded-2xl bg-white/70 border border-rose-100 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-lg font-semibold text-red-500">{error}</p>
          </div>
        ) : partners.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-400 text-lg">Belum ada data mitra.</p>
          </div>
        ) : (
          <div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4500, pauseOnMouseEnter: true, disableOnInteraction: false }}
              breakpoints={{
                320: { slidesPerView: 1.05, spaceBetween: 12 },
                640: { slidesPerView: 2.05, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
              }}
              className="w-full pb-10"
            >
              {topPartners.map((partner) => (
                <SwiperSlide key={partner.id || partner.code} className="h-auto">
                  <div className="h-full">
                    <PartnerCard partner={partner} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-center">
              <Link
                to="/partners"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-sm bg-white border border-rose-100 text-[var(--themeRed)] hover:bg-rose-50 transition-all shadow-sm"
              >
                Lihat Semua Partners
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

Partners.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Partners;
