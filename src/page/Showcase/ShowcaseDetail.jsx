import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LocationOn,
  Language,
  WhatsApp,
  Facebook,
  Instagram,
  CalendarMonth,
} from "@mui/icons-material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShowcaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    axios.get(`https://api.akademiumkm.id/api/shops/${id}`).then((res) => {
      setShop(res.data.data);
      const localLikes = localStorage.getItem(`likes_${res.data.data.id}`);
      setLikeCount(
        localLikes ? parseInt(localLikes) : res.data.data.like_count || 0
      );
    });
  }, [id]);

  const handleLike = () => {
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    localStorage.setItem(`likes_${shop.id}`, newCount.toString());
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!shop) return <div>Loading...</div>;

  const imageItems = shop.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <>
      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid item xs={12} md={6}>
            <ImageGallery
              items={imageItems}
              showFullscreenButton={false}
              showPlayButton={false}
              autoPlay
              slideInterval={3000}
              showNav
              showThumbnails
            />
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              color="#d61355"
            >
              {shop.name}
            </Typography>
            <Typography variant="body1" mb={2}>
              {shop.description}
            </Typography>

            <Chip label={shop.category} color="primary" sx={{ mb: 2 }} />

            <Typography
              variant="body2"
              display="flex"
              alignItems="center"
              mb={1}
            >
              <LocationOn sx={{ mr: 1 }} /> {shop.district}, {shop.regency},{" "}
              {shop.province}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
              {shop.website && (
                <Button
                  startIcon={<Language />}
                  href={`https://${shop.website}`}
                  target="_blank"
                >
                  Website
                </Button>
              )}
              {shop.whatsapp && (
                <Button
                  startIcon={<WhatsApp />}
                  href={`https://wa.me/${shop.whatsapp}`}
                  target="_blank"
                >
                  WhatsApp
                </Button>
              )}
              {shop.instagram && (
                <Button
                  startIcon={<Instagram />}
                  href={`https://instagram.com/${shop.instagram}`}
                  target="_blank"
                >
                  Instagram
                </Button>
              )}
              {shop.facebook && (
                <Button
                  startIcon={<Facebook />}
                  href={`https://facebook.com/${shop.facebook}`}
                  target="_blank"
                >
                  Facebook
                </Button>
              )}
            </Box>

            <Box mt={3}>
              <Typography variant="body2" mb={1} fontWeight="bold">
                Jadwal Operasional
              </Typography>
              {shop.schedule.map((item, i) => (
                <Typography key={i} variant="body2">
                  <CalendarMonth sx={{ fontSize: 16, mr: 1 }} />
                  {item.day}: {item.opening_hour} - {item.closing_hour}
                </Typography>
              ))}
            </Box>

            <Box mt={3}>
              <Typography variant="body2" fontWeight="bold" mb={1}>
                Like:
              </Typography>
              <Button
                variant="outlined"
                sx={{ color: "#d61355", borderColor: "#d61355" }}
                onClick={handleLike}
              >
                👍 {likeCount} Suka
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Catalog Section Placeholder */}
        {/* Catalog Section */}
        <Box
          mt={10}
          sx={{ backgroundColor: "#fefefe", py: 6, px: { xs: 2, sm: 4 } }}
        >
          <Divider sx={{ mb: 4 }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            textAlign="center"
            color="#d61355"
          >
            Katalog Produk
          </Typography>

          {shop.catalogs && shop.catalogs.length > 0 ? (
            <Grid container spacing={4}>
              {shop.catalogs.map((catalog) => (
                <Grid item xs={12} sm={6} key={catalog.id}>
                  <Box
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      component="img"
                      src={`https://api.akademiumkm.id/storage/${catalog.images?.[0]}`}
                      alt={catalog.name}
                      sx={{
                        width: "100%",
                        height: { xs: 200, sm: 240 },
                        objectFit: "cover",
                      }}
                    />
                    <Box p={2} flexGrow={1}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          color: "#d61355",
                          lineHeight: "1.4em",
                          maxHeight: "2.8em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {catalog.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{
                          lineHeight: "1.5em",
                          maxHeight: "4.5em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {catalog.description}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="#2E7D32"
                        mt={1}
                      >
                        Rp {catalog.price.toLocaleString("id-ID")}
                      </Typography>
                    </Box>
                    {catalog.url && (
                      <Box px={2} pb={2}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            backgroundColor: "#d61355",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "#b50d44",
                            },
                          }}
                          href={`https://${catalog.url}`}
                          target="_blank"
                        >
                          Kunjungi Website
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Belum ada produk ditampilkan.
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default ShowcaseDetail;
