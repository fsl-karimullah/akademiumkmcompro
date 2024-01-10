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
    <div className="bg-red-100 flex flex-row h-[750px] gap-4 items-center p-10">
      {/* left */}
      <div className="w-1/2 flex flex-col p-0 ">
        <div className="flex flex-row items-center ">
          <div className=" flex flex-col gap-6 w-4/5">
            <span className="uppercase text-sm font-semibold text-[var(--themeRed)]">Download Our App</span>
            <div>
              <h1 className="text-3xl font-bold">Get Started With</h1>
              <h1 className="text-3xl font-bold">Fudo Today!</h1>
            </div>
            <p className="text-[var(--gray)]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptates temporibus cumque iure, laudantium ab. Eligendi rerum eos necessitatibus ex.</p>
            <button className="btn">Get The App</button>
          </div>
          <div className="flex flex-col gap-4 bg-[var(--themeRed)] rounded-2xl w-1/5 h-48 items-center justify-center">
            <div className="flex items-center justify-center bg-white rounded-full ">
              <img src="money.png" alt="" className="w-20 object-cover" />
            </div>
            <span className="text-sm text-center text-white">Your Food Has Arrived</span>
          </div>
        </div>
        <div className="flex flex-row justify-end relative">
          <Richard />
        </div>
      </div>
      {/* right */}
      <div className="w-1/2 flex flex-col">
        <div className="bg-white rounded-3xl w-[60%] h-[550px]  ">
          <div className="flex flex-col items-center justify-between p-0">
            <CaliforniaCard />
          </div>
          <div className="flex flex-col items-center justify-between p-4">
            <div className="bg-red-100 w-[300px] gap-4 h-32 p-4 rounded-3xl flex flex-row items-center justify-center">
              <div className="flex flex-col gap-2">
                <div className="font-bold">
                  <h1>The Fastest in</h1>
                  <h1>
                    Delivery <span className="text-[var(--themeRed)]">Food</span>
                  </h1>
                </div>
                <button className="btn">Order Now</button>
              </div>
              <div className="w-24">
                <img src="courier.png" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="relative flex flex-col justify-between p-10">
            <h1 className="font-bold">Categories</h1>
            <div className="flex flex-row items-center justify-center absolute top-[80px] left-24">
              <TypeOfMenu MenuType={MenuType} handleClick={handleClick} flexDirection="row" bg="gray" gap="gap" />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-10">
            <div className="w-1/2 flex flex-col ">
              <h1 className="font-bold">Popular Now</h1>
              <img src="b3.avif" alt="" className="object-cover w-32 rounded-full" />
            </div>
            <div className="w-1/2 flex flex-col">
              <h1 className="text-yellow-600">View All</h1>
              <img src="r2.avif" alt="" className="object-cover w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
