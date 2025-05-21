import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import StarIcon from "@mui/icons-material/Star";
import "swiper/css";
import "swiper/css/effect-cards";
import axios from "axios";
import { endpoint } from "../endpoint/api"; 

const WhyChooseUs = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get(endpoint.getWebinars);
        if (response.data && Array.isArray(response.data.data)) {
          setWebinars(response.data.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError("Failed to fetch digital products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading best sellers...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">{error}</div>
    );
  }

  return (
    <div className="w-full flex justify-center py-10 bg-gray-50">
      <div className="w-[320px]">
        <h2 className="text-2xl font-bold text-center mb-6">Produk Pilihan</h2>
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {webinars.map((item) => (
            <SwiperSlide
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center justify-center"
            >
              <a href={item.registration_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <StarIcon className="text-yellow-500 mt-1" />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default WhyChooseUs;
