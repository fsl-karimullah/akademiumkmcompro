import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import {
  ArrowBack,
  AccountCircle,
  Lock,
  Dashboard,
  School,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../endpoint/api";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [tabValue, setTabValue] = useState(0);
    const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
  });

useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        console.error("Token not found");
        return;
      }

      try {
        const response = await axios.get(endpoint.getProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email, avatar } = response.data.data;
        setUser({ name, email, avatar });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleMenuClick = (menu) => {
    if (menu === "changePassword") {
      navigate("/forgot-password");
    } else {
      setSelectedMenu(menu);
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Halo, {user.name.split(" ")[0]} 👋
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Selamat datang di halaman profil Anda. Gunakan menu di samping
              untuk mengelola akun dan pembelajaran Anda.
            </Typography>
          </Box>
        );
      case "profile":
        return (
          <Box component="form" noValidate autoComplete="off">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Profil Saya
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                src={user.avatar}
                sx={{ width: 80, height: 80, mr: 2, border: "2px solid #d61355" }}
              />
              <Button variant="outlined">Ganti Avatar</Button>
            </Box>
            <TextField
              fullWidth
              label="Nama Lengkap"
              value={user.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#d61355", color: "#fff" }}
            >
              Simpan Perubahan
            </Button>
          </Box>
        );
      case "courses":
        return (
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Pembelajaran Saya
            </Typography>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              indicatorColor="primary"
              textColor="primary"
              sx={{ mb: 2 }}
            >
              <Tab label="Kursus Aktif" />
              <Tab label="Kursus Selesai" />
            </Tabs>
            {tabValue === 0 ? (
              <Typography variant="body1">
                Tampilkan kursus yang sedang berlangsung...
              </Typography>
            ) : (
              <Typography variant="body1">
                Tampilkan kursus yang sudah selesai...
              </Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fce4ec, #f8bbd0)",
        pb: 8,
      }}
    >
      {/* Navbar */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => navigate(-1)}
            sx={{ mr: 2, color: "#d61355" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mr: 2, color: "#d61355" }}
          >
            Kembali
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Summary */}
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              width: 96,
              height: 96,
              mr: { sm: 3 },
              mb: { xs: 2, sm: 0 },
              border: "2px solid #d61355",
            }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Paper>

        <Grid container spacing={4}>
          {/* Menu Panel */}
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Menu
              </Typography>
              <Button
                startIcon={<Dashboard />}
                fullWidth
                onClick={() => handleMenuClick("dashboard")}
                sx={{
                  mb: 1,
                  justifyContent: "flex-start",
                  transition: "all 0.3s",
                  "&:hover": { backgroundColor: "#d6135530" },
                }}
                variant={selectedMenu === "dashboard" ? "contained" : "text"}
              >
                Dashboard
              </Button>
              <Button
                startIcon={<AccountCircle />}
                fullWidth
                onClick={() => handleMenuClick("profile")}
                sx={{
                  mb: 1,
                  justifyContent: "flex-start",
                  transition: "all 0.3s",
                  "&:hover": { backgroundColor: "#d6135530" },
                }}
                variant={selectedMenu === "profile" ? "contained" : "text"}
              >
                Profil Saya
              </Button>
              <Button
                startIcon={<Lock />}
                fullWidth
                onClick={() => handleMenuClick("changePassword")}
                sx={{
                  mb: 1,
                  justifyContent: "flex-start",
                  transition: "all 0.3s",
                  "&:hover": { backgroundColor: "#d6135530" },
                }}
              >
                Ganti Password
              </Button>
              <Button
                startIcon={<School />}
                fullWidth
                onClick={() => handleMenuClick("courses")}
                sx={{
                  justifyContent: "flex-start",
                  transition: "all 0.3s",
                  "&:hover": { backgroundColor: "#d6135530" },
                }}
                variant={selectedMenu === "courses" ? "contained" : "text"}
              >
                Pembelajaran Saya
              </Button>
            </Paper>
          </Grid>

          {/* Content Area */}
          <Grid item xs={12} md={9}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                backgroundColor: "#ffffff",
                borderRadius: 3,
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              }}
            >
              {renderContent()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
