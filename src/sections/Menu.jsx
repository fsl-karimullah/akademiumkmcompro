import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CardMenu from "../components/CardMenu";
import CustomComponent from "../components/title/Title";
import PublicIcon from "@mui/icons-material/Public";
import PercentIcon from "@mui/icons-material/Percent";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

// 📊 **Data for Menu Items**
const menuData = {
  "Donat Numnum": [
    { title: "Donat Kentang", img: "donat-1.webp", price: "3.5K" },
    { title: "Paket 1", img: "donat-2.webp", price: "6K" },
    { title: "Paket 2", img: "donat-3.webp", price: "12K" },
    { title: "Paket Hampers", img: "donat-4.webp", price: "35K" },
  ],
  "Colloseum Furniture": [
    { title: "Mossy", img: "cf0.webp", price: "7.49" },
    { title: "Footy", img: "cf1.webp", price: "6.04" },
  ],
  "Batagor Geulish": [
    { title: "Batagor Geulish", img: "bg0.webp", price: "7.49" },
    { title: "Batagor Geulish Sausage Peanut", img: "bg1.webp", price: "6.04" },
  ],
  "Glaze Store": [
    { title: "Glaze Store", img: "gs0.webp", price: "7.49" },
    { title: "Glaze Store", img: "gs1.webp", price: "6.04" },
  ],
  "Beli Hp My Id": [
    { title: "Hp Murah", img: "hp0.webp", price: "7.49" },
    { title: "Hp Murah", img: "hp1.webp", price: "6.04" },
  ],
};

// 📦 **Feature Card Component**
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center flex flex-col items-center gap-4 hover:shadow-xl transition-transform transform hover:scale-105">
    {React.cloneElement(icon, {
      style: { color: "var(--themeRed)", width: "60px", height: "60px" },
    })}
    <h1 className="text-xl font-bold text-[var(--themeRed)]">{title}</h1>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// 🚀 **Main Menu Component**
const Menu = ({ currentPath }) => {
  const [selectedMenu, setSelectedMenu] = useState(Object.keys(menuData)[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ **Handle Screen Resize**
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (menu) => setSelectedMenu(menu);
  const selectedItems = menuData[selectedMenu] || [];

  return (
    <div className="bg-red-50 min-h-screen">
      {currentPath === "/" ? (
        <section className="py-10 px-6 md:px-16 space-y-8">
          {/* ✅ **Header Section** */}
          <header>
            <CustomComponent
              title1="Beberapa Mitra Kami"
              title2="Produk dan Jasa Yang Selalu"
              title3="Membuat Anda Jatuh Cinta"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="start"
            />
          </header>

          {/* ✅ **Tabs for Categories** */}
          <div className="flex flex-wrap gap-4 mb-6 justify-center md:justify-start">
            {Object.keys(menuData).map((menu) => (
              <button
                key={menu}
                onClick={() => handleMenuClick(menu)}
                className={`px-4 py-2 rounded-md font-semibold ${
                  selectedMenu === menu
                    ? "bg-[var(--themeRed)] text-white"
                    : "bg-white text-[var(--themeRed)] border border-[var(--themeRed)]"
                } hover:bg-[var(--themeRed)] hover:text-white transition`}
              >
                {menu}
              </button>
            ))}
          </div>

          {/* ✅ **Menu Display (Grid or Slider)** */}
          <div>
            {isMobile ? (
              <div className="flex overflow-x-scroll gap-4 p-2">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[250px] bg-white rounded-lg shadow-md p-4"
                  >
                    <CardMenu news={[item]} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {selectedItems.map((item, index) => (
                  <CardMenu key={index} news={[item]} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        // ✅ **Feature Section**
        <section className="flex flex-col gap-8 py-12 px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<PublicIcon />}
              title="Menjangkau Ratusan Customer"
              description="Ratusan customer yang tertarik dengan bisnis Anda."
            />
            <FeatureCard
              icon={<PercentIcon />}
              title="GRATIS!"
              description="Pemasangan iklan bisnis di platform kami gratis."
            />
            <FeatureCard
              icon={<SupportAgentIcon />}
              title="Customer Support"
              description="Tim kami siap memandu Anda dalam pemasangan iklan."
            />
            <FeatureCard
              icon={<SupervisorAccountIcon />}
              title="Proses Cepat & Mudah"
              description="Input data bisnis Anda dengan cepat dan mudah."
            />
          </div>
          <div className="flex justify-center mt-4">
            <a
              href="http://ukm.sixeyestech.com/admin/login"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition duration-300"
            >
              🚀 Pasang Bisnis Gratis!
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Menu;
