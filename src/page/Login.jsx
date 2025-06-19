import React, { useState } from "react";
import { Mail, Lock } from "@mui/icons-material";
import { connect } from "react-redux";
import { loginSuccess, loginFailure } from "../redux/actions/authActions";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Paper,
  Alert,
  InputAdornment,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Login = ({ loginSuccess, loginFailure }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${endpoint.loginUser}`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data.data;
        loginSuccess(token);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userLoggedIn", "true");
        navigate("/landing");
        navigate(0);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setError("⚠️ Error! Pastikan Anda mengisi semua data dengan benar.");
      loginFailure(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          background: "linear-gradient(to bottom right, #FF6B6B, #D61355)",
          color: "#fff",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            p: 2,
            borderRadius: 2,
            mb: 4,
            display: "inline-block",
          }}
        >
          <Logo />
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Selamat Datang di Akademi UMKM
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 400, textAlign: "center" }}>
          Akses langsung materi pembelajaran GRATIS tanpa login untuk bab pertama. Login hanya diperlukan untuk akses penuh & komunitas alumni.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 4, md: 3 },
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 5 },
            width: "100%",
            maxWidth: { xs: "100%", md: 420 },
            borderRadius: 4,
            backgroundColor: "#fff",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#D11655"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" } }}
            >
              Masuk ke Akun Anda
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            >
              Silakan login untuk akses penuh ke semua materi & komunitas.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1.5, color: "#D11655", fontWeight: 500 }}
            >
              Tidak mau login dulu? <Link href="/landing" underline="none" sx={{ fontWeight: 600 }}>Coba materi gratis di sini</Link>
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2, fontSize: { xs: "0.85rem", md: "1rem" } }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Alamat Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail sx={{ color: "#D11655" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Kata Sandi"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#D11655" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.6,
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.1rem" },
                backgroundColor: "var(--themeRed)",
                "&:hover": {
                  backgroundColor: "#b50d44",
                },
              }}
            >
              Masuk
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/")}
              sx={{
                mb: 2,
                py: 1.6,
                fontWeight: 500,
                fontSize: { xs: "0.95rem", md: "1rem" },
                borderColor: "var(--themeRed)",
                color: "var(--themeRed)",
                "&:hover": {
                  borderColor: "#b50d44",
                  backgroundColor: "#ffe6e6",
                },
              }}
            >
              Kembali
            </Button>

            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={12} sm="auto" sx={{ textAlign: "center" }}>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    color: "var(--themeRed)",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  Lupa Kata Sandi?
                </Link>
              </Grid>
              <Grid item xs={12} sm="auto" sx={{ textAlign: "center" }}>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{
                    color: "var(--themeRed)",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                  }}
                >
                  Belum punya akun? Daftar Disini
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const mapDispatchToProps = {
  loginSuccess,
  loginFailure,
};

export default connect(null, mapDispatchToProps)(Login);
