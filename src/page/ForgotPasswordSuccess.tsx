import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordSuccess = () => {
  const navigate = useNavigate();

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
            textAlign: 'center',
          }}
        >
          <EmailIcon sx={{ fontSize: 50, color: '#1976d2', mb: 2 }} />
          <Typography component="h1" variant="h5" gutterBottom>
            Email Terkirim
          </Typography>
          <Typography variant="body1" gutterBottom>
            Silakan periksa email Anda untuk instruksi selanjutnya.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: '#1976d2', color: '#fff' }}
            onClick={() => navigate('/login')}
          >
            Kembali ke Halaman Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordSuccess;
