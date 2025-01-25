import React from "react";
import CustomComponent from "../components/title/Title";

const educationPrograms = [
  {
    id: "01",
    title: "Digital Marketing",
    description: "Pelajari strategi pemasaran digital untuk meningkatkan kehadiran bisnis Anda secara online, mulai dari SEO, iklan berbayar, hingga pemasaran konten.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/d253b38a-52e3-4d45-a8e2-c3a87c8841ce.JPG?raw=true",
  },
  {
    id: "02",
    title: "Marketing Communication",
    description: "Kuasi seni komunikasi pemasaran yang efektif untuk menyampaikan pesan brand Anda dengan tepat kepada target audiens.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Live%20collaboration-bro.png?raw=true",

  },
  {
    id: "03",
    title: "Creative Marketing",
    description: "Jelajahi cara-cara kreatif dalam memasarkan produk dan layanan Anda untuk menonjol di pasar yang kompetitif.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Creative%20team-cuate.png?raw=true",
  },
  {
    id: "04",
    title: "Social Media Management",
    description: "Kelola platform media sosial Anda dengan strategi yang terukur untuk meningkatkan interaksi dan keterlibatan pelanggan.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/Social%20tree-rafiki.png?raw=true",
  },
  {
    id: "05",
    title: "Brand Development",
    description: "Bangun dan kembangkan brand Anda dengan pendekatan strategis yang menciptakan identitas kuat dan kredibilitas di pasar.",
    img: "https://github.com/fsl-karimullah/my-img-source/blob/main/brand%20loyalty-bro.png?raw=true",
  },
];

const EducationSection = ({ currentPath }) => {
  console.log(currentPath);

  return (
    <div className="bg-white text-[var(--themeRed)] py-12">
      {currentPath === "/" ? (
        <div className="flex flex-col gap-16 mt-10 w-full">
          <div>
            <CustomComponent
              title1="Kurikulum Program"
              title2="Edukasi untuk Masa Depan"
              title3="Pilih Program Terbaik Anda"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="center"
            />
          </div>
          <div className="flex flex-col gap-12 px-6 md:px-16">
            {educationPrograms.map((program, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/3">
                  <img
                    src={program.img}
                    alt={program.title}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                <div className="flex flex-col gap-4 text-left md:w-2/3">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[var(--themeRed)] text-white rounded-full text-lg font-bold">
                      {program.id}
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--themeRed)]">
                      {program.title}
                    </h1>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EducationSection;
