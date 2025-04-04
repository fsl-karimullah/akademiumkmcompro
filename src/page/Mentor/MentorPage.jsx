import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../../endpoint/api";

const MentorPage = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(endpoint.getMentor);
        setMentors(response.data.data);
      } catch (error) {
        console.error("Error fetching mentor data", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      {/* Back Button */}
      <div className="p-4">
        <Link
          to="/"
          className="inline-block text-[var(--themeRed)] font-bold hover:underline"
        >
          ← Kembali
        </Link>
      </div>

      {/* Hero Section with Text on Left and Image on Right */}
      <header className="relative bg-[var(--themeRed)] py-16 px-6 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white text-left">
            <h1 className="text-4xl md:text-6xl font-bold">
              Bergabunglah Bersama Kami Sebagai Mentor
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-xl">
              Bagikan pengetahuan dan pengalaman Anda untuk mengedukasi UMKM,
              profesional, dan mahasiswa.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://forms.gle/D1QqVsvrYqZ5Jmv57"
              className="inline-block mt-6 bg-white text-[var(--themeRed)] px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition duration-300"
            >
              Daftar Sekarang
            </a>
          </div>
          {/* Mentor Image */}
          <div className="w-full md:w-1/2 flex justify-center bg-contain mt-8 md:mt-0">
            <img
              src="https://github.com/fsl-karimullah/my-img-source/blob/main/Desain_tanpa_judul-2-removebg-preview.png?raw=true"
              alt="Professional Greeting"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Mengapa Menjadi Mentor - with Large Emoji Icons */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-[var(--themeRed)] text-center mb-12">
          Mengapa Menjadi Mentor?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Berbagi Ilmu */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6">
            <span
              className="text-6xl mb-4"
              role="img"
              aria-label="Berbagi Ilmu"
            >
              📚
            </span>
            <h3 className="text-xl font-bold text-[var(--themeRed)] mb-2">
              Berbagi Ilmu
            </h3>
            <p className="text-center">
              Sampaikan pengalaman dan keahlian Anda kepada ribuan pelajar yang
              haus akan pengetahuan.
            </p>
          </div>
          {/* Card 2: Meningkatkan Profil */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6">
            <span
              className="text-6xl mb-4"
              role="img"
              aria-label="Meningkatkan Profil"
            >
              💼
            </span>
            <h3 className="text-xl font-bold text-[var(--themeRed)] mb-2">
              Meningkatkan Profil
            </h3>
            <p className="text-center">
              Perluas jaringan profesional dan tingkatkan reputasi Anda sebagai
              ahli di bidang Anda.
            </p>
          </div>
          {/* Card 3: Memberi Dampak */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6">
            <span
              className="text-6xl mb-4"
              role="img"
              aria-label="Memberi Dampak"
            >
              🎓
            </span>
            <h3 className="text-xl font-bold text-[var(--themeRed)] mb-2">
              Memberi Dampak
            </h3>
            <p className="text-center">
              Bantu mengembangkan potensi UMKM dan individu melalui pengetahuan
              yang Anda bagikan.
            </p>
          </div>
        </div>
      </section>

      {/* Cara Menjadi Mentor - Flow with Arrows */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-[var(--themeRed)] text-center mb-12">
          Cara Menjadi Mentor
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Step 1: Buat Video */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[var(--themeRed)] mb-2">
              1. Buat Video
            </h3>
            <p>
              Rekam video yang informatif dan menarik berdasarkan keahlian Anda.
              Pastikan materi yang disampaikan jelas dan mudah dipahami.
            </p>
          </div>
          {/* Arrow */}
          <span className="hidden md:block text-4xl text-[var(--themeRed)]">
            →
          </span>
          {/* Step 2: Kirim Video */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[var(--themeRed)] mb-2">
              2. Kirim Video Kepada Kami
            </h3>
            <p>
              Setelah video selesai, kirimkan karya Anda melalui formulir
              pendaftaran atau email yang telah kami sediakan.
            </p>
          </div>
          {/* Arrow */}
          <span className="hidden md:block text-4xl text-[var(--themeRed)]">
            →
          </span>
          {/* Step 3: Unggah Video */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-bold text-[var(--themeRed)] mb-2">
              3. Kami Unggah di Platform
            </h3>
            <p>
              Setelah diverifikasi, video Anda akan diunggah di platform kami
              agar dapat diakses oleh para pelajar dan praktisi.
            </p>
          </div>
        </div>
      </section>

      {/* Tujuan Program Mentor */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-[var(--themeRed)] text-center mb-12">
          Tujuan Program Mentor
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Tujuan Program"
            className="w-full rounded-lg shadow-lg"
          />
          <ul className="list-disc list-inside space-y-4 text-lg">
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Meningkatkan pengetahuan dasar di bidang digital marketing, SEO,
              perekrutan karyawan, dan topik bisnis lainnya.
            </li>
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Memberikan panduan praktis dan strategi yang dapat langsung
              diterapkan oleh UMKM, profesional, dan mahasiswa.
            </li>
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Membangun komunitas pembelajaran yang solid antara mentor dan
              peserta melalui berbagi pengalaman nyata.
            </li>
          </ul>
        </div>
      </section>

      {/* Syarat Menjadi Mentor */}
      <section className="py-16 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-[var(--themeRed)] text-center mb-12">
          Syarat Menjadi Mentor
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ul className="list-disc list-inside space-y-4 text-lg">
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Memiliki pengalaman profesional minimal 1-3 tahun di bidang
              terkait.
            </li>
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Memiliki minimal satu keahlian yang relevan, seperti digital
              marketing, SEO, atau bidang lain yang dibutuhkan.
            </li>
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Memiliki portofolio yang kuat dan kemampuan komunikasi yang baik
              untuk menjelaskan materi secara jelas.
            </li>
            <li>
              <span className="text-[var(--themeRed)] mr-2 text-xl">✅</span>
              Bersedia untuk terus belajar dan mengikuti perkembangan industri
              agar materi yang disampaikan selalu up-to-date.
            </li>
          </ul>
          <img
            src="https://github.com/fsl-karimullah/my-img-source/blob/main/Accept%20terms-bro.png?raw=true"
            alt="Syarat Mentor"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Mentor List Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-[var(--themeRed)] text-center mb-12">
          Daftar Mentor
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mentors.length > 0 ? (
            mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                {/* Image container with 16:9 aspect ratio */}
                <div className="relative w-full h-0 pb-[56.25%]">
                  <img
                    src={
                      mentor.thumbnail ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={mentor.name}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--themeRed)]">
                    {mentor.name}
                  </h3>
                  <p className="mt-2 text-gray-600">{mentor.position}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              Loading mentors...
            </p>
          )}
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 px-6 md:px-20 bg-[var(--themeRed)] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Menjadi Mentor?</h2>
        <p className="mb-8">
          Bergabunglah dengan kami dan bagikan keahlian Anda untuk membantu
          mengembangkan potensi pelaku UMKM, profesional, dan mahasiswa.
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://forms.gle/D1QqVsvrYqZ5Jmv57"
          className="inline-block bg-white text-[var(--themeRed)] px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition duration-300"
        >
          Daftar Sekarang
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Akademi UMKM. Hak cipta dilindungi.
        </p>
      </footer>
    </div>
  );
};

export default MentorPage;
