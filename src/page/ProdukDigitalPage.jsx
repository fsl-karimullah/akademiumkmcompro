import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    CircularProgress,
    Card,
    CardContent,
    Chip,
    Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";

const ITEMS_PER_PAGE = 8;

const ProdukDigitalPage = ({ currentPath }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(endpoint.getProdukDigital);
            if (response.data && Array.isArray(response.data.data)) {
                setProducts(response.data.data);
            } else {
                setError("Unexpected response format");
            }
        } catch (err) {
            setError("Gagal memuat produk digital. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        fetchProducts();
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    // Pagination logic
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const paginatedProducts = products.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const ProductCard = ({ product }) => (
        <Card
            onClick={() => navigate(`/produk-digital/${product.id}`)}
            sx={{
                height: "100%",
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                },
            }}
        >
            {/* Fixed Aspect Ratio Thumbnail */}
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        position: "relative",
                        paddingTop: "133.33%", // 3:4 portrait aspect ratio
                        overflow: "hidden",
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    <Box
                        component="img"
                        src={
                            product.thumbnail ||
                            "https://via.placeholder.com/400x225.png?text=Produk+Digital"
                        }
                        alt={product.title}
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
                <Chip
                    label={product.is_payment ? "💰 Berbayar" : "🎁 Gratis"}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        backgroundColor: product.is_payment ? "#ff9800" : "#4caf50",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                    }}
                />
            </Box>
            <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: { xs: "0.95rem", md: "1.1rem" },
                        lineHeight: 1.4,
                        mb: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: { xs: "2.6em", md: "3em" },
                    }}
                >
                    {product.title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        flexGrow: 1,
                    }}
                >
                    {product.description}
                </Typography>
                <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                        mt: 2,
                        borderColor: "#d61355",
                        color: "#d61355",
                        fontWeight: 600,
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#d61355",
                            color: "#fff",
                            borderColor: "#d61355",
                        },
                    }}
                >
                    Lihat Detail
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <Box>
            <Navbar currentPath={currentPath} />

            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #d61355 0%, #ff6b6b 100%)",
                    py: { xs: 5, md: 8 },
                    textAlign: "center",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: { xs: "1.75rem", md: "2.5rem" },
                            mb: 2,
                        }}
                    >
                        📚 Produk Digital
                    </Typography>
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,0.9)",
                            fontSize: { xs: "0.95rem", md: "1.15rem" },
                            maxWidth: "600px",
                            mx: "auto",
                        }}
                    >
                        Template bisnis, e-book strategi, dan panduan praktis untuk membantu
                        UMKM menjadi lebih kompetitif di era digital.
                    </Typography>
                </Container>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 4,
                        color: "#333",
                    }}
                >
                    Semua Produk Digital
                </Typography>

                {/* Loading State */}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
                        <CircularProgress sx={{ color: "#d61355" }} />
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Box sx={{ textAlign: "center", my: 6 }}>
                        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleRetry}
                            sx={{
                                backgroundColor: "#d61355",
                                "&:hover": { backgroundColor: "#b50d44" },
                            }}
                        >
                            Coba Lagi
                        </Button>
                    </Box>
                )}

                {/* Product Cards */}
                {!loading && !error && (
                    <>
                        {products.length === 0 ? (
                            <Box sx={{ textAlign: "center", py: 6 }}>
                                <Typography variant="h6" color="text.secondary">
                                    Belum ada produk digital tersedia.
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <Grid container spacing={3}>
                                    {paginatedProducts.map((product) => (
                                        <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                                            <ProductCard product={product} />
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            mt: 5,
                                        }}
                                    >
                                        <Pagination
                                            count={totalPages}
                                            page={page}
                                            onChange={handlePageChange}
                                            color="primary"
                                            size="large"
                                            sx={{
                                                "& .MuiPaginationItem-root": {
                                                    fontWeight: 600,
                                                },
                                                "& .Mui-selected": {
                                                    backgroundColor: "#d61355 !important",
                                                    color: "#fff",
                                                },
                                            }}
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default ProdukDigitalPage;
