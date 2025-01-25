import React from "react";
import CustomComponent from "../components/title/Title";

// 📊 **Guide Items Data**
const items = [
  {
    imageSrc: "panduan1.webp",
    title: "Tulis Data Bisnis dengan Jelas",
    description:
      "Berikan informasi yang lengkap dan profesional agar calon customer memahami bisnis Anda.",
  },
  {
    imageSrc: "panduan2.webp",
    title: "Gunakan Media Sosial",
    description:
      "Manfaatkan media sosial untuk menjalin komunikasi dengan customer secara mudah dan cepat.",
  },
];

// ✅ **Guide Card Component**
const GuideCard = ({ imageSrc, title, description }) => (
  <div className="bg-white h-[450px] flex flex-col gap-6 p-4 items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
    <img
      src={imageSrc}
      alt={title}
      className="w-[200px] md:w-[300px] object-cover rounded-md"
    />
    <div className="text-center flex flex-col gap-2">
      <h1 className="text-xl font-bold text-[var(--themeRed)]">{title}</h1>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// ✅ **Main Component**
const DownloadApp = ({ currentPath }) => {
  return (
    <div className="bg-red-50 flex flex-col md:flex-row items-center gap-8 p-6 md:p-12 rounded-lg shadow-md">
      {/* ✅ **Homepage View ("/")** */}
      {currentPath === "/" ? (
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          {/* ✅ **Left Section** */}
          <div className="md:w-1/2 flex flex-col gap-6 text-center md:text-left">
            <CustomComponent
              title1="Belajar dan Berkembang"
              title2="Gabung dengan"
              title3="Akademi UMKM Sekarang"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="start"
            />
            <p className="text-gray-700 text-sm md:text-lg">
              Bergabunglah dengan platform kami untuk mengakses panduan dan
              kursus yang dirancang khusus untuk mendukung UMKM, mahasiswa, dan
              profesional.
            </p>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/landing"
                className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-transform transform hover:scale-105"
              >
                🚀 Klik di sini untuk Bergabung
              </a>
            </div>
          </div>

          {/* ✅ **Right Section (Image)** */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://github.com/fsl-karimullah/my-img-source/blob/main/Growth%20curve-cuate.png?raw=true"
              alt="Learn and Grow"
              className="w-[250px] md:w-[400px] object-contain"
            />
          </div>
        </div>
      ) : (
        // ✅ **Guide Page View (Other Paths)**
        <div className="flex flex-col gap-12 w-full">
          {/* ✅ **Title Section** */}
          <h1 className="text-3xl font-bold text-center text-[var(--themeRed)]">
            📚 Panduan Bergabung di Akademi UMKM
          </h1>

          {/* ✅ **Guide Cards Grid** */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <GuideCard
                key={index}
                imageSrc={item.imageSrc}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          {/* ✅ **CTA Button** */}
          <div className="flex justify-center mt-6">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/landing"
              className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              🚀 Daftar Sekarang!
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadApp;
