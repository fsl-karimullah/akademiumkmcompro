// import { Rating } from "@mui/material";
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

const Customers = ({ currentPath }) => {
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(-1);
  return (
    <>
      {currentPath === "/" ? (
        <div className="flex flex-col md:flex-row mt-2 gap-6 md:gap-0 md:mt-10 overflow-y-auto md:h-[500px]">
          {/* left */}
          <div className="w-full md:w-1/2 relative overflow-hidden  ">
            <img src="amir faisal.webp" alt="" className="md:w-96 w-full " />
          </div>
          {/* right */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center text-center md:text-left  ">
            <CustomComponent
              title1="Pesan"
              title2="Chief Executive Officer"
              title3="Brand-in Indonesia"
              textColor1="#FF0000" // Warna untuk title1
              textColor2="#000000" // Warna untuk title2 dan title3
              alignItems="start"
            />
            <span className="font-thin text-[10px] md:text-sm">
              Salah satu misi saya adalah membantu UMKM untuk transisi dari tradisional menjadi UMKM yang bisa bersaing secara digital. Dalam era globalisasi ini, transformasi digital menjadi kunci utama kesuksesan bisnis.
            </span>
            <div className="flex flex-col items-center md:items-start gap-2">
              <img src="amir faisal.webp" alt="" className="w-10 h-10 rounded-[50%] object-cover" />
              <div className="flex flex-col">
                <h1 className="font-bold text-sm">Amir Faisal Karimullah</h1>
                <span className="font-thin text-[10px]">Chief Executive Officer Brand-in</span>
              </div>
              {/* <div>
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    //   name="hover-feedback"
                    name="size-small"
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
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center ">
          <h1 className="text-2xl text-center  md:text-4xl font-bold">Menjangkau customer dengan mudah!</h1>
          <p className="text-base md:text-lg font-medium md:w-[50%] text-center">Dengan Brand-In, anda dapat pasang dan masukkan data bisnis anda dengan cepat dan mudah. Customer akan menghubungi anda lewat sosial media, dan whatsaap.</p>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-slate-200 p-10">
            <div className="md:w-1/2">
              <img src="kitalulus.webp" alt="" className="w-[500px]" />
            </div>
            <div className="md:w-1/2 flex flex-col items-center gap-10 md:gap-24">
              <h1 className="text-2xl md:text-4xl font-semibold flex items-center justify-center text-center">Mulai pencarian customer dengan tiga langkah mudah:</h1>
              <ul className="flex flex-col gap-4 text-xl font-light">
                <li className="flex flex-row items-center gap-4">
                  <CheckCircleIcon style={{ color: "#FF0000" }} />
                  <span>Klik tombol pasang bisnis gratis di bawah</span>
                </li>
                <li className="flex flex-row items-center gap-4">
                  <CheckCircleIcon style={{ color: "#FF0000" }} />
                  <span>Isi data dan daftarkan perusahaan atau bisnis Anda</span>
                </li>
                <li className="flex flex-row items-center gap-4">
                  <CheckCircleIcon style={{ color: "#FF0000" }} />
                  <span>Kelola bisnis anda dan tunggu customer menghubungi atau mengunjungi tempat anda</span>
                </li>
              </ul>
              <button className="btn font-bold">Pasang Bisnis Gratis!</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
