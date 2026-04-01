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
    EventAvailable,
    Verified,
    AccessTime,
    Groups,
    EmojiEvents,
    Close,
    CalendarMonth,
    VideoCall,
    ConfirmationNumber,
} from "@mui/icons-material";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WebinarDetail = ({ currentPath }) => {
    const { id } = useParams();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [webinar, setWebinar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Form State
    const [openForm, setOpenForm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);
    const [successData, setSuccessData] = useState(null);
    const [paymentData, setPaymentData] = useState(null); // For paid webinar payment link
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        no_hp: "",
        domisili: "",
        nama_bisnis: "",
        sektor_bisnis: "",
    });

    // Voucher State
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherData, setVoucherData] = useState(null);
    const [voucherLoading, setVoucherLoading] = useState(false);
    const [voucherError, setVoucherError] = useState(null);

    useEffect(() => {
        const fetchWebinarDetail = async () => {
            try {
                const response = await axios.get(endpoint.getWebinarsById(id));
                setWebinar(response.data.data);
            } catch (error) {
                setError("Gagal memuat data webinar.");
                toast.error("Gagal memuat data webinar");
            } finally {
                setLoading(false);
            }
        };
        fetchWebinarDetail();
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
            const isPaid = Boolean(webinar?.is_payment) || Number(webinar?.price) > 0;

            // Check if this is a paid webinar
            if (isPaid) {
                // Call Ayolinx payment endpoint with voucher_code
                const payload = { ...formData };
                if (voucherData && voucherCode) {
                    payload.voucher_code = voucherCode;
                }
                const response = await axios.post(endpoint.payWebinar(id), payload);

                if (response.data.success) {
                    setPaymentData(response.data.data);
                    toast.success("Link pembayaran berhasil dibuat!");
                } else {
                    setFormError(response.data.message || "Gagal membuat link pembayaran");
                }
            } else {
                // Free webinar - use existing form pendaftaran
                const response = await axios.post(endpoint.postFormPendaftaran, {
                    ...formData,
                    webinar_id: parseInt(id),
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
        setPaymentData(null);
        setFormData({
            nama: "",
            email: "",
            no_hp: "",
            domisili: "",
            nama_bisnis: "",
            sektor_bisnis: "",
        });
        setVoucherCode("");
        setVoucherData(null);
        setVoucherError(null);
    };

    const handleValidateVoucher = async () => {
        if (!voucherCode.trim()) {
            setVoucherError("Masukkan kode voucher");
            return;
        }
        setVoucherLoading(true);
        setVoucherError(null);
        setVoucherData(null);
        try {
            const response = await axios.post(endpoint.validateVoucher, {
                code: voucherCode.trim(),
                webinar_id: parseInt(id),
            });
            if (response.data.success) {
                setVoucherData(response.data.data);
                toast.success(`Voucher "${response.data.data.voucher_name}" berhasil diterapkan!`);
            } else {
                setVoucherError(response.data.message || "Voucher tidak valid");
            }
        } catch (error) {
            setVoucherError(
                error.response?.data?.message || "Gagal memvalidasi voucher"
            );
        } finally {
            setVoucherLoading(false);
        }
    };

    const handleRemoveVoucher = () => {
        setVoucherCode("");
        setVoucherData(null);
        setVoucherError(null);
    };

    const handleGoToPayment = () => {
        if (paymentData?.payment_link) {
            window.location.href = paymentData.payment_link;
        }
    };

    const handleGetFreeProduct = () => {
        if (successData?.link_pendaftaran_gratis) {
            window.open(successData.link_pendaftaran_gratis, "_blank");
        }
    };

    // Format currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
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
                        onClick={() => navigate("/event")}
                    >
                        Kembali
                    </Button>
                </Container>
            </Box>
        );
    }

    const isPaid = Boolean(webinar?.is_payment) || Number(webinar?.price) > 0;
    const isGratis = webinar && !isPaid;

    const benefits = [
        { icon: <EmojiEvents sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Materi Eksklusif" },
        { icon: <Verified sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Sertifikat" },
        { icon: <Groups sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Networking" },
        { icon: <AccessTime sx={{ fontSize: { xs: 14, md: 18 } }} />, text: "Dokumentasi" },
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
                            to="/event"
                            sx={{ color: "rgba(255,255,255,0.9)", textDecoration: "none", fontSize: { xs: "0.8rem", md: "0.95rem" } }}
                        >
                            Event
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
                                    icon={<EventAvailable sx={{ color: "#fff !important", fontSize: { xs: 14, md: 18 } }} />}
                                    label="EVENT GRATIS"
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
                                {webinar?.title}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "rgba(255,255,255,0.9)",
                                    fontSize: { xs: "0.85rem", md: "1.1rem" },
                                    mb: { xs: 2, md: 3 },
                                }}
                            >
                                Ikuti Event eksklusif dan tingkatkan skill bisnis Anda!
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
                                    Daftar Event Gratis
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
                                    Daftar Event
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
                                        src={webinar?.thumbnail || "https://via.placeholder.com/300x400.png?text=Webinar"}
                                        alt={webinar?.title}
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
                                    Tentang Event
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
                                    {webinar?.description ? parse(webinar.description) : "Deskripsi tidak tersedia."}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Why Join */}
                        <Card
                            sx={{
                                borderRadius: { xs: "12px", md: "16px" },
                                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                mt: { xs: 2, md: 3 },
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                                <Typography sx={{ fontWeight: 600, mb: { xs: 2, md: 3 }, color: "#333", fontSize: { xs: "0.9rem", md: "1.15rem" } }}>
                                    Kenapa Harus Ikut Event Ini?
                                </Typography>
                                <Grid container spacing={{ xs: 1.5, md: 2 }}>
                                    {[
                                        { icon: "🎯", title: "Materi Relevan", desc: "Topik sesuai kebutuhan bisnis" },
                                        { icon: "🤝", title: "Partner Baru", desc: "Bertemu pelaku usaha lain" },
                                        { icon: "🌐", title: "Networking", desc: "Perluas relasi bisnis" },
                                        { icon: "💬", title: "Grup Diskusi", desc: "Akses selamanya" },
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
                                    {isGratis ? "EVENT GRATIS" : "EVENT PREMIUM"}
                                </Typography>
                                <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: { xs: "0.75rem", md: "0.9rem" } }}>
                                    {isGratis ? "Kuota terbatas!" : "Investasi untuk bisnis Anda"}
                                </Typography>
                            </Box>

                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                {isGratis ? (
                                    <Alert
                                        severity="warning"
                                        icon={<CalendarMonth sx={{ fontSize: { xs: 16, md: 20 } }} />}
                                        sx={{
                                            mb: 2,
                                            py: { xs: 0.5, md: 1 },
                                            borderRadius: "8px",
                                            "& .MuiAlert-message": { fontSize: { xs: "0.75rem", md: "0.875rem" } },
                                        }}
                                    >
                                        Segera daftar, kuota terbatas!
                                    </Alert>
                                ) : (
                                    /* Voucher Input for paid events - in sidebar */
                                    <Box sx={{ mb: 2 }}>
                                        <Typography sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", md: "0.9rem" }, mb: 1 }}>
                                            🎟️ Punya Kode Voucher?
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <TextField
                                                size="small"
                                                placeholder="Masukkan kode"
                                                value={voucherCode}
                                                onChange={(e) => {
                                                    setVoucherCode(e.target.value.toUpperCase());
                                                    if (voucherData) handleRemoveVoucher();
                                                }}
                                                disabled={!!voucherData}
                                                sx={{
                                                    flex: 1,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        fontSize: { xs: "0.8rem", md: "0.9rem" },
                                                        "&.Mui-focused fieldset": { borderColor: "#d61355" },
                                                    },
                                                }}
                                            />
                                            {voucherData ? (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={handleRemoveVoucher}
                                                    sx={{
                                                        borderColor: "#dc2626",
                                                        color: "#dc2626",
                                                        borderRadius: "8px",
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        fontSize: { xs: "0.75rem", md: "0.8rem" },
                                                        minWidth: "auto",
                                                        px: 2,
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={handleValidateVoucher}
                                                    disabled={voucherLoading || !voucherCode.trim()}
                                                    sx={{
                                                        background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                                        borderRadius: "8px",
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        fontSize: { xs: "0.75rem", md: "0.8rem" },
                                                        minWidth: "auto",
                                                        px: 2,
                                                        "&:hover": { background: "linear-gradient(90deg, #b50d44, #ff5252)" },
                                                        "&:disabled": { background: "#ccc" },
                                                    }}
                                                >
                                                    {voucherLoading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : "Pakai"}
                                                </Button>
                                            )}
                                        </Box>
                                        {voucherError && (
                                            <Typography sx={{ color: "#dc2626", fontSize: { xs: "0.7rem", md: "0.8rem" }, mt: 0.5 }}>
                                                ❌ {voucherError}
                                            </Typography>
                                        )}
                                        {voucherData && (
                                            <Box sx={{
                                                mt: 1, p: 1.5, borderRadius: "8px",
                                                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                                                border: "1px solid #86efac",
                                            }}>
                                                <Typography sx={{ color: "#16a34a", fontWeight: 600, fontSize: { xs: "0.75rem", md: "0.85rem" } }}>
                                                    ✅ {voucherData.voucher_name}
                                                </Typography>
                                                <Typography sx={{ color: "#15803d", fontSize: { xs: "0.7rem", md: "0.8rem" } }}>
                                                    Diskon {voucherData.discount_type === 'nominal'
                                                        ? `Rp ${Number(voucherData.discount_value).toLocaleString('id-ID')}`
                                                        : `${voucherData.discount_value}%`
                                                    } — Hemat {formatPrice(voucherData.discount_amount)}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}

                                <Typography sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", md: "0.95rem" }, mb: 1 }}>
                                    Yang Anda Dapatkan:
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    {[
                                        "Materi Relevan",
                                        "Partner Baru",
                                        "Networking",
                                        "Grup Diskusi (Lifetime Access)",
                                        "Dokumentasi Digital (via WA Grup)",
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
                                        Daftar Event
                                    </Button>
                                ) : (
                                    <>
                                        {webinar?.price > 0 && (
                                            <Box sx={{ textAlign: "center", mb: 2 }}>
                                                {voucherData ? (
                                                    <>
                                                        <Typography sx={{ color: "#999", textDecoration: "line-through", fontSize: { xs: "1rem", md: "1.1rem" } }}>
                                                            {formatPrice(voucherData.original_price)}
                                                        </Typography>
                                                        <Typography sx={{ color: "#d61355", fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
                                                            {formatPrice(voucherData.final_price)}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography sx={{ color: "#d61355", fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
                                                        {formatPrice(webinar.price)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
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
                                            Daftar & Bayar Sekarang
                                        </Button>
                                    </>
                                )}

                                <Button
                                    variant="text"
                                    fullWidth
                                    sx={{ mt: 1.5, color: "#666", fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                                    onClick={() => navigate("/event")}
                                >
                                    Lihat Event Lainnya
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
                {paymentData ? (
                    <Box sx={{ textAlign: "center" }}>
                        <Box sx={{ background: "linear-gradient(135deg, #d61355, #ff6b6b)", py: { xs: 3, md: 4 } }}>
                            <CheckCircle sx={{ fontSize: { xs: 48, md: 60 }, color: "#fff" }} />
                            <Typography sx={{ color: "#fff", fontWeight: 700, mt: 1, fontSize: { xs: "1.1rem", md: "1.35rem" } }}>
                                Link Pembayaran Siap!
                            </Typography>
                        </Box>
                        <DialogContent sx={{ py: { xs: 3, md: 4 }, px: { xs: 3, md: 4 } }}>
                            <Typography sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: "0.95rem", md: "1.1rem" } }}>
                                Terima kasih!
                            </Typography>
                            <Typography sx={{ color: "text.secondary", display: "block", mb: 2, fontSize: { xs: "0.8rem", md: "0.95rem" } }}>
                                Klik tombol di bawah untuk melanjutkan ke halaman pembayaran.
                            </Typography>
                            <Box sx={{ backgroundColor: "#f8f9fa", p: 2, borderRadius: "10px", mb: 3 }}>
                                <Typography sx={{ color: "#333", fontWeight: 600, fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
                                    {formatPrice(paymentData.amount)}
                                </Typography>
                                <Typography sx={{ color: "#666", fontSize: { xs: "0.75rem", md: "0.85rem" } }}>
                                    Order ID: {paymentData.order_id}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleGoToPayment}
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
                                Lanjut ke Pembayaran
                            </Button>
                            <Button variant="text" onClick={handleCloseForm} sx={{ mt: 1.5, color: "#666", fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                                Batal
                            </Button>
                        </DialogContent>
                    </Box>
                ) : successData ? (
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
                                Anda telah terdaftar di webinar ini. Klik tombol di bawah untuk mengakses link webinar.
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
                                Akses Link Event
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
                                {webinar?.is_payment ? "Daftar & Bayar Event" : "Daftar Event"}
                            </Typography>
                            <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: { xs: "0.75rem", md: "0.9rem" } }}>
                                    {isPaid
                                        ? `Isi data diri untuk melanjutkan pembayaran ${voucherData ? formatPrice(voucherData.final_price) : formatPrice(webinar?.price || 0)}`
                                        : "Isi data diri untuk mendapatkan akses webinar gratis"}
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

                                {/* Voucher Input in Form Dialog (for paid events) */}
                                {isPaid && (
                                    <Box sx={{ mt: 2, p: 2, borderRadius: "10px", backgroundColor: "#fafafa", border: "1px dashed #e0e0e0" }}>
                                        <Typography sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", md: "0.9rem" }, mb: 1 }}>
                                            🎟️ Kode Voucher (Opsional)
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <TextField
                                                size="small"
                                                placeholder="Contoh: HEMAT"
                                                value={voucherCode}
                                                onChange={(e) => {
                                                    setVoucherCode(e.target.value.toUpperCase());
                                                    if (voucherData) handleRemoveVoucher();
                                                }}
                                                disabled={!!voucherData}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <ConfirmationNumber sx={{ color: "#d61355", fontSize: { xs: 18, md: 22 } }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{
                                                    flex: 1,
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                        fontSize: { xs: "0.85rem", md: "0.95rem" },
                                                        "&.Mui-focused fieldset": { borderColor: "#d61355" },
                                                    },
                                                }}
                                            />
                                            {voucherData ? (
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={handleRemoveVoucher}
                                                    sx={{
                                                        borderColor: "#dc2626",
                                                        color: "#dc2626",
                                                        borderRadius: "8px",
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        minWidth: "auto",
                                                        px: 2,
                                                    }}
                                                >
                                                    Hapus
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={handleValidateVoucher}
                                                    disabled={voucherLoading || !voucherCode.trim()}
                                                    sx={{
                                                        background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                                        borderRadius: "8px",
                                                        textTransform: "none",
                                                        fontWeight: 600,
                                                        minWidth: "auto",
                                                        px: 2,
                                                        "&:hover": { background: "linear-gradient(90deg, #b50d44, #ff5252)" },
                                                        "&:disabled": { background: "#ccc" },
                                                    }}
                                                >
                                                    {voucherLoading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : "Pakai"}
                                                </Button>
                                            )}
                                        </Box>
                                        {voucherError && (
                                            <Typography sx={{ color: "#dc2626", fontSize: { xs: "0.7rem", md: "0.8rem" }, mt: 0.5 }}>
                                                ❌ {voucherError}
                                            </Typography>
                                        )}
                                        {voucherData && (
                                            <Box sx={{
                                                mt: 1, p: 1.5, borderRadius: "8px",
                                                background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                                                border: "1px solid #86efac",
                                            }}>
                                                <Typography sx={{ color: "#16a34a", fontWeight: 600, fontSize: { xs: "0.75rem", md: "0.85rem" } }}>
                                                    ✅ {voucherData.voucher_name} diterapkan!
                                                </Typography>
                                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                                                    <Typography sx={{ color: "#666", fontSize: { xs: "0.7rem", md: "0.8rem" } }}>
                                                        Harga asli:
                                                    </Typography>
                                                    <Typography sx={{ color: "#999", textDecoration: "line-through", fontSize: { xs: "0.7rem", md: "0.8rem" } }}>
                                                        {formatPrice(voucherData.original_price)}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Typography sx={{ color: "#16a34a", fontSize: { xs: "0.7rem", md: "0.8rem" } }}>
                                                        Diskon:
                                                    </Typography>
                                                    <Typography sx={{ color: "#16a34a", fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.8rem" } }}>
                                                        - {formatPrice(voucherData.discount_amount)}
                                                    </Typography>
                                                </Box>
                                                <Divider sx={{ my: 0.5 }} />
                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Typography sx={{ color: "#15803d", fontWeight: 700, fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                                                        Total bayar:
                                                    </Typography>
                                                    <Typography sx={{ color: "#15803d", fontWeight: 700, fontSize: { xs: "0.8rem", md: "0.9rem" } }}>
                                                        {formatPrice(voucherData.final_price)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                )}

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
                                    {formLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Daftar Event"}
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

export default WebinarDetail;
