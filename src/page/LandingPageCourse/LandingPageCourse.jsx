import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  School,
  AccessTime,
  WorkspacePremium,
  Group,
  Code,
  Chat,
} from "@mui/icons-material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { endpoint } from "../../endpoint/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const materi = [
  "Mahir Affiliator",
  "Mahir Website",
  "Online Marketing",
  "Personal Branding",
  "Digital Marketing",
];

const mentorSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const benefitItems = [
  {
    icon: <School sx={{ fontSize: 40, color: "#d61355" }} />,
    title: "Belajar Praktis",
    desc: "Langsung praktik lewat project, bukan teori doang.",
  },
  {
    icon: <AccessTime sx={{ fontSize: 40, color: "#d61355" }} />,
    title: "Akses Selamanya",
    desc: "Belajar kapan aja, sesuai mood dan waktu kamu.",
  },
  {
    icon: <WorkspacePremium sx={{ fontSize: 40, color: "#d61355" }} />,
    title: "Sertifikat Resmi",
    desc: "Bisa kamu pajang di LinkedIn atau CV kamu sebagai penunjang.",
  },
  {
    icon: <Group sx={{ fontSize: 40, color: "#d61355" }} />,
    title: "Supportive Community",
    desc: "Temukan temen satu perjuangan, belajar bareng.",
  },
  {
    icon: <Code sx={{ fontSize: 40, color: "#d61355" }} />,
    title: "Mentor Berpengalaman",
    desc: "Langsung dibimbing mentor yang pernah ada di posisimu.",
  },
  {
    icon: <Chat sx={{ fontSize: 40, color: "#d61355" }} />,
    title: "Kesempatan Mentoring 1 on 1",
    desc: "Langsung dimentorin sama mentor yang berpengalaman.",
  },
];

const Section = ({ children, sx }) => (
  <Box sx={{ py: 10, ...sx }}>{children}</Box>
);

const LandingPageCourse = ({ currentPath }) => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(endpoint.getMentor);
        setMentors(response.data.data);
      } catch (error) {
        console.error("Error fetching mentor data", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      {/* HERO SECTION */}
      <Navbar currentPath={currentPath} />
      <Section
        sx={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(15,15,15,0.7), rgba(15,15,15,0.95)), url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                mb: 2,
                lineHeight: 1.3,
              }}
            >
              Bingung Hidup di Usia 20-an?
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#ccc", mb: 3, fontWeight: 300 }}
            >
              Masih belum tahu arah karier? Skill belum cukup? Tapi tekanan
              makin besar? Tenang, kamu nggak sendirian. ✨
            </Typography>
            <Typography variant="body1" color="#bbb" paragraph>
              Di sini kamu bisa belajar langsung dari mentor berpengalaman,
              bangun portofolio, dapetin sertifikat, dan pelan-pelan raih
              tujuanmu.
            </Typography>
            <Link
              to="/landing"
              style={{
                display: "inline-block",
                marginTop: 24,
                padding: "14px 40px",
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: 16,
                backgroundColor: "#d61355",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Ambil langkah sekarang, atau terus tertinggal
            </Link>
          </motion.div>
        </Container>
      </Section>

      {/* WHY CHOOSE US */}
      <Section>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Kenapa Belajar di Sini?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.primary"
            mb={6}
          >
            Karena kita tahu usia 20-an bukan cuma tentang pilihan karier, tapi
            juga tentang pencarian jati diri. Kami bantu kamu jadi versi
            terbaikmu.
          </Typography>
          <Grid container spacing={4}>
            {benefitItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 4,
                      borderRadius: 4,
                      boxShadow: 3,
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ minHeight: "48px" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flexGrow: 1 }}
                    >
                      {item.desc}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* MATERI */}
      <Section sx={{ backgroundColor: "#f9fafc" }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Materi Populer yang Bisa Kamu Pelajari
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Kurikulum yang relevan & langsung praktik. Disusun bareng praktisi
            industri.
          </Typography>
          <Grid container spacing={2} justifyContent="center" mt={2}>
            {materi.map((item, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    px: 4,
                    py: 2.5,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    minWidth: 160,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    align="center"
                  >
                    {item}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* MENTOR */}
      <Section sx={{ backgroundColor: "#f5f5f5" }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Kenalan Sama Mentor-Mentor Keren Kita
          </Typography>

          {mentors.length > 0 ? (
            <Slider
              {...mentorSettings}
              arrows={false}
              slidesToShow={3}
              centerMode={true}
              centerPadding="0"
              infinite={true}
              focusOnSelect={true}
            >
              {mentors.map((mentor) => (
                <Box
                  key={mentor.id}
                  className="mentor-slide"
                  sx={{
                    textAlign: "center",
                    p: 4,
                    transition: "all 0.4s ease",
                    "&.slick-center": {
                      transform: "scale(1.2)",
                      "& .mentor-name": {
                        color: "#000",
                        fontWeight: "bold",
                      },
                      "& .mentor-position": {
                        color: "#000",
                      },
                    },
                    transform: "scale(0.9)",
                    "& .mentor-name": {
                      color: "#000",
                    },
                    "& .mentor-position": {
                      color: "#000",
                    },
                  }}
                >
                  <Avatar
                    src={mentor.thumbnail}
                    alt={mentor.name}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "0 auto",
                      mb: 2,
                      border: "2px solid #d61355",
                    }}
                  />
                  <Typography className="mentor-name text-black" variant="h6">
                    {mentor.name}
                  </Typography>
                  <Typography className="mentor-position" variant="body2">
                    {mentor.position}
                  </Typography>
                </Box>
              ))}
            </Slider>
          ) : (
            <Typography align="center" color="text.secondary">
              Loading mentors...
            </Typography>
          )}
        </Container>
      </Section>

      {/* JOIN CTA */}
      <Section
        sx={{
          backgroundColor: "#d61355",
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Yuk, Mulai Investasi untuk Masa Depan Kamu
          </Typography>
          <Typography variant="body1" color="#ccc" paragraph>
            Kalau bukan sekarang, kapan lagi? Satu langkah kecil hari ini bisa
            jadi perubahan besar untuk masa depanmu.
          </Typography>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <Link
              to="/landing"
              style={{
                display: "inline-block",
                marginTop: 16,
                padding: "14px 32px",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 12,
                backgroundColor: "#fff",
                color: "#000",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
             Masih nunggu keajaiban? Yuk gerak!
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <School
              sx={{
                fontSize: 80,
                position: "absolute",
                top: 10,
                left: 20,
                color: "rgba(255, 255, 255, 0.2)",
              }}
            />
          </motion.div>
        </Container>
      </Section>
    </Box>
  );
};

export default LandingPageCourse;
