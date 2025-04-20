import React from "react";
import { Link } from "react-router-dom";

const Hero = ({ currentPath }) => {
  console.log(currentPath);

  return (
    <div className="text-[var(--themeRed)]">
      {currentPath === "/" ? (
        <div className="flex flex-col items-center justify-center gap-8 py-16 px-6 md:px-20 bg-gradient-to-r from-red-50 to-red-100 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--themeRed)] opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[var(--themeRed)] opacity-10 rounded-full animate-pulse"></div>

          {/* Content Section */}
          <div className="text-center space-y-6 max-w-4xl z-10">
            <div className="inline-flex items-center bg-[var(--themeRed)] text-white text-sm px-4 py-1 rounded-full shadow-md">
              🌟 Temukan Skill Baru yang Sesuai dengan Bakatmu
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Pelajari Skill Sesuai <br />
              <span className="text-[var(--themeRed)]">Minat & Tujuanmu</span>
            </h1>
            <p className="text-gray-700 md:w-[80%] mx-auto text-sm md:text-lg">
              Dari desain grafis hingga pengembangan bisnis, eksplorasi beragam
              kursus yang membantu Kamu tumbuh dan berkembang di bidang pilihan
              kamu.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
              <Link
                to="/courses" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[var(--themeRed)] text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg"
              >
                <span className="text-lg">🔍</span>
                Belajar Sekarang
              </Link>
              <Link
                to="/webinars"
                className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--themeRed)] text-[var(--themeRed)] px-6 py-3 rounded-full font-bold hover:bg-[var(--themeRed)] hover:text-white transition duration-300 shadow-lg"
              >
                <span className="text-lg">🛠️</span>
                Belajar Mandiri
              </Link>
              <Link
                to="/mentor/"
                className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--themeRed)] text-[var(--themeRed)] px-6 py-3 rounded-full font-bold hover:bg-[var(--themeRed)] hover:text-white transition duration-300 shadow-lg"
              >
                <span className="text-lg">👩‍🏫</span>
                Daftar Sebagai Mentor
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[600px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('digitalBanner.webp')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--themeRed)] opacity-80"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 text-black p-8">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Tingkatkan Skill dan Wawasan Anda
            </h1>
            <p className="text-lg md:text-xl">
              Jelajahi kursus online yang dirancang untuk mendukung perjalanan
              pembelajaran Anda, kapan saja dan di mana saja.
            </p>
            <a
              href="https://www.youtube.com/watch?v=25RD3_TE33s"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[var(--themeRed)] px-6 py-2 rounded-md font-bold hover:bg-gray-100 transition duration-300"
            >
              🎓 Mulai Eksplorasi
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
