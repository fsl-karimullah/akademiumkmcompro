import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBag from "./ShoppingBag";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLocation } from "react-router-dom";

const menu = [
  { name: "Home", path: "/" },
  { name: "Branding UMKM", path: "/bantu-branding" },
  { name: "Event dan Webinar", path: "/webinars" },
  { name: "Promosi Bisnis", path: "/loginbisnis" },
  { name: "Founder Playground", path: "/landing" },
  { name: "Contact", path: "https://wa.me/6285281252199", external: true }
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="border-b-2 border-gray-200">
      <div className="h-14 m-5">
        <div className="flex flex-row items-center justify-between ">
          <Logo />
          <div className="hidden md:flex flex-row items-center gap-6 cursor-pointer">
            {menu.map((item, i) =>
              <a
                key={i}
                href={item.path}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : ""}
                className={`block text-decoration-none relative text-black transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] ${location.pathname === item.path ? 'border-b-2 border-[var(--themeRed)]' : ''
                  }`}
              >
                {item.name}
              </a>
            )}
          </div>

          <div className="md:hidden">
            <MobileMenu currentPath={location.pathname} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
