import React from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const ShoppingBag = () => {
  return (
    <div className="relative flex items-center">
      <ShoppingBagOutlinedIcon style={{ cursor: "pointer" }} />
      <div className="absolute top-0 right-0 bg-[var(--themeRed)] text-white rounded-full w-[10px] h-[10px] text-[8px] text-center ">4</div>
    </div>
  );
};

export default ShoppingBag;
