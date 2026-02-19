import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";
import { ShoppingCart, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ListTemplate = ({ currentPath }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(endpoint.getPackage);
        setTemplates(response.data.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleBuyClick = (templateName) => {
    const message = `Hi, I'm interested in purchasing the ${templateName} template.`;
    window.open(
      `https://wa.me/6285281252199?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handlePreviewClick = (previewUrl) => {
    window.open(previewUrl, "_blank");
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Loading templates...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar currentPath={currentPath} />
      <Box sx={{ p: 4, backgroundColor: "#f9fafc" }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "var(--themeRed)",
            mb: 4,
          }}
        >
          Daftar Template Website
        </Typography>

        {templates.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
            Tidak ada template yang tersedia saat ini.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 15px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  {/* ✅ Template Thumbnail */}
                  <CardMedia
                    component="img"
                    height="180"
                    image={template.thumbnail}
                    alt={template.name}
                    sx={{ objectFit: "cover" }}
                  />

                  {/* ✅ Template Info */}
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        color: "var(--themeBlack)",
                      }}
                    >
                      {template.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {template.description}
                    </Typography>
                    <Chip
                      label={`Rp ${template.price.toLocaleString("id-ID")}`}
                      color="primary"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        backgroundColor: "var(--themeRed)",
                        color: "white",
                        mb: 2,
                      }}
                    />

                    {/* ✅ CTA Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Tooltip title="Beli Template">
                        <Button
                          variant="contained"
                          startIcon={<ShoppingCart />}
                          sx={{
                            backgroundColor: "var(--themeRed)",
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                              backgroundColor: "#b50d44",
                            },
                          }}
                          onClick={() => handleBuyClick(template.name)}
                        >
                          Beli
                        </Button>
                      </Tooltip>
                      <Tooltip title="Lihat Preview">
                        <Button
                          variant="outlined"
                          startIcon={<Visibility />}
                          sx={{
                            borderColor: "var(--themeBlack)",
                            color: "var(--themeBlack)",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#333",
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                          onClick={() => handlePreviewClick(template.url_preview)}
                        >
                          Preview
                        </Button>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ListTemplate;
