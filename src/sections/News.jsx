import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import { endpoint } from "../endpoint/api";

const News = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(endpoint.getNews);
        setNewsData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setError("Gagal memuat berita. Silakan coba lagi nanti.");
        setLoading(false);
      }
    };
    fetchNewsData();
  }, []);

  const handleSeeAllNews = () => {
    navigate("/allnews");
  };

  return (
    <section className="p-6 md:p-12 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[var(--themeRed)] mb-4">
        📰 Artikel & Blog
      </h2>
      <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
        Temukan wawasan, inspirasi, dan strategi terbaru untuk membantu kamu tumbuh dalam perjalanan digitalmu.
      </p>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-[var(--themeRed)]" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg font-semibold text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.slice(0, 3).map((news) => (
            <div className="transition-transform transform hover:scale-[1.02]" key={news.id}>
              <NewsCard
                id={news.id}
                title={news.title}
                thumbnail={news.thumbnail}
                description={news.description}
                created_at={news.created_at}
              />
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleSeeAllNews}
          className="px-8 py-4 bg-[var(--themeRed)] text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-700 transition-all hover:scale-105"
        >
          📚 Lihat Semua Artikel
        </button>
      </div>
    </section>
  );
};

export default News;
