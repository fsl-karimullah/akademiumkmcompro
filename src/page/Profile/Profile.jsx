import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  CircularProgress 
} from "@mui/material";
import {
  ArrowBack,
  AccountCircle,
  Lock,
  Dashboard,
  School,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../endpoint/api";
const theme = createTheme({
  palette: {
    primary: {
      main: "#d61355",
    },
  },
});

const Profile = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);


  const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
    courses: [],
  });


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const res = await axios.get(endpoint.getProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, email, avatar, courses } = res.data.data;
        setUser({ name, email, avatar, courses });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleMenuClick = (menu) => {
    if (menu === "changePassword") navigate("/forgot-password");
    else setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Halo, {user.name?.split(" ")[0]} 👋
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Selamat datang di halaman profil Anda.
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
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Button variant="outlined">Ganti Avatar</Button>
            </Box>
            <TextField fullWidth label="Nama Lengkap" value={user.name} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" value={user.email} sx={{ mb: 2 }} />
            <Button variant="contained" sx={{ mt: 2 }}>
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
              onChange={(e, val) => setTabValue(val)}
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 2 }}
            >
              <Tab label="Kursus Aktif" />
              <Tab label="Kursus Selesai" />
            </Tabs>

            {tabValue === 0 ? (
              <Box sx={{ overflowX: "auto", display: "flex", gap: 2, pb: 2 }}>
                {user.courses.length === 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    Belum ada kursus yang diikuti.
                  </Typography>
                ) : (
                  user.courses.map((course) => (
                    <Box
                      key={course.id}
                      sx={{
                        flex: "0 0 auto",
                        width: { xs: 210, sm: 250 },
                        bgcolor: "#fff",
                        borderRadius: 3,
                        boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            fontSize: "0.85rem",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minHeight: "2.5em",
                            lineHeight: "1.2em",
                            color: "#111",
                          }}
                        >
                          {course.title}
                        </Typography>


                        <Typography
                          variant="caption"
                          sx={{ color: "#888", mb: 1 }}
                        >
                          {course.mentor}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.75rem",
                            color: "#666",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            minHeight: 72,
                          }}
                        >
                          {course.description.replace(/<[^>]+>/g, "")}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/course-pay/${course.id}`)}
                        sx={{
                          mt: 2,
                          fontSize: "0.75rem",
                          textTransform: "none",
                          backgroundColor: "#d61355",
                          ":hover": { backgroundColor: "#b01148" },
                        }}
                      >
                        Lihat Detail
                      </Button>
                    </Box>
                  ))
                )}
              </Box>
            ) : (
              <Typography variant="body1">
                Kursus yang telah selesai akan ditampilkan di sini.
              </Typography>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => navigate(-1)}
              sx={{ mr: 2, color: "primary.main" }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Kembali
            </Typography>
          </Toolbar>
        </AppBar>

        {loading ? (
          <Container sx={{ py: 10, textAlign: "center" }}>
            <CircularProgress color="primary" />
            <Typography variant="body1" mt={2}>Memuat data profil...</Typography>
          </Container>
        ) : (

          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 4,
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
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={3}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    Menu
                  </Typography>
                  <Button
                    startIcon={<Dashboard />}
                    fullWidth
                    onClick={() => handleMenuClick("dashboard")}
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                    variant={selectedMenu === "dashboard" ? "contained" : "text"}
                  >
                    Dashboard
                  </Button>
                  <Button
                    startIcon={<AccountCircle />}
                    fullWidth
                    onClick={() => handleMenuClick("profile")}
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                    variant={selectedMenu === "profile" ? "contained" : "text"}
                  >
                    Profil Saya
                  </Button>
                  <Button
                    startIcon={<Lock />}
                    fullWidth
                    onClick={() => handleMenuClick("changePassword")}
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                  >
                    Ganti Password
                  </Button>
                  <Button
                    startIcon={<School />}
                    fullWidth
                    onClick={() => handleMenuClick("courses")}
                    sx={{ justifyContent: "flex-start" }}
                    variant={selectedMenu === "courses" ? "contained" : "text"}
                  >
                    Pembelajaran Saya
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={9}>
                <Paper elevation={3} sx={{ p: 4 }}>
                  {renderContent()}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Profile;
