import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShareIcon from "@mui/icons-material/Share";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../endpoint/api";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const steps = [
  {
    icon: <PhoneAndroidIcon sx={{ fontSize: 36 }} />,
    title: "Daftar Akun",
    description:
      "Buat akun gratis dalam hitungan menit. Tidak perlu keahlian teknis — cukup email dan nomor HP Anda.",
    color: "#d61355",
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 36 }} />,
    title: "Isi Profil Usaha",
    description:
      "Lengkapi nama usaha, deskripsi, lokasi, jam operasional, dan unggah foto produk terbaik Anda.",
    color: "#e84393",
  },
  {
    icon: <ShareIcon sx={{ fontSize: 36 }} />,
    title: "Dapatkan Link Digital",
    description:
      "Terima link profil digital unik yang bisa langsung dibagikan ke siapa saja, kapan saja.",
    color: "#d61355",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 36 }} />,
    title: "Promosikan Usaha",
    description:
      "Bagikan di WhatsApp, Instagram, dan media sosial lainnya. Jangkau pelanggan baru lebih luas!",
    color: "#e84393",
  },
];

const benefits = [
  "Profil digital gratis, tanpa biaya bulanan",
  "Tidak perlu keahlian coding atau desain",
  "Bisa diakses dari HP pelanggan Anda",
  "Link mudah dibagikan di WhatsApp & medsos",
  "Tampil profesional di mata pelanggan",
  "Dukungan dari tim kami jika ada kendala",
];

const testimonials = [
  {
    name: "Ibu Sari",
    usaha: "Warung Makan Sari Rasa",
    kota: "Yogyakarta",
    text: "Sebelumnya susah kasih info menu ke pelanggan. Sekarang tinggal kirim link, langsung bisa lihat semua!",
    rating: 5,
  },
  {
    name: "Pak Budi",
    usaha: "Toko Baju Budi Jaya",
    kota: "Semarang",
    text: "Pelanggan dari luar kota sekarang bisa lihat koleksi saya tanpa harus datang langsung. Omzet naik!",
    rating: 5,
  },
  {
    name: "Mbak Rina",
    usaha: "Kue Kering Rina",
    kota: "Solo",
    text: "Gampang banget bikinnya, cuma 15 menit sudah jadi. Sudah banyak pesanan dari link yang saya bagikan.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Apakah benar-benar gratis?",
    a: "Ya, profil digital dasar sepenuhnya gratis tanpa batas waktu. Kami juga menyediakan paket premium untuk fitur lebih lengkap.",
  },
  {
    q: "Apakah perlu smartphone canggih?",
    a: "Tidak. Cukup smartphone dengan browser dan koneksi internet. Prosesnya sangat ringan dan cepat.",
  },
  {
    q: "Berapa lama pembuatan profil?",
    a: "Rata-rata hanya 15–30 menit dari daftar hingga profil siap dibagikan ke pelanggan.",
  },
  {
    q: "Apakah bisa diubah setelah dibuat?",
    a: "Tentu! Anda bisa mengubah foto, deskripsi, jam operasional, dan informasi lainnya kapan saja.",
  },
];

const stats = [
  { value: "500+", label: "UMKM Terdigitalisasi" },
  { value: "15+", label: "Kota di Indonesia" },
  { value: "10rb+", label: "Pelanggan Dijangkau" },
  { value: "Gratis", label: "Untuk Semua UMKM" },
];

const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";

const Showcase = () => {
  const [shops, setShops] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(endpoint.getShopAll(0, 0))
      .then((res) => {
        const data = res.data?.data || [];
        setShops(data.slice(0, 8));
      })
      .catch((err) => console.error("Error fetching shops", err));
  }, []);

  const ImageWithFallback = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    return (
      <CardMedia
        component="img"
        height="180"
        image={imgSrc}
        alt={alt}
        onError={() => { if (imgSrc !== fallbackImage) setImgSrc(fallbackImage); }}
        sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, objectFit: "cover" }}
      />
    );
  };

  return (
    <Box sx={{ backgroundColor: "#fff8f9", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        .pulse-dot {
          display: inline-block;
          width: 8px; height: 8px;
          background: #4ade80;
          border-radius: 50%;
          margin-right: 6px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(214,19,85,0.2) !important;
        }
        .step-card { transition: all 0.3s ease; }
        .shop-card:hover { transform: translateY(-4px); }
        .shop-card { transition: all 0.3s ease; }
        .faq-item { cursor: pointer; transition: background 0.2s; }
        .faq-item:hover { background: #fff0f4 !important; }
        .benefit-row { transition: all 0.2s; }
        .benefit-row:hover { transform: translateX(4px); }
        .hero-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      {/* ─── STICKY NAVBAR ─── */}
      <Box
        sx={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 20px rgba(214,19,85,0.1)",
          px: 3, py: 1.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => navigate("/bantu-branding")} sx={{ mr: 1, color: "#d61355" }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography fontWeight="700" color="#d61355" fontSize="1rem">
            BISNIS Digital Showcase
          </Typography>
        </Box>
        <Button
          component="a"
          href="https://api.akademiumkm.id/admin/login"
          target="_blank"
          size="small"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #d61355, #ff6b6b)",
            borderRadius: 3, fontWeight: 700,
            px: 2.5, fontSize: "0.82rem",
            boxShadow: "none",
            "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
          }}
        >
          Daftar Gratis
        </Button>
      </Box>

      {/* ─── HERO ─── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #b50f47 0%, #d61355 50%, #ff6b6b 100%)",
          color: "white",
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        {[
          { w: 300, h: 300, top: -100, right: -80, opacity: 0.08 },
          { w: 200, h: 200, bottom: -60, left: -60, opacity: 0.06 },
          { w: 150, h: 150, top: 40, left: "30%", opacity: 0.05 },
        ].map((c, i) => (
          <Box key={i} sx={{
            position: "absolute", borderRadius: "50%",
            width: c.w, height: c.h,
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            background: "white", opacity: c.opacity, pointerEvents: "none",
          }} />
        ))}

        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            gap={4}
            textAlign={isMobile ? "center" : "left"}
          >
            <Box flex={1}>
              <Box
                display="inline-flex" alignItems="center"
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 10, px: 2, py: 0.6, mb: 3,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <span className="pulse-dot" />
                <Typography fontSize="0.78rem" fontWeight={600}>
                  Lebih dari 500 UMKM sudah bergabung
                </Typography>
              </Box>

              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight="800"
                gutterBottom
                sx={{ lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                Hadir Online,<br />
                Tanpa Perlu Website
              </Typography>
              <Typography
                variant="body1"
                mb={4}
                sx={{ maxWidth: 500, lineHeight: 1.8, opacity: 0.9, fontSize: "1.05rem" }}
              >
                Buat profil digital bisnis Anda secara gratis dalam 15 menit.
                Bagikan ke pelanggan lewat WhatsApp dan media sosial — mudah, cepat, dan profesional.
              </Typography>

              <Box display="flex" gap={2} flexWrap="wrap" justifyContent={isMobile ? "center" : "flex-start"}>
                <Button
                  component="a"
                  href="https://api.akademiumkm.id/admin/login"
                  target="_blank"
                  size="large"
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff", color: "#d61355",
                    fontWeight: 800, px: 4, py: 1.5, fontSize: "1rem",
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    "&:hover": { backgroundColor: "#ffe0e9" },
                  }}
                >
                  Daftar Sekarang — Gratis!
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => document.getElementById("cara-daftar").scrollIntoView({ behavior: "smooth" })}
                  sx={{
                    borderColor: "rgba(255,255,255,0.6)", color: "white",
                    fontWeight: 600, px: 3, py: 1.5,
                    borderRadius: 3, fontSize: "0.95rem",
                    "&:hover": { borderColor: "white", background: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Box>
            </Box>

            {!isMobile && (
              <Box flex={1} display="flex" justifyContent="center">
                <img
                  src="/icons/world-book-day.png"
                  alt="Illustration"
                  className="hero-float"
                  style={{ maxWidth: "85%", height: "auto", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* ─── STATS BAR ─── */}
      <Box sx={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {stats.map((s) => (
              <Grid item xs={6} md={3} key={s.label} textAlign="center">
                <Typography fontWeight={800} fontSize="1.8rem" color="#d61355">
                  {s.value}
                </Typography>
                <Typography fontSize="0.8rem" color="text.secondary" fontWeight={500}>
                  {s.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── CARA DAFTAR ─── */}
      <Container maxWidth="lg" sx={{ py: 10 }} id="cara-daftar">
        <Box textAlign="center" mb={6}>
          <Chip label="Langkah Mudah" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
          <Typography variant="h4" fontWeight={800} color="#1a1a2e" gutterBottom>
            Cara Bergabung di Showcase
          </Typography>
          <Typography color="text.secondary" maxWidth={480} mx="auto" lineHeight={1.8}>
            Empat langkah sederhana untuk bisnis Anda tampil profesional secara online
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {steps.map((step, i) => (
            <Grid item xs={12} sm={6} md={3} key={step.title}>
              <Box
                className="step-card"
                sx={{
                  background: "white",
                  borderRadius: 4,
                  p: 3.5,
                  height: "100%",
                  boxShadow: "0 4px 16px rgba(214,19,85,0.08)",
                  border: "1px solid rgba(214,19,85,0.08)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute", top: -20, right: -20,
                    width: 80, height: 80, borderRadius: "50%",
                    background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                    opacity: 0.06,
                  }}
                />
                <Box
                  sx={{
                    width: 52, height: 52, borderRadius: 3,
                    background: "linear-gradient(135deg, #fff0f4, #ffe0e9)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#d61355", mb: 2,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  fontSize="0.72rem" fontWeight={700}
                  color="#d61355" letterSpacing="0.1em"
                  textTransform="uppercase" mb={0.5}
                >
                  Langkah {i + 1}
                </Typography>
                <Typography fontWeight={700} fontSize="1.05rem" color="#1a1a2e" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── BENEFITS ─── */}
      <Box sx={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)", py: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="Mengapa Memilih Kami?" sx={{ background: "rgba(214,19,85,0.3)", color: "#ff9ab2", fontWeight: 700, mb: 2 }} />
              <Typography variant="h4" fontWeight={800} color="white" gutterBottom lineHeight={1.2}>
                Semua yang Anda Butuhkan,<br />Tersedia Gratis
              </Typography>
              <Typography color="rgba(255,255,255,0.65)" lineHeight={1.8} mb={4}>
                Kami dirancang khusus untuk pelaku UMKM Indonesia yang ingin go digital
                tanpa kerumitan teknis dan biaya besar.
              </Typography>
              <Box>
                {benefits.map((b, i) => (
                  <Box
                    key={i}
                    className="benefit-row"
                    display="flex" alignItems="center" gap={1.5}
                    mb={1.5}
                  >
                    <CheckCircleOutlineIcon sx={{ color: "#4ade80", fontSize: 20, flexShrink: 0 }} />
                    <Typography color="rgba(255,255,255,0.85)" fontSize="0.95rem">{b}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4, p: 4,
                backdropFilter: "blur(10px)",
              }}>
                <Typography fontWeight={700} color="white" mb={3} fontSize="1.1rem">
                  Apa yang Anda Dapatkan?
                </Typography>
                {[
                  ["Profil Digital", "Halaman bisnis yang bisa diakses siapa saja"],
                  ["Link Unik", "Link khusus bisnis Anda yang mudah diingat"],
                  ["Galeri Produk", "Tampilkan foto produk terbaik Anda"],
                  ["Info Kontak", "Nomor HP, lokasi, dan jam buka terintegrasi"],
                  ["Update Mudah", "Ubah informasi kapan saja lewat HP"],
                ].map(([fitur, desc]) => (
                  <Box key={fitur} display="flex" justifyContent="space-between" alignItems="flex-start"
                    py={1.5} sx={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <Typography color="white" fontWeight={600} fontSize="0.9rem">{fitur}</Typography>
                    <Typography color="rgba(255,255,255,0.5)" fontSize="0.82rem" maxWidth={200} textAlign="right">{desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── VIDEO TUTORIAL ─── */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Box textAlign="center" mb={5}>
          <Chip label="Video Panduan" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
          <Typography variant="h4" fontWeight={800} color="#1a1a2e">
            Tonton Cara Daftarnya
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Panduan lengkap dari awal daftar hingga profil siap dibagikan — hanya 15 menit!
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 4, overflow: "hidden",
            boxShadow: "0 20px 60px rgba(214,19,85,0.2)",
            border: "4px solid white",
          }}
        >
          <iframe
            width="100%"
            height={isMobile ? "220" : "420"}
            src="https://www.youtube.com/embed/25RD3_TE33s"
            title="Tutorial BISNIS Digital Showcase"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Container>

      {/* ─── SHOWCASE LIST ─── */}
      <Box sx={{ background: "#fff0f4", py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Chip label="Contoh Nyata" sx={{ background: "#ffe0e9", color: "#d61355", fontWeight: 700, mb: 2 }} />
            <Typography variant="h4" fontWeight={800} color="#1a1a2e" gutterBottom>
              UMKM yang Sudah Online
            </Typography>
            <Typography color="text.secondary" maxWidth={440} mx="auto">
              Ini contoh nyata bisnis lokal yang sudah terdigitalisasi dan menjangkau lebih banyak pelanggan
            </Typography>
          </Box>

          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4 },
            }}
            style={{ paddingBottom: "20px" }}
          >
            {shops.map((shop) => (
              <SwiperSlide key={shop.id}>
                <Card
                  className="shop-card"
                  sx={{
                    boxShadow: "0 4px 20px rgba(214,19,85,0.12)",
                    borderRadius: 4,
                    overflow: "hidden",
                    border: "1px solid rgba(214,19,85,0.06)",
                  }}
                >
                  <ImageWithFallback src={shop.thumbnail} alt={shop.name} />
                  <CardContent sx={{ pb: "16px !important" }}>
                    <Typography fontWeight={700} fontSize="0.95rem" gutterBottom noWrap color="#1a1a2e">
                      {shop.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1.5, fontSize: "0.8rem" }}>
                      {shop.category} · {shop.regency}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{
                        background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                        color: "white", fontWeight: 700,
                        borderRadius: 2, boxShadow: "none",
                        fontSize: "0.78rem",
                        "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
                      }}
                      href={`/umkm-showcase-detail/${shop.id}`}
                    >
                      Lihat Profil Digital
                    </Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "#d61355", borderColor: "#d61355",
                fontWeight: 700, px: 5, py: 1.5, borderRadius: 3,
                "&:hover": { background: "#fff0f4", borderColor: "#b50f47" },
              }}
              onClick={() => navigate("/all-showcase")}
            >
              Lihat Semua UMKM →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── TESTIMONIALS ─── */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" mb={6}>
          <Chip label="Cerita Sukses" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
          <Typography variant="h4" fontWeight={800} color="#1a1a2e">
            Apa Kata Mereka?
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {testimonials.map((t) => (
            <Grid item xs={12} md={4} key={t.name}>
              <Box
                sx={{
                  background: "white",
                  borderRadius: 4, p: 3.5,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  height: "100%",
                  border: "1px solid rgba(214,19,85,0.06)",
                }}
              >
                <Box display="flex" mb={2}>
                  {[...Array(t.rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: "#f59e0b", fontSize: 18 }} />
                  ))}
                </Box>
                <Typography color="#374151" lineHeight={1.8} fontSize="0.93rem" mb={3} fontStyle="italic">
                  "{t.text}"
                </Typography>
                <Box>
                  <Typography fontWeight={700} fontSize="0.9rem" color="#1a1a2e">{t.name}</Typography>
                  <Typography fontSize="0.78rem" color="text.secondary">{t.usaha} · {t.kota}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── FAQ ─── */}
      <Box sx={{ background: "#f9f9f9", py: 10 }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>
            <Chip label="FAQ" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
            <Typography variant="h4" fontWeight={800} color="#1a1a2e">
              Pertanyaan yang Sering Ditanyakan
            </Typography>
          </Box>
          <Box>
            {faqs.map((f, i) => (
              <Box
                key={i}
                className="faq-item"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                sx={{
                  background: openFaq === i ? "#fff0f4" : "white",
                  borderRadius: 3, mb: 1.5,
                  p: 2.5, cursor: "pointer",
                  border: `1px solid ${openFaq === i ? "#ffb3c8" : "rgba(0,0,0,0.07)"}`,
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={700} color="#1a1a2e" fontSize="0.95rem">{f.q}</Typography>
                  <Typography color="#d61355" fontWeight={700} fontSize="1.2rem">
                    {openFaq === i ? "−" : "+"}
                  </Typography>
                </Box>
                {openFaq === i && (
                  <Typography color="text.secondary" mt={1.5} lineHeight={1.7} fontSize="0.9rem">
                    {f.a}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ─── CTA BOTTOM ─── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #b50f47 0%, #d61355 50%, #ff6b6b 100%)",
          py: 10, textAlign: "center", color: "white", position: "relative", overflow: "hidden",
        }}
      >
        <Box sx={{
          position: "absolute", top: -60, right: -60,
          width: 250, height: 250, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }} />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h4" fontWeight={800} mb={2} lineHeight={1.2}>
            Siap Membawa Bisnis Anda Online?
          </Typography>
          <Typography mb={4} fontSize="1.05rem" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
            Bergabunglah dengan ratusan UMKM yang sudah berhasil go digital.
            Daftar gratis sekarang, tanpa kartu kredit, tanpa biaya tersembunyi.
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              component="a"
              href="https://api.akademiumkm.id/admin/login"
              target="_blank"
              size="large"
              variant="contained"
              sx={{
                backgroundColor: "white", color: "#d61355",
                fontWeight: 800, px: 5, py: 1.5, fontSize: "1rem",
                borderRadius: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                "&:hover": { backgroundColor: "#ffe0e9" },
              }}
            >
              Daftar Gratis Sekarang
            </Button>
            <Button
              size="large" variant="outlined"
              onClick={() => navigate("/bantu-branding")}
              sx={{
                borderColor: "rgba(255,255,255,0.6)", color: "white",
                fontWeight: 600, px: 4, py: 1.5, borderRadius: 3,
                "&:hover": { borderColor: "white", background: "rgba(255,255,255,0.1)" },
              }}
            >
              Lihat Layanan Premium
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Showcase;