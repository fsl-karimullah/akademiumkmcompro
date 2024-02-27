import React from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const CaliforniaCard = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <img src="dadu.webp" alt="" className="w-[60px]" />
      <div className="flex items-center">
        <LocationOnOutlinedIcon style={{ color: "red" }} />
        <h1>California, US</h1>
        <KeyboardArrowDownOutlinedIcon style={{ color: "red" }} />
      </div>
      <img src="man.webp" alt="" className="w-[60px]" />
    </div>
  );
};

export default CaliforniaCard;
