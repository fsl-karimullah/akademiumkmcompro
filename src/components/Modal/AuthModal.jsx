import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  Box,
  Alert,
  InputAdornment,
  Modal,
  IconButton,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { endpoint } from "../../endpoint/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 480,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export const AuthModal = ({ open, onClose, loginLink }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password || !passwordConfirmation) {
      setError("⚠️ Semua field harus diisi.");
      console.error("Validation Error: Missing required fields");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("⚠️ Konfirmasi kata sandi tidak cocok.");
      console.error("Validation Error: Password and confirmation do not match");
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

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", data);

        if (data.errors) {
          if (data.errors.email) {
            setError("⚠️ Email sudah digunakan sebelumnya.");
          } else if (data.errors.password) {
            setError("⚠️ Konfirmasi kata sandi tidak cocok.");
          } else {
            setError("⚠️ Registrasi gagal. Periksa kembali data Anda.");
          }
        } else {
          setError("⚠️ Registrasi gagal. Terjadi kesalahan di server.");
        }
        return;
      }

      // ✅ Save token to localStorage
      const token = data.data.token;
      // console.log("API Response Token:", token);
      
      if (token) {
        localStorage.setItem("userToken", token);
        localStorage.setItem("userLoggedIn", "true");
        console.log("✅ Token saved to localStorage");
      } else {
        console.warn("⚠️ Token not found in API response");
      }

      // console.log("✅ Registration successful:", data);
      window.location.reload(); 
    } catch (error) {
      console.error("Network or Unexpected Error:", error);
      setError(
        "⚠️ Registrasi gagal. Silakan coba lagi. Pastikan konfirmasi password sama dan menggunakan email yang belum terdaftar."
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose} disableEnforceFocus>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar sx={{ bgcolor: "#D61355", margin: "auto", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Daftar Akun Baru atau Login
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            Dapatkan akses penuh ke materi & komunitas alumni.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#D61355" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#D61355" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Kata Sandi"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#D61355" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Konfirmasi Kata Sandi"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#D61355" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#D61355",
            py: 1.5,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#b50d44",
            },
          }}
          onClick={handleRegister}
        >
          Daftar & Masuk
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Sudah punya akun?{" "}
          <Button
            onClick={loginLink}
            sx={{
              textTransform: "none",
              padding: 0,
              minWidth: "unset",
              color: "#D61355",
              fontWeight: "bold",
            }}
          >
            Login di sini
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};
