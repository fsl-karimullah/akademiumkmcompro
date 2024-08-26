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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CampaignIcon from "@mui/icons-material/Campaign";
import { styled } from "@mui/system";
import axios from "axios";
import { endpoint } from "../endpoint/api";

const StyledCard = styled(Card)({
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s, box-shadow 0.3s",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
});

const CardOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.4)",
  zIndex: 1,
});

const CardContentWrapper = styled(CardContent)({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "#fff",
});

const LandingPage = () => {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      console.log(token);
      const response = await axios.get(endpoint.logoutUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Logout failed");
      } else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userLoggedIn");
        setLogoutOpen(false);
        navigate("/login");
        navigate(0)
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const openLogoutDialog = () => {
    setLogoutOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fdecec",
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "#d61355" }}
          >
            Brand-in Indonesia
          </Typography>
          <Button color="inherit" onClick={openLogoutDialog}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ pt: 8 }}>
        <Box sx={{ textAlign: "center", marginBottom: "40px", color: "#000" }}>
          <Typography component="h1" variant="h4" sx={{ marginBottom: "20px" }}>
            Selamat Datang di Platform Kami
          </Typography>
          <Typography variant="subtitle1">
            Platform ini menyediakan berbagai fitur untuk membantu UMKM dalam
            mengembangkan bisnis mereka.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              onClick={() => handleNavigate("/videoedukasi")}
              sx={{
                backgroundImage: "url(/path/to/your/image.jpg)",
                backgroundSize: "cover",
              }}
            >
              <CardOverlay />
              <CardContentWrapper>
                <Box sx={{ color: "#fff" }}>
                  <SchoolIcon fontSize="large" />
                </Box>
                <Typography variant="h5" sx={{ color: "#fff" }}>
                  Video Edukasi
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Pelajari berbagai strategi dan tips untuk mengembangkan bisnis
                  Anda.
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              onClick={() => handleNavigate("/konsultasi")}
              sx={{
                backgroundImage: "url(/path/to/your/image2.jpg)",
                backgroundSize: "cover",
              }}
            >
              <CardOverlay />
              <CardContentWrapper>
                <Box sx={{ color: "#fff" }}>
                  <BusinessIcon fontSize="large" />
                </Box>
                <Typography variant="h5" sx={{ color: "#fff" }}>
                  Konsultasi Bisnis
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Dapatkan konsultasi bisnis dari para ahli untuk mengembangkan
                  usaha Anda.
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              onClick={() => handleNavigate("/coming-soon")}
              sx={{
                backgroundImage: "url(/path/to/your/image3.jpg)",
                backgroundSize: "cover",
              }}
            >
              <CardOverlay />
              <CardContentWrapper>
                <Box sx={{ color: "#fff" }}>
                  <AttachMoneyIcon fontSize="large" />
                </Box>
                <Typography variant="h5" sx={{ color: "#fff" }}>
                  Pendanaan Skala Up
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Temukan sumber pendanaan untuk mengembangkan skala bisnis
                  Anda.
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              onClick={() => handleNavigate("/coming-soon")}
              sx={{
                backgroundImage: "url(/path/to/your/image4.jpg)",
                backgroundSize: "cover",
              }}
            >
              <CardOverlay />
              <CardContentWrapper>
                <Box sx={{ color: "#fff" }}>
                  <CampaignIcon fontSize="large" />
                </Box>
                <Typography variant="h5" sx={{ color: "#fff" }}>
                  Bantu Marketing
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Membantu UMKM marketing melalui ads.
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <StyledCard
              onClick={() => handleNavigate("/coming-soon")}
              sx={{
                backgroundImage: "url(/path/to/your/image4.jpg)",
                backgroundSize: "cover",
              }}
            >
              <CardOverlay />
              <CardContentWrapper>
                <Box sx={{ color: "#fff" }}>
                  <CampaignIcon fontSize="large" />
                </Box>
                <Typography variant="h5" sx={{ color: "#fff" }}>
                  Bantu Branding
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Membantu UMKM untuk branding
                </Typography>
              </CardContentWrapper>
            </StyledCard>
          </Grid> */}
        </Grid>

        <Dialog open={logoutOpen} onClose={closeLogoutDialog}>
          <DialogTitle>Konfirmasi Logout</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Apakah Anda yakin ingin logout?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLogoutDialog} color="primary">
              Batal
            </Button>
            <Button onClick={handleLogout} color="primary">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default LandingPage;
