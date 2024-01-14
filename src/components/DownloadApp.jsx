import React from "react";
import Richard from "./Richard";
import TypeOfMenu from "./TypeOfMenu";
import CaliforniaCard from "./CaliforniaCard";
const MenuType = [
  { title: "Burger", type: "burger", img: "burger.jpg" },
  { title: "Pizza", type: "pizza", img: "pizza.jpg" },
  { title: "Cupcake", type: "cupcake", img: "cupcake.jpg" },
];

const handleClick = () => {
  console.log("clicked");
};
const DownloadApp = () => {
  return (
    <div className="bg-red-100 flex flex-col md:flex-row md:h-[750px] gap-4 items-center p-4 md:p-10">
      {/* left */}
      <div className="md:w-1/2 flex flex-col p-0 gap-4 md:gap-0 ">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 ">
          <div className=" flex flex-col gap-4 md:gap-6 text-center md:text-left md:w-4/5">
            <span className="uppercase text-[20px] md:text-sm font-semibold text-[var(--themeRed)]">Download Our App</span>
            <div>
              <h1 className="text-sm md:text-3xl font-bold">Get Started With</h1>
              <h1 className="text-sm md:text-3xl font-bold">Fudo Today!</h1>
            </div>
            <p className="text-[var(--gray)] text-sm md:text-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptates temporibus cumque iure, laudantium ab. Eligendi rerum eos necessitatibus ex.</p>
            <div>
              <button className="btn">Get The App</button>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-[var(--themeRed)] rounded-2xl w-full md:w-1/5 h-48 items-center justify-center">
            <div className="flex items-center justify-center bg-white rounded-full ">
              <img src="money.png" alt="" className="w-36 md:w-20 object-cover" />
            </div>
            <span className="text-sm text-center text-white">Your Food Has Arrived</span>
          </div>
        </div>
        <div className="flex flex-row justify-center md:justify-end md:relative">
          <Richard />
        </div>
      </div>
      {/* right */}
      <img src="phone.png" alt="" className="md:w-1/2 object-contain" />
    </div>
  );
};

export default DownloadApp;
