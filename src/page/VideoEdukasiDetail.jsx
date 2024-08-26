import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { endpoint } from '../endpoint/api';
import { Container, Box, Typography, CircularProgress, Alert, Card, CardContent } from '@mui/material';

const VideoEdukasiDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`${endpoint.getEducationById(id)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setVideo(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVideoDetail();
  }, [id]);

  const getGoogleDriveEmbedUrl = (url) => {
    const fileIdMatch = url.match(/\/d\/(.+?)\//);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    return null;
  };

  if (error) {
    return (
      <Container>
        <Alert severity="error" className="text-center">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  if (!video) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const embedUrl = getGoogleDriveEmbedUrl(video.gdrive_link);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5', 
        paddingTop: '40px',
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {video.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
              {video.description}
            </Typography>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="480"
                  allow="autoplay"
                  title={video.title}
                  style={{ borderRadius: '8px' }}
                ></iframe>
              ) : (
                <Alert severity="error" className="text-center">
                  Terjadi kesalahan silahkan hubungi admin
                </Alert>
              )}
            </Box>
            <Typography variant="body1" color="textPrimary" paragraph>
              <div dangerouslySetInnerHTML={{ __html: video.content }} />
            </Typography>
            <Box mt={2} textAlign="right">
              <Typography variant="caption" color="textSecondary">
                Dibuat pada: {new Date(video.created_at).toLocaleDateString('id-ID')}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VideoEdukasiDetail;
