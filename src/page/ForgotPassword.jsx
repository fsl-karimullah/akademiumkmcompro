import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { endpoint } from '../endpoint/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(endpoint.forgotPassword, {
        email,
      });

      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error('Gagal mengirim email. Silakan coba lagi.');
      }

      navigate('/forgot-password-success');
    } catch (error) {
      setError('Gagal mengirim email. Silakan coba lagi.');
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdecec',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            padding: 4,
            borderRadius: 10,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Lupa Kata Sandi
          </Typography>
          <form onSubmit={handleForgotPassword}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="Alamat Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                  error={!!error}
                  helperText={error}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#1976d2', color: '#fff' }}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Kirim Email'}
            </Button>
          </form>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ mt: 1, mb: 2 }}
          >
            Kembali
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
