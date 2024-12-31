import React from "react";

const Hero = ({ currentPath }) => {
  console.log(currentPath);

  return (
    <div className=" text-[var(--themeRed)]">
      {currentPath === "/" ? (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 py-16 px-6 md:px-20">
          {/* Left Section */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <div className="inline-flex items-center bg-[var(--themeRed)] text-white text-sm px-4 py-1 rounded-full shadow-md">
              🌟 Mudahkan Pertumbuhan Bisnis UMKM Anda
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Bangun Masa Depan <br />
              <span className="text-[var(--themeRed)]">UMKM Indonesia</span>
            </h1>
            <p className="text-gray-700 md:w-[80%] text-sm md:text-lg">
              Akademi UMKM hadir untuk meningkatkan keterampilan dan strategi
              bisnis para pelaku UMKM dengan pendekatan yang praktis dan
              aplikatif.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <a
                href="https://www.youtube.com/watch?v=25RD3_TE33s"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition duration-300 shadow-lg"
              >
                🎓 Lihat Tutorial Bergabung
              </a>
              <a
                href="/contact"
                className="bg-white border-2 border-[var(--themeRed)] text-[var(--themeRed)] px-6 py-2 rounded-md font-bold hover:bg-[var(--themeRed)] hover:text-white transition duration-300 shadow-lg"
              >
                📞 Hubungi Kami
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[90%] md:w-[80%]">
              <img
                src="p1.webp"
                alt="Akademi UMKM"
                className="w-full rounded-3xl shadow-lg"
              />
              <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg">
                <img src="logo-transparent.webp" alt="Logo Akademi UMKM" width={50} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Alternate Section for Different Paths
        <div className="relative w-full h-[600px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('umkmBanner.webp')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--themeRed)] opacity-80"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 text-white p-8">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Bersama Akademi UMKM
            </h1>
            <p className="text-lg md:text-xl">
              Raih peluang bisnis dengan edukasi dan strategi terbaik.
            </p>
            <a
              href="https://www.youtube.com/watch?v=25RD3_TE33s"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[var(--themeRed)] px-6 py-2 rounded-md font-bold hover:bg-gray-100 transition duration-300"
            >
              🎓 Mulai Sekarang
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
