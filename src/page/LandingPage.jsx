import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  useTheme,
  Alert,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { endpoint } from "../endpoint/api";
import axios from "axios";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { keyframes } from "@emotion/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";

const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "280px",
  backgroundColor: "#fafafa",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.25s ease-in-out, box-shadow 0.25s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff8f9",
  },
  "& .MuiTypography-h6": {
    color: "#222",
    fontWeight: "600",
  },
  "& .MuiTypography-body2": {
    color: "#555",
  },
}));

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Styled Hero Container
const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "linear-gradient(135deg, #ffe3ec 0%, #ffffff 100%)",
  padding: theme.spacing(10, 2),
  textAlign: "center",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
}));

const AnimatedIcon = styled(Box)(({ top, left }) => ({
  position: "absolute",
  top,
  left,
  opacity: 0.1,
  fontSize: "4rem",
  animation: `${float} 6s ease-in-out infinite`,
  color: "#d61355",
}));

const IconCircle = styled(Box)({
  backgroundColor: "#f9dcdc",
  borderRadius: "50%",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const openLogoutDialog = () => setLogoutOpen(true);
  const closeLogoutDialog = () => setLogoutOpen(false);

  const handleSupportClick = () => {
    const phoneNumber = "6287826563459";
    const message = encodeURIComponent(
      "Halo kak, saya mau melaporkan masalah ketika order ..."
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
    handleMenuClose();
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.getCourses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data);
      setFilteredCourses(response.data.data);
    } catch (err) {
      setError("Gagal memuat data kursus. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(endpoint.getEducation, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil data video. Silakan coba lagi nanti."
          );
        }

        const data = await response.json();
        setVideos(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleWatchNow = (id) => {
    navigate(`/videoedukasidetail/${id}`);
  };

  const freeCourses = filteredCourses.filter((course) => course.price === 0);
  const paidCourses = filteredCourses.filter((course) => course.price > 0);

  const renderCourseCard = (course) => (
    <Grid
      item
      key={course.id}
      xs={6}
      sm={6}
      md={4}
      onClick={() => navigate(`/course-pay/${course.id}`)}
      sx={{
        cursor: "pointer",
        "&:hover .course-card": {
          boxShadow: "0px 6px 20px rgba(0,0,0,0.2)",
          transform: "scale(1.05)",
        },
      }}
    >
      <Card
        className="course-card"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          height={isMobile ? "110" : "180"}
          image={
            course.thumbnail ||
            "https://via.placeholder.com/300x180.png?text=No+Image"
          }
          alt={course.title}
          sx={{ objectFit: "cover" }}
        />

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: isMobile ? 1 : 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: isMobile ? "0.85rem" : "1.25rem",
            }}
          >
            {course.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ fontSize: isMobile ? "0.7rem" : "0.875rem" }}
          >
            Mentor: {course.mentor}
          </Typography>

          <Box sx={{ mt: 1 }}>
            {course.price === 0 ? (
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#2e7d32"
                sx={{ fontSize: isMobile ? "0.85rem" : "1.25rem" }}
              >
                Gratis
              </Typography>
            ) : course.discount > 0 ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: "line-through",
                      fontSize: isMobile ? "0.65rem" : "0.875rem",
                    }}
                  >
                    Rp{" "}
                    {(
                      (course.price * 100) /
                      (100 - course.discount)
                    ).toLocaleString("id-ID")}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#d61355",
                      color: "white",
                      px: 1,
                      py: 0.25,
                      borderRadius: "5px",
                      fontSize: "0.65rem",
                      fontWeight: "bold",
                    }}
                  >
                    -{course.discount}%
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#d61355"
                  sx={{ fontSize: isMobile ? "0.85rem" : "1.25rem" }}
                >
                  Rp {course.price.toLocaleString("id-ID")}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                fontWeight="bold"
                color="#d61355"
                sx={{ fontSize: isMobile ? "0.85rem" : "1.25rem" }}
              >
                Rp {course.price.toLocaleString("id-ID")}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
        {/* Navbar */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#d61355",
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/")}
            >
              Akademi UMKM
            </Typography>

            {!isMobile ? (
              <>
                <Button
                  startIcon={<HomeIcon />}
                  onClick={() => handleNavigate("/")}
                  sx={{ color: "#333", mx: 1 }}
                >
                  Homepage
                </Button>
                <Button
                  onClick={() => handleNavigate("/profile")}
                  sx={{ color: "#333", mx: 1 }}
                >
                  Profile
                </Button>
                <Button
                  startIcon={<SupportAgentIcon />}
                  onClick={handleSupportClick}
                  sx={{
                    mx: 1,
                    backgroundColor: "#25D366",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#1ebe5d" },
                  }}
                >
                  Layanan Pengaduan
                </Button>
                <Button
                  startIcon={<LogoutIcon />}
                  onClick={openLogoutDialog}
                  sx={{ color: "#d61355", mx: 1 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <IconButton onClick={handleMenuClick}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleNavigate("/")}>
                    <HomeIcon sx={{ mr: 1 }} /> Homepage
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate("/profile")}>
                    <AccountCircleIcon sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={handleSupportClick}>
                    <SupportAgentIcon sx={{ mr: 1 }} /> Layanan Pengaduan
                  </MenuItem>
                  <MenuItem onClick={openLogoutDialog}>
                    <LogoutIcon sx={{ mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <HeroSection>
          {/* Floating Icons */}
          <AnimatedIcon top="20%" left="10%">
            <AutoGraphIcon fontSize="inherit" />
          </AnimatedIcon>
          <AnimatedIcon top="40%" left="80%">
            <EmojiObjectsIcon fontSize="inherit" />
          </AnimatedIcon>
          <AnimatedIcon top="70%" left="20%">
            <StorefrontIcon fontSize="inherit" />
          </AnimatedIcon>

          {/* Hero Content */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#d61355",
              mb: 2,
            }}
          >
            Selamat Datang di Akademi UMKM
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, color: "#333" }}>
            Majukan bisnismu melalui edukasi dan pelatihan digital interaktif.
          </Typography>
        </HeroSection>

        {/* Arsip Webinar Section */}
        <Container sx={{ py: 6, flexGrow: 1 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={4}
            textAlign="center"
            color="#d61355"
          >
            Pembelajaran Gratis!
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ textAlign: "center" }}>
              {error}
            </Alert>
          ) : videos.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  600: { slidesPerView: 1.2 },
                  900: { slidesPerView: 2 },
                  1280: { slidesPerView: 3 },
                }}
                style={{ padding: "0 20px" }}
              >
                {videos.map((video) => (
                  <SwiperSlide key={video.id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        borderRadius: 4,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          video.thumbnail ||
                          "https://via.placeholder.com/600x400.png?text=Kursus+Gratis"
                        }
                        alt={video.title}
                        sx={{
                          height: 200,
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          p: 3,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          gutterBottom
                          sx={{
                            color: "#d61355",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {video.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, flexGrow: 1 }}
                        >
                          {video.description ||
                            "Temukan strategi praktis dan wawasan berharga melalui kursus gratis ini."}
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleWatchNow(video.id)}
                          sx={{
                            mt: "auto",
                            backgroundColor: "#d61355",
                            color: "#fff",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#b50d44" },
                          }}
                        >
                          Tonton Sekarang
                        </Button>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Lihat Semua Button */}
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#d61355",
                    color: "#d61355",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#d61355",
                      color: "#fff",
                      borderColor: "#d61355",
                    },
                  }}
                  onClick={() => handleNavigate("/videoedukasi")}
                >
                  Lihat Semua
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
              Belum ada video edukasi yang tersedia saat ini.
            </Typography>
          )}
        </Container>

        {/* kelas online section */}
        <Container
          maxWidth="lg"
          sx={{
            py: 2,
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "40vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error" textAlign="center">
              {error}
            </Typography>
          ) : (
            <>
              {/* Free Courses */}
              {freeCourses.length > 0 && (
                <>
                  <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#d61355"
                      sx={{ mb: 1 }}
                    >
                      Hadiah buat kamu!
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ maxWidth: "600px", margin: "0 auto" }}
                    >
                      Dapatkan kursus-kursus gratis yang akan membantu kamu
                      mengembangkan skill tanpa biaya apapun!
                    </Typography>
                  </Box>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={16}
                    navigation
                    breakpoints={{
                      0: { slidesPerView: 1.2 },
                      600: { slidesPerView: 2 },
                      960: { slidesPerView: 3 },
                      1280: { slidesPerView: 4 },
                    }}
                  >
                    {freeCourses.slice(0, 8).map((course) => (
                      <SwiperSlide key={course.id}>
                        {renderCourseCard(course)}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}

              {/* Paid Courses */}
              {paidCourses.length > 0 && (
                <>
                  <Box sx={{ textAlign: "center", mb: 3, mt: 5 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#d61355"
                      sx={{ mb: 1 }}
                    >
                      Pembelajaran pilihan untuk upgrade diri
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{ maxWidth: "600px", margin: "0 auto" }}
                    >
                      Temukan kursus terbaik yang akan membantu kamu untuk naik
                      ke level berikutnya dalam pengembangan diri.
                    </Typography>
                  </Box>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={16}
                    navigation
                    breakpoints={{
                      0: { slidesPerView: 1.2 },
                      600: { slidesPerView: 2 },
                      960: { slidesPerView: 3 },
                      1280: { slidesPerView: 4 },
                    }}
                  >
                    {paidCourses.slice(0, 8).map((course) => (
                      <SwiperSlide key={course.id}>
                        {renderCourseCard(course)}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              )}

              {/* No Course Match */}
              {filteredCourses.length === 0 && (
                <Typography
                  variant="h6"
                  textAlign="center"
                  color="textSecondary"
                  sx={{ mt: 4 }}
                >
                  Tidak ada kursus yang sesuai dengan pencarian Anda.
                </Typography>
              )}
              {(freeCourses.length > 0 || paidCourses.length > 0) && (
                <Box sx={{ textAlign: "center", mt: 5 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "#d61355",
                      color: "#d61355",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#d61355",
                        color: "#fff",
                        borderColor: "#d61355",
                      },
                    }}
                    onClick={() => handleNavigate("/course")}
                  >
                    Explore Kelas dan Bimbingan Lainnya
                  </Button>
                </Box>
              )}
            </>
          )}
        </Container>

        {/* Logout Dialog */}
        <Dialog open={logoutOpen} onClose={closeLogoutDialog}>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Konfirmasi Logout
          </DialogTitle>
          <DialogContent>
            <Typography>
              Apakah Anda yakin ingin keluar dari akun Anda?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLogoutDialog} color="inherit">
              Batal
            </Button>
            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              sx={{ color: "#d61355", fontWeight: "bold" }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
