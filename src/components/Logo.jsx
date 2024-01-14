import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img src="Logo.png" alt="" width={40} height={40} />
      <span className="text-xl font-semibold">
        Jelajah<span className="text-[var(--themeRed)]">Rasa</span>
      </span>
    </div>
  );
};

export default Logo;
