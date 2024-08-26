import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

const mentors = [
  {
    id: 1,
    name: "Miftahurrozak",
    jabatan: "Digital Marketing Specialist (Meta Ads, Google Ads)",
    currentPosition: "Digital Marketing Specialist",
    whatsapp: "+6285281252199",
    socialMedia: "Senin Sd Jumat Jam 19.00 - 21.00",
    photo:
      "https://github.com/fsl-karimullah/my-img-source/blob/main/mifta.jpeg?raw=true",
    available: true,
    googleFormLink: "https://forms.gle/v8t9tGLxRTo9mwiU9",
  },
  {
    id: 2,
    name: "Mohammad Al Katiri",
    jabatan: "Digital Marketing Specialist",
    currentPosition: "Digital Marketing Specialist (Meta Ads, Google Ads)",
    whatsapp: "+6285281252199",
    socialMedia: "Senin Sd Jumat Jam 20.00 - 22.00",
    photo:
      "https://github.com/fsl-karimullah/my-img-source/blob/main/mohammad.jpeg?raw=true",
    available: true,
    googleFormLink: "https://forms.gle/v8t9tGLxRTo9mwiU9",
  },
  {
    id: 3,
    name: "Mihran Mubarak",
    jabatan: "Business Strategist",
    currentPosition: "Indiepreneur at Konfeti & Co-Founder Naco",
    whatsapp: "+6285281252199",
    socialMedia: "Senin Sd Minggu Jam 20.00 - 22.00",
    photo:
      "https://github.com/fsl-karimullah/my-img-source/blob/main/mihran.jpeg?raw=true",
    available: true,
    googleFormLink: "https://forms.gle/v8t9tGLxRTo9mwiU9",
  },
];

const Consulting = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showTerms, setShowTerms] = useState(false);

  const handleScheduleConsultation = (mentor) => {
    setSelectedMentor(mentor);
  };

  const getWhatsAppLink = (mentor) => {
    const message = `Halo min, saya ingin berkonsultasi dengan mentor ${mentor.name} pada tanggal jam.`;
    return `https://wa.me/${mentor.whatsapp.replace(
      "+",
      ""
    )}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Konsultasi Bisnis</h1>
      <p className="text-lg mb-8">
        Halaman ini akan menyediakan layanan konsultasi bisnis untuk UMKM.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="relative border border-gray-300 rounded-lg p-6 w-72 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <img
              src={mentor.photo}
              alt={`${mentor.name} photo`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <span
              className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${
                mentor.available ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {mentor.available ? "Gratis" : "Tidak Tersedia"}
            </span>
            <h2 className="text-2xl font-semibold mb-2">{mentor.name}</h2>
            <p className="mb-1">
              <strong>Jabatan:</strong> {mentor.jabatan}
            </p>
            <p className="mb-1">
              <strong>Posisi Saat Ini:</strong> {mentor.currentPosition}
            </p>
            <p>
              <strong>Jadwal:</strong> {mentor.socialMedia}
            </p>
            <button
              onClick={() => handleScheduleConsultation(mentor)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              disabled={!mentor.available}
            >
              Jadwalkan Konsultasi
            </button>
            <Tooltip
              content="Konsultasi tersedia secara gratis jika mentor tersedia. Klik untuk jadwalkan!"
              direction="top"
            >
              <span className="text-xs text-gray-500 cursor-pointer">
                Info lebih lanjut
              </span>
            </Tooltip>
          </div>
        ))}
      </div>

      {selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <button
              onClick={() => setSelectedMentor(null)}
              className="text-white font-bold absolute top-2 right-2 hover:text-gray-900 bg-black px-2 py-1 rounded"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Detail Mentor</h2>
            <img
              src={selectedMentor.photo}
              alt={`${selectedMentor.name} photo`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">
              {selectedMentor.name}
            </h2>
            <p className="mb-1">
              <strong>Jabatan:</strong> {selectedMentor.jabatan}
            </p>
            <p className="mb-1">
              <strong>Posisi Saat Ini:</strong> {selectedMentor.currentPosition}
            </p>
            <p className="mb-1">
              <strong>Jadwal:</strong> {selectedMentor.socialMedia}
            </p>
            <p className="mb-1">
              <strong>Daftar Disini:</strong>{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://forms.gle/v8t9tGLxRTo9mwiU9"}
                className="text-blue-500"
              >
                Booking Mentormu Disini
              </a>
            </p>
            <button
              onClick={() => setShowTerms(true)}
              className="mt-4 w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-500 transition-colors duration-300"
            >
              Baca Syarat dan Ketentuan
            </button>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <button
              onClick={() => setShowTerms(false)}
              className="text-white font-bold absolute top-2 right-2 hover:text-gray-900 bg-black px-2 py-1 rounded"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Syarat dan Ketentuan</h2>
            <ol className="list-decimal list-inside">
              <li>
                BOOKING 1 HARI SEBELUM JADWAL KONSULTASI SESUAI DENGAN JAM YANG
                DISEDIAKAN.
              </li>
              <li>JIKA INGIN RESCHEDULE, HARUS 1 HARI SEBELUM JADWAL.</li>
              <li>
                SESI KONSULTASI BERLANGSUNG 30 MENIT JIKA INGIN TAMBAHAN WAKTU,
                MAKA HARUS MEMBUAT JADWAL LAGI.
              </li>
              <li>
                PEMBAYARAN DILAKUKAN DENGAN MENGUPLOAD BUKTI PEMBAYARAN DI
                GOOGLE FORM.
              </li>
              <li>
                JIKA TIDAK HADIR DALAM GMEET, MAKA BIAYA KONSULTASI TIDAK BISA
                DIKEMBALIKAN.
              </li>
              <li>
                DILARANG MENGAJAK BEKERJASAMA DENGAN MENTOR BRAND-IN INDONESIA.
              </li>
              <li>
                DILARANG MENANYAKAN SESUATU DILUAR DARI TOPIK YANG DIBAHAS.
              </li>
              <li>
                MEMBER HARUS HADIR TEPAT WAKTU, KITA AKAN MEMBERIKAN WAKTU
                TAMBAHAN UNTUK MEMBER 10 MENIT. JIKA MASIH TIDAK HADIR, MAKA
                KONSULTASI DINYATAKAN SELESAI.
              </li>
              <li>
                KONSULTAN AKAN MEMBERIKAN SEGALA MASUKAN UNTUK BISNIS MEMBER,
                NAMUN KEPUTUSAN AKHIR DAN TANGGUNG JAWAB BERADA DI TANGAN
                MEMBER.
              </li>
              <li>
                PASTIKAN MEMILIH MENTOR YANG TEPAT SUPAYA BISA ALIGN ATAU MASUK
                DENGAN PERMASALAHAN BISNIS MEMBER.
              </li>
            </ol>
          </div>
        </div>
      )}
      <div className="mt-12 bg-blue-100 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Charity Initiative</h2>
        <p className="text-lg mb-4">
          Hasil dari mentoring ini sampai dengan 1 bulan kedepan, akan kami
          donasikan 100% charity untuk palestina dan orang yang membutuhkan di
          indonesia melalui ayobuatbaik dan kitabisa
        </p>
        <p className="text-lg mb-4">
          Kami juga mendukung berbagai kegiatan amal. Anda dapat berkontribusi
          untuk mendukung UMKM lokal.
        </p>
        <a
          href="https://forms.gle/v8t9tGLxRTo9mwiU9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 text-center block w-full md:w-auto"
        >
          Lakukan Mentoring & Donasi Sekarang
        </a>
      </div>
    </div>
  );
};

export default Consulting;
