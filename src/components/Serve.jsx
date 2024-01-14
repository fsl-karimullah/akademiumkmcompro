import React from "react";

const services = [
  { title: "Easy To Order", Desc: "You only need a few steps in ordering food", img: "s1.png" },
  { title: "Easy To Order", Desc: "You only need a few steps in ordering food", img: "s2.png" },
  { title: "Easy To Order", Desc: "You only need a few steps in ordering food", img: "s3.png" },
];

const Serve = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-24 mt-10 w-full">
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="uppercase text-sm text-[var(--themeRed)] font-semibold">What we serve</span>
          <h1 className="font-bold text-2xl">Your Favourite Food</h1>
          <h1 className="font-bold text-2xl">Delivery Partner</h1>
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
