import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Richard = () => {
  return (
    <div className="flex items-center justify-center absolute w-max p-4 rounded-[5rem] top-10 left-[285px] gap-4 bg-white shadow-2xl text-[var(--themeRed)] hover:cursor-pointer hover:scale-110">
      <div className="bg-pink-200 rounded-full w-10 h-10 flex items-center justify-center">
        <img src="HeroImage2.png" alt="" className="w-8 rounded-full object-cover items-center justify-center " />
      </div>
      <div>
        <h1 className="text-base font-semibold text-black">Richard Watson</h1>
        <span className="text-sm text-gray-400">Food Courier</span>
      </div>
      <div className="bg-red-600 rounded-full w-10 h-10 flex items-center justify-center">
        <LocalPhoneIcon style={{ color: "white" }} />
      </div>
    </div>
  );
};

export default Richard;
