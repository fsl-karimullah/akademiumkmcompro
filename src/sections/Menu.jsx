import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CardMenu from "../components/CardMenu";
import CustomComponent from "../components/title/Title";
import PublicIcon from "@mui/icons-material/Public";
import PercentIcon from "@mui/icons-material/Percent";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
const burger = [
  {
    title: "Italian Burger",
    img: "b1.avif",
    price: "7.49",
  },
  {
    title: "Sausage Burger",
    img: "b2.avif",
    price: "6.04",
  },
  {
    title: "Twin Burger",
    img: "b3.avif",
    price: "8.00",
  },
  {
    title: "Large Burger",
    img: "b4.avif",
    price: "10.00",
  },
];

const pizza = [
  {
    title: "Italian Pizza",
    img: "piz1.avif",
    price: "7.49",
  },
  {
    title: "Sausage Pizza",
    img: "piz2.avif",
    price: "6.04",
  },
  {
    title: "Twin Pizza",
    img: "piz3.avif",
    price: "8.00",
  },
  {
    title: "Large Pizza",
    img: "piz4.avif",
    price: "10.00",
  },
];

const cupCake = [
  {
    title: "Italian Cup Cake",
    img: "cc1.avif",
    price: "7.49",
  },
  {
    title: "Sausage Cup Cake",
    img: "cc2.avif",
    price: "6.04",
  },
  {
    title: "Twin Cup Cake",
    img: "cc3.avif",
    price: "8.00",
  },
  {
    title: "Large Cup Cake",
    img: "cc4.avif",
    price: "10.00",
  },
];

const ramen = [
  {
    title: "Italian Ramen",
    img: "r1.avif",
    price: "7.49",
  },
  {
    title: "Sausage Ramen",
    img: "r2.avif",
    price: "6.04",
  },
  {
    title: "Twin Ramen",
    img: "r3.avif",
    price: "8.00",
  },
  {
    title: "Large Ramen",
    img: "r4.avif",
    price: "10.00",
  },
];
const iceCream = [
  {
    title: "Italian Ice Cream",
    img: "ic1.avif",
    price: "7.49",
  },
  {
    title: "Sausage Ice Cream",
    img: "ic2.avif",
    price: "6.04",
  },
  {
    title: "Twin Ice Cream",
    img: "ic3.avif",
    price: "8.00",
  },
];
const Menu = ({ currentPath }) => {
  console.log(currentPath);
  const [selectedMenu, setSelectedMenu] = useState("burger");
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
      title: "Menjangkau 3 Juta+ Talent",
      description: "Tiga juta kandidat siap bekerja untuk perusahaan Anda",
    },
    {
      icon: <PercentIcon />,
      title: "GRATIS!",
      description: "Pemasangan lowongan di KitaLulus Gratis! Lowongan Anda juga akan dipromosikan melalui partner media KitaLulus.",
    },
    {
      icon: <SupportAgentIcon />,
      title: "Customer Support Tim KitaLulus",
      description: "Tim KitaLulus siap memandu Anda dalam pemasangan loker.",
    },
    {
      icon: <SupervisorAccountIcon />,
      title: "Kelola Pelamar dalam 1 Dashboard",
      description: "Pasang iklan loker & kelola pelamar masuk dengan Dashboard Perusahaan yang mudah digunakan",
    },
  ];

  return (
    <>
      {currentPath === "/" ? (
        <div className="flex flex-col bg-red-100 h-[600px] p-2 md:p-10">
          {/* Header */}
          <header className="top-0 left-0 right-0 z-10 m-0 p-0 text-center md:text-left flex flex-col gap-4">
            <CustomComponent
              title1="Our Menu"
              title2="Menu That Always"
              title3="Makes You Fall In Love"
              textColor1="#FF0000" // Warna untuk title1
              textColor2="#000000" // Warna untuk title2 dan title3
              alignItems="start"
            />
          </header>
          {/* Main Content */}
          <div className="flex flex-col md:flex-row mt-6 overflow-y-auto items-center gap-4">
            <div className="w-2/12 rounded-xl p-2">
              <Sidebar handleMenuClick={handleMenuClick} />
            </div>
            <div className="flex flex-col w-10/12 overflow-y-auto items-center rounded-xl p-4">
              <CardMenu news={selectedMenu === "burger" ? burger : []} />
              <CardMenu news={selectedMenu === "pizza" ? pizza : []} />
              <CardMenu news={selectedMenu === "cupcake" ? cupCake : []} />
              <CardMenu news={selectedMenu === "ramen" ? ramen : []} />
              <CardMenu news={selectedMenu === "icecream" ? iceCream : []} />
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
          <button className="btn font-bold">Pasang Loker Gratis!</button>
        </div>
      )}
    </>
  );
};

export default Menu;
