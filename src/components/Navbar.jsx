import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";

// Menu Items berdasarkan fitur yang tersedia
const menu = [
  { name: "Beranda", path: "/" },
  { name: "Go Digital", path: "/bantu-branding" },
  { name: "Webinar", path: "/webinars" },
  { name: "Kursus", path: "/courses" },
  { name: "Artikel", path: "/allnews" },
  { name: "UMKM Showcase", path: "/umkm-showcase" },
  { name: "Tentang Kami", path: "/about" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsAuthenticated(!!token);

    // Get user name from localStorage if available
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Logo />
          <span className="hidden sm:block text-lg font-bold text-[var(--themeRed)] tracking-wide">
            Akademi UMKM
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {menu.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${location.pathname === item.path
                ? "text-[var(--themeRed)] bg-red-50"
                : "text-gray-600 hover:text-[var(--themeRed)] hover:bg-gray-50"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons / Profile */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--themeRed)] to-red-600 flex items-center justify-center text-white text-sm font-bold">
                  {userName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profil Saya
                  </Link>
                  <Link
                    to="/course"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Kursus Saya
                  </Link>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[var(--themeRed)] transition-colors"
              >
                Masuk
              </button>
              <button
                onClick={handleRegister}
                className="px-4 py-2 text-sm font-medium text-white bg-[var(--themeRed)] rounded-lg hover:bg-red-700 transition-colors"
              >
                Daftar
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-[var(--themeRed)] hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'
          }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-50' : 'opacity-0'
            }`}
          onClick={toggleMenu}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-xl transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="font-bold text-gray-800">Menu</span>
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="p-4 space-y-1">
            {menu.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={toggleMenu}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === item.path
                  ? "text-[var(--themeRed)] bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Section */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--themeRed)] to-red-600 flex items-center justify-center text-white font-bold">
                    {userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{userName || "Pengguna"}</p>
                    <p className="text-xs text-gray-500">Lihat Profil</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full px-4 py-3 text-red-600 bg-white rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Masuk
                </button>
                <button
                  onClick={handleRegister}
                  className="w-full px-4 py-3 text-white bg-[var(--themeRed)] rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Daftar Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
