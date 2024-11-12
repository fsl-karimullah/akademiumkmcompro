// src/pages/AllNews.js

import React from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";

const dummyNewsData = [
  {
    id: 3,
    title: "Berita ini dalam tahap testing",
    thumbnail:
      "https://ukm.sixeyestech.com/storage/thumbnails/01HT2VQNTCTH17AQ6KF9AFFKCR.jpg",
    description: "Berita ini dalam tahap testing",
    created_at: "2024-03-28T15:44:23.000000Z",
  },
  {
    id: 2,
    title: "Brand-in Indonesia Berencana kolaborasi dengan KEMENKOPUKM",
    thumbnail:
      "https://ukm.sixeyestech.com/storage/thumbnails/01HT2VEJYEC0Z4WGN3C0HMZ2W7.png",
    description:
      "Kami akan bekerjasama dengan kementrian umkm untuk membuat suatu proyek besar...",
    created_at: "2024-03-28T15:39:26.000000Z",
  },
  {
    id: 1,
    title: "Bitcoin akan halving ?",
    thumbnail:
      "https://ukm.sixeyestech.com/storage/thumbnails/01HT2J7BDSMBMTAK5WNV28BQ0P.jpg",
    description:
      "The Bitcoin algorithm dictates halving happens based on a certain creation of blocks...",
    created_at: "2024-03-28T12:58:11.000000Z",
  },
];

const AllNews = ({ currentPath }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div>
      <Navbar currentPath={currentPath} />
      <section className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="max-w-6xl w-full px-4">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Artikel Lengkap
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyNewsData.map((news) => (
              <div
                key={news.id}
                onClick={() => handleCardClick(news.id)}
                className="cursor-pointer"
              >
                <NewsCard
                  title={news.title}
                  imageUrl={news.thumbnail}
                  description={news.description}
                  date={new Date(news.created_at).toLocaleDateString()}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllNews;
