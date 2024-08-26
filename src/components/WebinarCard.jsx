import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, Box } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const WebinarCard = ({ webinar }) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden">
      <CardActionArea onClick={() => navigate(`/webinars/${webinar.id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={webinar.thumbnail}
          alt={webinar.title}
          className="object-cover"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="font-semibold"
          >
            {webinar.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            className="line-clamp-3"
          >
            {webinar.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box className="flex justify-end p-2">
        <Button
          onClick={(e) => {
            e.stopPropagation(); 
            navigate(`/webinars/${webinar.id}`);
          }}
          variant="outlined"
          color="primary"
          endIcon={<Visibility />}
        >
          Lihat Detail
        </Button>
      </Box>
    </Card>
  );
};

export default WebinarCard;
