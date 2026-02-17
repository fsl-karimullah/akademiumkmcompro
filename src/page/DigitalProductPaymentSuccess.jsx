import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    CheckCircle,
    Error as ErrorIcon,
    Download,
    Pending,
} from "@mui/icons-material";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";

const DigitalProductPaymentSuccess = ({ currentPath }) => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaymentStatus = async () => {
            if (!orderId) {
                setError("Order ID tidak ditemukan");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(endpoint.checkDigitalProductPayment(orderId));
                if (response.data.success) {
                    setPaymentData(response.data.data);
                } else {
                    setError(response.data.message || "Gagal memuat status pembayaran");
                }
            } catch (err) {
                setError("Gagal memuat status pembayaran");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentStatus();

        // Poll every 5 seconds if status is pending
        const interval = setInterval(fetchPaymentStatus, 5000);
        return () => clearInterval(interval);
    }, [orderId]);

    const getStatusDisplay = () => {
        if (!paymentData) return null;

        switch (paymentData.status) {
            case "success":
                return {
                    icon: <CheckCircle sx={{ fontSize: 80, color: "#00c853" }} />,
                    title: "Pembayaran Berhasil!",
                    subtitle: "Terima kasih! Produk digital siap diunduh.",
                    color: "#00c853",
                    showAccessButton: true,
                };
            case "pending":
                return {
                    icon: <Pending sx={{ fontSize: 80, color: "#ff9800" }} />,
                    title: "Menunggu Pembayaran",
                    subtitle: "Silakan selesaikan pembayaran Anda untuk mengunduh produk.",
                    color: "#ff9800",
                    showAccessButton: false,
                };
            case "expired":
                return {
                    icon: <ErrorIcon sx={{ fontSize: 80, color: "#f44336" }} />,
                    title: "Pembayaran Kadaluarsa",
                    subtitle: "Link pembayaran sudah kadaluarsa. Silakan beli ulang.",
                    color: "#f44336",
                    showAccessButton: false,
                };
            case "failed":
            case "cancelled":
                return {
                    icon: <ErrorIcon sx={{ fontSize: 80, color: "#f44336" }} />,
                    title: "Pembayaran Gagal",
                    subtitle: "Pembayaran tidak berhasil. Silakan coba lagi.",
                    color: "#f44336",
                    showAccessButton: false,
                };
            default:
                return {
                    icon: <Pending sx={{ fontSize: 80, color: "#666" }} />,
                    title: "Status Tidak Diketahui",
                    subtitle: "Silakan hubungi admin.",
                    color: "#666",
                    showAccessButton: false,
                };
        }
    };

    const handleDownloadProduct = () => {
        if (paymentData?.product_link) {
            window.open(paymentData.product_link, "_blank");
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
                <Box sx={{ textAlign: "center" }}>
                    <CircularProgress sx={{ color: "#d61355" }} size={50} />
                    <Typography sx={{ mt: 2, color: "#666" }}>
                        Memeriksa status pembayaran...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
                <Navbar currentPath={currentPath} />
                <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/produk-digital")}
                        sx={{
                            backgroundColor: "#d61355",
                            "&:hover": { backgroundColor: "#b50d44" },
                        }}
                    >
                        Kembali ke Produk Digital
                    </Button>
                </Container>
            </Box>
        );
    }

    const status = getStatusDisplay();

    return (
        <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <Navbar currentPath={currentPath} />
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Card sx={{ borderRadius: "16px", overflow: "hidden", boxShadow: 3 }}>
                    <Box
                        sx={{
                            background: `linear-gradient(135deg, ${status.color}, ${status.color}99)`,
                            py: 4,
                            textAlign: "center",
                        }}
                    >
                        {status.icon}
                    </Box>
                    <CardContent sx={{ textAlign: "center", py: 4, px: 3 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, mb: 1, color: "#333" }}
                        >
                            {status.title}
                        </Typography>
                        <Typography sx={{ color: "#666", mb: 3 }}>
                            {status.subtitle}
                        </Typography>

                        {paymentData?.product_title && (
                            <Box
                                sx={{
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "12px",
                                    p: 2,
                                    mb: 3,
                                }}
                            >
                                <Typography sx={{ fontWeight: 600, color: "#333", mb: 0.5 }}>
                                    {paymentData.product_title}
                                </Typography>
                                <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                                    Order ID: {paymentData.order_id}
                                </Typography>
                            </Box>
                        )}

                        {status.showAccessButton && paymentData?.product_link && (
                            <Button
                                variant="contained"
                                fullWidth
                                startIcon={<Download />}
                                onClick={handleDownloadProduct}
                                sx={{
                                    background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                    py: 1.5,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    mb: 2,
                                    "&:hover": {
                                        background: "linear-gradient(90deg, #b50d44, #ff5252)",
                                    },
                                }}
                            >
                                Download Produk
                            </Button>
                        )}

                        {paymentData?.status === "pending" && paymentData?.payment_link && (
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => (window.location.href = paymentData.payment_link)}
                                sx={{
                                    background: "linear-gradient(90deg, #d61355, #ff6b6b)",
                                    py: 1.5,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    mb: 2,
                                    "&:hover": {
                                        background: "linear-gradient(90deg, #b50d44, #ff5252)",
                                    },
                                }}
                            >
                                Lanjutkan Pembayaran
                            </Button>
                        )}

                        <Button
                            variant="text"
                            onClick={() => navigate("/produk-digital")}
                            sx={{ color: "#666" }}
                        >
                            Kembali ke Produk Digital
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default DigitalProductPaymentSuccess;
