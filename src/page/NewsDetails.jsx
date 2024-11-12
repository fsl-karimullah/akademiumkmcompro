// src/pages/NewsDetails.js

import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyNewsData = {
  id: 3,
  title: "Berita ini dalam tahap testing",
  thumbnail: "https://ukm.sixeyestech.com/storage/thumbnails/01HT2VQNTCTH17AQ6KF9AFFKCR.jpg",
  description: "Berita ini dalam tahap testing. This is a more detailed description that provides insight into the news and helps readers understand the full context of the article.",
  created_at: "2024-03-28T15:44:23.000000Z",
};

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const newsDetails = dummyNewsData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-blue-700 text-sm font-medium mb-4 mt-4 ml-4"
        >
          &larr; Kembali
        </button>

        <div className="relative">
          <img
            src={newsDetails.thumbnail}
            alt={newsDetails.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 flex items-end p-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{newsDetails.title}</h1>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-500 text-sm mb-4">
            {new Date(newsDetails.created_at).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed mb-6">{newsDetails.description}</p>
          
          <div className="border-t pt-4 mt-4 text-gray-700">
            <h2 className="text-xl font-semibold mb-2">More Details</h2>
            <p>This section could contain additional details about the news article...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
