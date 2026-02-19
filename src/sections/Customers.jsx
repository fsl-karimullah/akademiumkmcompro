import React from "react";
import CustomComponent from "../components/title/Title";
import { motion } from "framer-motion";

const solutions = [
  {
    id: "01",
    title: "Webinar Eksklusif & Praktikal",
    description:
      "Akses webinar langsung dengan topik-topik tajam yang langsung bisa kamu praktikkan untuk mengembangkan bisnismu.",
    img: "/images/webinar1.png",
  },
  {
    id: "02",
    title: "Sesi Bimbingan Lewat Gmeet",
    description:
      "Bisa tanya langsung, diskusi bareng mentor, dan dapet insight yang relevan dengan masalahmu sekarang juga.",
    img: "/images/webinar2.png",
  },
  {
    id: "03",
    title: "Support System di Grup Alumni",
    description:
      "Gak cuma belajar bareng, tapi juga saling dukung dan berbagi peluang di komunitas yang aktif dan suportif.",
    img: "/images/webinar3.png",
  },
  {
    id: "04",
    title: "Networking & Kolaborasi",
    description:
      "Buka peluang baru lewat koneksi dengan alumni lain. Kolaborasi, sharing ilmu, bahkan proyek bareng bisa terjadi.",
    img: "/images/webinar4.png",
  },
];

const SolutionSection = ({ currentPath }) => {
  if (currentPath !== "/") return null;

  return (
    <section className="bg-gradient-to-br from-white to-[#ffecec] text-[var(--themeRed)] py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <CustomComponent
          title1="Lelah Belajar Tapi Gak Ada Hasil?"
          title2="Ini Solusi Nyata Buat Kamu"
          textColor1="var(--themeRed)"
          textColor2="#000000"
          alignItems="center"
        />

        <div className="mt-12 border-l-2 border-[var(--themeRed)] pl-6 relative space-y-12">
          {solutions.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative pl-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute left-[-11px] top-2 w-5 h-5 rounded-full bg-[var(--themeRed)] border-4 border-white shadow-md" />
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-xl shadow-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
