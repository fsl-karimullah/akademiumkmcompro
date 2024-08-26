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
        navigate(0)
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setError('Error!, Pastikan anda mengisi semua data dengan benar');
      loginFailure(error.message);
    }
  };

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', margin: 'auto', marginBottom: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'primary.main' }}>
            Masuk
          </Typography>
          <Paper sx={{ padding: 4, borderRadius: 10, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleLogin}>
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
                  startAdornment: <Mail />,
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
                  startAdornment: <Lock />,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#1976d2', color: '#fff' }}
              >
                Masuk
              </Button>
              <Button
                fullWidth
                variant="outlined"
                href='/'
              >
                Kembali
              </Button>
              {error && (
                <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Lupa kata sandi?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Belum punya akun? Daftar disini
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

const mapDispatchToProps = {
  loginSuccess,
  loginFailure,
};

export default connect(null, mapDispatchToProps)(Login);
