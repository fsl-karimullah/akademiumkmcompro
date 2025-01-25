import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

// ✅ Menu Items
const menu = [
  { name: "Home", path: "/" },
  // { name: "Branding UMKM", path: "/bantu-branding" },
  { name: "Produk", path: "/webinars" },
  // { name: "Promosi Bisnis", path: "/loginbisnis" },
  // { name: "Konsultasi Bisnis", path: "/konsultasi" },
  { name: "Course", path: "/landing" },
  { name: "Kontak", path: "https://wa.me/6285281252199", external: true },
];

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* ✅ Logo + Brand Name */}
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden md:block text-xl font-bold text-[var(--primary)] tracking-wide">
            Akademi UMKM
          </span>
        </div>

        {/* ✅ Desktop Menu */}
        <nav className="hidden md:flex items-center gap-5">
          {menu.map((item, i) => (
            <a
              key={i}
              href={item.path}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : ""}
              className={`text-sm font-medium text-gray-700 transition-colors duration-300 ease-in-out hover:text-[var(--themeRed)] ${
                location.pathname === item.path
                  ? "border-b-2 border-[var(--themeRed)] pb-1"
                  : ""
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* ✅ Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[var(--themeRed)] focus:outline-none"
        >
          {isMenuOpen ? (
            <Close fontSize="large" />
          ) : (
            <Menu fontSize="large" />
          )}
        </button>
      </div>

      {/* ✅ Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center gap-4 pt-16 shadow-lg">
          {menu.map((item, i) => (
            <a
              key={i}
              href={item.path}
              target={item.external ? "_blank" : "_self"}
              rel={item.external ? "noopener noreferrer" : ""}
              onClick={toggleMenu}
              className={`text-lg font-semibold text-gray-700 hover:text-[var(--themeRed)] ${
                location.pathname === item.path
                  ? "border-b-2 border-[var(--themeRed)] pb-1"
                  : ""
              }`}
            >
              {item.name}
            </a>
          ))}

          {/* ✅ Close Button */}
          <button
            onClick={toggleMenu}
            className="text-gray-600 mt-4 text-sm hover:text-[var(--themeRed)]"
          >
            Tutup Menu
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
