import React, { Component } from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "black", borderRadius: "50%" }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "black", borderRadius: "50%" }} onClick={onClick} />;
}

const OurClient = ({ currentPath }) => {
  const Clients = ["glazestore.webp", "colosseum.webp", "donatnumnum.webp"];
  const reversedClients = [...Clients].reverse();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const testimonials = [
    {
      content: "Kinerja HR, manajemen, dll sudah baik, dan sudah sangat membantu perusahaan. Untuk saat ini kandidat sangat banyak dan kompeten. Semoga KitaLulus semakin menjaya.",
      name: "Suni Putri",
      position: "HRD PT. Mandiri Andalan Utama",
    },
    {
      content: "Kinerja HR, manajemen, dll sudah baik, dan sudah sangat membantu perusahaan. Untuk saat ini kandidat sangat banyak dan kompeten. Semoga KitaLulus semakin menjaya.",
      name: "Suni Putri",
      position: "HRD PT. Mandiri Andalan Utama",
    },
    {
      content: "Kinerja HR, manajemen, dll sudah baik, dan sudah sangat membantu perusahaan. Untuk saat ini kandidat sangat banyak dan kompeten. Semoga KitaLulus semakin menjaya.",
      name: "Suni Putri",
      position: "HRD PT. Mandiri Andalan Utama",
    },
  ];

  const TestimonialCard = ({ content, name, position }) => (
    <div className="flex flex-col items-center justify-center text-center">
      <span className="text-xl md:text-2xl">{content}</span>
      <h3 className="text-xl md:text-2xl font-bold my-8">{name}</h3>
      <p className="text-xl md:text-2xl mb-24">{position}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {currentPath === "/" ? (
        <>
          <div className="text-[18px] font-semibold text-black text-center gap-4">
            <h1>Telah dipercaya membantu</h1>
            <h1>
              <span className="text-[var(--themeRed)]">100+ </span>perusahaan ternama
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {reversedClients.map((client, index) => (
              <div key={index} className="w-64">
                <img src={client} alt="" className="w-full" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-16 items-center justify-center p-10 md:p-0 ">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Kata Mereka Tentang Pasang Loker <br />
            Gratis di KitaLulus
          </h1>

          <Slider
            {...settings}
            style={{
              width: "100%",
              margin: "center",
              marginBottom: "100px",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div className="flex flex-col items-center justify-center text-center">
                <TestimonialCard key={index} content={testimonial.content} name={testimonial.name} position={testimonial.position} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default OurClient;
