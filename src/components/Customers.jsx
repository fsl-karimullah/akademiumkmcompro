// import { Rating } from "@mui/material";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import ImgReview from "./ImgReview";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Customers = () => {
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(-1);
  return (
    <div className="flex flex-col md:flex-row mt-2 gap-6 md:gap-0 md:mt-10 overflow-y-auto md:h-[500px]">
      {/* left */}
      <div className="w-full md:w-1/2 relative overflow-hidden  ">
        <img src="Group 40.png" alt="" className="md:w-96 w-full " />
        <div className="bg-yellow-300 md:bg-white top-0 md:top-[340px] md:right-48 p-4 md:p-6 rounded-xl flex flex-col gap-3 absolute h-16 md:h-24 shadow-md">
          <h1 className="font-bold text-[10px] md:text-sm">Our Reviewers</h1>
          <ImgReview />
        </div>
      </div>
      {/* right */}
      <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center text-center md:text-left  ">
        <span className="uppercase text-[20px] md:text-sm text-[var(--themeRed)] font-semibold">What they say</span>
        <div>
          <h1 className="font-bold text-sm md:text-2xl">What Our Customers</h1>
          <h1 className="font-bold text-sm md:text-2xl">Say About Us</h1>
        </div>
        <span className="font-thin text-[10px] md:text-sm">"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore earum natus corrupti beatae vel aperiam iste ad eligendi illum autem".</span>
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src="c1.webp" alt="" className="w-10 h-10 rounded-[50%] object-cover" />
          <div className="flex flex-col">
            <h1 className="font-bold text-sm">Theresa Jordan</h1>
            <span className="font-thin text-[10px]">Food Enthusiast</span>
          </div>
          <div>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                //   name="hover-feedback"
                name="size-small"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
