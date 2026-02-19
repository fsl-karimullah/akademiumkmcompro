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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ArrowForwardIos as ArrowIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../endpoint/api";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const steps = [
  {
    title: "Daftar Akun",
    description:
      "Buat akun dengan mudah untuk mulai membangun profil digital BISNIS Anda.",
  },
  {
    title: "Isi Profil Usaha",
    description:
      "Lengkapi informasi bisnis dan unggah foto produk untuk menarik pelanggan.",
  },
  {
    title: "Dapatkan Link Digital",
    description:
      "Terima link profil digital yang dapat langsung dibagikan ke pelanggan Anda.",
  },
  {
    title: "Promosikan Usaha",
    description:
      "Bagikan link di WhatsApp, sosial media, dan dapatkan pelanggan baru.",
  },
];

const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";

const Showcase = () => {
  const [shops, setShops] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/bantu-branding");
  };

  useEffect(() => {
    axios
      .get(endpoint.getShopAll(0, 0))
      .then((res) => {
        const data = res.data?.data || [];
        setShops(data.slice(0, 8));
      })
      .catch((err) => console.error("Error fetching shops", err));
  }, []);

  // ✅ New component to handle image fallback
  const ImageWithFallback = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    return (
      <CardMedia
        component="img"
        height="160"
        image={imgSrc}
        alt={alt}
        onError={() => {
          if (imgSrc !== fallbackImage) setImgSrc(fallbackImage);
        }}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
    );
  };

  return (
    <Box sx={{ backgroundColor: "#fff4f4", minHeight: "100vh" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleBack} sx={{ mr: 2, color: "#d61355" }}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" color="#d61355">
          Kembali
        </Typography>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #d61355 0%, #ff6b6b 100%)",
          color: "white",
          py: { xs: 8, md: 14 },
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems="center"
            justifyContent="space-between"
            textAlign={isMobile ? "center" : "left"}
          >
            <Box flex={1} mb={isMobile ? 4 : 0}>
              <Typography
                variant={isMobile ? "h4" : "h2"}
                fontWeight="bold"
                gutterBottom
                sx={{ textShadow: "0 0 6px rgba(0,0,0,0.2)" }}
              >
                BISNIS Digital Showcase
              </Typography>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                mb={4}
                sx={{ maxWidth: 550, lineHeight: 1.7, margin: "auto" }}
              >
                Profil digital gratis untuk BISNIS tradisional tanpa perlu punya
                website. Mudah dibuat, bisa langsung dibagikan, dan tingkatkan
                bisnis Anda secara online!
              </Typography>
              <Button
                component="a"
                href="https://api.akademiumkm.id/admin/login"
                target="_blank"
                rel="noopener noreferrer"
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#d61355",
                  fontWeight: "bold",
                  px: 5,
                  py: 1.5,
                  fontSize: "1.2rem",
                  borderRadius: 3,
                  boxShadow: "0 4px 15px rgba(255, 255, 255, 0.5)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#ffe0e6",
                  },
                }}
              >
                Daftar Sekarang Gratis
              </Button>
            </Box>

            {!isMobile && (
              <Box flex={1} pl={4}>
                <img
                  src="/icons/world-book-day.png"
                  alt="Illustration"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Steps Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={6}
          color="#d61355"
        >
          Cara Mudah Bergabung di Showcase
        </Typography>

        <Grid container spacing={4}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={6} key={step.title}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgb(214 19 85 / 0.15)",
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#d61355"
                  gutterBottom
                >
                  Step {i + 1}: {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Tutorial Video Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
          color="#d61355"
        >
          Tonton Panduan Lengkap
        </Typography>

        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 0 20px rgba(214,19,85,0.3)",
          }}
        >
          <iframe
            width="100%"
            height="405"
            src="https://www.youtube.com/embed/25RD3_TE33s"
            title="Tutorial BISNIS Digital Showcase"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Container>

      {/* Showcase List */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
          color="#d61355"
        >
          BISNIS yang Sudah Terdigitalisasi
        </Typography>

        <Swiper
          spaceBetween={16}
          slidesPerView={1.2}
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
                sx={{
                  boxShadow: "0 6px 15px rgba(214, 19, 85, 0.3)",
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* ✅ Use ImageWithFallback here */}
                <ImageWithFallback src={shop.thumbnail} alt={shop.name} />

                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    noWrap
                  >
                    {shop.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ mb: 1 }}
                  >
                    {shop.category} – {shop.regency}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: "#d61355",
                      borderColor: "#d61355",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#ff6b6b20",
                        borderColor: "#ff6b6b",
                      },
                    }}
                    href={`/umkm-showcase-detail/${shop.id}`}
                  >
                    Lihat Website
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d61355",
              color: "#fff",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#b50f47",
              },
            }}
            onClick={() => navigate("/all-showcase")}
          >
            Lihat Semua
          </Button>
        </Box>
      </Container>

      {/* Upgrade CTA */}
      <Box
        sx={{
          backgroundColor: "#d61355",
          py: 8,
          textAlign: "center",
          color: "white",
          mt: 10,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Ingin Website Profesional?
          </Typography>
          <Typography mb={4} fontSize="1.1rem">
            Tingkatkan bisnis Anda dengan website lengkap dan fitur premium dari
            kami.
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "white",
              color: "white",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                backgroundColor: "white",
                color: "#d61355",
              },
            }}
            onClick={() => navigate("/bantu-branding")}
          >
            Pelajari Layanan Website Profesional
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Showcase;
