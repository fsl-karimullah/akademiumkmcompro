import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";

const CourseCard = ({ title, mentor, price, thumbnail, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 320,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={thumbnail}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        {/* Price Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(214, 19, 85, 0.9)", // theme red
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          Rp {price.toLocaleString("id-ID")}
        </Box>
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60px",
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))",
          }}
        />
      </Box>
      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Mentor: {mentor}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            sx={{
              backgroundColor: "#d61355",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#b50d44",
              },
            }}
          >
            Detail
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
