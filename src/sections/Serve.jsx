import React from "react";
import CustomComponent from "../components/title/Title";

const values = [
  {
    id: "#01",
    title: "Akses Seumur Hidup",
    description: "Dapatkan akses seumur hidup ke seluruh kelas dan webinar kami yang dirancang untuk meningkatkan keterampilan dan pengetahuan Anda.",
    img: "p1.webp",
  },
  {
    id: "#02",
    title: "Grup Networking Eksklusif",
    description: "Bergabunglah dengan grup kami untuk berbicara tentang karir, bisnis, dan peluang networking bersama komunitas yang mendukung.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/2.PNG?raw=true",
  },
  {
    id: "#03",
    title: "Akses ke Produk Digital",
    description: "Nikmati produk digital eksklusif yang dirancang untuk membantu meningkatkan produktivitas dan efisiensi bisnis Anda.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Sage%20Minimal%20Mood%20Board%20Collage%20Instagram%20Post.png?raw=true",
  },
];

const WhyChooseUs = ({ currentPath }) => {
  console.log(currentPath);

  return (
    <div className="bg-white text-[var(--themeRed)] py-12">
      {currentPath === "/" ? (
        <div className="flex flex-col gap-16 mt-10 w-full">
          <div>
            <CustomComponent
              title1="Kenapa Memilih Kami"
              title2="Nilai yang Kami Berikan"
              title3="Untuk Anda"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="center"
            />
          </div>
          <div className="flex flex-col gap-8 px-6 md:px-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-6 rounded-xl shadow-md  transition-transform transform "
              >
                <div className="flex flex-col gap-4 text-left md:w-1/2">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[var(--themeRed)] text-white rounded-full text-lg font-bold">
                      {value.id}
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--themeRed)]">{value.title}</h1>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    {value.description}
                  </p>
                </div>
                <div className="md:w-1/3"> {/* Adjusted the width to make the image smaller */}
                  <img
                    src={value.img}
                    alt={value.title}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WhyChooseUs;
