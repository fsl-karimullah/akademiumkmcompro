import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
const Hero = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row relative">
        {/* left side */}
        <div className="w-1/2 flex flex-col   gap-8">
          <div className="cherryDiv flex items-center justify-center w-fit bg-[var(--pink)] mt-12 rounded-[2rem] text-sm text-[var(--themeRed)] font-bold">
            <span>More than Faster</span>
            <img src="Cherry.png" alt="" width={40} height={25} />
          </div>
          <div className="heroText flex flex-col text-7xl font-bold">
            <span>Be The Fastest</span>
            <span>In Delivering</span>
            <span>
              Your <span style={{ color: "var(--themeRed)" }}>Pizza</span>
            </span>
          </div>
          <span className="miniText w-[70%] text-[var(--gray)] font-semibold">Our Mission is to filling your tummy with delicious food and with and free delivery</span>
          <button className="btn btnCss">Get Started</button>
          <div className="customer flex flex-row gap-2 items-center relative h-40">
            <div className="containercustomer flex flex-row items-center justify-center">
              <div className="containerImage flex flex-row items-center justify-center relative ">
                <div className="cardImage1 rounded-[50%] w-24 h-24 bg-[var(--pink)] flex items-center justify-center absolute left-0">
                  <img src="c1.webp" alt="" className="w-20 h-20 rounded-[50%] object-cover" />
                </div>
                <div className="cardImage2 rounded-[50%] w-24 h-24 bg-[var(--pink)] flex items-center justify-center absolute left-20 ">
                  <img src="c2.webp" alt="" className="w-20 h-20 rounded-[50%] object-cover" />
                </div>
                <div className="cardImage3 rounded-[50%] w-24 h-24 bg-[var(--pink)] flex items-center justify-center absolute left-40 ">
                  <img src="c3.webp" alt="" className="w-20 h-20 rounded-[50%] object-cover" />
                </div>
              </div>
            </div>
            <div className="containerText absolute left-64">
              <span className="custText font-bold">Our Happy Customer</span>
              <div className="flex flex-row gap-1">
                <StarIcon style={{ color: "orange" }} />
                <span className="font-semibold">4,8</span>
                <span className="text-[var(--gray)]">(12.5k Review)</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="w-1/2 flex items-center justify-center text-center">
          <div className=" relative ">
            <img src="image 46.png" alt="" width={650} height={550} />
            <div className="flex items-center justify-center absolute w-max p-4 rounded-[5rem] top-16 left-4 gap-4 bg-white shadow-2xl text-[var(--themeRed)] hover:cursor-pointer hover:scale-110">
              <span>Contact us</span>
              <div className="bg-[rgb(59,208,59)] rounded-full w-10 h-10 flex items-center justify-center">
                <LocalPhoneIcon style={{ color: "white" }} />
              </div>
            </div>
            <div className="flex gap-4 bg-white shadow-2xl p-2 rounded-lg absolute top-[400px] left-[400px] w-max items-center justify-center hover:cursor-pointer hover:scale-110">
              <div>
                <img src="p1.jpg" alt="" className="w-24 h-16 overflow-hidden object-cover rounded-lg" />
              </div>
              <div className="details flex flex-col justify-between font-bold">
                <span>Italian Pizza</span>
                <span>
                  <span style={{ color: "var(--themeRed)" }}>$ </span>7.49
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
