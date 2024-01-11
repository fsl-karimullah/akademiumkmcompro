import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBag from "./ShoppingBag";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div>
      <div className="h-14 m-5">
        <div className="flex flex-row items-center justify-between">
          <Logo />
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <a className="block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]">About Us</a>
            <a className="block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]">
              <span>Services</span>
              <KeyboardArrowDownOutlinedIcon style={{ color: "red" }} />
            </a>
            <a className="block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]">
              <span>Menu</span>
              <KeyboardArrowDownOutlinedIcon style={{ color: "red" }} />
            </a>
            <a className="block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]">Contact</a>
          </div>
          <div className="flex flex-row items-center gap-2">
            <SearchIcon style={{ cursor: "pointer" }} />
            <ShoppingBag />
            <button className="btnSec bisnis flex items-center gap-[5px] transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] hover:bg-[var(--themeBlack)]">
              <LoginIcon /> <span>Pasang Bisnis</span>
            </button>
            {/* <button className="btn login transition-colors duration-300 ease-in-out hover:bg-[var(--primary)]">
              <LoginIcon /> <span>Login</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
