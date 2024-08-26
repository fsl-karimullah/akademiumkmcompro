import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Branding UMKM", path: "/bantu-branding" },
  { name: "Promosi Bisnis", path: "/loginbisnis" },
  { name: "Founder Playground", path: "/landing" },
  { name: "Contact", path: "https://wa.me/6285281252199", external: true }
];

const MobileMenu = ({ currentPath }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {!open ? (
        <img
          src="open.webp"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <img
          src="close.webp"
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`bg-red-400 text-white absolute left-0 top-20 w-screen h-[calc(100vh-5rem)] flex flex-col gap-8 items-center justify-center text-lg md:text-3xl z-50 transform origin-top-left ${
          open
            ? "scale-100 transition-transform duration-500"
            : "scale-0 transition-transform duration-500 pointer-events-none"
        }`}
      >
        {open &&
          links.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block text-decoration-none relative transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]"
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : ""}
            >
              {item.name} {item.name === "Promosi Bisnis" || item.name === "Founder Playground" ? <KeyboardArrowDownOutlinedIcon style={{ color: "white" }} /> : null}
            </Link>
          ))}
        {currentPath === "/" ? (
          <div className="flex flex-col items-center gap-8">
            <Link
              to="/loginbisnis"
              className="block text-decoration-none relative transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]"
            >
              <LoginIcon style={{ color: "white" }} /> <span className="text-sm md:text-base">Pasang Bisnis</span>
            </Link>
          </div>
        ) : (
          <>
            <a
              href="https://wa.me/6285281252199"
              target="_blank"
              className="block text-decoration-none relative transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]"
              rel="noopener noreferrer"
            >
              Konsultasi <LocalPhoneIcon style={{ color: "white" }} />
            </a>
            <Link
              to="/"
              className="block text-decoration-none relative transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)]"
            >
              Kembali <ExitToAppIcon style={{ color: "white" }} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
