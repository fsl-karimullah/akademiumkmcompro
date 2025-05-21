import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/style/heroimage.css";

const images = ["/banner/1.webp", "/banner/2.webp", "/banner/3.webp"];

const HeroImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    customPaging: () => <div className="dot-bar" />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <div
              className="w-full h-[280px] sm:h-[340px] md:h-[440px] lg:h-[540px] bg-center bg-contain sm:bg-cover bg-no-repeat relative"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroImage;
