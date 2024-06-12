import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CardMenu from "../components/CardMenu";
import CustomComponent from "../components/title/Title";
import PublicIcon from "@mui/icons-material/Public";
import PercentIcon from "@mui/icons-material/Percent";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const DonatNumnum = [
  {
    title: "Donat Kentang",
    img: "donat-1.webp",
    price: "3.5K",
  },
  {
    title: "Paket 1",
    img: "donat-2.webp",
    price: "6k",
  },
  {
    title: "Paket 2",
    img: "donat-3.webp",
    price: "12K",
  },
  {
    title: "Paket Hampers",
    img: "donat-4.webp",
    price: "35K",
  },
];

const colloseumFurniture = [
  {
    title: "Mossy",
    img: "cf0.webp",
    price: "7.49",
  },
  {
    title: "Footy",
    img: "cf1.webp",
    price: "6.04",
  },
];

const batagorGeulish = [
  {
    title: "Batagor Geulish",
    img: "bg0.webp",
    price: "7.49",
  },
  {
    title: "Batagor Geulish Sausage Peanut",
    img: "bg1.webp",
    price: "6.04",
  },
];

const glazeStore = [
  {
    title: "Glaze Store",
    img: "gs0.webp",
    price: "7.49",
  },
  {
    title: "Glaze Store",
    img: "gs1.webp",
    price: "6.04",
  },
];
const beliHpMyId = [
  {
    title: "Hp Murah",
    img: "hp0.webp",
    price: "7.49",
  },
  {
    title: "Hp Murah",
    img: "hp1.webp",
    price: "6.04",
  },
];
const Menu = ({ currentPath }) => {
  console.log(currentPath);
  const [selectedMenu, setSelectedMenu] = useState("Donat Numnum");
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const FeatureCard = ({ icon, title, description, isMobile }) => (
    <div className="md:w-1/5 h-[600px] shadow-xl flex flex-col items-center gap-10 p-8 text-center">
      {React.cloneElement(icon, {
        style: {
          color: "orange",
          width: isMobile ? "200px" : "80px",
          height: isMobile ? "200px" : "80px",
        },
      })}
      <h1 className="text-3xl md:text-2xl font-bold text-[var(--themeRed)]">{title}</h1>
      <span className="text-2xl md:text-xl">{description}</span>
    </div>
  );

  const features = [
    {
      icon: <PublicIcon />,
      title: "Menjangkau ratusan customer",
      description: "Ratusan customer yang tertarik dengan bisnis anda",
    },
    {
      icon: <PercentIcon />,
      title: "GRATIS!",
      description: "Pemasangan iklan bisnis di platform kami gratis.",
    },
    {
      icon: <SupportAgentIcon />,
      title: "Customer Support Tim Brand-In",
      description: "Tim Brand-In siap memandu Anda dalam pemasangan iklan bisnis.",
    },
    {
      icon: <SupervisorAccountIcon />,
      title: "Proses cepat dan gak ribet",
      description: "Hanya dengan menginputkan bisnis anda, maka data bisnis anda akan tampil ke dalam aplikasi mobile kami",
    },
  ];

  return (
    <>
      {currentPath === "/" ? (
        <div className="flex flex-col bg-red-100 h-[600px] p-2 md:p-10">
          {/* Header */}
          <header className="top-0 left-0 right-0 z-10 m-0 p-0 text-center md:text-left flex flex-col gap-4">
            <CustomComponent title1="beberapa mitra kami" title2="Produk dan Jasa Yang Selalu" title3="Membuat anda jatuh cinta" textColor1="#FF0000" textColor2="#000000" alignItems="start" />
          </header>
          {/* Main Content */}
          <div className="flex flex-col md:flex-row mt-6 overflow-y-auto items-center gap-4">
            <div className="w-2/12 rounded-xl p-2">
              <Sidebar handleMenuClick={handleMenuClick} />
            </div>
            <div className="flex flex-col w-10/12 overflow-y-auto items-center rounded-xl p-4">
              <CardMenu news={selectedMenu === "Donat Numnum" ? DonatNumnum : []} />
              <CardMenu news={selectedMenu === "Colloseum Furniture" ? colloseumFurniture : []} />
              <CardMenu news={selectedMenu === "Batagor Geulish" ? batagorGeulish : []} />
              <CardMenu news={selectedMenu === "Glaze Store" ? glazeStore : []} />
              <CardMenu news={selectedMenu === "Beli Hp My Id" ? beliHpMyId : []} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 items-center mt-10">
          <div className="w-full flex flex-col items-center md:gap-10 md:flex-row justify-center">
            {features.map((feature, index) => (
              <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} isMobile={isMobile} />
            ))}
          </div>
          <a target="blank" href="http://ukm.sixeyestech.com/admin/login" className="btn font-bold">Pasang Bisnis Gratis!</a>
        </div>
      )}
    </>
  );
};

export default Menu;
