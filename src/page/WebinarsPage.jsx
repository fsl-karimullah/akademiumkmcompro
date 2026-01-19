import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
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

  // Moved outside useEffect so it can be reused for retrying
  const fetchWebinars = async () => {
    try {
      const response = await axios.get(endpoint.getWebinars);
      if (response.data && Array.isArray(response.data.data)) {
        setWebinars(response.data.data);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to fetch digital products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          minHeight: "70vh",
          backgroundColor: "#fef3f2",
          padding: "3rem 1rem",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* ✅ Hero Image */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={heroImage}
                  alt="Digital Products Hero"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            </Grid>

            {/* ✅ Hero Text */}
            <Grid
              item
              xs={12}
              md={6}
              order={{ xs: 2, md: 1 }}
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "2.8rem" },
                }}
              >
                🚀 Tingkatkan Skill Anda secara{" "}
                <span style={{ color: "#d32f2f" }}>Mandiri</span>!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  mb: 4,
                  color: "gray",
                }}
              >
                Jelajahi berbagai produk digital seperti template bisnis, e-book
                strategi, dan panduan praktis yang dirancang khusus untuk
                membantu UMKM, mahasiswa, dan profesional menjadi lebih
                kompetitif di era digital.
              </Typography>
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
          Pembelajaran Mandiri
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
              <Grid item xs={6} sm={6} md={4} key={webinar.id}>
                <WebinarCard webinar={webinar} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default WebinarsPage;
