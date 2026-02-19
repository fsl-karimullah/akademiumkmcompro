import React, { useEffect, useState, useCallback } from "react";
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
  Chip,
  IconButton,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";

const prod_url = "https://api.akademiumkm.id";
const fallbackImage =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500";

const ImageWithFallback = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <CardMedia
      component="img"
      height="190"
      image={imgSrc}
      alt={alt}
      onError={() => { if (imgSrc !== fallbackImage) setImgSrc(fallbackImage); }}
      sx={{ objectFit: "cover" }}
    />
  );
};

const ShopCardSkeleton = () => (
  <Card sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #f0f0f0" }}>
    <Skeleton variant="rectangular" height={190} />
    <CardContent>
      <Skeleton variant="text" height={28} width="70%" />
      <Skeleton variant="text" height={20} width="50%" />
      <Skeleton variant="text" height={20} width="40%" />
    </CardContent>
    <Box px={2} pb={2}>
      <Skeleton variant="rectangular" height={36} borderRadius={2} />
    </Box>
  </Card>
);

const AllShowcase = () => {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${prod_url}/api/shops?with_geo=0&q=${query}&category_id=${selectedCategory}`
      );
      const data = res.data.data || [];
      setShops(data);
      setTotalCount(data.length);
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCategory]);

  useEffect(() => {
    fetchData();
    axios.get(`${prod_url}/api/categories`)
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSearch = () => fetchData();

  const handleClear = () => {
    setQuery("");
    setSelectedCategory("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const sortedShops = [...shops].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  const selectedCatName = categories.find((c) => c.id === selectedCategory)?.name;

  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        .shop-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .shop-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(214,19,85,0.15) !important;
        }
        .filter-chip { transition: all 0.2s; cursor: pointer; }
        .filter-chip:hover { transform: scale(1.04); }
        .list-card { transition: all 0.2s ease; }
        .list-card:hover {
          box-shadow: 0 8px 24px rgba(214,19,85,0.12) !important;
          transform: translateX(4px);
        }
      `}</style>

      {/* ─── STICKY HEADER ─── */}
      <Box
        sx={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(214,19,85,0.08)",
          px: { xs: 2, md: 4 }, py: 1.5,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: "#d61355",
              background: "#fff0f4",
              width: 36, height: 36,
              "&:hover": { background: "#ffe0e9" },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <Box>
            <Typography fontWeight={800} color="#1a1a2e" fontSize="1rem" lineHeight={1.2}>
              Semua UMKM Showcase
            </Typography>
            {!loading && (
              <Typography fontSize="0.72rem" color="text.secondary">
                {totalCount} bisnis ditemukan
              </Typography>
            )}
          </Box>
        </Box>
        <Button
          component="a"
          href="https://api.akademiumkm.id/admin/login"
          target="_blank"
          size="small"
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #d61355, #ff6b6b)",
            borderRadius: 3, fontWeight: 700,
            px: 2.5, fontSize: "0.8rem", boxShadow: "none",
            "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
          }}
        >
          + Daftarkan Bisnis
        </Button>
      </Box>

      {/* ─── HERO BANNER ─── */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #b50f47 0%, #d61355 60%, #ff6b6b 100%)",
          py: { xs: 5, md: 7 }, px: 2,
          textAlign: "center", color: "white",
          position: "relative", overflow: "hidden",
        }}
      >
        {[
          { w: 200, h: 200, top: -60, right: -40, op: 0.07 },
          { w: 140, h: 140, bottom: -40, left: -30, op: 0.05 },
        ].map((c, i) => (
          <Box key={i} sx={{
            position: "absolute", borderRadius: "50%",
            width: c.w, height: c.h,
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            background: "white", opacity: c.op,
          }} />
        ))}

        <Typography
          variant="h4" fontWeight={800}
          sx={{ letterSpacing: "-0.02em", mb: 1.5 }}
        >
          Direktori UMKM Digital Indonesia
        </Typography>
        <Typography sx={{ opacity: 0.88, maxWidth: 500, mx: "auto", lineHeight: 1.8, fontSize: "0.98rem" }}>
          Temukan dan dukung UMKM lokal yang sudah go digital.
          Setiap klik Anda membantu pelaku usaha kecil tumbuh lebih besar.
        </Typography>

        {/* ─── SEARCH BAR IN HERO ─── */}
        <Box
          sx={{
            mt: 4, mx: "auto", maxWidth: 620,
            background: "white",
            borderRadius: 4, p: 1,
            display: "flex", gap: 1, alignItems: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          <TextField
            placeholder="Cari nama bisnis, produk, atau kota..."
            fullWidth
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#d61355", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: query && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setQuery("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            variant="standard"
            sx={{ px: 1 }}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #d61355, #ff6b6b)",
              borderRadius: 3, px: 3, py: 1,
              fontWeight: 700, whiteSpace: "nowrap", boxShadow: "none",
              "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
            }}
          >
            Cari
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>

        {/* ─── FILTERS ROW ─── */}
        <Box
          sx={{
            background: "white",
            borderRadius: 3, p: 2.5, mb: 4,
            border: "1px solid rgba(0,0,0,0.07)",
            display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mr={1}>
            <TuneIcon sx={{ color: "#d61355", fontSize: 20 }} />
            <Typography fontWeight={700} fontSize="0.88rem" color="#1a1a2e">Filter:</Typography>
          </Box>

          {/* Category chips */}
          <Box display="flex" gap={1} flexWrap="wrap" flex={1}>
            <Chip
              label="Semua Kategori"
              className="filter-chip"
              onClick={() => setSelectedCategory("")}
              sx={{
                fontWeight: 600, fontSize: "0.8rem",
                background: selectedCategory === "" ? "#d61355" : "#f5f5f5",
                color: selectedCategory === "" ? "white" : "#555",
                "&:hover": { background: selectedCategory === "" ? "#b50f47" : "#ebe9e9" },
              }}
            />
            {categories.slice(0, 8).map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                className="filter-chip"
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? "" : cat.id)}
                sx={{
                  fontWeight: 600, fontSize: "0.8rem",
                  background: selectedCategory === cat.id ? "#d61355" : "#f5f5f5",
                  color: selectedCategory === cat.id ? "white" : "#555",
                  "&:hover": { background: selectedCategory === cat.id ? "#b50f47" : "#ebe9e9" },
                }}
              />
            ))}
            {categories.length > 8 && (
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  displayEmpty
                  sx={{ fontSize: "0.8rem", borderRadius: 2 }}
                >
                  <MenuItem value="">Kategori lainnya...</MenuItem>
                  {categories.slice(8).map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          {/* Sort */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ fontSize: "0.82rem", borderRadius: 2, borderColor: "#e0e0e0" }}
            >
              <MenuItem value="newest">Terbaru</MenuItem>
              <MenuItem value="name-asc">Nama A–Z</MenuItem>
              <MenuItem value="name-desc">Nama Z–A</MenuItem>
            </Select>
          </FormControl>

          {/* Active filter tags */}
          {(query || selectedCategory) && (
            <Box display="flex" gap={1} alignItems="center">
              {query && (
                <Chip
                  label={`"${query}"`}
                  size="small"
                  onDelete={() => setQuery("")}
                  sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 600, fontSize: "0.75rem" }}
                />
              )}
              {selectedCatName && (
                <Chip
                  label={selectedCatName}
                  size="small"
                  onDelete={() => setSelectedCategory("")}
                  sx={{ background: "#fff0f4", color: "#d61355", fontWeight: 600, fontSize: "0.75rem" }}
                />
              )}
              <Button
                size="small" onClick={handleClear}
                sx={{ color: "#888", fontSize: "0.75rem", textTransform: "none" }}
              >
                Hapus semua
              </Button>
            </Box>
          )}
        </Box>

        {/* ─── RESULTS INFO ─── */}
        {!loading && (
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography color="text.secondary" fontSize="0.88rem">
              Menampilkan <strong style={{ color: "#d61355" }}>{sortedShops.length}</strong> bisnis
              {selectedCatName && <> dalam kategori <strong style={{ color: "#d61355" }}>{selectedCatName}</strong></>}
              {query && <> untuk pencarian <strong style={{ color: "#d61355" }}>"{query}"</strong></>}
            </Typography>
          </Box>
        )}

        {/* ─── CONTENT ─── */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(9)].map((_, i) => (
              <Grid item xs={6} sm={6} md={4} key={i}>
                <ShopCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : sortedShops.length === 0 ? (
          <Box
            textAlign="center" py={12}
            sx={{
              background: "white", borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <StorefrontIcon sx={{ fontSize: 64, color: "#e0e0e0", mb: 2 }} />
            <Typography variant="h6" fontWeight={700} color="#1a1a2e" gutterBottom>
              Tidak ada bisnis ditemukan
            </Typography>
            <Typography color="text.secondary" mb={3} fontSize="0.9rem">
              Coba ubah kata kunci atau kategori pencarian Anda
            </Typography>
            <Button
              onClick={handleClear}
              variant="outlined"
              sx={{ color: "#d61355", borderColor: "#d61355", fontWeight: 700, borderRadius: 2 }}
            >
              Reset Pencarian
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {sortedShops.map((shop) => {
              const initialImage =
                shop.thumbnail || shop.images?.[0] || fallbackImage;

              return (
                <Grid item xs={6} sm={6} md={4} key={shop.id}>
                  <Card
                    className="shop-card"
                    sx={{
                      height: "100%", display: "flex", flexDirection: "column",
                      borderRadius: 3, overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(214,19,85,0.06)",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <ImageWithFallback src={initialImage} alt={shop.name} />
                      {shop.category && (
                        <Chip
                          label={shop.category}
                          size="small"
                          icon={<CategoryIcon sx={{ fontSize: "13px !important" }} />}
                          sx={{
                            position: "absolute", top: 10, left: 10,
                            background: "rgba(214,19,85,0.9)",
                            backdropFilter: "blur(4px)",
                            color: "white", fontWeight: 700,
                            fontSize: "0.7rem",
                            "& .MuiChip-icon": { color: "white" },
                          }}
                        />
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Typography
                        fontWeight={800} fontSize="0.97rem"
                        color="#1a1a2e" gutterBottom
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {shop.name}
                      </Typography>

                      {shop.regency && (
                        <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                          <LocationOnIcon sx={{ fontSize: 14, color: "#d61355" }} />
                          <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
                            {shop.regency}
                          </Typography>
                        </Box>
                      )}

                      {shop.description && (
                        <Typography
                          variant="body2" color="text.secondary"
                          fontSize="0.8rem" mt={0.5}
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.6,
                          }}
                        >
                          {shop.description}
                        </Typography>
                      )}
                    </CardContent>

                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        onClick={() => navigate(`/umkm-showcase-detail/${shop.id}`)}
                        sx={{
                          background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                          color: "white", fontWeight: 700,
                          borderRadius: 2, boxShadow: "none",
                          fontSize: "0.8rem", py: 0.8,
                          "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
                        }}
                      >
                        Lihat Profil Digital →
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* ─── CTA BOTTOM ─── */}
        {!loading && sortedShops.length > 0 && (
          <Box
            mt={8} p={5} textAlign="center"
            sx={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #2d1535 100%)",
              borderRadius: 4, color: "white",
              position: "relative", overflow: "hidden",
            }}
          >
            <Box sx={{
              position: "absolute", top: -40, right: -40,
              width: 180, height: 180, borderRadius: "50%",
              background: "rgba(214,19,85,0.15)",
            }} />
            <StorefrontIcon sx={{ fontSize: 44, color: "#ff6b6b", mb: 2 }} />
            <Typography variant="h5" fontWeight={800} mb={1.5}>
              Belum Ada Profil Digital?
            </Typography>
            <Typography sx={{ opacity: 0.75, mb: 3, maxWidth: 420, mx: "auto", lineHeight: 1.8, fontSize: "0.95rem" }}>
              Daftarkan bisnis Anda sekarang dan tampil di antara ratusan UMKM yang sudah terdigitalisasi. Gratis, mudah, dan cepat!
            </Typography>
            <Button
              component="a"
              href="https://api.akademiumkm.id/admin/login"
              target="_blank"
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                color: "white", fontWeight: 800,
                px: 5, py: 1.5, borderRadius: 3,
                boxShadow: "0 8px 24px rgba(214,19,85,0.3)",
                "&:hover": { background: "linear-gradient(135deg, #b50f47, #e85555)" },
              }}
            >
              Daftarkan Bisnis Saya — Gratis!
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default AllShowcase;