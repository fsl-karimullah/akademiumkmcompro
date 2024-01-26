import React from "react";
import Richard from "../components/Richard";
import TypeOfMenu from "../components/TypeOfMenu";
import CaliforniaCard from "../components/CaliforniaCard";
import CustomComponent from "../components/title/Title";
const MenuType = [
  { title: "Burger", type: "burger", img: "burger.jpg" },
  { title: "Pizza", type: "pizza", img: "pizza.jpg" },
  { title: "Cupcake", type: "cupcake", img: "cupcake.jpg" },
];

const handleClick = () => {
  console.log("clicked");
};

const items = [
  {
    imageSrc: "panduan1.jpg",
    title: "Template Job Deskripsi",
    description: "Gunakan template job deskripsi berikut untuk dapatkan kandidat berkualitas!",
  },
  {
    imageSrc: "panduan2.png",
    title: "Template Job Deskripsi",
    description: "Gunakan template job deskripsi berikut untuk dapatkan kandidat berkualitas!",
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
                <CustomComponent
                  title1="Download app"
                  title2="Get Started With"
                  title3="Jelasa Rasa Today"
                  textColor1="#FF0000" // Warna untuk title1
                  textColor2="#000000" // Warna untuk title2 dan title3
                  alignItems="start"
                />
                <p className="text-[var(--gray)] text-sm md:text-3xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptates temporibus cumque iure, laudantium ab. Eligendi rerum eos necessitatibus ex.</p>
                <div>
                  <button className="btn">Get The App</button>
                </div>
              </div>
              <div className="flex flex-col gap-4 bg-[var(--themeRed)] rounded-2xl w-full md:w-1/5 h-48 items-center justify-center">
                <div className="flex items-center justify-center bg-white rounded-full ">
                  <img src="money.png" alt="" className="w-36 md:w-20 object-cover" />
                </div>
                <span className="text-sm text-center text-white">Your Food Has Arrived</span>
              </div>
            </div>
            <div className="flex flex-row justify-center md:justify-end md:relative">
              <Richard />
            </div>
          </div>
          {/* right */}
          <img src="phone.png" alt="" className="md:w-1/2 object-contain" />
        </>
      ) : (
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl text-center font-bold">Panduan Pasang Lowongan Kerja</h1>
          <div className="flex flex-col md:flex-row gap-4">
            {items.map((item, index) => (
              <GuideCard key={index} imageSrc={item.imageSrc} title={item.title} description={item.description} />
            ))}
          </div>
          {/* <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 bg-white h-[600px] flex flex-col gap-24 p-4 items-center justify-center rounded-2xl shadow-2xl">
              <img src="panduan1.jpg" alt="" className="md:w-[450px] object-cover" />
              <div className="flex flex-col gap-2 items-center justify-center text-center">
                <h1 className="text-2xl md:text-xl font-bold text-[var(--themeRed)]">Template Job Deskripsi</h1>
                <p className="md:font-bold">Gunakan template job deskripsi berikut untuk dapatkan kandidat berkualitas!</p>
              </div>
            </div>
            <div className="md:w-1/2 bg-white h-[600px] flex flex-col gap-24 p-4 items-center justify-center rounded-2xl shadow-2xl">
              <img src="panduan2.png" alt="" className="md:w-[450px] object-cover" />
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
