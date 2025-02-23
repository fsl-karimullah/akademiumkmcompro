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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edukasi = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken"); // Assuming the token is stored in localStorage
      const response = await axios.get("https://api.akademiumkm.id/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data); 
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
    navigate('/landing');
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
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
          py: 4,
          px: 2,
          backgroundColor: "#d61355",
          color: "#fff",
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Jelajahi Kursus Kami
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Tingkatkan kemampuan Anda dengan kursus yang dirancang untuk semua level.
        </Typography>
      </Box>

      {/* Courses Grid */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {courses.map((course) => (
              <Grid
                item
                key={course.id}
                xs={12}
                sm={6}
                md={4}
                onClick={() => navigate(`/course/${course.id}`)} 
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
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.thumbnail || "https://via.placeholder.com/300x180.png?text=No+Image"}
                    alt={course.title}
                  />
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Mentor: {course.mentor}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="#d61355"
                      sx={{ mt: 1 }}
                    >
                      {course.price === 0 ? "Gratis" : `Rp ${course.price.toLocaleString("id-ID")}`}

                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Edukasi;
