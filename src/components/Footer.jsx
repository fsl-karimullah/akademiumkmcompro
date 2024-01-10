import React from "react";
import Logo from "./Logo";
import { ArrowBackIosNewRounded, ArrowCircleLeftOutlined, ArrowRightAltOutlined, Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="flex flex-row gap-8 justify-around py-24 px-20">
      <div className="w-1/5 gap-6 flex flex-col justify-center ">
        <Logo />
        <span className="text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti quidem inventore vitae.</span>
        <div className="flex flex-row items-center gap-4 justify-around">
          <Instagram style={{ color: "var(--themeRed)" }} />
          <Facebook style={{ color: "var(--themeRed)" }} />
          <Twitter style={{ color: "var(--themeRed)" }} />
        </div>
      </div>
      <div className="w-1/5 flex flex-col gap-2">
        <h1 className="font-bold">About</h1>
        <ul className="text-sm flex flex-col gap-2">
          <li>About Us</li>
          <li>Features</li>
          <li>News</li>
          <li>Menu</li>
        </ul>
      </div>
      <div className="w-1/5 flex flex-col gap-2">
        <h1 className="font-bold">Company</h1>
        <ul className="text-sm flex flex-col gap-2">
          <li>Why Foodeli?</li>
          <li>Partner with Us</li>
          <li>FAQ</li>
          <li>Blog</li>
        </ul>
      </div>
      <div className="w-1/5 flex flex-col gap-2">
        <h1 className="font-bold">Support</h1>
        <ul className="text-sm flex flex-col gap-2">
          <li>Account</li>
          <li>Support Center</li>
          <li>Feedback</li>
          <li>Contact Us</li>
          <li>Accessibility</li>
        </ul>
      </div>
      <div className="w-1/5 flex flex-col gap-2">
        <h1 className="font-bold">Get in Touch</h1>
        <ul className="text-sm flex flex-col gap-2">
          <li>Question or feedback</li>
          <li>We'd love to hear from you</li>
        </ul>
        <button className="px-4 py-2 bg-[var(--themeRed)] text-white rounded-full">
          <span className="text-sm">Email Address</span>
          <ArrowRightAltOutlined style={{ color: "white" }} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
