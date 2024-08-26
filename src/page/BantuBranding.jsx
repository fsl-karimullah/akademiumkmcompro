import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  SentimentVeryDissatisfied,
  Celebration,
  ShoppingCart,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import heroImage from "../../public/branding.png";
import sosmedImage from "../../public/mahal.png";
import brandingImg1 from "../../public/branding.png";
import brandingImg2 from "../../public/rebranding-bro.png";
import Navbar from "../components/Navbar";

const BantuBranding = ({ currentPath }) => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    const message = encodeURIComponent(`Halo kak, saya ingin konsultasi`);
    window.open(`https://wa.me/6285281252199?text=${message}`, "_blank");
  };

  const handleWhatsAppClick = (packetNumber) => {
    const message = encodeURIComponent(
      `Halo kak, saya ingin mengetahui tentang paket ${packetNumber}`
    );
    window.open(`https://wa.me/6285281252199?text=${message}`, "_blank");
  };
  const handleWhatsAppClickWebsite = (title) => {
    const message = encodeURIComponent(
      `Halo kak, saya ingin mengetahui tentang branding website ${title} dengan menggunakan kode BRANDINWEBSITE untuk harga spesial Rp. 500.000`
    );
    window.open(`https://wa.me/6285281252199?text=${message}`, "_blank");
  };

  const packetCards = [
    {
      title: "Paket 1: Basic Branding",
      price: "Mulai dari IDR 300.000",
      oldPrice: "IDR 600.000",
      discount: "50%",
      yearlyPrice: "IDR 100.000",
      packetNumber: "1",
      features: {
        available: [
          "Free 10 Konten (Desain) Instagram",
          "Instagram Feed / Story",
          "Poster",
        ],
        unavailable: [
          "Design & Management",
          "Video Tiktok",
          "Instagram Reels",
          "Admin Setting & Bio Setting",
          "Admin Posting & Bio Settings",
        ],
      },
    },
    {
      title: "Paket 2: Branding Silver",
      price: "Mulai dari IDR 599.000",
      oldPrice: "IDR 749.000",
      discount: "20%",
      yearlyPrice: "IDR 150.000",
      packetNumber: "2",
      features: {
        available: [
          "Free 20 Konten (Desain) Instagram",
          "Instagram Feeds",
          "Instagram & Tiktok Story",
          "Poster",
          "Instagram Reels",
          "Video Tiktok",
        ],
        unavailable: [
          "Website Company Profile",
          "Admin Setting & Bio Setting",
          "Admin Posting & Bio Settings",
        ],
      },
    },
    {
      title: "Paket 3: Branding Premium",
      price: "Mulai dari IDR 1.599.000",
      oldPrice: "IDR 2.299.000",
      discount: "30%",
      yearlyPrice: "IDR 300.000",
      packetNumber: "3",
      features: {
        available: [
          "Website dengan hosting dan domain premium",
          "Template custom",
          "Desain logo",
          "Optimasi SEO lanjutan",
          "Integrasi dengan media sosial",
          "Admin Posting & Bio Settings",
          "Video Tiktok & Instagram Reels",
          "Ads Instagram & Tiktok (Boost Post)",
        ],
        unavailable: [],
      },
    },
  ];

  const socialMediaPackets = [
    {
      title: "Paket Pemasaran Sosmed - Gambar",
      price: "IDR 5.000 per GAMBAR",
      oldPrice: "IDR 10.000",
      discount: "50%",
      platform: "Tiktok & Instagram",
      packetNumber: "sosmed1",
      features: {
        available: [
          "Desain gambar menarik",
          "Caption sesuai dengan brand",
          "Optimasi hashtag",
          "Post scheduling",
        ],
        unavailable: [],
      },
    },
    {
      title: "Paket Pemasaran Sosmed - Video",
      price: "IDR 40.000 per VIDEO",
      oldPrice: "IDR 100.000",
      discount: "60%",
      platform: "TikTok & Instagram",
      packetNumber: "sosmed2",
      features: {
        available: [
          "Produksi video kreatif",
          "Caption sesuai dengan brand",
          "Optimasi hashtag",
          "Post scheduling",
        ],
        unavailable: [],
      },
    },
  ];

  const mostPopularIndex = 1;

  return (
    <Box>
      <Navbar currentPath={currentPath} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              animation: "fadeIn 1s ease-in-out",
              "@media (max-width: 600px)": {
                fontSize: "2.5rem",
              },
            }}
          >
            Ingin Branding?
          </Typography>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{
              fontSize: "1.25rem",
              animation: "fadeIn 1.5s ease-in-out",
              "@media (max-width: 600px)": {
                fontSize: "1rem",
              },
            }}
          >
            Serahkan masalah <strong>BRANDING</strong> Anda kepada kami
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReturnHome}
            sx={{
              mt: 2,
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              backgroundColor: "var(--themeRed)",
              "&:hover": {
                backgroundColor: "var(--themeRedHover)",
              },
              animation: "fadeIn 2s ease-in-out",
              "@media (max-width: 600px)": {
                padding: "0.5rem 1.5rem",
                fontSize: "0.9rem",
              },
            }}
          >
            Konsultasi
          </Button>
        </Container>
      </Box>

      <Box sx={{ padding: "4rem 0", backgroundColor: "#f9f9f9" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            {/* Section 1: Branding with Social Media */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
                alt="Branding with Social Media Image"
                src={brandingImg1}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  animation: "fadeIn 1s ease-in-out",
                  "@media (max-width: 600px)": {
                    fontSize: "2rem",
                  },
                }}
              >
                Apa itu Branding dengan Sosial Media?
              </Typography>
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  marginBottom: "2rem",
                  animation: "fadeIn 1.5s ease-in-out",
                  "@media (max-width: 600px)": {
                    fontSize: "1rem",
                  },
                }}
              >
                Branding dengan sosial media adalah strategi untuk
                memperkenalkan dan membangun citra bisnis Anda melalui platform
                sosial media seperti Instagram, Facebook, dan TikTok. Ini
                membantu dalam menjangkau audiens yang lebih luas, membangun
                hubungan yang lebih dekat dengan pelanggan, dan meningkatkan
                kepercayaan serta kesadaran terhadap merek Anda.
              </Typography>
            </Grid>

            {/* Section 2: Importance for UMKM */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  animation: "fadeIn 1s ease-in-out",
                  "@media (max-width: 600px)": {
                    fontSize: "2rem",
                  },
                }}
              >
                Kenapa Penting untuk UMKM?
              </Typography>
              <Typography
                variant="body1"
                component="p"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontSize: "1.25rem",
                  marginBottom: "2rem",
                  animation: "fadeIn 1.5s ease-in-out",
                  "@media (max-width: 600px)": {
                    fontSize: "1rem",
                  },
                }}
              >
                Untuk UMKM, branding dengan sosial media adalah alat yang sangat
                efektif dan efisien untuk memasarkan produk dan layanan tanpa
                memerlukan biaya besar. Ini membantu UMKM bersaing dengan
                perusahaan besar, menarik pelanggan baru, dan mempertahankan
                pelanggan lama melalui konten yang menarik dan interaktif.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
                alt="Importance for UMKM Image"
                src={brandingImg2}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ padding: "4rem 0", backgroundColor: "#fff" }}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "1rem",
              animation: "fadeIn 1s ease-in-out",
            }}
          >
            Layanan Kami
          </Typography>
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            sx={{
              textAlign: "center",
              fontSize: "1.25rem",
              marginBottom: "2rem",
              animation: "fadeIn 1.5s ease-in-out",
            }}
          >
            Kami menawarkan berbagai layanan untuk membantu kebutuhan branding
            Anda.
          </Typography>
          <Grid container spacing={4}>
            {packetCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    boxShadow:
                      index === mostPopularIndex
                        ? "0 0 15px rgba(0, 0, 0, 0.3)"
                        : "none",
                    border:
                      index === mostPopularIndex
                        ? "2px solid var(--themeRed)"
                        : "2px solid var(--themeBlack)",
                    animation: "fadeIn 2s ease-in-out",
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      {index === mostPopularIndex && (
                        <Paper
                          sx={{
                            backgroundColor: "var(--themeRed)",
                            color: "white",
                            padding: "4px 16px",
                            borderRadius: 1,
                            mb: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="subtitle2" component="h3">
                            Terlaris !
                          </Typography>
                        </Paper>
                      )}
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{ textAlign: "center" }}
                        gutterBottom
                      >
                        {card.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            textDecoration: "line-through",
                            fontSize: "0.875rem",
                            mb: 1,
                            textAlign: "center",
                          }}
                        >
                          {card.oldPrice}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "var(--themeRed)", textAlign: "center" }}
                          gutterBottom
                        >
                          {card.price}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Diskon {card.discount}
                        </Typography>
                        {/* <Typography variant="body1" gutterBottom>
                          Perpanjang setiap tahun: {card.yearlyPrice}
                        </Typography> */}
                      </Box>
                      <List>
                        {card.features.available.map((feature, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CheckCircle color="success" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                        {card.features.unavailable.map((feature, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <Cancel color="error" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "var(--themeRed)",
                          mt: 2,
                          borderRadius: "8px",
                        }}
                        onClick={() => handleWhatsAppClick(card.packetNumber)}
                      >
                        Hubungi via WhatsApp
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          Paket Branding Website
        </Typography>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: "1.25rem",
            marginBottom: "2rem",
            animation: "fadeIn 1.5s ease-in-out",
          }}
        >
          Pilih Template Website yang anda inginkan.
        </Typography>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: "1.25rem",
            marginBottom: "2rem",
            animation: "fadeIn 1.5s ease-in-out",
            color: "red",
          }}
        >
          Gunakan Kode Voucher "BRANDINMERDEKA" Untuk Mendapatkan Harga Spesial
          500.000 Termurah se indonesia!
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Simple Company Profile Jasa",
              desc: "Website company profile simpel cocok untuk berbagai macam bisnis",
              imgSrc:
                "https://raw.githubusercontent.com/fsl-karimullah/my-img-source/main/website-1.png",
              url: "https://company-v2.vercel.app",
            },
            {
              title: "Simple Company Profile Manufaktur Tech",
              desc: "Website company profile simpel cocok untuk bisnis manufaktur",
              imgSrc:
                "https://raw.githubusercontent.com/fsl-karimullah/my-img-source/main/website-2.png",
              url: "https://fsl-karimullah.github.io/Company-Tech/",
            },
            {
              title: "Simple Portofolio",
              desc: "Website portofolio yang cocok untuk perusahaan perorangan",
              imgSrc:
                "https://raw.githubusercontent.com/fsl-karimullah/my-img-source/main/website-3.png",
              url: "https://fsl-karimullah.github.io/porto/",
            },
          ].map((template, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <img
                      style={{
                        width: "100%",
                        height: 200,
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "16px",
                      }}
                      alt={`Thumbnail for ${template.title}`}
                      src={template.imgSrc}
                    />

                    <Typography variant="h5" component="h3" gutterBottom>
                      {template.title}
                    </Typography>
                    <Typography variant="body1" component="p" gutterBottom>
                      {template.desc}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "var(--themeRed)",
                          marginRight: 1,
                          minWidth: 50,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() =>
                          handleWhatsAppClickWebsite(template.title)
                        }
                      >
                        <ShoppingCart
                          sx={{
                            fontSize: { xs: 20, md: 20 },
                            color: "white",
                          }}
                        />
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "var(--themeBlack)",
                          minWidth: 50,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => window.open(template.url, "_blank")}
                      >
                        <Visibility
                          sx={{
                            fontSize: { xs: 20, md: 20 },
                            color: "white",
                          }}
                        />
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <SentimentVeryDissatisfied
                  sx={{ fontSize: { xs: 30, md: 40 }, color: "red", mr: 1 }}
                />
                <Typography
                  variant="h4"
                  component="p"
                  gutterBottom
                  sx={{
                    "@media (max-width: 600px)": {
                      fontSize: "1.75rem",
                    },
                  }}
                >
                  Masih kemahalan?
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Celebration
                  sx={{ fontSize: { xs: 30, md: 40 }, color: "green", mr: 1 }}
                />
                <Typography
                  variant="h4"
                  component="p"
                  gutterBottom
                  sx={{
                    "@media (max-width: 600px)": {
                      fontSize: "1.75rem",
                    },
                  }}
                >
                  Jangan khawatir! Kami menyediakan layanan untuk UMKM menengah
                  ke bawah.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
                alt="Social Media Management Image"
                src={sosmedImage}
              />
            </Grid>
          </Grid>

          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: "center", fontWeight: "bold", mt: 4, mb: 2 }}
          >
            Paket Pemasaran Sosial Media
          </Typography>

          <Grid container spacing={4}>
            {socialMediaPackets.map((packet, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ borderRadius: "16px" }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {packet.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            textDecoration: "line-through",
                            fontSize: "0.875rem",
                            mb: 1,
                          }}
                        >
                          {packet.oldPrice}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{ color: "var(--themeRed)" }}
                          gutterBottom
                        >
                          {packet.price}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Diskon {packet.discount}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          Platform: {packet.platform}
                        </Typography>
                      </Box>
                      <List>
                        {packet.features.available.map((feature, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <CheckCircle color="success" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                        {packet.features.unavailable.map((feature, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              <Cancel color="error" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "var(--themeRed)",
                          mt: 2,
                          borderRadius: "8px",
                        }}
                        onClick={() => handleWhatsAppClick(packet.packetNumber)}
                      >
                        Hubungi via WhatsApp
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BantuBranding;
