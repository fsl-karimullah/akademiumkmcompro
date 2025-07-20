import React from "react";
import Slider from "react-slick";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/style/heroimage.css";

const images = [
  {
    url: "/images/banner1.png",
    link: "http://lynk.id/sixeyesdigitalproduct/7mz5j1rmyvro/checkout",
  },
];

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => <div className="dot-bar" />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {images.map((item, idx) => (
          <div key={idx} className="relative w-full">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="w-full h-[220px] sm:h-[350px] md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden bg-black">
                <img
                  src={item.url}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroImage;
