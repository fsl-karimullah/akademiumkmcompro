import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import heroImage from "../../public/webinars-img.png";
import WebinarCard from "../components/WebinarCard";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";

const ITEMS_PER_PAGE = 6;

const WebinarsPage = ({ currentPath }) => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchWebinars = async () => {
    try {
      const response = await axios.get(endpoint.getWebinars);
      if (response.data && Array.isArray(response.data.data)) {
        setWebinars(response.data.data);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Gagal memuat webinar. Silakan coba lagi.");
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

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Pagination logic
  const totalPages = Math.ceil(webinars.length / ITEMS_PER_PAGE);
  const paginatedWebinars = webinars.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box>
      <Navbar currentPath={currentPath} />

      {/* Hero Section */}
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
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={heroImage}
                  alt="Webinar Hero"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Box>
            </Grid>

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
                Ikuti webinar eksklusif dari para ahli dan praktisi bisnis
                untuk mengembangkan kemampuan Anda di era digital.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          Webinar Terbaru
        </Typography>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress sx={{ color: "#d61355" }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ textAlign: "center", color: "red", my: 4 }}>
            <Typography variant="h6">{error}</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleRetry}
              sx={{ mt: 2 }}
            >
              Coba Lagi
            </Button>
          </Box>
        )}

        {/* Webinar Cards */}
        {!loading && !error && (
          <>
            {webinars.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" color="text.secondary">
                  Belum ada webinar tersedia.
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedWebinars.map((webinar) => (
                    <Grid item xs={12} sm={6} md={4} key={webinar.id}>
                      <WebinarCard webinar={webinar} />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 5,
                    }}
                  >
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          fontWeight: 600,
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#d61355 !important",
                          color: "#fff",
                        },
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default WebinarsPage;
