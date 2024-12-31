import React from "react";
import CustomComponent from "../components/title/Title";

// 📊 **Menu Type Data**
const MenuType = [
  { title: "Burger", type: "burger", img: "burger.webp" },
  { title: "Pizza", type: "pizza", img: "pizza.webp" },
  { title: "Cupcake", type: "cupcake", img: "cupcake.webp" },
];

const handleClick = () => {
  console.log("clicked");
};

// 📊 **Guide Items Data**
const items = [
  {
    imageSrc: "panduan1.webp",
    title: "Gunakan Data yang Lengkap",
    description:
      "Sebisa mungkin tulis data bisnis Anda dengan lengkap untuk memberikan informasi kepada customer.",
  },
  {
    imageSrc: "panduan2.webp",
    title: "Jangan Lupa Sertakan Contact Service",
    description:
      "Gunakan sosial media sebagai alat customer untuk menghubungi bisnis Anda!",
  },
];

// ✅ **Guide Card Component**
const GuideCard = ({ imageSrc, title, description }) => (
  <div className="bg-white h-[450px] flex flex-col gap-6 p-4 items-center justify-center rounded-2xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
    <img
      src={imageSrc}
      alt={title}
      className="w-[200px] md:w-[300px] object-cover rounded-md"
    />
    <div className="text-center flex flex-col gap-2">
      <h1 className="text-xl font-bold text-[var(--themeRed)]">{title}</h1>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// ✅ **Main DownloadApp Component**
const DownloadApp = ({ currentPath }) => {
  return (
    <div className="bg-red-50 flex flex-col md:flex-row items-center gap-8 p-6 md:p-12 rounded-lg shadow-md">
      {/* ✅ **Homepage View ("/")** */}
      {currentPath === "/" ? (
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          {/* ✅ **Left Section** */}
          <div className="md:w-1/2 flex flex-col gap-6 text-center md:text-left">
            <CustomComponent
              title1="Download App"
              title2="Get Started With"
              title3="Akademi UMKM Today"
              textColor1="var(--themeRed)"
              textColor2="#000000"
              alignItems="start"
            />
            <p className="text-gray-700 text-sm md:text-lg">
              Aplikasi yang digunakan untuk membantu promosi UMKM secara cepat
              dan mudah!
            </p>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://ukm.sixeyestech.com/admin/login"
                className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-transform transform hover:scale-105"
              >
                🚀 Klik di sini untuk upload bisnis
              </a>
            </div>
          </div>

          {/* ✅ **Right Section (Image)** */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="phone.webp"
              alt="Download App"
              className="w-[250px] md:w-[400px] object-contain"
            />
          </div>
        </div>
      ) : (
        // ✅ **Guide Page View (Other Paths)**
        <div className="flex flex-col gap-12 w-full">
          {/* ✅ **Title Section** */}
          <h1 className="text-3xl font-bold text-center text-[var(--themeRed)]">
            📚 Panduan Pasang Bisnis
          </h1>

          {/* ✅ **Guide Cards Grid** */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <GuideCard
                key={index}
                imageSrc={item.imageSrc}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          {/* ✅ **CTA Button** */}
          <div className="flex justify-center mt-6">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://ukm.sixeyestech.com/admin/login"
              className="bg-[var(--themeRed)] text-white px-6 py-2 rounded-md font-bold hover:bg-red-700 transition-transform transform hover:scale-105"
            >
              🚀 Daftar Sekarang!
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadApp;
