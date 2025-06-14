import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../assets/style/home.css";
const courseList = [
  {
    id: 1,
    title:
      "Mentoring + Course Master the art of Selling Words Copywriting for Beginner",
    mentor: "Rizky Mileno",
    thumbnail: "/coursesimg/copywriting.png",
    price: "Rp 59.999",
    students: 50,
    lessons: 8,
    hours: 3,
  },
  {
    id: 2,
    title: "Cuan Tanpa Stok Barang: Mahir Affiliate Marketing dari Nol!",
    mentor: "Akademi UMKM - Mentor",
    thumbnail: "/coursesimg/affiliate.jpg",
    price: "Rp 15.000",
    students: 49,
    lessons: 10,
    hours: 1,
  },
  {
    id: 3,
    title:
      "Online Marketing 101: Cara Bangun Income Aktif & Pasif dari Digital",
    mentor: "Akademi UMKM - Mentor",
    thumbnail: "/coursesimg/marketing.png",
    price: "Rp 23.800",
    students: 60,
    lessons: "10+",
    hours: 1,
  },
  {
    id: 4,
    title: "Bikin WhatsApp Jadi Mesin Penjualan: Panduan Setting dari Nol",
    mentor: "Akademi UMKM - Mentor",
    thumbnail: "/coursesimg/whatsapp.png",
    price: "Rp 19.500",
    students: 70,
    lessons: 20,
    hours: 1,
  },
  {
    id: 5,
    title: "Lead Magnet Mastery: Belajar & Praktik Bangun Leads yang Siap Beli",
    mentor: "Akademi UMKM - Mentor",
    thumbnail: "/coursesimg/leads.jpg",
    price: "Rp 15.000",
    students: 54,
    lessons: 20,
    hours: 1,
  },
  {
    id: 6,
    title:
      "Langkah Pertama Bikin Website Tanpa Coding, Tanpa Drama, Lansung Jadi!",
    mentor: "Akademi UMKM - Mentor",
    thumbnail: "/coursesimg/wordpress.jpg",
    price: "Rp 30.000",
    students: 46,
    lessons: 20,
    hours: 1,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Kelas Online Pilihan <span className="text-primary">Terbaik</span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {courseList.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-full flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full aspect-square object-contain bg-white"
                />
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[48px]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 mb-2">
                      by {item.mentor}
                    </p>
                    <p className="text-base font-bold text-primary">
                      {item.price}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <span className="flex items-center gap-1">
                      <PeopleAltIcon fontSize="small" />
                      {item.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <MenuBookIcon fontSize="small" />
                      {item.lessons} Pelajaran
                    </span>
                    <span className="flex items-center gap-1">
                      <AccessTimeIcon fontSize="small" />
                      {item.hours} Jam
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-swiper-pagination mt-6 flex justify-center" />

        <div className="text-center mt-12">
          <a
            href="/course"
            className="inline-block bg-[var(--themeRed)] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:scale-105"
          >
            🚀 Yuk, Cari Solusinya Bareng Kami!
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
