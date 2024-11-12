import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ListTemplate = ({ currentPath }) => {
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

  return (
    <Box>
      <Navbar currentPath={currentPath} />
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
        >
          Template Website
        </Typography>

        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card
                sx={{
                  borderRadius: "12px", // Smaller border radius for a compact look
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Reduced shadow size
                }}
              >
                <CardMedia
                  component="img"
                  height="150" // Reduced height of the image
                  image={template.thumbnail}
                  alt={template.name}
                  sx={{ borderRadius: "12px 12px 0 0" }}
                />
                <CardContent sx={{ p: 2 }}>
                  {" "}
                  {/* Reduced padding */}
                  <Typography variant="h6" component="h3" gutterBottom>
                    {" "}
                    {/* Smaller font size */}
                    {template.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    {template.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 1.5 }}>
                    Rp {template.price.toLocaleString("id-ID")}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--themeRed)",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.85rem", // Slightly smaller font
                        "&:hover": {
                          backgroundColor: "darkred",
                        },
                      }}
                      onClick={() => handleBuyClick(template.name)}
                    >
                      Beli
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--themeBlack)",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.85rem", // Slightly smaller font
                        "&:hover": {
                          backgroundColor: "#333",
                        },
                      }}
                      onClick={() => handlePreviewClick(template.url_preview)}
                    >
                      Preview
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ListTemplate;
