import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "../endpoint/api";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const VideoEdukasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(`${endpoint.getEducationById(id)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
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
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: "#d61355", fontWeight: "bold" }}
        >
          Kembali
        </Button>
      </Box>

      <Container maxWidth="md">
        <Card
          sx={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            marginTop: 4,
            overflow: "hidden",
          }}
        >
          <CardContent>
            {/* Video Title */}
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#d61355"
              gutterBottom
              textAlign="center"
            >
              {video.title}
            </Typography>

            {/* Video Description */}
            <Typography
              variant="subtitle1"
              color="textSecondary"
              textAlign="center"
              sx={{ marginBottom: 4 }}
            >
              {video.description}
            </Typography>

            {/* Video Player */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="480"
                  allow="autoplay"
                  title={video.title}
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #ddd",
                  }}
                ></iframe>
              ) : (
                <Alert severity="error" className="text-center">
                  Terjadi kesalahan silahkan hubungi admin
                </Alert>
              )}
            </Box>

            {/* Content */}
            <Typography variant="body1" sx={{ lineHeight: 1.8, marginBottom: 4 }}>
              <div dangerouslySetInnerHTML={{ __html: video.content }} />
            </Typography>

            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #ddd",
                paddingTop: 2,
                marginTop: 4,
              }}
            >
              <Typography variant="caption" color="textSecondary">
                Dibuat pada: {new Date(video.created_at).toLocaleDateString("id-ID")}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#d61355",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#bf1048",
                  },
                }}
                onClick={() => navigate(-1)}
              >
                Kembali ke Daftar Video
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VideoEdukasiDetail;
