import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Chip,
  Breadcrumbs,
  Link as MuiLink,
  Checkbox,
  FormControlLabel,
  Paper,
  Pagination,
} from "@mui/material";
import { Search, Home, NavigateNext, LocalFireDepartment } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";

const Edukasi = ({ currentPath }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filters
  const [filters, setFilters] = useState({
    flashSale: false,
    gratis: false,
    berbayar: false,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.get(endpoint.getCourses, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.data);
      setFilteredCourses(response.data.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search and filters
  useEffect(() => {
    let result = [...courses];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.mentor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    const hasActiveFilters = filters.flashSale || filters.gratis || filters.berbayar;
    if (hasActiveFilters) {
      result = result.filter((course) => {
        if (filters.flashSale && course.is_flashsale === 1) return true;
        if (filters.gratis && course.price === 0) return true;
        if (filters.berbayar && course.price > 0) return true;
        return false;
      });
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "flashsale":
        result.sort((a, b) => b.is_flashsale - a.is_flashsale);
        break;
      default:
        break;
    }

    setFilteredCourses(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, sortBy, courses, filters]);

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-pay/${courseId}`);
  };

  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar currentPath={currentPath} />

      {/* Hero Section - Purple Gradient */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #d61355 0%, #a00d42 100%)",
          py: { xs: 5, md: 6 },
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 600,
              textAlign: "center",
              mb: 1.5,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              fontStyle: "italic",
            }}
          >
            E-Course
          </Typography>

          {/* Breadcrumb */}
          <Breadcrumbs
            separator={<NavigateNext sx={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }} />}
            sx={{
              justifyContent: "center",
              display: "flex",
              mb: 4,
              "& .MuiBreadcrumbs-ol": { justifyContent: "center" },
            }}
          >
            <MuiLink
              component={Link}
              to="/"
              sx={{
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: "0.9rem",
                "&:hover": { color: "#fff" },
              }}
            >
              Home
            </MuiLink>
            <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
              E-Course
            </Typography>
          </Breadcrumbs>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <TextField
              fullWidth
              placeholder="Mau cari apa nih ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": { border: "none" },
                  py: 0.5,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#999" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: "16px",
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Left Sidebar - Filters */}
            <Grid item xs={12} md={2.5}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#333",
                  fontSize: "1.1rem",
                }}
              >
                Kategori
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  flexWrap: "wrap",
                  gap: { xs: 1, md: 0.5 },
                  mb: { xs: 2, md: 0 },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.flashSale}
                      onChange={() => handleFilterChange("flashSale")}
                      size="small"
                      sx={{
                        color: "#ccc",
                        "&.Mui-checked": { color: "#d61355" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                      Flash Sale
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.gratis}
                      onChange={() => handleFilterChange("gratis")}
                      size="small"
                      sx={{
                        color: "#ccc",
                        "&.Mui-checked": { color: "#d61355" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                      Gratis
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.berbayar}
                      onChange={() => handleFilterChange("berbayar")}
                      size="small"
                      sx={{
                        color: "#ccc",
                        "&.Mui-checked": { color: "#d61355" },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.9rem", color: "#555" }}>
                      Berbayar
                    </Typography>
                  }
                />
              </Box>
            </Grid>

            {/* Right Content - Course Grid */}
            <Grid item xs={12} md={9.5}>
              {/* Results Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Typography sx={{ fontWeight: 500, color: "#333", fontSize: "0.95rem" }}>
                  Showing {filteredCourses.length} Results
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                    Sort By:
                  </Typography>
                  <FormControl size="small">
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{
                        minWidth: 120,
                        backgroundColor: "#fff",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#ddd",
                        },
                      }}
                    >
                      <MenuItem value="newest">Urutkan</MenuItem>
                      <MenuItem value="price_low">Harga Terendah</MenuItem>
                      <MenuItem value="price_high">Harga Tertinggi</MenuItem>
                      <MenuItem value="flashsale">Flash Sale</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Course Grid */}
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "40vh",
                  }}
                >
                  <CircularProgress sx={{ color: "#d61355" }} />
                </Box>
              ) : filteredCourses.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    Tidak ada kursus yang ditemukan
                  </Typography>
                </Box>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {filteredCourses
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((course) => (
                        <Grid item xs={12} sm={6} lg={4} key={course.id}>
                          <Card
                            onClick={() => handleCourseClick(course.id)}
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              borderRadius: "12px",
                              overflow: "visible",
                              boxShadow: "none",
                              border: "1px solid #eee",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                                transform: "translateY(-4px)",
                              },
                            }}
                          >
                            {/* Thumbnail Container with colored border */}
                            <Box
                              sx={{
                                m: 1.5,
                                borderRadius: "10px",
                                overflow: "hidden",
                                border: course.is_flashsale === 1
                                  ? "3px solid #d61355"
                                  : "3px solid #7c3aed",
                                position: "relative",
                              }}
                            >
                              <Box
                                sx={{
                                  position: "relative",
                                  paddingTop: "60%",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={
                                    course.thumbnail ||
                                    "https://via.placeholder.com/400x240.png?text=No+Image"
                                  }
                                  alt={course.title}
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            </Box>

                            <CardContent sx={{ p: 2, pt: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                              {/* Category Badge + Price Row */}
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                <Chip
                                  label={course.is_flashsale === 1 ? "Flash Sale" : course.price === 0 ? "Gratis" : "Berbayar"}
                                  size="small"
                                  icon={course.is_flashsale === 1 ? <LocalFireDepartment sx={{ fontSize: 14 }} /> : undefined}
                                  sx={{
                                    height: 24,
                                    fontSize: "0.7rem",
                                    fontWeight: 500,
                                    backgroundColor: course.is_flashsale === 1
                                      ? "#fce4ec"
                                      : course.price === 0
                                        ? "#e8f5e9"
                                        : "#e3f2fd",
                                    color: course.is_flashsale === 1
                                      ? "#d61355"
                                      : course.price === 0
                                        ? "#2e7d32"
                                        : "#1565c0",
                                    "& .MuiChip-icon": {
                                      color: "#d61355",
                                    },
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontWeight: 700,
                                    color: "#d61355",
                                    fontSize: "0.95rem",
                                  }}
                                >
                                  {course.price === 0 ? "Gratis" : formatPrice(course.price)}
                                </Typography>
                              </Box>

                              {/* Title */}
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  color: "#222",
                                  mb: 1,
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  fontSize: "0.95rem",
                                  lineHeight: 1.4,
                                }}
                              >
                                {course.title}
                              </Typography>

                              {/* Mentor */}
                              <Typography
                                sx={{
                                  color: "#888",
                                  fontSize: "0.85rem",
                                  mt: "auto",
                                }}
                              >
                                {course.mentor}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                  </Grid>

                  {/* Pagination */}
                  {filteredCourses.length > itemsPerPage && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                      <Pagination
                        count={Math.ceil(filteredCourses.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(e, page) => setCurrentPage(page)}
                        color="primary"
                        sx={{
                          "& .MuiPaginationItem-root": {
                            color: "#666",
                            "&.Mui-selected": {
                              backgroundColor: "#d61355",
                              color: "#fff",
                              "&:hover": {
                                backgroundColor: "#b50d44",
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Edukasi;
