import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { endpoint } from "../endpoint/api";
import Navbar from "../components/Navbar";

const Consulting = ({currentPath}) => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showTerms, setShowTerms] = useState(false);

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

  const handleScheduleConsultation = (mentor) => {
    const whatsAppLink = getWhatsAppLink(mentor);
    window.open(whatsAppLink, "_blank");
  };

  const getWhatsAppLink = (mentor) => {
    const message = `Halo min, saya ingin berkonsultasi dengan mentor ${mentor.name} pada tanggal jam.`;
    return `https://wa.me/6285281252199?text=${encodeURIComponent(message)}`;
  };
  

  return (
   <div>
     <Navbar currentPath={currentPath} />
     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-4">Konsultasi Bisnis</h1>
      <p className="text-lg mb-8">
        Halaman ini akan menyediakan layanan konsultasi bisnis untuk UMKM.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="relative border border-gray-300 rounded-lg p-6 w-72 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <img
              src={mentor.thumbnail}
              alt={`${mentor.name} photo`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{mentor.name}</h2>
            <p className="mb-1">
              <strong>Jabatan:</strong> {mentor.position}
            </p>
            <p className="mb-1">
              <strong>Hari Tersedia:</strong> {mentor.day_start_available} - {mentor.day_end_available}
            </p>
            <p className="mb-1">
              <strong>Jam Operasional:</strong> {mentor.opening_hour} - {mentor.closing_hour}
            </p>
            <button
              onClick={() => handleScheduleConsultation(mentor)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Jadwalkan Konsultasi
            </button>
            <Tooltip
              content="Konsultasi tersedia melalui WhatsApp. Klik untuk jadwalkan!"
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
              src={selectedMentor.thumbnail}
              alt={`${selectedMentor.name} photo`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">
              {selectedMentor.name}
            </h2>
            <p className="mb-1">
              <strong>Jabatan:</strong> {selectedMentor.position}
            </p>
            <p className="mb-1">
              <strong>Hari Tersedia:</strong> {selectedMentor.day_start_available} - {selectedMentor.day_end_available}
            </p>
            <p className="mb-1">
              <strong>Jam Operasional:</strong> {selectedMentor.opening_hour} - {selectedMentor.closing_hour}
            </p>
            <p className="mb-1">
              <strong>Daftar Disini:</strong>{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={selectedMentor.googleFormLink}
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
              <li>BOOKING 1 HARI SEBELUM JADWAL KONSULTASI SESUAI DENGAN JAM YANG DISEDIAKAN.</li>
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
   </div>
  );
};

export default Consulting;
