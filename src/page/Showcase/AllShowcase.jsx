import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const prod_url = "https://api.akademiumkm.id";
const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";

const AllShowcase = () => {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${prod_url}/api/shops?with_geo=0&q=${query}&category_id=${selectedCategory}`
      );
      setShops(res.data.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${prod_url}/api/categories`);
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchData();
  };

  const handleDetail = (id) => {
    navigate(`/umkm-showcase-detail/${id}`);
  };

  // Helper component for image with fallback
  const ImageWithFallback = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
      <CardMedia
        component="img"
        height="200"
        image={imgSrc}
        alt={alt}
        onError={() => {
          if (imgSrc !== fallbackImage) setImgSrc(fallbackImage);
        }}
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 99,
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          px: { xs: 2, md: 4 },
          py: 2,
          mb: 3,
        }}
      >
        <Button
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#d61355",
            borderColor: "#d61355",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ffe5ec",
              borderColor: "#d61355",
            },
          }}
          variant="outlined"
        >
          Kembali
        </Button>
      </Box>

      <Typography variant="h4" fontWeight="bold" color="#d61355" mb={4}>
        Semua Showcase UMKM
      </Typography>

      {/* Filters */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        mb={4}
      >
        <TextField
          label="Cari berdasarkan nama"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Kategori</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="Kategori"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">Semua</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#d61355",
            color: "white",
            whiteSpace: "nowrap",
          }}
          onClick={handleSearch}
        >
          Cari
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : shops.length === 0 ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Tidak ada UMKM ditemukan.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {shops.map((shop) => {
            // Determine initial image URL
            const initialImage =
              shop.thumbnail ||
              shop.images?.[0] ||
              "https://via.placeholder.com/400x200?text=No+Image";

            return (
              <Grid item xs={6} sm={6} md={4} key={shop.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ImageWithFallback src={initialImage} alt={shop.name} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      fontWeight="bold"
                      color="#d61355"
                    >
                      {shop.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Box component="span" fontWeight="bold" color="#d61355">
                        {shop.category}
                      </Box>{" "}
                      — {shop.regency}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                      sx={{ color: "#d61355", borderColor: "#d61355" }}
                      onClick={() => handleDetail(shop.id)}
                    >
                      Lihat Website
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default AllShowcase;
