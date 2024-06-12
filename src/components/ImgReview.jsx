import React from "react";

const ImgReview = () => {
  return (
    <div>
      <div className="containerImage flex flex-row items-center justify-center relative mb-4">
        <div className="flex flex-row items-center justify-center ">
          <img src="c1.webp" alt="" className="w-6 h-6 md:w-10 md:h-10 rounded-[50%] object-cover absolute left-0 md:-bottom-6" />
          <img src="c2.webp" alt="" className="w-6 h-6 md:w-10 md:h-10 rounded-[50%] object-cover absolute left-3 md:left-6 md:-bottom-6" />
          <img src="c3.webp" alt="" className="w-6 h-6 md:w-10 md:h-10 rounded-[50%] object-cover absolute left-6 md:left-12 md:-bottom-6" />
          <div className="w-6 h-6 md:w-10 md:h-10 rounded-[50%] bg-red-600 text-white flex items-center justify-center absolute left-[36px] md:left-[4.5rem] md:-bottom-6 text-[10px] md:text-base">12k+</div>
        </div>
      </div>
    </div>
  );
};

export default ImgReview;
