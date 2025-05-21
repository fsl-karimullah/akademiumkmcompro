import React from "react";
import CustomComponent from "../components/title/Title";
import "../assets/style/home.css";

const educationPrograms = [
  {
    id: "01",
    title: "Belajar Bareng & Bertumbuh Bersama",
    description:
      "Nikmati pengalaman belajar yang tidak sendirian dapatkan dukungan komunitas dan interaksi langsung dengan alumni sukses untuk memastikan Anda tidak bingung setelah belajar.",
    img: "images/edukasi.png",
  },
  {
    id: "02",
    title: "WhatsApp Closing Mastery",
    description:
      "Raih penjualan lebih cepat lewat teknik komunikasi personal yang efektif dan tidak mengganggu.",
    img: "images/whatsapp.png",
  },
  {
    id: "03",
    title: "Affiliate Marketing Basic",
    description:
      "Kuasai strategi affiliate marketing untuk meningkatkan penjualan dan memperluas jangkauan bisnis Anda.",
    img: "images/affiliate.png",
  },
  {
    id: "04",
    title: "Essential Marketing Skills",
    description:
      "Bangun fondasi pemasaran digital yang kuat untuk pertumbuhan bisnis jangka panjang.",
    img: "images/marketing.png",
  },
  {
    id: "05",
    title: "Foundations of Personal Branding",
    description:
      "Bangun citra pribadi yang otentik dan profesional untuk membuka lebih banyak peluang.",
    img: "images/personalbrandinga.png",
  },
];

const EducationSection = ({ currentPath }) => {
  if (currentPath !== "/") return null;

  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="text-center mb-16 px-6">
        <CustomComponent
          title1="Pilihan Kelas Online"
          title2="Tumbuh Bersama"
          title3="Pilih Pembelajaran Anda"
          textColor1="var(--themeRed)"
          textColor2="#000000"
          alignItems="center"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 before:absolute before:left-1/2 before:top-0 before:w-1 before:h-full before:bg-[var(--themeRed)] before:-translate-x-1/2">
        {educationPrograms.map((program, index) => (
          <div
            key={program.id}
            className={`relative mb-14 flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center justify-between gap-6`}
          >
            <div className="md:w-5/12">
              <div
                className={`bg-white rounded-xl shadow-md p-5 md:ml-6 md:mr-6 ${
                  index === 0 ? "glow-border" : ""
                }`}
              >
                <img
                  src={program.img}
                  alt={program.title}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-xl font-bold text-[var(--themeRed)] mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-white border-4 border-[var(--themeRed)] z-10" />
            <div className="hidden md:block md:w-5/12"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
