import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { endpoint } from "../endpoint/api";

// ✅ **Main News Component**
const News = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]); // Store fetched news data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // ✅ **Fetch News Data**
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(endpoint.getNews);
        console.log("Fetched News Data:", response.data);

        setNewsData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // ✅ **Handle "See All News" Navigation**
  const handleSeeAllNews = () => {
    navigate("/allnews");
  };

  return (
    <section className="p-6 md:p-10 bg-gray-50 rounded-lg shadow-md">
      {/* ✅ **Header Section** */}
      <h2 className="text-3xl font-bold text-center text-[var(--themeRed)] mb-6">
        📰 Artikel & Blog
      </h2>

      {/* ✅ **Loading State** */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-semibold text-gray-600 animate-pulse">
            Loading news, please wait...
          </p>
        </div>
      ) : error ? (
        /* ✅ **Error State** */
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-semibold text-red-500">{error}</p>
        </div>
      ) : (
        /* ✅ **News Grid** */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.slice(0, 3).map((news) => (
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
      )}

      {/* ✅ **See All News Button** */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSeeAllNews}
          className="px-6 py-3 bg-[var(--themeRed)] text-white font-bold rounded-md shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          📚 Lihat Artikel Lainnya
        </button>
      </div>
    </section>
  );
};

export default News;
