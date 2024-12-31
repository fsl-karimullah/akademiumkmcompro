import React from "react";
import CustomComponent from "../components/title/Title";
import ClientListComponent from "../components/client/ClientList";

const services = [
  {
    title: "Akses Mudah ke Materi Edukasi",
    Desc: "Cukup bergabung dengan Akademi UMKM untuk mendapatkan materi edukasi bisnis yang praktis dan aplikatif.",
    img: "s1.webp",
  },
  {
    title: "Jaringan dengan Pelaku UMKM",
    Desc: "Kami memfasilitasi jaringan antar pelaku UMKM untuk berbagi pengalaman dan peluang bisnis.",
    img: "s2.webp",
  },
  {
    title: "Promosikan Produk UMKM",
    Desc: "Dapatkan kesempatan mempromosikan produk Anda secara gratis melalui platform kami.",
    img: "s3.webp",
  },
];

const Serve = ({ currentPath, Clients }) => {
  console.log(currentPath);
  return (
    <div className="bg-white text-[var(--themeRed)] py-12">
      {currentPath === "/" ? (
        <div className="flex flex-col gap-24 mt-10 w-full">
          <div>
            <CustomComponent
              title1="Apa yang Kami Tawarkan"
              title2="Untuk Anda"
              title3="di Akademi UMKM"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="center"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${
                  index === 1
                    ? "bg-white text-[var(--themeRed)]"
                    : "bg-[var(--themeRed)] text-white"
                } w-full md:w-1/4 flex flex-col items-center gap-4 p-6 rounded-xl shadow-md transition-transform transform hover:scale-105`}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="object-cover w-40 h-40 rounded-full shadow-lg"
                />
                <h1 className="font-bold text-xl text-center">{service.title}</h1>
                <span className="font-light text-sm text-center">
                  {service.Desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ClientListComponent pageType="4" clients={Clients} />
      )}
    </div>
  );
};

export default Serve;
