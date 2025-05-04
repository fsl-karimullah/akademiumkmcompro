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
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
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
  backgroundColor: "#fafafa", // softer than pure white
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  transition: "transform 0.25s ease-in-out, box-shadow 0.25s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff8f9", // subtle hover color
  },
  "& .MuiTypography-h5": {
    color: "#222", // dark title text
    fontWeight: "600",
  },
  "& .MuiTypography-body2": {
    color: "#555", // slightly lighter than title
  },
});


const HeroSection = styled(Box)({
  background: "linear-gradient(135deg, #d61355 0%, #f76b1c 100%)",
  color: "#fff",
  textAlign: "center",
  padding: "80px 20px",
  borderRadius: "12px",
  marginBottom: "40px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  "& h3": {
    fontWeight: 700,
    fontSize: "2.5rem",
  },
  "& p": {
    fontSize: "1.2rem",
    marginTop: "12px",
    lineHeight: 1.6,
  },
});

const IconCircle = styled(Box)({
  backgroundColor: "#f9dcdc",
  borderRadius: "50%",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNavigate = (path) => navigate(path);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const openLogoutDialog = () => setLogoutOpen(true);
  const closeLogoutDialog = () => setLogoutOpen(false);

  const handleSupportClick = () => {
    const phoneNumber = "6287826563459";
    const message = encodeURIComponent("Halo kak, saya mau melaporkan masalah ketika order ...");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#d61355", flexGrow: 1, cursor: "pointer" }}
            onClick={() => handleNavigate("/")}
          >
            Akademi UMKM
          </Typography>

          {!isMobile ? (
            <>
              <Button startIcon={<HomeIcon />} onClick={() => handleNavigate("/")} sx={{ color: "#333", mx: 1 }}>
                Homepage
              </Button>
              <Button
                startIcon={<SupportAgentIcon />}
                onClick={handleSupportClick}
                sx={{
                  mx: 1,
                  backgroundColor: "#25D366",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1ebe5d" },
                }}
              >
                Layanan Pengaduan
              </Button>
              <Button startIcon={<LogoutIcon />} onClick={openLogoutDialog} sx={{ color: "#d61355", mx: 1 }}>
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
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Majukan bisnis Anda melalui edukasi dan pelatihan digital.
        </Typography>
      </HeroSection>

      {/* Feature Cards */}
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard onClick={() => handleNavigate("/videoedukasi")}>
              <IconCircle>
                <SchoolIcon sx={{ fontSize: 40, color: "#d61355" }} />
              </IconCircle>
              <CardContent>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  List Arsip Webinar
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Gak sempet nonton webinar ? Tenang, semua webinar sudah kami arsipkan.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StyledCard onClick={() => handleNavigate("/course")}>
              <IconCircle>
                <BusinessIcon sx={{ fontSize: 40, color: "#d61355" }} />
              </IconCircle>
              <CardContent>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Belajar Online
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Belajar kapan saja dan di mana saja dengan kursus online kami.
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>

      {/* Logout Dialog */}
      <Dialog open={logoutOpen} onClose={closeLogoutDialog}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Konfirmasi Logout</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin keluar dari akun Anda?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutDialog} color="inherit">
            Batal
          </Button>
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            sx={{ color: "#d61355", fontWeight: "bold" }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage;
