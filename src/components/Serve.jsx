import React from "react";

const Serve = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-24 mt-10 w-full">
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="uppercase text-sm text-[var(--themeRed)] font-semibold">What we serve</span>
          <h1 className="font-bold text-2xl">Your Favourite Food</h1>
          <h1 className="font-bold text-2xl">Delivery Partner</h1>
        </div>
        <div className="flex flex-row items-center justify-around">
          <div className="w-1/4 flex flex-col items-center gap-3">
            <img src="s1.png" alt="" className="object-cover w-48" />
            <h1 className="font-bold text-lg">Easy To Order</h1>
            <span className="font-thin text-sm">You only need a few steps in ordering food</span>
          </div>
          <div className="w-1/4 flex flex-col items-center gap-3">
            <img src="s2.png" alt="" className="object-cover w-48" />
            <h1 className="font-bold text-lg">Easy To Order</h1>
            <span className="font-thin text-sm">You only need a few steps in ordering food</span>
          </div>
          <div className="w-1/4 flex flex-col items-center gap-3">
            <img src="s3.png" alt="" className="object-cover w-48" />
            <h1 className="font-bold text-lg">Easy To Order</h1>
            <span className="font-thin text-sm">You only need a few steps in ordering food</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Serve;
