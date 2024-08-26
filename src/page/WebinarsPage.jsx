import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
          setError('Unexpected response format');
        }
      } catch (error) {
        setError('Failed to fetch webinars');
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box>
      <Navbar currentPath={currentPath} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h1"
                className="font-bold mb-4"
              >
                Tingkatkan Keahlian Anda di Brand-in Education!
              </Typography>
              <Typography variant="body1" className="mb-6">
                Temukan webinar atau event eksklusif dan wawasan dari para ahli untuk
                mengembangkan brand bisnis Anda. Bergabunglah dan mulailah perjalanan
                transformasi Anda hari ini!
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <img src={heroImage} alt="Webinar Hero" className="rounded-lg" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" className="py-12">
        <Typography variant="h4" component="h2" className="font-bold mb-8">
          Upcoming Event & Webinars
        </Typography>
        <Grid container spacing={4}>
          {webinars.map((webinar) => (
            <Grid item xs={12} sm={6} md={4} key={webinar.id}>
              <WebinarCard webinar={webinar} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WebinarsPage;
