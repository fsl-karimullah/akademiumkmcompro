import React from "react";
import Richard from "../components/Richard";
import TypeOfMenu from "../components/TypeOfMenu";
import CaliforniaCard from "../components/CaliforniaCard";
import CustomComponent from "../components/title/Title";
const MenuType = [
  { title: "Burger", type: "burger", img: "burger.webp" },
  { title: "Pizza", type: "pizza", img: "pizza.webp" },
  { title: "Cupcake", type: "cupcake", img: "cupcake.webp" },
];

const handleClick = () => {
  console.log("clicked");
};

const items = [
  {
    imageSrc: "panduan1.webp",
    title: "Gunakan data yang lengkap",
    description: "Sebisa mungkin tulis data bisnis anda dengan lengkap untuk memberikan informasi kepada customer",
  },
  {
    imageSrc: "panduan2.webp",
    title: "Jangan lupa sertakan contact service",
    description: "Gunakan sosial media sebagai alat customer untuk menghubungi bisnis anda!",
  },
];

const GuideCard = ({ imageSrc, title, description }) => (
  <div className="md:w-1/2 bg-white h-[600px] flex flex-col gap-24 p-4 items-center justify-center rounded-2xl shadow-2xl">
    <img src={imageSrc} alt="" className="md:w-[450px] object-cover" />
    <div className="flex flex-col gap-2 items-center justify-center text-center">
      <h1 className="text-2xl md:text-xl font-bold text-[var(--themeRed)]">{title}</h1>
      <p className="md:font-bold">{description}</p>
    </div>
  </div>
);

const DownloadApp = ({ currentPath }) => {
  return (
    <div className="bg-red-100 flex flex-col md:flex-row md:h-[750px] gap-4 items-center p-4 md:p-10">
      {currentPath === "/" ? (
        <>
          {/* left */}
          <div className="md:w-1/2 flex flex-col p-0 gap-4 md:gap-0 ">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 ">
              <div className=" flex flex-col gap-4 md:gap-6 text-center md:text-left md:w-4/5">
                <CustomComponent title1="Download app" title2="Get Started With" title3="Brand-in Indonesia Today" textColor1="#FF0000" textColor2="#000000" alignItems="start" />
                <p className="text-[var(--gray)] text-sm md:text-3xl">Yuk cari apa saja disekitar anda dengan mudah!</p>
                <div>
                  <button className="btn">Get The App</button>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <img src="phone.webp" alt="" className="md:w-1/2 object-contain" />
        </>
      ) : (
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl text-center font-bold">Panduan Pasang Bisnis</h1>
          <div className="flex flex-col md:flex-row gap-4">
            {items.map((item, index) => (
              <GuideCard key={index} imageSrc={item.imageSrc} title={item.title} description={item.description} />
            ))}
          </div>
          {/* <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 bg-white h-[600px] flex flex-col gap-24 p-4 items-center justify-center rounded-2xl shadow-2xl">
              <img src="panduan1.webp" alt="" className="md:w-[450px] object-cover" />
              <div className="flex flex-col gap-2 items-center justify-center text-center">
                <h1 className="text-2xl md:text-xl font-bold text-[var(--themeRed)]">Template Job Deskripsi</h1>
                <p className="md:font-bold">Gunakan template job deskripsi berikut untuk dapatkan kandidat berkualitas!</p>
              </div>
            </div>
            <div className="md:w-1/2 bg-white h-[600px] flex flex-col gap-24 p-4 items-center justify-center rounded-2xl shadow-2xl">
              <img src="panduan2.webp" alt="" className="md:w-[450px] object-cover" />
              <div className="flex flex-col gap-2 items-center justify-center text-center">
                <h1 className="text-2xl md:text-xl font-bold text-[var(--themeRed)]">Template Job Deskripsi</h1>
                <p className="md:font-bold">Gunakan template job deskripsi berikut untuk dapatkan kandidat berkualitas!</p>
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DownloadApp;
