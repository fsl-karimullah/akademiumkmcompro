import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, Button, Alert, Chip } from '@mui/material';
import Navbar from '../components/Navbar';
import { endpoint } from '../endpoint/api';

const VideoEdukasi = ({ currentPath }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(endpoint.getEducation, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch video data. Please try again later.');
        }

        const data = await response.json();
        setVideos(data.data || []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVideos();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/videoedukasidetail/${id}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <Navbar currentPath={currentPath} />

      {/* Motivational Banner */}
      <Box
        sx={{
          textAlign: 'center',
          py: 5,
          px: 3,
          backgroundColor: '#f5f5f5',
          color: '#333',
          boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Transform Your UMKM Journey
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>
          Discover practical strategies and inspiring ideas to grow your business. Start learning today with our curated videos.
        </Typography>
      </Box>

      {/* Video List */}
      <Container sx={{ py: 4, flexGrow: 1 }}>
        {error ? (
          <Alert severity="error" sx={{ textAlign: 'center' }}>
            {error}
          </Alert>
        ) : (
          <>
            <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
              Educational Videos
            </Typography>
            <Grid container spacing={3}>
              {videos.length > 0 ? (
                videos.map((video) => (
                  <Grid item xs={12} sm={6} md={4} key={video.id}>
                    <Card
                      sx={{
                        borderRadius: '16px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                        },
                      }}
                      onClick={() => handleCardClick(video.id)}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={video.thumbnail}
                        alt={video.title}
                        sx={{
                          objectFit: 'cover',
                          borderBottom: '2px solid #d61355',
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            mb: 1,
                          }}
                        >
                          {video.title}
                        </Typography>
                        <Chip
                          label="New"
                          sx={{
                            backgroundColor: '#d61355',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                          }}
                        />
                      </CardContent>
                      <Box sx={{ textAlign: 'center', pb: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            px: 3,
                            py: 1,
                            backgroundColor: '#d61355',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#b50d44' },
                          }}
                        >
                          Watch Now
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" textAlign="center" sx={{ mt: 4 }}>
                  No educational videos are available at the moment.
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 2, backgroundColor: '#333', color: '#fff' }}>
        <Typography variant="body2">&copy; 2024 Akademi UMKM. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default VideoEdukasi;
