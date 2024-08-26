import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import ConstructionImage from "/coming-soon.png";
import { useNavigate } from "react-router-dom";

const UnderConstructionScreen = () => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/landing");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdecec",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={ConstructionImage}
            alt="Under Construction"
            style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{ mb: 2, textAlign: "center", color: "#d61355" }}
        >
          Fitur ini sedang dalam tahap pengembangan
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mb: 4, textAlign: "center", color: "#333" }}
        >
          Kami sedang bekerja keras untuk menyelesaikan fitur ini secepat
          mungkin. Terima kasih atas kesabaran Anda.
        </Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReturnHome}
              sx={{ textTransform: "none", borderRadius: 20 }}
            >
              Kembali ke Beranda
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UnderConstructionScreen;
