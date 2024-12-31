import React from "react";
import Slider from "react-slick";
import ClientListComponent from "../components/client/ClientList";
import StarIcon from "@mui/icons-material/Star";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#d61355",
        borderRadius: "50%",
        color: "white",
        fontSize: "20px",
        width: "40px",
        height: "40px",
      }}
      onClick={onClick}
    >
      ➡️
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#d61355",
        borderRadius: "50%",
        color: "white",
        fontSize: "20px",
        width: "40px",
        height: "40px",
      }}
      onClick={onClick}
    >
      ⬅️
    </div>
  );
}

// 📊 **Testimonials Data**
const testimonials = [
  {
    content:
      "Akhirnya bisnis saya bisa tampil di aplikasi sebagai branding baru yang simpel.",
    name: "Faruk Maulana",
    position: "CO Founder Sixeyes Technologies",
  },
  {
    content:
      "Alhamdulillah sixeyes bisa mendapatkan client pertama dengan mengiklankan di aplikasi brand-in.",
    name: "Amir Faisal K",
    position: "Co Founder Sixeyes Technologies",
  },
  {
    content:
      "Brand-in sangat membantu para pelaku UMKM termasuk usaha saya dalam memasarkan donat NumNum, dan yang lebih lebih terbantukan dimana pemasarannya tidak dipungut biaya sepersen pun alias GRATIS!!! Terima Kasih Brand-in atas kerjasama dan bantuannya sukses terus ya.",
    name: "Lia Indah Permatasari",
    position: "Owner Donat Num Num",
  },
];

// ✅ **Testimonial Card Component**
const TestimonialCard = ({ content, name, position }) => (
  <div className="flex flex-col items-center justify-center text-center gap-4 bg-white rounded-lg shadow-md p-6 md:p-8 hover:shadow-lg transition-transform transform hover:scale-105">
    <StarIcon style={{ color: "#FFD700", fontSize: "40px" }} />
    <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
      "{content}"
    </p>
    <h3 className="text-xl md:text-2xl font-bold text-[var(--themeRed)]">
      {name}
    </h3>
    <p className="text-sm md:text-base text-gray-600">{position}</p>
  </div>
);

// ✅ **Main Component**
const OurClient = ({ currentPath, Clients }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-6 py-10 px-6 md:px-16 bg-gray-50">
      {/* ✅ Conditional Rendering */}
      {currentPath === "/" ? (
        <ClientListComponent pageType="/" clients={Clients} />
      ) : (
        <div className="flex flex-col gap-12 items-center justify-center">
          {/* ✅ **Section Title** */}
          <h1 className="text-2xl md:text-4xl font-bold text-center text-[var(--themeRed)]">
            Kata Mereka Tentang Pasang Bisnis <br /> Gratis di Akademi UMKM
          </h1>

          {/* ✅ **Testimonials Slider** */}
          <div className="w-full md:w-2/3 lg:w-1/2">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-2">
                  <TestimonialCard
                    content={testimonial.content}
                    name={testimonial.name}
                    position={testimonial.position}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurClient;
