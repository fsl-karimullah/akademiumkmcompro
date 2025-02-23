import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const WebinarCard = ({ webinar }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/webinars/${webinar.id}`)}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={webinar.thumbnail || "default-thumbnail.webp"}
            alt={webinar.title || "No Title Available"}
            sx={{
              objectFit: "cover",
              width: "100%",
            }}
          />
          {/* Optional Badge */}
          {webinar.badge && (
            <Chip
              label={webinar.badge}
              size="small"
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                backgroundColor: "var(--themeRed)",
                color: "#fff",
              }}
            />
          )}
        </Box>
        <CardContent sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: "1.2rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {webinar.title || "No Title Available"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {webinar.description || "No Description Available"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions sx={{ justifyContent: "space-between", padding: "8px 16px" }}>
        <Typography variant="caption" color="text.secondary">
          Hosted by: <strong>{webinar.host || "Admin"}</strong>
        </Typography>
        <Button
          variant="contained"
          size="small"
          endIcon={<Visibility />}
          sx={{
            backgroundColor: "var(--themeRed)",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#b50d44",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/webinars/${webinar.id}`);
          }}
        >
          Lihat Detail
        </Button>
      </CardActions>
    </Card>
  );
};

export default WebinarCard;
