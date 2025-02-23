import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../endpoint/api";

const VideoEdukasi = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
          throw new Error("Gagal mengambil data video. Silakan coba lagi nanti.");
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

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f9f9f9" }}>
      {/* Back Button */}
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          padding: 2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <IconButton onClick={() => navigate('/landing')} sx={{ color: "#d61355" }}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h6" fontWeight="bold" color="#d61355" sx={{ ml: 2 }}>
          Kembali
        </Typography>
      </Box>

      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #d61355, #a00e3d)",
          color: "#fff",
          py: 6,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Pelajari Gratis
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Transformasikan perjalanan UMKM Anda dengan kursus gratis ini! Pelajari strategi praktis dan wawasan untuk
          mengembangkan bisnis Anda hari ini.
        </Typography>
      </Box>

      {/* Video Section */}
      <Container sx={{ py: 6, flexGrow: 1 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ textAlign: "center" }}>
            {error}
          </Alert>
        ) : videos.length > 0 ? (
          videos.map((video) => (
            <Card
              key={video.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                mb: 4,
              }}
            >
              <CardMedia
                component="img"
                image={video.thumbnail || "https://via.placeholder.com/600x400.png?text=Kursus+Gratis"}
                alt={video.title}
                sx={{
                  height: { xs: 200, md: "100%" },
                  width: { md: "50%" },
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "#d61355" }}>
                  {video.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "#666", lineHeight: 1.8 }}>
                  {video.description || "Temukan strategi praktis dan wawasan berharga melalui kursus gratis ini."}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleWatchNow(video.id)}
                  sx={{
                    backgroundColor: "#d61355",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    "&:hover": { backgroundColor: "#b50d44" },
                  }}
                >
                  Tonton Sekarang
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
            Belum ada video edukasi yang tersedia saat ini.
          </Typography>
        )}
      </Container>

      {/* Footer Section */}
      <Box sx={{ py: 3, textAlign: "center", backgroundColor: "#333", color: "#fff" }}>
        <Typography variant="body2">&copy; 2024 Akademi UMKM. Semua hak dilindungi.</Typography>
      </Box>
    </Box>
  );
};

export default VideoEdukasi;
