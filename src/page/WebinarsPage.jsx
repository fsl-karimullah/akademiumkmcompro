import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroImage from "../../public/webinars-img.png";
import WebinarCard from "../components/WebinarCard";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";

const WebinarsPage = ({ currentPath }) => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get(endpoint.getWebinars);
        if (response.data && Array.isArray(response.data.data)) {
          setWebinars(response.data.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch digital products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchWebinars();
  };

  return (
    <Box>
      {/* ✅ Navbar */}
      <Navbar currentPath={currentPath} />

      {/* ✅ Hero Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          backgroundColor: "#fef3f2",
          textAlign: "center",
          padding: "2rem 1rem",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* ✅ Left Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                🚀 Tingkatkan Bisnis Anda dengan <span className="text-red-500">Produk Digital</span>!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  mb: 4,
                  color: "gray",
                }}
              >
                Jelajahi berbagai produk digital seperti template bisnis, e-book strategi, 
                dan panduan praktis yang dirancang khusus untuk membantu UMKM, mahasiswa, 
                dan profesional menjadi lebih kompetitif di era digital.
              </Typography>
              {/* <Button
                variant="contained"
                sx={{
                  backgroundColor: "var(--themeRed)",
                  padding: "10px 20px",
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
                onClick={() => navigate("/signup")}
              >
                Temukan Produk Digital
              </Button> */}
            </Grid>

            {/* ✅ Right Image */}
            <Grid item xs={12} md={6}>
              <img
                src={heroImage}
                alt="Digital Products Hero"
                className="rounded-lg"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ✅ Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          🛒 Produk Digital Kami
        </Typography>

        {/* ✅ Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* ✅ Error State */}
        {error && (
          <Box
            sx={{
              textAlign: "center",
              color: "red",
              my: 4,
            }}
          >
            <Typography variant="h6">{error}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleRetry}
              sx={{ mt: 2 }}
            >
              Retry
            </Button>
          </Box>
        )}

        {/* ✅ Webinar Cards */}
        {!loading && !error && (
          <Grid container spacing={4}>
            {webinars.map((webinar) => (
              <Grid item xs={12} sm={6} md={4} key={webinar.id}>
                <WebinarCard webinar={webinar} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* ✅ CTA for More Products */}
        {/* <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            sx={{
              padding: "10px 30px",
              fontSize: "1rem",
              color: "var(--themeRed)",
              borderColor: "var(--themeRed)",
              "&:hover": {
                backgroundColor: "var(--themeRed)",
                color: "white",
              },
            }}
            onClick={() => navigate("/allproducts")}
          >
            Lihat Semua Produk Digital
          </Button>
        </Box> */}
      </Container>
    </Box>
  );
};

export default WebinarsPage;
