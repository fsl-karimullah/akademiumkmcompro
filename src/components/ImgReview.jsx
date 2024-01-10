import React from "react";

const ImgReview = () => {
  return (
    <div>
      <div className="containerImage flex flex-row items-center justify-center relative mb-4 ">
        <div className="flex flex-row items-center justify-center ">
          <img src="c1.webp" alt="" className="w-10 h-10 rounded-[50%] object-cover absolute left-0 -bottom-6" />
          <img src="c2.webp" alt="" className="w-10 h-10 rounded-[50%] object-cover absolute left-6 -bottom-6" />
          <img src="c3.webp" alt="" className="w-10 h-10 rounded-[50%] object-cover absolute left-12 -bottom-6" />
          <div className="w-10 h-10 rounded-[50%] bg-red-600 text-white flex items-center justify-center absolute left-[4.5rem] -bottom-6">12k+</div>
        </div>
      </div>
    </div>
  );
};

export default ImgReview;
