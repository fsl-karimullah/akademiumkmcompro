import React from "react";
import Logo from "../components/Logo";
import { ArrowRightAltOutlined, Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 justify-center p-2 md:py-4 md:px-2">
        <div className="w-full md:w-1/3 gap-2 flex flex-col justify-start  ">
          <Logo />
          <span className="text-[12px] md:text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti quidem inventore vitae.</span>
          <div className="flex flex-row items-center gap-2  md:gap-4 md:justify-around"></div>
        </div>
        <div className="md:w-2/3 flex flex-row text-[12px] gap-5 justify-around px-4">
          <div className="md:w-1/2 flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-[14px]">About</h1>
            <ul className="text-[10px] md:text-sm flex flex-col gap-2">
              <li>About Us</li>
              <li>Features</li>
              <li>News</li>
              <li>Menu</li>
            </ul>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-[14px]">Company</h1>
            <ul className="text-[10px] md:text-sm flex flex-col gap-2">
              <li>Why Foodeli?</li>
              <li>Partner with Us</li>
              <li>FAQ</li>
              <li>Blog</li>
            </ul>
          </div>
          {/* <div className="md:w-1/5 flex flex-col gap-2">
            <h1 className="font-bold">Support</h1>
            <ul className="text-[10px] md:text-sm flex flex-col gap-2">
              <li>Account</li>
              <li>Support Center</li>
              <li>Feedback</li>
              <li>Contact Us</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div className="md:w-1/5 flex flex-col gap-2">
            <h1 className="font-bold">Get in Touch</h1>
            <ul className="text-[10px] md:text-sm flex flex-col gap-2">
              <li>Question or feedback</li>
              <li>We'd love to hear from you</li>
            </ul>
            <button className="btn">
              <span className="text-[12px] md:text-sm">Email Address</span>
              <ArrowRightAltOutlined style={{ color: "white" }} />
            </button>
          </div> */}
        </div>
      </div>
      <div className="md:flex flex-row items-center justify-start gap-2 p-2 hidden">
        <Instagram style={{ color: "var(--themeRed)" }} />
        <Facebook style={{ color: "var(--themeRed)" }} />
        <Twitter style={{ color: "var(--themeRed)" }} />
      </div>
      <div className="flex flex-row items-center justify-start gap-2 p-2 md:hidden">
        <Instagram style={{ color: "var(--themeRed)", width: "15px" }} />
        <Facebook style={{ color: "var(--themeRed)", width: "15px" }} />
        <Twitter style={{ color: "var(--themeRed)", width: "15px" }} />
      </div>
    </div>
  );
};

export default Footer;
