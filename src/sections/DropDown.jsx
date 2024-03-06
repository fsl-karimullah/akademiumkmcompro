import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const FaqItem = ({ number, question, answer }) => (
  <div className="relative w-full overflow-hidden border-1 shadow-lg py-10 px-1 flex flex-col rounded-xl">
    <input type="checkbox" className="peer absolute top-[50px] inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer " />
    <div className="h-12 w-full md:pl-5 flex items-center">
      <h1 className="text-base md:text-lg text-black font-semibold p-4">{`${number}. ${question}`}</h1>
    </div>
    {/* arrow */}
    <div className="absolute top-[50px] right-3 text-black transition-transform duration-500 rotate-0 peer-checked:rotate-180">
      <ArrowDropDownIcon />
    </div>
    {/* Content */}
    <div className="bg-white overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40">
      <div className="p-4">
        <p className="text-justify">{answer}</p>
      </div>
    </div>
  </div>
);

const faqData = [
  {
    number: "01",
    question: "Apakah pasang iklan di Brand-In berbayar?",
    answer: "Saat ini, pemasangan iklan bisnis di dalam aplikasi kami gratis tidak dipungut biaya.",
  },
  {
    number: "02",
    question: "Apakah setelah memasang iklan bisnis saya sudah pasti sukses?",
    answer: "Iklan disini tidak membuat bisnis anda langsung sukses, tetapi anda harus tetap mengikuti perkembangan teknologi untuk memajukan bisnis anda. jangan lupa sertakan sosial media dan branding yang baik.",
  },
];

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-6 my-10 md:px-14">
      <h1 className="text-2xl md:text-4xl font-bold text-center">Ada Pertanyaan Lanjutan?</h1>
      <p className="text-base md:text-lg md:w-[60%] text-center font-medium">Kami telah merangkum jawaban atas berbagai pertanyaan yang sering diajukan. Jika masih ada yang belum terjawab, langsung hubungi WA kami, ya!</p>
      <div>
        {faqData.map((faqItem, index) => (
          <FaqItem key={index} number={faqItem.number} question={faqItem.question} answer={faqItem.answer} />
        ))}
      </div>
    </div>
  );
};

export default DropDown;
