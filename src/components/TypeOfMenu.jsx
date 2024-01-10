import React from "react";

const TypeOfMenu = ({ MenuType, handleClick, flexDirection, bg, gap }) => {
  return (
    <div>
      <ul className={`flex ${gap === "gap" ? "gap-6" : "gap-2"}  ${flexDirection === "row" ? "flex-row" : "flex-col"}`}>
        {MenuType.map((menu, index) => (
          <li key={index} className={`p-1 rounded-full  hover:bg-[var(--themeRed)] ${bg === "gray" ? "bg-gray-400" : "flex-col"}`} onClick={(e) => handleClick(`${menu.type}`, e)}>
            <button className={`flex items-center gap-2`}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src={`${menu.img}`} alt="" className="w-8 rounded-full object-cover" />
              </div>
              <span className="text-sm">{menu.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeOfMenu;
