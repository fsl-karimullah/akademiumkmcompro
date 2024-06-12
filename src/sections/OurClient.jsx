import React, { Component } from "react";
import Slider from "react-slick";
import ClientListComponent from "../components/client/ClientList";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "black", borderRadius: "50%" }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "black", borderRadius: "50%" }} onClick={onClick} />;
}

const OurClient = ({ currentPath, reversedClients, Clients }) => {
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
      content: "Akhirnya bisnis saya bisa tampil di aplikasi sebagai branding baru yang simpel.",
      name: "Faruk Maulana",
      position: "CO Founder Sixeyes Technologies",
    },
    {
      content: "Alhamdulillah sixeyes bisa mendapatkan client pertama dengan mengiklankan di aplikasi brand-in.",
      name: "Amir Faisal K",
      position: "Co Founder Sixeyes Technologies",
    },
    {
      content: "Brand-in sangat membantu para pelaku UMKM termasuk usaha saya dalam memasarkan donat NumNum, dan yang lebih lebih terbantukan dimana pemasarannya tidak dipungut biaya sepersen pun alias GRATIS!!! Terima Kasih Brand-in atas kerjasama dan bantuannya sukses terus ya.",
      name: "Lia Indah Permatasari",
      position: "Owner Donat Num Num",
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
        <ClientListComponent pageType="/" clients={Clients} />
      ) : (
        <div className="flex flex-col gap-16 items-center justify-center p-10 md:p-0 ">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Kata Mereka Tentang Pasang Bisnis <br />
            Gratis di Brand-in Indonesia
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
