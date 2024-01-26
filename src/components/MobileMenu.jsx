import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const links = [
  { id: 1, title: "About Us", url: "/" },
  { id: 2, title: "Services", url: "/" },
  { id: 3, title: "Menu", url: "/" },
  { id: 4, title: "contact", url: "/" },
];

const MobileMenu = ({ currentPath }) => {
  const [open, setOpen] = useState(false);
  console.log(open);
  console.log(currentPath);
  return (
    <div className="">
      {!open ? <img src="open.png" alt="" width={20} height={20} onClick={() => setOpen(true)} /> : <img src="close.png" alt="" width={20} height={20} onClick={() => setOpen(false)} />}
      <div
        className={`bg-red-400 text-white absolute left-0 top-20 w-screen h-[calc(100vh-5rem)] flex flex-col gap-8 items-center justify-center text-3xl z-50 transform origin-top-left ${
          open ? "scale-100 transition-transform duration-500" : "scale-0 transition-transform duration-500 pointer-events-none"
        }`}
      >
        {open &&
          links.map((item) => (
            <a href={item.url} key={item.id} onClick={() => setOpen(false)} className="hover:scale-110">
              {item.title} {item.title === "Services" || item.title === "Menu" ? <KeyboardArrowDownOutlinedIcon style={{ color: "white" }} /> : null}
            </a>
          ))}
        {currentPath === "/" ? (
          <div className="flex flex-col items-center gap-8">
            <div className="cursor-pointer hover:scale-110">
              <SearchIcon style={{ cursor: "pointer" }} /> <span>Search</span>
            </div>
            <div className="flex flex-row gap-2 items-center cursor-pointer hover:scale-110">
              <ShoppingBagOutlinedIcon style={{ cursor: "pointer" }} /> <span>Shoping Cart (4)</span>
            </div>
            <a href="/loginbisnis" className="btnSec bisnis flex items-center gap-[5px] transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] hover:bg-[var(--themeBlack)]">
              <LoginIcon /> <span>Pasang Bisnis</span>
            </a>
          </div>
        ) : (
          <>
            <button className="btn flex flex-row gap-2 items-center justify-center">
              <LocalPhoneIcon style={{ color: "white" }} />
              <span>Hubung kami</span>
            </button>
            <div className="btn flex flex-row gap-2 items-center justify-center">
              <a href="/" className="text-white flex flex-row justify-center gap-1 ">
                {" "}
                Back
                <ExitToAppIcon style={{ color: "white" }} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
