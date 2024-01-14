import React, { useState } from "react";

const TypeOfMenu = ({ MenuType, handleClick }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [textMenu, setTextMenu] = useState(null);

  return (
    <div>
      <ul className={`flex flex-row md:flex-col gap-6 md:gap-2 p-2 md:p-0 rounded-xl bg-yellow-400  md:bg-transparent `}>
        {MenuType.map((menu, index) => (
          <li
            key={index}
            className={`p-[1px] md:p-1 rounded-full hover:bg-red-400 hover:transform hover:scale-125  md:hover:bg-[var(--themeRed)] hover:text-white ${selectedMenu === menu.type ? "bg-[var(--themeRed)]" : ""} ${
              textMenu === menu.type ? "text-white" : ""
            }`}
            onClick={(e) => {
              handleClick(`${menu.type}`, e);
              setSelectedMenu(menu.type);
              setTextMenu(menu.type);
            }}
          >
            <button className={`flex items-center md:gap-2`}>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center overflow-hidden shadow-2xl md:shadow-none">
                <img src={`${menu.img}`} alt="" className="w-8 rounded-full object-cover" />
              </div>
              <span className="text-sm hidden md:block">{menu.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeOfMenu;
