import React from "react";
import CustomComponent from "../components/title/Title";

const cards = [
  {
    title: "Orang yang Siap Melompat dan Mengubah Hidupnya",
    img: "/images/go.png",
  },
  {
    title: "Orang yang Memilih Diam dan Tidak Bergerak",
    img: "/images/alone.png",
  },
];

const WebinarValueSection = ({ currentPath }) => {
  if (currentPath !== "/") return null;

  return (
    <div className="bg-white text-[var(--themeRed)] py-20">
      <div className="flex flex-col gap-16 w-full">
        <CustomComponent
          title1="Kamu Ada di Tipe Mana?"
          title2="Di Dunia Ini Ada 2 Tipe Orang"
          title3=""
          textColor1="var(--themeRed)"
          textColor2="#000000"
          alignItems="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 px-6 md:px-20">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-80 object-contain rounded-2xl bg-white p-4 brightness-75 group-hover:brightness-100 transition-all duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6 rounded-2xl">
                <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug text-center w-full drop-shadow-lg">
                  {card.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--themeRed)] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            🚀 Take Action Sekarang
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebinarValueSection;
