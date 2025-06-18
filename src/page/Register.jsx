import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Container,
  Avatar,
  CssBaseline,
  Link,
  Card,
  CardContent,
  Box,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { endpoint } from "../endpoint/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== passwordConfirmation) {
      setError("⚠️ Konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      const response = await fetch(endpoint.registerUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          if (data.errors.email) {
            setError("⚠️ Email sudah digunakan sebelumnya.");
          } else if (data.errors.password) {
            setError("⚠️ Konfirmasi kata sandi tidak cocok.");
          } else {
            setError("⚠️ Registrasi gagal.");
          }
        } else {
          throw new Error("⚠️ Registrasi gagal.");
        }
        return;
      }

      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      setError(
        "⚠️ Registrasi gagal. Silakan coba lagi. Pastikan konfirmasi password sama dan menggunakan email yang belum terdaftar."
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #FF6B6B, #D61355)",
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          <CardContent>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: "var(--themeRed)",
                  margin: "auto",
                  mb: 1,
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
                Daftar Akun Baru
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                Buat akun Anda untuk akses penuh ke semua materi & komunitas alumni. Atau
                <Link href="/preview" underline="none" sx={{ color: "#D11655", ml: 0.5, fontWeight: 600 }}>
                  coba materi gratis tanpa daftar
                </Link>
                .
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Nama Lengkap"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "var(--themeRed)" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Alamat Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "var(--themeRed)" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Kata Sandi"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "var(--themeRed)" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirmation"
                    label="Konfirmasi Kata Sandi"
                    type="password"
                    id="passwordConfirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: "var(--themeRed)" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "var(--themeRed)",
                  "&:hover": {
                    backgroundColor: "#b50d44",
                  },
                  py: 1.5,
                }}
                onClick={handleRegister}
              >
                Daftar
              </Button>

              <Button
                fullWidth
                variant="outlined"
                sx={{
                  mb: 2,
                  py: 1.5,
                  borderColor: "var(--themeRed)",
                  color: "var(--themeRed)",
                  "&:hover": {
                    borderColor: "#b50d44",
                    backgroundColor: "#ffe6e6",
                  },
                }}
                onClick={() => navigate("/login")}
                startIcon={<ArrowBackIcon />}
              >
                Kembali
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2" sx={{ color: "var(--themeRed)" }}>
                    Sudah punya akun? Masuk di sini
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
 