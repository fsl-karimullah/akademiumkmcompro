import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const CourseCard = ({ title, mentor, price, thumbnail, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        maxWidth: 300,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        transition: "transform 0.3s ease-in-out",
        cursor: "pointer",
        '&:hover': {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={thumbnail}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Mentor: {mentor}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Rp {price.toLocaleString("id-ID")}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
