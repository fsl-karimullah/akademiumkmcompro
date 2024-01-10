import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowRightRounded } from "@mui/icons-material";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "red", borderRadius: "50%" }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "red", borderRadius: "50%" }} onClick={onClick} />;
}

const CardMenu = React.memo(({ news }) => {
  const settings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="text-white flex flex-row w-full h-full justify-center items-center">
      <Slider
        {...settings}
        style={{
          width: "80%",
          margin: "10px 0px",
        }}
      >
        {news.map((item, index) => (
          <div key={index} className="border-4 border-[var(--pink)] relative h-[250px] rounded-[40px] overflow-hidden">
            <img src={`${item.img}`} alt="" className="w-full h-full object-cover " />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-justify bg-gradient-to-t from-black to-transparent flex flex-col justify-center gap-2">
              <h1 className="text-xl text-left text-slate-200">{item.title}</h1>
              <span className="text-white text-left">
                <b className="text-sm text-orange-400">$ </b>
                {item.price}
              </span>
              <div>
                <button className="btnMenu text-sm">Order Now</button>
                <ArrowRightRounded style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default CardMenu;
