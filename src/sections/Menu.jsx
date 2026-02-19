import React from "react";
import CustomComponent from "../components/title/Title";

const userChallenges = [
  {
    id: "01",
    title: "Sulit Cari Kerja yang Cocok",
    description:
      "Lowongan banyak tapi persaingan ketat. Banyak yang belum tahu cara menonjolkan diri di mata HR.",
    icon: "/icons/hard-work.png",
  },
  {
    id: "02",
    title: "UMKM Gak Naik-naik",
    description:
      "Jualan udah capek-capek tapi omzet segitu-gitu aja. Bingung gimana caranya scale up bisnis.",
    icon: "/icons/downtrend.png",
  },
  {
    id: "03",
    title: "Gak Percaya Diri Jualan",
    description:
      "Mau mulai jualan tapi takut ditolak, takut gak laku, gak tahu harus mulai dari mana.",
    icon: "/icons/frustrated.png",
  },
  {
    id: "04",
    title: "Gaptek & Ketinggalan Zaman",
    description:
      "Skill digital makin penting. Tapi masih bingung pake tools atau platform yang relevan.",
    icon: "/icons/connection.png",
  },
  {
    id: "05",
    title: "Konten Gak Ada yang Ngelirik",
    description:
      "Udah posting tiap hari tapi tetap sepi. Mungkin karena belum tahu cara bangun brand yang kuat.",
    icon: "/icons/content-creation.png",
  },
  {
    id: "06",
    title: "Penghasilan Gak Stabil",
    description:
      "Minggu ini rame, minggu depan sepi. Gak ada sistem yang bikin income stabil dan berkelanjutan.",
    icon: "/icons/depression.png",
  },
];

const EducationJourney = ({ currentPath }) => {
  if (currentPath !== "/") return null;

  return (
    <section className="bg-[#fff6f6] py-20 px-6">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <CustomComponent
          title1="Kenapa Harus Mulai Sekarang?"
          title2="Tantangan yang Sering Banget Dihadapi"
          title3="Kami Ngerti Kok, Kamu Gak Sendiri"
          textColor1="var(--themeRed)"
          textColor2="#000000"
          alignItems="center"
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {userChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100"
          >
            <img
              src={challenge.icon}
              alt={challenge.title}
              className="w-16 h-16 mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-[var(--themeRed)] mb-2">
              {challenge.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {challenge.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 px-4">
        <a
          href="/course"
          className="inline-block w-full sm:w-auto bg-[var(--themeRed)] hover:bg-red-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-md hover:scale-105 text-center"
        >
          🚀 Yuk, Cari Solusinya Bareng Kami!
        </a>
      </div>
    </section>
  );
};

export default EducationJourney;
