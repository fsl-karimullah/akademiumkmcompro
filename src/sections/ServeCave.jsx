import React from "react";
import StarIcon from '@mui/icons-material/Star'; // Importing the icon

const WhyChooseUs = () => {
  return (
    <div className="w-full py-20 px-6 md:px-20 bg-white relative overflow-hidden border-t border-gray-200">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[var(--themeRed)] opacity-10 rounded-full -z-10 blur-2xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[var(--themeRed)] opacity-10 rounded-full -z-10 blur-2xl" />

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto relative">
        {/* Animated Icon in the Top-Right Corner */}
        <StarIcon 
          className="absolute top-4 right-4 text-[var(--themeRed)] text-4xl opacity-80 animate-pulse"
        />

        {/* Text Content */}
        <div className="text-center md:text-left space-y-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
            Dapatkan Penghasilan Tambahan <br />
            Lewat Program{" "}
            <span className="text-[var(--themeRed)]">Affiliate Cave Men's Grooming®</span>
          </h2>
          <ul className="text-gray-700 text-base md:text-lg space-y-2">
            <li>✅ Komisi menarik untuk setiap referral</li>
            <li>🎁 Akses eksklusif ke e-course & e-book premium</li>
            <li>
              🚀 Cocok untuk pelajar, kreator, atau siapa pun yang ingin
              berkembang
            </li>
            <li>🔗 Pendaftaran mudah dan 100% gratis</li>
          </ul>
          <a
            href="https://www.cavemens.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--themeRed)] text-white px-8 py-3 rounded-full font-bold mt-4 hover:bg-red-700 transition"
          >
            🚀 Mulai Jadi Affiliate Sekarang
          </a>
        </div>

        {/* Cavemans Logo with Animation */}
        <div className="flex-shrink-0 animate-bounce">
          <img
            src="https://cdn.orderonline.id/uploads/4333221638374289757.png"
            alt="Cavemans Affiliate"
            className="w-[180px] md:w-[240px] object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
