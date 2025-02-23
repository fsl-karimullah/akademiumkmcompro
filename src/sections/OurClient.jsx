import React from "react";
import CustomComponent from "../components/title/Title";

const cards = [
  {
    title: "orang yang mau melompat untuk merubah hidupnya",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Business%20vision-rafiki.png?raw=true",
  },
  {
    title: "dan yang mau berdiam diri",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Anxiety-amico.png?raw=true",
  },
];

const WebinarValueSection = ({ currentPath }) => {
  console.log(currentPath);

  return (
    <div className="bg-white text-[var(--themeRed)] py-12">
      {currentPath === "/" ? (
        <div className="flex flex-col gap-16 mt-10 w-full">
          <div>
            <CustomComponent
              title1="Kamu ada di tipe mana ?"
              title2="Di Dunia ini Ada 2 Tipe Orang"
              title3=""
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 md:px-16">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center bg-gray-300 p-4 rounded-xl shadow-md  transition-transform transform  overflow-hidden"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-xl opacity-80"
                />
                <h1 className="absolute bottom-8 text-2xl md:text-4xl font-bold text-black text-center px-4">
                  {card.title}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <a href="/landing" target="_blank" rel="noopener noreferrer"
              className="bg-[var(--themeRed)] text-white px-6 py-3 rounded-lg font-bold  transition-transform transform "
            >
              🚀 Take Action Sekarang
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WebinarValueSection;
