import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";
import parse from "html-react-parser";


const WebinarDetail = ({ currentPath }) => {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebinarDetail = async () => {
      try {
        const response = await axios.get(endpoint.getWebinarsById(id));
        setWebinar(response.data.data);
      } catch (error) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinarDetail();
  }, [id]);

  if (loading)
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
    );

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar currentPath={currentPath} />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {webinar ? (
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: 400 },
                objectFit: "contain",
              }}
              image={webinar.thumbnail}
              alt={webinar.title}
            />
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h4" component="div" gutterBottom>
                  {webinar.title}
                </Typography>
                <Box
                  sx={{
                    typography: "body1",
                    "& ul": { pl: 3, listStyle: "disc" },
                    "& ol": { pl: 3, listStyle: "decimal" },
                    "& li": { mb: 1 },
                  }}
                >
                  {webinar.description
                    ? parse(webinar.description)
                    : "Deskripsi tidak tersedia."}
                </Box>
                <Typography variant="h6" sx={{ mt: 2, color: "gray" }}>
                  💻 Format: Digital Product
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: "gray" }}>
                  📦 Category: {webinar.category || "General"}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/webinars")}
                >
                  Kembali
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  target="_blank"
                  onClick={() =>
                    (window.location.href = webinar.registration_url)
                  }
                >
                  Dapatkan Sekarang
                </Button>
              </Box>
            </Box>
          </Card>
        ) : (
          <Typography variant="h6" align="center">
            No details available
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default WebinarDetail;
