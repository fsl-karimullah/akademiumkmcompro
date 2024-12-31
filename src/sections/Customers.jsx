import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import ImgReview from "../components/ImgReview";
import CustomComponent from "../components/title/Title";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

// ✅ **Main Customers Component**
const Customers = ({ currentPath }) => {
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(-1);

  return (
    <>
      {currentPath === "/" ? (
        <div className="flex flex-col md:flex-row gap-8 py-10 px-6 md:px-16">
          {/* ✅ **Left Section (Image)** */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="amir faisal.webp"
              alt="Amir Faisal"
              className="md:w-96 w-full rounded-xl shadow-lg"
            />
          </div>

          {/* ✅ **Right Section (Content)** */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 justify-center text-center md:text-left">
            <CustomComponent
              title1="Pesan"
              title2="Chief Executive Officer"
              title3="Akademi UMKM"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="start"
            />
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Salah satu misi saya adalah membantu UMKM untuk transisi dari
              tradisional menjadi UMKM yang bisa bersaing secara digital. Dalam
              era globalisasi ini, transformasi digital menjadi kunci utama
              kesuksesan bisnis.
            </p>

            {/* ✅ **Profile Section** */}
            <div className="flex items-center gap-4 mt-4">
              <img
                src="amir faisal.webp"
                alt="Amir Faisal"
                className="w-12 h-12 rounded-full object-cover shadow-md"
              />
              <div>
                <h3 className="font-bold text-sm">Amir Faisal Karimullah</h3>
                <p className="text-gray-600 text-xs">CEO Akademi UMKM</p>
              </div>
            </div>

            {/* ✅ **Rating Section** */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
            </div>
          </div>
        </div>
      ) : (
        // ✅ **Alternate Section for Other Pages**
        <div className="flex flex-col gap-8 py-12 px-6 md:px-16 items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Menjangkau Customer dengan Mudah!
          </h1>
          <p className="text-gray-700 text-center md:w-2/3 leading-relaxed">
            Dengan Akademi UMKM, Anda dapat memasang dan memasukkan data bisnis
            dengan cepat dan mudah. Customer akan menghubungi Anda lewat media
            sosial dan WhatsApp.
          </p>

          {/* ✅ **Steps Section** */}
          <div className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center gap-6">
            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="kitalulus.webp"
                alt="Steps Illustration"
                className="w-[300px] md:w-[400px] rounded-lg shadow-md"
              />
            </div>

            {/* Steps List */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                Mulai Pencarian Customer dengan 3 Langkah Mudah:
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-4">
                  <CheckCircleIcon style={{ color: "#d61355" }} />
                  <span>Klik tombol pasang bisnis gratis di bawah</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircleIcon style={{ color: "#d61355" }} />
                  <span>
                    Isi data dan daftarkan perusahaan atau bisnis Anda
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircleIcon style={{ color: "#d61355" }} />
                  <span>
                    Kelola bisnis Anda dan tunggu customer menghubungi atau
                    mengunjungi tempat Anda
                  </span>
                </li>
              </ul>
              <a
                href="http://ukm.sixeyestech.com/admin/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition duration-300 text-center"
              >
                🚀 Pasang Bisnis Gratis!
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
