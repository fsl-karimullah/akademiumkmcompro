import React, { useState } from 'react';
import { Mail, Lock } from '@mui/icons-material';
import { connect } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/actions/authActions';
import axios from 'axios';
import { endpoint } from '../endpoint/api';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginSuccess, loginFailure }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${endpoint.loginUser}`, { email, password });

      if (response.status === 200) {
        const { token } = response.data.data;
        loginSuccess(token);
        localStorage.setItem('userToken', token);
        localStorage.setItem('userLoggedIn', 'true');
        navigate('/landing');
        navigate(0);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError('⚠️ Error! Pastikan Anda mengisi semua data dengan benar.');
      loginFailure(error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: { xs: 'column', md: 'row' } }}>
      <CssBaseline />

      {/* ✅ Left Section (Hidden on Mobile) */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          background: 'linear-gradient(to bottom right, #FF6B6B, #D61355)',
          color: '#fff',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 5,
        }}
      >
        <img
          src={'/assets/logo-transparent.webp'}
          alt="Akademi UMKM"
          style={{ width: 120, marginBottom: 20 }}
        />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Selamat Datang di Akademi UMKM
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 400, textAlign: 'center' }}>
          Bergabunglah dan mulai perjalanan pembelajaran Anda bersama kami untuk mengembangkan UMKM Indonesia.
        </Typography>
      </Box>

      {/* ✅ Right Section - Login Form (Full width on mobile) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f9f9f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            width: '100%',
            maxWidth: 420,
            borderRadius: 4,
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              Masuk ke Akun Anda
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Silakan login menggunakan email dan kata sandi Anda.
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
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
                    <Mail color="primary" />
                  </InputAdornment>
                ),
              }}
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
                    <Lock color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.4,
                fontWeight: 600,
                backgroundColor: 'var(--themeRed)',
                '&:hover': {
                  backgroundColor: '#b50d44',
                },
              }}
            >
              Masuk
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                mb: 2,
                py: 1.4,
                fontWeight: 500,
                borderColor: 'var(--themeRed)',
                color: 'var(--themeRed)',
                '&:hover': {
                  borderColor: '#b50d44',
                  backgroundColor: '#ffe6e6',
                },
              }}
            >
              Kembali
            </Button>

            <Grid container spacing={1}>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2" sx={{ color: 'var(--themeRed)' }}>
                  Lupa Kata Sandi?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" sx={{ color: 'var(--themeRed)' }}>
                  Belum punya akun? Daftar
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
