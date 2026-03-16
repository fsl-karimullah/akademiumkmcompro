import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { endpoint } from "../endpoint/api";
import "swiper/css";
import "swiper/css/pagination";

const CARD_GRADIENTS = [
  "from-red-500 to-rose-600",
  "from-orange-400 to-red-500",
  "from-pink-500 to-rose-500",
  "from-red-600 to-orange-500",
  "from-rose-500 to-pink-600",
];

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

// ── SVG Icons ────────────────────────────────────────────────────────────────

const IconMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.45 5.45l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── InfoRow ───────────────────────────────────────────────────────────────────

const InfoRow = ({ icon, label, value, href }) => {
  if (!value) return null;
  const inner = (
    <div className="flex items-start gap-2">
      {icon}
      <div className="min-w-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold leading-none mb-0.5">{label}</p>
        <p className={`text-sm text-gray-700 font-medium break-words ${href ? "text-[var(--themeRed)] hover:underline" : ""}`}>{value}</p>
      </div>
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return inner;
};

InfoRow.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  href: PropTypes.string,
};

InfoRow.defaultProps = {
  value: null,
  href: null,
};

// ── PartnerCard ───────────────────────────────────────────────────────────────

const PartnerCard = ({ partner, index }) => {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const waNumber = formatWhatsApp(partner.pic_whatsapp);
  const waMessage = encodeURIComponent(
    `Halo saya member dari akademi UMKM dengan kode "${partner.code}" saya ingin bertanya lebih detail tentang "${partner.company_name}" di "${partner.business_sector}".`
  );
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=${waMessage}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} p-5 flex items-center gap-4`}>
        <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-inner border border-white/20">
          {getInitials(partner.company_name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base leading-tight line-clamp-2">
            {partner.company_name}
          </h3>
          <span className="inline-block mt-1.5 text-xs bg-white/20 border border-white/30 text-white px-2.5 py-0.5 rounded-full font-medium">
            {partner.business_sector}
          </span>
        </div>
      </div>

      {/* Kode validasi */}
      <div className="mx-4 -mt-3 relative z-10">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-between shadow-sm">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Kode Mitra</span>
          <span className="text-sm font-mono font-bold text-[var(--themeRed)] tracking-widest">{partner.code}</span>
        </div>
      </div>

      {/* Partnership badge */}
      <div className="px-4 pt-3 flex items-center gap-2">
        <span className="text-xs font-semibold bg-red-50 text-[var(--themeRed)] border border-red-100 px-2.5 py-1 rounded-full">
          {partner.partnership_type_label}
        </span>
        {partner.percentage_value > 0 && (
          <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
            {partner.percentage_value}%
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-4 mt-3 border-t border-gray-100" />

      {/* Info rows */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <InfoRow icon={<IconMap />}       label="Alamat"            value={partner.address} />
        <InfoRow icon={<IconUser />}      label="Contact Person"    value={partner.pic_name} />
        <InfoRow icon={<IconMail />}      label="Email PIC"         value={partner.pic_email}      href={partner.pic_email ? `mailto:${partner.pic_email}` : null} />
        <InfoRow icon={<IconMail />}      label="Email Perusahaan"  value={partner.company_email}  href={partner.company_email ? `mailto:${partner.company_email}` : null} />
        <InfoRow icon={<IconInstagram />} label="Sosial Media"      value={partner.social_media} />
        <InfoRow icon={<IconGlobe />}     label="Website"           value={partner.website?.replace(/^https?:\/\//, "")} href={partner.website || null} />
        <InfoRow icon={<IconPhone />}     label="WhatsApp PIC"      value={partner.pic_whatsapp}   href={waLink} />

        {/* CTA */}
        <div className="mt-auto pt-3">
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-sm"
            >
              <IconWhatsApp />
              Hubungi via WhatsApp
            </a>
          ) : (
            <button
              disabled
              className="w-full py-2.5 bg-gray-100 text-gray-400 text-sm font-semibold rounded-xl cursor-not-allowed"
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
    code: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    business_sector: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    company_email: PropTypes.string.isRequired,
    pic_name: PropTypes.string.isRequired,
    pic_email: PropTypes.string.isRequired,
    pic_whatsapp: PropTypes.string.isRequired,
    partnership_type_label: PropTypes.string.isRequired,
    percentage_value: PropTypes.number.isRequired,
    social_media: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
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

  return (
    <section className="p-6 md:p-12 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="inline-block bg-red-50 text-[var(--themeRed)] text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider">
          Ekosistem Bisnis
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          Mitra <span className="text-[var(--themeRed)]">Terpercaya</span> Kami
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          Terhubung langsung dengan mitra bisnis Akademi UMKM. Klik{" "}
          <strong className="text-gray-700">Hubungi via WhatsApp</strong> untuk tanya lebih lanjut.
        </p>
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[var(--themeRed)]" />
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
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, pauseOnMouseEnter: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full pb-12"
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={partner.id} className="h-auto">
              <PartnerCard partner={partner} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

Partners.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

export default Partners;
