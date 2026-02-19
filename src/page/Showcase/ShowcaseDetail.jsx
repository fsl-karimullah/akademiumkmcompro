import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LocationOn,
  Language,
  WhatsApp,
  Facebook,
  Instagram,
  AccessTime,
  ArrowBack,
  Share,
  FavoriteBorder,
  Favorite,
  ContentCopy,
  CheckCircle,
  OpenInNew,
  StorefrontOutlined,
  PhoneAndroid,
} from "@mui/icons-material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const DAY_LABELS = {
  monday: "Senin", tuesday: "Selasa", wednesday: "Rabu",
  thursday: "Kamis", friday: "Jumat", saturday: "Sabtu", sunday: "Minggu",
};

const ShowcaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "" });

  useEffect(() => {
    axios.get(`https://api.akademiumkm.id/api/shops/${id}`).then((res) => {
      const data = res.data.data;
      setShop(data);
      const localLikes = localStorage.getItem(`likes_${data.id}`);
      setLikeCount(localLikes ? parseInt(localLikes) : data.like_count || 0);
      setLiked(!!localStorage.getItem(`liked_${data.id}`));
    });
  }, [id]);

  const handleLike = () => {
    if (liked) return;
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    setLiked(true);
    localStorage.setItem(`likes_${shop.id}`, newCount.toString());
    localStorage.setItem(`liked_${shop.id}`, "1");
    setSnackbar({ open: true, msg: "Terima kasih sudah menyukai bisnis ini! ❤️" });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: shop.name, text: `Cek profil digital ${shop.name}!`, url });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setSnackbar({ open: true, msg: "Link berhasil disalin!" });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Halo, saya tertarik dengan bisnis ${shop.name}. Bisa ceritakan lebih lanjut?`);
    window.open(`https://wa.me/${shop.whatsapp}?text=${msg}`, "_blank");
  };

  const todaySchedule = () => {
    if (!shop?.schedule?.length) return null;
    const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const today = days[new Date().getDay()];
    return shop.schedule.find((s) => s.day?.toLowerCase() === today);
  };

  if (!shop) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"
      sx={{ background: "linear-gradient(135deg, #fff8f9, #fafafa)" }}>
      <Box textAlign="center">
        <Box sx={{
          width: 60, height: 60, borderRadius: "50%", mx: "auto", mb: 2,
          background: "linear-gradient(135deg, #d61355, #ff6b6b)",
          animation: "pulse 1.2s ease-in-out infinite",
        }} />
        <Typography color="text.secondary" fontSize="0.9rem">Memuat profil bisnis...</Typography>
        <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(0.85);opacity:0.5} }`}</style>
      </Box>
    </Box>
  );

  const imageItems = (shop.images || []).map((img) => ({ original: img, thumbnail: img }));
  const todaySched = todaySchedule();

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        .image-gallery-slide img { border-radius: 12px; }
        .image-gallery-thumbnail { border-radius: 8px; overflow: hidden; }
        .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover {
          border: 2px solid #d61355 !important;
        }
        .social-btn {
          transition: transform 0.2s, box-shadow 0.2s !important;
        }
        .social-btn:hover { transform: translateY(-3px); }
        .catalog-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .catalog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(214,19,85,0.14) !important;
        }
        .sched-row:nth-child(even) { background: #fff8f9; }
      `}</style>

      {/* ─── TOP NAVIGATION BAR ─── */}
      <Box
        sx={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(214,19,85,0.08)",
          px: { xs: 2, md: 4 }, py: 1.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: "#d61355", background: "#fff0f4", width: 36, height: 36, "&:hover": { background: "#ffe0e9" } }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Box>
            <Typography fontWeight={800} color="#1a1a2e" fontSize="0.95rem" lineHeight={1.2} noWrap maxWidth={220}>
              {shop.name}
            </Typography>
            <Typography fontSize="0.7rem" color="text.secondary">{shop.category}</Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <Tooltip title="Bagikan profil ini">
            <IconButton
              onClick={handleShare}
              sx={{ color: "#d61355", background: "#fff0f4", width: 36, height: 36, "&:hover": { background: "#ffe0e9" } }}
            >
              {copied ? <CheckCircle fontSize="small" /> : <Share fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title={liked ? "Sudah disukai" : "Suka bisnis ini"}>
            <IconButton
              onClick={handleLike}
              sx={{
                color: liked ? "#d61355" : "#999",
                background: liked ? "#fff0f4" : "#f5f5f5",
                width: 36, height: 36,
              }}
            >
              {liked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ─── HERO / COVER ─── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #b50f47 0%, #d61355 55%, #ff6b6b 100%)",
          pt: 5, pb: 8, px: 2,
          position: "relative", overflow: "hidden",
        }}
      >
        {[
          { s: 240, top: -80, right: -60, op: 0.07 },
          { s: 140, bottom: -50, left: -40, op: 0.05 },
        ].map((c, i) => (
          <Box key={i} sx={{
            position: "absolute", borderRadius: "50%",
            width: c.s, height: c.s, top: c.top, bottom: c.bottom,
            left: c.left, right: c.right,
            background: "white", opacity: c.op,
          }} />
        ))}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Avatar / Logo */}
          <Box
            sx={{
              width: 90, height: 90, borderRadius: "50%", mx: "auto", mb: 2,
              background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              overflow: "hidden",
            }}
          >
            {shop.thumbnail ? (
              <img src={shop.thumbnail} alt={shop.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <StorefrontOutlined sx={{ fontSize: 40, color: "#d61355" }} />
            )}
          </Box>
          <Typography
            variant="h4" fontWeight={800} color="white"
            sx={{ letterSpacing: "-0.02em", mb: 1 }}
          >
            {shop.name}
          </Typography>
          <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap" mb={2}>
            <Chip
              label={shop.category}
              sx={{ background: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700, fontSize: "0.8rem" }}
            />
            {todaySched && (
              <Chip
                icon={<AccessTime sx={{ color: "white !important", fontSize: "14px !important" }} />}
                label={`Buka hari ini: ${todaySched.opening_hour}–${todaySched.closing_hour}`}
                sx={{ background: "rgba(74,222,128,0.25)", color: "white", fontWeight: 600, fontSize: "0.78rem" }}
              />
            )}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
            <LocationOn sx={{ fontSize: 16, color: "rgba(255,255,255,0.8)" }} />
            <Typography color="rgba(255,255,255,0.85)" fontSize="0.88rem">
              {[shop.district, shop.regency, shop.province].filter(Boolean).join(", ")}
            </Typography>
          </Box>

          {/* Stats row */}
          <Box
            display="flex" justifyContent="center" gap={4} mt={3}
            sx={{ color: "white" }}
          >
            <Box textAlign="center">
              <Typography fontWeight={800} fontSize="1.4rem">{likeCount}</Typography>
              <Typography fontSize="0.72rem" sx={{ opacity: 0.75 }}>Suka</Typography>
            </Box>
            {shop.catalogs?.length > 0 && (
              <Box textAlign="center">
                <Typography fontWeight={800} fontSize="1.4rem">{shop.catalogs.length}</Typography>
                <Typography fontSize="0.72rem" sx={{ opacity: 0.75 }}>Produk</Typography>
              </Box>
            )}
            {shop.schedule?.length > 0 && (
              <Box textAlign="center">
                <Typography fontWeight={800} fontSize="1.4rem">{shop.schedule.length}</Typography>
                <Typography fontSize="0.72rem" sx={{ opacity: 0.75 }}>Hari Buka</Typography>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* ─── MAIN CONTENT ─── */}
      <Container maxWidth="lg" sx={{ mt: -4, pb: 10, position: "relative", zIndex: 2 }}>
        <Grid container spacing={3}>

          {/* ─── LEFT: Gallery + About ─── */}
          <Grid item xs={12} md={7}>

            {/* Gallery card */}
            {imageItems.length > 0 && (
              <Box
                sx={{
                  background: "white", borderRadius: 4,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  overflow: "hidden", mb: 3, p: 2,
                }}
              >
                <ImageGallery
                  items={imageItems}
                  showFullscreenButton={true}
                  showPlayButton={false}
                  autoPlay
                  slideInterval={3500}
                  showNav
                  showThumbnails={imageItems.length > 1}
                />
              </Box>
            )}

            {/* About */}
            {shop.description && (
              <Box
                sx={{
                  background: "white", borderRadius: 4,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  p: 3.5, mb: 3,
                }}
              >
                <Typography fontWeight={800} color="#1a1a2e" fontSize="1rem" mb={1.5}>
                  Tentang Bisnis Ini
                </Typography>
                <Typography color="#4b5563" lineHeight={1.85} fontSize="0.94rem">
                  {shop.description}
                </Typography>
              </Box>
            )}
          </Grid>

          {/* ─── RIGHT: Info Sidebar ─── */}
          <Grid item xs={12} md={5}>

            {/* Contact CTA */}
            <Box
              sx={{
                background: "white", borderRadius: 4,
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                p: 3, mb: 3,
              }}
            >
              <Typography fontWeight={800} color="#1a1a2e" fontSize="1rem" mb={2}>
                Hubungi Kami
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                {shop.whatsapp && (
                  <Button
                    fullWidth className="social-btn"
                    startIcon={<WhatsApp />}
                    onClick={handleWhatsApp}
                    variant="contained"
                    sx={{
                      background: "linear-gradient(135deg, #25D366, #128C7E)",
                      color: "white", fontWeight: 700, borderRadius: 2.5,
                      py: 1.2, boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
                      "&:hover": { background: "linear-gradient(135deg, #1eb458, #0e7060)" },
                    }}
                  >
                    Chat di WhatsApp
                  </Button>
                )}
                {shop.instagram && (
                  <Button
                    fullWidth className="social-btn"
                    startIcon={<Instagram />}
                    href={`https://instagram.com/${shop.instagram}`}
                    target="_blank"
                    variant="outlined"
                    sx={{
                      color: "#E1306C", borderColor: "#E1306C", fontWeight: 700,
                      borderRadius: 2.5, py: 1.1,
                      "&:hover": { background: "#fff0f4", borderColor: "#c13584" },
                    }}
                  >
                    @{shop.instagram}
                  </Button>
                )}
                {shop.facebook && (
                  <Button
                    fullWidth className="social-btn"
                    startIcon={<Facebook />}
                    href={`https://facebook.com/${shop.facebook}`}
                    target="_blank"
                    variant="outlined"
                    sx={{
                      color: "#1877F2", borderColor: "#1877F2", fontWeight: 700,
                      borderRadius: 2.5, py: 1.1,
                      "&:hover": { background: "#f0f5ff", borderColor: "#0d5ed9" },
                    }}
                  >
                    Facebook
                  </Button>
                )}
                {shop.website && (
                  <Button
                    fullWidth className="social-btn"
                    startIcon={<Language />}
                    endIcon={<OpenInNew fontSize="small" />}
                    href={`https://${shop.website}`}
                    target="_blank"
                    variant="outlined"
                    sx={{
                      color: "#6b7280", borderColor: "#d1d5db", fontWeight: 700,
                      borderRadius: 2.5, py: 1.1,
                      "&:hover": { background: "#f9fafb", borderColor: "#9ca3af" },
                    }}
                  >
                    Kunjungi Website
                  </Button>
                )}
              </Box>
            </Box>

            {/* Share CTA */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #fff0f4, #fff8f9)",
                border: "1px solid rgba(214,19,85,0.12)",
                borderRadius: 4, p: 3, mb: 3,
              }}
            >
              <Typography fontWeight={800} color="#1a1a2e" fontSize="0.95rem" mb={0.5}>
                Bagikan Profil Ini
              </Typography>
              <Typography color="#6b7280" fontSize="0.82rem" mb={2} lineHeight={1.6}>
                Bantu sebarkan bisnis ini ke teman dan keluarga Anda!
              </Typography>
              <Button
                fullWidth
                startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                onClick={handleShare}
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                  color: "white", fontWeight: 700, borderRadius: 2.5,
                  py: 1.1, boxShadow: "none",
                  "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
                }}
              >
                {copied ? "Link Disalin!" : "Salin Link Profil"}
              </Button>
            </Box>

            {/* Location card */}
            <Box
              sx={{
                background: "white", borderRadius: 4,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)", p: 3, mb: 3,
              }}
            >
              <Typography fontWeight={800} color="#1a1a2e" fontSize="0.95rem" mb={2}>
                Lokasi
              </Typography>
              <Box display="flex" gap={1.5} alignItems="flex-start">
                <Box
                  sx={{
                    width: 36, height: 36, borderRadius: 2, flexShrink: 0,
                    background: "#fff0f4",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <LocationOn sx={{ color: "#d61355", fontSize: 20 }} />
                </Box>
                <Typography color="#4b5563" lineHeight={1.7} fontSize="0.9rem">
                  {[shop.district, shop.regency, shop.province].filter(Boolean).join(", ")}
                </Typography>
              </Box>
            </Box>

            {/* Schedule card */}
            {shop.schedule?.length > 0 && (
              <Box
                sx={{
                  background: "white", borderRadius: 4,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)", p: 3, mb: 3,
                  overflow: "hidden",
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <AccessTime sx={{ color: "#d61355", fontSize: 20 }} />
                  <Typography fontWeight={800} color="#1a1a2e" fontSize="0.95rem">
                    Jam Operasional
                  </Typography>
                </Box>
                {shop.schedule.map((item, i) => {
                  const dayKey = item.day?.toLowerCase();
                  const isToday = dayKey === ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()];
                  return (
                    <Box
                      key={i}
                      className="sched-row"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      px={1.5} py={1}
                      sx={{
                        borderRadius: 2,
                        background: isToday ? "#fff0f4" : "transparent",
                        border: isToday ? "1px solid rgba(214,19,85,0.15)" : "none",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        fontSize="0.85rem"
                        fontWeight={isToday ? 700 : 500}
                        color={isToday ? "#d61355" : "#374151"}
                      >
                        {DAY_LABELS[dayKey] || item.day}
                        {isToday && (
                          <Typography component="span" fontSize="0.65rem"
                            sx={{ ml: 1, background: "#d61355", color: "white", px: 0.8, py: 0.2, borderRadius: 1 }}>
                            Hari ini
                          </Typography>
                        )}
                      </Typography>
                      <Typography fontSize="0.82rem" color={isToday ? "#d61355" : "#6b7280"} fontWeight={isToday ? 700 : 400}>
                        {item.opening_hour} – {item.closing_hour}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* Like Card */}
            <Box
              sx={{
                background: "white", borderRadius: 4,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                p: 3, textAlign: "center",
              }}
            >
              <Box
                onClick={handleLike}
                sx={{
                  cursor: liked ? "default" : "pointer",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 1,
                  transition: "transform 0.2s",
                  "&:hover": { transform: liked ? "none" : "scale(1.04)" },
                }}
              >
                {liked ? (
                  <Favorite sx={{ fontSize: 40, color: "#d61355" }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: 40, color: "#d61355" }} />
                )}
                <Typography fontWeight={800} fontSize="1.4rem" color="#1a1a2e">{likeCount}</Typography>
                <Typography fontSize="0.8rem" color="#6b7280">
                  {liked ? "Anda sudah menyukai bisnis ini" : "Suka dengan bisnis ini? Klik untuk mendukung!"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ─── CATALOG ─── */}
        {shop.catalogs?.length > 0 && (
          <Box mt={6}>
            <Box textAlign="center" mb={5}>
              <Chip
                label="Produk Kami"
                sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 700, mb: 2 }}
              />
              <Typography variant="h5" fontWeight={800} color="#1a1a2e">
                Katalog Produk
              </Typography>
              <Typography color="text.secondary" fontSize="0.9rem" mt={0.5}>
                {shop.catalogs.length} produk tersedia
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {shop.catalogs.map((catalog) => (
                <Grid item xs={12} sm={6} md={4} key={catalog.id}>
                  <Box
                    className="catalog-card"
                    sx={{
                      background: "white", borderRadius: 4,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(214,19,85,0.06)",
                      overflow: "hidden",
                      display: "flex", flexDirection: "column", height: "100%",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Box
                        component="img"
                        src={`https://api.akademiumkm.id/storage/${catalog.images?.[0]}`}
                        alt={catalog.name}
                        sx={{ width: "100%", height: 200, objectFit: "cover" }}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x200?text=Produk"; }}
                      />
                    </Box>
                    <Box p={2.5} flexGrow={1} display="flex" flexDirection="column">
                      <Typography
                        fontWeight={700} color="#1a1a2e" fontSize="1rem"
                        gutterBottom
                        sx={{
                          display: "-webkit-box", WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical", overflow: "hidden",
                        }}
                      >
                        {catalog.name}
                      </Typography>
                      {catalog.description && (
                        <Typography
                          variant="body2" color="#6b7280" lineHeight={1.7}
                          fontSize="0.82rem" mb={1.5} flexGrow={1}
                          sx={{
                            display: "-webkit-box", WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical", overflow: "hidden",
                          }}
                        >
                          {catalog.description}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          background: "#f0fdf4", borderRadius: 2,
                          px: 1.5, py: 0.8, display: "inline-block", mb: 2,
                        }}
                      >
                        <Typography fontWeight={800} color="#16a34a" fontSize="1rem">
                          Rp {catalog.price?.toLocaleString("id-ID")}
                        </Typography>
                      </Box>
                      {catalog.url && (
                        <Button
                          fullWidth variant="contained"
                          href={`https://${catalog.url}`}
                          target="_blank"
                          sx={{
                            background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                            color: "white", fontWeight: 700, borderRadius: 2.5,
                            boxShadow: "none", textTransform: "none",
                            "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
                          }}
                        >
                          Pesan Sekarang
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* ─── FOOTER CTA ─── */}
        <Box
          mt={8}
          sx={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #2d1535 100%)",
            borderRadius: 4, p: { xs: 4, md: 5 },
            textAlign: "center", color: "white",
            position: "relative", overflow: "hidden",
          }}
        >
          <Box sx={{
            position: "absolute", top: -40, right: -40,
            width: 160, height: 160, borderRadius: "50%",
            background: "rgba(214,19,85,0.15)",
          }} />
          <PhoneAndroid sx={{ fontSize: 42, color: "#ff6b6b", mb: 2 }} />
          <Typography variant="h5" fontWeight={800} mb={1.5}>
            Punya Bisnis? Tampil Online Gratis!
          </Typography>
          <Typography sx={{ opacity: 0.72, mb: 3, maxWidth: 440, mx: "auto", lineHeight: 1.8, fontSize: "0.93rem" }}>
            Buat profil digital bisnis Anda seperti ini dalam 15 menit. Gratis selamanya, tanpa perlu keahlian teknis.
          </Typography>
          <Button
            component="a"
            href="https://api.akademiumkm.id/admin/login"
            target="_blank"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #d61355, #ff6b6b)",
              color: "white", fontWeight: 800,
              px: 5, py: 1.5, borderRadius: 3,
              boxShadow: "0 8px 24px rgba(214,19,85,0.3)",
              "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
            }}
          >
            Daftarkan Bisnis Saya — Gratis!
          </Button>
        </Box>
      </Container>

      {/* ─── SNACKBAR ─── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success" variant="filled"
          sx={{ background: "#d61355", fontWeight: 600, borderRadius: 2 }}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShowcaseDetail;