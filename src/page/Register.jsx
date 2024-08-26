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
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      const response = await fetch(endpoint.registerUser, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          if (data.errors.email) {
            setError("Surel sudah ada sebelumnya.");
          } else if (data.errors.password) {
            setError("Konfirmasi kata sandi tidak cocok.");
          } else {
            setError("Registrasi gagal.");
          }
        } else {
          throw new Error("Registrasi gagal");
        }
        return;
      }

      const data = await response.json();
      console.log(data);

      navigate('/login');
    } catch (error) {
      setError("Registrasi gagal. Silakan coba lagi. Pastikan konfirmasi password sama, dan menggunakan email yang berbeda");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ marginBottom: "8px", backgroundColor: "#f50057" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Daftar
              </Typography>
              <form style={{ width: "100%", marginTop: "8px" }} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Nama"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <PersonIcon style={{ color: "#757575" }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <EmailIcon style={{ color: "#757575" }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Kata Sandi"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <LockOutlinedIcon style={{ color: "#757575" }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordConfirmation"
                      label="Konfirmasi Kata Sandi"
                      type="password"
                      id="passwordConfirmation"
                      autoComplete="new-password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <LockOutlinedIcon style={{ color: "#757575" }} />
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "16px" }}
                  onClick={handleRegister}
                >
                  Daftar
                </Button>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: "8px" }}
                  onClick={() => navigate('/login')}
                  startIcon={<ArrowBackIcon />}
                >
                  Kembali
                </Button>
                {error && (
                  <Typography color="error" style={{ marginTop: "8px", textAlign:'center' }}>
                    {error}
                  </Typography>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Sudah punya akun? Masuk disini
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
