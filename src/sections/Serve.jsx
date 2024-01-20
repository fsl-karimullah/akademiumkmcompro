import React from "react";
import CustomComponent from "../components/title/Title";

const services = [
  { title: "Easy To Order", Desc: "You only need a few steps in ordering food", img: "s1.png" },
  { title: "Easy To Order", Desc: "You only need a few steps in ordering food", img: "s2.png" },
  { title: "Easy To Order", Desc: "You only need a few steps in ordering food", img: "s3.png" },
];

const Serve = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-24 mt-10 w-full">
        <div>
          <CustomComponent
            title1="What we serve"
            title2="Your Favourite Food"
            title3="Delivery Partner"
            textColor1="#FF0000" // Warna untuk title1
            textColor2="#000000" // Warna untuk title2 dan title3
            alignItems="center"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-around">
          {services.map((service, index) => (
            <div key={index} className={`${index === 1 ? "bg-white" : "bg-red-400 md:bg-white text-white md:text-black"} w-full md:w-1/4 flex flex-col items-center gap-3 py-4 shadow-md`}>
              <img src={service.img} alt="" className="object-cover w-96 md:w-48" />
              <h1 className="font-bold text-lg">{service.title}</h1>
              <span className="font-thin text-sm text-center">{service.Desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Serve;
