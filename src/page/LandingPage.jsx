import React, { useState } from "react";
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
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import SupportAgentIcon from "@mui/icons-material/SupportAgent"; // 📞 Support Icon
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "280px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
  },
});

const HeroSection = styled(Box)({
  background: "linear-gradient(120deg, #d61355, #f76b1c)",
  color: "#fff",
  textAlign: "center",
  padding: "80px 20px",
  borderRadius: "10px",
  marginBottom: "40px",
});

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openLogoutDialog = () => setLogoutOpen(true);
  const closeLogoutDialog = () => setLogoutOpen(false);

  // 📞 Handle WhatsApp Support Button
  const handleSupportClick = () => {
    const phoneNumber = "6287826563459";
    const message = encodeURIComponent("Halo kak, saya mau melaporkan masalah ketika order ...");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9fa" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "none" }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#d61355",
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            Akademi UMKM
          </Typography>

          {!isMobile ? (
            <>
              <Button
                startIcon={<HomeIcon />}
                onClick={() => handleNavigate("/")}
                sx={{ fontWeight: "bold", color: "#333", mx: 1 }}
              >
                Homepage
              </Button>
              <Button
                startIcon={<SupportAgentIcon />}
                onClick={handleSupportClick}
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  backgroundColor: "#25D366",
                  "&:hover": { backgroundColor: "#1ebe5d" },
                  mx: 1,
                }}
              >
                Layanan Pengaduan
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                onClick={openLogoutDialog}
                sx={{
                  fontWeight: "bold",
                  color: "#d61355",
                  mx: 1,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleNavigate("/")}>
                  <HomeIcon sx={{ mr: 1 }} /> Homepage
                </MenuItem>
                <MenuItem onClick={handleSupportClick}>
                  <SupportAgentIcon sx={{ mr: 1 }} /> Layanan Pengaduan
                </MenuItem>
                <MenuItem onClick={openLogoutDialog}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Selamat Datang di Akademi UMKM
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
          Platform untuk memajukan bisnis UMKM Anda dengan edukasi digital.
        </Typography>
      </HeroSection>

      {/* Feature Cards */}
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard onClick={() => handleNavigate("/videoedukasi")}>
              <SchoolIcon sx={{ fontSize: "3rem", color: "#d61355" }} />
              <CardContent>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Video Edukasi
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Pelajari strategi bisnis yang efektif.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <StyledCard onClick={() => handleNavigate("/course")}>
              <BusinessIcon sx={{ fontSize: "3rem", color: "#d61355" }} />
              <CardContent>
                <Typography variant="h5" sx={{ mt: 2 }}>
                  Course
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Gabung kelas online dan dapatkan sertifikat.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>

      {/* Logout Dialog */}
      <Dialog open={logoutOpen} onClose={closeLogoutDialog}>
        <DialogTitle>Konfirmasi Logout</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin keluar?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="secondary">
            Batal
          </Button>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            sx={{ color: "#d61355" }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;
