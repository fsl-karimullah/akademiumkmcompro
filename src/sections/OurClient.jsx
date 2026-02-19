import React from "react";
import CustomComponent from "../components/title/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Iqbal Hidayatulah",
    quote: "Belajar banyak hal dan menambah pengetahuan baru.",
    img: "/icons/users.png",
  },
  {
    name: "Siti Daniyah Atika",
    quote: "Sangat menarik, bisa mendapatkan ilmu tambahan.",
    img: "/icons/users.png",
  },
  {
    name: "Rinawati",
    quote: "Sangat bermanfaat, bisa digunakan untuk bisnis saya.",
    img: "/icons/users.png",
  },
  {
    name: "Ade Nandar",
    quote: "lebih memahami tentang bagaimana mengelola keuangan dengan baik.",
    img: "/icons/users.png",
  },
  {
    name: "Rina Nuraeni",
    quote:
      "Luar biasa kereeen.. bener bener membuka mata saya.. krn selama ini saya yg tidak rajin mencatat.. masalah bukan di aplikasi ato lainnya.",
    img: "/icons/users.png",
  },
  {
    name: "Sri Utami Dewiyantari",
    quote: "Materinya sangat bagus dan ilmunya daging sangant bermanfaat.",
    img: "/icons/users.png",
  },
  {
    name: "Retno Handayani",
    quote:
      "Bagus dan sangatv membantu untuk lebih memahami tentang pentingnya pencatatab arus keluar masuk uang untuk usaha agar bisa di review utk menentukan strategi agar tidak rugi dan mendpt untung lebih banyak.",
    img: "/icons/users.png",
  },
  {
    name: "Nadi Azkia Ali Alfathimi",
    quote:
      "Keren acaranya. Pematerinya juga ramah & profesional ketika QnA. Akan dibuat series ya. Semoga sukses selalu tim2 yg keren ini.",
    img: "/icons/users.png",
  },
  {
    name: "Nurhasanah",
    quote:
      "sangat bermanfaat sekali tentunya untuk memperluas wawasan dan menambah pengalaman.",
    img: "/icons/users.png",
  },
  {
    name: "Lisda Nur",
    quote: "Terima kasih banyak pokonya!",
    img: "/icons/users.png",
  },
];

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const WebinarValueSection = ({ currentPath }) => {
  if (currentPath !== "/") return null;

  return (
    <section className="relative bg-gradient-to-b from-[#fff7f7] to-[#ffeaea] text-[var(--themeRed)] py-20 overflow-hidden">
      {/* Decorative icons */}
      <motion.div
        className="absolute top-10 left-10 w-8 h-8 bg-red-200 rounded-full opacity-30"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-20 right-16 w-12 h-12 bg-red-300 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 left-1/3 w-6 h-6 bg-red-100 rounded-full opacity-30"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-16 right-1/4 w-10 h-10 bg-red-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col gap-16 w-full max-w-7xl mx-auto px-6"
      >
        <CustomComponent
          title1="Cerita Nyata, Hasil Nyata"
          title2="Apa Kata Alumni Kami?"
          textColor1="var(--themeRed)"
          textColor2="#000000"
          alignItems="center"
        />

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {testimonials.map((person, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col justify-between text-center hover:shadow-xl transition-all duration-300 min-h-[320px]"
              >
                <div className="flex flex-col items-center flex-grow justify-start gap-3">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {person.name}
                  </h3>
                </div>

                <p className="text-gray-700 text-sm italic leading-relaxed mt-4 flex-grow overflow-hidden line-clamp-5">
                  “{person.quote}”
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-6 text-gray-600 text-base font-medium italic">
          ✨ Dan masih banyak lagi testimoni dari alumni lainnya...
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="/course"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[var(--themeRed)] hover:bg-red-700 text-white px-8 py-4 text-center rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            🚀 Mulai Perubahanmu Sekarang
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default WebinarValueSection;
