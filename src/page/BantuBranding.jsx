import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Dialog,
  Pagination,
  TextField,
} from "@mui/material";
import {
  CheckCircle,
  WhatsApp,
  Visibility,
  Web,
  Build,
  Info,
  Star,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { endpoint } from "../endpoint/api";

const BantuBranding = ({ currentPath }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [openTerms, setOpenTerms] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  }, [templates, searchQuery]);

  const paginatedTemplates = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTemplates, page]);

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(endpoint.getPackage);
        setTemplates(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleWhatsAppClick = (packetNumber) => {
    const message = encodeURIComponent(
      `Halo kak, saya ingin mengetahui tentang paket ${packetNumber}`
    );
    window.open(`https://wa.me/6287826563459?text=${message}`, "_blank");
  };

  const handleWhatsAppClickWebsite = (title) => {
    const message = encodeURIComponent(
      `Halo kak, saya ingin mengetahui tentang branding website ${title} dengan menggunakan kode BRANDINWEBSITE untuk harga spesial Rp. 500.000`
    );
    window.open(`https://wa.me/6285281252199?text=${message}`, "_blank");
  };

  const handlePreviewWebsite = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box>
      {/* ✅ Navbar */}
      <Navbar currentPath={currentPath} />

      {/* ✅ Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "85vh",
          background: "linear-gradient(135deg, #d61355, #ff6b6b)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          py: 10,
          overflow: "hidden",
        }}
      >
        {/* Decorative Background Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/hero-wave.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.1,
          }}
        />

        {/* Hero Content */}
        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2, lineHeight: 1.3 }}
          >
            BISNIS yang Tidak Go Digital Akan{" "}
            <span style={{ textDecoration: "underline", color: "#FFD700" }}>
              Tersingkir!
            </span>
          </Typography>

          <Typography
            variant="h6"
            sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}
          >
            Saatnya bisnismu memiliki website profesional. Mulai dari hanya{" "}
            <strong>Rp 500.000</strong>, kamu bisa punya website sendiri hari
            ini!
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<WhatsApp />}
              sx={{
                backgroundColor: "#25D366",
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                "&:hover": { backgroundColor: "#1EBE52" },
              }}
              onClick={() =>
                handleWhatsAppClick(
                  "Halo kak, saya ingin konsultasi digitalisasi BISNIS saya."
                )
              }
            >
              Konsultasi Gratis via WhatsApp
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Info />}
              onClick={() => setOpenTerms(true)}
              sx={{
                borderColor: "white",
                color: "white",
                fontSize: "1rem",
                px: 4,
                py: 1.5,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Syarat & Ketentuan
            </Button>

            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Info />}
                sx={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 0 8px 2px rgba(255, 215, 0, 0.6)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#e6c200",
                    boxShadow: "0 0 12px 4px rgba(255, 215, 0, 0.9)",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => navigate("/umkm-showcase")}
              >
                <Star sx={{ mr: 1 }} />
                UMKM Digital Showcase
              </Button>

              {/* Featured Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "#FF3D00",
                  color: "white",
                  px: 1.5,
                  py: 0.3,
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  boxShadow: "0 0 6px rgba(255, 61, 0, 0.8)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                GRATIS
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ✅ Section: Tanggal Digitalisasi Bisnis - Perfectly Centered Mobile */}
      <Box sx={{ py: 8, backgroundColor: "#fff" }}>
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={6}
            sx={{ px: 2 }}
          >
            Tangga Digitalisasi Bisnis
          </Typography>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 2 },
              px: { xs: 2, md: 0 },
            }}
          >
            {/* Connecting Line */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: 24, md: "32px" },
                left: { xs: "36px", md: 0 },
                height: { xs: "100%", md: "2px" },
                width: { xs: "2px", md: "100%" },
                backgroundColor: "#d61355",
                zIndex: 0,
              }}
            />

            {/* Step Items */}
            {[
              "Eksistensi Social Media (Instagram, Tiktok)",
              "Komunikasi Profesional Gunakan (Whatsapp Business)",
              "Masuk ke Marketplace (Shopee & Tokopedia)",
              "Iklan Digital Dasar Meta Ads atau Tiktok Ads",
              "Website & Sistem (Landing Page / E-Commerce)",
              "Scale Up & Kolaborasi (Affiliate)",
            ].map((title, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: "center",
                  justifyContent: { xs: "flex-start", md: "center" },
                  gap: 2,
                  width: "100%",
                }}
              >
                {/* Step number circle */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    borderRadius: "50%",
                    backgroundColor: "#d61355",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: 1,
                  }}
                >
                  {index + 1}
                </Box>

                {/* Text content */}
                <Box
                  sx={{
                    flex: 1,
                    textAlign: { xs: "left", md: "center" },
                    maxWidth: { xs: "100%", md: 160 },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      fontSize: "0.95rem",
                      wordBreak: "break-word",
                    }}
                  >
                    {title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ✅ Section: Website Template Display */}
      <Box sx={{ py: 8, backgroundColor: "#fafafa" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Pilih Template Website Siap Pakai
          </Typography>
          <Typography textAlign="center" color="text.secondary" mb={5}>
            Cocok untuk berbagai jenis BISNIS – langsung online tanpa ribet!
          </Typography>

          <Box sx={{ maxWidth: 400, mx: "auto", mb: 4 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Cari template..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
            />
          </Box>

          <Grid container spacing={4}>
            {paginatedTemplates.map((template, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  {/* Image */}
                  <CardActionArea
                    onClick={() => handlePreviewWebsite(template.url_preview)}
                  >
                    <Box
                      sx={{
                        height: 200,
                        overflow: "hidden",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    >
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </CardActionArea>

                  {/* Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    {/* Title */}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        lineHeight: "1.4em",
                        maxHeight: "2.8em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        mb: 1,
                      }}
                    >
                      {template.name}
                    </Typography>

                    {/* Price */}
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ color: "#2E7D32", mb: 1 }}
                    >
                      Rp {Number(template.price).toLocaleString("id-ID")}
                    </Typography>

                    {/* Description (Fixed) */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        flexGrow: 1,
                        lineHeight: "1.5em",
                        maxHeight: "4.5em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        mb: 2,
                      }}
                    >
                      {template.description ||
                        "Template website profesional untuk BISNIS modern."}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    {/* CTA Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<WhatsApp />}
                        sx={{
                          backgroundColor: "#25D366",
                          fontSize: "0.75rem",
                          "&:hover": { backgroundColor: "#1EBE52" },
                        }}
                        onClick={() =>
                          handleWhatsAppClick(
                            `Halo kak, saya tertarik dengan template website ${
                              template.name
                            } seharga Rp ${Number(
                              template.price
                            ).toLocaleString(
                              "id-ID"
                            )}. Bisa dijelaskan lebih lanjut?`
                          )
                        }
                      >
                        HUBUNGI
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Visibility />}
                        sx={{
                          fontSize: "0.75rem",
                          color: "#333",
                          borderColor: "#ddd",
                          "&:hover": { backgroundColor: "#f9f9f9" },
                        }}
                        onClick={() =>
                          handlePreviewWebsite(template.url_preview)
                        }
                      >
                        PREVIEW
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </Container>
      </Box>
      <Dialog
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Syarat & Ketentuan
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Kami tidak menyediakan hosting & domain atau harga belum termasuk
            hosting & domain.
          </Typography>
          <Box textAlign="right">
            <Button onClick={() => setOpenTerms(false)}>Tutup</Button>
          </Box>
        </Box>
      </Dialog>

      {/* ✅ Section: Custom Website Offering */}
      <Box sx={{ py: 8, background: "#fff5f5" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                Tidak Menemukan Template yang Sesuai?
              </Typography>
              <Typography color="text.secondary" mb={3}>
                Kami juga menerima jasa pembuatan website{" "}
                <strong>custom sesuai kebutuhan bisnis Anda</strong>. Dari
                website profil, toko online, hingga sistem pemesanan digital.
              </Typography>
              <Typography color="error" mb={3}>
                ⚠️ Catatan: Banyak BISNIS gagal berkembang karena tidak memiliki
                sistem online yang sesuai.
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Build />}
                sx={{
                  backgroundColor: "#d61355",
                  "&:hover": { backgroundColor: "#c10f48" },
                }}
                onClick={() =>
                  handleWhatsAppClick(
                    "Halo kak, saya ingin buat website custom sesuai kebutuhan bisnis saya."
                  )
                }
              >
                Buat Website Custom Sekarang
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="Custom website service"
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ✅ CTA Bottom Section */}
      <Box
        sx={{
          py: 6,
          backgroundColor: "#121212",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Jangan Tunggu Sampai Kompetitor Anda Lebih Dulu Go Digital!
          </Typography>
          <Typography mb={4}>
            Waktu terbaik untuk memulai digitalisasi bisnis Anda adalah
            sekarang.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Web />}
            sx={{
              backgroundColor: "#ff6b6b",
              "&:hover": { backgroundColor: "#e55d5d" },
            }}
            onClick={() =>
              handleWhatsAppClick(
                "Halo kak, saya tertarik untuk mulai digitalisasi bisnis saya. Bisa bantu?"
              )
            }
          >
            Mulai Digitalisasi Bisnis
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default BantuBranding;
