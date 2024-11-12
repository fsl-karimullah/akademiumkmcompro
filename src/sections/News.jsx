// src/sections/News.js

import React from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../components/NewsCard";

const dummyNewsData = [
  {
    id: 3,
    title: "Berita ini dalam tahap testing",
    thumbnail: "https://ukm.sixeyestech.com/storage/thumbnails/01HT2VQNTCTH17AQ6KF9AFFKCR.jpg",
    description: "Berita ini dalam tahap testing",
    created_at: "2024-03-28T15:44:23.000000Z",
  },
  {
    id: 2,
    title: "Brand-in Indonesia Berencana kolaborasi dengan KEMENKOPUKM",
    thumbnail: "https://ukm.sixeyestech.com/storage/thumbnails/01HT2VEJYEC0Z4WGN3C0HMZ2W7.png",
    description: "Kami akan bekerjasama dengan kementrian umkm untuk membuat suatu proyek besar...",
    created_at: "2024-03-28T15:39:26.000000Z",
  },
  {
    id: 1,
    title: "Bitcoin akan halving ?",
    thumbnail: "https://ukm.sixeyestech.com/storage/thumbnails/01HT2J7BDSMBMTAK5WNV28BQ0P.jpg",
    description: "The Bitcoin algorithm dictates halving happens based on a certain creation of blocks...",
    created_at: "2024-03-28T12:58:11.000000Z",
  },
];

const News = () => {
  const navigate = useNavigate();

  const handleSeeAllNews = () => {
    navigate("/allnews"); // Assumes "/allnews" is the route for the AllNews screen
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Artikel & Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNewsData.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            thumbnail={news.thumbnail}
            description={news.description}
            created_at={news.created_at}
          />
        ))}
      </div>
      {/* See All News Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSeeAllNews}
          className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
         Lihat Artikel Lainnya
        </button>
      </div>
    </section>
  );
};

export default News;
