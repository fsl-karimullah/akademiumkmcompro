import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBag from "./ShoppingBag";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const menu = ["About Us", "Services", "Menu", "Contact"];

const Navbar = ({ currentPath }) => {
  console.log(currentPath);
  return (
    <div>
      <div className="h-14 m-5">
        <div className="flex flex-row items-center justify-between ">
          <Logo />
          {/* <div className="hidden md:flex flex-row items-center gap-2 cursor-pointer">
            {menu.map((item, i) =>
              item === "Services" || item === "Menu" ? (
                <div key={i} className="gap-0 flex flex-row items-center">
                  <a className="block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]">{item}</a>
                  <KeyboardArrowDownOutlinedIcon style={{ color: "red" }} />
                </div>
              ) : (
                <div>
                  <a key={i} className="block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]">
                    {item}
                  </a>
                </div>
              )
            )}
          </div> */}
          <div>
            {currentPath === "/" ? (
              <div className="hidden md:flex flex-row items-center gap-2">
                {/* <SearchIcon style={{ cursor: "pointer" }} />
                <ShoppingBag /> */}
                <a href="/loginbisnis" className="btnSec bisnis flex items-center gap-[5px] transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] hover:bg-[var(--themeBlack)]">
                  <LoginIcon /> <span>Pasang Bisnis</span>
                </a>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2">
                <button className="btn hidden md:flex flex-row items-center gap-2">
                  <LocalPhoneIcon style={{ color: "white" }} />
                  <span>Hubung kami</span>
                </button>
                <div className="btn hidden md:flex flex-row items-center gap-2">
                  <a href="/" className="text-white flex flex-row justify-center gap-1 ">
                    {" "}
                    Back
                    <ExitToAppIcon style={{ color: "white" }} />
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* mobile menu */}
          <div className="md:hidden">
            <MobileMenu currentPath={currentPath} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
