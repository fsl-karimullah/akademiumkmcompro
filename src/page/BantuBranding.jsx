import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Pagination,
  TextField,
  Chip,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  WhatsApp,
  Visibility,
  Build,
  Star,
  Close,
  OpenInNew,
  CheckCircle,
  ArrowForward,
  Search,
  Code,
  PhoneAndroid,
  ShoppingCart,
  Article,
  Business,
  TrendingUp,
  Groups,
  MonetizationOn,
  Shield,
  Speed,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { endpoint } from "../endpoint/api";

// ─── DATA ───────────────────────────────────────────────
const DIGITALIZATION_STEPS = [
  { icon: <PhoneAndroid />, title: "Social Media", desc: "Instagram & TikTok untuk menjangkau calon pelanggan", color: "#E1306C" },
  { icon: <WhatsApp />, title: "WhatsApp Business", desc: "Komunikasi profesional & katalog produk digital", color: "#25D366" },
  { icon: <ShoppingCart />, title: "Marketplace", desc: "Buka toko di Shopee & Tokopedia", color: "#EE4D2D" },
  { icon: <TrendingUp />, title: "Iklan Digital", desc: "Meta Ads & TikTok Ads untuk jangkauan lebih luas", color: "#1877F2" },
  { icon: <Code />, title: "Website & Sistem", desc: "Landing page / e-commerce profesional milik sendiri", color: "#d61355" },
  { icon: <Groups />, title: "Scale Up", desc: "Kolaborasi & affiliate untuk pertumbuhan eksponensial", color: "#7C3AED" },
];

const FEATURES_INCLUDED = [
  "Desain profesional & responsif",
  "Tampil di semua perangkat (HP & desktop)",
  "Halaman produk / layanan",
  "Formulir kontak & WhatsApp button",
  "Loading cepat & SEO-friendly",
  "Revisi hingga puas",
];

const WHY_WEBSITE = [
  { icon: <Shield sx={{ fontSize: 28 }} />, title: "Kredibilitas Tinggi", desc: "Pelanggan 85% lebih percaya bisnis yang punya website resmi." },
  { icon: <Speed sx={{ fontSize: 28 }} />, title: "Buka 24 Jam", desc: "Website bekerja terus menerus, bahkan saat Anda tidur." },
  { icon: <MonetizationOn sx={{ fontSize: 28 }} />, title: "Jangkau Lebih Luas", desc: "Tidak terbatas lokasi. Raih pelanggan dari seluruh Indonesia." },
  { icon: <TrendingUp sx={{ fontSize: 28 }} />, title: "Bangun Brand", desc: "Identitas bisnis yang kuat dan mudah diingat pelanggan." },
];

// ─── COMPONENT ──────────────────────────────────────────
const BantuBranding = ({ currentPath }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [openTerms, setOpenTerms] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const filteredTemplates = useMemo(() =>
    templates.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [templates, searchQuery]
  );

  const paginatedTemplates = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTemplates, page]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  useEffect(() => {
    axios.get(endpoint.getPackage)
      .then((res) => setTemplates(res.data.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  const handleWhatsAppClick = (msg) => {
    window.open(`https://wa.me/6287826563459?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleConsult = () => {
    handleWhatsAppClick("Halo kak, saya ingin konsultasi digitalisasi BISNIS saya.");
  };

  const handleTemplateWA = (template) => {
    handleWhatsAppClick(
      `Halo kak, saya tertarik dengan template website "${template.name}" seharga Rp ${Number(template.price).toLocaleString("id-ID")}. Bisa dijelaskan lebih lanjut?`
    );
  };

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .display { font-family: 'Syne', sans-serif; }
        
        .step-pill { transition: all 0.25s ease; }
        .step-pill:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important; }
        
        .template-card { transition: all 0.25s ease; cursor: pointer; }
        .template-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(214,19,85,0.18) !important; }
        
        .why-card { transition: all 0.2s ease; }
        .why-card:hover { transform: translateY(-4px); background: #fff0f4 !important; }
        
        .hero-glow { animation: glow 3s ease-in-out infinite alternate; }
        @keyframes glow {
          0% { box-shadow: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2); }
          100% { box-shadow: 0 0 30px rgba(255,215,0,0.7), 0 0 60px rgba(255,215,0,0.3); }
        }
        
        .badge-pulse { animation: badgePulse 2s ease-in-out infinite; }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        
        .img-zoom { transition: transform 0.4s ease; }
        .template-card:hover .img-zoom { transform: scale(1.04); }

        .scroll-reveal { opacity: 0; transform: translateY(20px); animation: revealUp 0.6s ease forwards; }
        @keyframes revealUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <Navbar currentPath={currentPath} />

      {/* ─── HERO ─── */}
      <Box
        sx={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #8b0535 0%, #d61355 45%, #ff6b6b 100%)",
          color: "white", display: "flex", alignItems: "center",
          justifyContent: "center", textAlign: "center",
          px: 2, py: 12, position: "relative", overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        {[
          { w: 500, h: 500, top: -200, right: -150, op: 0.06 },
          { w: 300, h: 300, bottom: -100, left: -80, op: 0.05 },
          { w: 200, h: 200, top: "40%", left: "10%", op: 0.04 },
        ].map((c, i) => (
          <Box key={i} sx={{
            position: "absolute", borderRadius: "50%",
            width: c.w, height: c.h, top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            background: "white", opacity: c.op, pointerEvents: "none",
          }} />
        ))}

        {/* Floating number badge */}
        <Box sx={{
          position: "absolute", top: { xs: 90, md: 120 }, left: { xs: 16, md: 60 },
          background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 3, px: 2, py: 1, display: { xs: "none", md: "block" },
        }}>
          <Typography fontSize="0.7rem" fontWeight={700} sx={{ opacity: 0.8 }}>Bergabung hari ini</Typography>
          <Typography fontSize="1.3rem" fontWeight={800}>500+ UMKM</Typography>
          <Typography fontSize="0.7rem" sx={{ opacity: 0.7 }}>sudah go digital</Typography>
        </Box>

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Chip
            label="🚀 Platform Digitalisasi UMKM #1 Indonesia"
            sx={{ background: "rgba(255,255,255,0.15)", color: "white", fontWeight: 700, mb: 3, fontSize: "0.82rem", px: 1 }}
          />
          <Typography
            className="display"
            variant="h2" fontWeight={800}
            sx={{ mb: 2.5, lineHeight: 1.15, letterSpacing: "-0.02em", fontSize: { xs: "2.2rem", md: "3.4rem" } }}
          >
            BISNIS yang Tidak Go Digital<br />
            Akan{" "}
            <Box component="span" sx={{
              textDecoration: "underline", color: "#FFD700",
              textDecorationColor: "rgba(255,215,0,0.5)",
            }}>
              Tersingkir!
            </Box>
          </Typography>
          <Typography sx={{ mb: 5, maxWidth: 600, mx: "auto", lineHeight: 1.85, opacity: 0.9, fontSize: "1.05rem" }}>
            Saatnya bisnismu hadir online dengan website profesional.
            Mulai dari hanya <strong>Rp 500.000</strong> — langsung jadi hari ini!
          </Typography>

          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained" size="large"
              startIcon={<WhatsApp />}
              onClick={handleConsult}
              sx={{
                background: "linear-gradient(135deg, #25D366, #1ebe52)",
                fontWeight: 800, px: 4, py: 1.6, fontSize: "1rem", borderRadius: 3,
                boxShadow: "0 8px 24px rgba(37,211,102,0.35)",
                "&:hover": { background: "linear-gradient(135deg, #1db954, #159a3f)" },
              }}
            >
              Konsultasi Gratis
            </Button>

            <Button
              variant="outlined" size="large"
              onClick={() => setOpenTerms(true)}
              sx={{
                borderColor: "rgba(255,255,255,0.5)", color: "white",
                fontWeight: 700, px: 4, py: 1.6, fontSize: "1rem", borderRadius: 3,
                "&:hover": { borderColor: "white", background: "rgba(255,255,255,0.1)" },
              }}
            >
              Syarat & Ketentuan
            </Button>

            <Box sx={{ position: "relative" }}>
              <Button
                variant="contained" size="large"
                startIcon={<Star />}
                onClick={() => navigate("/umkm-showcase")}
                className="hero-glow"
                sx={{
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  color: "#1a1a2e", fontWeight: 800, px: 4, py: 1.6,
                  fontSize: "1rem", borderRadius: 3,
                  "&:hover": { background: "linear-gradient(135deg, #f0c800, #e09000)" },
                }}
              >
                Lihat UMKM Showcase
              </Button>
              <Box className="badge-pulse" sx={{
                position: "absolute", top: -10, right: -10,
                background: "#FF3D00", color: "white", px: 1.2, py: 0.3,
                borderRadius: "12px", fontSize: "0.72rem", fontWeight: 800,
                boxShadow: "0 4px 12px rgba(255,61,0,0.5)",
              }}>
                GRATIS
              </Box>
            </Box>
          </Box>

          {/* Trust badges */}
          <Box display="flex" justifyContent="center" gap={3} mt={5} flexWrap="wrap">
            {["✅ Tanpa Keahlian Teknis", "✅ Revisi Hingga Puas", "✅ Support Aktif"].map((t) => (
              <Typography key={t} fontSize="0.82rem" sx={{ opacity: 0.8 }}>{t}</Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ─── WHY WEBSITE ─── */}
      <Box sx={{ py: 10, background: "white" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Chip label="Mengapa Penting?" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
            <Typography className="display" variant="h4" fontWeight={800} color="#1a1a2e" letterSpacing="-0.02em">
              Website = Investasi Terbaik UMKM
            </Typography>
            <Typography color="text.secondary" mt={1} maxWidth={480} mx="auto" lineHeight={1.8}>
              Bukan sekadar tampilan — website adalah mesin penjualan yang bekerja 24 jam untuk bisnis Anda
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {WHY_WEBSITE.map((w) => (
              <Grid item xs={12} sm={6} md={3} key={w.title}>
                <Box
                  className="why-card"
                  sx={{
                    background: "#fafafa", borderRadius: 4,
                    p: 3, height: "100%",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <Box sx={{
                    width: 52, height: 52, borderRadius: 3, mb: 2,
                    background: "#fff0f4", color: "#d61355",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {w.icon}
                  </Box>
                  <Typography fontWeight={800} color="#1a1a2e" mb={0.75} fontSize="1rem">{w.title}</Typography>
                  <Typography color="#6b7280" fontSize="0.87rem" lineHeight={1.7}>{w.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── DIGITALIZATION STEPS ─── */}
      <Box sx={{ py: 10, background: "linear-gradient(135deg, #1a1a2e 0%, #2d1535 100%)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={7}>
            <Chip label="Roadmap Digital" sx={{ background: "rgba(214,19,85,0.25)", color: "#ff9ab2", fontWeight: 700, mb: 2 }} />
            <Typography className="display" variant="h4" fontWeight={800} color="white" letterSpacing="-0.02em">
              Tangga Digitalisasi Bisnis
            </Typography>
            <Typography color="rgba(255,255,255,0.6)" mt={1} maxWidth={480} mx="auto" lineHeight={1.8}>
              Ikuti langkah ini secara bertahap — dan kami siap mendampingi setiap tahapnya
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {DIGITALIZATION_STEPS.map((step, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box
                  className="step-pill"
                  sx={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 4, p: 3,
                    display: "flex", gap: 2, alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Box sx={{
                    minWidth: 48, height: 48, borderRadius: 3,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${step.color}22`, color: step.color, flexShrink: 0,
                  }}>
                    {step.icon}
                  </Box>
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={0.4}>
                      <Typography fontSize="0.65rem" fontWeight={800} color="rgba(255,255,255,0.35)"
                        letterSpacing="0.12em" textTransform="uppercase">
                        Tahap {i + 1}
                      </Typography>
                    </Box>
                    <Typography fontWeight={800} color="white" fontSize="0.95rem" mb={0.4}>
                      {step.title}
                    </Typography>
                    <Typography color="rgba(255,255,255,0.55)" fontSize="0.82rem" lineHeight={1.6}>
                      {step.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={6}>
            <Button
              variant="contained" size="large"
              onClick={handleConsult}
              startIcon={<WhatsApp />}
              sx={{
                background: "linear-gradient(135deg, #25D366, #1ebe52)",
                fontWeight: 800, px: 5, py: 1.5, borderRadius: 3, boxShadow: "none",
                "&:hover": { background: "linear-gradient(135deg, #1db954, #159a3f)" },
              }}
            >
              Konsultasi Langkah yang Tepat untuk Bisnis Anda
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── TEMPLATE SECTION ─── */}
      <Box sx={{ py: 10, background: "#fafafa" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Chip label="Pilih Template" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
            <Typography className="display" variant="h4" fontWeight={800} color="#1a1a2e" letterSpacing="-0.02em">
              Template Website Siap Pakai
            </Typography>
            <Typography color="text.secondary" mt={1} maxWidth={500} mx="auto" lineHeight={1.8}>
              Cocok untuk berbagai jenis UMKM — langsung online tanpa ribet. Klik template untuk melihat detail lengkap!
            </Typography>
          </Box>

          {/* Search */}
          <Box sx={{ maxWidth: 440, mx: "auto", mb: 5 }}>
            <TextField
              fullWidth size="small"
              placeholder="Cari nama template..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              InputProps={{
                startAdornment: <Search sx={{ color: "#d61355", mr: 1, fontSize: 20 }} />,
                sx: { borderRadius: 3, background: "white" },
              }}
            />
          </Box>

          {/* Result count */}
          {!searchQuery ? null : (
            <Typography color="text.secondary" fontSize="0.85rem" textAlign="center" mb={3}>
              Ditemukan <strong style={{ color: "#d61355" }}>{filteredTemplates.length}</strong> template
            </Typography>
          )}

          <Grid container spacing={3}>
            {paginatedTemplates.map((template, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  className="template-card"
                  onClick={() => setSelectedTemplate(template)}
                  sx={{
                    height: "100%", display: "flex", flexDirection: "column",
                    borderRadius: 4,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    border: "1px solid rgba(214,19,85,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ height: 210, overflow: "hidden", position: "relative" }}>
                    <img
                      className="img-zoom"
                      src={template.thumbnail}
                      alt={template.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <Box sx={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                      opacity: 0, transition: "opacity 0.3s",
                      display: "flex", alignItems: "flex-end", p: 2,
                      "&:hover": { opacity: 1 },
                    }}>
                      <Typography color="white" fontWeight={700} fontSize="0.9rem">
                        Klik untuk lihat detail →
                      </Typography>
                    </Box>
                    <Chip
                      label="Lihat Detail"
                      size="small"
                      sx={{
                        position: "absolute", top: 10, right: 10,
                        background: "rgba(214,19,85,0.9)", color: "white",
                        fontWeight: 700, fontSize: "0.7rem",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                    <Typography fontWeight={800} color="#1a1a2e" fontSize="1rem" mb={0.5}
                      sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {template.name}
                    </Typography>
                    <Box sx={{
                      display: "inline-block", background: "#f0fdf4",
                      borderRadius: 1.5, px: 1.2, py: 0.4, mb: 1,
                    }}>
                      <Typography fontWeight={800} color="#16a34a" fontSize="0.97rem">
                        Rp {Number(template.price).toLocaleString("id-ID")}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="#6b7280" lineHeight={1.7} fontSize="0.82rem"
                      sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {template.description || "Template website profesional untuk UMKM modern."}
                    </Typography>
                  </CardContent>

                  <Box px={2.5} pb={2.5} display="flex" gap={1.5}>
                    <Button
                      fullWidth variant="contained"
                      startIcon={<WhatsApp />}
                      onClick={(e) => { e.stopPropagation(); handleTemplateWA(template); }}
                      sx={{
                        background: "linear-gradient(135deg, #25D366, #1ebe52)",
                        color: "white", fontWeight: 700, borderRadius: 2.5,
                        fontSize: "0.78rem", boxShadow: "none",
                        "&:hover": { background: "linear-gradient(135deg, #1db954, #159a3f)" },
                      }}
                    >
                      Hubungi
                    </Button>
                    <Button
                      fullWidth variant="outlined"
                      startIcon={<Visibility />}
                      onClick={(e) => { e.stopPropagation(); setSelectedTemplate(template); }}
                      sx={{
                        color: "#d61355", borderColor: "#d61355",
                        fontWeight: 700, borderRadius: 2.5, fontSize: "0.78rem",
                        "&:hover": { background: "#fff0f4" },
                      }}
                    >
                      Detail
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredTemplates.length === 0 && (
            <Box textAlign="center" py={8}>
              <Typography color="text.secondary">Tidak ada template ditemukan untuk "{searchQuery}"</Typography>
            </Box>
          )}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={6}>
              <Pagination
                count={totalPages} page={page}
                onChange={(e, v) => setPage(v)}
                sx={{
                  "& .MuiPaginationItem-root": { borderRadius: 2 },
                  "& .Mui-selected": { background: "#d61355 !important", color: "white" },
                }}
                shape="rounded"
              />
            </Box>
          )}
        </Container>
      </Box>

      {/* ─── WHAT'S INCLUDED ─── */}
      <Box sx={{ py: 10, background: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="Yang Anda Dapatkan" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
              <Typography className="display" variant="h4" fontWeight={800} color="#1a1a2e" mb={2} letterSpacing="-0.02em">
                Semua Sudah Termasuk dalam Harga
              </Typography>
              <Typography color="#6b7280" lineHeight={1.85} mb={4} fontSize="0.95rem">
                Tidak ada biaya tersembunyi. Dapatkan website profesional yang siap dipakai dengan semua fitur penting untuk bisnis Anda.
              </Typography>
              <Box>
                {FEATURES_INCLUDED.map((f, i) => (
                  <Box key={i} display="flex" alignItems="center" gap={1.5} mb={1.5}>
                    <CheckCircle sx={{ color: "#16a34a", fontSize: 20, flexShrink: 0 }} />
                    <Typography color="#374151" fontSize="0.95rem">{f}</Typography>
                  </Box>
                ))}
              </Box>
              <Box
                mt={3} p={2.5}
                sx={{ background: "#fff8f0", borderRadius: 3, border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <Typography fontSize="0.82rem" color="#92400e">
                  ⚠️ <strong>Catatan:</strong> Harga belum termasuk biaya hosting & domain tahunan (estimasi Rp 300rb–600rb/tahun).
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: "linear-gradient(135deg, #fff0f4, #fafafa)",
                  borderRadius: 4, p: 4,
                  border: "1px solid rgba(214,19,85,0.1)",
                }}
              >
                <Typography fontWeight={800} color="#1a1a2e" mb={3} fontSize="1.1rem">
                  Estimasi Investasi
                </Typography>
                {[
                  ["Template Website", "Mulai Rp 500.000"],
                  ["Hosting & Domain", "~Rp 300rb–600rb/thn"],
                  ["Revisi Desain", "Gratis hingga puas"],
                  ["Support & Konsultasi", "Gratis"],
                ].map(([label, val]) => (
                  <Box key={label} display="flex" justifyContent="space-between" alignItems="center"
                    py={1.5} sx={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                    <Typography color="#374151" fontSize="0.9rem">{label}</Typography>
                    <Typography fontWeight={700} color="#d61355" fontSize="0.9rem">{val}</Typography>
                  </Box>
                ))}
                <Button
                  fullWidth variant="contained" size="large" startIcon={<WhatsApp />}
                  onClick={handleConsult}
                  sx={{
                    mt: 3,
                    background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                    color: "white", fontWeight: 800, borderRadius: 2.5, boxShadow: "none",
                    "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
                  }}
                >
                  Konsultasi Paket Terbaik
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── CUSTOM WEBSITE ─── */}
      <Box sx={{ py: 10, background: "#fdf2f5" }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="Butuh Lebih?" sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }} />
              <Typography className="display" variant="h4" fontWeight={800} color="#1a1a2e" mb={2} letterSpacing="-0.02em">
                Tidak Ada Template yang Cocok?
              </Typography>
              <Typography color="#6b7280" mb={3} lineHeight={1.85} fontSize="0.95rem">
                Kami menerima pembuatan website <strong>custom sesuai kebutuhan</strong> bisnis Anda.
                Dari landing page sederhana, toko online, hingga sistem pemesanan digital yang lengkap.
              </Typography>
              <Box mb={4}>
                {["Landing page untuk promosi produk", "Toko online dengan keranjang & checkout", "Sistem booking / reservasi digital", "Website profil perusahaan profesional"].map((item) => (
                  <Box key={item} display="flex" alignItems="center" gap={1.5} mb={1.2}>
                    <ArrowForward sx={{ color: "#d61355", fontSize: 16 }} />
                    <Typography color="#374151" fontSize="0.9rem">{item}</Typography>
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained" size="large" startIcon={<Build />}
                onClick={() => handleWhatsAppClick("Halo kak, saya ingin buat website custom sesuai kebutuhan bisnis saya.")}
                sx={{
                  background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                  fontWeight: 800, px: 4, py: 1.5, borderRadius: 3, boxShadow: "none",
                  "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
                }}
              >
                Diskusikan Kebutuhan Anda
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }}>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Custom website"
                  style={{ width: "100%", display: "block" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── BOTTOM CTA ─── */}
      <Box sx={{
        py: 10,
        background: "linear-gradient(135deg, #1a1a2e 0%, #8b0535 100%)",
        color: "white", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", top: -60, right: -60, width: 300, height: 300,
          borderRadius: "50%", background: "rgba(214,19,85,0.12)",
        }} />
        <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
          <Typography className="display" variant="h4" fontWeight={800} mb={2} letterSpacing="-0.02em">
            Jangan Tunggu Kompetitor<br />Lebih Dulu!
          </Typography>
          <Typography sx={{ opacity: 0.75, mb: 4, lineHeight: 1.85, fontSize: "0.95rem" }}>
            Setiap hari yang berlalu tanpa website, adalah peluang yang hilang. Mulai sekarang dan jadilah yang terdepan di industri Anda.
          </Typography>
          <Button
            variant="contained" size="large" startIcon={<WhatsApp />}
            onClick={handleConsult}
            sx={{
              background: "linear-gradient(135deg, #25D366, #1ebe52)",
              color: "white", fontWeight: 800, px: 6, py: 1.8, fontSize: "1.05rem",
              borderRadius: 3, boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
              "&:hover": { background: "linear-gradient(135deg, #1db954, #159a3f)" },
            }}
          >
            Mulai Digitalisasi Bisnis Sekarang
          </Button>
        </Container>
      </Box>

      {/* ─── TEMPLATE DETAIL MODAL ─── */}
      <Dialog
        open={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: 4, overflow: "hidden" } }}
      >
        {selectedTemplate && (
          <>
            <Box sx={{ position: "relative" }}>
              <Box sx={{ height: { xs: 220, md: 320 }, overflow: "hidden" }}>
                <img
                  src={selectedTemplate.thumbnail}
                  alt={selectedTemplate.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </Box>
              <IconButton
                onClick={() => setSelectedTemplate(null)}
                sx={{
                  position: "absolute", top: 12, right: 12,
                  background: "rgba(0,0,0,0.5)", color: "white",
                  "&:hover": { background: "rgba(0,0,0,0.7)" },
                }}
              >
                <Close />
              </IconButton>
              <Box sx={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                p: 3,
              }}>
                <Typography fontWeight={800} color="white" fontSize="1.3rem">
                  {selectedTemplate.name}
                </Typography>
                <Box sx={{
                  display: "inline-block", background: "#16a34a",
                  borderRadius: 2, px: 1.5, py: 0.3, mt: 0.5,
                }}>
                  <Typography fontWeight={800} color="white" fontSize="1rem">
                    Rp {Number(selectedTemplate.price).toLocaleString("id-ID")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <DialogContent sx={{ p: 3.5 }}>
              <Typography color="#374151" lineHeight={1.85} fontSize="0.93rem" mb={3}>
                {selectedTemplate.description || "Template website profesional yang cocok untuk berbagai jenis UMKM. Desain modern, responsif di semua perangkat, dan siap digunakan langsung."}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography fontWeight={800} color="#1a1a2e" mb={2} fontSize="0.95rem">
                Yang termasuk dalam paket ini:
              </Typography>
              <Grid container spacing={1.5} mb={3}>
                {FEATURES_INCLUDED.map((f) => (
                  <Grid item xs={12} sm={6} key={f}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CheckCircle sx={{ color: "#16a34a", fontSize: 18 }} />
                      <Typography fontSize="0.85rem" color="#374151">{f}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box
                sx={{
                  background: "#fff8f0", borderRadius: 2.5, p: 2,
                  border: "1px solid rgba(245,158,11,0.2)", mb: 3,
                }}
              >
                <Typography fontSize="0.8rem" color="#92400e">
                  ⚠️ <strong>Catatan:</strong> Harga belum termasuk biaya hosting & domain tahunan.
                </Typography>
              </Box>

              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="contained" size="large" startIcon={<WhatsApp />} flex={1}
                  onClick={() => { handleTemplateWA(selectedTemplate); setSelectedTemplate(null); }}
                  sx={{
                    background: "linear-gradient(135deg, #25D366, #1ebe52)",
                    color: "white", fontWeight: 800, px: 4, py: 1.4, borderRadius: 3,
                    boxShadow: "none", flexGrow: 1,
                    "&:hover": { background: "linear-gradient(135deg, #1db954, #159a3f)" },
                  }}
                >
                  Hubungi untuk Pesan
                </Button>
                {selectedTemplate.url_preview && (
                  <Button
                    variant="outlined" size="large"
                    startIcon={<OpenInNew />}
                    href={selectedTemplate.url_preview}
                    target="_blank"
                    sx={{
                      color: "#d61355", borderColor: "#d61355",
                      fontWeight: 700, px: 3, py: 1.4, borderRadius: 3,
                      "&:hover": { background: "#fff0f4" },
                    }}
                  >
                    Preview Live
                  </Button>
                )}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* ─── TERMS MODAL ─── */}
      <Dialog
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
      >
        <Box sx={{ p: 3.5 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography fontWeight={800} color="#1a1a2e" fontSize="1.1rem">
              Syarat & Ketentuan
            </Typography>
            <IconButton onClick={() => setOpenTerms(false)} size="small">
              <Close fontSize="small" />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2.5 }} />
          {[
            ["Harga Template", "Belum termasuk biaya hosting & domain (estimasi Rp 300rb–600rb/tahun)."],
            ["Revisi", "Revisi desain hingga Anda puas, sesuai scope yang telah disepakati."],
            ["Waktu Pengerjaan", "Estimasi 3–7 hari kerja tergantung kompleksitas template."],
            ["Support", "Tersedia konsultasi dan dukungan teknis pasca-pembelian."],
            ["Pembayaran", "Bisa dicicil atau dibayar penuh di muka — hubungi kami untuk detail."],
          ].map(([title, desc]) => (
            <Box key={title} mb={2}>
              <Typography fontWeight={700} color="#1a1a2e" fontSize="0.9rem">{title}</Typography>
              <Typography color="#6b7280" fontSize="0.85rem" lineHeight={1.7}>{desc}</Typography>
            </Box>
          ))}
          <Button
            fullWidth variant="contained"
            onClick={() => setOpenTerms(false)}
            sx={{
              mt: 1, background: "linear-gradient(135deg, #d61355, #ff6b6b)",
              fontWeight: 700, borderRadius: 2.5, boxShadow: "none",
              "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
            }}
          >
            Mengerti
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default BantuBranding;