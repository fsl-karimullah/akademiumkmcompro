// src/pages/AllNews.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";

const AllNews = ({ currentPath }) => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await axios.get(endpoint.getNews);
        setNewsData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load news data.");
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div>
      <Navbar currentPath={currentPath} />
      <section className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
        <div className="max-w-6xl w-full px-4">
          <h1 className="text-3xl font-semibold mb-8 text-center">Artikel Lengkap</h1>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.map((news) => (
                <div
                  key={news.id}
                  onClick={() => handleCardClick(news.id)}
                  className="cursor-pointer"
                >
                  <NewsCard
                    title={news.title}
                    thumbnail={news.thumbnail} 
                    description={news.description || "No description available."}
                    created_at={news.created_at}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllNews;
