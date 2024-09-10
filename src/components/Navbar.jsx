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
  { name: "Konsultasi Bisnis", path: "/konsultasi" },
  { name: "Founder Playground", path: "/landing" },
  { name: "Contact", path: "https://wa.me/6285281252199", external: true },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="border-b border-gray-200">
      <div className="h-12 px-4 md:px-6"> {/* Adjusted height and padding */}
        <div className="flex items-center justify-between h-full">
          <Logo />
          <div className="hidden md:flex items-center gap-3"> {/* Adjusted gap */}
            {menu.map((item, i) => (
              <a
                key={i}
                href={item.path}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : ""}
                className={`text-sm font-semibold text-gray-700 transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] ${
                  location.pathname === item.path ? 'border-b-2 border-[var(--themeRed)] pb-1' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
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
