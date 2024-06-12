import React from "react";
import CustomComponent from "../components/title/Title";
import ClientListComponent from "../components/client/ClientList";

const services = [
  { title: "Order dengan Mudah", Desc: "Anda hanya perlu menginstall aplikasi Brand-In dan mencari barand atau jasa yang anda butuhkan", img: "s1.webp" },
  { title: "Cari produk dan jasa dengan mudah", Desc: "Kami bekerjasama dengan berbagai mitra bisnis produk dan jasa", img: "s2.webp" },
  { title: "Promosikan bisnis anda", Desc: "Anda bisa mempromosikan bisnis secara gratis melalui platform kami", img: "s3.webp" },
];

const Serve = ({ currentPath, Clients }) => {
  console.log(currentPath);
  return (
    <div className="flex flex-row items-center justify-between">
      {currentPath === "/" ? (
        <div className="flex flex-col gap-24 mt-10 w-full">
          <div>
            <CustomComponent title1="Apa yang kami sediakan" title2="Untuk Kamu" title3="di Brand-In Indonesia" textColor1="#FF0000" textColor2="#000000" alignItems="center" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around">
            {services.map((service, index) => (
              <div key={index} className={`${index === 1 ? "bg-white" : "bg-red-400 md:bg-white text-white md:text-black"} w-full md:w-1/4 flex flex-col items-center gap-3 py-4 shadow-md`}>
                <img src={service.img} alt="" className="object-cover w-96 md:w-48" />
                <h1 className="font-bold text-lg mx-4 text-center">{service.title}</h1>
                <span className="font-thin text-sm text-center mx-4">{service.Desc}</span>
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
