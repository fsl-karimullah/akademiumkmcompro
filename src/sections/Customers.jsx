import React from "react";
import CustomComponent from "../components/title/Title";

const webinarValues = [
  {
    id: "01",
    title: "Webinar Eksklusif Setiap Bulan",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Screenshot%202024-08-04%20at%2020.33.37.png?raw=true",
  },
  {
    id: "02",
    title: "Live Zoom & Recording",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Screenshot%202024-09-18%20at%2020.33.43.png?raw=true",
  },
  {
    id: "03",
    title: "Pembicara Ahli di Bidangnya",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Screenshot%202024-12-17%20at%2020.47.27.png?raw=true",
  },
  {
    id: "04",
    title: "Harga Terjangkau untuk Member",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Screenshot%202024-12-17%20at%2020.47.44.png?raw=true",
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
              title1="Webinar Eksklusif"
              title2="Galeri Webinar"
              title3="Temukan Inspirasi di Sini"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="center"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 md:px-16">
            {webinarValues.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-md  transition-transform transform "
              >
                <img
                  src={value.img}
                  alt={value.title}
                  className="w-full h-auto rounded-lg shadow-md mb-4"
                />
                <h1 className="text-xl font-bold text-[var(--themeRed)] text-center">
                  {value.title}
                </h1>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WebinarValueSection;