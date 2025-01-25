import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import {
  CheckCircle,
  WhatsApp,
  Visibility,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { endpoint } from "../endpoint/api";

// ✅ Sample Images
import brandingImg1 from "../../public/branding.png";
import brandingImg2 from "../../public/rebranding-bro.png";
import sosmedImage from "../../public/mahal.png";

const BantuBranding = ({ currentPath }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(endpoint.getPackage);
        setTemplates(response.data.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleWhatsAppClick = (packetNumber) => {
    const message = encodeURIComponent(
      `Halo kak, saya ingin mengetahui tentang paket ${packetNumber}`
    );
    window.open(`https://wa.me/6285281252199?text=${message}`, "_blank");
  };

  const handleWhatsAppClickWebsite = (title) => {
    const message = encodeURIComponent(
      `Halo kak, saya ingin mengetahui tentang branding website ${title} dengan menggunakan kode BRANDINWEBSITE untuk harga spesial Rp. 500.000`
    );
    window.open(`https://wa.me/6285281252199?text=${message}`, "_blank");
  };

  const handlePreviewWebsite = (url) => {
    window.open(url, "_blank");
  };

  const packetCards = [
    {
      title: "Paket 1: Basic Branding",
      price: "IDR 299.000",
      oldPrice: "IDR 499.000",
      discount: "40%",
      packetNumber: "1",
      features: {
        available: [
          "Free 5 Konten (Desain) Instagram",
          "Instagram Feed",
          "Poster Desain",
        ],
        unavailable: [
          "Instagram Story Management",
          "TikTok Video",
          "Website Integration",
          "SEO Optimization",
        ],
      },
    },
    {
      title: "Paket 2: Branding Silver",
      price: "IDR 699.000",
      oldPrice: "IDR 899.000",
      discount: "22%",
      packetNumber: "2",
      features: {
        available: [
          "Free 15 Konten (Desain) Instagram",
          "Instagram Feed & Story",
          "TikTok Video Desain",
          "Basic SEO Setup",
          "Logo Desain",
        ],
        unavailable: [
          "Website Integration",
          "Advanced SEO",
          "Dedicated Account Manager",
        ],
      },
    },
    {
      title: "Paket 3: Branding Gold",
      price: "IDR 1.299.000",
      oldPrice: "IDR 1.799.000",
      discount: "28%",
      packetNumber: "3",
      features: {
        available: [
          "Free 25 Konten (Desain) Instagram & TikTok",
          "Instagram & TikTok Story Management",
          "Website dengan Hosting & Domain Premium",
          "Advanced SEO Optimization",
          "Logo & Brand Guidelines",
          "Dedicated Account Manager",
        ],
        unavailable: [],
      },
    },
    // {
    //   title: "Paket 4: Branding Platinum",
    //   price: "IDR 2.499.000",
    //   oldPrice: "IDR 3.499.000",
    //   discount: "29%",
    //   packetNumber: "4",
    //   features: {
    //     available: [
    //       "Unlimited Konten (Desain) Instagram & TikTok",
    //       "Instagram & TikTok Story Management",
    //       "Custom Website Design with Hosting & Domain",
    //       "Full Advanced SEO Optimization",
    //       "Logo, Brand Guidelines & Visual Identity",
    //       "Dedicated Account Manager & Analytics Report",
    //       "Social Media Ads Management (Instagram & TikTok)",
    //     ],
    //     unavailable: [],
    //   },
    // },
  ];
  

  return (
    <Box>
      {/* ✅ Navbar */}
      <Navbar currentPath={currentPath} />

      {/* ✅ Hero Section */}
      <Box
        sx={{
          minHeight: "60vh",
          background: "linear-gradient(to right, #d61355, #ff6b6b)",
          color: "white",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          padding: "4rem 1rem",
        }}
      >
        <Container>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ mb: 2, animation: "fadeIn 1s ease-in-out" }}
          >
            Ingin Branding?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 3, animation: "fadeIn 1.5s ease-in-out" }}
          >
            Serahkan masalah <strong>BRANDING</strong> Anda kepada kami.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<WhatsApp />}
            sx={{
              backgroundColor: "#25D366",
              "&:hover": { backgroundColor: "#1EBE52" },
            }}
            onClick={() => handleWhatsAppClick("konsultasi")}
          >
            Konsultasi Sekarang
          </Button>
        </Container>
      </Box>

      {/* ✅ Pricing List */}
      <Box sx={{ padding: "4rem 0", backgroundColor: "#fff" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Paket Layanan Branding
          </Typography>
          <Grid container spacing={4}>
            {packetCards.map((packet, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {packet.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      {packet.oldPrice}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: "#d61355", fontWeight: "bold" }}
                    >
                      {packet.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Diskon {packet.discount}
                    </Typography>
                    <List>
                      {packet.features.available.map((feature, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircle color="success" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#d61355" }}
                      onClick={() => handleWhatsAppClick(packet.packetNumber)}
                    >
                      Hubungi WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ✅ Template Display */}
      <Box sx={{ padding: "4rem 0", backgroundColor: "#fafafa" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            Template Website
          </Typography>
          <Grid container spacing={4}>
            {templates.map((template, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardActionArea>
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        textAlign="center"
                        mb={2}
                      >
                        {template.name}
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<WhatsApp />}
                          sx={{
                            backgroundColor: "#25D366",
                            fontSize: "0.8rem",
                            "&:hover": {
                              backgroundColor: "#1EBE52",
                            },
                          }}
                          onClick={() =>
                            handleWhatsAppClickWebsite(template.name)
                          }
                        >
                          Hubungi
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Visibility />}
                          sx={{
                            fontSize: "0.8rem",
                            color: "#333",
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                          onClick={() =>
                            handlePreviewWebsite(template.url_preview)
                          }
                        >
                          Preview
                        </Button>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BantuBranding;
