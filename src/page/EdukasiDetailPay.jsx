import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Card,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';


const EdukasiDetailPay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getTransaction, setgetTransaction] = useState(null)

  const fetchCourseDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.getCourseDetails(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data.data);
    } catch (err) {
      toast.error("Gagal memuat data kursus. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchTransaction = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.getTransaction, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setgetTransaction(response.data.data);
      console.log(response.data.data);
      
    } catch (err) {
      toast.error("Gagal memuat data kursus. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetail();
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    if (course && course.videos && course.videos.length > 0) {
      const previewVideos = course.videos.slice(0, 3);
      if (!selectedVideo && previewVideos.length > 0) {
        setSelectedVideo(previewVideos[0]);
      }
    }
  }, [course, selectedVideo]);

  const handleBack = () => {
    navigate("/course");
  };

  const handleViewFullCourse = () => {
    navigate(`/course/${course.id}/`);
  };

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.buyCourse(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.href = response.data.data.redirect_url;
    } catch (err) {
      toast.error("Gagal melakukan pembelian. Silakan coba lagi.");
      console.error("Enroll failed: ", err);
    }
  };

  


  if (loading) {
    return ( 
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!course) return null;

  const previewVideos = course.videos.slice(0, 1);

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Sticky Back Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleBack} sx={{ mr: 2, color: "#d61355" }}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" color="#d61355">
          Kembali
        </Typography>
      </Box>


      {/* Course Details & Persuasive Story */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Course Thumbnail */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  course.thumbnail ||
                  "https://via.placeholder.com/600x400.png?text=No+Image"
                }
                alt={course.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>

          {/* Course Info & Story */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Mentor: {course.mentor}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.description}
            </Typography>
            <Typography variant="h6" color="#d61355" gutterBottom>
              {course.price === 0
                ? "Gratis"
                : `Rp ${course.price.toLocaleString("id-ID")}`}
            </Typography>

            {/* Persuasive Story Section */}
            <Box
              sx={{
                mt: 3,
                p: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Kenapa Kursus Ini Penting?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Investasikan waktu dan usaha Anda untuk menguasai keterampilan
                terbaru dan relevan. Kursus ini dirancang untuk membantu Anda
                berkembang dalam karir dan meraih peluang baru. Dapatkan akses
                ke materi eksklusif, belajar langsung dari para ahli, dan
                bergabung dengan komunitas yang suportif. Jangan lewatkan
                kesempatan untuk mengubah masa depan Anda!
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Video Preview Section */}
        <Box sx={{ mt: 6 }}>
          <Card
            sx={{
              p: 4,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🎥 Preview Video
            </Typography>

            <Grid container spacing={3}>
              {/* Video Selection Buttons */}
              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {previewVideos.map((video) => (
                    <Button
                      key={video.id}
                      variant={
                        selectedVideo && selectedVideo.id === video.id
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => setSelectedVideo(video)}
                      sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        backgroundColor: "#d61355",
                        color: "#fff",
                      }}
                    >
                      {video.title}
                    </Button>
                  ))}
                </Box>
              </Grid>

              {/* Selected Video Display */}
              <Grid item xs={12} md={9}>
                {selectedVideo && (
                  <Box
                    sx={{
                      position: "relative",
                      paddingTop: "56.25%",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src={selectedVideo.url}
                      title={selectedVideo.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                        border: "0",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}
              </Grid>
            </Grid>

            {/* Enroll / Full Course Button */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
              {!course.enrolled && course.price !== 0 ? (
                <Button
                  variant="contained"
                  onClick={handleEnroll}
                  sx={{
                    backgroundColor: "#d61355",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                  }}
                >
                  🔥 Beli Sekarang & Mulai Belajar!
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleViewFullCourse}
                  sx={{
                    backgroundColor: "#d61355",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  🎓 Lihat Video Lengkap
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default EdukasiDetailPay;
