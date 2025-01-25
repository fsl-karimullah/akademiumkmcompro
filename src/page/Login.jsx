import React, { useState } from 'react';
import { Mail, Lock } from '@mui/icons-material';
import { connect } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/actions/authActions';
import axios from 'axios';
import { endpoint } from '../endpoint/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Grid,
  Link,
  Box,
  Paper,
  Alert,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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

        console.log('Token received:', token);

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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #FF6B6B, #D61355)',
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            background: '#fff',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'var(--themeRed)',
                margin: 'auto',
                mb: 1,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Masuk ke Akun Anda
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleLogin} noValidate>
            {/* ✅ Email Field */}
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
                    <Mail sx={{ color: 'var(--themeRed)' }} />
                  </InputAdornment>
                ),
              }}
            />
            {/* ✅ Password Field */}
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
                    <Lock sx={{ color: 'var(--themeRed)' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* ✅ Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: 'var(--themeRed)',
                '&:hover': {
                  backgroundColor: '#b50d44',
                },
                py: 1.5,
              }}
            >
              Masuk
            </Button>

            {/* ✅ Back Button */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                mb: 2,
                py: 1.5,
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

            {/* ✅ Links */}
            <Grid container spacing={1}>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2" sx={{ color: 'var(--themeRed)' }}>
                  Lupa Kata Sandi?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" sx={{ color: 'var(--themeRed)' }}>
                  Belum punya akun? Daftar di sini
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        {/* ✅ Footer */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} Akademi UMKM. Semua Hak Dilindungi.
        </Typography>
      </Container>
    </Box>
  );
};

const mapDispatchToProps = {
  loginSuccess,
  loginFailure,
};

export default connect(null, mapDispatchToProps)(Login);
