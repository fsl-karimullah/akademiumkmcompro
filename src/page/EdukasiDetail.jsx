import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";

const EdukasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(endpoint.getCourseDetails(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const courseData = response.data.data;
        setCourse(courseData);
        setSelectedVideo(courseData.videos[0]);
      } catch (err) {
        setError("Gagal memuat detail kursus. Silakan coba lagi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
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
        <IconButton onClick={() => navigate(-1)} sx={{ color: "#d61355" }}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" color="#d61355" sx={{ ml: 2 }}>
          Kembali
        </Typography>
      </Box>

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* Left: Video Materials List */}
        <Box
          sx={{
            width: "30%",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            padding: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#d61355" }}>
            Materi Kursus
          </Typography>
          <List>
            {course.videos.map((video) => (
              <ListItem key={video.id} disablePadding>
                <ListItemButton
                  onClick={() => setSelectedVideo(video)}
                  selected={selectedVideo?.id === video.id}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#d61355",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#bf1048",
                      },
                    },
                  }}
                >
                  <ListItemText primary={video.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right: Video Player */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            {course.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, textAlign: "center", maxWidth: "80%" }}>
            Mentor: {course.mentor}
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              aspectRatio: "16/9",
              backgroundColor: "#000",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {selectedVideo ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.url.replace("watch?v=", "embed/")}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#fff",
                }}
              >
                Pilih materi untuk memulai
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EdukasiDetail;
