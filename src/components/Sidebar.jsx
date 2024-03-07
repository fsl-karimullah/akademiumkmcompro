import React from "react";
import TypeOfMenu from "./TypeOfMenu";

const Clients = ["donatnumnum.webp", "colosseum.webp", "glazestore.webp", "L1.webp", "L2.webp"];

const MenuType = [
  { title: "Donat Numnum", type: "Donat Numnum", img: Clients[0] },
  { title: "Colloseum Furniture", type: "Colloseum Furniture", img: Clients[1] },
  { title: "Batagor Geulish", type: "Batagor Geulish", img: Clients[2] },
  { title: "Glaze Store", type: "Glaze Store", img: Clients[3] },
  { title: "Beli Hp My Id", type: "Beli Hp My Id", img: Clients[4] },
];

const Sidebar = ({ handleMenuClick }) => {
  const handleClick = (menu, event) => {
    event.preventDefault();
    handleMenuClick(menu);
  };

  return (
    <div className="flex flex-col items-center justify-center text-slate-700">
      <TypeOfMenu MenuType={MenuType} handleClick={handleClick} flexDirection="column" />
    </div>
  );
};

export default Sidebar;
