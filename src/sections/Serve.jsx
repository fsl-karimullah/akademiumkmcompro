import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
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
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section className="w-full py-14 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Produk Pilihan <span className="text-primary">Terbaik</span>
        </h2>
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 3000 }}
          className="mySwiper"
        >
          {webinars.map((item) => (
            <SwiperSlide
              key={item.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              <a
                href={item.registration_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <div className="flex justify-center items-center gap-1 text-yellow-500 mt-2">
                    <StarIcon fontSize="small" />
                    <span className="text-sm font-medium">Rekomendasi</span>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WhyChooseUs;