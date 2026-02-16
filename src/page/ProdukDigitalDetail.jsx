import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    useMediaQuery,
    TextField,
    Dialog,
    DialogContent,
    CircularProgress,
    Alert,
    Chip,
    Breadcrumbs,
    Link as MuiLink,
    Divider,
    InputAdornment,
    Avatar,
    Stack,
    IconButton,
} from "@mui/material";
import {
    Home,
    NavigateNext,
    Person,
    Email,
    Phone,
    LocationOn,
    Business,
    Category,
    CheckCircle,
    Verified,
    AccessTime,
    Download,
    Close,
    Description,
    LocalOffer,
} from "@mui/icons-material";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProdukDigitalDetail = ({ currentPath }) => {
    const { id } = useParams();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Form State
    const [openForm, setOpenForm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [successData, setSuccessData] = useState(null);
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        no_hp: "",
        domisili: "",
        nama_bisnis: "",
        sektor_bisnis: "",
    });

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(endpoint.getProdukDigitalById(id));
                setProduct(response.data.data);
            } catch (error) {
                setError("Gagal memuat data produk digital.");
                toast.error("Gagal memuat data produk digital");
            } finally {
                setLoading(false);
            }
        };
        fetchProductDetail();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError(null);

        try {
            // Check if product requires payment
            if (product.is_payment && product.price > 0) {
                // Call payment API for paid products
                const response = await axios.post(endpoint.payDigitalProduct(id), formData);

                if (response.data.success) {
                    // Redirect to Ayolinx payment page
                    window.location.href = response.data.data.payment_link;
                    return;
                } else {
                    setFormError(response.data.message || "Gagal membuat link pembayaran");
                }
            } else {
                // Free product - submit form directly
                const response = await axios.post(endpoint.postFormPendaftaran, {
                    ...formData,
                    produk_digital_id: parseInt(id),
                });

                if (response.data.success) {
                    setSuccessData(response.data.data);
                    toast.success("Pendaftaran berhasil!");
                } else {
                    setFormError(response.data.message || "Pendaftaran gagal");
                }
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setFormError(error.response.data.message);
            } else if (error.response?.data?.errors) {
                const firstError = Object.values(error.response.data.errors)[0];
                setFormError(firstError[0]);
            } else {
                setFormError("Terjadi kesalahan, silakan coba lagi");
            }
        } finally {
            setFormLoading(false);
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setFormError(null);
        setSuccessData(null);
        setFormData({
            nama: "",
            email: "",
            no_hp: "",
            domisili: "",
            nama_bisnis: "",
            sektor_bisnis: "",
        });
    };

    const handleGetFreeProduct = () => {
        if (successData?.link_pendaftaran_gratis) {
            window.open(successData.link_pendaftaran_gratis, "_blank");
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                }}
            >
                <CircularProgress sx={{ color: "#d61355" }} size={40} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                <Navbar currentPath={currentPath} />
                <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
                    <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#d61355", "&:hover": { backgroundColor: "#b50d44" } }}
                        onClick={() => navigate("/produk-digital")}
                    >
                        Kembali
                    </Button>
                </Container>
            </Box>
        );
    }

    const isGratis = product && !product.is_payment;

    const benefits = [
        { icon: <Download sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Download Instan" },
        { icon: <Verified sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Terverifikasi" },
        { icon: <Description sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Format Digital" },
        { icon: <AccessTime sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Akses Selamanya" },
    ];

    return (
        <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar currentPath={currentPath} />

            {/* Hero Section */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #d61355 0%, #ff6b6b 100%)",
                    py: { xs: 3, md: 5 },
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    {/* Breadcrumb */}
                    <Breadcrumbs
                        separator={<NavigateNext sx={{ fontSize: { xs: 14, md: 18 }, color: "rgba(255,255,255,0.7)" }} />}
                        sx={{ mb: { xs: 2, md: 3 } }}
                    >
                        <MuiLink
                            component={Link}
                            to="/"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "rgba(255,255,255,0.9)",
                                textDecoration: "none",
                                fontSize: { xs: "0.8rem", md: "0.95rem" },
                            }}
                        >
                            <Home sx={{ mr: 0.5, fontSize: { xs: 14, md: 18 } }} />
                            Home
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            to="/produk-digital"
                            sx={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: { xs: "0.8rem", md: "0.95rem" } }}
                        >
                            Produk Digital
                        </MuiLink>
                        <Typography sx={{ color: "#fff", fontWeight: 500, fontSize: { xs: "0.8rem", md: "0.95rem" } }}>
                            Detail
                        </Typography>
                    </Breadcrumbs>

                    <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
                        {/* Left Content */}
                        <Grid item xs={12} md={7}>
                            {isGratis && (
                                <Chip
                                    icon={<LocalOffer sx={{ color: "#fff !important", fontSize: { xs: 14, md: 18 } }} />}
                                    label="PRODUK GRATIS"
                                    size={isMobile ? "small" : "medium"}
                                    sx={{
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: { xs: "0.75rem", md: "0.875rem" },
                                        mb: { xs: 1.5, md: 2 },
                                        py: { xs: 0, md: 0.5 },
                                    }}
                                />
                            )}
                            <Typography
                                sx={{
                                    color: "#fff",
                                    fontWeight: 700,
                                    fontSize: { xs: "1.25rem", md: "2rem" },
                                    lineHeight: 1.3,
                                    mb: { xs: 1.5, md: 2 },
                                }}
                            >
                                {product?.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.9)",
                                    fontSize: { xs: "0.85rem", md: "1.1rem" },
                                    mb: { xs: 2, md: 3 },
                                }}
                            >
                                Dapatkan produk digital eksklusif untuk mengembangkan bisnis Anda!
                            </Typography>

                            {/* Benefits */}
                            <Stack direction="row" spacing={{ xs: 0.5, md: 1 }} flexWrap="wrap" useFlexGap sx={{ mb: { xs: 2, md: 3 } }}>
                                {benefits.map((benefit, index) => (
                                    <Chip
                                        key={index}
                                        icon={React.cloneElement(benefit.icon, { sx: { color: "#d61355 !important" } })}
                                        label={benefit.text}
                                        size={isMobile ? "small" : "medium"}
                                        sx={{
                                            backgroundColor: "#fff",
                                            color: "#333",
                                            fontWeight: 500,
                                            fontSize: { xs: "0.7rem", md: "0.85rem" },
                                            height: { xs: 26, md: 32 },
                                            mb: 0.5,
                                        }}
                                    />
                                ))}
                            </Stack>

                            {/* CTA Button - Desktop */}
                            {!isMobile && isGratis && (
                                <Button
                                    variant="contained"
                                    onClick={() => setOpenForm(true)}
                                    sx={{
                                        backgroundColor: "#fff",
                                        color: "#d61355",
                                        py: 1.5,
                                        px: 4,
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                                        "&:hover": { backgroundColor: "#f5f5f5", transform: "translateY(-2px)" },
                                    }}
                                >
                                    Dapatkan Produk Gratis
                                </Button>
                            )}

                            {/* CTA Button - Mobile */}
                            {isMobile && isGratis && (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => setOpenForm(true)}
                                    sx={{
                                        backgroundColor: "#fff",
                                        color: "#d61355",
                                        py: 1,
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        borderRadius: "8px",
                                        textTransform: "none",
                                        "&:hover": { backgroundColor: "#f5f5f5" },
                                    }}
                                >
                                    Dapatkan Gratis
                                </Button>
                            )}
                        </Grid>

                        {/* Right - Thumbnail */}
                        <Grid item xs={12} md={5}>
                            <Card
                                sx={{
                                    borderRadius: { xs: "12px", md: "16px" },
                                    overflow: "hidden",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                                    maxWidth: { xs: "200px", md: "280px" },
                                    mx: "auto",
                                }}
                            >
                                <Box sx={{ position: "relative", paddingTop: "133.33%" }}>
                                    <Box
                                        component="img"
                                        src={product?.thumbnail || "https://via.placeholder.com/300x400.png?text=Produk+Digital"}
                                        alt={product?.title}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {isGratis && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: { xs: 8, md: 12 },
                                                right: { xs: 8, md: 12 },
                                                backgroundColor: "#00c853",
                                                color: "#fff",
                                                px: { xs: 1, md: 1.5 },
                                                py: { xs: 0.25, md: 0.5 },
                                                borderRadius: "6px",
                                                fontWeight: 600,
                                                fontSize: { xs: "0.65rem", md: "0.75rem" },
                                            }}
                                        >
                                            GRATIS
                                        </Box>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    {/* Left - Description */}
                    <Grid item xs={12} md={8}>
                        <Card
                            sx={{
                                borderRadius: { xs: "12px", md: "16px" },
                                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                overflow: "hidden",
                            }}
                        >
                            <Box sx={{ backgroundColor: "#d61355", py: { xs: 1.5, md: 2 }, px: { xs: 2, md: 3 } }}>
                                <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: { xs: "0.9rem", md: "1.1rem" } }}>
                                    Tentang Produk
                                </Typography>
                            </Box>
                            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                                <Box
                                    sx={{
                                        typography: "body1",
                                        color: "#555",
                                        lineHeight: 1.8,
                                        fontSize: { xs: "0.875rem", md: "1rem" },
                                        "& ul, & ol": { pl: 2.5, mb: 1.5 },
                                        "& li": { mb: 0.75 },
                                        "& p": { mb: 2 },
                                    }}
                                >
                                    {product?.description ? parse(product.description) : "Deskripsi tidak tersedia."}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Why Get */}
                        <Card
                            sx={{
                                borderRadius: { xs: "12px", md: "16px" },
                                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                mt: { xs: 2, md: 3 },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                                <Typography sx={{ fontWeight: 600, mb: { xs: 2, md: 3 }, color: "#333", fontSize: { xs: "0.9rem", md: "1.15rem" } }}>
                                    Kenapa Harus Dapatkan Produk Ini?
                                </Typography>
                                <Grid container spacing={{ xs: 1.5, md: 2 }}>
                                    {[
                                        { icon: "📄", title: "Siap Pakai", desc: "Langsung bisa digunakan" },
                                        { icon: "✨", title: "Berkualitas", desc: "Dibuat oleh ahli" },
                                        { icon: "📱", title: "Multi Format", desc: "PDF, Excel, dll" },
                                        { icon: "♾️", title: "Akses Selamanya", desc: "Sekali dapat, selamanya" },
                                    ].map((item, index) => (
                                        <Grid item xs={6} key={index}>
                                            <Box
                                                sx={{
                                                    p: { xs: 1.5, md: 2.5 },
                                                    borderRadius: { xs: "8px", md: "12px" },
                                                    backgroundColor: "#f8f9fa",
                                                    height: "100%",
                                                    transition: "all 0.2s",
                                                    "&:hover": { backgroundColor: "#fff0f3", transform: "translateY(-2px)" },
                                                }}
                                            >
                                                <Typography sx={{ fontSize: { xs: "1.25rem", md: "1.75rem" }, mb: { xs: 0.5, md: 1 } }}>
                                                    {item.icon}
                                                </Typography>
                                                <Typography sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", md: "1rem" } }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography sx={{ color: "#666", fontSize: { xs: "0.7rem", md: "0.875rem" } }}>
                                                    {item.desc}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right - CTA Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                borderRadius: { xs: "12px", md: "16px" },
                                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                overflow: "hidden",
                                position: { xs: "relative", md: "sticky" },
                                top: { md: 20 },
                            }}
                        >
                            <Box
                                sx={{
                                    background: isGratis
                                        ? "linear-gradient(135deg, #00c853, #69f0ae)"
                                        : "linear-gradient(135deg, #d61355, #ff6b6b)",
                                    py: { xs: 2, md: 3 },
                                    textAlign: "center",
                                }}
                            >
                                <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                                    {isGratis ? "PRODUK GRATIS" : "PRODUK PREMIUM"}
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: { xs: "0.75rem", md: "0.9rem" } }}>
                                    {isGratis ? "Tersedia terbatas!" : "Investasi untuk bisnis Anda"}
                                </Typography>
                            </Box>

                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", md: "0.95rem" }, mb: 1 }}>
                                    Yang Anda Dapatkan:
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    {[
                                        "File produk digital",
                                        "Akses selamanya",
                                        "Update gratis",
                                        "Panduan penggunaan",
                                        "Bonus template",
                                    ].map((item, index) => (
                                        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, md: 1 }, mb: { xs: 0.75, md: 1 } }}>
                                            <CheckCircle sx={{ color: "#00c853", fontSize: { xs: 14, md: 18 } }} />
                                            <Typography sx={{ color: "#555", fontSize: { xs: "0.75rem", md: "0.9rem" } }}>
                                                {item}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Divider sx={{ my: { xs: 1.5, md: 2 } }} />

                                {isGratis ? (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => setOpenForm(true)}
                                        sx={{
                                            background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                            py: { xs: 1.25, md: 1.5 },
                                            fontWeight: 600,
                                            fontSize: { xs: "0.9rem", md: "1rem" },
                                            borderRadius: "10px",
                                            textTransform: "none",
                                            "&:hover": { background: "linear-gradient(90deg, #b50d44, #ff5252)" },
                                        }}
                                    >
                                        Dapatkan Gratis
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => setOpenForm(true)}
                                        sx={{
                                            background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                            py: { xs: 1.25, md: 1.5 },
                                            fontWeight: 600,
                                            fontSize: { xs: "0.9rem", md: "1rem" },
                                            borderRadius: "10px",
                                            textTransform: "none",
                                            "&:hover": { background: "linear-gradient(90deg, #b50d44, #ff5252)" },
                                        }}
                                    >
                                        Beli Sekarang - Rp {product?.price?.toLocaleString('id-ID') || '0'}
                                    </Button>
                                )}

                                <Button
                                    variant="text"
                                    fullWidth
                                    sx={{ mt: 1.5, color: "#666", fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                                    onClick={() => navigate("/produk-digital")}
                                >
                                    Lihat Produk Lainnya
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Form Dialog */}
            <Dialog
                open={openForm}
                onClose={handleCloseForm}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { borderRadius: "16px", m: { xs: 2, sm: 3 } } }}
            >
                {successData ? (
                    <Box sx={{ textAlign: "center" }}>
                        <Box sx={{ background: "linear-gradient(135deg, #00c853, #69f0ae)", py: { xs: 3, md: 4 } }}>
                            <CheckCircle sx={{ fontSize: { xs: 48, md: 60 }, color: "#fff" }} />
                            <Typography sx={{ color: "#fff", fontWeight: 700, mt: 1, fontSize: { xs: "1.1rem", md: "1.35rem" } }}>
                                Pendaftaran Berhasil!
                            </Typography>
                        </Box>
                        <DialogContent sx={{ py: { xs: 3, md: 4 }, px: { xs: 3, md: 4 } }}>
                            <Avatar
                                sx={{
                                    width: { xs: 56, md: 70 },
                                    height: { xs: 56, md: 70 },
                                    backgroundColor: "#d61355",
                                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                                    fontWeight: 600,
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                {successData.nama?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Typography sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: "0.95rem", md: "1.1rem" } }}>
                                Halo, {successData.nama}!
                            </Typography>
                            <Typography sx={{ color: "text.secondary", display: "block", mb: 3, fontSize: { xs: "0.8rem", md: "0.95rem" } }}>
                                Anda telah terdaftar. Klik tombol di bawah untuk mengunduh produk digital.
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleGetFreeProduct}
                                sx={{
                                    background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                    py: { xs: 1.25, md: 1.5 },
                                    fontWeight: 600,
                                    fontSize: { xs: "0.9rem", md: "1rem" },
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    "&:hover": { background: "linear-gradient(90deg, #b50d44, #ff5252)" },
                                }}
                            >
                                Download Produk
                            </Button>
                            <Button variant="text" onClick={handleCloseForm} sx={{ mt: 1.5, color: "#666", fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                                Tutup
                            </Button>
                        </DialogContent>
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                background: "linear-gradient(135deg, #d61355, #ff6b6b)",
                                py: { xs: 2, md: 2.5 },
                                px: { xs: 2.5, md: 3 },
                                position: "relative",
                            }}
                        >
                            <IconButton
                                onClick={handleCloseForm}
                                sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
                                size="small"
                            >
                                <Close fontSize="small" />
                            </IconButton>
                            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: { xs: "1rem", md: "1.25rem" } }}>
                                Dapatkan Produk
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: { xs: "0.75rem", md: "0.9rem" } }}>
                                Isi data diri untuk mendapatkan produk digital ini
                            </Typography>
                        </Box>
                        <DialogContent sx={{ py: { xs: 2, md: 3 }, px: { xs: 2.5, md: 3 } }}>
                            {formError && (
                                <Alert severity="error" sx={{ mb: 2, py: 0.5, borderRadius: "8px", fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                                    {formError}
                                </Alert>
                            )}
                            <Box component="form" onSubmit={handleSubmitForm}>
                                {[
                                    { name: "nama", label: "Nama Lengkap", icon: <Person />, type: "text" },
                                    { name: "email", label: "Email", icon: <Email />, type: "email" },
                                    { name: "no_hp", label: "No. WhatsApp", icon: <Phone />, type: "tel" },
                                    { name: "domisili", label: "Kota", icon: <LocationOn />, type: "text" },
                                    { name: "nama_bisnis", label: "Nama Bisnis/Usaha", icon: <Business />, type: "text" },
                                    { name: "sektor_bisnis", label: "Bidang Usaha", icon: <Category />, type: "text" },
                                ].map((field) => (
                                    <TextField
                                        key={field.name}
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        value={formData[field.name]}
                                        onChange={handleInputChange}
                                        required
                                        size={isMobile ? "small" : "medium"}
                                        margin="dense"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {React.cloneElement(field.icon, { sx: { color: "#d61355", fontSize: { xs: 18, md: 22 } } })}
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px",
                                                fontSize: { xs: "0.875rem", md: "1rem" },
                                                "&.Mui-focused fieldset": { borderColor: "#d61355" },
                                            },
                                            "& .MuiInputLabel-root": { fontSize: { xs: "0.875rem", md: "1rem" } },
                                            "& .MuiInputLabel-root.Mui-focused": { color: "#d61355" },
                                        }}
                                    />
                                ))}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={formLoading}
                                    sx={{
                                        mt: { xs: 2, md: 3 },
                                        background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                        py: { xs: 1.25, md: 1.5 },
                                        fontWeight: 600,
                                        fontSize: { xs: "0.9rem", md: "1rem" },
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        "&:hover": { background: "linear-gradient(90deg, #b50d44, #ff5252)" },
                                        "&:disabled": { background: "#ccc" },
                                    }}
                                >
                                    {formLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Dapatkan Produk"}
                                </Button>
                            </Box>
                            <Typography sx={{ display: "block", textAlign: "center", mt: 2, color: "#999", fontSize: { xs: "0.7rem", md: "0.8rem" } }}>
                                🔒 Data Anda aman dan tidak akan dibagikan
                            </Typography>
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </Box>
    );
};

export default ProdukDigitalDetail;
