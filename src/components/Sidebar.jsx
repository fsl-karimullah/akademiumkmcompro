import React from "react";
import TypeOfMenu from "./TypeOfMenu";

const MenuType = [
  { title: "Burger", type: "burger", img: "burger.jpg" },
  { title: "Pizza", type: "pizza", img: "pizza.jpg" },
  { title: "Cupcake", type: "cupcake", img: "cupcake.jpg" },
  { title: "Ramen", type: "ramen", img: "ramen.jpg" },
  { title: "Ice Cream", type: "icecream", img: "icecream.jpg" },
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
