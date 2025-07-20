import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  TextField,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";

const Edukasi = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleBack = () => {
    navigate("/landing");
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.mentor.toLowerCase().includes(query)
    );

    setFilteredCourses(filtered);
  };

  const handleReportIssue = () => {
    const phoneNumber = "6287826563459";
    const message = encodeURIComponent(
      "Halo kak, saya mau melaporkan masalah ketika order ..."
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

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
        position: "relative", // needed for badge
        border: course.is_flashsale === 1 ? "2px solid #f50057" : "none",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* 🔥 Flash Sale Badge */}
      {course.is_flashsale === 1 && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "#f50057",
            color: "white",
            px: 1,
            py: 0.5,
            fontSize: "0.7rem",
            fontWeight: "bold",
            borderRadius: "5px",
            zIndex: 2,
          }}
        >
          FLASH SALE 🔥
        </Box>
      )}

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
                  className={course.is_flashsale === 1 ? "animate-pulse" : ""}
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


  const freeCourses = filteredCourses.filter((course) => course.price === 0);
  const paidCourses = filteredCourses.filter((course) => course.price > 0);

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        position: "relative", 
      }}
    >
      {/* Back Button */}
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
          textAlign: "center",
          py: isMobile ? 3 : 4,
          px: 2,
          backgroundColor: "#d61355",
          color: "#fff",
          mb: 3,
        }}
      >
        <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold">
          Jelajahi Kursus Kami
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Tingkatkan kemampuan Anda dengan kursus yang dirancang untuk semua
          level.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Container maxWidth="lg" sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Cari kursus berdasarkan judul"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            "& .MuiInputBase-input": { fontSize: isMobile ? "0.9rem" : "1rem" },
          }}
        />
      </Container>

      {/* Courses Section */}
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
                <Grid container spacing={2}>
                  {freeCourses.map(renderCourseCard)}
                </Grid>
              </>
            )}

            {/* Paid Courses */}
            {paidCourses.length > 0 && (
              <>
                <Box sx={{ textAlign: "center", mb: 3, mt: 3 }}>
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
                    Temukan kursus terbaik yang akan membantu kamu untuk naik ke
                    level berikutnya dalam pengembangan diri.
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  {paidCourses.map(renderCourseCard)}
                </Grid>
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
          </>
        )}
      </Container>

      <Fab
        aria-label="whatsapp"
        onClick={handleReportIssue}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#25D366",
          color: "#fff",
          "&:hover": { backgroundColor: "#1ebe5d" },
        }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
};

export default Edukasi;
