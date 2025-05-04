import React from "react";
import { Link } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Hero = ({ currentPath }) => {
  return (
    <div className="relative overflow-hidden text-[var(--themeRed)] bg-gradient-to-br from-red-50 via-white to-red-100">
      {currentPath === "/" && (
        <div className="flex flex-col items-center justify-center gap-8 py-24 px-6 md:px-20 relative z-10 text-center">
          {/* Floating Icons - Improved Placement & Visibility */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <SchoolIcon className="absolute text-[120px] text-[var(--themeRed)]  animate-float left-[5%] top-[10%]" />
            <MenuBookIcon className="absolute text-[110px] text-[var(--themeRed)]  animate-floatSlow right-[8%] top-[20%]" />
            <LaptopChromebookIcon className="absolute text-[140px] text-[var(--themeRed)]  animate-float left-[10%] bottom-[10%]" />
            <EditNoteIcon className="absolute text-[110px] text-[var(--themeRed)]  animate-floatSlow right-[10%] bottom-[5%]" />
          </div>

          {/* Animated Blobs for background atmosphere */}
          <div className="absolute -top-28 -left-28 w-[320px] h-[320px] bg-[var(--themeRed)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-28 -right-28 w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" />

          {/* Content */}
          <div className="space-y-6 max-w-4xl z-10">
            <div className="inline-flex items-center bg-[var(--themeRed)] text-white text-sm px-4 py-1 rounded-full shadow-md animate-bounce">
              🌟 Temukan Skill Baru yang Sesuai dengan Bakatmu
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Pelajari Skill Sesuai <br />
              <span className="text-[var(--themeRed)]">Minat & Tujuanmu</span>
            </h1>
            <p className="text-gray-700 md:w-[80%] mx-auto text-sm md:text-lg">
              Dari desain grafis hingga pengembangan bisnis, eksplorasi kursus
              terbaik untuk mengembangkan potensi kamu.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
              <Link
                to="/courses"
                className="flex items-center justify-center gap-2 bg-[var(--themeRed)] text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg"
              >
                🔍 Belajar Sekarang
              </Link>
              <Link
                to="/webinars"
                className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--themeRed)] text-[var(--themeRed)] px-6 py-3 rounded-full font-bold hover:bg-[var(--themeRed)] hover:text-white transition duration-300 shadow-lg"
              >
                🛠️ Belajar Mandiri
              </Link>
              <Link
                to="/mentor/"
                className="flex items-center justify-center gap-2 bg-white border-2 border-[var(--themeRed)] text-[var(--themeRed)] px-6 py-3 rounded-full font-bold hover:bg-[var(--themeRed)] hover:text-white transition duration-300 shadow-lg"
              >
                👩‍🏫 Daftar Sebagai Mentor
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
