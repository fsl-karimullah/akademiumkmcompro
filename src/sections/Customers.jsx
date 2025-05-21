import React from "react";
import CustomComponent from "../components/title/Title";
import { motion } from "framer-motion";

const webinarValues = [
  {
    id: "01",
    title: "Webinar Eksklusif untuk Alumni",
    img: "/images/webinar1.png",
  },
  {
    id: "02",
    title: "Gmeet untuk bimbingan dan Tanya jawab",
    img: "/images/webinar2.png",
  },
  {
    id: "03",
    title: "Diskusi dan Tanya jawab di grup alumni",
    img: "/images/webinar3.png",
  },
  {
    id: "04",
    title: "Interaksi langsung dengan alumni lainnya",
    img: "/images/webinar4.png",
  },
];

const WebinarValueSection = ({ currentPath }) => {
  if (currentPath !== "/") return null;

  return (
    <div className="bg-gradient-to-br from-white to-[#ffecec] text-[var(--themeRed)] py-20">
      <div className="flex flex-col gap-16 w-full max-w-7xl mx-auto">
        <CustomComponent
          title1="Kenapa Memilih Kami?"
          title2="Keunggulan Grup Alumni"
          textColor1="var(--themeRed)"
          textColor2="#000000"
          alignItems="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6 md:px-8 lg:px-0">
          {webinarValues.map((value, index) => (
            <motion.div
              key={value.id}
              className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={value.img}
                alt={value.title}
                className="w-full h-40 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-base md:text-lg font-semibold text-center leading-snug">
                {value.title}
              </h2>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebinarValueSection;
