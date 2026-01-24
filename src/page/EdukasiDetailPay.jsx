import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
} from "@mui/material";
import {
  Home,
  NavigateNext,
  PlayCircleOutline,
  Person,
  VideoLibrary,
  CheckCircle,
  LocalFireDepartment,
} from "@mui/icons-material";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import parse from "html-react-parser";
import Navbar from "../components/Navbar";

const EdukasiDetailPay = ({ currentPath }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return url
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "youtube.com/embed/");
    }
    if (url.includes("drive.google.com")) {
      const match = url.match(/\/file\/d\/([^/]+)\//);
      const fileId = match?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return url;
  };

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.getCourseDetails(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data.data);
    } catch (err) {
      toast.error("Gagal memuat data kursus. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetail();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.buyCourse(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const redirectUrl = response.data?.data?.redirect_url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        toast.success("Berhasil klaim kursus gratis!");
        navigate(`/course/${course.id}/`);
      }
    } catch (err) {
      toast.error("Gagal melakukan pembelian. Silakan coba lagi.");
    }
  };

  const formatPrice = (price) => {
    if (price === 0) return "Gratis";
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  const getOriginalPrice = (price, discount) => {
    if (discount > 0) {
      return Math.round((price * 100) / (100 - discount));
    }
    return price;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <CircularProgress sx={{ color: "#d61355" }} />
      </Box>
    );
  }

  if (!course) return null;

  const previewVideo = course.videos && course.videos.length > 0 ? course.videos[0] : null;

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar currentPath={currentPath} />

      {/* Breadcrumb */}
      <Box sx={{ backgroundColor: "#fff", py: 2, borderBottom: "1px solid #eee" }}>
        <Container maxWidth="lg">
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <MuiLink
              component={Link}
              to="/"
              sx={{ display: "flex", alignItems: "center", color: "#666", textDecoration: "none" }}
            >
              <Home sx={{ mr: 0.5, fontSize: 18 }} />
              Home
            </MuiLink>
            <MuiLink
              component={Link}
              to="/course"
              sx={{ color: "#666", textDecoration: "none" }}
            >
              E-Course
            </MuiLink>
            <Typography color="text.primary" sx={{ fontWeight: 500 }}>
              {course.title.length > 40 ? course.title.substring(0, 40) + "..." : course.title}
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }} direction={{ xs: "column-reverse", md: "row" }}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} md={8}>
            {/* Thumbnail */}
            <Card
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                mb: 3,
              }}
            >
              <Box sx={{ position: "relative", paddingTop: "56.25%" /* 16:9 aspect ratio */ }}>
                <Box
                  component="img"
                  src={course.thumbnail || "https://via.placeholder.com/800x450.png?text=No+Image"}
                  alt={course.title}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Card>

            {/* Title & Mentor */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#222",
                mb: 1.5,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                lineHeight: 1.3,
              }}
            >
              {course.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Chip
                icon={<Person sx={{ fontSize: 16 }} />}
                label={`By ${course.mentor}`}
                size="small"
                sx={{
                  backgroundColor: "#f0f0f0",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  "& .MuiChip-icon": { color: "#666" },
                }}
              />
            </Box>

            {/* Tabs */}
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #eee",
                  minHeight: 40,
                  "& .MuiTab-root": {
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    color: "#666",
                    minHeight: 40,
                    py: 1,
                    "&.Mui-selected": {
                      color: "#d61355",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#d61355",
                  },
                }}
              >
                <Tab label="Pembelajaran" />
                <Tab label="Pemateri" />
              </Tabs>

              <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ fontSize: "0.95rem" }}>
                      Deskripsi Kursus
                    </Typography>
                    <Box
                      sx={{
                        typography: "body2",
                        color: "#555",
                        lineHeight: 1.7,
                        fontSize: "0.875rem",
                        "& ul": { pl: 2.5, listStyle: "disc" },
                        "& ol": { pl: 2.5, listStyle: "decimal" },
                        "& li": { mb: 0.3 },
                      }}
                    >
                      {parse(course.description || "Deskripsi tidak tersedia.")}
                    </Box>

                    {course.videos && course.videos.length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ fontSize: "0.95rem" }}>
                          Daftar Materi ({course.videos.length} Video)
                        </Typography>
                        <List dense>
                          {course.videos.map((video, index) => (
                            <ListItem
                              key={video.id}
                              sx={{
                                backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                                borderRadius: "6px",
                                mb: 0.5,
                                py: 0.5,
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <PlayCircleOutline sx={{ color: "#d61355", fontSize: 20 }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={video.title}
                                primaryTypographyProps={{ fontWeight: 500, fontSize: "0.85rem" }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Tab: Pemateri */}
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Tentang Pemateri
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          backgroundColor: "#d61355",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "2rem",
                          fontWeight: 700,
                        }}
                      >
                        {course.mentor?.charAt(0)?.toUpperCase() || "M"}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {course.mentor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mentor di Akademi UMKM
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      Mentor berpengalaman yang siap membimbing Anda dalam perjalanan belajar.
                      Dapatkan insight dan pengetahuan langsung dari praktisi industri.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Sidebar */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
                position: { xs: "relative", md: "sticky" },
                top: { md: 20 },
              }}
            >
              {/* Video Preview */}
              {previewVideo && (
                <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    src={getEmbedUrl(previewVideo.url)}
                    title={previewVideo.title}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <PlayCircleOutline sx={{ fontSize: 48, color: "rgba(255,255,255,0.8)" }} />
                  </Box>
                </Box>
              )}

              <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                {/* Price Section */}
                <Box
                  sx={{
                    backgroundColor: "#d61355",
                    color: "#fff",
                    borderRadius: "10px",
                    p: 1.5,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                    Harga E-Course:
                  </Typography>
                  {course.discount > 0 && course.price > 0 && (
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through", opacity: 0.7 }}
                    >
                      Rp {getOriginalPrice(course.price, course.discount).toLocaleString("id-ID")}
                    </Typography>
                  )}
                  <Typography variant="h5" fontWeight={700}>
                    {formatPrice(course.price)}
                  </Typography>
                  {course.discount > 0 && (
                    <Chip
                      icon={<LocalFireDepartment sx={{ color: "#fff !important", fontSize: 16 }} />}
                      label={`Hemat ${course.discount}%`}
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: "rgba(255,255,255,0.2)",
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>

                {/* Course Info */}
                <Typography variant="body2" fontWeight={600} gutterBottom sx={{ color: "#333" }}>
                  Informasi E-Course:
                </Typography>

                <List dense sx={{ mb: 1.5 }}>
                  <ListItem sx={{ px: 0, py: 0.3 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <VideoLibrary sx={{ color: "#d61355" }} />
                    </ListItemIcon>
                    <ListItemText primary="Materi" />
                    <Typography variant="body2" fontWeight={600}>
                      {course.videos?.length || 0} Video
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ px: 0, py: 0.3 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <CheckCircle sx={{ color: "#d61355", fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText primary="Status" primaryTypographyProps={{ fontSize: "0.875rem" }} />
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
                      {course.enrolled ? "Terdaftar" : "Belum"}
                    </Typography>
                  </ListItem>
                </List>

                <Divider sx={{ my: 1.5 }} />

                {/* CTA Buttons */}
                {course.enrolled ? (
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    onClick={() => navigate(`/course/${course.id}/`)}
                    sx={{
                      backgroundColor: "#d61355",
                      py: 1.2,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      borderRadius: "10px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#b50d44",
                      },
                    }}
                  >
                    Lanjut Belajar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    size="medium"
                    onClick={handleEnroll}
                    sx={{
                      backgroundColor: "#d61355",
                      py: 1.2,
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      borderRadius: "10px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#b50d44",
                      },
                    }}
                  >
                    {course.price === 0 ? "Klaim Gratis" : "Beli Sekarang"}
                  </Button>
                )}

                {!course.enrolled && course.price > 0 && (
                  <Button
                    variant="outlined"
                    fullWidth
                    size="medium"
                    sx={{
                      mt: 1.5,
                      py: 1,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      borderRadius: "10px",
                      textTransform: "none",
                      borderColor: "#d61355",
                      color: "#d61355",
                      "&:hover": {
                        borderColor: "#b50d44",
                        backgroundColor: "rgba(214, 19, 85, 0.04)",
                      },
                    }}
                    onClick={() => navigate("/course")}
                  >
                    Lihat Kursus Lainnya
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EdukasiDetailPay;