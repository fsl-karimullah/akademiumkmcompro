import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
const Hero = ({ currentPath }) => {
  console.log(currentPath);

  return (
    <div className="">
      {currentPath === "/" ? (
        <div className="flex flex-col items-center justify-center md:flex-row relative">
          {/* left side */}
          <div className="w-full md:w-1/2 flex flex-col text-center md:text-left gap-6 md:gap-8">
            <div className="flex items-center justify-center w-fit bg-[var(--pink)] md:mt-12 rounded-[2rem] md:text-sm text-[10px] p-1 text-[var(--themeRed)] font-semibold">
              <span>Mudahkan Pencarian Bisnis di Sekitar Anda</span>
              <img src="Cherry.webp" alt="" width={40} height={25} />
            </div>
            <div className="flex flex-col text-5xl md:text-7xl font-bold">
              <span>Cari Produk</span>
              <span>dan Jasa</span>
              <span>
                Dengan <span style={{ color: "var(--themeRed)" }}>Aman dan Tenang</span>
              </span>
            </div>
            <span className="md:w-[70%] text-[var(--gray)] font-semibold text-sm md:text-lg">
              Misi kami adalah memberikan jalan kepada pebisnis dan pengguna untuk saling berinteraksi dan sebagai bentuk dukungan kami kepada produk lokal indonesia
            </span>
            {/* <div>
              <button className="btn btnCss">Download Aplikasi</button>
            </div> */}
            {/* <div className="customer flex flex-row gap-2 items-center relative h-24 md:h-36 md:w-auto w-80 shadow-2xl p-2">
              <div className="containercustomer flex flex-row items-center justify-center">
                <div className="containerImage flex flex-row items-center justify-center relative ">
                  <div className="rounded-[50%] w-14 h-14 md:w-24 md:h-24 bg-[var(--themeRed)] flex items-center justify-center absolute left-0 md:left-0">
                    <img src="c1.webp" alt="" className="w-12 h-12 md:w-[84px] md:h-[84px] rounded-[50%] object-cover" />
                  </div>
                  <div className="rounded-[50%] w-14 h-14 md:w-24 md:h-24 bg-[var(--themeRed)] flex items-center justify-center absolute left-8 md:left-16 ">
                    <img src="c2.webp" alt="" className="w-12 h-12 md:w-[84px] md:h-[84px] rounded-[50%] object-cover" />
                  </div>
                  <div className="rounded-[50%] w-14 h-14 md:w-24 md:h-24 bg-[var(--themeRed)] flex items-center justify-center absolute left-16 md:left-32">
                    <img src="c3.webp" alt="" className="w-12 h-12 md:w-[84px] md:h-[84px] rounded-[50%] object-cover" />
                  </div>
                </div>
              </div>
              <div className="containerText text-sm md:text-xl absolute left-32 md:left-64">
                <span className="custText font-bold">Our Happy Customer</span>
                <div className="flex flex-row gap-1 items-center">
                  <StarIcon style={{ color: "orange" }} />
                  <span className="font-semibold">4,8</span>
                  <span className="text-[var(--gray)]">(12.5k Review)</span>
                </div>
              </div>
            </div> */}
          </div>
          {/* Right side */}
          <div className="w-1/2 flex items-center justify-center text-center">
            <div className=" relative ">
              <div className="md:w-[600px] w-[400px]">
                <img src="p1.webp" alt="" className="w-full md:w-full" />
              </div>
              {/* <div className="flex items-center justify-center absolute w-34 md:w-max p-2 md:p-4 rounded-[5rem] top-14 left-0 md:top-16 md:left-4 gap-4 bg-white shadow-2xl text-[var(--themeRed)] hover:cursor-pointer hover:scale-110">
                <span className="text-sm md:text-2xl">Contact us</span>
                <div className="bg-[rgb(59,208,59)] rounded-full md:w-10 md:h-10  flex items-center justify-center">
                  <LocalPhoneIcon style={{ color: "white" }} />
                </div>
              </div> */}
              {/* <div className="flex gap-4 bg-white shadow-2xl p-2 rounded-lg absolute top-72 left-56 md:top-[400px] md:left-[340px] w-max items-center justify-center hover:cursor-pointer hover:scale-110">
                <div>
                  <img src="p1.webp" alt="" className="w-14 h-10 md:w-24 md:h-16 overflow-hidden object-cover rounded-lg" />
                </div>
                <div className="details flex flex-col justify-between font-bold ">
                  <span className="text-sm md:text-2xl">Cari Produk & Jasa</span>
                  <span className="text-sm md:text-2xl">
                    <span className="text-[var(--themeRed)]">Rp. </span>0
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[600px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('loginbisnis.webp')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>

          <div className="absolute w-full md:w-1/2 text-center inset-0 flex flex-col items-center md:items-start justify-center md:text-start gap-10 md:gap-4 p-10 text-white">
            <div className=" w-full flex flex-col gap-1 text-3xl md:text-5xl font-bold">
              <h1>Pasang Iklan</h1>
              <h1>Bisnis Anda</h1>
              <h1 className="text-[var(--themeRed)]">GRATIS!</h1>
            </div>
            <span className="md:text-xl font-light">Pasang Bisnis Anda Di Aplikasi Kami Gratis!</span>
            <a target="blank" href="https://www.youtube.com/watch?v=25RD3_TE33s" className="btn font-bold">
              Lihat Tutorial Upload Bisnis Disini
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
