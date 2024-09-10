import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img src="logo-transparent.webp" alt="" width={40} height={40} />
      {/* <span className="text-xl font-semibold">
        Brand-In <span className="text-[var(--themeRed)]">Indonesia</span>
      </span> */}
    </div>
  );
};

export default Logo;
