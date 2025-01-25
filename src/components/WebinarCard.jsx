import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { CalendarToday, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  try {
    const validDate = new Date(date);
    if (isNaN(validDate)) throw new Error("Invalid Date");
    return validDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Date Not Available";
  }
};

const WebinarCard = ({ webinar }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* ✅ Card Media */}
      <CardActionArea onClick={() => navigate(`/webinars/${webinar.id}`)}>
        <CardMedia
          component="img"
          height="180"
          image={webinar.thumbnail || "default-thumbnail.webp"}
          alt={webinar.title || "No Title Available"}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
        {/* ✅ Card Content */}
        <CardContent sx={{ padding: "16px" }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
              fontSize: "1.1rem",
              lineHeight: "1.3",
            }}
          >
            {webinar.title || "No Title Available"}
          </Typography>
          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {webinar.description || "No Description Available"}
          </Typography>
          {/* Metadata */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              color: "text.secondary",
            }}
          >
            {/* <CalendarToday sx={{ fontSize: 16 }} />
            <Typography variant="caption">
              {formatDate(webinar.date)}
            </Typography> */}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* ✅ Divider */}
      <Divider />

      {/* ✅ CTA Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: "0.85rem" }}
        >
          Hosted by: <strong>{webinar.host || "Admin"}</strong>
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--themeRed)",
            "&:hover": {
              backgroundColor: "#b50d44",
            },
          }}
          size="small"
          endIcon={<Visibility />}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/webinars/${webinar.id}`);
          }}
        >
          Lihat Detail
        </Button>
      </Box>
    </Card>
  );
};

export default WebinarCard;
