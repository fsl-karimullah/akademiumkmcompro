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

export const AuthModal = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

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
        if (data.errors?.email) {
          setError("⚠️ Email sudah digunakan sebelumnya.");
        } else {
          setError("⚠️ Registrasi gagal.");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("userToken", data.data.token); // auto-login
      onClose(); // close modal
      window.location.reload(); // refresh to reflect login state
    } catch {
      setError("⚠️ Registrasi gagal. Silakan coba lagi.");
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
            Daftar Akun Baru
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
              fullWidth required label="Nama Lengkap"
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
              fullWidth required label="Alamat Email"
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
              fullWidth required label="Kata Sandi" type="password"
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
              fullWidth required label="Konfirmasi Kata Sandi" type="password"
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
      </Box>
    </Modal>
  );
};
