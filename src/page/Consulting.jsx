import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";
import { Tooltip } from "react-tooltip";
import {
  CalendarToday,
  WatchLater,
  Person,
  WhatsApp,
  Info,
} from "@mui/icons-material";

const Consulting = ({ currentPath }) => {
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar currentPath={currentPath} />

      {/* ✅ Hero Section */}
      <div className="text-center py-16 md:py-24 bg-gradient-to-r from-[var(--themeRed)] to-[#d61355] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fadeIn">
            Layanan Konsultasi Bisnis
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-6 animate-fadeIn delay-200">
            Terhubung langsung dengan mentor berpengalaman untuk membangun
            bisnis Anda dengan lebih efektif dan efisien.
          </p>
          <a
            href="https://wa.me/6285281252199"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-white text-[var(--themeRed)] font-semibold px-6 py-3 rounded-md hover:bg-gray-200 transition duration-300"
          >
            Hubungi Kami di WhatsApp
          </a>
        </div>
      </div>

      {/* ✅ Mentor Cards */}
      <div className="container mx-auto p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-[var(--themeRed)]">
          Daftar Mentor Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={mentor.thumbnail}
                alt={mentor.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{mentor.position}</p>
                <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                  <CalendarToday fontSize="small" />
                  <span>
                    {mentor.day_start_available} - {mentor.day_end_available}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                  <WatchLater fontSize="small" />
                  <span>
                    {mentor.opening_hour} - {mentor.closing_hour}
                  </span>
                </div>
                <button
                  onClick={() => handleScheduleConsultation(mentor)}
                  className="mt-4 w-full bg-[var(--themeRed)] text-white py-2 rounded-md hover:bg-[#b50d44] transition duration-300 flex items-center justify-center gap-2"
                >
                  <WhatsApp fontSize="small" />
                  Jadwalkan Konsultasi
                </button>
                <Tooltip content="Konsultasi tersedia melalui WhatsApp. Klik untuk jadwalkan!" direction="top">
                  <span className="text-xs text-gray-500 block text-center mt-1 cursor-pointer">
                    Info lebih lanjut
                  </span>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Charity Section */}
      <div className="bg-[var(--themeRed)] py-8 mt-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Charity Initiative</h2>
        <p className="text-lg md:text-xl mb-4">
          Semua hasil konsultasi dalam bulan ini akan didonasikan ke Palestina dan
          masyarakat Indonesia.
        </p>
        <a
          href="https://forms.gle/v8t9tGLxRTo9mwiU9"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[var(--themeRed)] py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        >
          Lakukan Mentoring & Donasi Sekarang
        </a>
      </div>
    </div>
  );
};

export default Consulting;
