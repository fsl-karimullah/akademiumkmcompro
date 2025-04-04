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
  useMediaQuery,
  Drawer,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";

const EdukasiDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        setSelectedVideo(courseData.videos?.[0] || null);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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

  const videoPlayerHeight = isMobile ? "300px" : "480px";

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
        <IconButton
          onClick={() => navigate("/course")}
          sx={{ color: "#d61355" }}
        >
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#d61355"
          sx={{ ml: 2 }}
        >
          Kembali
        </Typography>
        {isMobile && (
          <Button
            startIcon={<MenuIcon />}
            sx={{ marginLeft: "auto", color: "#d61355", fontWeight: "bold" }}
            onClick={() => setDrawerOpen(true)}
          >
            Materi
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {/* Left: Video Materials List */}
        {!isMobile ? (
          <Box
            sx={{
              width: "30%",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              padding: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 2, color: "#d61355" }}
            >
              Materi Kursus
            </Typography>
            {course.videos?.length > 0 ? (
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
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                Tidak ada materi tersedia.
              </Typography>
            )}
          </Box>
        ) : (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              sx={{
                width: "250px",
                padding: 3,
                backgroundColor: "#fff",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, color: "#d61355" }}
              >
                Materi Kursus
              </Typography>
              {course.videos?.length > 0 ? (
                <List>
                  {course.videos.map((video) => (
                    <ListItem key={video.id} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setSelectedVideo(video);
                          setDrawerOpen(false);
                        }}
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
              ) : (
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Tidak ada materi tersedia.
                </Typography>
              )}
            </Box>
          </Drawer>
        )}

        {/* Right: Video Player */}
        <Box
          sx={{
            flex: 1,
            padding: isMobile ? 2 : 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="bold"
            sx={{ mb: 2, textAlign: "center" }}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              textAlign: "center",
              maxWidth: "80%",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Mentor: {course.mentor}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              textAlign: "center",
              color: course.price === 0 ? "#d61355" : "#000",
              fontWeight: "bold",
            }}
          >
            {course.price === 0
              ? "Gratis"
              : `Rp ${course.price.toLocaleString("id-ID")}`}
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "800px",
              height: videoPlayerHeight,
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
                Tidak ada video untuk ditampilkan.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EdukasiDetail;
