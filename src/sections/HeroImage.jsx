import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/style/heroimage.css";
import { endpoint } from "../endpoint/api";

const CACHE_KEY = "banners_cache";
const CACHE_TTL = 30 * 60 * 1000; // 30 menit

const getCachedBanners = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
    }
  } catch (e) {
    // ignore parse errors
  }
  return null;
};

const setCachedBanners = (data) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch (e) {
    // ignore storage errors
  }
};

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
    onClick={onClick}
    aria-label="Previous Slide"
  >
    <ArrowBackIosNewIcon style={{ fontSize: 18, color: "#333" }} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
    onClick={onClick}
    aria-label="Next Slide"
  >
    <ArrowForwardIosIcon style={{ fontSize: 18, color: "#333" }} />
  </button>
);

const HeroImage = () => {
  // Load from cache first (instant), then fetch fresh data in background
  const [banners, setBanners] = useState(() => getCachedBanners() || []);

  useEffect(() => {
    fetch(endpoint.getBanners)
      .then((res) => res.json())
      .then((data) => {
        const items = data.data || [];
        setBanners(items);
        setCachedBanners(items);
      })
      .catch(() => { });
  }, []);

  if (banners.length === 0) return null;

  const settings = {
    dots: true,
    infinite: banners.length > 1,
    speed: 600,
    autoplay: banners.length > 1,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: banners.length > 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => <div className="dot-bar" />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={banner.id || idx} className="relative w-full">
            {banner.link ? (
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                <div className="w-full h-[220px] sm:h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden bg-black">
                  <img
                    src={banner.image}
                    alt={banner.title || `Slide ${idx + 1}`}
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                </div>
              </a>
            ) : (
              <div className="w-full h-[220px] sm:h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden bg-black">
                <img
                  src={banner.image}
                  alt={banner.title || `Slide ${idx + 1}`}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroImage;
