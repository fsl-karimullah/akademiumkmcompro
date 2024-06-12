import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBag from "./ShoppingBag";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

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
                <Link
                  to="/loginbisnis"
                  className="btnSec bisnis flex items-center gap-[5px] transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] hover:bg-[var(--themeBlack)]"
                >
                  <LoginIcon /> <span>Area Bisnis</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2">
               <Link
                  to="/videoedukasi"
                  className="btnSec bisnis flex items-center gap-[5px] transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] hover:bg-[var(--themeBlack)]"
                >
                  <LoginIcon /> <span>Video Edukasi</span>
                </Link>
                <button className="btn hidden md:flex flex-row items-center gap-2">
                  <LocalPhoneIcon style={{ color: "white" }} />
                  <a
                    href="https://wa.me/6285281252199"
                    target="blank"
                    className="text-white"
                  >
                    Konsultasi
                  </a>
                </button>

                <div className="btn hidden md:flex flex-row items-center gap-2">
                  <Link to="/" className="text-white flex items-center gap-1">
                    <span>Kembali</span>
                    <ExitToAppIcon style={{ color: "white" }} />
                  </Link>
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
